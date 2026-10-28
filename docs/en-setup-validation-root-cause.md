# Validation blocker root cause

Base worktree 6daba04 reproduced all three failures (0/3 pass). Active branch after test-only repair: 3/3 pass. No UI or production source changed in follow-up.

## Exact failing assertions

All assert strict equality of complete LF-normalized SEO_DATA.md with git show 677b1b0:SEO_DATA.md. Expected: 2026-10-19T02:29:10.497Z, current week Oct 5-11, previous Sep 28-Oct 4; 24468 characters; SHA-256 625e90026f99ef65c9b2462d067c0ec6ea5bb09a9d7d3ef40c85fa5b5e161c76. Actual: 2026-10-26T02:23:33.169Z, current Oct 12-18, previous Oct 5-11; 23785 characters; SHA-256 2c4d394816dd261d9be07025e1ccbec507b1b2ad0516029e00867c0a5b83b9c2. Exact complete values remain accessible in Git and the local reproduction logs.

|Test file|Test name|Declaration / call|
|---|---|---|
|tests/es-verdad-o-reto-editorial.test.mjs|ES-01 changes only reviewed fragments; gameplay, inventories, EN, reporting and infrastructure remain intact|134 / 135; assertReviewedSource:31|
|tests/es-yo-nunca-rules.test.mjs|only exact Yo Nunca editorial fragments change; all other production and gameplay stays identical|163 / 166; assertReviewedSource:33|
|tests/halloween.test.mjs|preflight protection compares whole existing sources, including home and advertisements|38 / 39|

Shared assertion: tests/helpers/halloween-baseline.mjs:24 on base; :31 at feature preflight. All fail first at SEO_DATA.md, before the companion JSON comparison. The automatic base commit changes only those two reports.

## Test-only repair

Historical production comparison remains at 677b1b0. Only the exact two generated report paths compare against the pinned reviewed preflight 6daba04. No file is excluded; later edits still fail. Added tests reject report mutations, older reports and additional setup changes. Existing setup hashes and their scopes were left intact.

## Global lint

Baseline has 71 errors in 17 tracked files; active tracked errors match baseline exactly. Global lint also scans older local QA exports and scripts because ESLint ignores do not include their directories; Git ignores do not control ESLint traversal. No failing artifact was created by this setup phase. Preserve historical QA evidence and do not expand lint configuration in this feature.

### Every failing path and error location

