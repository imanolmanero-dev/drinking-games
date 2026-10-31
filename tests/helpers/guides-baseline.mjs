import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const patches = JSON.parse(readFileSync(new URL("../fixtures/guides-source.json", import.meta.url), "utf8"));
export function withoutGuides(file, source) {
  const value = source.replace(/\r\n/g, "\n");
  if (!patches[file]) return value;
  assert.equal(value, patches[file].after, file + ": exact Guides phase only");
  return patches[file].before;
}
