# English game detail design system

Status: **APPROVED CONTRACT / IMPLEMENTED LOCALLY**. Publication and independent audit are separate gates. This is the single detailed visual specification for English game detail pages. Phase documents record implementation decisions and validation, not copies of this contract.

## Scope

Applies to `/en/games/kings-cup`, `/en/games/truth-or-dare`, and future published EN game detail pages. It does not redesign the games hub, home, guides, legal pages, or Spanish pages. King's Cup is the established composition reference; Truth or Dare retains its own identity and mechanics.

## Page and hero

Use `EnglishPage variant="game-detail"` for new game detail pages. It opts into the existing wide page frame (currently 1120 px including page padding), without changing other page defaults. King's Cup already uses that frame through its existing route default and requires no migration.

Keep the H1 and introduction within their existing reading limits. An outer page width is not a requirement to stretch every line or game state. Preserve editorial content, metadata, heading semantics, and route behavior when changing presentation. Decoration is game-specific and optional; avoid repeating the main artwork in both hero and setup when it adds height without helping recognition.

## Setup shell

Reuse `.en-game`: surface background, restrained accent light, thin border, rounded corners, and shadow. Start from its existing 28 px radius and padding scale (32 px on larger screens; 20 px vertically / 16 px horizontally on small screens). These are shared defaults, not a reason to force unrelated content to identical dimensions. Height follows content; never crop instructions to make cards equal.

Use one setup heading followed by a cohesive setup body. A divider may separate the desktop heading from the body. Compact mobile headers can omit it. Scope all overrides beneath `.root` in `EnglishDesign.module.css`; do not modify Spanish/global prose rules.

## Desktop setup

Reuse `.en-setup` when artwork and configuration fit alongside one another. Its starting proportion is approximately `1 / 1.6`, with a 32 px gap. The artwork column should balance the configuration, not become an empty oversized panel. Keep controls at their usable size rather than stretching them to fill a column.

Truth or Dare uses this grid with a full-width setup heading, artwork on the left and configuration on the right. Its desktop illustration uses the existing artwork at its natural size on tablet and a modest scale increase on larger screens. The configuration remains readable at 768 px; narrower screens use the compact treatment below.

## Artwork

Communicate the game's identity: cards/crown/draw for King's Cup; question/exclamation/choice for Truth or Dare. Reuse the existing `EnglishArtwork.tsx` components. Size or position them through scoped wrappers; do not draw another version for each placement.

Artwork is decorative, `aria-hidden`, noninteractive, and unnecessary to understand controls. Use lightweight HTML/CSS/SVG, without remote images or services. Balance visible visual weight rather than imposing identical image boxes on different illustrations. Decorative lettering may shrink; meaningful instructions must remain in normal text.

## Configuration

Present one reading path: introduction → game metadata → labelled controls → primary CTA → supporting/responsible copy. Align these groups within the configuration column. Supporting copy sits below the CTA with less emphasis and no additional box. Preserve voluntary passing, stopping, and optional alcohol wording.

## Metadata

Keep facts compact and secondary, with natural wrapping. Separate facts such as prompt/deck size and equipment from editable values such as player count. Helper text belongs with its control. Facts and gameplay counters need not contain identical information across games; use consistent hierarchy without adding redundant badges.

## Controls

Use native buttons and selects where appropriate, explicit labels, unique IDs, accessible names, and visible limits. Preserve actual disabled behavior at bounds. A select and a stepper can coexist across different games; do not standardize mechanics merely for appearance. Truth or Dare keeps its native select, 48 px decrement/increment buttons, and existing number scale.

## CTA and action hierarchy

Use `.en-button` and its existing primary/danger variants. The setup primary action belongs to the configuration and uses its available width, including on mobile. Do not apply an unrelated narrow maximum that isolates it from the controls.

During play, one primary action or a balanced set of meaningful choices should dominate. Keep passing easy to find. Session actions have lower visual emphasis and remain separate from turn actions. A quieter appearance must not shrink their usable targets.

## Gameplay

The prompt, card, or central decision has the strongest emphasis; turn and progress support it. Group turn actions with the active content and place session controls separately. Preserve focus transfer and announcements when the state changes.

Gameplay width follows its content. Truth or Dare intentionally retains its previous compact shell (752 px maximum, with a 640 px inner reading area), even though setup uses the wide frame. Choice, prompt, and final share that compact frame. King's Cup retains room for a card and rule side by side. Do not stretch text prompts to the full setup width or force both mechanics into one component.

## Responsive

Use two setup columns only while artwork and configuration fit without squeezing text or controls. The current starting breakpoint is 768 px; validate content around it rather than treating it as a device classification.

Below that width, configuration is one column. Truth or Dare places compact artwork beside its heading in the header area, then a full-width introduction, metadata, centered player selector, full-width CTA and supporting copy. This header pairing is not a two-column mobile form. The artwork wrapper is compact, not a separate 250–300 px block. Allow the heading and metadata to wrap at 320 px.

Keep heights intrinsic for text and controls. An artwork-only box can reserve space. Do not introduce page overflow, clipped focus rings or overlapping controls. Compare access to Start with the previous mobile version so decoration does not add a large scroll burden.

## Accessibility

Maintain visible keyboard focus, logical DOM/tab order, native semantics and explicit control labels. Primary controls should be at least 48 px high. Keep disabled elements genuinely disabled and available choices in a stable position. Labels, symbols, counts and border treatment supplement color. Decorative artwork receives no focus. Respect reduced motion and do not require animation to understand state.

## Client boundary and performance

Pages and editorial content remain Server Components. State and event handlers stay in the specific game's existing client island. Presentation reuse must not introduce a provider or another client entry point.

No new dependencies, services, remote images or unnecessary functional JavaScript. Artwork stays static. Home, hub and guides must not load a game's interactive module just to show its illustration. Check loaded production scripts when changing imports, and record relevant bundle differences in the phase report.

## Reuse and justified exceptions

Start with `EnglishPage`, `.en-game`, `.en-setup`, existing buttons and artwork. Extract a component only when repeated structure creates real divergence; do not centralize game state or mechanics to share a surface.

King's Cup remains visually unchanged: its existing configuration order and larger mobile artwork are retained as a legacy reference, not mandatory patterns for new mobile setups. Truth or Dare's compact gameplay frame and smaller mobile artwork are intentional adaptations. Record future exceptions in the relevant phase document and link to the affected contract section.

## Acceptance checklist

- [ ] Review setup and all relevant game states at 320×844, 390×844, 768×1024 and 1440×900.
- [ ] Compare against approved EN games: common system, distinct identity.
- [ ] Confirm balanced desktop setup and cohesive metadata/control/CTA grouping.
- [ ] Confirm compact mobile artwork, wrapping and prompt readability.
- [ ] Record document/body client and scroll widths; no real horizontal overflow or clipping.
- [ ] Check keyboard order, focus visibility/transfer, labels, targets and disabled states.
- [ ] Preserve game behavior, optional passing and responsible-play meaning.
- [ ] Sanity-check existing games and hub after shared presentation changes.
- [ ] Preserve SEO, route inventory, Spanish content and English isolation.
- [ ] Run required unit/type/lint/build/export/audit gates and compare with a baseline.
- [ ] Check client boundaries and loaded scripts; document relevant size changes.
- [ ] Record evidence and exceptions in the phase document; complete independent audit before integration.
