# King's Cup — Phase 3

Local implementation on `feat/en-kings-cup`, based on
`18837ef918024278e09a516592ba8d2a06682aad`. Do not push, merge or publish before
the combined Phase 2 + Phase 3 audit. No remote settings changed.

## One page, one published game

Only `/en/games/kings-cup` is added: 70 ES + 8 EN = 78 public pages.
The existing registry-driven games hub picks up the published game without a
hardcoded catalog change. Home adds one short section linking to it. Sitemap
already reads published EN routes, so no sitemap implementation change is needed.
The independent EN fixture adds one entry; the original seven entries and both
Spanish fixtures remain unchanged.

The page is a Server Component containing metadata, WebApplication schema,
visible rules, 13 card meanings, setup, variants, responsible play and six FAQs.
The FAQ schema uses the same data as the visible answers. The client component
contains only play and shares its rule data with the server-rendered table.

## Inspection and reuse decision

Rey de la Copa uses suit-bearing cards and a previewed current card. Its action
counts the current card and advances after 300 ms. Its fourth-King screen can be
dismissed, allowing the remaining deck to continue. Its numbered rules include
Four/Floor, Five/Boys and Six/Girls. Players are listed without a rotating player
turn indicator. The rules page describes endings more loosely than the actual
component; that pre-existing discrepancy is preserved.

Ring of Fire uses four copies of 13 rank rules without individual suits. It has
separate draw and pass stages, rotating players, different Four/Five/Six rules,
and ends on the fourth King. Its component, data and rules remain untouched.

Only Fisher–Yates was extracted, into `lib/games/shuffle.ts`. The Spanish
`shuffleDeck` wrapper retains its API. Characterization tests were written and
passed before extraction, then passed again afterward. They compare deck/rules
and deterministic shuffle outputs with the actual Phase 2 module, including
random-call count, array copying and object identity. Source checks lock both
Spanish game trees and their integrations. No Spanish UI state machine changed.

The English game uses its own small suit/rank model and reducer. Reusing Spanish
rule-bearing cards would import unsuitable instructions; reusing AppProvider or
player history would create unnecessary locale and storage coupling.

## Equivalence decision

The conceptual ID remains `kings-cup`, with explicit ES and EN paths and both
published. It remains `unpaired`: this adaptation replaces the central cup,
cascade and several rank rules. It is not presented as a translation of the
existing Spanish experience. No Spanish metadata changes are needed, and neither
Rey de la Copa nor Ring of Fire receives new hreflang. The six existing foundation
pairs stay reciprocal, without x-default. King's Cup uses the honest
"Spanish home" fallback from the existing switcher.

Circle of Death and Ring of Fire are discussed as related names/variants whose
rules differ by group. They do not receive separate English URLs or links to
Spanish gameplay.

## Play, privacy and safety

Two to twelve numbered players share one screen. No names, localStorage,
cookies, network requests, account, analytics, ads, CMP, audio or PWA integration
is added. All game state lives in component memory and clears on reload. Existing
English privacy/storage descriptions remain accurate without legal-page edits.

Flow: setup → face-down card → revealing → visible rule → next player. The reducer
ignores duplicate draws and premature/duplicate advances. The short reveal timer
cleans up when its stage ends or the component unmounts. Pausing preserves the
deck, including a pending reveal, but prevents advancing. Early finish prevents
late reveal events from reopening a game. The last card remains readable before
completion; Play again creates a full shuffled deck without reloading.

The Ace passes a gesture or greeting. Optional sips on Two/Three always have a
non-drinking alternative. There are no speed, cumulative drinking or gender-based
rules. Kings one through three invite a compliment; the fourth offers an optional
favorite-moment prompt and allows continued play. Water, soda and no drinks work.

Controls use native buttons/select, explicit labels/IDs, 48 px minimum height,
focus outlines and a focusable game heading. Cards name both rank and suit in
text, and updates use a polite live region. Reveal motion respects reduced motion.
There are no automatic turns or time limits for completing prompts.

## Validation and remaining review

Unit tests cover deck composition, shuffle, state transitions, turn order,
fourth King, pause, duplicate events, end/restart, publication and JSON-LD.
Static tests check all 78 public routes, the full HTML editorial content, links,
metadata, FAQ correspondence, unchanged ES baseline, ads/PWA isolation, and
rejection of extra or missing routes. Exact final totals and build sizes belong
in the delivery report.

Browser integration returned no available browsers; interactive desktop/mobile
visual QA remains pending. Code/HTML accessibility review and state-machine tests
do not substitute for that check. The known Spanish global 404 limitation and
future HUMAN/LEGAL REVIEW BEFORE MONETIZATION from Phase 2 still apply.

Static export continues to use `out/`; no dependencies, runtime backend or
Cloudflare services were added. Infrastructure behavior is not certified by local
artifact checks. No budgets were imposed on bundle size.

[AGENTS] Documented the eight-route EN contract, shared-shuffle invariants,
distinct game rules, anonymous setup, reducer locking and unchanged ES behavior.
