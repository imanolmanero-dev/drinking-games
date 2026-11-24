import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

const pins = JSON.parse(readFileSync(new URL("../fixtures/critical-games-source.json", import.meta.url)));

const batch2bPins = JSON.parse(readFileSync(new URL("../fixtures/critical-games-2b-source.json", import.meta.url)));
function beforeBatch2b(file, source) {
  if (!Object.hasOwn(batch2bPins, file)) return source;
  assert.equal(createHash("sha256").update(source.replaceAll("\r\n", "\n")).digest("hex"), batch2bPins[file], file);
  return execFileSync("git", ["show", "b7fc2d7:" + file], { encoding: "utf8" });
}

export function beforeCriticalGameReferrals(file, source) {
  if (file === "app/(spanish)/juegos/categorias/cartas/page.tsx") {
    return beforeCriticalGames(file, source);
  }
  if (["app/(spanish)/juegos/categorias/preguntas/page.tsx", "app/(spanish)/juegos/categorias/dados/page.tsx"].includes(file)) return beforeBatch2b(file, source);
  if (file !== "app/(spanish)/juegos/beer-pong/page.tsx") return source;
  const approved = "Baraja de cartas, una copa en el centro y reglas para cada número. Al cuarto rey se retira la copa.";
  const previous = "Baraja de cartas, una copa en el centro y reglas para cada número. El que saca el 4º Rey bebe todo.";
  assert.equal(source.split(approved).length - 1, 1, `${file}: exact reviewed Rey de la Copa referral`);
  return source.replace(approved, previous);
}

export function beforeCriticalGames(file, source) {
  source = beforeBatch2b(file, source);
  if (!Object.hasOwn(pins, file)) return source;
  const normalized = source.replaceAll("\r\n", "\n");
  assert.equal(createHash("sha256").update(normalized).digest("hex"), pins[file], file);
  return execFileSync("git", ["show", "9a06b8a:" + file], { encoding: "utf8" });
}
