import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { parse } = require("next/dist/compiled/node-html-parser");
const read = path => parse(readFileSync(`out/${path}.html`, "utf8"));
test("Guides directory exports editorial choices, metadata, breadcrumb and exact shared navigation", () => {
  const doc = read("en/guides");
  assert.equal(doc.querySelector("h1").textContent, "Drinking Game Guides");
  assert.equal(doc.querySelector('link[rel="canonical"]').getAttribute("href"), "https://bebergames.com/en/guides");
  assert.equal(doc.querySelectorAll("link[hreflang]").length, 0);
  assert.deepEqual(doc.querySelectorAll('script[type="application/ld+json"]').map(n => JSON.parse(n.textContent)["@type"]), ["BreadcrumbList"]);
  for (const path of ["/en/blog/drinking-games-for-2", "/en/blog/drinking-games-without-cards", "/en/blog/how-to-choose-a-drinking-game", "/en/halloween-drinking-games"]) assert.equal(doc.querySelectorAll(`.en-copy a[href="${path}"]`).length, 2);
  assert.ok(doc.getElementById("guides-games"));
  assert.equal(doc.querySelectorAll("h1").length, 1);
  for (const path of ["en", "en/games", "en/guides", "en/blog/how-to-choose-a-drinking-game", "en/games/never-have-i-ever"]) {
    const nav = read(path).querySelectorAll('.en-nav-links a');
    assert.deepEqual(nav.map(n => n.textContent.trim()), ["Home", "Games", "Guides", "About", "Contact"]);
    assert.deepEqual(nav.map(n => n.getAttribute("href")), ["/en", "/en/games", "/en/guides", "/en/about", "/en/contact"]);
    assert.equal(nav.some(n => n.hasAttribute("aria-current")), false);
  }
});
