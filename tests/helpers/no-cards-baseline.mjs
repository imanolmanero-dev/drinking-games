import { withoutNhie } from "./nhie-baseline.mjs";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const patches = JSON.parse(readFileSync(new URL('../fixtures/no-cards-source.json', import.meta.url), 'utf8'));
export function withoutNoCards(file, source) {
  const value = withoutNhie(file, source);
  const patch = patches[file];
  if (!patch) return value;
  assert.equal(value, patch.after, `${file}: only the exact no-cards phase addition is authorized`);
  return patch.before;
}
