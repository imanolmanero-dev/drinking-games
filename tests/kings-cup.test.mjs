import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";

const require = createRequire(import.meta.url);
require("tsx/cjs");
const { buildKingsCupDeck, startKingsCup, kingsCupReducer: reduce, currentPlayerNumber, RANKS, SUITS, CARD_RULES, FOURTH_KING } = require("../lib/games/kings-cup.ts");
const { shuffle } = require("../lib/games/shuffle.ts");
const { languageAlternates, languageSwitch, getPublishedRoute } = require("../lib/i18n/routes.ts");
const { GameJsonLd } = require("../components/seo/JsonLd.tsx");
const { createElement } = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const { parse } = require("next/dist/compiled/node-html-parser");
const draw = (state) => reduce(reduce(state, { type: "draw" }), { type: "reveal" });

test("King's Cup has 52 unique cards, 4 Kings and four suits for every rank", () => {
  const deck = buildKingsCupDeck();
  assert.equal(deck.length, 52);
  assert.equal(new Set(deck.map((card) => card.id)).size, 52);
  assert.equal(deck.filter((card) => card.rank === "K").length, 4);
  assert.deepEqual(Object.keys(CARD_RULES).sort(), [...RANKS].sort());
  for (const rank of RANKS) assert.deepEqual(deck.filter((card) => card.rank === rank).map((card) => card.suit), [...SUITS]);
});

test("neutral shuffle preserves the set, references and input, including empty and singleton decks", () => {
  for (const input of [[], [{ id: "one" }], buildKingsCupDeck()]) {
    const before = structuredClone(input);
    Object.freeze(input);
    const result = shuffle(input, () => 0);
    assert.notEqual(result, input);
    assert.deepEqual([...result].sort((a, b) => a.id.localeCompare(b.id)), [...input].sort((a, b) => a.id.localeCompare(b.id)));
    assert.deepEqual(input, before);
    for (const card of result) assert.ok(input.includes(card));
  }
});

test("game validates player count and starts with a complete hidden deck", () => {
  for (const invalid of [0, 1, 13, 2.5, NaN]) assert.throws(() => startKingsCup(invalid));
  for (const count of [2, 4, 12]) {
    const state = startKingsCup(count);
    assert.equal(state.deck.length, 52);
    assert.equal(state.drawn, 0);
    assert.equal(state.kings, 0);
    assert.equal(state.phase, "ready");
    assert.equal(currentPlayerNumber(state), 1);
  }
});

test("draw and next locks prevent duplicate draws, turn skips and premature advancement", () => {
  const initial = startKingsCup(3, () => 0);
  const revealing = reduce(initial, { type: "draw" });
  assert.equal(initial.drawn, 0);
  assert.equal(revealing.phase, "revealing");
  assert.equal(revealing.drawn, 1);
  assert.equal(reduce(revealing, { type: "draw" }), revealing);
  assert.equal(reduce(revealing, { type: "next" }), revealing);
  const revealed = reduce(revealing, { type: "reveal" });
  assert.equal(reduce(revealed, { type: "draw" }), revealed);
  assert.equal(reduce(revealed, { type: "reveal" }), revealed);
  assert.equal(currentPlayerNumber(revealed), 1);
  const next = reduce(revealed, { type: "next" });
  assert.equal(currentPlayerNumber(next), 2);
  assert.equal(reduce(next, { type: "next" }), next);
});

test("fourth King displays a finale without ending or discarding the remaining deck", () => {
  const deck = buildKingsCupDeck();
  let state = { ...startKingsCup(3), deck: [...deck.filter((card) => card.rank === "K"), ...deck.filter((card) => card.rank !== "K")] };
  for (let i = 1; i <= 4; i++) {
    state = draw(state);
    assert.equal(state.kings, i);
    assert.equal(state.phase, "revealed");
    assert.equal(currentPlayerNumber(state), (i - 1) % 3 + 1);
    if (i < 4) state = reduce(state, { type: "next" });
  }
  assert.match(FOURTH_KING, /favorite moment/);
  state = draw(reduce(state, { type: "next" }));
  assert.equal(state.drawn, 5);
  assert.equal(state.kings, 4);
  assert.equal(state.phase, "revealed");
});

