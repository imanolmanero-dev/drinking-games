# Phase 5 — English guide

Base: `e707c88f313a97f2a9861940a1362cfb87033425` (Phase 4 closed, deployed and production verified).

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

The implementation uses **2026-09-21** as its planned editorial publication
date. `drinkingGamesForTwoEditorial.datePublished` stores that fixed value once;
the visible byline, OpenGraph published time and BlogPosting datePublished all
use it. The build does not derive it from `new Date()`. No dateModified or
artificial EN sitemap lastModified is supplied because there has been no later
editorial update.

Phase 5 remains local, so this planned date does not confirm a production
deployment. Reconfirm it immediately before deployment. If the effective
publication date changes, update the centralized value in a dedicated reviewed
commit before deploying.

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

Browser connection discovery returned no available browser. Visual QA is
**PENDING** at 320, 390, 768 and 1440 pixels, including TOC target visibility,
overflow, reading width and the small Home/Games links. Source/static checks
do not substitute for that visual review. Existing build metadataBase and Node
module-type warnings also occur at baseline; final rendered URLs are validated.

No push, merge, deploy, workflow execution or remote configuration changes.
Next step: a separate Phase 5 audit, including responsive visual QA.
