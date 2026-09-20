import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";
import test from "node:test";
import { auditStaticExport, readEnglishRouteContract, readRouteContract, SITE_ORIGIN, validateStaticExportAudit } from "../../scripts/audit-static-export.mjs";

const require = createRequire(import.meta.url);
const { parse } = require("next/dist/compiled/node-html-parser");
const audit = auditStaticExport();
const fixture = readEnglishRouteContract();
const allPaths = new Set([...readRouteContract(), ...fixture].map((route) => route.pathname));
const absolute = (path) => path === "/" ? SITE_ORIGIN : `${SITE_ORIGIN}${path}`;
const documentFor = (path) => parse(readFileSync(join("out", path === "/" ? "index.html" : `${path.slice(1)}.html`), "utf8"));
const english = fixture.map((route) => ({ ...route, document: documentFor(route.pathname), page: audit.pages.find((page) => page.pathname === route.pathname) }));

test("nine English documents are indexable, self-canonical, en-US, and have unique titles/descriptions and one H1", () => {
  assert.equal(english.length, 9);
  assert.equal(audit.pages.filter((page) => /^\/en(?:\/|$)/.test(page.pathname)).length, 9);
  const descriptions = [];
  for (const { pathname, title, h1, document, page } of english) {
    assert.ok(page, pathname);
    assert.equal(document.querySelectorAll("html").length, 1);
    assert.equal(document.querySelectorAll("body").length, 1);
    assert.equal(page.lang, "en-US", pathname);
    assert.equal(page.titleCount, 1);
    assert.equal(page.title, title);
    assert.equal(page.h1Count, 1);
    assert.deepEqual(page.h1, [h1]);
    assert.equal(page.canonicalCount, 1);
    assert.deepEqual(page.canonicals, [absolute(pathname)]);
    assert.equal(page.indexability, "indexable");
    for (const meta of document.querySelectorAll('meta[name="robots"], meta[name="googlebot"]')) assert.doesNotMatch(meta.getAttribute("content"), /noindex/i);
    const description = document.querySelectorAll('meta[name="description"]');
    assert.equal(description.length, 1);
    assert.ok(description[0].getAttribute("content").length > 40);
    descriptions.push(description[0].getAttribute("content"));
    assert.ok(document.querySelectorAll('link[rel="stylesheet"]').length > 0);
  }
  assert.equal(new Set(descriptions).size, 9);
  assert.equal(new Set(english.map((route) => route.page.title)).size, 9);
});

test("English output has no ads, PWA, analytics, forms or consent instrumentation", () => {
  for (const { pathname, document } of english) {
    assert.equal(document.querySelectorAll('link[rel="manifest"], ins.adsbygoogle, [data-ad-slot], meta[name="google-adsense-account"], form, input').length, 0, pathname);
    const scripts = document.querySelectorAll("script");
    assert.doesNotMatch(scripts.map((script) => script.outerHTML).join("\n"), /adsbygoogle|googlesyndication|doubleclick|InstallPWA|beforeinstallprompt|bg_pwa_dismissed|web3forms|google-analytics|googletagmanager|vercel\/insights|CookieBanner|VerdadRetoExperimentAd/);
    for (const script of document.querySelectorAll("script[src]")) {
      const url = new URL(script.getAttribute("src"), SITE_ORIGIN);
      assert.equal(url.origin, SITE_ORIGIN);
      const source = readFileSync(join("out", url.pathname), "utf8");
      assert.doesNotMatch(source, /adsbygoogle|googlesyndication|beforeinstallprompt|bg_pwa_dismissed|vercel\/insights|web3forms|cookie_consent/);
    }
  }
});

