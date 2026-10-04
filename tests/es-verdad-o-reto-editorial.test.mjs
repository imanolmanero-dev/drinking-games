import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import ts from "typescript";
import { readRouteContract } from "../scripts/audit-static-export.mjs";
import { assertEs01Compatible } from "./helpers/es01-baseline.mjs";

const require = createRequire(import.meta.url);
require("tsx/cjs");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const { parse } = require("next/dist/compiled/node-html-parser");
const matter = require("gray-matter");
const read = (file) => readFileSync(file, "utf8");
const { VERDADES, RETOS } = require("../lib/data/verdad-o-reto.ts");
const articlePath = "/blog/preguntas-picantes-verdad-o-reto";
const article = matter(read(`content${articlePath}.mdx`));
const [questionsSection, daresSection] = article.content.split(/^## .*15 Retos.*$/m);
const entries = (section) => [...section.matchAll(/^(\d+)\. (.+)$/gm)].map(([, number, text]) => ({ number: Number(number), text: text.trim() }));
const questions = entries(questionsSection);
const dares = entries(daresSection);

function loadTs(file, mocks) {
  const code = ts.transpileModule(read(file), { fileName: file, compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText;
  const exports = {};
  new Function("exports", "require", code)(exports, (name) => Object.hasOwn(mocks, name) ? mocks[name] : require(name));
  return exports;
}
const motion = new Proxy({}, { get: (_, tag) => ({ children, ...props }) => {
  for (const key of ["initial", "animate", "exit", "transition"]) delete props[key];
  return React.createElement(tag, props, children);
} });
const mocks = {
  react: { ...React, useState: (initial) => [typeof initial === "function" ? initial() : initial, () => {}], useCallback: (fn) => fn },
  "framer-motion": { motion, AnimatePresence: ({ children }) => children },
  "next/link": { default: ({ children, ...props }) => React.createElement("a", props, children), __esModule: true },
  "@/lib/AppContext": { useApp: () => ({ playSound() {}, vibrateDevice() {}, savePlayersToRecent() {}, recentPlayers: [] }) },
  "@/components/ui/Confetti": { default: () => null, __esModule: true },
  "./VerdadRetoExperimentAd": { default: () => null, __esModule: true },
};
mocks["@/components/ui/IntensitySelector"] = loadTs("components/ui/IntensitySelector.tsx", mocks);
const Page = loadTs("app/(spanish)/juegos/verdad-o-reto/page.tsx", mocks).default;
const Layout = loadTs("app/(spanish)/juegos/verdad-o-reto/layout.tsx", { "@/components/layout/GameLayout": {} });
const html = renderToStaticMarkup(React.createElement(Page));
const doc = parse(html);

test("ES game inventory remains 80 truths and 80 dares with the actual three level distributions", () => {
  for (const [pool, type] of [[VERDADES, "verdad"], [RETOS, "reto"]]) {
    assert.equal(pool.length, 80);
    assert.ok(pool.every((entry) => entry.tipo === type));
    assert.deepEqual([...new Set(pool.map((entry) => entry.nivel))].sort(), ["normal", "picante", "soft"]);
    assert.deepEqual(["soft", "normal", "picante"].map((level) => pool.filter((entry) => entry.nivel === level).length), [27, 27, 26]);
  }
});

test("visible game copy and metadata counts match the data rather than vague larger quantities", () => {
  for (const copy of [doc.textContent, Layout.metadata.description, Layout.metadata.openGraph.description]) {
    const claim = copy.match(/(\d+) verdades y (\d+) retos/);
    assert.ok(claim);
    assert.equal(Number(claim[1]), VERDADES.length);
    assert.equal(Number(claim[2]), RETOS.length);
    assert.doesNotMatch(copy, /más de \d+|cientos de preguntas/i);
  }
  assert.match(Layout.metadata.openGraph.description, new RegExp(`^${VERDADES.length + RETOS.length} tarjetas`));
  for (const level of ["Soft", "Normal", "Picante"]) assert.match(doc.textContent, new RegExp(`Nivel ${level}`));
  assert.equal(Layout.metadata.title, "Verdad o Reto — Juego para beber online");
  assert.equal(Layout.metadata.alternates.canonical, "https://bebergames.com/juegos/verdad-o-reto");
  assert.equal(doc.querySelector("h1").textContent.trim(), "Verdad o Reto");
});

test("article contains 50 numbered questions and 15 numbered dares with truthful editorial promises", () => {
  assert.equal(questions.length, 50);
  assert.equal(dares.length, 15);
  assert.equal(questions.length + dares.length, 65);
  assert.deepEqual(questions.map(({ number }) => number), Array.from({ length: questions.length }, (_, i) => i + 1));
  assert.deepEqual(dares.map(({ number }) => number), Array.from({ length: dares.length }, (_, i) => i + 1));
  assert.ok(questions.every(({ text }) => text.includes("¿") && text.endsWith("?")));
  assert.ok(dares.every(({ text }) => !text.startsWith("¿")));
  for (const copy of [article.data.title, article.data.excerpt, questionsSection.split(/^## /m)[0]]) {
    assert.match(copy, new RegExp(`${questions.length} preguntas picantes`));
    assert.match(copy, new RegExp(`${dares.length} retos`));
    assert.doesNotMatch(copy, /65 preguntas/i);
  }
  assert.doesNotMatch(article.content, /^# /m);
});

test("one contextual Picante link follows the unchanged primary game action and resolves to an ES route", () => {
  const links = doc.querySelectorAll(`a[href="${articlePath}"]`);
  assert.equal(links.length, 1);
  assert.match(links[0].parentNode.textContent, /nivel Picante/);
  assert.match(links[0].textContent, new RegExp(`${questions.length} preguntas picantes y ${dares.length} retos`));
  const start = doc.querySelectorAll("button").find((button) => button.textContent.trim() === "Empezar a jugar");
  assert.ok(start);
  assert.match(start.getAttribute("class"), /bg-gradient-to-r/);
  assert.ok(html.indexOf("Empezar a jugar") < html.indexOf(`href="${articlePath}"`));
  assert.ok(readRouteContract().some((route) => route.pathname === articlePath));
  assert.equal((article.content.match(/\]\(\/juegos\/verdad-o-reto\)/g) ?? []).length, 2);
});

test("the historical route fixture stays immutable and only the reviewed article title/H1 change", () => {
  const historical = JSON.parse(read("tests/fixtures/es-routes.json"));
  const updates = JSON.parse(read("tests/fixtures/es-editorial-updates.json"));
  assert.deepEqual(Object.keys(updates), [articlePath]);
  assert.deepEqual(updates[articlePath], { title: `${article.data.title} | BeberGames`, h1: article.data.title });
  assert.deepEqual(readRouteContract(), historical.map((route) => route.pathname === articlePath ? { ...route, ...updates[articlePath] } : route));
});

test("ES-01 changes only reviewed fragments; gameplay, inventories, EN, reporting and infrastructure remain intact", () => {
  assertEs01Compatible("06ba0356a2bec7a8a1e3fe47f3950fd3058c792b", ["app", "content", "lib", "components", "scripts", "public", "tests/fixtures/es-routes.json", "tests/fixtures/en-routes.json", "package.json", "package-lock.json", "next.config.ts", "SEO_DATA.md", "seo-data.json"]);
});
