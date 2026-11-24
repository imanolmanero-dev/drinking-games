import { beforeBatch2bDigest } from "./critical-games-2b-export.mjs";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

const changes = JSON.parse(readFileSync(new URL("../fixtures/roulette-editorial.json", import.meta.url), "utf8"));
const wheel = "/juegos/la-ruleta";

export function projectRouletteExport(path, previous, current) {
  const change = changes[path];
  if (!change) return;

  // Both complete normalized texts are pinned. Keep destinations, metadata,
  // headings and structured data under their original independent comparisons.
  for (const [index, snapshot] of [previous, current].entries()) {
    const actual = index === 1 ? beforeBatch2bDigest(path, current, "text", true) : createHash("sha256").update(snapshot.text).digest("hex");
    assert.equal(actual, change.hashes[index], path);
  }
  previous.text = current.text;
  for (const [href, before, after] of change.cards ?? []) {
    for (const link of previous.links) {
      if (link[0] === href) link[1] = link[1].replace(before, after);
    }
    for (const schema of previous.schema) {
      if (schema.url === "https://bebergames.com" + href && schema.description === before) schema.description = after;
    }
  }
  for (const [before, after] of change.headings ?? []) {
    previous.headings = previous.headings.map(h => h === before ? after : h);
  }
  for (const [before, after] of change.metadata ?? []) {
    previous.metadata = previous.metadata.map(tag => tag.replace(before, after));
  }
  if (path === wheel || path === wheel + "/reglas") {
    const [, before, after] = changes["/"].cards.find(([href]) => href === wheel);
    for (const schema of previous.schema) {
      if (schema.url === "https://bebergames.com" + wheel && schema.description === before) schema.description = after;
    }
  }
}
