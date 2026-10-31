# English Guides directory and navigation

Local implementation on `feat/en-guides-index-navigation`, based on `8faf430`.
Adds only `/en/guides`: 71 ES + 15 EN = 86 public routes.

The directory answers which existing guide to use. Its four-question list links
to three evergreen guides and the separate Halloween guide. Short descriptions
explain pair adaptations, equipment, group fit and seasonal context. Games is
the final path for immediate play. Existing article URLs, copy and dates stay fixed.

The registry classifies the index as `page`, like Games, and `unpaired`. It uses
inherited English metadata and BreadcrumbList only. Entries are curated editorial
data filtered through registry publication. There are no filters or client state.

The single EN header list becomes Home, Games, Guides, About, Contact. Existing
navigation has no current-route semantics; this phase retains that behavior on
the index and articles rather than adding a client boundary solely for active
styling. Native links and keyboard focus remain unchanged.

At 390 px, the fifth item made icon-bearing navigation too tight. The existing
icon-hiding breakpoint expands from 359 to 480 px; labels and 44 px minimum link
heights remain intact. No new menu or header design is introduced.

Exact full-source fixtures project only this phase before historical guards.
Negative mutations reject changed labels, destinations and extra content.
The export comparison checks all 85 prior pages after removing only the exact
Guides nav item, preserving the remainder of the header plus metadata, headings,
links, text and JSON-LD. Its local baseline is `build/guides/baseline`.

Known unrelated copy: Truth or Dare's “both playable options”. The chooser phase
report retains its historical pre-integration wording. Neither is changed here.

Independent review is required before commit, push or publication.

Validation: 290 unit tests and 59 static-export tests pass; TypeScript, build,
static audit and targeted lint pass (zero errors; two existing en-blog warnings).
The 85-page semantic comparison passes. Playwright MCP inspected the directory
at 320×844, 390×844, 768×1024 and 1440×900. Header bounds and 44 px minimum
heights pass on five representative EN routes at all four widths after the
breakpoint correction. Keyboard focus is visible and Enter follows Guides;
the four editorial destinations and Games return HTTP 200 on the local export.
Spanish home sanity shows its existing navigation with no Guides link.
No source, report, article-date or infrastructure changes outside the phase.
