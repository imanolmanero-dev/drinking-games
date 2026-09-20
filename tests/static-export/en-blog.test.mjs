import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";

const require = createRequire(import.meta.url);
require("tsx/cjs");
const { parse } = require("next/dist/compiled/node-html-parser");
const { drinkingGamesForTwoEditorial: editorial } = require("../../lib/data/drinking-games-for-2-editorial.ts");
const read = (path) => readFileSync(path, "utf8");
const path = "/en/blog/drinking-games-for-2";
const canonical = `https://bebergames.com${path}`;
const documentFor = (pathname) => parse(read(`out${pathname}.html`));
const doc = documentFor(path);
const meta = (selector) => doc.querySelector(selector)?.getAttribute("content");

test("guide exports article social metadata with exactly the inherited English brand image", () => {
  assert.equal(meta('meta[property="og:type"]'), "article");
  assert.equal(meta('meta[property="og:locale"]'), "en_US");
  assert.equal(meta('meta[property="og:url"]'), canonical);
  assert.equal(meta('meta[property="og:description"]'), meta('meta[name="description"]'));
  assert.equal(meta('meta[name="twitter:description"]'), meta('meta[name="description"]'));
  assert.equal(meta('meta[name="twitter:title"]'), meta('meta[property="og:title"]'));
  const home = documentFor("/en");
  for (const property of ["og:image", "og:image:width", "og:image:height", "og:image:alt"]) {
    assert.equal(meta(`meta[property="${property}"]`), home.querySelector(`meta[property="${property}"]`).getAttribute("content"), property);
  }
  assert.equal(meta('meta[name="twitter:image"]'), meta('meta[property="og:image"]'));
  assert.equal(doc.querySelectorAll("link[hreflang]").length, 0);
  assert.equal(doc.getElementById("language-switch").getAttribute("href"), "/");
  assert.equal(doc.getElementById("language-switch").textContent, "Spanish home");
});

test("one BlogPosting matches visible authorship and a two-level breadcrumb, with no FAQPage or Article", () => {
  const schemas = doc.querySelectorAll('script[type="application/ld+json"]').map((node) => JSON.parse(node.textContent));
  assert.deepEqual(schemas.map((schema) => schema["@type"]).sort(), ["BlogPosting", "BreadcrumbList"]);
  const post = schemas.find((schema) => schema["@type"] === "BlogPosting");
  assert.equal(post.headline, doc.querySelector("h1").textContent);
  assert.equal(post.description, meta('meta[name="description"]'));
  assert.equal(post.url, canonical);
  assert.equal(post.mainEntityOfPage, canonical);
  assert.equal(post.author.name, doc.getElementById("two-author").textContent);
  assert.equal(post.author.url, new URL(doc.getElementById("two-author").getAttribute("href"), canonical).href);
  assert.equal(post.publisher.name, "BeberGames");
  assert.equal(post.isAccessibleForFree, true);
  assert.equal(post.datePublished, editorial.datePublished);
  for (const key of ["dateModified", "image", "aggregateRating", "review"]) assert.equal(post[key], undefined, key);
  assert.equal(doc.querySelectorAll("time").length, 1);
  assert.equal(doc.querySelector("time").getAttribute("datetime"), editorial.datePublished);
  assert.equal(doc.querySelector("time").textContent, editorial.datePublished);
  assert.equal(meta('meta[property="article:published_time"]'), editorial.datePublished);
  assert.deepEqual(schemas.find((schema) => schema["@type"] === "BreadcrumbList").itemListElement, [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://bebergames.com/en" },
    { "@type": "ListItem", position: 2, name: "Drinking games for 2", item: canonical },
  ]);
  const breadcrumb = doc.querySelector('nav[aria-label="Breadcrumb"]');
  assert.equal(breadcrumb.querySelector("a").getAttribute("href"), "/en");
  assert.equal(breadcrumb.querySelector('[aria-current="page"]').textContent, "Drinking games for 2");
});

