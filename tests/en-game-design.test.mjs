import assert from "node:assert/strict";
import { createRequire } from "node:module";
import test from "node:test";

const require = createRequire(import.meta.url);
require("tsx/cjs");
const { createElement } = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const { parse } = require("next/dist/compiled/node-html-parser");
const EnglishPage = require("../components/layout/english/EnglishPage.tsx").default;
const TruthOrDareGame = require("../components/games/truth-or-dare/TruthOrDareGame.tsx").default;
const { TruthOrDareArtwork } = require("../components/layout/english/EnglishArtwork.tsx");
const { publishedRoutes } = require("../lib/i18n/routes.ts");

test("game-detail width is opt-in and preserves every existing page default and its content", () => {
  for (const route of publishedRoutes("en-US")) {
    const props = { routeId: route.id, title: "Page title", intro: "Page introduction", children: createElement("p", null, "Editorial content") };
    const original = parse(renderToStaticMarkup(createElement(EnglishPage, props)));
    const optedIn = parse(renderToStaticMarkup(createElement(EnglishPage, { ...props, variant: "game-detail" })));
    assert.equal(original.querySelector("article").classList.contains("en-page-wide"), ["home", "games-hub", "kings-cup"].includes(route.id), route.id);
    assert.ok(optedIn.querySelector("article").classList.contains("en-page-wide"), route.id);
    optedIn.querySelector("article").setAttribute("class", original.querySelector("article").getAttribute("class"));
    assert.equal(optedIn.toString(), original.toString(), `${route.id}: variant only changes width`);
  }
});

test("setup reuses the exact decorative artwork and retains native configuration and primary action", () => {
  const doc = parse(renderToStaticMarkup(createElement(TruthOrDareGame)));
  const artwork = doc.querySelector(".en-tod-setup-art .en-tod-art");
  assert.equal(artwork.toString(), renderToStaticMarkup(createElement(TruthOrDareArtwork)));
  assert.equal(artwork.getAttribute("aria-hidden"), "true");
  assert.equal(artwork.querySelectorAll("button, a, input, select, [tabindex], img, script").length, 0);
  assert.equal(doc.querySelectorAll("h2").length, 1);
  assert.equal(doc.querySelector('label[for="tod-player-count"]').textContent, "Players");
  const setup = doc.querySelector(".en-tod-setup");
  assert.equal(setup.querySelector("#tod-player-count").tagName, "SELECT");
  assert.equal(setup.querySelectorAll("#tod-player-count option").length, 11);
  assert.equal(setup.querySelectorAll(".en-tod-stepper button").length, 2);
  assert.ok(setup.querySelector("#tod-start.en-button-primary.en-button-wide"));
  assert.match(setup.querySelector(".en-tod-note").textContent, /pass without a penalty.*end the game whenever you want.*Alcohol is optional/);
});
