import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import test from "node:test";
import { preguntas, filtrarPorIntensidad } from "../lib/data/yo-prefiero.ts";

const path = "app/(spanish)/juegos/la-ruleta/page.tsx";
const source = readFileSync(path, "utf8").replaceAll("\r\n", "\n");
const previous = execFileSync("git", ["show", "e374cf29:" + path], { encoding: "utf8" });

function slots(code) {
  return [...code.matchAll(/{ texto: "([^"]+)", emoji: "([^"]+)", color: "(#[a-f0-9]+)" }/g)];
}

test("roulette retains sixteen wheel positions, geometry, selection, completion, advance and restart", () => {
  const current = slots(source);
  assert.equal(current.length, 16);
  const artwork = new Map([
    [0, ["Inventa un lema para el grupo", "💬"]],
    [2, ["Aplaudid a la vez", "👏"]],
    [5, ["Tararea una sintonía", "🎵"]],
  ]);
  const reviewed = slots(execFileSync("git", ["show", "e828199:" + path], { encoding: "utf8" }));
  const baseline = slots(previous);
  for (const [i, slot] of current.entries()) {
    const [label, emoji] = artwork.get(i) ?? [reviewed[i][1], baseline[i][2]];
    assert.deepEqual(slot.slice(1), [label, emoji, baseline[i][3]]);
  }
  const logic = code => code.slice(code.indexOf("function RouletteWheel"), code.indexOf('if (phase === "setup")'));
  assert.equal(logic(source), logic(previous));
});

test("Yo Prefiero referrals describe the inventory across intensities", () => {
  assert.equal(preguntas.length, 60);
  assert.equal(new Set(preguntas.map(item => item.id)).size, 60);
  const counts = ["soft", "normal", "picante"].map(level => filtrarPorIntensidad([level]).length);
  assert.ok(counts.every(count => count > 0 && count < preguntas.length));
  assert.equal(counts.reduce((sum, count) => sum + count, 0), preguntas.length);
  const fixture = JSON.parse(readFileSync("tests/fixtures/roulette-editorial.json", "utf8"));
  for (const route of ["/", "/juegos/categorias/preguntas"]) {
    const card = fixture[route].cards.find(([href]) => href === "/juegos/yo-prefiero");
    assert.ok(card[2].endsWith(`Hay ${preguntas.length} dilemas repartidos por intensidad.`));
  }
});

test("all roulette results are distinct and the sole drinking suggestion is explicitly optional", () => {
  const labels = slots(source).map(slot => slot[1]);
  assert.equal(new Set(labels).size, 16);
  assert.deepEqual(labels.filter(label => /beb|trag|sorb|shot|copa|fondo blanco|waterfall/i.test(label)), ["Un sorbo pequeño, si te apetece"]);
  for (const label of ["Brindis de grupo", "Haced la ola en cadena", "Verdad o pasa"]) assert.ok(labels.includes(label));
  assert.match(source, /Puedes pasar sin penalización\./);
  assert.match(source, /onClick=\{nextTurn\}[^>]*>\s*Siguiente jugador/);
});
