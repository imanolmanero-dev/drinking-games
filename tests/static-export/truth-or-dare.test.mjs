import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import { auditStaticExport, validateStaticExportAudit } from "../../scripts/audit-static-export.mjs";

const require = createRequire(import.meta.url);
const { parse } = require("next/dist/compiled/node-html-parser");
const read = (path) => readFileSync(path, "utf8");
const pathname = "/en/games/truth-or-dare";
const url = `https://bebergames.com${pathname}`;
const doc = parse(read("out/en/games/truth-or-dare.html"));
const home = parse(read("out/en.html"));
const hub = parse(read("out/en/games.html"));
const guide = parse(read("out/en/blog/drinking-games-for-2.html"));

test("Truth or Dare exports a self-canonical English game with useful static content", () => {
  assert.equal(doc.querySelector("html").getAttribute("lang"), "en-US");
  assert.equal(doc.querySelector("title").textContent, "Truth or Dare Online — Play With Friends | BeberGames");
  assert.equal(doc.querySelector('meta[name="description"]').getAttribute("content"), "Play Truth or Dare online with 2–12 friends on one shared screen. Choose from 30 truths and 30 dares, pass freely, and play without alcohol.");
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
