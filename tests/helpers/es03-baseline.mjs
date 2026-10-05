import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// Only these reviewed source fragments may differ; never exclude whole pages.
export const es03Replacements = JSON.parse(readFileSync(new URL("../fixtures/es03-editorial-fragments.json", import.meta.url), "utf8"));
// Shared FAQ sources can contain changes from multiple phases: keep every exact pair.
export function mergeEditorialReplacements(...groups) {
  const result = {};
  for (const group of groups) for (const [file, pairs] of Object.entries(group)) {
    (result[file] ??= []).push(...pairs);
  }
  return result;
}
export function projectEs03(file, source) {
  for (const [before, after] of es03Replacements[file] ?? []) {
    assert.equal(source.split(before).length - 1, 1, `${file}: unique ES-03 fragment`);
    source = source.replace(before, after);
  }
  return source;
}
