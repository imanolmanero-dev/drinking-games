# Halloween 2026

Two static editorial landings for Saturday, October 31, 2026. Editorial date:
October 23, 2026. Spanish lives at `/juegos-para-halloween`; English follows the
existing `/en` architecture at `/en/halloween-drinking-games`.

## Scope and content

Eight sections per language cover roulette, Never Have I Ever, Truth or Dare,
Most Likely To, physical cards, charades, quick challenges and party planning.
Four visible FAQs share their data with FAQPage. BreadcrumbList uses the
existing component. All drinking cues are optional; passing has no penalty.
The adaptations are played at the table, with explicit distinctions from the
general online games. No Halloween pack or configurable online wheel is promised.

Spanish links to La Ruleta, Yo Nunca, Verdad o Reto, Quién Es Más Probable,
Rey de la Copa and Tabú. English links only to its published playables:
Truth or Dare and King's Cup. Both pages also link to their games hub.

The route registry supplies reciprocal `es` / `en-US` alternates, without
`x-default`. Each page has its own canonical and inherits its locale's existing
social image. The sitemap contains 71 ES and 11 EN public URLs. Halloween dates
are fixed, rather than regenerated on each build.

## Discovery and removal

Small seasonal links appear after the main games on both homes, in the Yo Nunca
layout (game and rules), and in the English Truth or Dare related-content section.
The home titles, H1s and existing content are unchanged. Seasonal discovery blocks
can be removed after the event; the indexed landing URLs should remain available.
No navigation or footer links were added. No advertising, CMP, dependencies,
game logic, DNS or hosting settings changed.

## Validation before publication

Initial branch: `main`; HEAD and freshly fetched origin/main:
`677b1b063dc8c4bcd7e45b9928ff7cff7c3e1f9e`.
The working tree already contained the Halloween implementation and test changes
at the start of this review; it was not clean. Those changes were audited against
the pinned baseline, rather than discarded or represented as a clean preflight.

- 272 unit tests and 53 static-export tests passed.
- Next type generation and TypeScript passed.
- Real production build/export passed. The sandbox's first attempt could not
  download existing Google Fonts; the network-enabled build succeeded.
- Static-export audit: PASS, 82 public pages plus two technical error documents.
- All 80 previous pages compared against the saved baseline: metadata, headings,
  links, JSON-LD and body text match after removing only the five discovery blocks.
- Playwright: both languages at 390 × 844 and 1440 × 900; full-page screenshots
  inspected, no horizontal overflow or duplicate IDs, CTA heights above 48 px.
  Table-of-contents anchors and game CTA navigation work, with no page errors.
- The simple local static server reports some RSC prefetch 404s; tested game
  navigation still succeeds. Production navigation must be checked separately.

Local screenshots, logs and the exported comparison baseline live in
`output/halloween/` and are excluded from Git. Publication uses the existing
Cloudflare Pages `bebergames-static` automatic deployment from `main`, publishing
only `out`. Live HTTP, metadata, sitemap and responsive checks must be performed
after deployment; build success alone does not establish production success or
Google indexation.
