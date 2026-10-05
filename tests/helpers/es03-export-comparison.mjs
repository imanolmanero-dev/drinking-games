import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { MDXRemote } from "next-mdx-remote/rsc";
import { snapshot } from "./adsense-export-snapshot.mjs";
import { es03Replacements, projectEs03 } from "./es03-baseline.mjs";
const require = createRequire(import.meta.url);
const { parse } = require("next/dist/compiled/node-html-parser");
const { renderToStaticMarkup } = require("react-dom/server");
const { createElement } = require("react");
const matter = require("gray-matter");
const base = "86b8bfed6388eb4e56a413bd0738848b97e27135";
const old = file => execFileSync("git", ["show", `${base}:${file}`], { encoding: "utf8" });
const baseline = JSON.parse(readFileSync(process.argv[2], "utf8"));
const expected = structuredClone(baseline.pages);
const current = snapshot();
const norm = text => text.replace(/\s+/g, " ").trim();
const text = html => norm(parse(html).textContent);
function replace(value, before, after) {
  assert.ok(before.length > 0);
  assert.equal(value.split(before).length - 1, 1, `unique visible fragment: ${before.slice(0, 70)}`);
  return value.replace(before, after);
}
const components = { a: props => createElement("a", { href: props.href, className: "text-amber-500 hover:text-amber-400 no-underline hover:underline transition-colors font-medium relative z-10" }, props.children) };
const render = async source => parse(renderToStaticMarkup(await MDXRemote({ source, components })));
const anchor = html => {
  const node = parse(html).querySelector("a");
  return { attributes: Object.fromEntries(Object.entries(node.attributes).sort(([a], [b]) => a.localeCompare(b))), content: node.innerHTML };
};
function replaceLinks(target, before, after) {
  const matches = target.links.map((_, i) => i).filter(i => JSON.stringify(target.links.slice(i, i + before.length).map(anchor)) === JSON.stringify(before.map(anchor)));
  assert.equal(matches.length, 1, "unique contextual anchor sequence");
  target.links.splice(matches[0], before.length, ...after);
}
for (const [file, pairs] of Object.entries(es03Replacements)) {
  const original = old(file);
  const projected = projectEs03(file, original);
  assert.equal(readFileSync(file, "utf8").replace(/\r\n/g, "\n"), projected);
  if (file === "lib/data/blog-faqs.ts") {
    // Only two exact answer strings on this one article may differ in text/schema.
    assert.equal(pairs.length, 2);
    const target = expected["/blog/rey-de-la-copa-reglas"];
    const faqIndices = target.schemas.map((value, i) => JSON.parse(value)["@type"] === "FAQPage" ? i : -1).filter(i => i >= 0);
    assert.equal(faqIndices.length, 1);
    const index = faqIndices[0];
    const schema = JSON.parse(target.schemas[index]);
    const answer = line => {
      assert.match(line, /^\s*a: ".*",$/);
      return JSON.parse(line.trim().slice(3, -1));
    };
    for (const [before, after] of pairs) {
      const previousAnswer = answer(before), nextAnswer = answer(after);
      target.text = replace(target.text, norm(previousAnswer), norm(nextAnswer));
      const matching = schema.mainEntity.filter(q => q.acceptedAnswer.text === previousAnswer);
      assert.equal(matching.length, 1, "exact reviewed Rey FAQ answer");
      matching[0].acceptedAnswer.text = nextAnswer;
    }
    target.schemas[index] = JSON.stringify(schema);
    continue;
  }
  const path = file.endsWith(".mdx") ? `/blog/${file.split("/").at(-1).slice(0, -4)}` : file.replace("app/(spanish)", "").replace("/page.tsx", "");
  const target = expected[path];
  if (file.endsWith(".mdx")) {
    for (const [before, after] of pairs) {
      target.text = replace(target.text, text((await render(before)).toString()), text((await render(after)).toString()));
    }
    const before = await render(matter(original).content);
    const after = await render(matter(projected).content);
    replaceLinks(target, before.querySelectorAll("a").map(n => n.outerHTML), after.querySelectorAll("a").map(n => n.outerHTML));
    // Reading-time badges may change only as a consequence of the reviewed copy.
    const minutes = source => Math.max(1, Math.round(matter(source).content.trim().split(/\s+/).length / 200));
    if (minutes(original) !== minutes(projected)) {
      const hub = expected["/blog"];
      const index = hub.links.findIndex(value => parse(value).querySelector("a").getAttribute("href") === path);
      const beforeCard = hub.links[index];
      const afterCard = replace(beforeCard, `${minutes(original)} min`, `${minutes(projected)} min`);
      hub.text = replace(hub.text, text(beforeCard), text(afterCard));
      hub.links[index] = afterCard;
    }
  } else {
    const paragraphs = source => source.match(/<p>[\s\S]*?<\/p>/g);
    const convert = source => parse(source.replace(/<(\/?)Link\b/g, "<$1a").replace(/className=/g, "class="));
    const count = file.includes("categorias") ? 2 : 1;
    const before = convert(paragraphs(original).slice(-1).join(""));
    const after = convert(paragraphs(projected).slice(-count).join(""));
    // JSX whitespace is collapsed by React, including between sibling paragraphs.
    const paragraphText = doc => doc.querySelectorAll("p").map(node => norm(node.textContent)).join("");
    target.text = replace(target.text, paragraphText(before), paragraphText(after));
    replaceLinks(target, before.querySelectorAll("a").map(n => n.outerHTML), after.querySelectorAll("a").map(n => n.outerHTML));
  }
}
assert.deepEqual(Object.keys(current), Object.keys(expected));
for (const path of Object.keys(expected)) {
  for (const field of Object.keys(expected[path])) assert.deepEqual(field === "links" ? current[path][field].map(anchor) : current[path][field], field === "links" ? expected[path][field].map(anchor) : expected[path][field], `${path}: ${field}`);
}
const sitemap = parse(readFileSync("out/sitemap.xml", "utf8"));
const previousSitemap = parse(baseline.sitemap);
// Only generated dates can vary; preserve each article's editorial date.
for (const [i, url] of sitemap.querySelectorAll("url").entries()) {
  if (!url.querySelector("loc").textContent.includes("/blog/")) {
    url.querySelector("lastmod")?.remove();
    previousSitemap.querySelectorAll("url")[i].querySelector("lastmod")?.remove();
  }
}
assert.equal(sitemap.toString(), previousSitemap.toString());
console.log("PASS: all 80 pages compared in full; only exact ES-03 text/link fragments, two Rey FAQ answers in visible text/schema and derived reading time differ. Metadata, headings, other schemas, protected ES and all 10 EN pages unchanged. Sitemap contract preserved.");