test("hreflang is reciprocal, absolute, self-referencing and limited to six real pairs", () => {
  const pairs = fixture.filter((route) => route.equivalentEs !== null);
  assert.equal(pairs.length, 6);
  for (const page of audit.pages) {
    const pair = pairs.find((route) => route.pathname === page.pathname || route.equivalentEs === page.pathname);
    const expected = pair ? { es: absolute(pair.equivalentEs), "en-US": absolute(pair.pathname) } : {};
    const links = documentFor(page.pathname).querySelectorAll('link[rel="alternate"][hreflang]');
    assert.equal(links.length, pair ? 2 : 0, page.pathname);
    assert.deepEqual(Object.fromEntries(links.map((link) => [link.getAttribute("hreflang"), link.getAttribute("href")])), expected, page.pathname);
    assert.equal(links.some((link) => link.getAttribute("hreflang") === "x-default"), false);
  }
});

test("all English internal links and fragments resolve, with unique interactive IDs and honest switches", () => {
  for (const { pathname, equivalentEs, document } of english) {
    const ids = document.querySelectorAll("[id]").map((element) => element.getAttribute("id"));
    assert.equal(new Set(ids).size, ids.length, pathname);
    const switchLink = document.querySelector("#language-switch");
    assert.equal(switchLink.getAttribute("href"), equivalentEs ?? "/");
    assert.equal(switchLink.textContent, equivalentEs === null ? "Spanish home" : "ES");
    for (const link of document.querySelectorAll("a")) {
      assert.ok(link.getAttribute("id"), `${pathname}: missing link ID`);
      const href = link.getAttribute("href");
      if (href.startsWith("mailto:")) { assert.equal(href, "mailto:info@bebergames.com"); continue; }
      const url = new URL(href, absolute(pathname));
      assert.equal(url.origin, SITE_ORIGIN, href);
      assert.ok(allPaths.has(url.pathname), `${pathname} -> ${href}`);
      assert.doesNotMatch(url.pathname, /^\/es(?:\/|$)|\(spanish\)|\(english\)|truth-or-dare/);
      if (url.pathname.startsWith("/en/blog")) assert.equal(url.pathname, "/en/blog/drinking-games-for-2");
      if (url.hash) assert.ok(documentFor(url.pathname).getElementById(decodeURIComponent(url.hash.slice(1))), `${pathname} -> ${href}`);
      if (!/^\/en(?:\/|$)/.test(url.pathname)) assert.equal(link.getAttribute("id"), "language-switch");
    }
    assert.deepEqual(document.querySelectorAll('nav[aria-label="Main navigation"] a').map((link) => link.textContent), ["Home", "Games", "About", "Contact"]);
    assert.deepEqual(document.querySelectorAll('nav[aria-label="Footer navigation"] a').map((link) => link.textContent), ["About", "Contact", "Privacy", "Cookies", "Terms"]);
  }
});

test("English social metadata uses en_US and a real English static image, never the Spanish OG", () => {
  const imageUrl = new URL(english[0].document.querySelector('meta[property="og:image"]').getAttribute("content"));
  const image = readFileSync(join("out", imageUrl.pathname));
  assert.deepEqual([...image.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10]);
  assert.equal(image.readUInt32BE(16), 1200);
  assert.equal(image.readUInt32BE(20), 630);
  assert.ok(existsSync("out/opengraph-image"));
  for (const { pathname, document } of english) {
    assert.equal(document.querySelector('meta[property="og:locale"]').getAttribute("content"), "en_US");
    assert.equal(document.querySelector('meta[property="og:url"]').getAttribute("content"), absolute(pathname));
    assert.equal(document.querySelector('meta[name="twitter:card"]').getAttribute("content"), "summary_large_image");
    for (const selector of ['meta[property="og:image"]', 'meta[name="twitter:image"]']) {
      const images = document.querySelectorAll(selector);
      assert.equal(images.length, 1);
      const url = new URL(images[0].getAttribute("content"));
      assert.equal(url.origin, SITE_ORIGIN);
      assert.match(url.pathname, /^\/en\/opengraph-image(?:-[a-z0-9]+)?$/);
      assert.ok(existsSync(join("out", url.pathname)));
    }
    for (const element of document.querySelectorAll("meta, link")) {
      assert.doesNotMatch(element.getAttribute("content") ?? element.getAttribute("href") ?? "", /https?:\/\/(?:localhost|127\.0\.0\.1)|\(english\)|\(spanish\)/, pathname);
    }
    for (const script of document.querySelectorAll('script[type="application/ld+json"]')) {
      const schema = JSON.parse(script.textContent);
      const expectedTypes = pathname === "/en/games/kings-cup" ? ["WebApplication", "FAQPage"]
        : pathname === "/en/blog/drinking-games-for-2" ? ["BlogPosting", "BreadcrumbList"] : ["WebSite"];
      assert.ok(expectedTypes.includes(schema["@type"]));
      if (!["FAQPage", "BreadcrumbList"].includes(schema["@type"])) assert.equal(schema.inLanguage, "en-US");
    }
  }
});

