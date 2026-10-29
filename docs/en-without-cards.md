# EN expansion — Drinking Games Without Cards

Base: `8199eecf6b46dbcd69625a8cd8406939a9b4e9e4`.
Status: local implementation, uncommitted; independent review required.

Adds only `/en/blog/drinking-games-without-cards`, a literal Server Component.
Registry: published EN guide, unpaired. Inventory: 71 ES + 12 EN = 83.
Home, Games and the two-player guide each gain one contextual paragraph.
No navigation, game, style, dependency, Spanish, advertising or reporting changes.

Eight manual games: Never Have I Ever, Truth or Dare, Most Likely To,
Two Truths and a Lie, Categories, Rhyme Round, Memory Chain and Medusa.
Every entry has recommended players, materials, setup, turn loop, resolution,
ending/reset and a separate small optional sip invitation. Manual simulation
checked first/next turns, ties, disputes, passing and ending for each game.
Truth or Dare uses an optional round-end toast unrelated to answering or passing.
No prompt list or unpublished digital game is advertised.

Comparison uses an accessible native list with consistent Group, Materials and
Style labels. Existing article CSS and native anchors suffice; no CSS changes.
Article body is approximately 1,840 words including comparison, TOC and FAQ.
BlogPosting, BreadcrumbList and FAQPage reuse current components; visible FAQ
and schema share two substantive answers. OG inheritance is unchanged.

Fixed planned publication date: 2026-10-29. This is NOT a production-release
claim. Reconfirm immediately before deployment and update if launch is delayed.
No modification date is emitted.

Validation: baseline and final builds pass; typegen and typecheck pass;
280 unit tests and 55 static-export tests pass; static audit PASS, 83 URLs.
Targeted lint on new source/tests passes. Global lint fails on repository-wide
debt (118 errors and 7,499 warnings); no unrelated cleanup was attempted.
The sandbox font-download failure was resolved by rerunning the build with
network access, without changing fonts or dependencies.

`build/no-cards/baseline` preserves the initial export. `compare.cjs` checks all
82 existing pages for complete metadata, headings, links, JSON-LD and visible
text, removing only the three authorized discovery paragraphs. PASS. Sitemap
comparison preserves editorial dates, ignoring only build-generated dates.
Historical source guards reverse exact reviewed patches, with mutation tests.

Playwright MCP QA: 320, 390, 768 and 1440 px, screenshots inspected. Document
and body widths equal viewport widths. Comparison, headings and FAQ wrap;
44 TOC clicks reach visible headings. Truth or Dare and two-player links work.
All three inbound pages pass 390 px sanity checks. Skip-link focus is visible.
Sampled interaction run: zero page errors and zero failed requests.
Screenshots and logs remain ignored under `build/no-cards/`.

No staging, commit, push, merge or deployment. Production verification is outside
this local phase. Next action: independent review, then reconfirm launch date.
