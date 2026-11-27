import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

const changes = JSON.parse(readFileSync(new URL("../fixtures/critical-games-2b-export.json", import.meta.url)));
const editorial = JSON.parse(readFileSync(new URL("../fixtures/questions-editorial-export.json", import.meta.url)));
const batch2c = JSON.parse(readFileSync(new URL("../fixtures/critical-games-2c-export.json", import.meta.url)));
const batch3a = JSON.parse(readFileSync(new URL("../fixtures/editorial-batch-3a-export.json", import.meta.url)));
const batch3b = JSON.parse(readFileSync(new URL("../fixtures/editorial-batch-3b-export.json", import.meta.url)));
const batch3c = JSON.parse(readFileSync(new URL("../fixtures/editorial-batch-3c-export.json", import.meta.url)));
const hash = value => createHash("sha256").update(value).digest("hex");

function fields(path, snapshot) {
  const navigation = path + "#before-navigation";
  const original = Object.hasOwn(snapshot, "header") && changes[navigation] ? changes[navigation] : changes[path] ?? {};
  const forSnapshot = release => (Object.hasOwn(snapshot, "header") && release[navigation]) || release[path];
  const combined = { ...original };
  for (const [field, [before, after]] of Object.entries(editorial[path] ?? {})) {
    if (original[field]) assert.equal(original[field][1], before, path + " pre-editorial " + field);
    combined[field] = [original[field]?.[0] ?? before, after, original[field]?.[2]];
  }
  for (const release of [batch2c, batch3a, batch3b, batch3c]) {
    for (const [field, [before, after, rawBefore]] of Object.entries(forSnapshot(release) ?? {})) {
      const previous = combined[field];
      if (previous) assert.equal(previous[1], before, path + " historical chain " + field);
      combined[field] = [previous?.[0] ?? before, after, previous?.[2] ?? rawBefore];
    }
  }
  return combined;
}

// Older guards compare different historical releases. Check the reviewed field
// in full before using its pre-2B digest in the original historical assertion.
export function beforeBatch2bDigest(path, current, field, rawText = false) {
  const pair = fields(path, current)[field];
  const actual = hash(JSON.stringify(current[field]));
  if (!pair) return rawText ? hash(current[field]) : actual;
  assert.equal(actual, pair[1], path + " reviewed " + field);
  return rawText ? pair[2] : pair[0];
}

export function compareBatch2bExport(path, current, previous) {
  for (const field of Object.keys(fields(path, current))) {
    const prior = beforeBatch2bDigest(path, current, field);
    // A preceding release guard may already have projected this exact field.
    if (JSON.stringify(previous[field]) !== JSON.stringify(current[field])) {
      assert.equal(hash(JSON.stringify(previous[field])), prior, path + " previous " + field);
      previous[field] = current[field];
    }
  }
  assert.deepEqual(current, previous, path);
}
