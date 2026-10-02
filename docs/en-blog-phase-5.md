# Phase 5 — English guide

Base: `e707c88f313a97f2a9861940a1362cfb87033425` (Phase 4 closed, deployed and production verified).

Status: **CLOSED**. Phase 5 is integrated into `main` and published in production
at `865c4462b6a0488d03a55acb3f2782c8677c9289`.

The records below describe that original release. The existing-page improvement
at the end of this document has a separate local review gate.

## Publication contract

Only `/en/blog/drinking-games-for-2` is added. The existing conceptual ID
`drinking-games-for-two` is published as `kind: guide`, `unpaired`. It is not
equivalent to either Spanish two-person article. The language switch goes to
Spanish home `/`. The six existing hreflang pairs remain, with no `x-default`.

Inventory: **70 ES + 9 EN = 79 public pages and unique sitemap URLs**.
`publishedRoutes` supplies the sitemap without a second manual list.
There is no `/en/blog` hub, alternate slug, redirect, Blog navigation item,
or new playable game. Home and Games contain one short editorial link each,
outside the game catalog. Future guides and Truth or Dare remain unpublished.

## Implementation and editorial rules

The literal `page.tsx` is a Server Component using EnglishPage, native anchors,
and the existing English CSS module. All added styles are scoped under `.root`.
No MDX engine, client boundary, remote fetch, media, or dependency was added.
The article preserves EN isolation from Spanish providers, advertising, CMP,
PWA, analytics, audio, vibration, and persistence.

The title uses the project separator: `Drinking Games for 2 — 7 Easy Games`.
`englishArticleMetadata` composes the existing helper and retains the resolved
EN image descriptor, dimensions, alt and query. Twitter derives that image.
The new English schema emits BlogPosting only; the existing BreadcrumbJsonLd
emits Home → article. Four FAQ answers are visible without FAQPage schema.

There are exactly seven games: Categories, Rhyme Round, Two Truths and a Lie,
Never Have I Ever, Truth or Dare, Higher or Lower, and Roll, Keep or Reroll.
Each explains equipment, setup, turns, ending and a variant. Alcohol is optional,
passing carries no penalty, and play can stop without an explanation. Manual
semantic review accompanies the automated prohibited-language checks.
King's Cup is linked once as a usual group game that supports two on one screen.

## Publication date decision

The final editorial publication date is **2026-09-23**. The original planned
date, 2026-09-21, did not become a production publication because the earlier
deployment failed. The dedicated commit
`865c4462b6a0488d03a55acb3f2782c8677c9289` updated both
`drinkingGamesForTwoEditorial.datePublished` and its direct test assertion.
The fixed value feeds the visible byline, OpenGraph published time and
BlogPosting datePublished; it is not derived from the build clock. The first
effective production publication was verified on 2026-09-23. No dateModified
or artificial EN sitemap lastModified is supplied without an editorial update.

## Validation

Baseline: 73 unit tests, 27 static export tests, TypeScript, build and audit pass.
Baseline export: 70 ES / 8 EN / 78 sitemap URLs; 29 JS chunks, 1,095,910 bytes.
The complete baseline export is retained locally in the OS temporary directory
as `bebergames-phase5-e707c88-out` for the separate audit.

Run `npx next typegen`, `npm test`, `npx tsc --noEmit --incremental false`,
`npm run build`, `npm run test:static-export`, `npm run audit:static-export`,
and `git diff --check`. The new tests cover the article metadata, schemas,
content structure, publication, native TOC, links, pending date and script parity.
Existing EN tests continue checking all internal links/fragments, unique IDs,
six hreflang pairs, shell navigation, image export and isolation.
Spanish fixtures are unchanged. Compare the baseline and final ES exports,
excluding RSC/asset hashes and only the sitemap dates generated at build time;
retain editorial dates, metadata, headings, links, JSON-LD and visible copy.

Implementation result: **78 unit tests and 33 static export tests pass**;
typegen, TypeScript, build and static audit pass. The 70 ES documents match
the baseline in all the fields above. Spanish sitemap entries also match after
excluding only generated non-post dates. Home/Games metadata and headings
remain identical. All 29 JS chunks retain byte-identical contents and a total
of 1,095,910 bytes: no new interactive JavaScript. The exported guide contains
approximately 1,230 whitespace-separated words including navigation within
the article. Links and fragments resolve; all five forbidden future URLs lack
HTML exports. One extra existing test file, `tests/kings-cup.test.mjs`, needed
its historical fixture comparison to permit the new guide; a new comparison
also fixes all eight pre-existing EN fixture entries to the Phase 4 baseline.

The publication-date commit passed the targeted guide tests (5/5), the full
unit suite (78/78) and `npm run build`. The export contained the guide, 79
sitemap URLs and the 2026-09-23 visible and structured publication dates.
Existing build metadataBase and Node module-type warnings did not block it.

## Deployment incident and release

The initial Phase 5 deployment of `98772c7fa7241b66eeed7f37ae4105f68056b1fc`
failed after approximately 36m 58s with `build exceeded the time limit and was
terminated`. Production therefore remained on Phase 4 commit
`e707c88f313a97f2a9861940a1362cfb87033425`. The earlier
`7b04b159431a96bc896490891c621537dab44290` deployment had also failed;
Phase 5 code was not the common change behind both failures.

