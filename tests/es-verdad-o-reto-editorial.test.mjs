import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import test from "node:test";
import ts from "typescript";
import { readRouteContract } from "../scripts/audit-static-export.mjs";
import { es01Replacements } from "./helpers/es01-baseline.mjs";

// Exact authorized mature-weekly-window patch against 0fc57e3 (also identical against this
// test's historical base). Keep reporting files IN the source comparison.
// Pin the complete residual diff, including paths, blob IDs and every hunk;
// any extra source edit requires a separate review of this authorization.
const reviewedReportingDiffSha256 = "a75b16bcf27b8dd84c8f10583ade22cdc6c2bdf73d429632a8480a57ebe4daed";
function assertReviewedReportingDiff(diff) {
  assert.equal(createHash("sha256").update(diff).digest("hex"), reviewedReportingDiffSha256,
    "only the exact authorized SEO mature-window patch may differ outside approved editorial fragments");
}
function reviewedSourceDiff(base, paths, exclusions = []) {
  return execFileSync("git", ["-c", "core.abbrev=40", "diff", "--no-ext-diff", "--no-textconv",
    "--no-color", "--no-renames", "--diff-algorithm=myers", "--indent-heuristic",
    "--src-prefix=a/", "--dst-prefix=b/", "--unified=3",
    base, "--", ...paths, ...exclusions], { encoding: "utf8" });
}

// Preserve the existing exact-fragment baseline transformation, then allow
// only the pinned reporting diff in the remaining repository comparison.
function assertReviewedSource(base, paths, additionalExclusions = [], readCurrent = file => readFileSync(file, "utf8")) {
  const replacements = es01Replacements;
  const files = Object.keys(replacements).filter(file => paths.some(path => file === path || file.startsWith(path + "/")));
  assertReviewedReportingDiff(reviewedSourceDiff(base, paths,
    [...additionalExclusions, ...files.map(file => ":(exclude,literal)" + file)]));
  for (const file of files) {
    let expected = execFileSync("git", ["show", base + ":" + file], { encoding: "utf8" }).replace(/\r\n/g, "\n");
    for (const [before, after] of replacements[file]) {
      assert.equal(expected.split(before).length - 1, 1, file + ": unique reviewed original fragment");
      expected = expected.replace(before, after);
    }
    assert.equal(readCurrent(file).replace(/\r\n/g, "\n"), expected, file + ": only exact reviewed fragments");
  }
}

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
  assertReviewedSource("06ba0356a2bec7a8a1e3fe47f3950fd3058c792b", ["app", "content", "lib", "components", "scripts", "public", "tests/fixtures/es-routes.json", "tests/fixtures/en-routes.json", "package.json", "package-lock.json", "next.config.ts", "SEO_DATA.md", "seo-data.json"]);
});

test("historical guard rejects an extra reporting edit beyond the reviewed coverage patch", () => {
  const diff = reviewedSourceDiff("0fc57e3a02ea5343313596fdc2412f5c283d484e",
    ["scripts/seo-reporting.mjs", "scripts/fetch-seo-data.ts"]);
  assertReviewedReportingDiff(diff);
  const source = readFileSync("scripts/fetch-seo-data.ts", "utf8").replace(/\r\n/g, "\n");
  const mutatedSource = source.replace("  safeApiFailure,", "  safeApiFailure, // unreviewed extra edit");
  assert.notEqual(mutatedSource, source);
  // Reconstruct this extra source edit's diff and blob ID entirely in memory.
  const blob = value => execFileSync("git", ["hash-object", "--stdin"], { input: value, encoding: "utf8" }).trim();
  const mutated = diff.replace("+  safeApiFailure,", "+  safeApiFailure, // unreviewed extra edit")
    .replace(blob(source), blob(mutatedSource));
  assert.notEqual(mutated, diff);
  assert.throws(() => assertReviewedReportingDiff(mutated), { code: "ERR_ASSERTION" });
});

test("historical ES-01 guard rejects an unexpected Truth or Dare inventory claim", () => {
  const file = "app/(spanish)/juegos/verdad-o-reto/page.tsx";
  const source = read(file);
  const mutated = source.replace("80 verdades y 80 retos", "81 verdades y 80 retos");
  assert.notEqual(mutated, source);
  assert.throws(() => assertReviewedSource("06ba0356a2bec7a8a1e3fe47f3950fd3058c792b",
    ["app", "content", "lib", "components", "scripts", "public", "tests/fixtures/es-routes.json", "tests/fixtures/en-routes.json", "package.json", "package-lock.json", "next.config.ts", "SEO_DATA.md", "seo-data.json"], [],
    currentFile => currentFile === file ? mutated : read(currentFile)), { code: "ERR_ASSERTION" });
});
