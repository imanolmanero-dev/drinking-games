import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import { assertCreatorRule, assertAlcoholFree, assertChosenReaction, assertNoCoercion } from "../helpers/yo-nunca-contract.mjs";
const require = createRequire(import.meta.url);
require("tsx/cjs");
const { parse } = require("next/dist/compiled/node-html-parser");
const { blogFAQs } = require("../../lib/data/blog-faqs.ts");
const matter = require("gray-matter");
const article = matter(readFileSync("content/blog/reglas-del-yo-nunca.mdx", "utf8"));
const blog = parse(readFileSync("out/blog/reglas-del-yo-nunca.html", "utf8"));
const game = parse(readFileSync("out/juegos/yo-nunca.html", "utf8"));
const rules = parse(readFileSync("out/juegos/yo-nunca/reglas.html", "utf8"));

test("complete exported Yo Nunca instructions and every visible FAQ reject coercive rules", () => {
  for (const doc of [blog, game, rules]) {
    const main = doc.querySelector("main").clone();
    main.querySelectorAll("script,style").forEach(node => node.remove());
    assertChosenReaction(main.textContent);
    for (const meta of doc.querySelectorAll('meta[name="description"],meta[property="og:description"]')) {
      assertNoCoercion(meta.getAttribute("content"));
    }
  }
  for (const faq of blogFAQs["reglas-del-yo-nunca"]) assertNoCoercion(faq.a);
});

test("Yo Nunca exported rules agree and practical alcohol-free guidance is visible", () => {
  const prose = blog.querySelector(".prose");
  const direct = prose.querySelectorAll("p").find(node => /Cómo se juega/.test(node.textContent));
  assert.ok(direct);
  assert.match(direct.textContent, /Cómo se juega.*Por turnos.*afirma no haber hecho.*Quienes sí.*siguiente jugador/s);
  assert.ok(prose.toString().indexOf(direct.toString()) < prose.toString().indexOf(prose.querySelector("h2").toString()));
  assertCreatorRule(prose.querySelectorAll("li").find(node => /Regla del creador/.test(node.textContent)).textContent);
  assertCreatorRule(game.querySelectorAll("li").find(node => /Regla del creador/.test(node.textContent)).textContent);
  assertCreatorRule(rules.querySelectorAll("strong").find(node => /Regla del creador/.test(node.textContent)).parentNode.textContent);
  assertAlcoholFree(prose.textContent);
  assert.ok(prose.querySelectorAll("h2").some(node => /Cómo jugar al Yo Nunca sin alcohol/.test(node.textContent)));
  assert.deepEqual(prose.querySelectorAll("h3").slice(0, 2).map(node => node.textContent), ["Levantar la mano", "Bajar un dedo"]);
  assert.doesNotMatch(prose.textContent, /vaso entero de golpe|debe beber como castigo|exigir que cuente/);
});

test("visible FAQ and schema use identical corrected Yo Nunca answers; metadata intent is preserved", () => {
  const schemas = blog.querySelectorAll('script[type="application/ld+json"]').map(node => JSON.parse(node.textContent));
  const faq = schemas.find(schema => schema["@type"] === "FAQPage");
  assert.deepEqual(faq.mainEntity.map(entry => ({q: entry.name, a: entry.acceptedAnswer.text})), blogFAQs["reglas-del-yo-nunca"]);
  for(const {q,a} of blogFAQs["reglas-del-yo-nunca"]) {
    const question = blog.querySelectorAll("h3").find(node => node.textContent === q);
    assert.ok(question);
    assert.equal(question.parentNode.querySelector("p").textContent, a);
  }
  assertCreatorRule(faq.mainEntity[0].acceptedAnswer.text);
  assertCreatorRule(faq.mainEntity[2].acceptedAnswer.text);
  assertAlcoholFree(faq.mainEntity[3].acceptedAnswer.text);
  assert.equal(blog.querySelector("h1").textContent, article.data.title);
  assert.equal(blog.querySelector('link[rel="canonical"]').getAttribute("href"), "https://bebergames.com/blog/reglas-del-yo-nunca");
  for(const selector of ['meta[name="description"]', 'meta[property="og:description"]']) assert.equal(blog.querySelector(selector).getAttribute("content"), article.data.excerpt);
  const posting = schemas.find(schema => schema["@type"] === "Article");
  assert.equal(posting.headline, article.data.title);
  assert.equal(posting.description, article.data.excerpt);
  assert.equal(posting.datePublished, article.data.date);
});

test("exported contextual links resolve while main game action remains primary", () => {
  const links = game.querySelectorAll('a[href="/blog/reglas-del-yo-nunca"]');
  assert.equal(links.length, 1);
  assert.match(links[0].parentNode.textContent, /cómo jugar sin alcohol/);
  const button = game.querySelectorAll("button").find(node => node.textContent === "Empezar a jugar");
  assert.ok(button);
  assert.ok(game.toString().indexOf(button.toString()) < game.toString().indexOf(links[0].toString()));
  assert.equal(blog.querySelector(".prose").querySelectorAll('a[href="/juegos/yo-nunca"]').length, 3);
  assert.equal(game.querySelectorAll('a[href="/juegos/yo-nunca/reglas"]').length, 1);
});
