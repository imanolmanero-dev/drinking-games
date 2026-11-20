import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";

const { parse } = createRequire(import.meta.url)("next/dist/compiled/node-html-parser");
const changes = JSON.parse(readFileSync("tests/fixtures/roulette-editorial.json", "utf8"));
const historical = JSON.parse(readFileSync("tests/fixtures/es-routes.json", "utf8"));
const game = "/juegos/la-ruleta";

for (const [path, change] of Object.entries(changes)) {
  test(path + " preserves identity and exposes the reviewed participation rules", () => {
    const doc = parse(readFileSync("out" + (path === "/" ? "/index" : path) + ".html", "utf8"));
    const route = historical.find(r => r.pathname === path);
    assert.equal(doc.querySelector("title").textContent, route.title);
    assert.equal(doc.querySelector("h1").textContent.trim(), route.h1);
    assert.equal(doc.querySelector('link[rel="canonical"]').getAttribute("href"), "https://bebergames.com" + (path === "/" ? "" : path));
    for (const [href, , description] of change.cards ?? []) {
      const card = doc.querySelectorAll("a").find(a => a.getAttribute("href") === href && a.querySelector("h3"));
      assert.equal(card?.querySelector("p")?.textContent, description, href);
    }
    if (path === game) assert.ok(doc.querySelector('a[href="/juegos/la-ruleta/reglas"]'));
    if (path === game + "/reglas") assert.ok(doc.querySelector('a[href="/juegos/la-ruleta"]'));
    doc.querySelectorAll("script,style").forEach(node => node.remove());
    const copy = doc.querySelector("main").textContent;
    assert.doesNotMatch(copy, /fondo blanco|vacía la copa|bebe el doble|tragos largos|nadie puede parar|sin excusas/i);
    if (path.startsWith(game)) {
      assert.match(copy, /puedes pasar cualquier casilla/i);
      assert.match(copy, /verdad o pasa/i);
      assert.match(copy, /brindis de grupo/i);
    }
  });
}
