import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync, existsSync } from "node:fs";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { parse } = require("next/dist/compiled/node-html-parser");
test("85 existing pages preserve metadata, content, links and schema after exact header addition", { skip: !existsSync("build/guides/baseline/en.html") }, () => {
  const routes = ["es-routes", "es-additional-routes", "en-routes"].flatMap(name => JSON.parse(readFileSync(`tests/fixtures/${name}.json`, "utf8"))).filter(r => r.pathname !== "/en/guides");
  function snapshot(root, pathname) {
    const d = parse(readFileSync(`${root}/${pathname === "/" ? "index" : pathname.slice(1)}.html`, "utf8"));
    // The active experiment changed only the SEO description, not Open Graph.
    if (root !== "out" && pathname === "/juegos/verdad-o-reto") {
      const description = d.querySelector('meta[name="description"]');
      assert.equal(description.getAttribute("content"), "Juega a Verdad o Reto para beber con amigos. 80 verdades y 80 retos en español, en 3 niveles de intensidad. Si no cumples… ¡fondo blanco!");
      description.setAttribute("content", "Juega a Verdad o Reto online con amigos desde el navegador. Elige la intensidad y descubre preguntas y retos al azar en cada turno.");
    }
    // Project only the approved navigation delta onto the historical baseline.
    if (root === "out" && pathname === "/blog/juegos-para-beber-con-cartas") {
      const expected = JSON.parse(readFileSync("tests/fixtures/card-games-navigation.json", "utf8"));
      const navs = d.querySelectorAll('article nav');
      assert.equal(navs.length, 1);
      assert.equal(navs[0].outerHTML, expected.nav);
      assert.equal(expected.targets.length, 12);
      for (const [id, label] of expected.targets) {
        const targets = d.querySelectorAll(`[id="${id}"]`);
        assert.equal(targets.length, 1);
        assert.equal(targets[0].tagName, "H2");
        assert.equal(targets[0].textContent, label);
        assert.equal(targets[0].getAttribute("class"), "scroll-mt-24");
      }
      navs[0].remove();
    }
    if (root === "out" && pathname === "/blog") {
      const cards = d.querySelectorAll('a[href="/blog/juegos-para-beber-con-cartas"]');
      assert.equal(cards.length, 1);
      assert.equal(cards[0].querySelectorAll('span').filter(n => n.textContent === '8 min').length, 1);
      const time = cards[0].querySelectorAll('span').find(n => n.textContent === '8 min');
      time.set_content('7 min');
    }
    if (root === "out" && pathname.startsWith("/en")) {
      const links = d.querySelectorAll('.en-nav-links a');
      assert.deepEqual(links.map(n => n.textContent.trim()), ["Home", "Games", "Guides", "About", "Contact"]);
      assert.equal(links[2].getAttribute("href"), "/en/guides");
      links[2].remove();
    }
    const metadata = d.querySelectorAll('title,meta,link[rel="canonical"],link[hreflang]').map(n => n.outerHTML);
    const schema = d.querySelectorAll('script[type="application/ld+json"]').map(n => JSON.parse(n.textContent));
    const header = d.querySelector('.en-nav')?.outerHTML;
    const headings = d.querySelectorAll('h1,h2,h3,h4').map(n => n.textContent);
    const links = d.querySelectorAll('a').map(n => [n.getAttribute('href'), n.textContent]);
    d.querySelectorAll('script,style,link').forEach(n => n.remove());
    let text = d.textContent.replace(/\s+/g, ' ').trim();
    if (root === "out" && pathname === "/en/games/truth-or-dare") text = text.replace("See the playable options in the", "See both playable options in the");
    return { metadata, schema, header, headings, links, text };
  }
  assert.equal(routes.length, 85);
  for (const route of routes) assert.deepEqual(snapshot("out", route.pathname), snapshot("build/guides/baseline", route.pathname), route.pathname);
});
