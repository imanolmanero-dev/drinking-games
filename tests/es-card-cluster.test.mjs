import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import { es03Replacements, projectEs03 } from "./helpers/es03-baseline.mjs";
import { assertNoCoerciveGuideCopy, assertReyGuideContract } from "./helpers/es03-guide-contract.mjs";
const require = createRequire(import.meta.url);
require("tsx/cjs");
const { blogFAQs } = require("../lib/data/blog-faqs.ts");
const matter = require("gray-matter");
const base = "86b8bfed6388eb4e56a413bd0738848b97e27135";
const read = file => readFileSync(file, "utf8").replace(/\r\n/g, "\n");
const old = file => execFileSync("git", ["show", `${base}:${file}`], { encoding: "utf8" });

test("ES-03 only changes reviewed card-cluster fragments; all metadata and protected sources stay intact", () => {
  for (const file of Object.keys(es03Replacements)) {
    assert.equal(read(file), projectEs03(file, old(file)), file);
    if (file.endsWith(".mdx")) {
      assert.deepEqual(matter(read(file)).data, matter(old(file)).data);
      assert.doesNotMatch(matter(read(file)).content, /^# /m);
    }
  }
  const paths = ["app", "components", "lib", "content", "public", "scripts", "package.json", "package-lock.json", "next.config.ts", "tests/fixtures/es-routes.json", "tests/fixtures/en-routes.json"];
  assert.equal(execFileSync("git", ["diff", base, "--", ...paths, ...Object.keys(es03Replacements).map(f => `:(exclude,literal)${f}`)], { encoding: "utf8" }), "");
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
