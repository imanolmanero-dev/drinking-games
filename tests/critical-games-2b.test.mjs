import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import test from "node:test";

const require = createRequire(import.meta.url);
require("tsx/cjs");

for (const [slug, inventory, filter, level] of [
  ["yo-prefiero", "preguntas", "filtrarPorIntensidad", "intensidad"],
  ["quien-es-mas-probable", "PREGUNTAS_QEMP", "filtrarQEMP", "nivel"],
]) {
  test(slug + " retains its original 60 cards and every intensity combination", () => {
    const file = "lib/data/" + slug + ".ts";
    const original = execFileSync("git", ["show", "b7fc2d7:" + file], { encoding: "utf8" });
    assert.equal(readFileSync(file, "utf8").replaceAll("\r\n", "\n"), original);
    const data = require("../" + file);
    assert.equal(data[inventory].length, 60);
    const levels = ["soft", "normal", "picante"];
    for (let mask = 1; mask < 8; mask++) {
      const selected = levels.filter((_, index) => mask & (1 << index));
      const expected = data[inventory].filter(card => selected.includes(card[level]));
      assert.ok(expected.length > 0);
      assert.deepEqual(data[filter](selected), expected);
    }
  });
}
