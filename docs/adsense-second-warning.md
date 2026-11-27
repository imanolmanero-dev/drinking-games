# Second AdSense warning · owner decision record

Incident date 24 November 2026. Production HTML inspected 25 November against the published 1cd2964 export. Counts refer to URLs, not traffic or income. Only the owner’s three Policy Center entries establish an active restriction. Editorial priorities below are our assessment.

## Batch 3C · Group parties, hosting and video calls

The preflight matched local and remote main to `6d184424c2c242b996b2c3bda2362d76b721c6c3`. Cloudflare Pages reported a successful production check for that SHA. The editorial correction is `e736d2f8d73e6f87d231fde8021dfc31cf5f76b7`.

| Article | Findings addressed and playable outcomes | Preserved inventory |
|---|---|---|
| [/blog/juegos-para-botellon](https://bebergames.com/blog/juegos-para-botellon) | Removed refusal and guessing drinks, the Flunkyball consumption race, and drinking from Flip Cup and the forbidden-word game. The outdoor target earns points, the relay flips empty cups, and word rounds use records, turns or points. | All 15 games and numbering, including both outdoor team games. |
| [/blog/como-organizar-fiesta-juegos-beber](https://bebergames.com/blog/como-organizar-fiesta-juegos-beber) | Replaced all-night forbidden-word drinking with three tokens in a ten-minute round. Removed per-person beer quantities, escalating wheel penalties, karaoke and story penalties. The schedule keeps distinct arrival, group, tournament and closing games, with water targets and drinks kept separate. | All 16 distinct activity ideas across the same four stages, plus all 12 digital kit entries. |
| [/blog/juegos-para-cumpleanos-adultos](https://bebergames.com/blog/juegos-para-cumpleanos-adultos) | Replaced drinking assigned to the celebrant or speaker with optional finger responses and anecdotes. The paper draw and wheel of wishes are voluntary tabletop variants. Linked digital games use their current mechanics. | All 12 ideas and numbering, including the three birthday adaptations. |
| [/blog/juegos-para-previas](https://bebergames.com/blog/juegos-para-previas) | Replaced compulsory Yo Nunca drinking with an optional finger response, removed drink quotas, and corrected Rey de la Copa and Verdad o Reto descriptions. Game selection follows group size and time available. | Nine games across the three phases, plus all 13 digital links. The old intro claimed 12 for the existing 13-item list. |
| [/blog/juegos-para-beber-por-videollamada](https://bebergames.com/blog/juegos-para-beber-por-videollamada) | Replaced individual and group drinking for errors or film cues with predictions, scoring and turn changes. Removed the private screenshot and drinking challenge. Camera use is optional, and the host runs the shared game from one browser. | All eight games and numbering, the remote setup advice and platform section. |

Four heading labels changed while retaining their positions, levels and existing ID attributes. “Juegos Sin Materiales (Solo hablar y beber)” became “Juegos Sin Materiales”, “9. La Ruleta del Castigo” became “9. La Ruleta”, “13. La Carrera de Tragos” became “13. La Carrera de Vasos”, and “11. El Reto del Shot de Cumpleaños” became “11. El Reto Sorpresa de Cumpleaños”. Two inline party-plan labels now describe optional anecdotes and a fresh closing round. All five titles, H1s, canonicals, dates, language alternates and internal link destinations are preserved. The five excerpts feed the index, metadata, Open Graph and Article schema. The four existing FAQ sections still contain 13 questions total and use the same answers as FAQPage. The video-call guide continues without a FAQ.

### Release validation

The production build, TypeScript, changed-file ESLint and export audit passed. All 97 export tests passed with zero skips, including six Batch 3C tests and both historical preservation comparisons. The full unit run passed 297 tests and reproduced all 14 prior failures with the same names, messages, expected and actual payloads, and assertion operators. The 87-route export comparison identified changes on the five articles and index only. The sitemap, the 13 game and rules pairs, earlier article releases, Questions, the Beer Pong re-rack paragraph, Quarters and Power Hour FAQ, and the exact experimental Truth or Dare meta description are preserved.

Playwright MCP passed 12 article and index viewport checks at 390×844 and 1440×900 with third-party requests blocked. The five index cards opened the intended articles. The tested pages had zero horizontal overflow and uncaught exceptions, and FAQ answers matched the visible text. The release closes the five previously identified independent P0 content findings once the exact SHA and HTML are verified in production. The previous releases below record Batch 3A, 3B, 2C and the question-guide corrections. Batch 2B shipped at `1cd2964` after the earlier Verdad o Reto, Ruleta, La Bomba, Ring of Fire, Rey de la Copa and guide corrections.

### Content inventory and account status

- **Identified P0 findings.** Batch 3C completes the editorial corrections in the recorded current inventory. This is limited to the identified findings.
- **Google restrictions.** The latest supplied account snapshot lists Questions (33 restricted requests), the adult Yo Nunca guide (2) and the blog index (1). The previously restricted Drinking Games guide remains a reported temporary exclusion. The second site-wide warning is still open. Current classifications and the complete account exclusion list require an owner snapshot.
- **Advertiser sensitivity.** Alcohol-related game names and queries, adult prompts and older category and rules wording can warrant advertiser review. The historical P1 notes below remain unverified as current findings. Technical containment stays paused due to the Google CMP dependency.
- **Independent audit.** Still pending. Review the current Policy Center snapshot, all live ES and EN content and gameplay, visible rules, FAQ and schema, card and cross-link copy, age-sensitive prompts and placement eligibility before any restoration decision. Keep ad architecture and account settings frozen during this release.

### Consolidated exclusion-restoration register

These 45 exact paths on https://bebergames.com cover the 37 recommended B paths and eight additional paths affected only by the optional C blog-section proposal. Options A, B and C are historical proposals. The owner reports applying some temporary exclusions, and the exact account entries require reconciliation. The register lists restoration candidates and holds, independent of serving status.

Every row marked **R** requires the exact production deployment and URL checks to pass, independent editorial and placement review, a dated owner snapshot to confirm the entry is incident-only, and explicit owner authorization. **Policy Center** adds verification of the URL’s current classification. **Permanent review** requires distinguishing any incident-only entry from an established game exclusion. **Section** requires reconciling the entire blog prefix with the owner before considering changes. No exclusion is changed as part of this batch.

Production evidence codes are **E** for the earlier published guide in the incident capture, **Q** for the published question-guide release and recorded checks, **2C**, **3A** and **3B** for the verified prior batches, **S** for the historical incident scan without independent outstanding P0, and **3C** for local verification at the release gate. Exact-SHA release evidence and per-URL checks for Batch 3C are captured separately after deployment.

| Exact path | Historical scope | Original finding | Remediation commit(s) | Production evidence | Prerequisites | Permanent exclusion |
|---|---|---|---|---|---|---|
| /blog | A, B, C | One of 32 excerpts promises universal drinking and intimate disclosures. | be778c9 | Q | R + Policy Center | None documented. Verify with owner. |
| /blog/drinking-games-reglas | A, B, C | Earlier drinking outcomes already corrected at incident capture. Quarters and Power Hour FAQ later aligned. | 9a06b8a + 4eef174 | E | R + Policy Center | None documented. Verify with owner. |
| /juegos/categorias/preguntas | A, B, C | Four corrected game cards. Two linked articles still have the old instructions in production. | b974a27 + ccc65fc + 59150eb | Q | R + Policy Center | None documented. Verify with owner. |
| /juegos/verdad-o-reto | B, C | The game permits passing. The related Yo Nunca link still states “el que lo haya hecho bebe” (page.tsx, line 324). | 8428252 | Q | R + permanent review | Retain any pre-existing permanent game exclusion. |
| /blog/100-preguntas-yo-nunca | B, C | Production requires the lone respondent to tell the story. | 59150eb | Q | R | None documented. Verify with owner. |
| /blog/beer-pong-reglas-completas | B, C | Losing team drinks the winner’s remaining cups. | a6942c4 | 2C | R | None documented. Verify with owner. |
| /blog/como-organizar-fiesta-juegos-beber | B, C | A forbidden word accumulates penalties throughout the night. | e736d2f | 3C | R | None documented. Verify with owner. |
| /blog/juegos-beber-baraja-espanola | B, C | Failed matches cost drinks and a dealer result makes the table drink. | d3816ed | 3A | R | None documented. Verify with owner. |
| /blog/juegos-de-mesa-para-beber | B, C | Losing territory or landing on a square requires finishing a glass. | d3816ed | 3A | R | None documented. Verify with owner. |
| /blog/juegos-para-beber-con-cartas | B, C | Lowest card drinks the entire stake. | d3816ed | 3A | R | None documented. Verify with owner. |
| /blog/juegos-para-beber-con-dados | B, C | Six matching dice assign six drinks to other players. | d3816ed | 3A | R | None documented. Verify with owner. |
| /blog/juegos-para-beber-dos-personas | B, C | Declining a truth or dare doubles the drinks. | 6d18442 | 3B | R | None documented. Verify with owner. |
| /blog/juegos-para-beber-en-pareja | B, C | A failed guess assigns two drinks, a forbidden word assigns another. | 6d18442 | 3B | R | None documented. Verify with owner. |
| /blog/juegos-para-beber-por-videollamada | B, C | Wrong guesses require drinking, sometimes for the whole group. | e736d2f | 3C | R | None documented. Verify with owner. |
| /blog/juegos-para-beber-rapidos | B, C | Offers shots for matched gazes and makes the loser drink. | d3816ed | 3A | R | None documented. Verify with owner. |
| /blog/juegos-para-beber-sin-alcohol | B, C | Mixed-group instructions assign two alcoholic drinks, refusal can require hot sauce. | 6d18442 | 3B | R | None documented. Verify with owner. |
| /blog/juegos-para-botellon | B, C | Verdad o Reto refusal assigned drinking. Flunkyball and the Flip Cup relay rewarded finishing a drink. | e736d2f | 3C | R | None documented. Verify with owner. |
| /blog/juegos-para-cumpleanos-adultos | B, C | Medusa eye-contact penalty was already fixed. Birthday Yo Nunca still assigned a drink to the celebrant or speaker. | 9ca459c + e736d2f | 3C | R | None documented. Verify with owner. |
| /blog/juegos-para-previas | B, C | Players who have done the named activity drink. | e736d2f | 3C | R | None documented. Verify with owner. |
| /blog/los-20-mejores-juegos | B, C | Power Hour prescribes a shot every minute for 60 minutes. | d3816ed | 3A | R | None documented. Verify with owner. |
| /blog/medusa-juego-beber | B, C | Blinking costs a full glass and a late shout doubles drinks. | 9ca459c + 7a14075 | 2C | R | None documented. Verify with owner. |
| /blog/preguntas-picantes-verdad-o-reto | B, C | Production imposes a fondo blanco for refusal and compulsory dares. | 59150eb | Q | R | None documented. Verify with owner. |
| /blog/preguntas-yo-nunca-parejas | B, C | No shared experience penalizes the speaker with a drink. | 6d18442 | 3B | R | None documented. Verify with owner. |
| /blog/retos-para-fiestas | B, C | Refusal costs three drinks and one failed dare costs a full glass. | 6d18442 | 3B | R | None documented. Verify with owner. |
| /blog/tabu-juego-beber | B, C | A forbidden word makes the team drink. | fc932c4 + 7a14075 | 2C | R | None documented. Verify with owner. |
| /blog/verdad-o-reto-preguntas-buenas | B, C | Group disbelief doubles the speaker’s drinks. | 6d18442 | 3B | R | None documented. Verify with owner. |
| /blog/yo-nunca-preguntas-picantes-18 | B, C | Promises heavy drinking and makes all affirmative respondents drink. | be778c9 + 8428252 | Q | R + Policy Center | None documented. Verify with owner. |
| /juegos | B, C | The catalogue tells the whole Tabú team to drink. | 7a14075 | 2C | R | None documented. Verify with owner. |
| /juegos/beer-pong | B, C | Loss requires drinking remaining cups. | a6942c4 + 912e3a6 | 2C | R + permanent review | Retain any pre-existing permanent game exclusion. |
| /juegos/beer-pong/reglas | B, C | Loss requires drinking remaining cups. | a6942c4 | 2C | R | None documented. Verify with owner. |
| /juegos/medusa | B, C | Reaction speed determines a double drink. | 9ca459c + 912e3a6 | 2C | R + permanent review | Retain any pre-existing permanent game exclusion. |
| /juegos/medusa/reglas | B, C | Reaction speed determines a double drink. | 9ca459c | 2C | R | None documented. Verify with owner. |
| /juegos/tabu | B, C | A forbidden word assigns drinks to the team. | fc932c4 + 912e3a6 | 2C | R + permanent review | Retain any pre-existing permanent game exclusion. |
| /juegos/tabu/reglas | B, C | A forbidden word assigns drinks to the team. | fc932c4 + 7a14075 | 2C | R | None documented. Verify with owner. |
| /juegos/categorias/sin-materiales | B, C | The Medusa card says “Si os cruzáis la mirada… ¡MEDUSA! A beber.” (category page.tsx, line 20). | 7a14075 | 2C | R | None documented. Verify with owner. |
| /juegos/yo-nunca | B, C | Visible play permits passing. WebApplication says affirmative respondents drink (components/layout/GameLayout.tsx, line 24). | 8428252 | Q | R + permanent review | Retain any pre-existing permanent game exclusion. |
| /juegos/yo-nunca/reglas | B, C | The rules inherit the same compulsory WebApplication description from GameLayout.tsx, line 24. | 8428252 | Q | R | None documented. Verify with owner. |
| /blog/juegos-para-beber-sin-cartas | C | No independent finding recorded after earlier guide corrections. | 9a06b8a | S | R + section | None documented. Verify with owner. |
| /blog/la-bomba-juego-beber | C | Earlier timed-loss drinking rule corrected. No independent P0 at the incident review. | 3619f45 + b7fc2d7 | S | R + section | None documented. Verify with owner. |
| /blog/la-piramide-juego-beber | C | Earlier card claims assigned drinking. No independent P0 at the incident review. | d70f95f | S | R + section | None documented. Verify with owner. |
| /blog/preguntas-quien-es-mas-probable | C | Earlier votes assigned drinking per nomination. No independent P0 at the incident review. | 13cae56 | S | R + section | None documented. Verify with owner. |
| /blog/reglas-del-yo-nunca | C | No affirmative misuse instruction identified in the incident review. | — | S | R + section | None documented. Verify with owner. |
| /blog/rey-de-la-copa-reglas | C | Earlier central cup and cross-link rules were corrected. No independent P0 at the incident review. | 961fc9b + d70f95f | S | R + section | None documented. Verify with owner. |
| /blog/ring-of-fire-reglas-cartas | C | Earlier card actions and cup outcomes were corrected. No independent P0 at the incident review. | cb2f158 | S | R + section | None documented. Verify with owner. |
| /blog/yo-prefiero-preguntas | C | Earlier minority-vote drinking outcome corrected. No independent P0 at the incident review. | ccc65fc | S | R + section | None documented. Verify with owner. |

## Batch 3B · Refusal, disclosure and couple games

Batch 3A went live at `d3816ed54d2499ebd8002c14033d22d8c7c8489e` on November 25 at 22:55:46 UTC. Batch 3B covers the six articles below. All 13 Spanish games, their rules, earlier editorial remediations and the English product stay in place.

| Corrected URL | Finding addressed and outcome | Inventory |
|---|---|---|
| https://bebergames.com/blog/retos-para-fiestas | Refusal and failure assigned drinks or a full glass. Several dares required private messages, account access, physical contact or food consumption. The revised challenges use voluntary in-room performance, wordplay and fictional scenarios. | 55 dares in the original three levels and numbering. |
| https://bebergames.com/blog/juegos-para-beber-dos-personas | Refusing Truth or Dare doubled the drinks. Coin, card, trivia and music rounds also assigned drinking. They use points, alternate turns or a free pass. The two-player Truth or Dare variant is played at the table. | 10 games. |
| https://bebergames.com/blog/juegos-para-beber-en-pareja | Wrong guesses, ties and forbidden words assigned drinks. Yo Nunca required drinking and invited full stories. Guessing uses points and a fixed turn count. Stories, gestures and activities from the wheel are optional. | 7 games. |
| https://bebergames.com/blog/verdad-o-reto-preguntas-buenas | A disbelief vote doubled drinks, passes were limited and some dares accessed private accounts or contacted outsiders. Anyone can pass any card, leave a reply unchecked and use fictional prompts. | 45 questions and 35 dares across three levels. The old excerpt incorrectly said 40 and 40. |
| https://bebergames.com/blog/preguntas-yo-nunca-parejas | An empty response penalized the reader and the instructions pressured players to disclose a full story. Players can respond with an optional gesture, share voluntarily or move on. | All 50 numbered statements verbatim across four blocks. |
| https://bebergames.com/blog/juegos-para-beber-sin-alcohol | Refusing could require hot sauce or another penalty, and mixed-group rules assigned alcoholic drinks. Turns and outcomes now work independently of anyone's food or drink choices. | 10 games. |

### Reviewed title and prompt differences

The party-challenge title and H1 changed from “Retos para Fiestas: 55 Desafíos Épicos que Nadie Rechazará” to “Retos para Fiestas: 55 Desafíos Divertidos por Nivel”. The previous promise contradicted free refusal. The route, canonical, date and numbering remain the same. The public title keeps the `| BeberGames` suffix. All other article titles and H1s are preserved.

The [reviewed inventory](../tests/fixtures/editorial-batch-3b-inventory.json) records the exact old and new text for 48 changed party dares, 39 changed Truth or Dare prompts and eight revised section headings. The replacements address drinking consequences, exposing private material, involving third parties, unwanted contact or unsafe tasks. Section depth, order and heading IDs are preserved. Revised FAQ answers share one source with their structured data. The two articles without an existing FAQ continue without one.

### Batch 3B validation

All 91 static export tests passed, including seven Batch 3B checks and both historical preservation comparisons. The complete unit suite passed 297 tests and reproduced all 14 historical failures with identical names and assertion payloads. TypeScript, the production build, static audit and whitespace checks passed. Changed-file ESLint reported zero errors and two existing unused-import warnings.

Playwright passed all fourteen article and index checks at 390×844 and 1440×900 with third-party requests blocked. The export comparison against Batch 3A found changes only on the six article routes and the blog index. All 87 route destinations, the sitemap, editorial dates, canonicals, heading IDs and language alternates were preserved. The party-challenge title and H1 are the sole reviewed title change.

The current Batch 3C record above tracks the five independent P0 articles that remained after this release.

## Batch 3A · Historical release record

Batch 2C went live at `75c305389cc8a560b62e6d0ef5d81af17efacf67` on November 25 at 22:31:38 UTC. All 13 Spanish games and their companion rules were verified in production. The account warning and the status of temporary exclusions are separate from these editorial releases.

| Corrected URL | Finding addressed | Revised outcome |
|---|---|---|
| https://bebergames.com/blog/los-20-mejores-juegos | Power Hour scheduled a drink each minute. Other games tied drinking to finishing, losing or learning a private question. | Recognize songs as the playlist advances. The other games use empty cups, water, points, turn changes or voluntary responses. All 20 remain. |
| https://bebergames.com/blog/juegos-para-beber-rapidos | Coin guesses assigned accumulated or doubled drinks. Timed games and referrals also required drinking. | Players bank points or provisional tokens. Timers apply to answers, gestures and round length. All eight remain. |
| https://bebergames.com/blog/juegos-de-mesa-para-beber | Defeats, board spaces and mistakes could require finishing glasses. | Preserve each board game's pieces and core mechanics, with shorter goals or scores where appropriate. All 12 remain. |
| https://bebergames.com/blog/juegos-para-beber-con-dados | Six matching dice assigned drinks. Other outcomes assigned double or prolonged drinking. | Combinations score points, rachas earn tokens and losing a Dudo challenge costs a die. Dice counts and Triman's digital rules are preserved. All eight remain. |
| https://bebergames.com/blog/juegos-para-beber-con-cartas | The lowest card owed the whole drinking stake, and other rounds punished failure or passing. | Stakes use tokens. Players can pass questions or challenges freely. Preserve the French deck, twelve game sections and all twelve navigation anchors. |
| https://bebergames.com/blog/juegos-beber-baraja-espanola | Failed matches cost drinks and a banker's exact score made the whole table drink. | Keep the 40-card deck, pair discards, original ranks, dealing and capture rules. The banker's result settles the card hand. All five remain. |

These six URLs are future exclusion restoration candidates after live verification and owner review. Maintain any existing exclusions. The current account exclusions and any change in Google classification remain unverified. The site-wide warning remains unresolved. Technical containment remains paused because of its CMP dependency.

### Batch 3A validation

The production build, TypeScript, changed-file ESLint, static export audit and whitespace check passed. All 84 static export tests passed, including the two historical preservation comparisons and seven Batch 3A checks. The full unit run passed 297 tests. All 14 failures matched Batch 2C by name and assertion payload. The existing failure on the French card article counts Markdown headings even though its twelve preserved anchors are HTML headings. The new exported inventory test checks all twelve actual sections.

Playwright checked the six articles and blog index at 390×844 and 1440×900 with third-party requests blocked. All fourteen combinations passed, with visible FAQs matching their schema, no uncaught JavaScript exceptions and no horizontal overflow. A comparison against the Batch 2C export preserved all 87 routes, titles, H1s, published dates, canonical links, heading IDs, language alternates and existing destinations. The selection on the home page and index cards reflect the new excerpts and derived reading times. The Top 20 article also links to the existing music variant in the Drinking Games guide.

### Independent P0 articles recorded after Batch 3A

Keep the existing B/C temporary exclusion recommendation for all eleven URLs until editorial fixes are live and reviewed by the owner. These are recommendations, not verified account entries.

**Batch 3B · Refusal and disclosure penalties**

- https://bebergames.com/blog/retos-para-fiestas — refusal and failed challenges cost drinks.
- https://bebergames.com/blog/juegos-para-beber-dos-personas — declining a truth or dare doubles the drinks.
- https://bebergames.com/blog/juegos-para-beber-en-pareja — failed guesses and forbidden words assign drinks.
- https://bebergames.com/blog/verdad-o-reto-preguntas-buenas — group disbelief doubles drinks.
- https://bebergames.com/blog/preguntas-yo-nunca-parejas — the speaker drinks when nobody shares the experience.
- https://bebergames.com/blog/juegos-para-beber-sin-alcohol — refusal can require hot sauce and mixed groups are instructed to consume two drinks.

**Batch 3C · Group and party instructions**

- https://bebergames.com/blog/juegos-para-botellon — refusal costs a drink and the guide includes a drinking race.
- https://bebergames.com/blog/como-organizar-fiesta-juegos-beber — saying a forbidden word triggers drinking throughout the night.
- https://bebergames.com/blog/juegos-para-cumpleanos-adultos — birthday Yo Nunca assigns drinks to the celebrant or the person who proposed the statement.
- https://bebergames.com/blog/juegos-para-previas — Yo Nunca makes everyone who has done the named activity drink.
- https://bebergames.com/blog/juegos-para-beber-por-videollamada — incorrect guesses can make individuals or the whole group drink.

## Batch 2C · Historical local release candidate, November 25

Production remains at 6dba763. The owner's November 25 snapshot supersedes the historical figures below. The three restricted pages are https://bebergames.com/juegos/categorias/preguntas (33 requests), https://bebergames.com/blog/yo-nunca-preguntas-picantes-18 (2) and https://bebergames.com/blog (1). The previously restricted https://bebergames.com/blog/drinking-games-reglas remains a temporary exclusion. The site-wide warning is unresolved. Current account settings have not been independently verified.

The candidate addresses the three remaining game mechanics in the 13-game review. The targets are water cups, a freeze pose on eye contact, and discarding a word card on an invalid clue. Each game and its rules share the existing canonical route structure. Reviewed companion articles are https://bebergames.com/blog/beer-pong-reglas-completas, https://bebergames.com/blog/medusa-juego-beber and https://bebergames.com/blog/tabu-juego-beber. The Games catalogue and the Sin Materiales category now describe the revised outcomes. The catalogue also carried stale Yo Nunca, Verdad o Reto and Ruleta instructions, corrected here. No new hub or category P0 remains from these referrals. The Questions restriction stays open independently.

Of the 28 outstanding editorial P0 URLs in the revised inventory at local commit 190a826, eleven have candidate fixes (three games, three rules, three articles, hub and category). Treat these as future restoration candidates only after release, live verification and owner review. Preserve all account exclusions, including permanent game exclusions. The other seventeen articles retain independent findings, even where a reference to one of the three games was corrected. For example, the birthday article still assigns drinking in its birthday Yo Nunca variant.

### Local validation

The production build, TypeScript and export audit passed. All 77 export tests ran, including both historical preservation comparisons. The unit suite passed 297 tests and reproduced the same 14 historical failure names and assertion payloads as the release baseline. Changed-file lint reported four pre-existing warnings and zero errors.

Playwright MCP exercised the three games at 320×844, 390×844, 768×1024 and 1440×900 with third-party requests intercepted. The test accelerated only the clocks in its isolated browser contexts. Beer Pong covered both board sizes, cup removal, re-rack, the challenge dialog, turn changes, victory and rematch. Medusa completed all fifteen rounds, then tested replay or changing players. Tabú covered correct answers, forbidden clues, skips, all six timed turns, a win, a tie and replay or reset. Repeated clicks on round confirmations preserved the next round and score. The game flows, rules and companion articles passed the tested layout and exception checks.

All 87 public routes retained their link destinations, titles, H1s, canonical links, heading IDs and language alternates compared with the content release. The other ten Spanish game pairs retained their rendered content and structured rules. The Truth or Dare experimental description and the previously published Beer Pong rerack paragraph remain intact. Browser QA used the local export. Production verification belongs to a separately authorized release.

### Next editorial batches in priority order

**1 · Timed, cumulative or full-glass rules**

- https://bebergames.com/blog/los-20-mejores-juegos
- https://bebergames.com/blog/juegos-para-beber-rapidos
- https://bebergames.com/blog/juegos-de-mesa-para-beber
- https://bebergames.com/blog/juegos-para-beber-con-dados
- https://bebergames.com/blog/juegos-para-beber-con-cartas
- https://bebergames.com/blog/juegos-beber-baraja-espanola

**2 · Refusal and disclosure penalties**

- https://bebergames.com/blog/retos-para-fiestas
- https://bebergames.com/blog/juegos-para-beber-dos-personas
- https://bebergames.com/blog/juegos-para-beber-en-pareja
- https://bebergames.com/blog/verdad-o-reto-preguntas-buenas
- https://bebergames.com/blog/preguntas-yo-nunca-parejas
- https://bebergames.com/blog/juegos-para-beber-sin-alcohol

**3 · Group and party instructions**

- https://bebergames.com/blog/juegos-para-botellon
- https://bebergames.com/blog/como-organizar-fiesta-juegos-beber
- https://bebergames.com/blog/juegos-para-cumpleanos-adultos
- https://bebergames.com/blog/juegos-para-previas
- https://bebergames.com/blog/juegos-para-beber-por-videollamada

## Historical decision

The owner reports 38 restricted requests for Questions, three for Drinking Games and one for the blog index. The second warning and continuing examples on other pages warrant containment. The account snapshot reports zero formal violations, zero regulatory issues and 0% disabled serving. The 42 requests describe a seven-day window. The cause of the new classification, any deadline beyond the email and the effect of future corrections are unknown.

Google asks publishers to review other pages alongside its examples. Its alcohol restriction identifies favorable treatment of excessive or competitive consumption. [Notification guidance](https://support.google.com/adsense/answer/1378153) · [Alcohol restriction](https://support.google.com/publisherpolicies/answer/10438039)

## Blog index

All 32 cards use the same server-rendered link with title, tags, excerpt, publication date and reading time. The complete excerpt survives the CSS line clamp. Source: `app/(spanish)/blog/page.tsx:44–79`, excerpt at line 64. No featured slot, pagination, filter, index FAQ, JSON-LD block or separately hydrated recommendation list appeared. The introductory paragraphs, metadata, Open Graph and shared navigation contain ordinary game terminology. Comparing desktop and mobile showed the same cards. The card titles and excerpts are transcribed below for reproducibility.

**High, confirmed in production.** Yo Nunca +18, `content/blog/yo-nunca-preguntas-picantes-18.mdx:3`, promised “que todos beban y confiesen sus secretos más íntimos”. The page also said “vas a beber mucho y confesar aún más” (line 12), required all affirmative respondents to drink (20–22), and praised heavy drinking (31, 97). The local correction uses a hand signal, optional storytelling and free passes. Players choose a block together. The 60 numbered prompts and heading anchors survive. This changes the index and article metadata through their existing shared source.

**Potential pressure.** The title “55 Desafíos Épicos que Nadie Rechazará” (content/blog/retos-para-fiestas.mdx, line 2, rendered by app/(spanish)/blog/page.tsx, line 61) sets an expectation that everyone accepts. The card alone gives no penalty. The live destination makes refusal cost three drinks (MDX line 13) and still calls drinking the alternative at line 113. Correct those rules and offer a title describing the 55 challenges by level in its own editorial review. “Juegos rápidos” describes round duration. The ad-serving status of other articles cannot be inferred from their card titles.

## Exposure and proposed implementation

The ES root (`app/(spanish)/layout.tsx:136–145`) includes publisher verification and one Next Script descriptor for `spanish-adsense`. The initial HTML carries the serialized lazy loader, with **zero executable native AdSense script tags**. After load and idle the client appends the external script. No additional route loader was found. The EN root is isolated. The sole manual unit, 5189742299, is mounted in the Verdad o Reto setup (page.tsx:300); VerdadRetoExperimentAd.tsx:16–21 queues one push per mount. The September owner record identifies Google’s CMP. Source inspection found no separate publisher CMP initializer or local consent gate before this queue push. Delivery, consent decisions and present account exclusions require account evidence. Suppressing the shared loader may also suppress its consent UI on those documents. Verify the owner’s consent requirements on re-entry to eligible pages before releasing any containment. September's owner-supplied exclusions covered the individual games, contact and the legal section. They need fresh confirmation, particularly because exact game exclusions do not cover their rules pages.

All three restricted URLs had a serialized loader, a runtime script and zero manual slots. Each is technically eligible for Auto Ads subject to account exclusions, demand and consent. Each can inherit an already initialized document through same-root navigation. The blocked-request test retained the identical script node from the blog index to the Drinking Games article at both viewport widths. With a local mock substituted for the Google loader on the live origin, the manual setup queued one push. The same script node and one queued entry survived navigation through /blog, /blog/drinking-games-reglas, /juegos and /juegos/categorias/preguntas. Each destination had zero manual elements. The original script URL was intercepted once for the entire chain. This demonstrates document lifetime and queue persistence. Actual Google processing and consent outcomes were not measured. These same conditions apply elsewhere in ES. The Spanish fallback 404 also inherits the root outside the 87 public URLs.

**For owner approval only.** Use one reviewed route manifest. For every excluded HTML document omit loader emission, including queued lazy loads, and omit manual components before mount. One implementation for a mixed blog is to move the single lazy loader to an eligible-page wrapper. Select it from the static pathname or the MDX slug during export. Keep the existing Spanish chrome and pass the same manifest to link rendering. Use native document navigations at every eligibility boundary, including programmatic links and shared navigation. For C, omit the wrapper from the entire Spanish blog subtree. Keep the English root isolated. Do not rely on removing a script during client navigation: pending callbacks, JS globals, frames and queued units may survive. Preserve canonical paths, consent behavior and global 404. Validate direct entry, links, back/forward including bfcache, aliases and trailing slash, refresh, queued idle work and transitions to/from the manual setup with third parties intercepted. Require zero advertising attempts on excluded documents before release. Recheck hydration on allowed Spanish pages. If separate roots alter metadata or 404 behavior, hold that implementation.

| Option | Exact scope in inventory | Account action after approval | Coverage and trade-off |
|---|---|---|---|
| A | Three rows marked A | Exact-page Auto Ads exclusion for each | 3/71 Spanish URLs. Smallest change but leaves confirmed P0 instructions on ad-capable pages. |
| B (recommended) | All rows marked B | Exact-page exclusions, verifying existing individual-game exclusions first | 37/71 Spanish URLs, leaving 34 outside the temporary exclusion. Includes the manual setup, two inherited Yo Nunca descriptions, the Medusa category card and previously identified active and preventive routes. Unrelated articles remain eligible. More individual entries to keep synchronized. |
| C | All rows marked C | Section exclusion for /blog plus exact exclusions for B outside the blog | 45/71 Spanish URLs, leaving 26 outside the temporary exclusion. Covers all 33 Spanish blog URLs plus the 12 B routes outside the blog. Continuous blog boundary is easier to audit but also removes eligible lower-risk blog coverage. Retain the external exclusions for Questions and outstanding game risks. |

A leaves the manual setup eligible. B and C must skip mounting VerdadRetoExperimentAd on /juegos/verdad-o-reto before its effect can queue a push. An account Auto Ads exclusion alone cannot do this. These counts describe public paths. Fill, traffic share and revenue impact are unknown. Section C simplifies the blog boundary but still requires a working document boundary outside it. If that cannot be verified, no option can promise request-free excluded visits. Roll back via a reviewed revert of the manifest, loader placement and navigation changes and restore **only** account entries added for this incident from the owner's before-state snapshot. Re-run request interception and export checks. Google documents exact and prefix exclusions for Auto Ads and allows up to an hour for changes to apply. [Auto Ads exclusions](https://support.google.com/adsense/answer/9262311)

## Production inventory

Rows are ordered by incident priority. ES = serialized loader confirmed, no native ad script, no manual unit unless indicated. EN = no Spanish ad loader or manual slot. “Eligible?” means account status and actual page-level delivery remain unverified. Restricted request counts confirm requests only. A/B/C columns give the exact URL sets under https://bebergames.com. The game main pages had historically reported exact exclusions. Historical exclusions say nothing about today’s companion rules pages.

| URL | Live finding | Risk / certainty | Integration | Monetization evidence | Required correction | Priority | Exclusion options |
|---|---|---|---|---|---|---|---|
| /blog | One of 32 excerpts promises universal drinking and intimate disclosures. | Active advertiser restriction | ES | 1 restricted request | Serve the reviewed adult Yo Nunca excerpt. | Incident | A, B, C |
| /blog/drinking-games-reglas | Production already explains empty cups and table variants. | Active advertiser restriction | ES | 3 restricted requests | Retain the corrected guide and monitor Policy Center. | Incident | A, B, C |
| /juegos/categorias/preguntas | Four corrected game cards. Two linked articles still have the old instructions in production. | Active advertiser restriction | ES | 38 restricted requests | Release the two reviewed question guides. | Incident | A, B, C |
| /juegos/verdad-o-reto | The game permits passing. The related Yo Nunca link still states “el que lo haya hecho bebe” (page.tsx, line 324). | Confirmed preventive finding | ES + 1 manual | Manual unit and queue confirmed, current fill unknown | Release the optional-response referral. Until verified live, include the manual unit in B/C containment. | P0 | B, C |
| /blog/100-preguntas-yo-nunca | Production requires the lone respondent to tell the story. | Confirmed preventive finding | ES | Eligible? No current per-URL report | Local 59150eb allows a gesture, silence or a pass. | P0 | B, C |
| /blog/beer-pong-reglas-completas | Losing team drinks the winner’s remaining cups. | Confirmed preventive finding | ES | Eligible? No current per-URL report | Remove cups for scoring and end on the last hit. | P0 | B, C |
| /blog/como-organizar-fiesta-juegos-beber | A forbidden word accumulates penalties throughout the night. | Confirmed preventive finding | ES | Eligible? No current per-URL report | Rotate the word and reset the score each round. | P0 | B, C |
| /blog/juegos-beber-baraja-espanola | Failed matches cost drinks and a dealer result makes the table drink. | Confirmed preventive finding | ES | Eligible? No current per-URL report | Score pairs and dealer wins with chips. | P0 | B, C |
| /blog/juegos-de-mesa-para-beber | Losing territory or landing on a square requires finishing a glass. | Confirmed preventive finding | ES | Eligible? No current per-URL report | Use board position and tokens for losses. | P0 | B, C |
| /blog/juegos-para-beber-con-cartas | Lowest card drinks the entire stake. | Confirmed preventive finding | ES | Eligible? No current per-URL report | Bet counters and settle each hand with counters. | P0 | B, C |
| /blog/juegos-para-beber-con-dados | Six matching dice assign six drinks to other players. | Confirmed preventive finding | ES | Eligible? No current per-URL report | Score combinations in points. | P0 | B, C |
| /blog/juegos-para-beber-dos-personas | Declining a truth or dare doubles the drinks. | Confirmed preventive finding | ES | Eligible? No current per-URL report | Allow an immediate pass and rotate turns. | P0 | B, C |
| /blog/juegos-para-beber-en-pareja | A failed guess assigns two drinks, a forbidden word assigns another. | Confirmed preventive finding | ES | Eligible? No current per-URL report | Use a new word or change the guesser. | P0 | B, C |
| /blog/juegos-para-beber-por-videollamada | Wrong guesses require drinking, sometimes for the whole group. | Confirmed preventive finding | ES | Eligible? No current per-URL report | Reveal the answer and change host. | P0 | B, C |
| /blog/juegos-para-beber-rapidos | Offers shots for matched gazes and makes the loser drink. | Confirmed preventive finding | ES | Eligible? No current per-URL report | Reset the circle or score the duel. | P0 | B, C |
| /blog/juegos-para-beber-sin-alcohol | Mixed-group instructions assign two alcoholic drinks, refusal can require hot sauce. | Confirmed preventive finding | ES | Eligible? No current per-URL report | Make passing unconditional and use points or gestures for everyone. | P0 | B, C |
| /blog/juegos-para-botellon | Refusing truth or dare requires drinking. | Confirmed preventive finding | ES | Eligible? No current per-URL report | Pass the turn freely and remove speed and penalty rules. | P0 | B, C |
| /blog/juegos-para-cumpleanos-adultos | Matching gazes require both players to drink in three-second rounds. | Confirmed preventive finding | ES | Eligible? No current per-URL report | Use a freeze pose until the next signal. | P0 | B, C |
| /blog/juegos-para-previas | Players who have done the named activity drink. | Confirmed preventive finding | ES | Eligible? No current per-URL report | Allow a voluntary hand signal or pass. | P0 | B, C |
| /blog/los-20-mejores-juegos | Power Hour prescribes a shot every minute for 60 minutes. | Confirmed preventive finding | ES | Eligible? No current per-URL report | Replace that round with a timed music quiz. | P0 | B, C |
| /blog/medusa-juego-beber | Blinking costs a full glass and a late shout doubles drinks. | Confirmed preventive finding | ES | Eligible? No current per-URL report | Freeze on matched gazes and reset on the next cue. | P0 | B, C |
| /blog/preguntas-picantes-verdad-o-reto | Production imposes a fondo blanco for refusal and compulsory dares. | Confirmed preventive finding | ES | Eligible? No current per-URL report | Local 59150eb replaces the refusal sequence and updates FAQ. | P0 | B, C |
| /blog/preguntas-yo-nunca-parejas | No shared experience penalizes the speaker with a drink. | Confirmed preventive finding | ES | Eligible? No current per-URL report | Move to the next statement and allow silence. | P0 | B, C |
| /blog/retos-para-fiestas | Refusal costs three drinks and one failed dare costs a full glass. | Confirmed preventive finding | ES | Eligible? No current per-URL report | Allow an immediate pass and remove drinking, touch and stranger-contact penalties. | P0 | B, C |
| /blog/tabu-juego-beber | A forbidden word makes the team drink. | Confirmed preventive finding | ES | Eligible? No current per-URL report | Discard the card and score correct guesses. | P0 | B, C |
| /blog/verdad-o-reto-preguntas-buenas | Group disbelief doubles the speaker’s drinks. | Confirmed preventive finding | ES | Eligible? No current per-URL report | Remove the vote on honesty and allow a pass. | P0 | B, C |
| /blog/yo-nunca-preguntas-picantes-18 | Promises heavy drinking and makes all affirmative respondents drink. | Confirmed preventive finding | ES | Eligible? No current per-URL report | Local be778c9 replaces those instructions and the index excerpt. | P0 | B, C |
| /juegos | The catalogue tells the whole Tabú team to drink. | Confirmed preventive finding | ES | Eligible? No current per-URL report | Align the referral with the corrected scoring once the destination changes. | P0 | B, C |
| /juegos/beer-pong | Loss requires drinking remaining cups. | Confirmed preventive finding | ES | Historical Auto exclusion, current unknown | Remove hit cups and stop at the winning throw. | P0 | B, C |
| /juegos/beer-pong/reglas | Loss requires drinking remaining cups. | Confirmed preventive finding | ES | Eligible? No current per-URL report | Remove hit cups and stop at the winning throw. | P0 | B, C |
| /juegos/medusa | Reaction speed determines a double drink. | Confirmed preventive finding | ES | Historical Auto exclusion, current unknown | Use the signal to freeze and start a fresh round. | P0 | B, C |
| /juegos/medusa/reglas | Reaction speed determines a double drink. | Confirmed preventive finding | ES | Eligible? No current per-URL report | Use the signal to freeze and start a fresh round. | P0 | B, C |
| /juegos/tabu | A forbidden word assigns drinks to the team. | Confirmed preventive finding | ES | Historical Auto exclusion, current unknown | Discard the word, score guesses and rotate the descriptor. | P0 | B, C |
| /juegos/tabu/reglas | A forbidden word assigns drinks to the team. | Confirmed preventive finding | ES | Eligible? No current per-URL report | Discard the word, score guesses and rotate the descriptor. | P0 | B, C |
| /juegos/categorias/sin-materiales | The Medusa card says “Si os cruzáis la mirada… ¡MEDUSA! A beber.” (category page.tsx, line 20). | Confirmed preventive finding | ES | Eligible? No current per-URL report | Align the card with the next Medusa gameplay correction. | P0 | B, C |
| /juegos/yo-nunca | Visible play permits passing. WebApplication says affirmative respondents drink (components/layout/GameLayout.tsx, line 24). | Confirmed preventive finding | ES | Historical Auto exclusion, current unknown | Release the structured description of the optional gesture. | P0 | B, C |
| /juegos/yo-nunca/reglas | The rules inherit the same compulsory WebApplication description from GameLayout.tsx, line 24. | Confirmed preventive finding | ES | Eligible? No current per-URL report | Verify the same shared schema correction on this exact URL. | P0 | B, C |
| /juegos/categorias/cartas | Legacy referral language about punishments or who drinks. | Potential | ES | Eligible? No current per-URL report | Review referral against current game mechanics. | P1 | — |
| /juegos/categorias/dados | Legacy referral language about punishments or who drinks. | Potential | ES | Eligible? No current per-URL report | Review referral against current game mechanics. | P1 | — |
| /juegos/la-ruleta/reglas | The rules allow passing and forbid cumulative drinks. The introduction still calls the wheel a generator of punishments. | Potential wording concern | ES | Eligible? No current per-URL report | Align the introduction with the actual wheel in a later editorial pass. | P1 | — |
| / | Previously corrected editorial or gameplay surface. | Remediated | ES | Eligible? No current per-URL report | Retain remediation. | Monitor | — |
| /blog/juegos-para-beber-sin-cartas | Previously corrected editorial or gameplay surface. | Remediated | ES | Eligible? No current per-URL report | Retain remediation. | Monitor | C |
| /blog/la-bomba-juego-beber | Previously corrected editorial or gameplay surface. | Remediated | ES | Eligible? No current per-URL report | Retain remediation. | Monitor | C |
| /blog/la-piramide-juego-beber | Previously corrected editorial or gameplay surface. | Remediated | ES | Eligible? No current per-URL report | Retain remediation. | Monitor | C |
| /blog/preguntas-quien-es-mas-probable | Previously corrected editorial or gameplay surface. | Remediated | ES | Eligible? No current per-URL report | Retain remediation. | Monitor | C |
| /blog/reglas-del-yo-nunca | No affirmative misuse instruction identified in the reviewed surface. | No finding | ES | Eligible? No current per-URL report | None identified for this incident. | Monitor | C |
| /blog/rey-de-la-copa-reglas | Previously corrected editorial or gameplay surface. | Remediated | ES | Eligible? No current per-URL report | Retain remediation. | Monitor | C |
| /blog/ring-of-fire-reglas-cartas | Previously corrected editorial or gameplay surface. | Remediated | ES | Eligible? No current per-URL report | Retain remediation. | Monitor | C |
| /blog/yo-prefiero-preguntas | Previously corrected editorial or gameplay surface. | Remediated | ES | Eligible? No current per-URL report | Retain remediation. | Monitor | C |
| /contacto | No affirmative misuse instruction identified in the reviewed surface. | No finding | ES | Historical Auto exclusion, current unknown | None identified for this incident. | Monitor | — |
| /en | No affirmative misuse instruction identified in the reviewed surface. | No finding | EN | No integration | None identified for this incident. | Monitor | — |
| /en/about | No affirmative misuse instruction identified in the reviewed surface. | No finding | EN | No integration | None identified for this incident. | Monitor | — |
| /en/blog/drinking-games-for-2 | No affirmative misuse instruction identified in the reviewed surface. | No finding | EN | No integration | None identified for this incident. | Monitor | — |
| /en/blog/drinking-games-without-cards | No affirmative misuse instruction identified in the reviewed surface. | No finding | EN | No integration | None identified for this incident. | Monitor | — |
| /en/blog/how-to-choose-a-drinking-game | No affirmative misuse instruction identified in the reviewed surface. | No finding | EN | No integration | None identified for this incident. | Monitor | — |
| /en/contact | No affirmative misuse instruction identified in the reviewed surface. | No finding | EN | No integration | None identified for this incident. | Monitor | — |
| /en/games | No affirmative misuse instruction identified in the reviewed surface. | No finding | EN | No integration | None identified for this incident. | Monitor | — |
| /en/games/kings-cup | No affirmative misuse instruction identified in the reviewed surface. | No finding | EN | No integration | None identified for this incident. | Monitor | — |
| /en/games/most-likely-to | No affirmative misuse instruction identified in the reviewed surface. | No finding | EN | No integration | None identified for this incident. | Monitor | — |
| /en/games/never-have-i-ever | No affirmative misuse instruction identified in the reviewed surface. | No finding | EN | No integration | None identified for this incident. | Monitor | — |
| /en/games/truth-or-dare | No affirmative misuse instruction identified in the reviewed surface. | No finding | EN | No integration | None identified for this incident. | Monitor | — |
| /en/guides | No affirmative misuse instruction identified in the reviewed surface. | No finding | EN | No integration | None identified for this incident. | Monitor | — |
| /en/halloween-drinking-games | No affirmative misuse instruction identified in the reviewed surface. | No finding | EN | No integration | None identified for this incident. | Monitor | — |
| /en/legal/cookies | No affirmative misuse instruction identified in the reviewed surface. | No finding | EN | No integration | None identified for this incident. | Monitor | — |
| /en/legal/privacy | No affirmative misuse instruction identified in the reviewed surface. | No finding | EN | No integration | None identified for this incident. | Monitor | — |
| /en/legal/terms | No affirmative misuse instruction identified in the reviewed surface. | No finding | EN | No integration | None identified for this incident. | Monitor | — |
| /juegos-para-halloween | No affirmative misuse instruction identified in the reviewed surface. | No finding | ES | Eligible? No current per-URL report | None identified for this incident. | Monitor | — |
| /juegos/la-bomba | Previously corrected editorial or gameplay surface. | Remediated | ES | Historical Auto exclusion, current unknown | Retain remediation. | Monitor | — |
| /juegos/la-bomba/reglas | Previously corrected editorial or gameplay surface. | Remediated | ES | Eligible? No current per-URL report | Retain remediation. | Monitor | — |
| /juegos/la-piramide | Previously corrected editorial or gameplay surface. | Remediated | ES | Historical Auto exclusion, current unknown | Retain remediation. | Monitor | — |
| /juegos/la-piramide/reglas | Previously corrected editorial or gameplay surface. | Remediated | ES | Eligible? No current per-URL report | Retain remediation. | Monitor | — |
| /juegos/la-ruleta | Previously corrected editorial or gameplay surface. | Remediated | ES | Historical Auto exclusion, current unknown | Retain remediation. | Monitor | — |
| /juegos/quien-es-mas-probable | Previously corrected editorial or gameplay surface. | Remediated | ES | Historical Auto exclusion, current unknown | Retain remediation. | Monitor | — |
| /juegos/quien-es-mas-probable/reglas | Previously corrected editorial or gameplay surface. | Remediated | ES | Eligible? No current per-URL report | Retain remediation. | Monitor | — |
| /juegos/rey-de-la-copa | Previously corrected editorial or gameplay surface. | Remediated | ES | Historical Auto exclusion, current unknown | Retain remediation. | Monitor | — |
| /juegos/rey-de-la-copa/reglas | Previously corrected editorial or gameplay surface. | Remediated | ES | Eligible? No current per-URL report | Retain remediation. | Monitor | — |
| /juegos/ring-of-fire | Previously corrected editorial or gameplay surface. | Remediated | ES | Historical Auto exclusion, current unknown | Retain remediation. | Monitor | — |
| /juegos/ring-of-fire/reglas | Previously corrected editorial or gameplay surface. | Remediated | ES | Eligible? No current per-URL report | Retain remediation. | Monitor | — |
| /juegos/triman | Previously corrected editorial or gameplay surface. | Remediated | ES | Historical Auto exclusion, current unknown | Retain remediation. | Monitor | — |
| /juegos/triman/reglas | Previously corrected editorial or gameplay surface. | Remediated | ES | Eligible? No current per-URL report | Retain remediation. | Monitor | — |
| /juegos/verdad-o-reto/reglas | Previously corrected editorial or gameplay surface. | Remediated | ES | Eligible? No current per-URL report | Retain remediation. | Monitor | — |
| /juegos/yo-prefiero | Previously corrected editorial or gameplay surface. | Remediated | ES | Historical Auto exclusion, current unknown | Retain remediation. | Monitor | — |
| /juegos/yo-prefiero/reglas | Previously corrected editorial or gameplay surface. | Remediated | ES | Eligible? No current per-URL report | Retain remediation. | Monitor | — |
| /legal/aviso-legal | No affirmative misuse instruction identified in the reviewed surface. | No finding | ES | Historical Auto exclusion, current unknown | None identified for this incident. | Monitor | — |
| /legal/cookies | No affirmative misuse instruction identified in the reviewed surface. | No finding | ES | Historical Auto exclusion, current unknown | None identified for this incident. | Monitor | — |
| /legal/privacidad | No affirmative misuse instruction identified in the reviewed surface. | No finding | ES | Historical Auto exclusion, current unknown | None identified for this incident. | Monitor | — |
| /sobre-nosotros | No affirmative misuse instruction identified in the reviewed surface. | No finding | ES | Eligible? No current per-URL report | None identified for this incident. | Monitor | — |

## Verification on 25 November

Fresh first-party HTTP responses returned 200 for all 87 public paths. Their SHA-256 hashes matched the incident HTML capture on every path. The 71 Spanish responses contained the lazy loader descriptor. All 16 English responses lacked it. The only manual element was the Verdad o Reto setup unit. The owner’s 42 restricted requests establish recent request activity on the three listed URLs. No current URL-level impression or earnings export was available for the other P0 articles.

Playwright MCP inspected the live index, the internal link to Drinking Games, Questions, both question articles and the manual setup at 390 and 1440 px. Requests to third parties were aborted or answered locally before reaching the network. The candidate run covered those pages, the adult Yo Nunca guide, the four Questions games and Yo Nunca rules. The 22 candidate visits had zero page exceptions or horizontal overflow. Visible FAQ answers matched their structured counterparts. No advertising was clicked.

The corrected index still contains 32 cards. The two question articles retain 100 statements and 50 questions plus 15 dares, respectively. The adult guide retains 60 original statements. Four Truth prompts were rewritten for privacy in the prior approved work. Its dare list now works without touching someone, showing a private account, or contacting a third party. The three candidate guide FAQs have four, three and three entries respectively.

Production build, type generation, TypeScript and static audit passed. The complete export suite passed 74/74 with zero skipped. The unit run had 294 passes and 14 failures. Each test name and complete assertion payload matched the production baseline, including the historical AdSense source comparison. The other four AdSense checks passed. Changed code had zero lint errors and four existing warnings, reproduced on the production checkout. Next reported the existing workspace-root and metadataBase warnings. Raw live metadata differs from the production checkout export on 27 paths only in generated social-image query strings.

Compared with the local export of 1cd2964, the candidate changes seven public pages: the index, three articles, the Verdad o Reto game referral and the Yo Nunca game and rules schema. The other 80 match across reviewed metadata, links, headings, JSON-LD and body text. All 87 retained their H1, link targets and heading IDs, including both language inventories. The Truth or Dare experimental meta description is identical.

Release references: 59150eb contains the two question articles, be778c9 contains the adult guide and index card, and 8428252 aligns the shared Yo Nunca description, the manual-page referral and the adult-guide FAQ. All build on production 1cd2964. The conditional advertisement component and its initialization code are identical to production.

The content commits are candidates for the owner’s release review. Approve the containment scope independently, starting from a dated account snapshot and an agreed rollback list. Verify corrected production HTML and excluded-document request interception before considering restoration of individual placements. The second warning remains open.

## Live index card register

| Linked article | Title | Tags | Complete rendered excerpt |
|---|---|---|---|
| /blog/juegos-de-mesa-para-beber | Los Mejores Juegos de Mesa para Beber en Casa | Juegos de Mesa, Previas, Amigos, Juegos Clásicos | Descubre cómo adaptar los juegos de mesa clásicos como el Monopoly, el Trivial o el Jenga en divertidos juegos para beber con amigos. |
| /blog/juegos-para-beber-en-pareja | Los 7 Mejores Juegos para Beber en Pareja (Online y Físicos) | Parejas, Juegos de Dos, Romántico, Picante, Sin Materiales | Descubre los mejores juegos de beber para dos personas. Retos, preguntas picantes y juegos de cartas para que tú y tu pareja os divirtáis en casa. |
| /blog/la-bomba-juego-beber | La Bomba (Hot Potato): El Juego de Beber del Temporizador Secreto | La Bomba, Juegos para Beber, Sin Materiales, Fiesta, Hot Potato | Cómo jugar a La Bomba con un temporizador secreto. Descubre quién empieza cada ronda y prueba las variantes de palabras y categorías. |
| /blog/los-20-mejores-juegos | Los 20 Mejores Juegos para Beber (Para fiestas y botellones) | Listas, Juegos de Mesa, Previas | Descubre los 20 mejores juegos para beber con amigos. Desde clásicos con cartas y dados hasta opciones sin material. Ideales para cualquier fiesta. |
| /blog/rey-de-la-copa-reglas | Rey de la Copa (Kings Cup): Reglas Paso a Paso para Jugar | Rey de la Copa, Kings Cup, Juegos de Cartas, Juegos para Beber, Fiesta, Juegos Universitarios | El Rey de la Copa en 5 minutos: qué hace cada carta (del As al Rey), la regla de la copa central y 3 variantes brutales. Incluye versión online gratis. |
| /blog/ring-of-fire-reglas-cartas | Ring of Fire (El Anillo de Fuego): Reglas Completas de Todas las Cartas | Guías, Ring of Fire, Cartas, Juegos de Mesa, Copa del Rey, Party Games | Reglas del Ring of Fire carta por carta, del As al Rey. Prepara el círculo, prueba la cascada de gestos y descubre cómo cerrar la partida con el cuarto rey. |
| /blog/yo-nunca-preguntas-picantes-18 | Yo Nunca +18: 60 Preguntas Picantes y Subidas de Tono | yo nunca, preguntas picantes, +18, adultos, juegos para beber | Las mejores 60 preguntas de Yo Nunca picantes para adultos. Frases subidas de tono que harán que todos beban y confiesen sus secretos más íntimos. |
| /blog/la-piramide-juego-beber | La Pirámide: Reglas Completas del Juego de Beber con Cartas y Estrategias para Ganar | La Pirámide, Juegos de Cartas, Juegos para Beber, Reglas, Farol, Fiesta | Aprende a jugar a La Pirámide, el juego de beber con cartas donde la memoria y el farol son tus mejores armas. Reglas, variantes y trucos. |
| /blog/juegos-para-beber-sin-alcohol | Juegos para Beber Sin Alcohol: 10 Alternativas Divertidas para Todos | sin alcohol, juegos de fiesta, inclusivo, alternativas, sober, juegos para beber | Los mismos juegos, la misma diversión, sin una gota de alcohol. Ideas para fiestas inclusivas donde todo el mundo pueda participar. |
| /blog/juegos-para-beber-por-videollamada | 8 Juegos para Beber por Videollamada que Funcionan de Verdad | videollamada, juegos para beber, online, a distancia, Zoom, fiesta virtual | Juegos para beber a distancia que realmente funcionan por Zoom, Meet o FaceTime. Sin apps raras, sin complicaciones. |
| /blog/juegos-para-beber-dos-personas | Los 10 Mejores Juegos para Beber de 2 Personas (Amigos o Pareja) | dos personas, juegos para beber, pareja, amigos, fiesta, previas | ¿Solo sois dos? No hay problema. Estos 10 juegos para beber funcionan perfectamente con 2 personas, ya sea con tu mejor amigo o tu pareja. |
| /blog/juegos-para-cumpleanos-adultos | Juegos para Cumpleaños de Adultos: 12 Ideas para una Fiesta Inolvidable | cumpleaños adultos, juegos de fiesta, juegos para beber, celebraciones, previas | Los mejores juegos para celebrar un cumpleaños de adultos. Desde juegos de preguntas hasta retos y clásicos de fiesta. ¡Haz que el cumpleañero no lo olvide jamás! |
| /blog/preguntas-quien-es-mas-probable | 50 Preguntas de Quién Es Más Probable para Fiestas y Previas | quién es más probable, preguntas, fiesta, juegos para beber, grupos | Las mejores preguntas de Quién Es Más Probable para descubrir el culpable del grupo. 50 frases divertidas, atrevidas y comprometidas organizadas por nivel. |
| /blog/yo-prefiero-preguntas | Yo Prefiero: 50 Preguntas Extremas para Beber con Amigos | Yo Prefiero, Preguntas, Juegos para Beber, Fiesta, Would You Rather, Dilemas | La lista definitiva de preguntas para jugar a Yo Prefiero con amigos. 50 dilemas éticos y divertidos en nivel Suave, Normal y Picante. |
| /blog/tabu-juego-beber | Tabú Borracho: El Juego de Palabras Definitivo para Fiestas | Tabú, Juegos para Beber, Fiesta, Palabras, Equipo, Party Games | Cómo jugar al Tabú Borracho con amigos. Reglas oficiales, consejos estratégicos y por qué es el juego de equipos perfecto para previas. |
| /blog/medusa-juego-beber | Medusa: Reglas Oficiales del Juego de Beber de Contacto Visual | Medusa, Juegos para Beber, Sin Materiales, Fiesta, Juegos Grupales | Aprende a jugar a Medusa, el juego de beber más simple y tenso del mundo. Sin cartas, sin dados: solo miradas. Reflejos, psicología y reglas detalladas. |
| /blog/juegos-para-beber-rapidos | 8 Juegos para Beber Rápidos (Perfectos para Calentar la Noche) | juegos rápidos, juegos para beber, rompehielos, fiesta | Los mejores juegos para beber rápidos que duran 5-10 minutos. Ideales para empezar la fiesta, romper el hielo o rellenar huecos entre juegos. |
| /blog/como-organizar-fiesta-juegos-beber | Cómo Organizar la Fiesta Perfecta con Juegos para Beber | fiesta, organización, juegos para beber, guía | Guía completa para organizar una fiesta inolvidable con juegos para beber. Desde la planificación hasta los mejores juegos según la fase de la noche. |
| /blog/preguntas-yo-nunca-parejas | Preguntas de Yo Nunca para Parejas: 50 Frases Románticas y Picantes | yo nunca, parejas, romántico, juegos en pareja, adultos | Las mejores preguntas de Yo Nunca para jugar en pareja. Desde preguntas románticas hasta las más atrevidas confesiones para una noche especial de dos. |
| /blog/drinking-games-reglas | Drinking Games: Reglas de los 10 Juegos Más Famosos | drinking games, reglas, internacional, juegos para beber | Las reglas completas de los drinking games más populares del mundo. Desde el Beer Pong hasta el Flip Cup, explicados paso a paso. |
| /blog/juegos-para-beber-con-dados | Juegos para Beber con Dados: 8 Juegos que Solo Necesitan Dados y Bebida | dados, juegos para beber, triman, fiesta | Los mejores juegos para beber con dados. Desde el clásico Triman hasta el Mexicano y el 21. Solo necesitas un par de dados y buena compañía. |
| /blog/retos-para-fiestas | Retos para Fiestas: 55 Desafíos Épicos que Nadie Rechazará | retos, fiesta, desafíos, juegos para beber | Los 55 mejores retos para fiestas organizados por nivel de dificultad. Desde retos divertidos hasta desafíos extremos para animar cualquier noche. |
| /blog/juegos-beber-baraja-espanola | Juegos para Beber con Baraja Española (Rápidos y Fáciles) | Baraja Española, Cartas, Clásicos, Juegos Grupales, Tradición | 5 juegos rápidos con baraja española de 40 cartas: el Burro, Siete y Medio, la Escoba Borracha y más. Reglas en 2 minutos, sin apps ni descargas. |
| /blog/verdad-o-reto-preguntas-buenas | Verdad o Reto: 80 Preguntas Buenas y Retos Atrevidos para Fiestas | verdad o reto, preguntas, retos, fiesta, juegos para beber | La mejor lista de preguntas de Verdad o Reto para fiestas. 40 verdades comprometidas y 40 retos divertidos organizados por nivel de intensidad. |
| /blog/beer-pong-reglas-completas | Beer Pong: Reglas Oficiales, Montaje y Variantes del Juego | Juegos de Vasos, Estados Unidos, Habilidad, Fiesta | Aprende las reglas completas del Beer Pong, cómo colocar los vasos, qué hacer si hay empate y cuáles son las mejores variantes para jugar con amigos. |
| /blog/juegos-para-beber-con-cartas | Los 12 Mejores Juegos para Beber con Cartas (Baraja de Póker) | cartas, juegos para beber, baraja, fiesta | Descubre los juegos para beber con cartas más divertidos usando una baraja de póker. Desde el clásico Kings hasta juegos rápidos para animar cualquier fiesta. |
| /blog/100-preguntas-yo-nunca | 100 preguntas para Yo Nunca: la lista definitiva | Preguntas, Yo Nunca, Listas | Más de 100 ideas de frases para el Yo Nunca organizadas por nivel. Desde las más inofensivas hasta las más picantes. ¡No te quedarás sin ideas! |
| /blog/preguntas-picantes-verdad-o-reto | 50 preguntas picantes para Verdad o Reto + 15 retos | Salseo, Adultos, Retos, Fiesta, Amigos | 50 preguntas picantes para Verdad o Reto y 15 retos para variar la partida. Ideas para previas con amigos de confianza. |
| /blog/juegos-para-beber-sin-cartas | Los Mejores Juegos para Beber sin Cartas ni Materiales | Sin Materiales, Juegos de Beber sin Cartas, Previas, Juegos Grupales | Descubre los 12 mejores juegos para beber que puedes organizar al instante sin necesidad de cartas, dados, ni tableros. |
| /blog/reglas-del-yo-nunca | Reglas Oficiales del Yo Nunca: Cómo Jugar Paso a Paso | Guías, Secretos, Preguntas, Yo Nunca, Juegos para Conocerse | Aprende cómo jugar al Yo Nunca con o sin alcohol. Reglas básicas, niveles de intensidad, variantes y ejemplos para romper el hielo en cualquier fiesta. |
| /blog/juegos-para-botellon | Los 15 mejores juegos para botellón con amigos (Con o sin materiales) | Juegos de Grupo, Botellón, Listas, Fiesta | Descubre los juegos más divertidos y rápidos para tu próximo botellón. Opciones con cartas, dados, mímica y solo con el móvil. |
| /blog/juegos-para-previas | Los Mejores Juegos para Previas: Guía Definitiva paso a paso | Guías, Previas, Amigos, Consejos | Cómo organizar la previa perfecta en casa. Los mejores juegos para beber, desde calentamiento hasta el caos final. |
