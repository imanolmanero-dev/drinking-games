import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

const pins = JSON.parse(readFileSync(new URL("../fixtures/critical-games-source.json", import.meta.url)));

export function beforeCriticalGameReferrals(file, source) {
  if (file === "app/(spanish)/juegos/categorias/cartas/page.tsx") {
    return beforeCriticalGames(file, source);
  }
  if (file !== "app/(spanish)/juegos/beer-pong/page.tsx") return source;
  const approved = "Baraja de cartas, una copa en el centro y reglas para cada número. Al cuarto rey se retira la copa.";
  const previous = "Baraja de cartas, una copa en el centro y reglas para cada número. El que saca el 4º Rey bebe todo.";
  assert.equal(source.split(approved).length - 1, 1, `${file}: exact reviewed Rey de la Copa referral`);
  return source.replace(approved, previous);
}

export function beforeCriticalGames(file, source) {
  if (!Object.hasOwn(pins, file)) return source;
  const normalized = source.replaceAll("\r\n", "\n");
  assert.equal(createHash("sha256").update(normalized).digest("hex"), pins[file], file);
  return execFileSync("git", ["show", "9a06b8a:" + file], { encoding: "utf8" });
}
