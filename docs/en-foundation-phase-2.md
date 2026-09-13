# English foundation — Phase 2

Local foundation only. Do not merge or publish this phase alone. King's Cup must
be built on this commit before launching English. No temporary noindex is used.

## Architecture and publication

The Spanish and English route groups keep independent document roots. Spanish
URLs have no prefix; English uses `/en`, `lang="en-US"`, and Open Graph `en_US`.
`lib/i18n/routes.ts` stores conceptual IDs, explicit paths, publication state,
labels, and equivalence separately. It is a small localization registry, not a
replacement for the complete Spanish route inventory.

The seven published English pages are `/en`, `/en/games`, `/en/about`,
`/en/contact`, `/en/legal/privacy`, `/en/legal/cookies`, `/en/legal/terms`.
Future games and guides cannot produce English links, metadata, sitemap entries
or hreflang. The empty games catalog uses useful editorial text and states that
no English games are playable yet. No game rules or game pages were added.

The English shell has a server-rendered navigation, footer, language switcher and
plain anchors, with no new client components or dependencies. The language
switcher is intentionally mounted only in EN: adding it visibly to Spanish pages
would exceed the permitted Spanish metadata-only changes. It supports both
directions in isolation tests for future use.

## DELIBERATE SEO ADDITION

| Concept | Spanish | English |
| --- | --- | --- |
| home | `/` | `/en` |
| games-hub | `/juegos` | `/en/games` |
| about | `/sobre-nosotros` | `/en/about` |
| contact | `/contacto` | `/en/contact` |
| privacy | `/legal/privacidad` | `/en/legal/privacy` |
| cookies | `/legal/cookies` | `/en/legal/cookies` |

These six pairs share a page purpose, reviewed against the Spanish source. Privacy
and cookies describe each section's actual features rather than translating false
statements about ads, analytics or storage. Each pair has reciprocal, absolute,
self-referencing `es` and `en-US` alternates. There is no `x-default`.

Spanish titles, descriptions, H1s, visible copy, canonicals, social metadata, games,
ads and PWA remain unchanged. Source comparison against
`c9c1117c1fe600f756df156523f8d350dc2b2ec7` permits only the hreflang import and
addition on those six pages. Both Spanish fixtures remain unchanged.

The Spanish legal notice includes conditions of use, a broad liability disclaimer
and intellectual property provisions. English terms are narrower responsible-use
guidelines without those provisions. They are recorded as related concepts, not
translations. Terms has no hreflang; its switcher explicitly says “Spanish home”.

The existing Spanish King's Cup family includes El Rey de la Copa and Ring of
Fire. The registry records El Rey de la Copa under `kings-cup`, but declares no
English equivalence until the actual English game is reviewed. Existing Spanish
guides for two people and without cards also remain unpaired and unpublished EN.

## English metadata and assets

Each English page has its own canonical, title, description, Open Graph and
Twitter metadata. The 1200×630 English OG image is generated at build time. The
English segment layout provides its resolved descriptor to child metadata;
Next's route-group suffix and asset query are preserved rather than guessed.
The Spanish OG source is unchanged. Only WebSite JSON-LD needs a locale argument;
its default Spanish output, Game and Article schemas remain unchanged.

Sitemap contains exactly 70 ES + 7 EN URLs; no artificial EN modification dates.
The English image is an asset, not an eighth SEO page. Robots and the six 308
redirects are unchanged. Export and sitemap are checked against separate fixtures;
source files and registry publication are checked independently. Mutation tests
demonstrate rejection of missing routes, extra routes, hidden noindex documents,
false language alternates and misplaced ads.

## Privacy, contact and isolation

The public email `info@bebergames.com` comes from the existing Spanish privacy
page and ContactForm. English contact uses mailto only: no form, account, backend
or new data collection endpoint. Sending email still discloses the sender's
address and message; the page says so.

The seven valid English pages load no AdSense scripts, manual ad slots, analytics,
consent scripts, manifest, InstallPWA or Spanish AppProvider. The tests inspect
both exported HTML and its referenced JavaScript, as well as local import graphs.
No remote settings were inspected or changed. Infrastructure logging/cookie and
email retention practices are not asserted from repository evidence.

HUMAN/LEGAL REVIEW REQUIRED BEFORE MONETIZATION:

- `/en/legal/privacy`: privacy wording, infrastructure and email data handling.
- `/en/legal/cookies`: actual hosted cookies/storage and infrastructure behavior.
- `/en/legal/terms`: scope and responsible-use wording.
- CMP and applicable US-state messaging before adding English advertising.

These are delivery notes, not development notices shown on public pages.

## Limitations and validation

NON-BLOCKING: one static `404.html` means an unknown `/en/*` URL can receive the
Spanish 404, including its existing AdSense script and Spanish manifest. The
seven valid English pages remain isolated. No catch-all, Worker, Function,
middleware or other runtime was introduced. HTTP behavior on Cloudflare is not
certified by local file checks; there was no deployment or remote configuration.

The browser integration reported no available browsers. Interactive/mobile visual
QA remains pending. The generated OG image was inspected visually, and HTML,
links, IDs, fragments, copy and referenced assets were checked locally.

The build may emit metadataBase resolution warnings from file metadata before
the locale root resolves it. The exported Spanish and English social URLs are
verified as absolute production URLs. Existing Node module-type warnings in the
roulette tests are unrelated to this phase.

Static export remains compatible with Cloudflare Pages Free: publish `out/` when
the later launch is approved. No Functions, Worker runtime, KV, D1, R2 or Durable
Objects are required. Vercel rollback configuration and stash remain untouched.

Required checks: `npm test`, `npx tsc --noEmit --incremental false`,
`npm run build`, `npm run test:static-export`, `npm run audit:static-export`,
`git diff --check`. Exact final totals and artifact sizes are in the delivery.

[AGENTS] Documented the Phase 2 publication contract, independent roots,
equivalence rules, resolved OG descriptors and the global 404 limitation.
