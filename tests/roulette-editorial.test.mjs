import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import test from "node:test";

const path = "app/(spanish)/juegos/la-ruleta/page.tsx";
const source = readFileSync(path, "utf8").replaceAll("\r\n", "\n");
const previous = execFileSync("git", ["show", "e374cf29:" + path], { encoding: "utf8" });

function slots(code) {
  return [...code.matchAll(/{ texto: "([^"]+)", emoji: "([^"]+)", color: "(#[a-f0-9]+)" }/g)];
}

test("roulette retains sixteen wheel positions, geometry, selection, completion, advance and restart", () => {
  const current = slots(source);
  assert.equal(current.length, 16);
  assert.deepEqual(current.map(slot => slot.slice(2)), slots(previous).map(slot => slot.slice(2)));
  const logic = code => code.slice(code.indexOf("function RouletteWheel"), code.indexOf('if (phase === "setup")'));
  assert.equal(logic(source), logic(previous));
});

test("all roulette results are distinct and the sole drinking suggestion is explicitly optional", () => {
  const labels = slots(source).map(slot => slot[1]);
  assert.equal(new Set(labels).size, 16);
  assert.deepEqual(labels.filter(label => /beb|trag|sorb|shot|copa|fondo blanco|waterfall/i.test(label)), ["Un sorbo pequeño, si te apetece"]);
  for (const label of ["Brindis de grupo", "Haced la ola en cadena", "Verdad o pasa"]) assert.ok(labels.includes(label));
  assert.match(source, /Puedes pasar sin penalización\./);
  assert.match(source, /onClick=\{nextTurn\}[^>]*>\s*Siguiente jugador/);
});
