import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import { beforeBatch3c } from "../helpers/critical-games-2c-source.mjs";

const require = createRequire(import.meta.url);
const { parse } = require("next/dist/compiled/node-html-parser");
const matter = require("gray-matter");
const inventory = JSON.parse(readFileSync(new URL("../fixtures/editorial-batch-3c-inventory.json", import.meta.url)));
const page = path => parse(readFileSync("out" + path + ".html", "utf8"));
const index = page("/blog");
const headingChanges = new Map([
  ["Juegos Sin Materiales (Solo hablar y beber)", "Juegos Sin Materiales"],
  ["9. La Ruleta del Castigo", "9. La Ruleta"],
  ["13. La Carrera de Tragos", "13. La Carrera de Vasos"],
  ["11. El Reto del Shot de Cumpleaños", "11. El Reto Sorpresa de Cumpleaños"],
]);
const phaseChanges = new Map([
  ['🍷 Yo Nunca versión "confesiones"', "🍷 Yo Nunca con anécdotas"],
  ["🤐 Prohibido Decir (sigue activo)", "🤐 Prohibido Decir (ronda de cierre)"],
]);
const contracts = {
  "juegos-para-botellon": [3, [/pasar cualquier tarjeta sin penalización/, /botella, sumáis un punto/, /vaso de plástico vacío por equipo/], /si se niega, bebe|terminarse sus bebidas|se bebe su vaso|gira y bebe/i],
  "como-organizar-fiesta-juegos-beber": [3, [/tres fichas en el centro/, /se acaban las fichas o suena el temporizador/], /cada vez que alguien la diga, bebe|tragos de penalización|el peor bebe|cervezas\/persona/i],
  "juegos-para-cumpleanos-adultos": [3, [/el resto pueden bajar un dedo/, /anécdotas son voluntarias/, /casillas predefinidas/], /cumpleañero bebe|que propuso la frase bebe|hacer beber a alguien/i],
  "juegos-para-previas": [4, [/puede bajar un dedo/, /rondas de 5 a 15 minutos/, /cuarto rey se aparta/], /lo hayan hecho, beben|copas por persona|modo picante o extremo/i],
  "juegos-para-beber-por-videollamada": [0, [/sin encender la cámara ni enseñar nada privado/, /primer acierto suma un punto/, /si sigue sin salir, revelad el título/i], /beben todos|todos beben|beberte tu vaso|enseñar la captura/i],
};

for (const [slug, { headings, links, phases, kit, alternates }] of Object.entries(inventory)) {
  test(slug + " preserves game sections, links, metadata and the visible FAQ contract", () => {
    const path = "/blog/" + slug;
    const file = "content" + path + ".mdx";
    const source = readFileSync(file, "utf8");
    const before = matter(beforeBatch3c(file, source));
    const current = matter(source);
    assert.throws(() => beforeBatch3c(file, source + "\nCambio no revisado"), { code: "ERR_ASSERTION" });
    assert.deepEqual({ ...current.data, excerpt: before.data.excerpt }, before.data);

    const doc = page(path);
    const article = doc.querySelector("article");
    const prose = article.querySelector(".prose");
    assert.deepEqual(prose.querySelectorAll("h2,h3,h4").map(h => [h.tagName, h.id, h.textContent]),
      headings.map(([tag, id, heading]) => [tag, id, headingChanges.get(heading) ?? heading]));
    const phaseLabels = prose.querySelectorAll("p > strong").map(n => n.textContent)
      .filter(label => /^(🤥|🤐|👁️|🍷|👈|🔥|⚖️|⚡|💣|🏆|🧱|📖)/.test(label));
    assert.deepEqual(phaseLabels, phases.map(label => phaseChanges.get(label) ?? label));
    assert.deepEqual(prose.querySelectorAll("table").at(-1)?.querySelectorAll("tbody tr td:first-child").map(n => n.textContent) ?? [],
      kit.map(label => label === "El grupo caliente" ? "El grupo ya se conoce" : label));
    assert.deepEqual(prose.querySelectorAll("a").map(a => a.getAttribute("href")), links);
    for (const href of links) assert.ok(existsSync("out" + (href === "/" ? "/index" : href) + ".html"), href);

    assert.equal(article.querySelector("h1").textContent, before.data.title);
    assert.equal(doc.querySelector("title").textContent, before.data.title + " | BeberGames");
    assert.equal(doc.querySelector('link[rel="canonical"]').getAttribute("href"), "https://bebergames.com" + path);
    assert.equal(doc.querySelector('meta[property="article:published_time"]').getAttribute("content"), before.data.date);
    assert.deepEqual(doc.querySelectorAll("link[hreflang]").map(n => n.outerHTML), alternates);
    const schemas = article.querySelectorAll('script[type="application/ld+json"]').map(n => JSON.parse(n.textContent));
    for (const description of [
      doc.querySelector('meta[name="description"]').getAttribute("content"),
      doc.querySelector('meta[property="og:description"]').getAttribute("content"),
      schemas.find(s => s["@type"] === "Article").description,
      index.querySelector('main a[href="' + path + '"] p').textContent,
    ]) assert.equal(description, current.data.excerpt);

    const [count, required, forbidden] = contracts[slug];
    for (const pattern of required) assert.match(prose.textContent, pattern);
    assert.doesNotMatch(prose.textContent, forbidden);
    const faq = schemas.find(s => s["@type"] === "FAQPage");
    assert.equal(faq?.mainEntity.length ?? 0, count);
    for (const item of faq?.mainEntity ?? []) {
      const heading = article.querySelectorAll("h3").find(n => n.textContent === item.name);
      assert.equal(heading.parentNode.querySelector("p").textContent, item.acceptedAnswer.text);
      assert.doesNotMatch(item.acceptedAnswer.text, forbidden);
    }
  });
}

test("Batch 3C preserves the FAQ source outside its four existing entries", () => {
  const file = "lib/data/blog-faqs.ts";
  const current = readFileSync(file, "utf8").replaceAll("\r\n", "\n");
  const previous = beforeBatch3c(file, current);
  const unaffected = source => Object.entries(contracts).filter(([, [count]]) => count > 0).reduce((body, [slug]) =>
    body.replace(new RegExp('^  "' + slug + '": \\[\\n[\\s\\S]*?^  \\],\\n', "m"), ""), source);
  assert.equal(unaffected(current), unaffected(previous));
});
