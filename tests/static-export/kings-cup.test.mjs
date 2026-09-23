import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import { auditStaticExport, validateStaticExportAudit } from "../../scripts/audit-static-export.mjs";

const require = createRequire(import.meta.url);
const { parse } = require("next/dist/compiled/node-html-parser");
const read = (file) => readFileSync(file, "utf8");
const doc = parse(read("out/en/games/kings-cup.html"));
const url = "https://bebergames.com/en/games/kings-cup";
const schemas = doc.querySelectorAll('script[type="application/ld+json"]').map((node) => JSON.parse(node.textContent));

test("King's Cup exports one canonical, expected title/H1, en-US and complete server-visible editorial content", () => {
  assert.equal(doc.querySelector("html").getAttribute("lang"), "en-US");
  assert.deepEqual(doc.querySelectorAll('link[rel="canonical"]').map((node) => node.getAttribute("href")), [url]);
  assert.deepEqual(doc.querySelectorAll("h1").map((node) => node.textContent), ["King's Cup Drinking Game"]);
  assert.equal(doc.querySelector("title").textContent, "King's Cup Drinking Game — Play Online & Rules | BeberGames");
  for (const id of ["how-to-play", "rules", "card-meanings", "setup", "variations", "play-responsibly", "faq"]) assert.equal(doc.getElementById(id)?.tagName, "H2", id);
  assert.ok(doc.querySelector("#kc-start"));
  assert.ok(doc.querySelector("#kings-cup-game").range[0] < doc.querySelector("#how-to-play").range[0]);
  const rows = doc.querySelectorAll("tbody tr");
  assert.deepEqual(rows.map((row) => row.querySelector("th").textContent), ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"]);
  for (const row of rows) assert.equal(row.querySelectorAll("td").length, 2);
});

test("Game schema uses the correct English URL/offer and FAQ exactly matches six visible answers", () => {
  assert.deepEqual(schemas.map((schema) => schema["@type"]).sort(), ["FAQPage", "WebApplication"]);
  const game = schemas.find((schema) => schema["@type"] === "WebApplication");
  assert.equal(game.url, url);
  assert.equal(game.inLanguage, "en-US");
  assert.equal(game.name, "King's Cup Drinking Game");
  assert.equal(game.description, doc.querySelector('meta[name="description"]').getAttribute("content"));
  assert.deepEqual(game.offers, { "@type": "Offer", price: "0", priceCurrency: "USD" });
  assert.equal(game.aggregateRating, undefined);
  const questions = schemas.find((schema) => schema["@type"] === "FAQPage").mainEntity;
  assert.equal(questions.length, 6);
  questions.forEach((question, index) => {
    const heading = doc.getElementById(`kc-faq-${index}`);
    assert.equal(heading.textContent, question.name);
    assert.equal(heading.parentNode.querySelector("p").textContent, question.acceptedAnswer.text);
  });
});

test("home and registry-driven hub link both published English games", () => {
  const hub = parse(read("out/en/games.html"));
  const links = hub.querySelectorAll('a[href^="/en/games/"]');
  assert.deepEqual(links.map((link) => link.getAttribute("href")), ["/en/games/kings-cup", "/en/games/truth-or-dare"]);
  assert.equal(links[0].textContent, "Play King's Cup");
  assert.doesNotMatch(hub.textContent, /no playable games/i);
  const home = parse(read("out/en.html"));
  assert.equal(home.getElementById("en-home-kings-cup").getAttribute("href"), "/en/games/kings-cup");
  assert.equal(home.getElementById("en-home-truth-or-dare").getAttribute("href"), "/en/games/truth-or-dare");
});

test("King's Cup is in the 80-URL union once, with no false ES or Ring of Fire hreflang", () => {
  const audit = auditStaticExport();
  assert.deepEqual(validateStaticExportAudit(audit), []);
  assert.equal(audit.sitemap.urls.length, 80);
  assert.equal(audit.sitemap.urls.filter((entry) => entry === url).length, 1);
  for (const path of ["/en/games/kings-cup", "/juegos/rey-de-la-copa", "/juegos/rey-de-la-copa/reglas", "/juegos/ring-of-fire", "/juegos/ring-of-fire/reglas"]) {
    assert.deepEqual(audit.pages.find((page) => page.pathname === path).languages, [], path);
  }
  assert.equal(doc.getElementById("language-switch").textContent, "Spanish home");
  for (const path of ["/en/games/kings-cup/rules", "/en/blog/kings-cup-rules", "/en/games/ring-of-fire", "/en/games/circle-of-death"]) {
    const changed = structuredClone(audit);
    changed.exportedInventory.push(path);
    assert.ok(validateStaticExportAudit(changed).length > 0, path);
  }
  assert.equal(doc.getElementById("kc-truth-or-dare").getAttribute("href"), "/en/games/truth-or-dare");
  assert.equal(doc.getElementById("kc-two-guide").getAttribute("href"), "/en/blog/drinking-games-for-2");
});

test("new copy and shipped game code exclude dangerous instructions and private integrations", () => {
  const content = parse(read("out/en/games/kings-cup.html"));
  content.querySelectorAll("script, style").forEach((node) => node.remove());
  const clientSource = read("components/games/kings-cup/KingsCupGame.tsx") + read("lib/games/kings-cup.ts");
  const copy = content.textContent + clientSource;
  assert.doesNotMatch(copy, /chug(?:ging)?|finish your drink|drink the cup|down your drink|drink as fast|waterfall until|can't stop drinking|punishment drink|18\+|21\+|\bTODO\b|placeholder|lorem ipsum|thousands of players|#1|\b(jugadores|juegos|siguiente|privacidad)\b/i);
  assert.doesNotMatch(clientSource, /AppContext|AdSense|adsbygoogle|InstallPWA|localStorage|sessionStorage|document\.cookie|fetch\(|AudioContext|navigator\.vibrate/);
  assert.equal(doc.querySelectorAll('link[rel="manifest"], ins.adsbygoogle, [data-ad-slot], form, input').length, 0);
  assert.equal(doc.querySelector("label").getAttribute("for"), "kc-player-count");
  assert.equal(doc.getElementById("kc-start").getAttribute("type"), "button");
});
