import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";

const require = createRequire(import.meta.url);
const {parse} = require("next/dist/compiled/node-html-parser");
const forbidden = /\b(?:tu equipo bebe|ambos beben|bebe el doble|beben dos tragos|tragos bebidos|vaso de derrota|debe beber|bebe los vasos|a beber\b)/i;
for (const [game,article,rule] of [
  ["beer-pong","beer-pong-reglas-completas",/vasos? (?:de|con) agua/i],
  ["medusa","medusa-juego-beber",/de piedra/i],
  ["tabu","tabu-juego-beber",/punto/i],
]) {
  test(game+" rules, game and article agree on outcomes and article FAQ", () => {
    for (const path of ["/juegos/"+game,"/juegos/"+game+"/reglas","/blog/"+article]) {
      const doc = parse(readFileSync("out"+path+".html","utf8"));
      assert.equal(doc.querySelector('link[rel="canonical"]').getAttribute("href"),"https://bebergames.com"+path);
      assert.equal(doc.querySelectorAll("h1").length,1);
      const schemas = doc.querySelectorAll('script[type="application/ld+json"]').map(node=>JSON.parse(node.textContent));
      const description = doc.querySelector('meta[name="description"]').getAttribute("content");
      doc.querySelectorAll("script,style").forEach(node=>node.remove());
      const copy = doc.querySelector("main").textContent;
      assert.match(copy,rule);
      assert.doesNotMatch([copy,description,JSON.stringify(schemas)].join(" "),forbidden);
      if (path.startsWith("/blog")) {
        const faq = schemas.find(s=>s["@type"]==="FAQPage");
        assert.ok(faq.mainEntity.length >= 3);
        for (const q of faq.mainEntity) {
          const heading=doc.querySelectorAll("h3").find(node=>node.textContent===q.name);
          assert.equal(heading.parentNode.querySelector("p").textContent,q.acceptedAnswer.text);
        }
      } else {
        assert.ok(schemas.some(s=>s["@type"]==="WebApplication"));
      }
    }
  });
}
