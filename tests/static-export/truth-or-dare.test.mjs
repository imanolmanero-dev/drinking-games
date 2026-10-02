import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import { auditStaticExport, validateStaticExportAudit } from "../../scripts/audit-static-export.mjs";

const require = createRequire(import.meta.url);
require("tsx/cjs");
const { TOTAL_PROMPTS, PROMPT_POOLS } = require("../../lib/data/truth-or-dare-prompts.ts");
const { parse } = require("next/dist/compiled/node-html-parser");
const read = (path) => readFileSync(path, "utf8");
const pathname = "/en/games/truth-or-dare";
const url = `https://bebergames.com${pathname}`;
const doc = parse(read("out/en/games/truth-or-dare.html"));
const home = parse(read("out/en.html"));
const hub = parse(read("out/en/games.html"));
const guide = parse(read("out/en/blog/drinking-games-for-2.html"));

test("each hub game keeps its artwork and Truth or Dare places the same decoration inside its wide setup", () => {
  const cards = hub.querySelectorAll(".en-catalog-card");
  const kings = cards.find((card) => card.querySelector("#en-catalog-kings-cup"));
  const truth = cards.find((card) => card.querySelector("#en-catalog-truth-or-dare"));
  assert.ok(kings.querySelector(".en-card-art .en-art-crown"));
  assert.equal(kings.querySelector(".en-tod-art"), null);
  assert.equal(truth.querySelector(".en-card-art"), null);
  assert.equal(truth.querySelector(".en-tod-art").getAttribute("aria-hidden"), "true");
  assert.match(truth.querySelector(".en-tod-art-truth").textContent, /TRUTH\?/);
  assert.match(truth.querySelector(".en-tod-art-dare").textContent, /DARE!/);
  assert.ok(doc.querySelector("article.en-page-wide"));
  assert.equal(doc.querySelector(".en-tod-setup-art .en-tod-art").toString(), truth.querySelector(".en-tod-art").toString());
  assert.equal(doc.querySelector(".en-header-decoration"), null);
  assert.equal(home.querySelector(".en-header-decoration"), null);
  assert.equal(hub.querySelector(".en-header-decoration"), null);
  assert.equal(guide.querySelector(".en-header-decoration"), null);
});

test("setup exports a labelled native selector, stepper and separate game facts", () => {
  const select = doc.getElementById("tod-player-count");
  assert.equal(select.getAttribute("aria-describedby"), "tod-player-range");
  assert.equal(select.querySelector("option[selected]").getAttribute("value"), "4");
  assert.equal(doc.getElementById("tod-player-range").textContent, "2–12 players");
  assert.deepEqual(doc.querySelectorAll(".en-tod-facts li").map((item) => item.textContent), [`${TOTAL_PROMPTS} prompts`, "No materials", "One shared screen"]);
  const category = doc.getElementById("tod-category");
  assert.equal(doc.querySelector('label[for="tod-category"]').textContent, "Category");
  assert.equal(category.tagName, "SELECT");
  assert.equal(category.getAttribute("aria-describedby"), "tod-category-help");
  assert.equal(category.querySelector("option[selected]").getAttribute("value"), "classic");
  assert.deepEqual(category.querySelectorAll("option").map((option) => [option.getAttribute("value"), option.textContent]), [["classic", "Classic"], ["party", "Party"], ["both", "Both"]]);
  assert.match(doc.getElementById("tod-category-help").textContent, new RegExp(`${PROMPT_POOLS.classic.truths.length + PROMPT_POOLS.classic.dares.length} prompts`));
  for (const [id, label] of [["tod-player-decrease", "Decrease player count"], ["tod-player-increase", "Increase player count"]]) {
    const button = doc.getElementById(id);
    assert.equal(button.tagName, "BUTTON");
    assert.equal(button.getAttribute("type"), "button");
    assert.equal(button.getAttribute("aria-label"), label);
  }
});

test("Truth or Dare exports a self-canonical English game with useful static content", () => {
  assert.equal(doc.querySelector("html").getAttribute("lang"), "en-US");
  assert.equal(doc.querySelector("title").textContent, "Truth or Dare Online — Play With Friends | BeberGames");
  const description = doc.querySelector('meta[name="description"]').getAttribute("content");
  assert.match(description, /Truth or Dare online.*2–12.*Classic, Party, or Both/);
  assert.match(description, new RegExp(`${TOTAL_PROMPTS} prompts.*shared screen.*No signup`));
  for (const selector of ['meta[property="og:description"]', 'meta[name="twitter:description"]']) {
    assert.equal(doc.querySelector(selector).getAttribute("content"), description);
  }
  assert.deepEqual(doc.querySelectorAll("h1").map((node) => node.textContent), ["Truth or Dare Online"]);
  assert.deepEqual(doc.querySelectorAll('link[rel="canonical"]').map((node) => node.getAttribute("href")), [url]);
  assert.equal(doc.querySelectorAll('link[hreflang]').length, 0);
  assert.equal(doc.getElementById("language-switch").getAttribute("href"), "/");
  assert.equal(doc.getElementById("language-switch").textContent, "Spanish home");
  for (const id of ["how-to-play", "setup", "prompts", "play-responsibly", "more-games"]) assert.equal(doc.getElementById(id)?.tagName, "H2", id);
  assert.ok(doc.getElementById("tod-start"));
  assert.ok(doc.getElementById("tod-game-heading").range[0] < doc.getElementById("how-to-play").range[0]);
  assert.match(doc.textContent, /Passing never carries a penalty/);
  assert.match(doc.textContent, /Alcohol is optional/);
  assert.match(doc.textContent, /When all Truths have appeared/);
  assert.match(doc.querySelector(".en-intro").textContent, new RegExp(`${TOTAL_PROMPTS} original prompts`));
  for (const [category, { truths, dares }] of Object.entries(PROMPT_POOLS)) {
    const editorial = doc.textContent;
    assert.match(editorial, new RegExp(`${category === "classic" ? "Classic" : "Party"}.*${truths.length} Truths.*${dares.length}.*Dares`));
  }
  assert.match(doc.textContent, /Both combines all 160 prompts: 80 Truths and 80 Dares/);
  assert.match(doc.textContent, /same player count and category/);
  assert.match(doc.textContent, /No signup or download/);
});