test("English sitemap entries have no artificial lastModified and no unexpected assets or pages", () => {
  const sitemap = parse(readFileSync("out/sitemap.xml", "utf8"));
  const entries = sitemap.querySelectorAll("url").filter((entry) => /^https:\/\/bebergames\.com\/en(?:\/|$)/.test(entry.querySelector("loc").textContent));
  assert.equal(entries.length, 9);
  for (const entry of entries) assert.equal(entry.querySelectorAll("lastmod").length, 0);
  assert.deepEqual(entries.map((entry) => entry.querySelector("loc").textContent).sort(), fixture.map((route) => absolute(route.pathname)).sort());
});

test("English copy has no placeholders, fixed legal age, unsafe instructions or unpublished game promotions", () => {
  for (const { pathname, document } of english) {
    document.querySelectorAll("script, style").forEach((node) => node.remove());
    const copy = document.textContent;
    assert.doesNotMatch(copy, /\bTODO\b|placeholder|lorem ipsum|coming soon|18\+|21\+|chug|finish your drink|drink as fast as possible|drink until|punishment drinking|No\.\s*1|thousands of players|best drinking game website/i, pathname);
    // A playable mechanic inside this guide does not publish the future game route.
    if (pathname !== "/en/blog/drinking-games-for-2") assert.doesNotMatch(copy, /Truth or Dare/i, pathname);
    assert.doesNotMatch(copy, /\b(juegos|privacidad|sobre nosotros|contacto|aviso legal|próximamente)\b/i, pathname);
  }
});

test("audit rejects missing or unexpected EN/ES, fake alternates, and hidden noindex extras", () => {
  assert.deepEqual(validateStaticExportAudit(audit), []);
  const mutations = [
    (a) => { a.exportedInventory = a.exportedInventory.filter((path) => path !== "/en/contact"); },
    (a) => { a.exportedInventory.push("/en/games/truth-or-dare"); },
    (a) => { a.exportedInventory = a.exportedInventory.filter((path) => path !== "/juegos"); },
    (a) => { a.exportedInventory.push("/es"); },
    (a) => { a.sitemap.pathnames = a.sitemap.pathnames.filter((path) => path !== "/en"); },
    (a) => { a.sitemap.pathnames.push("/en/blog"); },
    (a) => { a.technicalDocuments.push({ pathname: "/en/draft", indexability: "non-indexable" }); },
    (a) => { a.pages.find((page) => page.pathname === "/en").languages = []; },
    (a) => { a.pages.find((page) => page.pathname === "/en/legal/terms").languages = [{ locale: "es", url: absolute("/legal/aviso-legal") }]; },
    (a) => { a.pages.find((page) => page.pathname === "/en").languages.push({ locale: "x-default", url: SITE_ORIGIN }); },
    (a) => { a.pages.find((page) => page.pathname === "/en/about").canonical = SITE_ORIGIN; },
    (a) => { a.pages.find((page) => page.pathname === "/en/about").adScripts = 1; },
  ];
  for (const mutate of mutations) {
    const changed = structuredClone(audit);
    mutate(changed);
    assert.ok(validateStaticExportAudit(changed).length > 0, mutate.toString());
  }
});
