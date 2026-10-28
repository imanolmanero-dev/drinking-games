import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import test from "node:test";
import { assertHalloweenCompatible, reportBaseline, withoutHalloween } from "./helpers/halloween-baseline.mjs";
const git = args => execFileSync("git", args, {encoding:"utf8", maxBuffer:32*1024*1024});
test("report baseline authorizes only the reviewed automatic artifact pair", () => {
 assert.deepEqual(git(["diff-tree", "--no-commit-id", "--name-only", "-r", reportBaseline]).trim().split("\n").sort(), ["SEO_DATA.md", "seo-data.json"]);
 assertHalloweenCompatible(["SEO_DATA.md", "seo-data.json"]);
 for (const file of ["SEO_DATA.md", "seo-data.json"]) {
  const source = readFileSync(file,"utf8");
  assert.throws(() => assertHalloweenCompatible([file], [], () => source + "unexpected"), {code:"ERR_ASSERTION"});
  assert.throws(() => assertHalloweenCompatible([file], [], () => git(["show", "677b1b063dc8c4bcd7e45b9928ff7cff7c3e1f9e:" + file])), {code:"ERR_ASSERTION"});
 }
});
test("shared setup hashes still reject any additional production change", () => {
 for (const file of Object.keys(JSON.parse(readFileSync("tests/fixtures/en-setup-source.json","utf8")))) {
  assert.throws(() => withoutHalloween(file, readFileSync(file,"utf8") + "unexpected"), {code:"ERR_ASSERTION"});
 }
});
