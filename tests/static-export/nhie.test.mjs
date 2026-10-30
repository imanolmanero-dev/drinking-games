import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
const require=createRequire(import.meta.url); require("tsx/cjs");
const {parse}=require("next/dist/compiled/node-html-parser");
const {languageAlternates, publishedRoutes}=require("../../lib/i18n/routes.ts");
const route="/en/games/never-have-i-ever";
const doc=parse(readFileSync("out"+route+".html","utf8"));
test("NHIE static route, schema, canonical, setup and discovery are coherent",()=>{
 assert.equal(doc.querySelectorAll("h1").length,1);
 assert.equal(doc.querySelector("h1").textContent,"Never Have I Ever Online");
 assert.equal(doc.querySelector("title").textContent,"Never Have I Ever — Play Online | BeberGames");
 assert.equal(doc.querySelector('link[rel="canonical"]').getAttribute("href"),"https://bebergames.com"+route);
 assert.equal(languageAlternates("never-have-i-ever"),undefined);
 assert.equal(publishedRoutes("en-US").length,13);
 assert.equal(doc.querySelectorAll('link[hreflang]').length,0);
 const schemas=doc.querySelectorAll('script[type="application/ld+json"]').map(n=>JSON.parse(n.textContent));
 const game=schemas.find(s=>s["@type"]==="WebApplication");
 assert.equal(game.inLanguage,"en-US");assert.equal(game.offers.priceCurrency,"USD");
 assert.ok(schemas.some(s=>s["@type"]==="BreadcrumbList"));
 const faq=schemas.find(s=>s["@type"]==="FAQPage");
 for(const q of faq.mainEntity){assert.ok(doc.textContent.includes(q.name));assert.ok(doc.textContent.includes(q.acceptedAnswer.text));}
 const ids=doc.querySelectorAll("[id]").map(n=>n.id);assert.equal(new Set(ids).size,ids.length);
 assert.equal(doc.querySelectorAll("select").length,1);
 for(const p of ["/en/games","/en/blog/drinking-games-for-2","/en/blog/drinking-games-without-cards"]){
 const incoming=parse(readFileSync("out"+p+".html","utf8"));
 assert.equal(incoming.querySelectorAll('a[href="'+route+'"]').length,1);
 }
});
