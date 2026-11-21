import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import { guideChanges, proseHash } from "../helpers/affected-guides.mjs";

const { parse } = createRequire(import.meta.url)("next/dist/compiled/node-html-parser");
const rules = {
  "ring-of-fire-reglas-cartas": {
    sections: 13, selector: "h3", start: "As —",
    required: ["ola de brazos", "retira la copa", "Muestra otras reglas"],
    removed: /nadie puede dejar de beber|se bebe la copa del rey entera|obliga a quien lo saque/i,
  },
  "juegos-para-beber-sin-cartas": {
    sections: 12, selector: "h2", start: "1.",
    required: ["tarjetas de Verdad o Reto", "los votos solo sirven para comparar respuestas", "Bomba virtual"],
    removed: /vaso entero de castigo|último en gritar bebe|bebes [12] tragos?|minoritaria.*?, beben/i,
  },
  "drinking-games-reglas": {
    sections: 10, selector: "h2", start: "1.",
    required: ["vaso vacío", "adivinar el título", "Pasa la pila", "otras reglas para el As"],
    removed: /60 chupitos|acabaréis mareados|bebes doble|beberse toda la mezcla|death cup/i,
  },
};

for (const [slug, change] of Object.entries(guideChanges)) {
  test(slug + " renders the reviewed table rules, metadata and matching FAQ", () => {
    const doc = parse(readFileSync("out/blog/" + slug + ".html", "utf8"));
    const prose = doc.querySelector("article .prose");
    assert.equal(proseHash(prose), change.prose[1]);
    const { sections, selector, start, required, removed } = rules[slug];
    const headings = prose.querySelectorAll(selector).map(h => h.textContent);
    const first = headings.findIndex(h => h.includes(start));
    assert.ok(first >= 0);
    const gameHeadings = headings.slice(first).filter(h => slug.startsWith("ring-")
      ? / — /.test(h) : /^\d+\./.test(h));
    assert.equal(gameHeadings.length, sections);
    const article = doc.querySelector("article");
    const schemas = article.querySelectorAll('script[type="application/ld+json"]').map(n => JSON.parse(n.textContent));
    const url = "https://bebergames.com/blog/" + slug;
    assert.equal(doc.querySelector('link[rel="canonical"]').getAttribute("href"), url);
    const post = schemas.find(s => s["@type"] === "Article");
    assert.equal(post.url, url);
    assert.equal(post.headline, article.querySelector("h1").textContent);
    assert.equal(post.description, doc.querySelector('meta[name="description"]').getAttribute("content"));
    assert.equal(post.description, doc.querySelector('meta[property="og:description"]').getAttribute("content"));
    for (const q of schemas.find(s => s["@type"] === "FAQPage").mainEntity) {
      const heading = article.querySelectorAll("h3").find(h => h.textContent === q.name);
      assert.equal(heading.parentNode.querySelector("p").textContent, q.acceptedAnswer.text);
    }
    article.querySelectorAll("script").forEach(n => n.remove());
    for (const phrase of required) assert.ok(article.textContent.includes(phrase), phrase);
    assert.match(article.textContent, /pasar (?:cualquier turno )?sin beber/i);
    assert.doesNotMatch(article.textContent, removed);
  });
}
