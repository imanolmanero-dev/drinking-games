import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import { beforeBatch3a, beforeBatch3b } from "../helpers/critical-games-2c-source.mjs";

const require = createRequire(import.meta.url);
const { parse } = require("next/dist/compiled/node-html-parser");
const matter = require("gray-matter");
const page = path => parse(readFileSync(`out${path}.html`, "utf8"));
const index = page("/blog");
const base = "75c305389cc8a560b62e6d0ef5d81af17efacf67";
const contracts = [
  ["los-20-mejores-juegos", 20, /Cada minuto cambia la canción/, /chupito de cerveza cada minuto|el que lo hunda se lo bebe/i],
  ["juegos-para-beber-rapidos", 8, /el bote vuelve al centro/, /te bebes todo lo acumulado|el perdedor bebe/i],
  ["juegos-de-mesa-para-beber", 12, /Perder una batalla cuesta ejércitos/, /vaso entero|pagas el alquiler.{0,30}bebes/i],
  ["juegos-para-beber-con-dados", 8, /Seis iguales \(Chingón\):\s*seis puntos/, /todos menos tú beben|bebe 2 tragos/i],
  ["juegos-para-beber-con-cartas", 12, /carta más baja paga la apuesta acordada/, /bebe todos los tragos apostados|todos beben/i],
  ["juegos-beber-baraja-espanola", 5, /Si la banca llega a siete y medio exactos, gana todos sus duelos/, /toda la mesa bebe|no logras hacer pareja.{0,40}bebes/i],
];

for (const [slug, count, revised, removed] of contracts) {
  test(slug + " keeps its inventory, article identity and shared FAQ and excerpt", () => {
    const path = "/blog/" + slug;
    const file = `content${path}.mdx`;
    const source = readFileSync(file, "utf8");
    const before = matter(beforeBatch3a(file, source));
    const current = matter(source);
    assert.throws(() => beforeBatch3a(file, source + "\nUnexpected edit"), { code: "ERR_ASSERTION" });
    assert.throws(() => beforeBatch3a(file, before.content), { code: "ERR_ASSERTION" });
    assert.deepEqual({ ...current.data, excerpt: before.data.excerpt }, before.data);
    const doc = page(path);
    const article = doc.querySelector("article");
    const prose = article.querySelector(".prose");
    const numbered = prose.querySelectorAll("h2").flatMap(h => h.textContent.match(/^\d+(?=\.)/) ?? []);
    assert.deepEqual(numbered.map(Number), Array.from({ length: count }, (_, i) => i + 1));
    assert.deepEqual(prose.querySelectorAll("h2[id],h3[id]").map(h => h.id),
      [...before.content.matchAll(/<h[23] id="([^"]+)"/g)].map(m => m[1]));
    assert.equal(article.querySelector("h1").textContent, before.data.title);
    assert.equal(doc.querySelector('link[rel="canonical"]').getAttribute("href"), "https://bebergames.com" + path);
    assert.equal(doc.querySelector('meta[property="article:published_time"]').getAttribute("content"), before.data.date);
    const schemas = doc.querySelectorAll('script[type="application/ld+json"]').map(n => JSON.parse(n.textContent));
    for (const description of [
      doc.querySelector('meta[name="description"]').getAttribute("content"),
      doc.querySelector('meta[property="og:description"]').getAttribute("content"),
      schemas.find(s => s["@type"] === "Article").description,
      index.querySelector(`main a[href="${path}"] p`).textContent,
    ]) assert.equal(description, current.data.excerpt);
    const faq = schemas.find(s => s["@type"] === "FAQPage");
    assert.ok(faq.mainEntity.length >= 3);
    for (const item of faq.mainEntity) {
      const question = article.querySelectorAll("h3").find(h => h.textContent === item.name);
      assert.equal(question.parentNode.querySelector("p").textContent, item.acceptedAnswer.text);
      assert.doesNotMatch(item.acceptedAnswer.text, removed);
    }
    assert.match(prose.textContent, revised);
    assert.doesNotMatch(prose.textContent, removed);
    for (const match of before.content.matchAll(/\]\((\/[^)]+)\)|href="(#[^"]+)"/g)) {
      const href = match[1] ?? match[2];
      assert.ok(prose.querySelector(`a[href="${href}"]`), href);
      assert.ok(href.startsWith("#") ? prose.querySelector(href) : existsSync(`out${href === "/" ? "/index" : href}.html`), href);
    }
  });
}

test("FAQ source history preserves every unrelated entry and the release freezes", () => {
  const file = "lib/data/blog-faqs.ts";
  const candidate = beforeBatch3b(file, readFileSync(file, "utf8"));
  const old = execFileSync("git", ["show", `${base}:${file}`], { encoding: "utf8" });
  const removeReviewed = source => contracts.reduce((text, [slug]) =>
    text.replace(new RegExp(`^  "${slug}": \\[\\n[\\s\\S]*?^  \\],\\n`, "m"), ""), source.replaceAll("\r\n", "\n"));
  assert.equal(removeReviewed(candidate), removeReviewed(old));
  const game = page("/juegos/verdad-o-reto");
  assert.equal(game.querySelector('meta[name="description"]').getAttribute("content"),
    "Juega a Verdad o Reto online con amigos desde el navegador. Elige la intensidad y descubre preguntas y retos al azar en cada turno.");
});
