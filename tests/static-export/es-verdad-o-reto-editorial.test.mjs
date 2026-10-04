import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import { auditStaticExport, readRouteContract } from "../../scripts/audit-static-export.mjs";

const require = createRequire(import.meta.url);
require("tsx/cjs");
const { parse } = require("next/dist/compiled/node-html-parser");
const matter = require("gray-matter");
const { VERDADES, RETOS } = require("../../lib/data/verdad-o-reto.ts");
const slug = "preguntas-picantes-verdad-o-reto";
const article = matter(readFileSync(`content/blog/${slug}.mdx`, "utf8"));
const game = parse(readFileSync("out/juegos/verdad-o-reto.html", "utf8"));
const blog = parse(readFileSync(`out/blog/${slug}.html`, "utf8"));

test("ES-01 exports exact game counts, all three levels and a secondary working article link", () => {
  for (const text of [game.textContent, game.querySelector('meta[name="description"]').getAttribute("content"), game.querySelector('meta[property="og:description"]').getAttribute("content")]) {
    assert.match(text, new RegExp(`${VERDADES.length} verdades y ${RETOS.length} retos`));
  }
  for (const level of ["Soft", "Normal", "Picante"]) assert.match(game.textContent, new RegExp(`Nivel ${level}`));
  const anchors = game.querySelectorAll(`a[href="/blog/${slug}"]`);
  assert.equal(anchors.length, 1);
  assert.match(anchors[0].parentNode.textContent, /nivel Picante/);
  assert.ok(game.querySelectorAll("button").some((node) => node.textContent.trim() === "Empezar a jugar"));
  assert.ok(readRouteContract().some((route) => route.pathname === `/blog/${slug}`));
  const audit = auditStaticExport();
  assert.equal(audit.pages.length, 80);
  assert.equal(audit.pages.filter(({ lang }) => lang === "es").length, 70);
  assert.equal(audit.pages.filter(({ lang }) => lang === "en-US").length, 10);
});

test("ES-01 article exports 50 questions/15 dares and propagates accurate metadata without changing publication date", () => {
  assert.equal(blog.querySelectorAll("h1").length, 1);
  assert.equal(blog.querySelector("h1").textContent, article.data.title);
  assert.equal(blog.querySelector("title").textContent, `${article.data.title} | BeberGames`);
  for (const selector of ['meta[name="description"]', 'meta[property="og:description"]']) assert.equal(blog.querySelector(selector).getAttribute("content"), article.data.excerpt);
  const prose = blog.querySelector(".prose");
  const lists = prose.querySelectorAll("ol");
  assert.deepEqual(lists.map((list) => list.querySelectorAll("li").length), [15, 15, 10, 10, 15]);
  assert.equal(lists.slice(0, -1).reduce((sum, list) => sum + list.querySelectorAll("li").length, 0), 50);
  assert.equal(lists.at(-1).querySelectorAll("li").length, 15);
  assert.doesNotMatch(prose.textContent, /65 preguntas/i);
  assert.equal(prose.querySelectorAll('a[href="/juegos/verdad-o-reto"]').length, 2);
  const schemas = blog.querySelectorAll('script[type="application/ld+json"]').map((node) => JSON.parse(node.textContent));
  const posting = schemas.find((schema) => ["Article", "BlogPosting"].includes(schema["@type"]));
  assert.ok(posting);
  assert.equal(posting.headline, article.data.title);
  assert.equal(posting.datePublished, article.data.date);
});