- .playwright-mcp/alignment-base-567d779/_next/static/chunks/0cz1d0mv5g_q7.js (ignored, untracked): 1:24343 @typescript-eslint/no-this-alias, 1:32078 @typescript-eslint/no-this-alias, 1:46535 @typescript-eslint/no-this-alias, 1:81805 @typescript-eslint/no-this-alias, 1:88512 @typescript-eslint/no-this-alias, 1:100889 @typescript-eslint/no-this-alias, 1:101232 @typescript-eslint/no-this-alias, 1:101754 @typescript-eslint/no-this-alias, 1:102302 @typescript-eslint/no-this-alias, 1:102723 @typescript-eslint/no-this-alias.
- .playwright-mcp/polish-base-fd3dfbe/_next/static/chunks/0cz1d0mv5g_q7.js (ignored, untracked): 1:24343 @typescript-eslint/no-this-alias, 1:32078 @typescript-eslint/no-this-alias, 1:46535 @typescript-eslint/no-this-alias, 1:81805 @typescript-eslint/no-this-alias, 1:88512 @typescript-eslint/no-this-alias, 1:100889 @typescript-eslint/no-this-alias, 1:101232 @typescript-eslint/no-this-alias, 1:101754 @typescript-eslint/no-this-alias, 1:102302 @typescript-eslint/no-this-alias, 1:102723 @typescript-eslint/no-this-alias.
- .playwright-mcp/polish-serve.cjs (ignored, untracked): 1:14 @typescript-eslint/no-require-imports, 2:12 @typescript-eslint/no-require-imports, 3:14 @typescript-eslint/no-require-imports.
- app/(english)/en/about/page.tsx (tracked): 19:33 react/no-unescaped-entities.
- app/(english)/en/legal/cookies/page.tsx (tracked): 18:22 react/no-unescaped-entities, 18:258 react/no-unescaped-entities.
- app/(english)/en/legal/privacy/page.tsx (tracked): 20:216 react/no-unescaped-entities.
- app/(english)/en/legal/terms/page.tsx (tracked): 11:163 react/no-unescaped-entities.
- app/(spanish)/juegos/la-piramide/page.tsx (tracked): 113:7 react-hooks/set-state-in-effect, 175:9 prefer-const.
- app/(spanish)/juegos/la-ruleta/reglas/page.tsx (tracked): 100:127 react/no-unescaped-entities, 100:147 react/no-unescaped-entities, 100:194 react/no-unescaped-entities, 100:211 react/no-unescaped-entities, 105:278 react/no-unescaped-entities, 105:291 react/no-unescaped-entities, 116:234 react/no-unescaped-entities, 116:244 react/no-unescaped-entities, 119:139 react/no-unescaped-entities, 119:150 react/no-unescaped-entities.
- app/(spanish)/juegos/quien-es-mas-probable/reglas/page.tsx (tracked): 33:48 react/no-unescaped-entities, 33:63 react/no-unescaped-entities, 108:62 react/no-unescaped-entities, 108:73 react/no-unescaped-entities.
- app/(spanish)/juegos/ring-of-fire/reglas/page.tsx (tracked): 33:52 react/no-unescaped-entities, 47:158 react/no-unescaped-entities, 47:174 react/no-unescaped-entities, 104:74 react/no-unescaped-entities, 104:82 react/no-unescaped-entities, 131:147 react/no-unescaped-entities, 131:162 react/no-unescaped-entities, 134:131 react/no-unescaped-entities, 134:166 react/no-unescaped-entities, 134:170 react/no-unescaped-entities, 134:196 react/no-unescaped-entities, 150:181 react/no-unescaped-entities, 150:200 react/no-unescaped-entities.
- app/(spanish)/juegos/tabu/page.tsx (tracked): 330:90 react/no-unescaped-entities, 330:95 react/no-unescaped-entities.
- app/(spanish)/juegos/triman/reglas/page.tsx (tracked): 33:25 react/no-unescaped-entities, 33:35 react/no-unescaped-entities, 55:72 react/no-unescaped-entities, 55:87 react/no-unescaped-entities, 59:156 react/no-unescaped-entities, 59:175 react/no-unescaped-entities, 62:262 react/no-unescaped-entities, 62:264 react/no-unescaped-entities, 83:113 react/no-unescaped-entities, 83:133 react/no-unescaped-entities, 95:72 react/no-unescaped-entities, 95:81 react/no-unescaped-entities, 99:241 react/no-unescaped-entities, 99:247 react/no-unescaped-entities, 108:49 react/no-unescaped-entities, 108:64 react/no-unescaped-entities, 111:134 react/no-unescaped-entities, 111:136 react/no-unescaped-entities.
- app/(spanish)/juegos/verdad-o-reto/reglas/page.tsx (tracked): 120:119 react/no-unescaped-entities, 120:126 react/no-unescaped-entities, 120:262 react/no-unescaped-entities, 120:269 react/no-unescaped-entities, 123:103 react/no-unescaped-entities, 123:110 react/no-unescaped-entities.
- app/(spanish)/juegos/yo-nunca/reglas/page.tsx (tracked): 34:48 react/no-unescaped-entities, 34:66 react/no-unescaped-entities.
- app/(spanish)/legal/aviso-legal/page.tsx (tracked): 19:135 react/no-unescaped-entities, 19:144 react/no-unescaped-entities.
- components/ui/Confetti.tsx (tracked): 77:41 react-hooks/purity, 82:29 react-hooks/purity, 88:31 react-hooks/purity, 90:27 react-hooks/purity.
- components/ui/CookieBanner.tsx (tracked): 14:5 react-hooks/set-state-in-effect.
- components/ui/InstallPWA.tsx (tracked): 22:7 react-hooks/set-state-in-effect.
- lib/AppContext.tsx (tracked): 185:5 react-hooks/set-state-in-effect.
- output/halloween/baseline/_next/static/chunks/0cz1d0mv5g_q7.js (ignored, untracked): 1:24343 @typescript-eslint/no-this-alias, 1:32078 @typescript-eslint/no-this-alias, 1:46535 @typescript-eslint/no-this-alias, 1:81805 @typescript-eslint/no-this-alias, 1:88512 @typescript-eslint/no-this-alias, 1:100889 @typescript-eslint/no-this-alias, 1:101232 @typescript-eslint/no-this-alias, 1:101754 @typescript-eslint/no-this-alias, 1:102302 @typescript-eslint/no-this-alias, 1:102723 @typescript-eslint/no-this-alias.
- output/halloween/compare.cjs (ignored, untracked): 1:10 @typescript-eslint/no-require-imports, 1:36 @typescript-eslint/no-require-imports, 1:80 @typescript-eslint/no-require-imports.
- output/halloween/guards.cjs (ignored, untracked): 1:10 @typescript-eslint/no-require-imports, 1:51 @typescript-eslint/no-require-imports.
- output/halloween/production-qa.cjs (ignored, untracked): 1:12 @typescript-eslint/no-require-imports, 2:16 @typescript-eslint/no-require-imports, 3:1 @typescript-eslint/no-require-imports, 4:19 @typescript-eslint/no-require-imports, 5:38 @typescript-eslint/no-require-imports.
- output/halloween/server.cjs (ignored, untracked): 1:12 @typescript-eslint/no-require-imports, 1:36 @typescript-eslint/no-require-imports, 1:60 @typescript-eslint/no-require-imports.
- output/halloween/update-contracts.cjs (ignored, untracked): 1:12 @typescript-eslint/no-require-imports.

Artifacts under alignment-base-567d779, polish-base-fd3dfbe and output/halloween/baseline are older Next static-export copies. polish-serve.cjs and output/halloween/*.cjs are older local QA helper scripts. Names and prior phase records indicate provenance; exact original creator is not established by this follow-up. None deleted. Full machine-readable messages and baseline comparison remain in .playwright-mcp/shared-setup/lint-*.json.

## Final validation

Exact three tests: 3/3 PASS. Negative guard tests: 2/2 PASS. Full suite: 277/277 PASS. Typecheck and build: PASS. Static export: 53/53 PASS. Static audit: exit 0. Diff check: PASS. Global lint remains exit 1: 118 errors and 7499 warnings; 71 errors in 17 tracked baseline files, 47 in nine older QA artifact files. Error rule/line/column signatures match the detached baseline for all 17 tracked paths. Targeted follow-up lint: PASS. No production/UI source changed, so Playwright was not repeated. Both reports have no Git diff. Temporary detached worktree and dependency junction were removed; active worktree remains intact. No disposable feature-created lint artifact qualified for deletion. No configured CI lint gate was found (only SEO automation workflow); local validation is still not fully green and this investigation does not waive baseline lint for integration.
