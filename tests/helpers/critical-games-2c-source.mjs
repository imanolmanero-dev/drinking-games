import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";

const base = "6dba7638773ab46c4f9d6755ab3e7a8d33e45c36";
const reviewed = "912e3a604b4c9e90b4d9ef468e91fee83dbf1e52";
const git = (...args) => execFileSync("git", args, { encoding: "utf8" });
const changed = new Set(git("diff", "--name-only", base, reviewed, "--", "app", "lib", "components", "content").trim().split("\n"));

// Validate the complete candidate file before comparing its predecessor in older guards.
export function beforeBatch2c(file, source) {
  if (!changed.has(file)) return source;
  assert.equal(source.replaceAll("\r\n", "\n"), git("show", reviewed + ":" + file), file);
  return git("show", base + ":" + file);
}
