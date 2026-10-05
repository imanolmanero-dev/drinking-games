import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { es03Replacements, mergeEditorialReplacements } from "./es03-baseline.mjs";

// Reviewed, exact source fragments. Every other byte of these files is protected.
export const es02Replacements = JSON.parse(readFileSync(new URL("../fixtures/es02-editorial-fragments.json", import.meta.url), "utf8"));

export function assertEs02Compatible(base, paths, additionalExclusions = []) {
  const replacements = mergeEditorialReplacements(es02Replacements, es03Replacements);
  const files = Object.keys(replacements).filter(file => paths.some(path => file === path || file.startsWith(`${path}/`)));
  assert.equal(execFileSync("git", ["diff", base, "--", ...paths, ...additionalExclusions, ...files.map(file => `:(exclude,literal)${file}`)], { encoding: "utf8" }), "");
  for (const file of files) {
    let expected = execFileSync("git", ["show", `${base}:${file}`], { encoding: "utf8" }).replace(/\r\n/g, "\n");
    for (const [before, after] of replacements[file]) {
      assert.equal(expected.split(before).length - 1, 1, `${file}: unique reviewed original fragment`);
      expected = expected.replace(before, after);
    }
    assert.equal(readFileSync(file, "utf8").replace(/\r\n/g, "\n"), expected, `${file}: no changes beyond reviewed editorial fragments`);
  }
}
