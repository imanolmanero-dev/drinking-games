# Never Have I Ever EN

Base: 8a48f70103e8097b33a8ce2ebe25c5b6b8509e24.
Branch: feat/en-never-have-i-ever. Local implementation; independent review required.
No staging, commit, push, merge or deployment.

## Product and architecture

One new unpaired EN game: /en/games/never-have-i-ever.
Inventory: 71 ES + 13 EN = 84 public pages and sitemap URLs.
The Server Component owns metadata, static rules, shared FAQ data/schema,
GameJsonLd en-US/USD and breadcrumbs. One client island owns in-memory state.
No ads, analytics, storage, names, remote rooms or player identities.

GameSetup is reused. Deliberate exception: no PlayerCountField, because everyone
responds together and player count changes nothing. 2–12 remains static guidance.
Local decorative speech bubbles use SVG; shared setup and button styles remain.
New styles are scoped under the English root. Gameplay is compact, without motion.

Classic default and Party each have 60 original statements. Start filters before
Fisher–Yates, then takes 20. Pure reducer advances with the expected current ID;
finished states reject actions. Pointer double-click second events are ignored.
Smaller nonempty pools use their available length; empty pools throw before start.
Displayed statements count as shown. Skip advances the group, while personal
passing requires no screen action. Final Next/Skip finishes. Early End includes
the current statement. Replay retains category and reshuffles; separate sessions
may repeat. Change setup discards the session and focuses the setup heading.

Reading supplied text is not a personal claim. Responses and stories are voluntary;
silence is ambiguous. Optional small sips may acknowledge an applicable statement.
No penalty, accumulated obligation, scoring, quantity or speed mechanic exists.

## Discovery and protection

Hub adds one playable card. Each existing NHIE guide section adds one online-option
paragraph explaining the separate 20-statement session. All manual guide rules and
editorial dates remain intact. No home/header/seasonal expansion.

Historical guards project exact complete before/after source snapshots from
tests/fixtures/nhie-source.json before applying older guards. Negative mutation
tests reject extra edits, including inside changed pages. Existing ES fixtures,
report snapshots and production reporting logic are untouched.

## Content review

Created in ten-statement thematic batches. Reviewed all 120 for natural spoken
English, plausible single experiences, category fit, safety and semantic overlap.
Automated inventory validates 60/60, IDs, normalized uniqueness and 24-word ceiling.
Reviewed randomized 20-statement selections in each category as well as browser
sessions. No semantic near-duplicate was identified. Themes intentionally recur
at a broad level (music, food, social mishaps) with different experiences.
Independent editorial review remains part of handoff.

## Local validation

- Full unit suite: 286 passing tests.
- Typegen and TypeScript: pass.
- Production build: pass, including final double-click protection.
- Static-export tests: 56 passing tests.
- Static export audit: PASS; 84 URLs, 71 ES and 13 EN.
- New source/test targeted ESLint: pass.
- Global lint: existing debt, 118 errors and 7,499 warnings; no unrelated fixes.
- Export comparison: all 83 previous pages match metadata, headings, links,
  JSON-LD and visible text after removing only the new card and two paragraphs.
- Diff whitespace check: pass.

Baseline and final logs plus comparison script are under ignored build/nhie/.
The first sandbox build could not fetch Google Fonts; authorized build succeeded.

## Playwright MCP QA

Chromium against the production export, exclusively through Playwright MCP.
Setup and gameplay checked at 320×844, 390×844, 768×1024 and 1440×900.
Classic default, Party selection, Start, Next, Skip, early End, replay, setup return
and natural 20-statement completion passed at each width. Each completed session
contained 20 unique statements. Final Skip also passed. Double-click advanced once.
Focus destinations passed for Start, Next, Skip, End and Change setup.
Native select keyboard navigation, Tab to Start and Enter activation passed.

Document/body widths matched each viewport, with no horizontal overflow.
Screenshots of setup/gameplay at all four sizes were visually inspected.
At 320 px a long statement wraps naturally and Next ends around y=650 in an
844 px viewport after focus scrolling. Controls measured at least 48 px high.
Reduced motion, 844×390 landscape and CSS 200% zoom smoke checks passed without
horizontal overflow. CSS zoom is not a full browser-zoom or assistive-technology audit.
Sampled browser run produced zero page errors. Existing Truth or Dare and King's
Cup start/focus smoke checks passed at 390 px.

Independent review is the next gate. No production claims are made.
