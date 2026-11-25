import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

const base = "6dba7638773ab46c4f9d6755ab3e7a8d33e45c36";
const reviewed = "912e3a604b4c9e90b4d9ef468e91fee83dbf1e52";
const git = (...args) => execFileSync("git", args, { encoding: "utf8" });
const changed = new Set(git("diff", "--name-only", base, reviewed, "--", "app", "lib", "components", "content").trim().split("\n"));
const batch3a = JSON.parse(readFileSync(new URL("../fixtures/editorial-batch-3a-source.json", import.meta.url)));
const batch3b = JSON.parse(readFileSync(new URL("../fixtures/editorial-batch-3b-source.json", import.meta.url)));

export function beforeBatch3b(file, source) {
  if (!Object.hasOwn(batch3b, file)) return source;
  const digest = createHash("sha256").update(source.replaceAll("\r\n", "\n")).digest("hex");
  assert.equal(digest, batch3b[file], file + " · reviewed Batch 3B source");
  return git("show", "d3816ed54d2499ebd8002c14033d22d8c7c8489e:" + file);
}

export function beforeBatch3a(file, source) {
  if (!Object.hasOwn(batch3a, file)) return source;
  const digest = createHash("sha256").update(source.replaceAll("\r\n", "\n")).digest("hex");
  assert.equal(digest, batch3a[file], file + " · reviewed Batch 3A source");
  return git("show", "75c305389cc8a560b62e6d0ef5d81af17efacf67:" + file);
}

// Validate the complete candidate file before comparing its predecessor in older guards.
export function beforeBatch2c(file, source) {
  source = beforeBatch3a(file, beforeBatch3b(file, source));
  if (!changed.has(file)) return source;
  assert.equal(source.replaceAll("\r\n", "\n"), git("show", reviewed + ":" + file), file);
  return git("show", base + ":" + file);
}
