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
const { routeRegistry, publishedRoutes, getPublishedRoute, languageAlternates, languageSwitch } = require("../lib/i18n/routes.ts");
const { localeFromPathname, absoluteUrl } = require("../lib/i18n/locales.ts");
const { englishMetadata, englishPageMetadata } = require("../lib/i18n/metadata.ts");
const LanguageSwitcher = require("../components/layout/english/LanguageSwitcher.tsx").default;
const EnglishLink = require("../components/layout/english/EnglishLink.tsx").default;
const { WebSiteJsonLd, GameJsonLd, ArticleJsonLd } = require("../components/seo/JsonLd.tsx");
const read = (file) => readFileSync(file, "utf8");
const fixture = JSON.parse(read("tests/fixtures/en-routes.json"));
const sorted = (items) => [...items].sort();
const render = (component, props) => parse(renderToStaticMarkup(createElement(component, props)));

test("English registry publication matches the independent nine-route fixture", () => {
  assert.equal(fixture.length, 9);
  assert.equal(new Set(fixture.map((route) => route.pathname)).size, 9);
  assert.deepEqual(fixture.map((route) => route.pathname), sorted(fixture.map((route) => route.pathname)));
  assert.deepEqual(sorted(publishedRoutes("en-US").map((route) => route.pathname)), fixture.map((route) => route.pathname));
  assert.equal(new Set(routeRegistry.map((route) => route.id)).size, routeRegistry.length);
  assert.deepEqual(publishedRoutes("en-US", "game"), [{ id: "kings-cup", pathname: "/en/games/kings-cup", label: "King's Cup" }]);
  for (const entry of routeRegistry) {
    for (const locale of ["es", "en-US"]) {
      if (entry.published[locale]) assert.ok(entry.routes[locale], entry.id);
    }
  }
});

test("unpublished English concepts cannot supply links, metadata, alternates or switches", () => {
  for (const id of ["truth-or-dare", "drinking-games-without-cards"]) {
    assert.equal(routeRegistry.find((route) => route.id === id).published["en-US"], false);
    assert.equal(getPublishedRoute(id, "en-US"), undefined);
    assert.equal(languageAlternates(id), undefined);
    assert.equal(languageSwitch(id, "en-US"), undefined);
    assert.throws(() => englishMetadata(id, "Test", "Test"), /unpublished/);
    assert.equal(renderToStaticMarkup(createElement(EnglishLink, { routeId: id, id: "test-link" })), "");
  }
});

