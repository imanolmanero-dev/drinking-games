import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const patches = JSON.parse(readFileSync(new URL("../fixtures/nhie-source.json", import.meta.url), "utf8"));
export function withoutNhie(file, source) {
 const value = source.replace(/\r\n/g, "\n");
 const patch = patches[file];
 if (!patch) return value;
 assert.equal(value, patch.after, file + ": only the exact NHIE addition is authorized");
 return patch.before;
}
