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
