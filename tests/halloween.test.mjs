import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { assertHalloweenCompatible, withoutHalloween } from "./helpers/halloween-baseline.mjs";
const require = createRequire(import.meta.url);
require("tsx/cjs");
const { halloweenEs: es, halloweenEn: en, HALLOWEEN_DATE } = require("../lib/data/halloween.ts");
const { languageAlternates, publishedRoutes } = require("../lib/i18n/routes.ts");
const { default: sitemap } = require("../app/sitemap.ts");

test("Halloween publishes exactly the reviewed pair and preserves real playable inventory", () => {
  assert.deepEqual(languageAlternates("halloween"), { es: `https://bebergames.com${es.path}`, "en-US": `https://bebergames.com${en.path}` });
  assert.deepEqual(en.sections.filter(s => s.href).map(s => s.href), ["/en/games/truth-or-dare", "/en/games/kings-cup"]);
  assert.equal(publishedRoutes("en-US", "game").length, 2);
  for (const content of [es, en]) {
    assert.equal(content.sections.length, 8);
    assert.equal(content.faqs.length, 4);
    assert.equal(new Set(content.sections.map(s => s.id)).size, 8);
    const copy = [content.intro, ...content.sections.flatMap(s => s.paragraphs)].join(" ");
    assert.ok(copy.split(/\s+/).length >= 800);
    assert.doesNotMatch(copy, /lorem ipsum|\bTODO\b|games for drinking|mandatory shots|fondo blanco|sin excusas/);
    const entry = sitemap().filter(item => item.url === `https://bebergames.com${content.path}`);
    assert.equal(entry.length, 1);
    assert.equal(entry[0].lastModified, HALLOWEEN_DATE);
  }
  assert.equal(new Date("2026-10-31T12:00:00Z").getUTCDay(), 6);
});

test("party adaptations disclose general online prompts and penalty-free passing", () => {
  assert.match(es.sections[0].paragraphs.join(" "), /no permite cargar estas casillas ni incluye un modo Halloween/);
  assert.match(en.sections[2].paragraphs.join(" "), /not a Halloween pack/);
  assert.match(es.sections[2].paragraphs.join(" "), /pasar sin penalización y sin beber/);
  assert.match(en.sections[2].paragraphs.join(" "), /refusing never triggers a drink/);
  assert.match(en.sections[3].paragraphs.join(" "), /votes never add up to extra drinks/);
});

test("preflight protection compares whole existing sources, including home and advertisements", () => {
  assertHalloweenCompatible(["app", "components", "lib", "content", "public", "scripts", "package.json", "package-lock.json", "next.config.ts", "SEO_DATA.md", "seo-data.json", "tests/fixtures/es-routes.json", "tests/fixtures/es-redirects.json"]);
});

test("exact addition projection rejects unexpected copy inside and outside the seasonal block", () => {
  const file = "app/(spanish)/page.tsx";
  const source = readFileSync(file, "utf8");
  assert.throws(() => withoutHalloween(file, source.replace("Especial Halloween:", "Unexpected:")), { code: "ERR_ASSERTION" });
  assert.throws(() => assertHalloweenCompatible([file], [], () => source.replace("La App de Juegos", "Unexpected copy")), { code: "ERR_ASSERTION" });
});
