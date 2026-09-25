# Phase 6 — English Truth or Dare

Status: **IMPLEMENTED LOCALLY / NOT DEPLOYED**. Base: `c6cb339088b39cf654ea354d7640c6f62a7f4099`. Implementation branch: `feat/en-truth-or-dare-phase-6`. An independent audit is required before any push or integration.

## Objective and scope

Publish one more English game route, `/en/games/truth-or-dare`, and improve discovery in `/en`, `/en/games`, King's Cup, and the existing two-person guide. The target inventory is **70 ES + 10 EN = 80** public pages and sitemap URLs. No new guide, category, blog hub, rules route, backend, account, storage, dependency, or English advertising is part of this phase. Spanish pages and fixtures remain unchanged.

## Architecture and reuse

The new route is a Server Component with static instructions, metadata, links, and the existing `GameJsonLd` configured for `en-US`. `TruthOrDareGame.tsx` is its only client island. `lib/games/truth-or-dare.ts` contains the pure transitions and uses the existing `lib/games/shuffle.ts`; the 30 Truth and 30 Dare prompts are in `lib/data/truth-or-dare-prompts.ts`. Each set is shuffled separately, consumed once, and disabled when exhausted. Skip and Next each advance one turn. Finishing ends the session; Play again creates fresh shuffled sets with the same player count. Reload starts a new session.

The Spanish page, prompts, AppProvider, recent-player storage, audio, vibration, intensity selector, GameLayout, and manual AdSense unit are not reused. English pages remain outside the Spanish provider, advertising, CMP, Analytics, and PWA dependency graph.

## Editorial and SEO decisions

Truth or Dare EN supports 2–12 numbered players, one shared screen, one mode, penalty-free passing, and optional alcohol. The 60 English prompts were written for a pair or group without forced contact, outside messages, private disclosures, or risky actions. The ES game has different player setup, intensity levels, and penalties. The registry therefore publishes the EN route as **KEEP UNPAIRED**; its language selector points to Spanish home. The existing six reciprocal hreflang pairs stay unchanged.

Intent remains divided: `/en` introduces BeberGames and party games; `/en/games` compares the available online games; `/en/games/truth-or-dare` serves people ready to play; `/en/blog/drinking-games-for-2` remains an editorial selection. The home H1 is `Party games with friends`, with `Good company. Your pace.` nearby. Hub cards show description, 2–12 players, setup, one shared screen, and a play CTA. Contextual links connect the two games and the guide.

## Changed files

New: the route, EN client, reducer, prompt data, unit and static export tests, and this document. Updated: EN registry, home, games hub, King's Cup, two-person guide, scoped English CSS, EN route fixture, EN unit/export expectations, export audit count, and AGENTS.md. The existing Phase 5 unit test also updates its historical fixture comparison for the new route and home H1.

## Acceptance and validation

The game must preserve exact 30+30 prompt counts, independent exhaustion, one-step turns, duplicate-action safety, voluntary finish, restart, accessible controls, and responsive layout. The export must show one H1, a self canonical, EN `WebApplication`, useful static rules, resolved links, no hreflang for this game, 10 EN routes, 80 sitemap URLs, and the original 70 ES pages. English advertising and provider isolation must pass. Unit tests, typegen, TypeScript, build, static export tests, audit, ES baseline comparison, and diff review are the local gates. Visual QA at 320, 390, 768, and 1440 pixels belongs to a separate audit step.

## Local validation result

The new targeted unit tests passed (8/8). The complete unit suite passed (87/87), `next typegen` and TypeScript passed, and `npm run build` exported the new route. Static export tests passed (38/38) and the export audit returned `PASS` with 70 ES, 10 EN, and 80 sitemap URLs. The new URL occurs once and six hreflang pairs remain. All 70 ES HTML documents matched the pre-Phase-6 local export in title, metadata, headings, links, JSON-LD, and visible text. Home, hub, guide, and King's Cup kept byte-identical loaded JavaScript; the new game adds one route-specific script. Changed Phase 6 source files passed targeted ESLint.

Repository-wide `npm run lint` still reports existing errors in unrelated ES components, legal pages, and UI utilities; the Phase 6 files listed in the targeted lint command passed. Visual QA and the independent audit remain pending. This document does not claim production publication.

## Visual polish — Direction B, balanced redesign

Local polish validation completed on **2026-09-25** on `feat/en-truth-or-dare-visual-polish`, based on `fd3dfbebd40a3cfeb431b09ddbe133bf1d57e823`. This section supersedes the pending visual QA statement above for the polish. An independent visual and technical audit of the completed commit is still required before any push or integration. No push, merge, deployment, or production configuration change was performed.

### Recovered state and resumed work

Recovery found HEAD still at the base, seven modified tracked files, one untracked UI test, and an empty index. No polish commit existed. The recovered changes already implemented the dedicated artwork, wider and separated hub cards, optional header decoration, revised setup, bounded player stepper with native select, strong choices, prompt/action hierarchy, end state, and singular microcopy. All eight files belonged to the requested polish; no implementation was discarded or rewritten.

Previous local evidence in `.playwright-mcp/` included the `polish-base-fd3dfbe` export, the comparison script/result, and screenshots for all four Truth or Dare sizes plus hub and King's Cup. The previous comparison recorded zero ES differences. There were no retained unit/type/build command logs attributable to this polish. Recovery therefore completed those checks, refreshed the export comparison, reviewed the existing screenshots, and checked live interactions/layout with the **Playwright MCP server only**. Resumed tracked changes were limited to this validation record.

