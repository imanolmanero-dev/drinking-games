import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { MDXRemote } from "next-mdx-remote/rsc";
import ts from "typescript";
import { snapshot } from "./adsense-export-snapshot.mjs";
import { es02Replacements } from "./es02-baseline.mjs";

// Usage: node tests/helpers/es02-export-comparison.mjs <pre-edit snapshot.json>
// Compare every field of all 80 pages. Only exact, reviewed changes are projected.
const require = createRequire(import.meta.url);
const { renderToStaticMarkup } = require("react-dom/server");
const { parse } = require("next/dist/compiled/node-html-parser");
const matter = require("gray-matter");
const base = "dbffd98a8e7f1173dd9968f19396b36c107a744f";
const old = file => execFileSync("git", ["show", `${base}:${file}`], { encoding: "utf8" });
const read = file => readFileSync(file, "utf8");
const text = html => parse(html.replace(/<(\/?)Link\b/g, "<$1a")).textContent.replace(/\s+/g, " ").trim();
const replace = (value, before, after) => {
  assert.equal(value.split(before).length - 1, 1, `unique export fragment: ${before.slice(0, 90)}`);
  return value.replace(before, after);
};
const before = JSON.parse(read(process.argv[2]));
const expected = structuredClone(before);
const current = snapshot();
const articleFile = "content/blog/reglas-del-yo-nunca.mdx";
const previousArticle = matter(old(articleFile));
const article = matter(read(articleFile));
const render = async content => parse(renderToStaticMarkup(await MDXRemote({ source: content })));
const previousProse = await render(previousArticle.content);
const prose = await render(article.content);
const articleRoute = "/blog/reglas-del-yo-nunca";
const target = expected[articleRoute];
target.text = replace(target.text, text(previousProse.toString()), text(prose.toString()));
// Keep every heading outside the edited MDX prose, not just the article H1.
const oldHeadings = previousProse.querySelectorAll("h1,h2,h3,h4,h5,h6").map(node => node.outerHTML);
const newHeadings = prose.querySelectorAll("h1,h2,h3,h4,h5,h6").map(node => node.outerHTML);
const headingIndex = target.headings.indexOf(oldHeadings[0]);
assert.ok(headingIndex >= 0);
assert.deepEqual(target.headings.slice(headingIndex, headingIndex + oldHeadings.length), oldHeadings);
target.headings.splice(headingIndex, oldHeadings.length, ...newHeadings);
target.metadata = target.metadata.map(value => value.includes(previousArticle.data.excerpt)
  ? replace(value, previousArticle.data.excerpt, article.data.excerpt) : value);

function faqs(source) {
  const loaded = { exports: {} };
  const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  new Function("exports", code)(loaded.exports);
  return loaded.exports.blogFAQs["reglas-del-yo-nunca"];
}
const previousFaqs = faqs(old("lib/data/blog-faqs.ts"));
const newFaqs = faqs(read("lib/data/blog-faqs.ts"));
for(let i = 0; i < previousFaqs.length; i++) {
  assert.equal(newFaqs[i].q, previousFaqs[i].q);
  if(newFaqs[i].a !== previousFaqs[i].a) target.text = replace(target.text, previousFaqs[i].a, newFaqs[i].a);
}
target.schemas = target.schemas.map(value => {
  const schema = JSON.parse(value);
  if(schema["@type"] === "FAQPage") {
    assert.deepEqual(schema.mainEntity.map(entry => entry.acceptedAnswer.text), previousFaqs.map(entry => entry.a));
    schema.mainEntity.forEach((entry, i) => {entry.acceptedAnswer.text = newFaqs[i].a;});
  }
  if(schema["@type"] === "Article") {
    assert.equal(schema.description, previousArticle.data.excerpt);
    schema.description = article.data.excerpt;
  }
  return JSON.stringify(schema);
});
const hub = expected["/blog"];
const card = hub.links.find(value => parse(value).querySelector("a").getAttribute("href") === articleRoute);
assert.ok(card);
const minutes = content => Math.max(1, Math.round(content.trim().split(/\s+/).length / 200));
let updatedCard = replace(card, previousArticle.data.excerpt, article.data.excerpt);
if(minutes(previousArticle.content) !== minutes(article.content)) {
  updatedCard = replace(updatedCard, `${minutes(previousArticle.content)} min`, `${minutes(article.content)} min`);
}
hub.links = hub.links.map(value => value === card ? updatedCard : value);
hub.text = replace(hub.text, text(card), text(updatedCard));

