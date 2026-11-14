import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const patches = JSON.parse(readFileSync(new URL("../fixtures/guides-source.json", import.meta.url), "utf8"));
export function withoutGuides(file, source) {
  let value = source.replace(/\r\n/g, "\n");
  if (file === "components/layout/english/EnglishDesign.module.css") {
    value = value.replace(".root :global(.en-catalog-art > .en-nhie-art) { position: absolute; top: 50%; left: 50%; width: auto; height: auto; max-width: 100%; max-height: 100%; transform: translate(-50%, -50%); }\n", "");
  }
  // Exact count-neutral maintenance copy; downstream full-source guards remain intact.
  if (file === "app/(english)/en/games/truth-or-dare/page.tsx") {
    value = value.replace("See the playable options in the", "See both playable options in the");
  }
  if (!patches[file]) return value;
  assert.equal(value, patches[file].after, file + ": exact Guides phase only");
  return patches[file].before;
}