### Presentation and invariants

- Truth or Dare has static `?` / `!` artwork and a compact decorative mark. King's Cup retains its cards and crown. Decoration is `aria-hidden`; the optional `headerDecoration` prop is only used on Truth or Dare.
- Hub cards have a measured 24 px vertical gap, 1,072 px desktop width at a 1,440 px viewport, and 350 px width at a 390 px viewport. Artwork is smaller on mobile.
- Setup separates `60 prompts`, `No materials`, and `One shared screen` from the player control. The large player number sits between named decrement/increment buttons and keeps a labelled native select with `2–12 players` as its accessible description.
- Truth and Dare each have a label, symbol, and remaining count. Prompt text carries the strongest reading emphasis. Next and Play again are primary; Skip remains clearly available, and End game / Change players have lower emphasis.
- The end message uses `after 1 prompt` and plural `prompts` for zero or multiple prompts.

Reducer, prompt data, shuffle, rules, turn progression, skip, finish, restart, exhaustion, no-repeat behavior, routing, SEO, and all Spanish sources remain unchanged. No dependency, storage, audio, vibration, advertising, CMP, Analytics, PWA, or provider was added. Existing architecture rules already cover the decorative artwork and EN CSS scope, so AGENTS.md did not need a new architecture rule.

### Validation evidence

| Check | Result | Local evidence |
| --- | --- | --- |
| Targeted reducer and UI tests | PASS, 11/11 | `build/polish-resumed-targeted.log` |
| `npm test` | PASS, 90/90 | `build/polish-resumed-unit.log` |
| `next typegen` | PASS | `build/polish-resumed-typegen.log` |
| TypeScript | PASS | `build/polish-resumed-typescript.log` |
| `npm run build` | PASS | `build/polish-resumed-build.log` |
| Static export tests | PASS, 40/40 | `build/polish-resumed-export.log` |
| Static export audit | PASS, no violations | `build/polish-resumed-audit.log` |
| Targeted ESLint | PASS | All changed TSX and test files |
| `git diff --check` | PASS | Recovery session command output |
| ES / EN comparison | PASS, zero differences | `.playwright-mcp/polish-comparison.json` |

The first resumed build could not download Google Fonts inside the sandbox. The authorized build with network access passed without source changes. This was an environment failure, not a product defect.

The export retains **70 ES + 10 EN pages, 80 sitemap URLs, six reciprocal hreflang pairs, and unpaired Truth or Dare**. All 70 ES pages match the recovered base in titles, metadata, headings, links, JSON-LD, and visible text. All 10 EN pages retain metadata, headings, links, and JSON-LD; the EN text comparison excludes decorative content and the intentionally revised game UI. Existing fixtures were not changed. EN isolation tests pass.

### Responsive and accessibility QA

Truth or Dare setup, choices, Truth/Dare prompts, and final state were checked at **320×844, 390×844, 768×1024, and 1440×900**. Hub and King's Cup were checked at 390 and 1440 px. Screenshots show no clipping or unintended overlaps; live measurements found no horizontal page overflow or overflowing game content at any checked size. All measured game controls meet the 44×44 px minimum, with primary controls and stepper buttons at least 48 px high.

Playwright verified the native selector with keyboard arrows/Home and Tab, button activation with Enter, visible 2 px focus outlines, named decrement/increment controls, actual disabled bounds at 2 and 12, and one-step count updates. Phase and turn changes continue focusing `tod-game-heading`. Skip and Next each advance exactly one player. Exhausting Truth in the browser showed 30 unique prompts, a genuinely disabled Truth button, and an enabled Dare button. The exhausted choice remains in place with a count and dashed border; choices do not depend on color alone. Restart and Change players retain their existing behavior. Browser console: zero errors and warnings in the resumed QA session. This is browser/keyboard QA, not a claim of screen-reader certification.

### Screenshots and performance

Recovered and reviewed screenshots are preserved under `.playwright-mcp/`: `polish-tod-{setup,setup-card,choice,prompt,end}-{320,390,768,1440}.png`, `polish-hub-cards-{390,1440}.png`, and `polish-kings-cup-playing-{390,1440}.png`. New evidence includes `polish-resumed-hero-390.png`, `polish-resumed-exhausted-390.png`, and `polish-resumed-kings-setup-{390,1440}.png`. These are local QA artifacts, not shipped site assets.

Home, hub, and the two-person guide load byte-identical JavaScript compared with the base and do not load TruthOrDareGame. Truth or Dare adds 2,745 raw bytes / 652 gzip bytes across its loaded scripts. King's Cup adds 273 raw bytes / 53 gzip bytes while still excluding the Truth or Dare client. Static decorative markup and the bounded stepper introduce no new client entry or service. The small bundle changes are informational, with no new functional subsystem.

### Verdict and handoff

**Visual verdict: PASS. Integration readiness: READY for independent audit.** No BLOCKER, SHOULD FIX, or MINOR finding remains from local validation. INFO: the small script-size changes above and the sandbox font-download retry. The independent audit remains a gate before push/integration; local PASS does not authorize publication. Next action: perform an independent visual and technical audit of the completed polish commit before any push.
