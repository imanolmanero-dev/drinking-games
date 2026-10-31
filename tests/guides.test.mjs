import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { withoutGuides } from "./helpers/guides-baseline.mjs";

test("Guides patches are exact and reject extra, redirected, reordered and Spanish navigation changes", () => {
  const patches = JSON.parse(readFileSync("tests/fixtures/guides-source.json", "utf8"));
  for (const [file, patch] of Object.entries(patches)) {
    assert.equal(patch.before, execFileSync("git", ["show", `8faf430:${file}`], { encoding: "utf8" }).replace(/\r\n/g, "\n"));
    assert.equal(withoutGuides(file, readFileSync(file, "utf8")), patch.before);
    assert.throws(() => withoutGuides(file, patch.after + "extra"));
  }
  const file = "components/layout/english/EnglishNav.tsx", source = patches[file].after;
  for (const mutation of [source.replace('id: "guides-hub"', 'id: "home"'), source.replace('label: "Guides"', 'label: "Unexpected"'), source.replace('label: "Home"', 'label: "Guides"')]) assert.throws(() => withoutGuides(file, mutation));
  for (const file of execFileSync("git", ["ls-tree", "-r", "--name-only", "8faf430", "--", "components/layout"], { encoding: "utf8" }).trim().split("\n").filter(p => !p.includes("/english/"))) {
    assert.equal(readFileSync(file, "utf8").replace(/\r\n/g, "\n"), execFileSync("git", ["show", `8faf430:${file}`], { encoding: "utf8" }).replace(/\r\n/g, "\n"));
  }
});
