import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { execFileSync } from "node:child_process";
import test from "node:test";

const require = createRequire(import.meta.url);
require("tsx/cjs");
const { TRUTHS, DARES, PARTY_TRUTHS, PARTY_DARES, PROMPT_POOLS, TOTAL_PROMPTS, promptsForCategory } = require("../lib/data/truth-or-dare-prompts.ts");
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

test("Classic preserves every original prompt and text identity", () => {
  const source = execFileSync("git", ["show", "0dc04381c67c63ad0617af495f515decbc6d7464:lib/data/truth-or-dare-prompts.ts"], { encoding: "utf8" });
  const compiled = require("typescript").transpileModule(source, { compilerOptions: { module: 1 } }).outputText;
  const original = { exports: {} };
  new Function("exports", compiled)(original.exports);
  assert.deepEqual(TRUTHS, original.exports.TRUTHS);
  assert.deepEqual(DARES, original.exports.DARES);
});

test("160 stable text identities have valid pools, no duplicates, empty text or placeholders", () => {
  assert.deepEqual(Object.keys(PROMPT_POOLS), ["classic", "party"]);
  assert.equal(PARTY_TRUTHS.length, 50);
  assert.equal(PARTY_DARES.length, 50);
  const all = Object.values(PROMPT_POOLS).flatMap(({ truths, dares }) => [...truths, ...dares]);
  assert.equal(TOTAL_PROMPTS, 160);
  assert.equal(all.length, TOTAL_PROMPTS);
  assert.equal(new Set(all.map((text) => text.trim().toLowerCase())).size, TOTAL_PROMPTS);
  for (const text of all) {
    assert.equal(typeof text, "string");
    assert.equal(text, text.trim());
    assert.ok(text.length >= 20 && text.length <= 140, text);
    assert.doesNotMatch(text, /\b(TODO|placeholder|chug|shot|alcohol|password|address|phone number|naked|strip)\b/i);
  }
});

test("Classic is the explicit default; invalid category values are rejected", () => {
  assert.equal(startTruthOrDare(2).category, "classic");
  for (const category of ["", "adult", "Classic", null, 0, {}]) {
    assert.throws(() => startTruthOrDare(2, category), RangeError);
    assert.throws(() => promptsForCategory(category), RangeError);
  }
});

for (const category of ["classic", "party", "both"]) {
  test(`${category} filters before shuffle, preserves sources, and uses the entire selected pool`, () => {
    const expected = category === "both" ? { truths: [...TRUTHS, ...PARTY_TRUTHS], dares: [...DARES, ...PARTY_DARES] } : PROMPT_POOLS[category];
    const before = { truths: [...expected.truths], dares: [...expected.dares] };
    let calls = 0;
    const state = startTruthOrDare(12, category, () => { calls++; return 0; });
    assert.equal(state.category, category);
    assert.equal(calls, expected.truths.length + expected.dares.length - 2);
    for (const type of ["truths", "dares"]) {
      assert.notEqual(state[type], expected[type]);
      assert.deepEqual([...state[type]].sort(), [...expected[type]].sort());
      assert.notDeepEqual(state[type], expected[type]);
      assert.deepEqual(expected[type], before[type]);
    }
  });

  for (const firstType of ["truth", "dare"]) {
    test(`${category}: ${firstType} exhaustion is independent; both pools finish without repeats`, () => {
      let state = startTruthOrDare(12, category, () => 0);
      const secondType = firstType === "truth" ? "dare" : "truth";
      const seen = new Set();
      for (const type of [firstType, secondType]) {
        const count = state[type === "truth" ? "truths" : "dares"].length;
        for (let i = 0; i < count; i++) {
          const turn = state.turn;
          state = choose(state, type);
          assert.equal(state.current.type, type);
          assert.equal(seen.has(state.current.text), false);
          seen.add(state.current.text);
          assert.equal(choose(state, type), state);
          state = reduce(state, { type: i % 2 ? "skip" : "next" });
          assert.equal(state.turn, turn + 1);
          assert.equal(currentPlayerNumber(state), (state.turn % 12) + 1);
          assert.equal(next(state), state);
        }
        assert.equal(choose(state, type), state);
        if (type === firstType) {
          assert.equal(state.phase, "choosing");
          assert.equal(state[secondType === "truth" ? "truthIndex" : "dareIndex"], 0);
        }
      }
      assert.equal(state.phase, "finished");
      assert.equal(state.current, null);
      assert.equal(seen.size, state.truths.length + state.dares.length);
    });
  }

  test(`${category}: restart resets both pools and keeps the chosen category and count`, () => {
    const first = startTruthOrDare(2, category, () => 0);
    const ended = reduce(choose(first, "dare"), { type: "finish" });
    const again = startTruthOrDare(ended.playerCount, ended.category, () => 0.99);
    assert.equal(again.category, category);
    assert.equal(again.playerCount, 2);
    assert.equal(again.phase, "choosing");
    assert.equal(again.turn + again.truthIndex + again.dareIndex, 0);
    assert.equal(again.current, null);
    assert.notDeepEqual(again.truths, first.truths);
    assert.notDeepEqual(again.dares, first.dares);
  });
}

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
  const state = startTruthOrDare(2, "classic", () => 0);
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
  const first = startTruthOrDare(3, "classic", () => 0);
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
  const start = startTruthOrDare(2, "classic", () => 0);
  const shown = choose(start, "dare");
  const skipped = reduce(shown, { type: "skip" });
  assert.equal(skipped.dareIndex, 1);
  assert.equal(skipped.phase, "choosing");
  assert.equal(currentPlayerNumber(skipped), 2);
  assert.equal(reduce(skipped, { type: "skip" }), skipped);
  assert.equal(choose(skipped, "dare").current.text, start.dares[1]);
});

test("each set is exhausted independently without substitution or repeats", () => {
  let state = startTruthOrDare(2, "classic", () => 0);
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
  const first = startTruthOrDare(4, "classic", () => 0);
  const ended = reduce(choose(first, "truth"), { type: "finish" });
  const again = startTruthOrDare(ended.playerCount, ended.category, () => 0.99);
  assert.equal(again.playerCount, 4);
  assert.equal(again.turn, 0);
  assert.equal(again.truthIndex, 0);
  assert.equal(again.dareIndex, 0);
  assert.equal(again.phase, "choosing");
  assert.notDeepEqual(again.truths, first.truths);
  assert.notDeepEqual(again.dares, first.dares);
});
