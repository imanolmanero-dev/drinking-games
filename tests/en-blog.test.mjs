import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import { assertEs01Compatible, es01Replacements } from "./helpers/es01-baseline.mjs";

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

// Preserve the existing exact-fragment baseline transformation, then allow
// only the pinned reporting diff in the remaining repository comparison.
function assertReviewedSource(base, paths, additionalExclusions = [], readCurrent = file => readFileSync(file, "utf8")) {
  const replacements = es01Replacements;
  const files = Object.keys(replacements).filter(file => paths.some(path => file === path || file.startsWith(path + "/")));
  assertReviewedReportingDiff(reviewedSourceDiff(base, paths,
    [...additionalExclusions, ...files.map(file => ":(exclude,literal)" + file)]));
  for (const file of files) {
    let expected = execFileSync("git", ["show", base + ":" + file], { encoding: "utf8" }).replace(/\r\n/g, "\n");
    for (const [before, after] of replacements[file]) {
      assert.equal(expected.split(before).length - 1, 1, file + ": unique reviewed original fragment");
      expected = expected.replace(before, after);
    }
    assert.equal(readCurrent(file).replace(/\r\n/g, "\n"), expected, file + ": only exact reviewed fragments");
  }
}

const require = createRequire(import.meta.url);
require("tsx/cjs");
const { createElement } = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const { parse } = require("next/dist/compiled/node-html-parser");
const { routeRegistry, publishedRoutes, languageAlternates, languageSwitch } = require("../lib/i18n/routes.ts");
const { englishArticleMetadata } = require("../lib/i18n/metadata.ts");
const { drinkingGamesForTwoEditorial: editorial, drinkingGamesForTwoGames: games, drinkingGamesForTwoFaqs: faqs } = require("../lib/data/drinking-games-for-2-editorial.ts");
const Guide = require("../app/(english)/en/blog/drinking-games-for-2/page.tsx");
const Article = require("../components/seo/EnglishArticleJsonLd.tsx").default;
const read = (path) => readFileSync(path, "utf8");
const canonical = "https://bebergames.com/en/blog/drinking-games-for-2";
const incomingGuideLinks = [
  ["app/(english)/en/page.tsx", "en-home-two-guide", "Try seven games for two", "Try our drinking games for two guide"],
  ["app/(english)/en/games/page.tsx", "en-games-two-guide", "Read our guide to seven games for two", "Read our drinking games for two guide"],
  ["app/(english)/en/games/kings-cup/page.tsx", "kc-two-guide", "seven games for two guide", "drinking games for two guide"],
  ["app/(english)/en/games/truth-or-dare/page.tsx", "tod-two-guide", "seven games for two guide", "drinking games for two guide"],
];

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
  // Existing King's Cup metadata was deliberately updated after Phase 5.
  // Keep every other field in this historical route comparison intact.
  assert.deepEqual(fixture.filter((route) => ![entry.routes["en-US"].pathname, "/en/games/truth-or-dare"].includes(route.pathname)).map((route) => {
    if (route.pathname === "/en") return { ...route, h1: "Good company. Your pace." };
    if (route.pathname === "/en/games/kings-cup") return { ...route, title: previous.find(({ pathname }) => pathname === route.pathname).title };
    return route;
  }), previous);
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

test("publication history stays fixed and only a supplied editorial modification date is emitted", async () => {
  assert.equal(editorial.datePublished, "2026-09-23");
  const schema = (datePublished, dateModified = editorial.dateModified) => JSON.parse(parse(renderToStaticMarkup(createElement(Article, { ...editorial, url: canonical, datePublished, dateModified }))).querySelector("script").textContent);
  const published = schema(editorial.datePublished);
  assert.equal(published["@type"], "BlogPosting");
  assert.equal(published.datePublished, editorial.datePublished);
  assert.equal(published.dateModified, editorial.dateModified);
  assert.match(editorial.dateModified, /^\d{4}-\d{2}-\d{2}$/);
  assert.ok(editorial.dateModified > editorial.datePublished);
  assert.equal(schema(editorial.datePublished, null).dateModified, undefined);
  assert.equal(schema(null, null).datePublished, undefined);
  assert.equal(published.headline, editorial.headline);
  assert.equal(published.mainEntityOfPage, canonical);
  assert.deepEqual(published.author, { "@type": "Organization", name: "BeberGames", url: "https://bebergames.com/en/about" });
  assert.equal(published.inLanguage, "en-US");
  assert.equal(published.isAccessibleForFree, true);
  const generate = englishArticleMetadata("drinking-games-for-two", editorial.title, editorial.description, editorial.datePublished);
  const metadata = await generate({}, Promise.resolve({ openGraph: { images: [{ url: "https://bebergames.com/en/opengraph-image-test" }] } }));
  assert.equal(metadata.openGraph.publishedTime, editorial.datePublished);
  const updated = await Guide.generateMetadata({}, Promise.resolve({ openGraph: { images: [{ url: "https://bebergames.com/en/opengraph-image-test" }] } }));
  assert.equal(updated.openGraph.modifiedTime, editorial.dateModified);
  assert.equal(updated.openGraph.publishedTime, editorial.datePublished);
  assert.deepEqual(updated.alternates, { canonical });
});

