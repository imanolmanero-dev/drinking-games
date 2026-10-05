import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import { assertReyGuideContract } from "../helpers/es03-guide-contract.mjs";
const require = createRequire(import.meta.url);
require("tsx/cjs");
const { parse } = require("next/dist/compiled/node-html-parser");
const { blogFAQs } = require("../../lib/data/blog-faqs.ts");
const doc = path => parse(readFileSync(`out${path}.html`, "utf8"));
const rey = doc("/blog/rey-de-la-copa-reglas");
const cards = doc("/blog/juegos-para-beber-con-cartas");
const game = doc("/juegos/rey-de-la-copa");
const category = doc("/juegos/categorias/cartas");

test("exported Rey guide and FAQPage preserve optional Waterfall and central-cup rules", () => {
  const prose = rey.querySelector(".prose");
  const section = label => {
    const heading = prose.querySelectorAll("h3").find(n => n.textContent.startsWith(label));
    assert.ok(heading, label);
    const nodes = heading.parentNode.childNodes;
    const following = nodes.slice(nodes.indexOf(heading) + 1);
    const end = following.findIndex(n => /^H[23]$/.test(n.tagName) || n.tagName === "HR");
    return following.slice(0, end < 0 ? undefined : end).map(n => n.textContent).join(" ");
  };
  const faq = rey.querySelectorAll('script[type="application/ld+json"]').map(n => JSON.parse(n.textContent)).find(s => s["@type"] === "FAQPage");
  assertReyGuideContract({
    intro: prose.querySelectorAll("p").find(n => n.textContent.includes("Cuarto Rey")).textContent,
    ace: section("As —"),
    kings: section("Rey (K) —"),
    faqs: faq.mainEntity.map(q => q.acceptedAnswer.text),
    fullText: prose.textContent,
  });
});

test("ES-03 alias and contextual link graph export once per intended context", () => {
  assert.equal((rey.querySelector(".prose").textContent.match(/Cuarto Rey/g) ?? []).length, 1);
  for (const [root, href] of [
    [game.querySelector("main"), "/blog/rey-de-la-copa-reglas"],
    [game.querySelector("main"), "/juegos/rey-de-la-copa/reglas"],
    [rey.querySelector(".prose"), "/blog/juegos-para-beber-con-cartas"],
    [cards.querySelector(".prose"), "/blog/rey-de-la-copa-reglas"],
    [cards.querySelector(".prose"), "/juegos/la-piramide"],
    [category.querySelector("main"), "/blog/juegos-para-beber-con-cartas"],
  ]) {
    const anchors = root.querySelectorAll(`a[href="${href}"]`);
    assert.equal(anchors.length, 1, href);
    assert.ok(anchors[0].textContent.trim().length > 5);
    assert.ok(existsSync(`out${href}.html`), href);
  }
  assert.equal(cards.querySelector(".prose").querySelectorAll('a[href="/juegos/rey-de-la-copa"]').length, 1);
  const cta = game.querySelectorAll("button").find(n => n.textContent.includes("Empezar a jugar"));
  assert.ok(cta);
  assert.ok(game.toString().indexOf(cta.toString()) < game.toString().indexOf(game.querySelector('a[href="/blog/rey-de-la-copa-reglas"]').toString()));
  const pyramidLink = cards.querySelector('a[href="/juegos/la-piramide"]');
  assert.match(pyramidLink.parentNode.textContent, /seis filas.*cinco/);
});

test("Rey FAQ schema stays identical to every visible answer; title/canonical/date are preserved", () => {
  const faq = rey.querySelectorAll('script[type="application/ld+json"]').map(n => JSON.parse(n.textContent)).find(s => s["@type"] === "FAQPage");
  assert.deepEqual(faq.mainEntity.map(q => ({ q: q.name, a: q.acceptedAnswer.text })), blogFAQs["rey-de-la-copa-reglas"]);
  for (const {q, a} of blogFAQs["rey-de-la-copa-reglas"]) {
    const heading = rey.querySelectorAll("h3").find(n => n.textContent === q);
    assert.ok(heading);
    assert.equal(heading.parentNode.querySelector("p").textContent, a);
  }
  const fixture = JSON.parse(readFileSync("tests/fixtures/es-routes.json", "utf8"));
  for (const [path, page] of [["/blog/rey-de-la-copa-reglas",rey],["/blog/juegos-para-beber-con-cartas",cards],["/juegos/rey-de-la-copa",game],["/juegos/categorias/cartas",category]]) {
    const expected = fixture.find(r => r.pathname === path);
    assert.equal(page.querySelector("title").textContent, expected.title);
    assert.equal(page.querySelector("h1").textContent, expected.h1);
    assert.equal(page.querySelector('link[rel="canonical"]').getAttribute("href"), `https://bebergames.com${path}`);
  }
  assert.equal(rey.querySelector('meta[property="article:published_time"]').getAttribute("content"), "2026-07-12");
});
