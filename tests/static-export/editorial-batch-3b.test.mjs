import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import { beforeBatch3b, beforeBatch3c } from "../helpers/critical-games-2c-source.mjs";

const require = createRequire(import.meta.url);
const { parse } = require("next/dist/compiled/node-html-parser");
const matter = require("gray-matter");
const inventory = JSON.parse(readFileSync(new URL("../fixtures/editorial-batch-3b-inventory.json", import.meta.url)));
const page = path => parse(readFileSync(`out${path}.html`, "utf8"));
const index = page("/blog");
const contracts = {
  "retos-para-fiestas": [3, /55/, /rechaza un reto, bebe|terminar tu bebida entera|mu[eé]stra el mensaje/i],
  "juegos-para-beber-dos-personas": [0, /diez juegos para dos/, /bebes el doble|sube los tragos/i],
  "juegos-para-beber-en-pareja": [3, /Un acierto vale un punto/, /se bebe[n]? 2 tragos|tiene que beber/i],
  "verdad-o-reto-preguntas-buenas": [3, /45 preguntas y 35 retos/, /mentiroso bebe|cada jugador tiene 1 veto/i],
  "preguntas-yo-nunca-parejas": [3, /Si ninguno responde, leed la siguiente frase/, /como castigo por frase|obligar al otro/i],
  "juegos-para-beber-sin-alcohol": [0, /nadie tiene que tomar un sorbo/, /salsa picante|bebe 2 tragos|come[rse]* un trozo/i],
};

for (const [slug, { headings, headingChanges, lists, links, promptChanges }] of Object.entries(inventory)) {
  test(slug + " preserves the reviewed inventory, copy, metadata and FAQ contract", () => {
    const path = "/blog/" + slug;
    const file = `content${path}.mdx`;
    const source = readFileSync(file, "utf8");
    const old = matter(beforeBatch3b(file, source));
    const current = matter(source);
    assert.throws(() => beforeBatch3b(file, source + "\nUnreviewed change"), { code: "ERR_ASSERTION" });
    const renamed = slug === "retos-para-fiestas" ? "Retos para Fiestas: 55 Desafíos Divertidos por Nivel" : old.data.title;
    assert.deepEqual(current.data, { ...old.data, title: renamed, excerpt: current.data.excerpt });

    const numbered = body => {
      const map = new Map();
      for (const [, number, text] of body.matchAll(/^(\d+)\. (.+)$/gm)) {
        if (!map.has(Number(number))) map.set(Number(number), text);
      }
      return map;
    };
    const oldPrompts = numbered(old.content);
    const newPrompts = numbered(current.content);
    const changes = new Map(promptChanges.map(([number, before, after]) => [number, { before, after }]));
    for (const [number, { before, after }] of changes) {
      assert.equal(oldPrompts.get(number), before, `original prompt ${number}`);
      assert.equal(newPrompts.get(number), after, `revised prompt ${number}`);
    }
    if (slug === "retos-para-fiestas" || slug === "verdad-o-reto-preguntas-buenas") {
      for (const [number, text] of oldPrompts) assert.equal(newPrompts.get(number), changes.get(number)?.after ?? text);
    }
    if (slug === "preguntas-yo-nunca-parejas") {
      const statements = body => [...body.matchAll(/^\d+\. Yo nunca .*$/gm)].map(x => x[0]);
      assert.equal(statements(old.content).length, 50);
      assert.deepEqual(statements(current.content), statements(old.content));
    }

    const doc = page(path);
    const article = doc.querySelector("article");
    const prose = article.querySelector(".prose");
    const expectedHeadings = headings.map(row => [...row]);
    for (const [i, before, after] of headingChanges) {
      assert.equal(expectedHeadings[i][2], before);
      expectedHeadings[i][2] = after;
    }
    assert.deepEqual(prose.querySelectorAll("h2,h3,h4").map(h => [h.tagName, h.id, h.textContent]), expectedHeadings);
    assert.deepEqual(prose.querySelectorAll("ol").map(n => [Number(n.getAttribute("start") ?? 1), n.querySelectorAll("li").length]), lists);
    assert.deepEqual(prose.querySelectorAll("a").map(a => a.getAttribute("href")), links);
    for (const href of links) assert.ok(existsSync(`out${href === "/" ? "/index" : href}.html`), href);
    assert.equal(article.querySelector("h1").textContent, renamed);
    assert.equal(doc.querySelector("title").textContent, renamed + " | BeberGames");
    assert.equal(doc.querySelector('link[rel="canonical"]').getAttribute("href"), "https://bebergames.com" + path);
    assert.equal(doc.querySelector('meta[property="article:published_time"]').getAttribute("content"), old.data.date);

    const schemas = article.querySelectorAll('script[type="application/ld+json"]').map(n => JSON.parse(n.textContent));
    for (const description of [
      doc.querySelector('meta[name="description"]').getAttribute("content"),
      doc.querySelector('meta[property="og:description"]').getAttribute("content"),
      schemas.find(s => s["@type"] === "Article").description,
      index.querySelector(`main a[href="${path}"] p`).textContent,
    ]) assert.equal(description, current.data.excerpt);
    const [count, required, forbidden] = contracts[slug];
    const faq = schemas.find(s => s["@type"] === "FAQPage");
    assert.equal(faq?.mainEntity.length ?? 0, count);
    for (const item of faq?.mainEntity ?? []) {
      const heading = article.querySelectorAll("h3").find(n => n.textContent === item.name);
      assert.equal(heading.parentNode.querySelector("p").textContent, item.acceptedAnswer.text);
      assert.doesNotMatch(item.acceptedAnswer.text, forbidden);
    }
    assert.match(prose.textContent, required);
    assert.doesNotMatch(prose.textContent, forbidden);
  });
}

test("FAQ edits preserve every answer outside Batch 3B", () => {
  const file = "lib/data/blog-faqs.ts";
  const source = readFileSync(file, "utf8");
  const current = beforeBatch3c(file, source).replaceAll("\r\n", "\n");
  const previous = beforeBatch3b(file, source);
  const untouched = source => Object.entries(contracts).filter(([, [count]]) => count > 0).reduce((text, [slug]) =>
    text.replace(new RegExp(`^  "${slug}": \\[\\n[\\s\\S]*?^  \\],\\n`, "m"), ""), source);
  assert.equal(untouched(current), untouched(previous));
});
