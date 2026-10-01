import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";

const require = createRequire(import.meta.url);
require("tsx/cjs");
const { buildKingsCupDeck, startKingsCup, kingsCupReducer: reduce, currentPlayerNumber, RANKS, SUITS, CARD_RULES, FOURTH_KING } = require("../lib/games/kings-cup.ts");
const { shuffle } = require("../lib/games/shuffle.ts");
const { KINGS_CUP_TITLE, KINGS_CUP_DESCRIPTION, KINGS_CUP_FAQS } = require("../lib/data/kings-cup-editorial.ts");
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

test("fourth King resolves the physical cup and permits ending or continuing the remaining deck", () => {
  const deck = buildKingsCupDeck();
  let state = { ...startKingsCup(3), deck: [...deck.filter((card) => card.rank === "K"), ...deck.filter((card) => card.rank !== "K")] };
  for (let i = 1; i <= 4; i++) {
    state = draw(state);
    assert.equal(state.kings, i);
    assert.equal(state.phase, "revealed");
    assert.equal(currentPlayerNumber(state), (i - 1) % 3 + 1);
    if (i < 4) state = reduce(state, { type: "next" });
  }
  assert.match(FOURTH_KING, /physical central cup/);
  assert.match(FOURTH_KING, /optional sip/);
  assert.match(FOURTH_KING, /pass/);
  assert.match(FOURTH_KING, /discard the rest/);
  assert.match(FOURTH_KING, /End game.*Next player.*Finish game/);
  const endedOnFourth = reduce(state, { type: "finish" });
  assert.equal(endedOnFourth.phase, "finished");
  assert.equal(endedOnFourth.drawn, 4);
  assert.equal(endedOnFourth.kings, 4);
  assert.equal(reduce(endedOnFourth, { type: "reveal" }), endedOnFourth);
  state = draw(reduce(state, { type: "next" }));
  assert.equal(state.drawn, 5);
  assert.equal(state.kings, 4);
  assert.equal(state.phase, "revealed");
});

test("canonical card meanings and gender-neutral numbered groups are stable", () => {
  assert.deepEqual(RANKS.map((rank) => CARD_RULES[rank].name), ["Waterfall", "You", "Me", "Floor", "Odds", "Evens", "Heaven", "Mate", "Rhyme", "Categories", "Make a rule", "Questions", "King's Cup"]);
  assert.match(CARD_RULES.A.rule, /drawer stops first.*seating order/);
  assert.match(CARD_RULES.A.rule, /own pace.*stop or pass at any time.*without waiting/);
  assert.match(CARD_RULES["4"].rule, /floor.*last player.*small sip/i);
  assert.match(CARD_RULES["7"].rule, /raises a hand.*last player.*small sip/i);
  assert.match(CARD_RULES["5"].rule, /odd numbers \(1, 3, 5, 7, 9, 11\)/);
  assert.match(CARD_RULES["6"].rule, /even numbers \(2, 4, 6, 8, 10, 12\)/);
  assert.match(CARD_RULES["8"].rule, /willing player.*either of you.*once.*no chain reactions/);
  assert.match(CARD_RULES["8"].rule, /table until the next 8.*screen does not track mates/);
  assert.match(CARD_RULES.J.rule, /Everyone must agree.*next Jack/);
  assert.match(CARD_RULES.Q.rule, /respond with a question.*round ends/);
  assert.match(CARD_RULES.K.rule, /first three Kings.*small optional amount.*physical central cup/);
  for (const rule of Object.values(CARD_RULES)) assert.match(rule.rule, /optional|pass/i);
});

test("King counting is tied to drawn cards, including skipping, with no early fourth King", () => {
  const deck = buildKingsCupDeck();
  const kings = deck.filter((card) => card.rank === "K");
  const others = deck.filter((card) => card.rank !== "K");
  let state = { ...startKingsCup(2, () => 0), deck: [kings[0], others[0], kings[1], others[1], kings[2], others[2], kings[3], ...others.slice(3)] };
  for (const expected of [1, 1, 2, 2, 3, 3, 4]) {
    assert.equal(reduce(state, { type: "reveal" }), state);
    const revealing = reduce(state, { type: "draw" });
    assert.equal(revealing.kings, expected);
    assert.equal(reduce(revealing, { type: "draw" }), revealing);
    state = reduce(revealing, { type: "reveal" });
    assert.equal(state.deck[state.drawn - 1].rank === "K" && state.kings === 4, state.drawn === 7);
    // Skip uses the same next action as the normal advance and consumes no extra card.
    const advanced = reduce(state, { type: "next" });
    assert.equal(advanced.kings, expected);
    assert.equal(advanced.drawn, state.drawn);
    assert.equal(reduce(advanced, { type: "next" }), advanced);
    state = advanced;
  }
  assert.equal(state.phase, "ready");
  const finished = reduce(state, { type: "finish" });
  assert.equal(finished.phase, "finished");
  assert.equal(startKingsCup(finished.playerCount, () => 0).kings, 0);
});

test("editorial answers describe the actual rules and voluntary central-cup resolution", () => {
  assert.match(KINGS_CUP_TITLE, /King's Cup Rules.*Free Online Game/);
  assert.match(KINGS_CUP_DESCRIPTION, /52-card.*Waterfall.*central cup.*Alcohol is optional/);
  const answers = KINGS_CUP_FAQS.map(({ a }) => a).join(" ");
  assert.match(answers, /first three Kings.*small optional amount.*physical central cup/);
  assert.match(answers, /fourth King's drawer.*small sip.*pass.*discards the rest.*End game.*Next player.*Finish game/);
  assert.match(answers, /odd-numbered players for 5.*even-numbered players for 6/);
  assert.match(answers, /until the next 8/);
  assert.match(answers, /not an ongoing Question Master/);
  assert.match(answers, /Water, soda.*non-alcoholic/);
  const source = readFileSync("app/(english)/en/games/kings-cup/page.tsx", "utf8") + readFileSync("components/games/kings-cup/KingsCupGame.tsx", "utf8");
  assert.match(source, /legal drinking age.*know your limits/s);
  assert.match(source, /fourthKing \? FOURTH_KING : rule.rule/);
  assert.match(source, /<p>\{FOURTH_KING\}<\/p>/);
  assert.doesNotMatch(source + answers + JSON.stringify(CARD_RULES) + FOURTH_KING, /\bWave\b|gentler online adaptation|favorite moment|Crown moment|Five favorites|Story mix|Group finale/i);
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
