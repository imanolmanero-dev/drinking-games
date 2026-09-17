import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";

const require = createRequire(import.meta.url);
require("tsx/cjs");
const { createElement } = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const { parse } = require("next/dist/compiled/node-html-parser");
const postcss = require("postcss");
const { BrandMark, CardArtwork } = require("../components/layout/english/EnglishArtwork.tsx");

test("English visual rules stay inside their CSS module root, including responsive and reduced motion rules", () => {
  const css = postcss.parse(readFileSync("components/layout/english/EnglishDesign.module.css", "utf8"));
  let rules = 0;
  css.walkRules((rule) => {
    for (const selector of rule.selectors) assert.match(selector, /^\.root(?:\s|$)/, selector);
    rules++;
  });
  assert.ok(rules > 0);
  const media = [];
  css.walkAtRules("media", (rule) => media.push(rule.params));
  assert.ok(media.includes("(prefers-reduced-motion: reduce)"));
});

test("English brand and card artwork are decorative and introduce no controls or external assets", () => {
  for (const component of [BrandMark, CardArtwork]) {
    const doc = parse(renderToStaticMarkup(createElement(component)));
    assert.equal(doc.firstChild.getAttribute("aria-hidden"), "true");
    assert.equal(doc.querySelectorAll("a, button, input, img, script, iframe, canvas, [tabindex], [id]").length, 0);
    assert.ok(doc.querySelector("svg"));
  }
});