test("seven complete game sections and four visible FAQ answers use a native contents list", () => {
  const names = ["Categories", "Rhyme Round", "Two Truths and a Lie", "Never Have I Ever", "Truth or Dare", "Higher or Lower", "Roll, Keep or Reroll"];
  const games = doc.querySelectorAll("[data-guide-game]");
  assert.deepEqual(games.map((game) => game.querySelector("h3").textContent), names.map((name, i) => `${i + 1}. ${name}`));
  for (const game of games) {
    assert.ok(game.querySelectorAll("p").length >= 3);
    assert.match(game.textContent, /What you need:/);
    assert.match(game.textContent, /Try this:/);
  }
  assert.equal(doc.querySelectorAll('h3[id^="faq-"]').length, 4);
  for (const heading of doc.querySelectorAll('h3[id^="faq-"]')) {
    assert.ok(heading.nextElementSibling.textContent.length > 35);
    assert.equal(heading.nextElementSibling.tagName, "P");
  }
  const links = doc.querySelectorAll('nav[aria-label="On this page"] a');
  assert.equal(links.length, 8);
  for (const link of links) {
    assert.ok(link.getAttribute("href").startsWith("#"));
    assert.equal(doc.getElementById(link.getAttribute("href").slice(1))?.tagName, "H2");
  }
});

test("incoming links remain editorial, and all forbidden future routes lack exported HTML", () => {
  for (const [pathname, id] of [["/en", "en-home-two-guide"], ["/en/games", "en-games-two-guide"]]) {
    const page = documentFor(pathname);
    assert.equal(page.getElementById(id).getAttribute("href"), path);
    assert.equal(page.querySelectorAll(`.en-catalog a[href="${path}"]`).length, 0);
    assert.equal(page.querySelectorAll(`.en-nav a[href="${path}"], .en-footer a[href="${path}"]`).length, 0);
  }
  for (const absent of ["/en/blog", "/en/blog/drinking-games-for-two", "/en/blog/drinking-games-without-cards", "/en/blog/drinking-card-games", "/en/games/truth-or-dare"]) {
    assert.equal(existsSync(`out${absent}.html`), false, absent);
    assert.equal(existsSync(`out${absent}/index.html`), false, absent);
    assert.equal(doc.querySelectorAll(`a[href="${absent}"]`).length, 0);
  }
  assert.equal(doc.querySelectorAll('a[href="/en/games/kings-cup"]').length, 1);
  assert.match(doc.getElementById("two-kings-cup").parentNode.textContent, /usually a group game.*supports two players on one screen/);
});

test("guide copy keeps passing and alcohol optional and contains no pressure or consumption penalties", () => {
  const content = doc.querySelector(".en-article").textContent;
  assert.doesNotMatch(content, /\bchug(?:ging)?\b|(?:finish|down) your drink|shots? as punishment|drinking races?|drink as fast|must (?:drink|sip)|take \d+ (?:shots?|sips?)|loser drinks|stack(?:ed)? (?:sips|drinks)|\b(?:sexy|sexual|intimate)\b/i);
  assert.match(content, /Passing has no penalty/);
  assert.match(content, /pause or stop without an explanation/);
  assert.match(content, /legal drinking age where you are/);
  assert.match(content, /non-alcoholic/);
  assert.doesNotMatch(content, /\b(\w+)\b(?:\s+\1\b){3,}/i);
});

test("static guide ships only the existing non-game English shell scripts and no interactive embeds", () => {
  const scripts = (document) => document.querySelectorAll("script[src]").map((node) => node.getAttribute("src")).sort();
  assert.deepEqual(scripts(doc), scripts(documentFor("/en/about")));
  assert.equal(doc.querySelectorAll("button, input, select, iframe, video, canvas, img").length, 0);
  const source = scripts(doc).map((src) => read(`out${src}`)).join("\n");
  assert.doesNotMatch(source, /KingsCupGame|kc-start|adsbygoogle|googlesyndication|beforeinstallprompt|bg_pwa_dismissed|cookie_consent|navigator\.vibrate|AudioContext/);
});
