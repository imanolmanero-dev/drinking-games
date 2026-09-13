import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import ts from "typescript";

const require = createRequire(import.meta.url);
require("tsx/cjs");
const base = "18837ef918024278e09a516592ba8d2a06682aad";
const original = (file) => execFileSync("git", ["show", `${base}:${file}`], { encoding: "utf8" });
function baselineModule(file) {
  const code = ts.transpileModule(original(file), { fileName: file, compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } }).outputText;
  const exports = {};
  new Function("exports", "require", code)(exports, require);
  return exports;
}
const previous = baselineModule("lib/data/rey-de-la-copa.ts");
const current = require("../lib/data/rey-de-la-copa.ts");

test("ES characterization: deck order, suit/rank values, rules and King flags match Phase 2", () => {
  assert.deepEqual(current.reglasCartas, previous.reglasCartas);
  assert.deepEqual(current.buildDeck(), previous.buildDeck());
  const deck = current.buildDeck();
  assert.equal(deck.length, 52);
  assert.equal(new Set(deck.map((card) => card.valor + card.palo)).size, 52);
  assert.equal(deck.filter((card) => card.regla.esCopa).length, 4);
  for (const card of deck) assert.equal(card.regla, current.reglasCartas.find((rule) => rule.valor === card.valor));
});

test("ES characterization: shuffle matches original random-call order without mutating cards/input", () => {
  const random = Math.random;
  try {
    for (const seed of [0, 1, 7, 42, 123456]) {
      const input = current.buildDeck();
      const snapshot = [...input];
      const run = (shuffle) => {
        let state = seed, calls = 0;
        Math.random = () => { calls++; state = (Math.imul(state, 1664525) + 1013904223) >>> 0; return state / 2 ** 32; };
        return { deck: shuffle(input), calls };
      };
      const expected = run(previous.shuffleDeck);
      const actual = run(current.shuffleDeck);
      assert.deepEqual(actual, expected);
      assert.equal(actual.calls, 51);
      assert.notEqual(actual.deck, input);
      assert.deepEqual(input, snapshot);
      for (const card of actual.deck) assert.ok(input.includes(card));
    }
  } finally { Math.random = random; }
});

test("ES game components, fourth-King flow, rules, metadata and integrations remain byte-identical", () => {
  const files = execFileSync("git", ["ls-tree", "-r", "--name-only", base, "app/(spanish)/juegos/rey-de-la-copa", "app/(spanish)/juegos/ring-of-fire"], { encoding: "utf8" }).trim().split("\n");
  files.push("lib/data/ring-of-fire.ts", "lib/AppContext.tsx", "components/layout/GameLayout.tsx", "components/ui/Confetti.tsx", "components/ui/AlcoholDisclaimer.tsx");
  for (const file of files) assert.equal(readFileSync(file, "utf8").replace(/\r\n/g, "\n"), original(file), file);
});

test("all existing JSON-LD defaults preserve Phase 2 output", () => {
  const before = baselineModule("components/seo/JsonLd.tsx");
  const after = require("../components/seo/JsonLd.tsx");
  const { createElement } = require("react");
  const { renderToStaticMarkup } = require("react-dom/server");
  const props = { name: "Test", description: "Description", url: "https://bebergames.com", title: "Test", author: "BeberGames", datePublished: "2026-09-13", faqs: [{ q: "Question", a: "Answer" }], items: [{ name: "Home", url: "https://bebergames.com" }] };
  for (const name of Object.keys(before)) assert.equal(renderToStaticMarkup(createElement(after[name], props)), renderToStaticMarkup(createElement(before[name], props)), name);
});
