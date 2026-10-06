import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import { es03Replacements, projectEs03 } from "./helpers/es03-baseline.mjs";
import { assertNoCoerciveGuideCopy, assertReyGuideContract } from "./helpers/es03-guide-contract.mjs";

// Exact reviewed coverage patch against 0fc57e3 (also identical against this
// test's historical base). Keep reporting files IN the source comparison.
// Pin the complete residual diff, including paths, blob IDs and every hunk;
// any extra source edit requires a separate review of this authorization.
const reviewedReportingDiffSha256 = "8771d69859ac8c9fa2c0aec5144177313838a0cd05ab1d0b234e981f51b82034";
function assertReviewedReportingDiff(diff) {
  assert.equal(createHash("sha256").update(diff).digest("hex"), reviewedReportingDiffSha256,
    "only the exact reviewed SEO coverage patch may differ outside approved editorial fragments");
}
function reviewedSourceDiff(base, paths, exclusions = []) {
  return execFileSync("git", ["-c", "core.abbrev=40", "diff", "--no-ext-diff", "--no-textconv",
    "--no-color", "--no-renames", "--diff-algorithm=myers", "--indent-heuristic",
    "--src-prefix=a/", "--dst-prefix=b/", "--unified=3",
    base, "--", ...paths, ...exclusions], { encoding: "utf8" });
}

const require = createRequire(import.meta.url);
require("tsx/cjs");
const { blogFAQs } = require("../lib/data/blog-faqs.ts");
const matter = require("gray-matter");
const base = "86b8bfed6388eb4e56a413bd0738848b97e27135";
const read = file => readFileSync(file, "utf8").replace(/\r\n/g, "\n");
const old = file => execFileSync("git", ["show", `${base}:${file}`], { encoding: "utf8" });

function assertCardSource(file, source) {
  assert.equal(source, projectEs03(file, old(file)), file);
}

test("ES-03 only changes reviewed card-cluster fragments; all metadata and protected sources stay intact", () => {
  for (const file of Object.keys(es03Replacements)) {
    assertCardSource(file, read(file));
    if (file.endsWith(".mdx")) {
      assert.deepEqual(matter(read(file)).data, matter(old(file)).data);
      assert.doesNotMatch(matter(read(file)).content, /^# /m);
    }
  }
  const paths = ["app", "components", "lib", "content", "public", "scripts", "package.json", "package-lock.json", "next.config.ts", "tests/fixtures/es-routes.json", "tests/fixtures/en-routes.json"];
  assertReviewedReportingDiff(reviewedSourceDiff(base, paths, Object.keys(es03Replacements).map(f => `:(exclude,literal)${f}`)));
});

test("Cuarto Rey explains the central King mechanic once, before the first section, without universal equivalence", () => {
  const body = matter(read("content/blog/rey-de-la-copa-reglas.mdx")).content;
  const intro = body.split(/^## /m)[0];
  assert.equal((body.match(/\bCuarto Rey\b/g) ?? []).length, 1);
  assert.match(intro, /(?:conoces|nombre|llam)[^.!?]*Cuarto Rey/);
  assert.match(intro, /copa central.*tres primeros Reyes.*cuarto.*final/s);
  assert.match(intro, /reglas.*pueden cambiar entre grupos/s);
  assert.match(intro, /pequeña y opcional.*sin alcohol.*puede pasar/s);
});

test("card guide preserves twelve game sections and links Pirámide in its own section", () => {
  const body = matter(read("content/blog/juegos-para-beber-con-cartas.mdx")).content;
  assert.equal((body.match(/^## \d+\./gm) ?? []).length, 12);
  const pyramid = body.split("## 2. Pirámide")[1].split("## 3.")[0];
  assert.equal((pyramid.match(/\]\(\/juegos\/la-piramide\)/g) ?? []).length, 1);
  assert.match(pyramid, /seis filas.*cinco/);
});

function guideContract() {
  const body = matter(read("content/blog/rey-de-la-copa-reglas.mdx")).content;
  const section = heading => body.split(heading)[1].split(/^### |^## |^---$/m)[0];
  return {
    intro: body.split(/^## /m)[0],
    ace: section("### As — ¡Cascada! 🌊"),
    kings: section("### Rey (K) — La Copa del Rey 👑"),
    faqs: blogFAQs["rey-de-la-copa-reglas"].map(({ a }) => a),
    fullText: body,
  };
}

test("Rey intro, Waterfall, central cup, all rules and FAQs express one optional contract", () => {
  assertReyGuideContract(guideContract());
});

for (const [name, part, copy] of [
  ["continuous Waterfall", "ace", "Nadie puede parar de beber"],
  ["mandatory contribution", "kings", "Debes echar bebida al vaso central"],
  ["whole cup", "kings", "El cuarto Rey debe beberse el vaso entero"],
  ["chugging mixture", "faqs", "Toda la mezcla de golpe"],
  ["mandatory finish", "kings", "Tienes que terminar la copa"],
  ["continuous alternative", "ace", "Tienes que seguir bebiendo hasta que pare tu vecino"],
  ["protective preface cannot mask obligation", "kings", "Puedes pasar, pero debes beberte el vaso entero"],
  ["negation cannot mask another obligation", "faqs", "No tienes que terminar la copa y debes echar bebida al vaso central"],
  ["obligation outside King section", "fullText", "El compañero tiene que beber un trago"],
]) {
  test(`Rey contract rejects ${name}`, () => {
    const mutated = guideContract();
    if (part === "faqs") mutated.faqs = [...mutated.faqs, copy];
    else mutated[part] += `. ${copy}.`;
    assert.throws(() => assertReyGuideContract(mutated), /contradictory drinking instruction/);
  });
}

for (const copy of [
  "Puedes pasar. Sorbo pequeño y opcional. No tienes que terminar la copa.",
  "No debes beberte el vaso entero. No tienes que beber toda la mezcla de golpe.",
  "Sin exigir que nadie termine la mezcla. Cualquiera puede parar en cualquier momento.",
]) {
  test(`Rey contract accepts protective wording: ${copy}`, () => assertNoCoerciveGuideCopy(copy));
}

test("historical guard rejects an extra reporting edit beyond the reviewed coverage patch", () => {
  const diff = reviewedSourceDiff("0fc57e3a02ea5343313596fdc2412f5c283d484e",
    ["scripts/seo-reporting.mjs", "scripts/fetch-seo-data.ts"]);
  assertReviewedReportingDiff(diff);
  const source = readFileSync("scripts/fetch-seo-data.ts", "utf8").replace(/\r\n/g, "\n");
  const mutatedSource = source.replace("  safeApiFailure,", "  safeApiFailure, // unreviewed extra edit");
  assert.notEqual(mutatedSource, source);
  // Reconstruct this extra source edit's diff and blob ID entirely in memory.
  const blob = value => execFileSync("git", ["hash-object", "--stdin"], { input: value, encoding: "utf8" }).trim();
  const mutated = diff.replace("+  safeApiFailure,", "+  safeApiFailure, // unreviewed extra edit")
    .replace(blob(source), blob(mutatedSource));
  assert.notEqual(mutated, diff);
  assert.throws(() => assertReviewedReportingDiff(mutated), { code: "ERR_ASSERTION" });
});

test("historical ES-03 guard rejects an unexpected central-cup alias change", () => {
  const file = "content/blog/rey-de-la-copa-reglas.mdx";
  const source = read(file);
  const mutated = source.replace("Cuarto Rey", "Quinto Rey");
  assert.notEqual(mutated, source);
  assertCardSource(file, source);
  assert.throws(() => assertCardSource(file, mutated), { code: "ERR_ASSERTION" });
});
