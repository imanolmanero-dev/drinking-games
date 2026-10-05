import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import test from "node:test";
import ts from "typescript";
import { readRouteContract } from "../scripts/audit-static-export.mjs";
import { assertEs02Compatible, es02Replacements } from "./helpers/es02-baseline.mjs";
import { assertCreatorRule, assertAlcoholFree, assertChosenReaction, assertNoCoercion } from "./helpers/yo-nunca-contract.mjs";

const require = createRequire(import.meta.url);
require("tsx/cjs");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const { parse } = require("next/dist/compiled/node-html-parser");
const matter = require("gray-matter");
const { blogFAQs } = require("../lib/data/blog-faqs.ts");
const read = file => readFileSync(file, "utf8");
const article = matter(read("content/blog/reglas-del-yo-nunca.mdx"));
const faqs = blogFAQs["reglas-del-yo-nunca"];
const gameFile = "app/(spanish)/juegos/yo-nunca/page.tsx";
const rulesFile = "app/(spanish)/juegos/yo-nunca/reglas/page.tsx";
const layoutFile = "app/(spanish)/juegos/yo-nunca/layout.tsx";
function load(file, playing = false) {
  let stateIndex = 0;
  const playingState = { 0: "playing", 6: ["Yo nunca he cantado en público."] };
  const mocks = {
    react: { ...React, useState: initial => {
      const value = playing && Object.hasOwn(playingState, stateIndex) ? playingState[stateIndex] : initial;
      stateIndex++;
      return [value, () => {}];
    }, useCallback: fn => fn },
    "next/link": { __esModule: true, default: ({ children, ...props }) => React.createElement("a", props, children) },
    "@/lib/AppContext": { useApp: () => ({ recentPlayers: [], playSound() {}, vibrateDevice() {}, savePlayersToRecent() {} }) },
    "@/components/ui/Confetti": { __esModule: true, default: () => null },
    "@/components/ui/IntensitySelector": { __esModule: true, default: () => null },
    "framer-motion": { AnimatePresence: ({children}) => children, motion: new Proxy({}, { get: (_, tag) => ({children, ...props}) => {
      for(const key of ["initial", "animate", "exit", "transition"]) delete props[key];
      return React.createElement(tag, props, children);
    } }) },
  };
  const loaded = { exports: {} };
  const code = ts.transpileModule(read(file), { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText;
  new Function("require", "module", "exports", code)(name => mocks[name] ?? require(name), loaded, loaded.exports);
  return parse(renderToStaticMarkup(React.createElement(loaded.exports.default)));
}
const game = load(gameFile);
const rules = load(rulesFile);
const playing = load(gameFile, true);
const surfaces = [game.textContent, rules.textContent, article.content, ...faqs.map(faq => faq.a)];

test("whole Yo Nunca instructions, playing hint and every FAQ preserve choice and passing", () => {
  for (const text of [game.textContent, rules.textContent, article.content]) assertChosenReaction(text);
  for (const text of [...surfaces, playing.textContent]) assertNoCoercion(text);
  assert.match(playing.textContent, /como hayáis acordado; puedes pasar/);
  assertNoCoercion(read(layoutFile));
  assert.doesNotMatch(read(layoutFile), /El que lo haya hecho, bebe/);
});

const negativeCases = [
  ["creator mandatory drinking", "Quien dijo la frase debe dar un trago."],
  ["creator mandatory drinking", "El creador se bebe un vaso."],
  ["passing penalty", "Si pasas debes beber."],
  ["passing penalty", "Si pasas, pierdes un dedo."],
  ["passing penalty", "Si pasas, bebes."],
  ["mandatory group drinking", "Todos deben beber."],
  ["mandatory group drinking", "Todos beben."],
  ["mandatory group drinking", "El que lo haya hecho, bebe."],
  ["mandatory group drinking", "Es obligatorio beber."],
  ["quantity escalation", "Debe beber el doble."],
  ["quantity escalation", "Hay que beber un vaso entero."],
  ["consecutive drinks", "El infractor bebe 5 tragos seguidos."],
  ["consecutive drinks", "Se toman tres sorbos consecutivos."],
  ["forced disclosure", "Tiene que contar una historia."],
  ["forced disclosure", "Estás moralmente obligado a explicar qué pasó."],
  ["required alcohol", "Necesitas alcohol para jugar."],
  ["required alcohol", "El alcohol es obligatorio."],
  ["creator mandatory drinking", "Quien propuso la frase tiene que tomar un sorbo."],
  ["forced disclosure", "El grupo puede exigir que cuente su historia."],
];
for (const [category, contradiction] of negativeCases) {
  test(`rejects ${category}: ${contradiction}`, () => {
    for (const surface of surfaces) {
      assert.throws(() => assertNoCoercion(`${surface}\n${contradiction}`), { name: "AssertionError" });
    }
    const bodyRule = article.content.split("\n").find(line => /Regla del creador/.test(line));
    assert.throws(() => assertCreatorRule(`${bodyRule} ${contradiction}`), { name: "AssertionError" });
    assert.throws(() => assertAlcoholFree(`${faqs[3].a} ${contradiction}`), { name: "AssertionError" });
  });
}

test("negative checks allow explicit choice, negated obligations and voluntary stories", () => {
  assertNoCoercion("No debes beber. No tienes que contar una historia. Puedes tomar un sorbo pequeño si quieres. No exige beber ni revelar nada.");
  assert.throws(() => assertAlcoholFree("Se puede jugar sin alcohol. Si pasas debes beber."));
});

test("creator consequence is an agreed optional house rule on every Yo Nunca surface", () => {
  const bodyRule = article.content.split("\n").find(line => /Regla del creador/.test(line));
  const gameRule = game.querySelectorAll("li").find(node => /Regla del creador/.test(node.textContent));
  const rulesRule = rules.querySelectorAll("strong").find(node => /Regla del creador/.test(node.textContent)).parentNode;
  for(const text of [bodyRule, gameRule.textContent, rulesRule.textContent, faqs[0].a, faqs[2].a]) assertCreatorRule(text);
  for(const contradiction of ["Todos deben beber", "El creador bebe como penalización", "El creador tiene que beber"]) {
    assert.throws(() => assertCreatorRule(`${bodyRule} ${contradiction}`), "contradictions elsewhere in the rule must fail");
  }
});

test("article answers how to play near the start and gives two usable alcohol-free variants", () => {
  const opening = article.content.split(/^## /m)[0];
  for(const pattern of [/Por turnos/, /afirma no haber hecho/, /Quienes sí lo hayan hecho/, /regla elegida/, /siguiente jugador/]) assert.match(opening, pattern);
  const section = article.content.split("## 🖐️ Cómo jugar al Yo Nunca sin alcohol")[1].split("## 🔥")[0];
  assertAlcoholFree(section);
  assertAlcoholFree(faqs[3].a);
  assert.match(section, /sin vasos/);
  assert.match(section, /sin puntos ni eliminaciones/);
  assert.match(section, /cinco dedos.*?baja uno/s);
  assert.match(section, /cero.*?seguir escuchando/s);
  assert.match(section, /nadie pierde dedos por negarse/);
  assert.match(section, /mayores de edad/);
  assert.doesNotMatch(article.content, /vaso entero de golpe|debe beber como castigo|exigir que cuente|hacer que otra persona.*beba/i);
});

test("secondary game-to-article link is unique, valid and follows the preserved primary action", () => {
  const target = "/blog/reglas-del-yo-nunca";
  const links = game.querySelectorAll(`a[href="${target}"]`);
  assert.equal(links.length, 1);
  assert.equal(links[0].textContent, "reglas completas de Yo Nunca");
  assert.match(links[0].parentNode.textContent, /cómo jugar sin alcohol/);
  const start = game.querySelectorAll("button").find(node => node.textContent.trim() === "Empezar a jugar");
  assert.ok(start);
  assert.match(start.getAttribute("class"), /bg-gradient/);
  assert.ok(game.toString().indexOf(start.toString()) < game.toString().indexOf(links[0].toString()));
  assert.equal(game.querySelectorAll('a[href="/juegos/yo-nunca/reglas"]').length, 1);
  assert.ok(readRouteContract().some(route => route.pathname === target));
  assert.equal((article.content.match(/\]\(\/juegos\/yo-nunca\)/g) ?? []).length, 3);
  assert.equal((article.content.match(/\]\(\/juegos\/yo-nunca\/reglas\)/g) ?? []).length, 1);
});

test("only exact Yo Nunca editorial fragments change; all other production and gameplay stays identical", () => {
  const base = "dbffd98a8e7f1173dd9968f19396b36c107a744f";
  assert.deepEqual(Object.keys(es02Replacements).sort(), [gameFile, rulesFile, layoutFile, "content/blog/reglas-del-yo-nunca.mdx", "lib/data/blog-faqs.ts"].sort());
  assertEs02Compatible(base, ["app", "components", "lib", "content", "public", "scripts", "package.json", "package-lock.json", "next.config.ts", "SEO_DATA.md", "seo-data.json", "tests/fixtures/es-routes.json", "tests/fixtures/en-routes.json", "tests/fixtures/es-editorial-updates.json"]);
  const previous = matter(execFileSync("git", ["show", `${base}:content/blog/reglas-del-yo-nunca.mdx`], { encoding: "utf8" }));
  assert.deepEqual(article.data, { ...previous.data, excerpt: article.data.excerpt });
  assert.match(article.data.excerpt, /cómo jugar.*con o sin alcohol/);
  const words = article.content.trim().split(/\s+/).length;
  assert.ok(words >= 800 && words <= 1500, `${words} words`);
  assert.doesNotMatch(article.content, /^# /m);
});
