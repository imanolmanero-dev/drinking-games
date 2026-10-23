import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync, existsSync } from "node:fs";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
require("tsx/cjs");
const { parse } = require("next/dist/compiled/node-html-parser");
const { halloweenEs, halloweenEn } = require("../../lib/data/halloween.ts");
const read = path => parse(readFileSync(`out${path === "/" ? "/index" : path}.html`, "utf8"));
for (const [locale, content, incoming] of [["es", halloweenEs, ["/", "/juegos/yo-nunca"]], ["en-US", halloweenEn, ["/en", "/en/games/truth-or-dare"]]]) {
  test(`${locale} Halloween is static, indexable, self-canonical and discoverable`, () => {
    const doc = read(content.path);
    assert.equal(doc.querySelector("html").getAttribute("lang"), locale);
    assert.equal(doc.querySelector("title").textContent, `${content.title} | BeberGames`);
    assert.equal(doc.querySelector('meta[name="description"]').getAttribute("content"), content.description);
    assert.deepEqual(doc.querySelectorAll("h1").map(n => n.textContent), [content.h1]);
    assert.equal(doc.querySelector('link[rel="canonical"]').getAttribute("href"), `https://bebergames.com${content.path}`);
    assert.doesNotMatch(doc.querySelector('meta[name="robots"]').getAttribute("content"), /noindex/);
    assert.match(readFileSync("out/robots.txt", "utf8"), /Allow: \/\r?\n/);
    for (const s of content.sections) {
      assert.ok(doc.getElementById(s.id));
      for (const p of s.paragraphs) assert.ok(doc.textContent.includes(p));
      if (s.href) assert.equal(doc.getElementById(`play-${s.id}`).getAttribute("href"), s.href);
    }
    const schemas = doc.querySelectorAll('script[type="application/ld+json"]').map(n => JSON.parse(n.textContent));
    assert.deepEqual(schemas.map(s => s["@type"]), ["BreadcrumbList", "FAQPage"]);
    assert.deepEqual(schemas[1].mainEntity.map(q => ({ q: q.name, a: q.acceptedAnswer.text })), content.faqs);
    for (const path of incoming) assert.ok(read(path).querySelector(`a[href="${content.path}"]`));
    for (const a of doc.querySelectorAll("a")) {
      const url = new URL(a.getAttribute("href"), `https://bebergames.com${content.path}`);
      if (url.origin !== "https://bebergames.com") continue;
      assert.ok(existsSync(`out${url.pathname === "/" ? "/index" : url.pathname}.html`), url.href);
      if (url.hash) assert.ok(read(url.pathname).getElementById(url.hash.slice(1)), url.href);
    }
  });
}
