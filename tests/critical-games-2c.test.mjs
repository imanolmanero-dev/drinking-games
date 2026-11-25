import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import { beforeBatch2c } from "./helpers/critical-games-2c-source.mjs";

const require = createRequire(import.meta.url);
require("tsx/cjs");
const { tabuCards } = require("../lib/data/tabu.ts");
const { challenges, CUP_LAYOUT_6, CUP_LAYOUT_10 } = require("../lib/data/beer-pong.ts");
const base = "6dba7638773ab46c4f9d6755ab3e7a8d33e45c36";
const old = file => execFileSync("git", ["show", base + ":" + file], {encoding:"utf8"});
const read = file => readFileSync(file, "utf8").replaceAll("\r\n","\n");

test("Tabú retains every original card, word, and forbidden clue", () => {
  assert.equal(read("lib/data/tabu.ts"), old("lib/data/tabu.ts"));
  assert.equal(tabuCards.length,65);
  assert.equal(new Set(tabuCards.map(c => c.word)).size,65);
  assert.ok(tabuCards.every(c => c.taboo.length === 4));
});

test("Beer Pong retains both formations and fifteen playable table challenges", () => {
  assert.deepEqual([CUP_LAYOUT_6.length,CUP_LAYOUT_10.length,challenges.length],[6,10,15]);
  assert.equal(new Set(challenges).size,15);
  for (const challenge of challenges) assert.doesNotMatch(challenge,/\bbeb[eéió]|\btragos?\b|\bchupitos?\b/i);
  assert.ok(challenges.some(text => text.includes("retira dos vasos")));
});

test("historical comparisons reject unreviewed changes to a scoped game or referral", () => {
  for (const file of ["app/(spanish)/juegos/beer-pong/page.tsx","components/layout/GameLayout.tsx"]) {
    assert.equal(beforeBatch2c(file,read(file)),old(file));
    assert.throws(() => beforeBatch2c(file,read(file)+" extra"),{code:"ERR_ASSERTION"});
    assert.throws(() => beforeBatch2c(file,old(file)),{code:"ERR_ASSERTION"});
  }
});
