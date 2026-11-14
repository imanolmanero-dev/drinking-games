# Most Likely To EN V1

Preflight: clean main at bb65d73168c25ef096bca69093c0f7a87b6d2582, matching fetched origin/main. Branch: feat/en-most-likely-to-v1. Local review only; no push, merge or deployment.

## Product and architecture

One shared screen, 3–12 recommended adults, no player entry or digital voting. Start → prompt → spoken count to three → simultaneous pointing/naming → Next. Anyone can sit out. Skip consumes the displayed prompt; End stops early. Twenty prompts per session from one 60-prompt deck. Replay reshuffles; repetitions across sessions are allowed. No scores, winners, identities, persistence, audio, tracking or ads.

Pure reducer events carry session and index expectations. Duplicate/stale events cannot consume another prompt, including across replay. Mouse multi-click detail and held-key repeat protection supplement reducer guards. Focus moves immediately to the new heading; scroll adjusts only when its geometry falls outside the viewport.

Server page uses existing metadata, WebApplication and breadcrumb conventions. Self-canonical, unpaired, no hreflang. Registry supplies sitemap publication: 71 ES + 16 EN = 87 public URLs. Hub appends the fourth card after NHIE, King's Cup and Truth or Dare, retaining their order, metadata and responsive rules. No existing game or guide source changes.

GameSetup is reused without fields. Group/pointing SVG is decorative. New CSS is scoped beneath the EN root and game-specific classes. No shared game refactoring. Existing responsive and reduced-motion contracts apply.

## Content review

All 60 prompts reviewed individually for natural spoken English, plausible group nominations, semantic overlap and the excluded topics. Themes: everyday habits, hospitality, food, travel, music, hobbies, thoughtful friendship and playful ambition. No Spanish prompt bank imported. No Dani, intoxication, sexual pressure or serious accusations.

Removed two overlapping directions before final review: a second dance-floor prompt and a second film-observation prompt. Replaced with niche sports knowledge and choosing a picnic spot. Exact normalized duplicate checks pass; no semantic duplicates identified after review. Repeated question openings are deliberate variation within the familiar format, rather than repeated situations. No filler added beyond 60.

Optional drinking is concise: most-selected person may choose one small sip or pass; each tied person may do the same. Never per vote, carried forward or compulsory. Non-alcoholic play is equally valid.

## Validation evidence

Logic/content tests cover pool identity, length, uniqueness, deterministic shuffle, twenty-prompt boundary, next/skip idempotence, early end, terminal-state stability and cross-session stale events. Exact whole-source fixture projection admits only this route/card/style addition; negative mutation tests remain in place.

Playwright MCP checks production HTML: Start via Enter, Next/Skip double-clicks, early end, replay via Space, twenty unique prompts, completion, catalog navigation and browser Back. Geometry checks at 320×844, 390×844, 768×1024 and 1440×900 cover prompt focus, completion focus, targets and overflow. Hub artwork geometry reviewed at all four sizes; 390px setup/play/hub screenshots visually inspected. Keyboard outline and reduced motion checked. Existing three games smoke-tested through start, interaction, end, discovery and replay; King's Cup pause/resume also exercised.

Preflight archive rebuilt independently under build/mlt/mlt-baseline. Full exported comparison checks metadata, headings, links, JSON-LD and text on all 86 prior routes, projecting only the new fourth card from the hub. Baselines were not broadly regenerated.

Final results: production build exit 0; TypeScript passes; changed-file ESLint has zero errors and two existing unused-import warnings in en-blog.test.mjs. Static audit PASS, zero violations. Export suite 62/62 passes, including all 86 preflight page comparisons. New targeted tests 6/6 pass. Git diff whitespace check passes.

The preflight unit suite has 15 existing failures in historical source/report guards and Spanish editorial checks (279/294 pass). The feature branch has exactly the same failure names (283/298 pass); no new unit failures. They are retained, not repaired by this feature. See build/mlt/mlt-base-tap.log and build/mlt/mlt-unit-final.log. AGENTS.md remains unchanged: the implementation applies already documented focus, isolation and source-projection patterns without discovering a new reusable rule. No independent release audit or production deployment is claimed.
