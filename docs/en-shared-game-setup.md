# EN shared game setup consolidation

Status: implemented locally, uncommitted; independent review pending. Base: 6daba04c3283437f36eb7e3eb5e948a5225e2011. Branch: feat/en-shared-game-setup.

GameSetup owns artwork, introduction, facts, fields, primary CTA and supporting note. The parent owns the focus heading. PlayerCountField supplies the shared native 2-12 selector. Optional children preserve Truth or Dare categories; King's Cup has no extra fields. Existing artwork, reducers, prompt data, routes, metadata and Spanish sources are unchanged.

The updated en-game-design-system.md supersedes the old setup exceptions. The historical source guard verifies SHA-256 hashes of the three exact authorized production changes before projecting their pinned preflight sources into the older guard. Other source edits remain detectable; SEO reports are neither excluded nor changed.

## QA

Playwright MCP checked the local production export at 320, 390, 768 and 1440 px. Both native player selects accept 12, Party selection works, Start opens the correct first gameplay state and focuses the existing game heading. No horizontal overflow in setup or initial gameplay. Both selectors are 48 px high with 18 px values; both Start buttons are 56 px high. Screenshots of both setups at all four widths were visually reviewed: distinct artwork, matching fields/CTA/notes, readable wrapping.

At 390 px King's Cup Start is approximately 964 px from page top versus 1285 px in the preceding production audit (321 px reduction). Truth or Dare with Party selected is approximately 1023 px. Exact vertical position depends on category copy and font metrics.

## Validation

Build, typecheck, targeted lint and 53 static-export tests pass. Static export audit reports 82 pages and sitemap URLs. The three historical report-snapshot failures were reproduced on detached base main and repaired in test-only scope; the full suite now passes. See en-setup-validation-root-cause.md. Global lint fails with 71 pre-existing errors in 17 tracked files plus 47 errors in older local QA artifacts. The same tracked rule/location failures reproduce on base main. No feature lint errors were found. No broad ignore/configuration changes made in this UI phase. These validation limitations must remain explicit; do not label the full validation suite PASS.

No stage, commit, push, merge or deployment. Independent review must evaluate the exact guard update as well as UI changes.