A clean copy of the commit built in WSL2 Ubuntu with Node 22.23.1 and npm
10.9.8: `npm ci --verbose` passed in about 18 seconds and `npm run build`
passed in about 19 seconds. The guide was exported. This did not reproduce
the timeout or establish its exact internal cause.

Cloudflare Pages project `bebergames-static` was then configured manually
with build command `npm ci --verbose && npm run build`, output directory `out`,
an empty root directory, production branch `main`, automatic deployments on,
build system v3, `NODE_VERSION=22.23.1`,
`SKIP_DEPENDENCY_INSTALL=1`, and build cache disabled. These adjustments
preceded the successful automatic deployment of
`865c4462b6a0488d03a55acb3f2782c8677c9289`; none was proven to be the
sole cause of the earlier timeout. The production deployment URL is
`https://a60ba0e9.bebergames-static.pages.dev` (not `4a0ba0e9`). The stable
Pages domain and `https://bebergames.com` also serve Phase 5.

## Final production QA

**PASS.** The guide returns HTTP 200 with the expected title, H1, seven games,
four visible FAQs, self-canonical, `og:type=article`, BlogPosting and
BreadcrumbList. Its visible date, `article:published_time` and
`BlogPosting.datePublished` are 2026-09-23. Home EN and Games EN link to the
guide, and the links resolve. The live sitemap has 79 unique URLs (70 ES,
9 EN), with the guide exactly once.

Playwright MCP responsive QA passed at 320×844, 390×844, 768×1024 and
1440×900. Document and body scroll widths equaled client width at every
viewport: no horizontal overflow. Relevant console, JavaScript and hydration
errors: 0. Relevant failed resources and 404/5xx responses: 0.
Warnings about unused preloaded fonts were non-blocking. The correct
deployment URL, stable Pages domain and custom domain serve the same Phase 5
contract. No Phase 5 blockers remain; do not begin Phase 6 until its scope is
defined separately.

## Existing-guide intent alignment (local, uncommitted)

Based on `17a2180fdc4b0d6df1e455483b3c3fa79accb230`; this is not Phase 7.
The original seven entries removed drinking outcomes despite the article title.
The revised guide retains all seven and adds Would You Rather Match, Memory
Chain and Movie or TV Cue: **10 games**, grouped by no equipment, cards, dice
and a shared screen. Each has equipment, turns, a concrete small optional sip
trigger and a clear ending. Sip invitations never accumulate. Truth or Dare
uses one optional round-end toast regardless of answers or passes; declining
a prompt never triggers drinking. Movie/TV uses only the first uncommon cue
in a ten-minute segment, then disables that cue. Alcohol-free drinks and
consequence-free passing remain explicit.

The existing editorial data file now supplies the games and six FAQs. FAQPage
reuses the existing FAQJsonLd component and exactly the visible FAQ data.
The literal Server Component, canonical, unpaired language status, inherited
OG image and shell remain. No routes, styles, clients, dependencies or ad
configuration change. Inventory remains **70 ES + 10 EN = 80**.

Publication stays **2026-09-23**. The substantive editorial update is dated
**2026-10-02** in the byline, BlogPosting and article modified metadata; it is
not a deployment claim or a build timestamp. The English schema component
accepts an optional modification date without inventing one when omitted.

The authorized follow-up replaces only the four incoming “seven games”
anchors on home, hub, King's Cup and Truth or Dare with count-neutral
“drinking games for two guide” wording. IDs, destinations and all other
source content on those pages remain baseline-equivalent. Focused tests
check the four anchors and preserve the guide's accurate seven-game
no-equipment subgroup. Independent delta review is required before commit
or publication.

Local validation passes: 10 focused guide tests, 174 unit tests, 15 focused
EN export tests, all 42 static-export tests, typegen, TypeScript, targeted
ESLint, build, export audit and diff checks. The clean baseline export is
retained under `build/two-intent/baseline`; `compare.cjs` verifies all 70 ES
and nine other EN pages in metadata, headings, links, JSON-LD and text,
allowing only the four verified incoming-anchor labels; sitemap properties
and editorial dates remain identical. Loaded JS for both games and the
guide is byte-identical to the baseline. Existing metadataBase build
warnings also occur on the unchanged base.

Playwright MCP QA passes at 320×844, 390×844, 768×1024 and 1440×900:
document/body scroll widths equal the viewport, no overflowing article
text, one H1, ten game sections and six FAQs. Native contents links and
both interactive-product links work; both game routes return HTTP 200.
The sampled four-size run has no page exceptions or failed requests.
Reviewed screenshots are ignored under `build/two-intent/`: `games-320.png`,
`faq-320.png`, `hero-390.png`, `cards-768.png` and `movie-1440.png`.

Follow-up Playwright MCP checks on the fresh export at 390×844 confirm
HTTP 200, visible and naturally wrapped guide links, unchanged destinations,
no horizontal overflow and no page exceptions on all four affected pages.
