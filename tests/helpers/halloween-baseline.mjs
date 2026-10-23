import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

// The latest preflight includes automatic SEO data updates. Freeze that full
// source baseline and project exact reviewed additions, never exclude a page.
export const halloweenBaseline = "677b1b063dc8c4bcd7e45b9928ff7cff7c3e1f9e";
const fragments = JSON.parse(readFileSync(new URL("../fixtures/halloween-source-fragments.json", import.meta.url), "utf8"));
const git = args => execFileSync("git", args, { encoding: "utf8", maxBuffer: 32 * 1024 * 1024 });
export function withoutHalloween(file, source) {
  let value = source.replace(/\r\n/g, "\n");
  const patch = fragments[file];
  if (patch) {
    assert.equal(value.split(patch.after).length - 1, 1, `${file}: unique reviewed Halloween fragment`);
    value = value.replace(patch.after, patch.before);
  }
  return value;
}
export function assertHalloweenCompatible(paths, exclusions = [], readCurrent = file => readFileSync(file, "utf8")) {
  const excluded = exclusions.map(path => path.replace(/^:\(exclude,literal\)/, ""));
  const files = git(["ls-tree", "-r", "--name-only", halloweenBaseline, "--", ...paths]).trim().split("\n").filter(Boolean);
  for (const file of files) {
    if (excluded.includes(file)) continue;
    assert.equal(withoutHalloween(file, readCurrent(file)), git(["show", `${halloweenBaseline}:${file}`]).replace(/\r\n/g, "\n"), `${file}: preflight plus exact reviewed Halloween addition only`);
  }
}
