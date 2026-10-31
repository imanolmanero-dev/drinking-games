import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import { withoutChoice } from "./helpers/choice-baseline.mjs";
const require = createRequire(import.meta.url); require("tsx/cjs");
const { routeRegistry, publishedRoutes, languageAlternates } = require("../lib/i18n/routes.ts");
test("decision guide is the sole new EN route and an unpaired editorial resource", () => {
  assert.equal(publishedRoutes("en-US").length, 15);
  const entry = routeRegistry.find(r => r.id === "choose-drinking-game");
  assert.equal(entry.kind, "guide"); assert.equal(entry.equivalence, "unpaired");
  assert.equal(entry.published.es, false); assert.equal(languageAlternates(entry.id), undefined);
  const source = readFileSync("app/(english)/en/blog/how-to-choose-a-drinking-game/page.tsx", "utf8");
  assert.doesNotMatch(source, /use client|FAQJsonLd|GameJsonLd|fetch\(|localStorage/);
  assert.equal((source.match(/<h2 /g) || []).length, 6);
  assert.equal((source.match(/<h3 id="scenario-/g) || []).length, 3);
  for (const name of ["EnglishNav", "EnglishFooter"]) assert.doesNotMatch(readFileSync(`components/layout/english/${name}.tsx`, "utf8"), /choose-drinking-game|\/en\/guides/);
});
test("exact phase patches preserve complete sources and reject mutations", () => {
  const patches = JSON.parse(readFileSync("tests/fixtures/choice-source.json", "utf8"));
  for (const [file, patch] of Object.entries(patches)) {
    const baseline = execFileSync("git", ["show", `7f4e810:${file}`], { encoding: "utf8" }).replace(/\r\n/g, "\n");
    assert.equal(patch.before, baseline);
    assert.equal(withoutChoice(file, readFileSync(file, "utf8")), baseline);
    assert.throws(() => withoutChoice(file, patch.after + "extra"));
    assert.throws(() => withoutChoice(file, patch.after.replace(/title|import/, "changed")));
  }
});

test("all existing production sources remain pinned outside exact authorized patches", () => {
  const paths = ["app", "components", "content", "lib", "public", "scripts", "package.json", "package-lock.json", "next.config.ts", "SEO_DATA.md", "seo-data.json", ".github"];
  const files = execFileSync("git", ["ls-tree", "-r", "--name-only", "7f4e810", "--", ...paths], { encoding: "utf8" }).trim().split("\n");
  for (const file of files) {
    const expected = execFileSync("git", ["show", `7f4e810:${file}`], { maxBuffer: 32 * 1024 * 1024 });
    if (/\.(png|jpg|jpeg|webp|ico|woff2?|mp3|mp4|pdf)$/i.test(file)) assert.deepEqual(readFileSync(file), expected, file);
    else assert.equal(withoutChoice(file, readFileSync(file, "utf8")), expected.toString("utf8").replace(/\r\n/g, "\n"), file);
  }
});