const game = expected["/juegos/yo-nunca"];
// Only these exact game-description suffixes may change, including inherited
// OpenGraph descriptions on quick rules. Titles/canonicals/images stay compared.
for (const pair of es02Replacements["app/(spanish)/juegos/yo-nunca/layout.tsx"]) {
  const descriptions = pair.map(value => JSON.parse(value.trim().replace(/,$/, "")));
  let changes = 0;
  for (const pathname of ["/juegos/yo-nunca", "/juegos/yo-nunca/reglas"]) {
    expected[pathname].metadata = expected[pathname].metadata.map(value => {
      if (!value.includes(descriptions[0])) return value;
      changes++;
      return replace(value, ...descriptions);
    });
  }
  assert.ok(changes > 0, "reviewed game description is exported");
}
const gamePairs = es02Replacements["app/(spanish)/juegos/yo-nunca/page.tsx"];
for(const pair of gamePairs.slice(0, 2)) {
  const elements = pair.map(value => value.match(/<li><strong>Regla[^\n]+<\/li>|<p>Consulta[^\n]+<\/p>/)[0]);
  game.text = replace(game.text, text(elements[0]), text(elements[1]));
  if(elements[0].startsWith("<p>")) {
    const anchors = elements.map(value => parse(value.replace(/<(\/?)Link\b/g, "<$1a").replace(/className=/g, "class=")).querySelector("a"));
    const matches = game.links.filter(value => {
      const node = parse(value).querySelector("a");
      return node.getAttribute("href") === anchors[0].getAttribute("href") && node.textContent === anchors[0].textContent;
    });
    assert.equal(matches.length, 1);
    const actual = parse(matches[0]).querySelector("a");
    assert.deepEqual(actual.attributes, anchors[0].attributes);
    // Preserve Next's attribute order and every existing attribute.
    const updated = replace(replace(matches[0], anchors[0].getAttribute("href"), anchors[1].getAttribute("href")), anchors[0].innerHTML, anchors[1].innerHTML);
    game.links = game.links.map(value => value === matches[0] ? updated : value);
  }
}
for (const pair of gamePairs.slice(2)) {
  if (pair[0].trim() === "Los que sí lo hayan hecho… ¡beben! 🍺") {
    // This exact hint is rendered only after starting the client game. Source
    // baseline + the rendered playing-state test protect it, not setup HTML.
    assert.equal(pair[1].trim(), "Responde como hayáis acordado; puedes pasar. ✋");
    assert.ok(!game.text.includes(text(pair[0])));
    continue;
  }
  game.text = replace(game.text, ...pair.map(text));
}
const rulePair = es02Replacements["app/(spanish)/juegos/yo-nunca/reglas/page.tsx"][0];
const ruleTexts = rulePair.map(value => {
  const match = value.match(/<strong[^>]*>([^<]+)<\/strong>\n\s+([^\n]+)/);
  return `${match[1]}${match[2]}`;
});
expected["/juegos/yo-nunca/reglas"].text = replace(expected["/juegos/yo-nunca/reglas"].text, ...ruleTexts);
for (const pair of es02Replacements["app/(spanish)/juegos/yo-nunca/reglas/page.tsx"].slice(1)) {
  const fragments = pair.map(value => text(value.trim().replace(/^desc: "/, "").replace(/",$/, "")));
  expected["/juegos/yo-nunca/reglas"].text = replace(expected["/juegos/yo-nunca/reglas"].text, ...fragments);
}
assert.equal(Object.keys(current).length, 80);
for(const pathname of Object.keys(expected)) {
  assert.deepEqual(Object.keys(current[pathname]), Object.keys(expected[pathname]), pathname);
  for(const field of Object.keys(expected[pathname])) {
    assert.equal(JSON.stringify(current[pathname][field]), JSON.stringify(expected[pathname][field]), `${pathname}: ${field}`);
  }
}
console.log("PASS: 80/80 full metadata, headings, links, JSON-LD and visible-text comparisons; 76 unchanged pages, 3 Yo Nunca pages and /blog have only exact intended changes. All 10 EN pages identical.");
