import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import { guideChanges, proseHash } from "../helpers/affected-guides.mjs";

const { parse } = createRequire(import.meta.url)("next/dist/compiled/node-html-parser");
const rules = {
  "ring-of-fire-reglas-cartas": {
    sections: 13, selector: "h3", start: "As —",
    required: ["ola de brazos", "retira la copa", "La cascada también se juega con gestos"],
    removed: /nadie puede dejar de beber|se bebe la copa del rey entera|obliga a quien lo saque/i,
  },
  "juegos-para-beber-sin-cartas": {
    sections: 12, selector: "h2", start: "1.",
    required: ["tarjetas de Verdad o Reto", "los votos solo sirven para comparar respuestas", "Bomba virtual"],
    removed: /vaso entero de castigo|último en gritar bebe|bebes [12] tragos?|minoritaria.*?, beben/i,
  },
  "drinking-games-reglas": {
    sections: 10, selector: "h2", start: "1.",
    required: ["vaso vacío", "adivinar el título", "Pasa la pila", "El As propone una ola de brazos"],
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

test("the Beer Pong referral describes the water-cup variant and the FAQ uses its own games' outcomes", () => {
  const doc = parse(readFileSync("out/blog/drinking-games-reglas.html", "utf8"));
  const article = doc.querySelector("article");
  const link = article.querySelector('.prose a[href="/blog/beer-pong-reglas-completas"]');
  assert.match(link.textContent, /rerack/i);
  assert.match(link.parentNode.textContent, /tres vasos con agua.*juntarlos en triángulo antes del siguiente tiro/);
  const faq = article.querySelectorAll("h3").find(h => h.textContent === "¿Cuáles son las reglas generales de los drinking games?");
  const answer = faq.parentNode.querySelector("p").textContent;
  assert.match(answer, /Quarters, cada acierto vale un punto/);
  assert.match(answer, /Power Hour.*reconocer las canciones.*último fragmento/);
  assert.doesNotMatch(answer, /puntúan.*respuestas/i);
});

test("the questions category keeps its four playable destinations and their reviewed card descriptions", () => {
  const doc = parse(readFileSync("out/juegos/categorias/preguntas.html", "utf8"));
  const cards = doc.querySelectorAll("main a").filter(a => a.querySelector("h3"));
  assert.deepEqual(cards.map(a => a.getAttribute("href")), [
    "/juegos/yo-nunca", "/juegos/verdad-o-reto", "/juegos/quien-es-mas-probable", "/juegos/yo-prefiero",
  ]);
  const descriptions = cards.map(a => a.querySelector("p").textContent);
  for (const [i, action] of [/puede bajar un dedo/, /pasar cualquier tarjeta sin penalización/, /señalad a la vez/, /60 dilemas/].entries()) {
    assert.match(descriptions[i], action);
    assert.doesNotMatch(descriptions[i], /bebe|tragos?|fondo blanco|siempre pierde/i);
  }
});
