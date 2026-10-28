import assert from "node:assert/strict";
import { createRequire } from "node:module";
import test from "node:test";
import { readFileSync } from "node:fs";
const require = createRequire(import.meta.url); require("tsx/cjs");
const { createElement } = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const { parse } = require("next/dist/compiled/node-html-parser");
test("Truth or Dare preserves the compact solid gameplay shell outside setup", () => {
 const css = readFileSync(new URL("../components/layout/english/EnglishDesign.module.css", import.meta.url), "utf8");
 const rule = css.match(/\.root\s+:global\(\.en-tod-game:not\(\.en-tod-setting-up\)\)\s*\{([^}]+)\}/);
 assert.ok(rule, "all non-setup states must retain their gameplay-only rule");
 const declarations = Object.fromEntries(rule[1].split(";").filter(value => value.trim()).map(value => value.split(":").map(part => part.trim())));
 assert.equal(declarations["max-width"], "752px");
 assert.equal(declarations["margin-inline"], "auto");
 assert.equal(declarations.background, "var(--surface)");
});
for (const [slug, name, id] of [["truth-or-dare", "TruthOrDareGame", "tod"], ["kings-cup", "KingsCupGame", "kc"]]) {
 test(slug + " shares setup with real game fields and safety meaning", () => {
 const Game = require("../components/games/" + slug + "/" + name + ".tsx").default;
 const doc = parse(renderToStaticMarkup(createElement(Game)));
 assert.ok(doc.querySelector(".en-shared-setting-up .en-setup-panel"));
 const select = doc.querySelector("#" + id + "-player-count");
 assert.deepEqual(select.querySelectorAll("option").map(n => Number(n.getAttribute("value"))), Array.from({length:11},(_,i)=>i+2));
 assert.equal(doc.querySelector('label[for="' + id + '-player-count"]').textContent, "Players");
 assert.equal(Boolean(doc.querySelector("#tod-category")), id === "tod");
 assert.equal(doc.querySelectorAll(".en-setup-start").length, 1);
 assert.ok(doc.querySelector(".en-setup-start").range[0] < doc.querySelector(".en-setup-note").range[0]);
 assert.match(doc.querySelector(".en-setup-note").textContent, id === "tod" ? /pass without a penalty.*Alcohol is optional/ : /water, soda, or no drinks.*Every action is optional.*skip a card, pause, or end/);
 });
}

test("routes, Spanish production and game logic remain unchanged from preflight", async () => {
 const { execFileSync } = await import("node:child_process");
 const diff = execFileSync("git", ["diff", "6daba04c3283437f36eb7e3eb5e948a5225e2011", "--", "app", "lib", "content", "public", "components/layout/spanish", "tests/fixtures/en-routes.json", "tests/fixtures/es-routes.json", "package.json", "package-lock.json"], {encoding:"utf8"});
 assert.equal(diff, "");
});
