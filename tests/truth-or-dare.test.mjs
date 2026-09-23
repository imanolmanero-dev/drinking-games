import assert from "node:assert/strict";
import { createRequire } from "node:module";
import test from "node:test";

const require = createRequire(import.meta.url);
require("tsx/cjs");
const { TRUTHS, DARES } = require("../lib/data/truth-or-dare-prompts.ts");
const { startTruthOrDare, truthOrDareReducer: reduce, currentPlayerNumber } = require("../lib/games/truth-or-dare.ts");
const choose = (state, promptType) => reduce(state, { type: "choose", promptType });
const next = (state) => reduce(state, { type: "next" });

test("the two original English sets contain 30 distinct, clear prompts each", () => {
  assert.equal(TRUTHS.length, 30);
  assert.equal(DARES.length, 30);
  const prompts = [...TRUTHS, ...DARES];
  assert.equal(new Set(prompts.map((text) => text.trim().toLowerCase())).size, 60);
  for (const prompt of prompts) {
    assert.equal(prompt, prompt.trim());
    assert.ok(prompt.length >= 20 && prompt.length <= 130, prompt);
    assert.doesNotMatch(prompt, /\b(TODO|placeholder|chug|shot|alcohol|kiss|touch|post|publish|call|message|DM|secret|password|address|phone number)\b/i);
  }
});

test("only integer player counts from 2 through 12 can start", () => {
  for (const count of [2, 4, 12]) {
    const state = startTruthOrDare(count);
    assert.equal(state.playerCount, count);
    assert.equal(state.phase, "choosing");
    assert.equal(currentPlayerNumber(state), 1);
  }
  for (const count of [0, 1, 13, 2.5, NaN, Infinity]) assert.throws(() => startTruthOrDare(count), RangeError);
});

test("starting independently shuffles copies without changing prompt sources", () => {
  const truthsBefore = [...TRUTHS];
  const daresBefore = [...DARES];
  const state = startTruthOrDare(2, () => 0);
  assert.notEqual(state.truths, TRUTHS);
  assert.notEqual(state.dares, DARES);
  assert.deepEqual([...state.truths].sort(), [...TRUTHS].sort());
  assert.deepEqual([...state.dares].sort(), [...DARES].sort());
  assert.deepEqual(TRUTHS, truthsBefore);
  assert.deepEqual(DARES, daresBefore);
  assert.notDeepEqual(state.truths, TRUTHS);
  assert.notDeepEqual(state.dares, DARES);
});

test("Truth and Dare reveal one prompt, reject duplicate choices, and advance one player", () => {
  const first = startTruthOrDare(3, () => 0);
  const truth = choose(first, "truth");
  assert.equal(truth.current.text, first.truths[0]);
  assert.equal(truth.truthIndex, 1);
  assert.equal(truth.dareIndex, 0);
  assert.equal(choose(truth, "dare"), truth);
  assert.equal(choose(truth, "truth"), truth);
  const second = next(truth);
  assert.equal(currentPlayerNumber(second), 2);
  assert.equal(next(second), second);
  const dare = choose(second, "dare");
  assert.equal(dare.current.text, first.dares[0]);
  assert.equal(dare.truthIndex, 1);
  assert.equal(dare.dareIndex, 1);
  assert.equal(currentPlayerNumber(next(dare)), 3);
});

test("skip consumes the displayed prompt once and advances exactly one turn", () => {
  const start = startTruthOrDare(2, () => 0);
  const shown = choose(start, "dare");
  const skipped = reduce(shown, { type: "skip" });
  assert.equal(skipped.dareIndex, 1);
  assert.equal(skipped.phase, "choosing");
  assert.equal(currentPlayerNumber(skipped), 2);
  assert.equal(reduce(skipped, { type: "skip" }), skipped);
  assert.equal(choose(skipped, "dare").current.text, start.dares[1]);
});

test("each set is exhausted independently without substitution or repeats", () => {
  let state = startTruthOrDare(2, () => 0);
  const seen = new Set();
  for (let i = 0; i < 30; i++) {
    state = choose(state, "truth");
    assert.equal(state.current.type, "truth");
    assert.equal(seen.has(state.current.text), false);
    seen.add(state.current.text);
    state = next(state);
  }
  assert.equal(state.phase, "choosing");
  assert.equal(state.truthIndex, 30);
  assert.equal(state.dareIndex, 0);
  assert.equal(choose(state, "truth"), state);
  for (let i = 0; i < 30; i++) {
    state = choose(state, "dare");
    assert.equal(seen.has(state.current.text), false);
    seen.add(state.current.text);
    state = i === 29 ? reduce(state, { type: "skip" }) : next(state);
  }
  assert.equal(seen.size, 60);
  assert.equal(state.phase, "finished");
  assert.equal(state.turn, 60);
  assert.equal(state.current, null);
  assert.equal(choose(state, "truth"), state);
  assert.equal(next(state), state);
});

test("invalid actions and voluntary finish leave no path to another prompt", () => {
  const start = startTruthOrDare(12);
  assert.equal(next(start), start);
  assert.equal(reduce(start, { type: "skip" }), start);
  const revealed = choose(start, "truth");
  const ended = reduce(revealed, { type: "finish" });
  assert.equal(ended.phase, "finished");
  assert.equal(ended.current, null);
  assert.equal(ended.truthIndex, 1);
  for (const action of [{ type: "next" }, { type: "skip" }, { type: "choose", promptType: "dare" }, { type: "finish" }]) {
    assert.equal(reduce(ended, action), ended);
  }
});

test("restart creates a new full game for the same player count", () => {
  const first = startTruthOrDare(4, () => 0);
  const ended = reduce(choose(first, "truth"), { type: "finish" });
  const again = startTruthOrDare(ended.playerCount, () => 0.99);
  assert.equal(again.playerCount, 4);
  assert.equal(again.turn, 0);
  assert.equal(again.truthIndex, 0);
  assert.equal(again.dareIndex, 0);
  assert.equal(again.phase, "choosing");
  assert.notDeepEqual(again.truths, first.truths);
  assert.notDeepEqual(again.dares, first.dares);
});