test("ten distinct two-player entries include equipment, playable turns, sip outcomes and round endings", () => {
  assert.equal(games.length, 10);
  for (const key of ["id", "name", "play", "sip"]) {
    assert.equal(new Set(games.map((game) => game[key].toLowerCase().trim())).size, games.length, key);
  }
  const groups = games.map(({ group }) => group);
  assert.equal(groups.filter((group) => group === "without-cards").length, 7);
  assert.equal(groups.filter((group) => group === "card-game").length, 1);
  assert.equal(groups.filter((group) => group === "dice-game").length, 1);
  assert.equal(groups.filter((group) => group === "screen-game").length, 1);
  for (const game of games) {
    for (const key of ["equipment", "play", "sip", "ending"]) assert.ok(game[key].trim().length > 40, `${game.name}: ${key}`);
    assert.match(game.sip, /small (?:optional )?sip/, game.name);
    assert.match(game.sip, /may|optional|invites|offers|invitation/, game.name);
    assert.doesNotMatch(Object.values(game).join(" "), /\bchug(?:ging)?\b|(?:finish|down) your drink|\bshots?\b|drink quickly|drinking races?|must (?:drink|sip)|take \d+ (?:sips|drinks)|loser drinks|no drinking penalties|results never require drinking/i, game.name);
  }
  const originalIds = ["categories", "rhyme-round", "two-truths-and-a-lie", "never-have-i-ever", "truth-or-dare", "higher-or-lower", "roll-keep-or-reroll"];
  for (const id of originalIds) assert.equal(games.filter((game) => game.id === id).length, 1);
  const byId = (id) => games.find((game) => game.id === id);
  const triggers = {
    categories: /person who misses.*round closes/,
    "rhyme-round": /break the rhyme or repeat a word/,
    "two-truths-and-a-lie": /incorrect guess invites the guesser/i,
    "never-have-i-ever": /If you have done the thing mentioned/,
    "higher-or-lower": /wrong prediction.*small optional sip.*Equal ranks are neutral/i,
    "roll-keep-or-reroll": /lower final roll.*small sip.*tie has no sip invitation/i,
  };
  for (const [id, trigger] of Object.entries(triggers)) assert.match(byId(id).sip, trigger, id);
  assert.match(byId("would-you-rather").play, /Each person silently picks.*both say their choices together/);
  assert.match(byId("would-you-rather").sip, /only one sip invitation for the whole round/);
  assert.match(byId("memory-chain").play, /other person repeats.*Keep alternating.*in order/);
  assert.match(byId("movie-tv-cue").play, /one specific, uncommon cue.*ten-minute segment.*first time.*Do not count later/);
  assert.match(byId("movie-tv-cue").sip, /inactive for the rest of the segment/);
});

test("Truth or Dare drinking is a round-end invitation unrelated to accepting or declining prompts", () => {
  const game = games.find(({ id }) => id === "truth-or-dare");
  assert.match(game.play, /pass without a penalty/);
  assert.match(game.sip, /all three turns.*one small optional sip/);
  assert.match(game.sip, /regardless of answers or passes/);
  assert.match(game.sip, /Declining a truth or dare never triggers drinking/);
  assert.match(game.ending, /stop sooner with no toast required/);
});

test("rendered guide count, sip rules, visible FAQ and existing FAQ schema share the editorial data", () => {
  const doc = parse(renderToStaticMarkup(createElement(Guide.default)));
  assert.equal(doc.querySelector("h1").textContent, editorial.headline);
  assert.match(editorial.title, new RegExp(`— ${games.length} Easy Games$`));
  assert.match(editorial.headline, new RegExp(`^${games.length} Drinking Games`));
  assert.match(editorial.description, new RegExp(`^${games.length} drinking games for 2`));
  assert.equal(doc.querySelectorAll("[data-guide-game]").length, games.length);
  assert.equal(doc.querySelectorAll("[data-sip-rule]").length, games.length);
  assert.equal(doc.getElementById("without-cards").textContent, "Seven games with no equipment");
  const schema = doc.querySelectorAll('script[type="application/ld+json"]').map((node) => JSON.parse(node.textContent)).find((entry) => entry["@type"] === "FAQPage");
  assert.deepEqual(schema.mainEntity.map(({ name, acceptedAnswer }) => [name, acceptedAnswer.text]), faqs.map(({ q, a }) => [q, a]));
  assert.deepEqual(doc.querySelectorAll("[data-guide-faq]").map((section) => [section.querySelector("h3").textContent, section.querySelector("p").textContent]), faqs.map(({ q, a }) => [q, a]));
  const copy = doc.querySelector(".en-article").textContent;
  assert.match(copy, /Alcohol is optional.*Water, soda and mocktails/);
  assert.match(copy, /legal drinking age where you are.*small sips.*set your own limits.*stop whenever you want/);
  assert.match(copy, /Every.*When to sip.*invitation, never an obligation/);
  assert.match(copy, /Do not combine sip rules, save them up or add extra drinks/);
  for (const anchor of doc.querySelectorAll('a[href^="/en"]')) {
    const [pathname, fragment] = anchor.getAttribute("href").split("#");
    assert.ok(publishedRoutes("en-US").some((route) => route.pathname === pathname), pathname);
    if (fragment) assert.equal(fragment, "responsible-play");
  }
});

