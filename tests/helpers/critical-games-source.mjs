import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

const pins = JSON.parse(readFileSync(new URL("../fixtures/critical-games-source.json", import.meta.url)));
export function beforeCriticalGames(file, source) {
  if (!Object.hasOwn(pins, file)) return source;
  const normalized = source.replaceAll("\r\n", "\n");
  assert.equal(createHash("sha256").update(normalized).digest("hex"), pins[file], file);
  return execFileSync("git", ["show", "9a06b8a:" + file], { encoding: "utf8" });
}
