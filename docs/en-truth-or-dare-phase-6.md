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
