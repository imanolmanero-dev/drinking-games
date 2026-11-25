import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";

const require = createRequire(import.meta.url);
const { parse } = require("next/dist/compiled/node-html-parser");
const matter = require("gray-matter");
const base = "1cd29647ef6e58a5c6974c34ae44267da5d7e644";
test("Yo Nunca structured descriptions and the Truth or Dare referral agree with the voluntary game", () => {
  for (const path of ["yo-nunca", "yo-nunca/reglas"]) {
    const doc = parse(readFileSync("out/juegos/" + path + ".html", "utf8"));
    const game = doc.querySelectorAll('script[type="application/ld+json"]')
      .map(node => JSON.parse(node.textContent)).find(schema => schema["@type"] === "WebApplication");
    assert.equal(game.description, "Di algo que nunca hayas hecho. Quien quiera responder puede bajar un dedo. También podéis pasar sin dar explicaciones.");
  }
  const truth = parse(readFileSync("out/juegos/verdad-o-reto.html", "utf8"));
  assert.equal(truth.querySelector('main li a[href="/juegos/yo-nunca"]').parentNode.textContent,
    "Yo Nunca — Leed una frase por turno. Quien quiera responder puede bajar un dedo.");
});

for (const [slug, counts] of [
  ["100-preguntas-yo-nunca", [15, 15, 12, 12, 11, 12, 12, 11]],
  ["preguntas-picantes-verdad-o-reto", [15, 15, 10, 10, 15]],
]) {
  test(slug + " retains its inventory, links and optional participation in visible copy and schema", () => {
    const path = "/blog/" + slug;
    const file = "content" + path + ".mdx";
    const old = matter(execFileSync("git", ["show", base + ":" + file], { encoding: "utf8" }));
    const updated = matter(readFileSync(file, "utf8"));
    const d = parse(readFileSync("out" + path + ".html", "utf8"));
    const article = d.querySelector("article");
    const prose = article.querySelector(".prose");
    const lists = prose.querySelectorAll("ol");
    assert.deepEqual(lists.map(l => l.querySelectorAll("li").length), counts);
    const items = lists.flatMap(l => l.querySelectorAll("li").map((n, i) => [Number(l.getAttribute("start") || 1) + i, n.textContent]));
    const original = [...old.content.matchAll(/^(\d+)\. (.+)$/gm)].map(m => [Number(m[1]), m[2].trim()]);
    const yo = counts.length === 8;
    const total = yo ? 100 : 50;
    assert.deepEqual(items.map(([n]) => n), original.map(([n]) => n));
    const changed = items.slice(0,total).filter((item,i) => item[1] !== original[i][1]);
    assert.deepEqual(changed.map(([n]) => n), yo ? [] : [18,28,32,50]);
    assert.deepEqual(prose.querySelectorAll("a").map(n => n.getAttribute("href")),
      [...old.content.matchAll(/\]\((\/[^)]+)\)/g)].map(m => m[1]));
    assert.equal(d.querySelector("h1").textContent, old.data.title);
    assert.equal(d.querySelector("title").textContent, old.data.title + " | BeberGames");
    assert.equal(d.querySelector('link[rel="canonical"]').getAttribute("href"), "https://bebergames.com" + path);
    const schemas = article.querySelectorAll('script[type="application/ld+json"]').map(n => JSON.parse(n.textContent));
    const post = schemas.find(s => s["@type"] === "Article");
    assert.equal(post.datePublished, old.data.date);
    for (const selector of ['meta[name="description"]','meta[property="og:description"]']) {
      assert.equal(d.querySelector(selector).getAttribute("content"), updated.data.excerpt);
    }
    assert.equal(post.description, updated.data.excerpt);
    const faq = schemas.find(s => s["@type"] === "FAQPage").mainEntity;
    assert.equal(faq.length, yo ? 4 : 3);
    for (const q of faq) {
      const h = article.querySelectorAll("h3").find(n => n.textContent === q.name);
      assert.equal(h.parentNode.querySelector("p").textContent, q.acceptedAnswer.text);
    }
    const answers = faq.map(q => q.acceptedAnswer.text).join(" ");
    const rules = prose.textContent + " " + answers;
    assert.doesNotMatch(rules, /debes contar|puede beber y punto|tiene que cumplir|fondo blanco|de castigo|el que propuso la frase bebe|todos los que sí lo hayan hecho beben/i);
    if (yo) {
      assert.match(answers, /puede bajar un dedo o levantar la mano/);
      assert.match(answers, /Si nadie responde, pasad a la siguiente/);
      assert.match(answers, /Si los dos dejáis la mano quieta, probad otra frase/);
      assert.match(rules, /paso» sin beber ni dar explicaciones/);
    } else {
      const dares = items.slice(total).map(([,text]) => text);
      assert.equal(new Set(dares).size, 15);
      assert.doesNotMatch(dares.join(" "), /bebe|copa|chupito|WhatsApp|envía|llama a|publica|galería|desbloque|lame|masaje|besa a|toca a/i);
      assert.match(rules, /Puedes parar a mitad o pasar directamente al siguiente jugador/);
    }
  });
}
