import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import { beforeCriticalGameReferrals, beforeCriticalGames } from "./helpers/critical-games-source.mjs";

const require = createRequire(import.meta.url);
require("tsx/cjs");
const ranks = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
for (const [slug, key] of [["ring-of-fire","CARTAS_ROF"], ["rey-de-la-copa","reglasCartas"]]) {
  test(slug + " retains all thirteen reviewed rules including pass, waterfall, mate and fourth king", () => {
    const file = "lib/data/" + slug + ".ts";
    beforeCriticalGames(file, readFileSync(file,"utf8"));
    const cards = require("../" + file)[key];
    assert.deepEqual(cards.map(card => card.valor), ranks);
    const rule = rank => cards.find(card => card.valor === rank).descripcion;
    assert.match(rule("A"), slug === "ring-of-fire" ? /ola hacia la derecha/ : /Puedes parar inmediatamente/);
    assert.match(rule("8"), /saludo/);
    assert.match(rule("K"), /cuarto rey/i);
    assert.doesNotMatch(cards.map(card => card.descripcion).join(" "), /no (?:se )?puede parar|tiene que beber|debe beber|\d+ tragos|bebe el doble/i);
    if (slug === "rey-de-la-copa") assert.match(rule("A"), /sorbo pequeño opcional/);
  });
}
test("La Bomba shows the current holder and clears both clocks on leaving a round", () => {
  const source = readFileSync("app/(spanish)/juegos/la-bomba/page.tsx", "utf8");
  assert.match(source, /holderName = players\[currentPlayerIdx\]/);
  assert.match(source, /clearTimeout\(timer\)/);
  assert.match(source, /clearInterval\(pulseInterval\)/);
  assert.match(source, /Última ronda completada/);
  assert.doesNotMatch(source, /fondo blanco|sin excusas/i);
});

test("Beer Pong referral is the only reviewed change to that source and cannot revert", () => {
  const file = "app/(spanish)/juegos/beer-pong/page.tsx";
  const baseline = execFileSync("git", ["show", "9a06b8a:" + file], { encoding: "utf8" });
  const current = readFileSync(file, "utf8").replaceAll("\r\n", "\n");
  assert.equal(beforeCriticalGameReferrals(file, current), baseline);
  assert.throws(() => beforeCriticalGameReferrals(file, baseline), /exact reviewed Rey de la Copa referral/);
});