test("one WebApplication matches the route, copy and free EN offer", () => {
  const schemas = doc.querySelectorAll('script[type="application/ld+json"]').map((node) => JSON.parse(node.textContent));
  assert.deepEqual(schemas.map((schema) => schema["@type"]), ["WebApplication"]);
  const game = schemas[0];
  assert.equal(game.url, url);
  assert.equal(game.name, "Truth or Dare Online");
  assert.equal(game.inLanguage, "en-US");
  assert.equal(game.description, doc.querySelector('meta[name="description"]').getAttribute("content"));
  assert.deepEqual(game.offers, { "@type": "Offer", price: "0", priceCurrency: "USD" });
  assert.equal(game.aggregateRating, undefined);
});

test("the two games and the two-person guide have contextual, resolving links", () => {
  assert.equal(home.getElementById("en-home-truth-or-dare").getAttribute("href"), pathname);
  assert.equal(hub.getElementById("en-catalog-truth-or-dare").getAttribute("href"), pathname);
  assert.equal(hub.querySelectorAll(".en-catalog-card").length, 2);
  for (const card of hub.querySelectorAll(".en-catalog-card")) {
    assert.match(card.textContent, /2–12 players/);
    assert.match(card.textContent, /One shared screen/);
    assert.match(card.textContent, /Play /);
  }
  assert.match(hub.getElementById("en-catalog-kings-cup").parentNode.textContent, /Digital deck/);
  assert.match(hub.getElementById("en-catalog-truth-or-dare").parentNode.textContent, /No materials/);
  assert.equal(guide.getElementById("two-truth-or-dare-game").getAttribute("href"), pathname);
  for (const [id, target] of [["tod-games", "/en/games"], ["tod-kings-cup", "/en/games/kings-cup"], ["tod-two-guide", "/en/blog/drinking-games-for-2"], ["tod-responsible", "/en/about#responsible-play"]]) {
    assert.equal(doc.getElementById(id).getAttribute("href"), target);
  }
  assert.equal(doc.getElementById("tod-player-count").tagName, "SELECT");
  assert.equal(doc.querySelector('label[for="tod-player-count"]').textContent, "Players");
  assert.equal(doc.getElementById("tod-start").getAttribute("type"), "button");
});

test("the published page appears once in the 80-URL union and no variants are exported", () => {
  const audit = auditStaticExport();
  assert.deepEqual(validateStaticExportAudit(audit), []);
  assert.equal(audit.pages.length, 80);
  assert.equal(audit.sitemap.urls.length, 80);
  assert.equal(audit.sitemap.urls.filter((entry) => entry === url).length, 1);
  assert.deepEqual(audit.pages.find((page) => page.pathname === pathname).languages, []);
  assert.deepEqual(audit.pages.find((page) => page.pathname === "/juegos/verdad-o-reto").languages, []);
  for (const absent of ["/en/games/truth-or-dare/rules", "/en/games/truth-or-dare/variants", "/en/blog/truth-or-dare"]) {
    assert.equal(existsSync(`out${absent}.html`), false);
  }
});

test("EN game has one client island without advertising, storage, sound or Spanish provider dependencies", () => {
  const pageSource = read("app/(english)/en/games/truth-or-dare/page.tsx");
  const clientSource = read("components/games/truth-or-dare/TruthOrDareGame.tsx") + read("lib/games/truth-or-dare.ts") + read("lib/data/truth-or-dare-prompts.ts");
  assert.doesNotMatch(pageSource, /["']use client["']|AppContext|VerdadRetoExperimentAd/);
  assert.equal((pageSource.match(/<TruthOrDareGame\s*\/>/g) ?? []).length, 1);
  assert.doesNotMatch(clientSource, /AppContext|useApp|AdSense|adsbygoogle|googlesyndication|CookieBanner|@vercel\/analytics|InstallPWA|localStorage|sessionStorage|document\.cookie|fetch\(|AudioContext|playSound|vibrateDevice|navigator\.vibrate/);
  assert.equal(doc.querySelectorAll('link[rel="manifest"], ins.adsbygoogle, [data-ad-slot], meta[name="google-adsense-account"]').length, 0);
  const scripts = doc.querySelectorAll("script[src]").map((node) => node.getAttribute("src"));
  const shipped = scripts.filter((src) => src.startsWith("/")).map((src) => read(`out${src}`)).join("\n");
  assert.match(shipped, /tod-start/);
  assert.doesNotMatch(shipped, /adsbygoogle|googlesyndication|beforeinstallprompt|bg_pwa_dismissed|cookie_consent|navigator\.vibrate|AudioContext/);
  for (const other of [home, hub, guide, parse(read("out/en/games/kings-cup.html"))]) {
    const otherSources = other.querySelectorAll("script[src]").map((node) => node.getAttribute("src"));
    assert.equal(otherSources.some((src) => src && src.startsWith("/") && read(`out${src}`).includes("tod-start")), false);
  }
});