test("all 52 cards are revealed once; last rule remains visible before completion", () => {
  let state = startKingsCup(4);
  const ids = [];
  for (let i = 0; i < 52; i++) {
    state = draw(state);
    assert.equal(state.phase, "revealed");
    assert.equal(currentPlayerNumber(state), i % 4 + 1);
    ids.push(state.deck[state.drawn - 1].id);
    state = reduce(state, { type: "next" });
  }
  assert.equal(new Set(ids).size, 52);
  assert.equal(state.phase, "finished");
  assert.equal(state.kings, 4);
  for (const type of ["draw", "next", "reveal", "pause", "resume"]) assert.equal(reduce(state, { type }), state);
});

test("pause keeps progress and blocks draws/next even when a pending reveal settles", () => {
  const ready = startKingsCup(2);
  let paused = reduce(ready, { type: "pause" });
  assert.equal(reduce(paused, { type: "draw" }), paused);
  assert.equal(reduce(paused, { type: "next" }), paused);
  let state = reduce(reduce(paused, { type: "resume" }), { type: "draw" });
  paused = reduce(state, { type: "pause" });
  state = reduce(paused, { type: "reveal" });
  assert.equal(state.paused, true);
  assert.equal(state.drawn, 1);
  assert.equal(reduce(state, { type: "next" }), state);
  state = reduce(reduce(state, { type: "resume" }), { type: "next" });
  assert.equal(state.phase, "ready");
  assert.equal(currentPlayerNumber(state), 2);
});

test("early finish ignores late reveals; Play again constructs a fresh full deck", () => {
  const initial = startKingsCup(4, () => 0);
  const ended = reduce(reduce(initial, { type: "draw" }), { type: "finish" });
  assert.equal(ended.phase, "finished");
  assert.equal(reduce(ended, { type: "reveal" }), ended);
  const restarted = startKingsCup(ended.playerCount, () => 0.99);
  assert.equal(restarted.phase, "ready");
  assert.equal(restarted.drawn, 0);
  assert.equal(restarted.kings, 0);
  assert.equal(restarted.deck.length, 52);
  assert.notEqual(restarted.deck, initial.deck);
  assert.notDeepEqual(restarted.deck, initial.deck);
  assert.deepEqual(restarted.deck.map((card) => card.id).sort(), initial.deck.map((card) => card.id).sort());
});

test("King's Cup publication keeps distinct Spanish rules unpaired, with honest home fallbacks", () => {
  assert.equal(getPublishedRoute("kings-cup", "en-US").pathname, "/en/games/kings-cup");
  assert.equal(languageAlternates("kings-cup"), undefined);
  for (const locale of ["es", "en-US"]) assert.equal(languageSwitch("kings-cup", locale).fallback, true);
  const fixture = JSON.parse(readFileSync("tests/fixtures/en-routes.json", "utf8"));
  const previous = JSON.parse(execFileSync("git", ["show", "18837ef:tests/fixtures/en-routes.json"], { encoding: "utf8" }));
  assert.deepEqual(fixture.filter((route) => !["/en/games/kings-cup", "/en/blog/drinking-games-for-2", "/en/games/truth-or-dare"].includes(route.pathname)).map((route) => route.pathname === "/en" ? { ...route, h1: "Good company. Your pace." } : route), previous);
  assert.equal(fixture.find((route) => route.pathname === "/en/games/kings-cup").equivalentEs, null);
});

test("English game schema has a free USD offer and no invented ratings", () => {
  const document = parse(renderToStaticMarkup(createElement(GameJsonLd, { locale: "en-US", name: "King's Cup Drinking Game", description: "Play with friends", url: "https://bebergames.com/en/games/kings-cup" })));
  const schema = JSON.parse(document.querySelector("script").textContent);
  assert.equal(schema["@type"], "WebApplication");
  assert.equal(schema.inLanguage, "en-US");
  assert.deepEqual(schema.offers, { "@type": "Offer", price: "0", priceCurrency: "USD" });
  assert.equal(schema.aggregateRating, undefined);
  assert.equal(schema.review, undefined);
});