test("intent alignment preserves Spanish sources, both interactive games, shared EN design and infrastructure", () => {
  const paths = ["app/(spanish)", "content/blog", "components/games", "lib/games", "lib/data/truth-or-dare-prompts.ts", "app/(english)/en/games", "app/(english)/en/page.tsx", "app/globals.css", "components/layout", "lib/i18n", "scripts", "app/sitemap.ts", "tests/fixtures/es-routes.json", "public", "package.json", "package-lock.json", "next.config.ts"];
  const exclusions = incomingGuideLinks.map(([file]) => `:(exclude,literal)${file}`);
  assertReviewedSource("17a2180fdc4b0d6df1e455483b3c3fa79accb230", paths, exclusions);
  for (const [file, id, before, after] of incomingGuideLinks) {
    assertIncomingGuideSource(file, id, before, after, read(file));
  }
});

test("four incoming guide anchors preserve their destination and use count-neutral wording", () => {
  assert.equal(publishedRoutes("en-US").find(({ id }) => id === "drinking-games-for-two").pathname, "/en/blog/drinking-games-for-2");
  for (const [file, id] of incomingGuideLinks) {
    const anchors = [...read(file).matchAll(new RegExp(`<EnglishLink\\b[^>]*\\bid="${id}"[^>]*>([^<]*)</EnglishLink>`, "g"))];
    assert.equal(anchors.length, 1, file);
    assert.match(anchors[0][0], /routeId="drinking-games-for-two"/);
    assert.match(anchors[0][1], /drinking games for two guide$/i);
    assert.doesNotMatch(anchors[0][1], /\b(?:\d+|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)\s+(?:easy\s+)?(?:drinking\s+)?games\b/i);
  }
});

test("article sources contain no client behavior, remote media or Spanish editorial dependencies", () => {
  for (const file of ["app/(english)/en/blog/drinking-games-for-2/page.tsx", "components/seo/EnglishArticleJsonLd.tsx", "lib/data/drinking-games-for-2-editorial.ts"]) {
    assert.doesNotMatch(read(file), /use client|useState|useEffect|fetch\s*\(|next\/dynamic|<iframe|<video|<img|lib\/blog|AuthorBio|AppContext|AudioContext|vibrate|localStorage|sessionStorage|new Date\s*\(/, file);
  }
});

test("Phase 5 leaves Spanish files, fixtures, navigation, sitemap and dependencies unchanged", () => {
  const base = "e707c88f313a97f2a9861940a1362cfb87033425";
  const paths = ["app/(spanish)", "content/blog", "lib/blog.ts", "app/globals.css", "tests/fixtures/es-routes.json", "tests/fixtures/es-redirects.json", "components/layout/english/EnglishNav.tsx", "components/layout/english/EnglishFooter.tsx", "app/sitemap.ts", "package.json", "package-lock.json"];
  assertEs01Compatible(base, paths);
  const originalRegistry = execFileSync("git", ["show", `${base}:lib/i18n/routes.ts`], { encoding: "utf8" });
  const oldModule = require("typescript").transpileModule(originalRegistry.replace('import { absoluteUrl, type Locale } from "./locales";', 'const absoluteUrl = (path: string) => path; type Locale = "es" | "en-US";'), { compilerOptions: { module: 1 } }).outputText;
  const loaded = { exports: {} };
  new Function("module", "exports", oldModule)(loaded, loaded.exports);
  const es = (entries) => entries.map(({ id, routes, published, equivalence }) => ({ id, route: routes.es, published: published.es, equivalence }));
  assert.deepEqual(es(routeRegistry), es(loaded.exports.routeRegistry));
});

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

function assertIncomingGuideSource(file, id, before, after, source) {
  const baseline = execFileSync("git", ["show", `17a2180fdc4b0d6df1e455483b3c3fa79accb230:${file}`], { encoding: "utf8" });
  const anchor = new RegExp(`(<EnglishLink\\b[^>]*\\bid="${id}"[^>]*>)([^<]*)(</EnglishLink>)`, "g");
  const matches = [...baseline.matchAll(anchor)];
  assert.equal(matches.length, 1, file);
  assert.equal(matches[0][2], before, file);
  // Git normalizes CRLF; every source character besides this anchor must match.
  assert.equal(source.replace(/\r\n/g, "\n"), baseline.replace(anchor, `$1${after}$3`).replace(/\r\n/g, "\n"), file);
}

test("historical EN guard rejects unexpected English copy beyond the approved anchor", () => {
  const [file, id, before, after] = incomingGuideLinks[0];
  const source = read(file);
  const mutated = source.replace(after, "Unreviewed English guide copy");
  assert.notEqual(mutated, source);
  assertIncomingGuideSource(file, id, before, after, source);
  assert.throws(() => assertIncomingGuideSource(file, id, before, after, mutated), { code: "ERR_ASSERTION" });
});
