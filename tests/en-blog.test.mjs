import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";

const require = createRequire(import.meta.url);
require("tsx/cjs");
const { createElement } = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const { parse } = require("next/dist/compiled/node-html-parser");
const { routeRegistry, publishedRoutes, languageAlternates, languageSwitch } = require("../lib/i18n/routes.ts");
const { englishArticleMetadata } = require("../lib/i18n/metadata.ts");
const { drinkingGamesForTwoEditorial: editorial } = require("../lib/data/drinking-games-for-2-editorial.ts");
const Article = require("../components/seo/EnglishArticleJsonLd.tsx").default;
const read = (path) => readFileSync(path, "utf8");
const canonical = "https://bebergames.com/en/blog/drinking-games-for-2";

test("two-person guide publishes the existing concept as an unpaired guide only", () => {
  const entry = routeRegistry.find(({ id }) => id === "drinking-games-for-two");
  assert.equal(entry.kind, "guide");
  assert.equal(entry.equivalence, "unpaired");
  assert.equal(entry.published["en-US"], true);
  assert.equal(entry.routes["en-US"].pathname, "/en/blog/drinking-games-for-2");
  assert.deepEqual(publishedRoutes("en-US", "guide").map(({ id }) => id), [entry.id]);
  assert.equal(publishedRoutes("en-US", "game").some(({ id }) => id === entry.id), false);
  assert.equal(languageAlternates(entry.id), undefined);
  assert.deepEqual(languageSwitch(entry.id, "en-US"), { pathname: "/", label: "Spanish home", locale: "es", fallback: true });
  const fixture = JSON.parse(read("tests/fixtures/en-routes.json"));
  const previous = JSON.parse(execFileSync("git", ["show", "e707c88:tests/fixtures/en-routes.json"], { encoding: "utf8" }));
  assert.deepEqual(fixture.filter((route) => route.pathname !== entry.routes["en-US"].pathname), previous);
});

test("article metadata composes all existing EN image descriptors and Twitter fields", async () => {
  const descriptor = { url: "http://localhost:3000/en/opengraph-image-test?query", width: 1200, height: 630, alt: "English brand", type: "image/png" };
  const generate = englishArticleMetadata("drinking-games-for-two", editorial.title, editorial.description, editorial.datePublished);
  const result = await generate({}, Promise.resolve({ openGraph: { images: [descriptor] } }));
  assert.equal(result.title, editorial.title);
  assert.equal(result.description, editorial.description);
  assert.deepEqual(result.alternates, { canonical });
  assert.deepEqual(result.robots, { index: true, follow: true });
  assert.equal(result.openGraph.type, "article");
  assert.equal(result.openGraph.locale, "en_US");
  assert.equal(result.openGraph.url, canonical);
  assert.equal(result.openGraph.title, editorial.title);
  assert.equal(result.openGraph.description, editorial.description);
  assert.deepEqual(result.openGraph.images, [{ ...descriptor, url: "https://bebergames.com/en/opengraph-image-test?query" }]);
  assert.deepEqual(result.twitter, { card: "summary_large_image", title: editorial.title, description: editorial.description });
  assert.equal(result.openGraph.publishedTime, editorial.datePublished);
  await assert.rejects(generate({}, Promise.resolve({})), /missing/);
});

test("editorial publication date is central and schema does not invent modification dates", async () => {
  assert.equal(editorial.datePublished, "2026-09-23");
  const schema = (datePublished) => JSON.parse(parse(renderToStaticMarkup(createElement(Article, { ...editorial, url: canonical, datePublished }))).querySelector("script").textContent);
  const published = schema(editorial.datePublished);
  assert.equal(published["@type"], "BlogPosting");
  assert.equal(published.datePublished, editorial.datePublished);
  assert.equal(published.dateModified, undefined);
  assert.equal(published.headline, editorial.headline);
  assert.equal(published.mainEntityOfPage, canonical);
  assert.deepEqual(published.author, { "@type": "Organization", name: "BeberGames", url: "https://bebergames.com/en/about" });
  assert.equal(published.inLanguage, "en-US");
  assert.equal(published.isAccessibleForFree, true);
  const generate = englishArticleMetadata("drinking-games-for-two", editorial.title, editorial.description, editorial.datePublished);
  const metadata = await generate({}, Promise.resolve({ openGraph: { images: [{ url: "https://bebergames.com/en/opengraph-image-test" }] } }));
  assert.equal(metadata.openGraph.publishedTime, editorial.datePublished);
});

test("article sources contain no client behavior, remote media or Spanish editorial dependencies", () => {
  for (const file of ["app/(english)/en/blog/drinking-games-for-2/page.tsx", "components/seo/EnglishArticleJsonLd.tsx", "lib/data/drinking-games-for-2-editorial.ts"]) {
    assert.doesNotMatch(read(file), /use client|useState|useEffect|fetch\s*\(|next\/dynamic|<iframe|<video|<img|lib\/blog|AuthorBio|AppContext|AudioContext|vibrate|localStorage|sessionStorage|new Date\s*\(/, file);
  }
});

test("Phase 5 leaves Spanish files, fixtures, navigation, sitemap and dependencies unchanged", () => {
  const base = "e707c88f313a97f2a9861940a1362cfb87033425";
  const paths = ["app/(spanish)", "content/blog", "lib/blog.ts", "app/globals.css", "tests/fixtures/es-routes.json", "tests/fixtures/es-redirects.json", "components/layout/english/EnglishNav.tsx", "components/layout/english/EnglishFooter.tsx", "app/sitemap.ts", "package.json", "package-lock.json"];
  assert.equal(execFileSync("git", ["diff", base, "--", ...paths], { encoding: "utf8" }), "");
  const originalRegistry = execFileSync("git", ["show", `${base}:lib/i18n/routes.ts`], { encoding: "utf8" });
  const oldModule = require("typescript").transpileModule(originalRegistry.replace('import { absoluteUrl, type Locale } from "./locales";', 'const absoluteUrl = (path: string) => path; type Locale = "es" | "en-US";'), { compilerOptions: { module: 1 } }).outputText;
  const loaded = { exports: {} };
  new Function("module", "exports", oldModule)(loaded, loaded.exports);
  const es = (entries) => entries.map(({ id, routes, published, equivalence }) => ({ id, route: routes.es, published: published.es, equivalence }));
  assert.deepEqual(es(routeRegistry), es(loaded.exports.routeRegistry));
});