test("locale detection respects path boundaries and never redirects", () => {
  for (const path of ["/en", "/en/about", "/en/missing"]) assert.equal(localeFromPathname(path), "en-US");
  for (const path of ["/", "/juegos", "/english", "/enough"]) assert.equal(localeFromPathname(path), "es");
  assert.equal(absoluteUrl("/"), "https://bebergames.com");
  assert.doesNotMatch(read("lib/i18n/routes.ts"), /\.replace\s*\(/);
  assert.doesNotMatch(read("components/layout/english/LanguageSwitcher.tsx"), /replace|redirect|localStorage|navigator|location\./);
});

test("real equivalences and both switch directions match reviewed independent routes", () => {
  for (const expected of fixture.filter((route) => route.equivalentEs !== null)) {
    const entry = publishedRoutes("en-US").find((route) => route.pathname === expected.pathname);
    const alternates = { es: absoluteUrl(expected.equivalentEs), "en-US": absoluteUrl(expected.pathname) };
    assert.deepEqual(languageAlternates(entry.id), alternates);
    for (const [locale, target, href] of [["en-US", "es", expected.equivalentEs], ["es", "en-US", expected.pathname]]) {
      const link = render(LanguageSwitcher, { routeId: entry.id, locale }).querySelector("a");
      assert.equal(link.getAttribute("href"), href);
      assert.equal(link.getAttribute("hrefLang"), target);
      assert.equal(link.textContent, target === "es" ? "ES" : "EN");
    }
  }
});

test("terms and legal notice are related, with explicit home fallback instead of fake translation", () => {
  for (const [id, locale, href, label] of [["terms", "en-US", "/", "Spanish home"], ["legal-notice", "es", "/en", "English home"]]) {
    assert.equal(languageAlternates(id), undefined);
    assert.equal(routeRegistry.find((entry) => entry.id === id).equivalence, "unpaired");
    const link = render(LanguageSwitcher, { routeId: id, locale }).querySelector("a");
    assert.equal(link.getAttribute("href"), href);
    assert.equal(link.textContent, label);
  }
  assert.equal(englishMetadata("terms", "Terms", "Description").alternates.languages, undefined);
});

test("English metadata preserves the resolved image suffix and query and rejects Spanish fallback", async () => {
  const descriptor = { url: "http://localhost:3000/en/opengraph-image-test?editorial-hash", width: 1200, height: 630, alt: "English image", type: "image/png" };
  const generate = englishPageMetadata("about", "About", "Description");
  const metadata = await generate({}, Promise.resolve({ openGraph: { images: [descriptor] } }));
  assert.deepEqual(metadata.openGraph.images, [{ ...descriptor, url: "https://bebergames.com/en/opengraph-image-test?editorial-hash" }]);
  assert.equal(Object.hasOwn(metadata.twitter, "images"), false);
  await assert.rejects(generate({}, Promise.resolve({})), /missing/);
  await assert.rejects(generate({}, Promise.resolve({ openGraph: { images: [{ url: "https://bebergames.com/opengraph-image" }] } })), /missing/);
});

test("localized JSON-LD keeps Spanish defaults and existing Article output", () => {
  const schema = (component, props) => JSON.parse(render(component, props).querySelector("script").textContent);
  assert.deepEqual(schema(WebSiteJsonLd), {
    "@context": "https://schema.org", "@type": "WebSite", name: "BeberGames", alternateName: ["Beber Games", "Beber games"],
    url: "https://bebergames.com", description: "La mejor colección de juegos para beber en grupo. Yo Nunca, Verdad o Reto, Triman, La Ruleta y más.", inLanguage: "es",
  });
  const english = schema(WebSiteJsonLd, { locale: "en-US" });
  assert.equal(english.inLanguage, "en-US");
  assert.equal(english.url, "https://bebergames.com/en");
  assert.equal(schema(GameJsonLd, { name: "Test", description: "Test", url: "https://bebergames.com" }).inLanguage, "es");
  assert.equal(schema(ArticleJsonLd, { title: "Test", description: "Test", url: "https://bebergames.com", author: "BeberGames", datePublished: "2026-09-13" }).inLanguage, "es");
});

test("DELIBERATE SEO ADDITION is the only change to the six Spanish page sources; fixtures are byte-identical", () => {
  const baseline = "c9c1117c1fe600f756df156523f8d350dc2b2ec7";
  for (const file of ["tests/fixtures/es-routes.json", "tests/fixtures/es-redirects.json"]) {
    const original = execFileSync("git", ["show", `${baseline}:${file}`]);
    const current = execFileSync("git", ["hash-object", "--", file], { encoding: "utf8" }).trim();
    const previous = execFileSync("git", ["hash-object", "--stdin"], { input: original, encoding: "utf8" }).trim();
    assert.equal(current, previous, file);
    // Repository blobs are LF; working-tree CRLF is Git's checkout convention.
    assert.equal(read(file).replace(/\r\n/g, "\n"), original.toString("utf8"));
  }
  for (const route of ["", "juegos/", "sobre-nosotros/", "contacto/", "legal/privacidad/", "legal/cookies/"]) {
    const file = `app/(spanish)/${route}page.tsx`;
    const original = execFileSync("git", ["show", `${baseline}:${file}`], { encoding: "utf8" });
    const withoutAddition = read(file).replace(/\r\n/g, "\n")
      .replace('import { languageAlternates } from "@/lib/i18n/routes";\n', "")
      .replace(/    \/\/ DELIBERATE SEO ADDITION: reciprocal published language equivalents\.\n    languages: languageAlternates\("[a-z-]+"\),\n/, "");
    assert.equal(withoutAddition, original, file);
  }
});
