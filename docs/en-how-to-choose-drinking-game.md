# EN participation decision guide

Base: `7f4e81037ec1f538beb77eb625d7dd01878c6d95`.
Branch: `feat/en-how-to-choose-drinking-game`. Local, uncommitted implementation.

Adds only `/en/blog/how-to-choose-a-drinking-game`, an unpaired EN guide.
Inventory: 71 ES + 14 EN = 85 public routes. The sitemap derives publication
from the registry. Existing guide URLs and seven hreflang pairs remain intact.

The article selects formats by participation and group fit. Six decision
sections, five comparison situations and three worked scenarios explain
tradeoffs, alternatives and switching. Approximately 1,205 article words.
It does not reproduce rules or prompt inventories. Categories and Rhyme Round
link to stable manual anchors; the two-player case delegates to the existing guide.

The full draft was reread separately after writing. Each scenario identifies
the people present, a starting format and a fallback. NHIE is not presumed
suitable for strangers; Truth or Dare spotlight/waiting and King's Cup learning
and physical setup are explicit. Drinking remains optional and separate from
passing. No FAQ is needed. BlogPosting and BreadcrumbList use existing helpers.

Publication date is null during local review: no invented publication history,
dateModified or build-clock date. Set the actual date in the reviewed integration
change, then revalidate visible date, OG and BlogPosting before publication.

Only Home and Games gain one discovery paragraph each. Full before/after
snapshots reverse those changes and the registry/audit/EN fixture adjustments
before historical guards run. Negative mutation tests reject extra edits.
All existing production sources are pinned against the initial commit.

Baseline export is under ignored `build/choice/baseline`. The comparison script
checks complete metadata, headings, links, JSON-LD and visible text for all
84 existing pages, removing exactly the two authorized paragraphs: PASS.

Validation: 289 unit tests pass; typegen and TypeScript pass; production build
exports the new route; 57 static-export tests pass; static audit PASS. Targeted lint on changed source/tests
has zero errors and two pre-existing unused-import warnings in en-blog tests.
No global lint cleanup. Diff whitespace check passes.

Playwright MCP against the production export: 320, 390, 768 and 1440 px.
Full-page screenshots visually inspected; no horizontal overflow. Five choices,
six H2s and three scenarios render; all six contents links work at all sizes.
Outbound destinations resolve. Both inbound links were focused and clicked;
Home/Games sanity checks pass at 390 px. Sampled final console has no errors.
Screenshots and logs are under ignored `build/choice/`.

Minor follow-up only: Truth or Dare still says “both playable options”. It was
not changed. No header, Guides index, game logic, ads, analytics, legal, Spanish,
dependency, workflow or reporting changes. No staging, commit, push or deployment.
Independent review and the actual integration date remain release gates.
