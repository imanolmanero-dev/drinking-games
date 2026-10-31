import { withoutGuides } from "./guides-baseline.mjs";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const patches = JSON.parse(readFileSync(new URL("../fixtures/choice-source.json", import.meta.url), "utf8"));
export function withoutChoice(file, source) {
  const value = withoutGuides(file, source);
  const patch = patches[file];
  if (!patch) return value;
  assert.equal(value, patch.after, `${file}: exact decision-guide addition only`);
  return patch.before;
}
