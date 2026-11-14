import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const patches = JSON.parse(readFileSync(new URL("../fixtures/mlt-source.json", import.meta.url), "utf8"));
export function withoutMostLikely(file, source) {
  const value = source.replace(/\r\n/g, "\n");
  const patch = patches[file];
  if (!patch || value === patch.before) return value;
  assert.equal(value, patch.after, file + ": exact Most Likely To addition only");
  return patch.before;
}
