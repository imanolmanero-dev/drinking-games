// Navigate to a local dev/static server, then run through Playwright MCP
// browser_run_code_unsafe(filename). No browser dependency is added to the app.
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- Playwright MCP invokes this function.
async function run(page) {
  const origin = new URL(page.url()).origin;
  if (!/^http:\/\/127\.0\.0\.1:\d+$/.test(origin)) throw new Error("Use a local server");
  const results = [];
  const check = (condition, message) => { if (!condition) throw new Error(message); };

  for (const reducedMotion of ["no-preference", "reduce"]) {
    for (const [width, height] of [[320, 844], [390, 844], [768, 1024], [1440, 900]]) {
      const context = await page.context().browser().newContext({
        viewport: { width, height }, reducedMotion, hasTouch: true,
      });
      try {
        const p = await context.newPage();
        const errors = [];
        p.on("pageerror", error => errors.push(error.message));
        await p.goto(`${origin}/en/games/kings-cup`);
        await p.locator("#kc-player-count").selectOption("3");
        await p.evaluate(() => {
          window.kcFocusChecks = [];
          const focus = HTMLElement.prototype.focus;
          const scroll = Element.prototype.scrollIntoView;
          HTMLElement.prototype.focus = function (options) {
            if (this.id === "kc-game-heading") {
              const r = this.getBoundingClientRect();
              window.kcFocusChecks.push({ alreadyVisible: r.top >= 0 && r.bottom <= innerHeight, scrollY, scrolls: [] });
            }
            return focus.call(this, options);
          };
          Element.prototype.scrollIntoView = function (options) {
            if (this.id === "kc-game-heading") window.kcFocusChecks.at(-1)?.scrolls.push(options);
            return scroll.call(this, options);
          };
        });

        let focusCount = 0;
        async function state(transition, expectedHeading, drawn) {
          // The state is committed and the existing reveal timer has settled
          // before checking geometry; no animation-duration sleeps are needed.
          await p.waitForFunction(text => document.querySelector("#kc-game-heading").textContent === text, expectedHeading);
          const proof = await p.evaluate(async () => {
            await new Promise(requestAnimationFrame);
            const scrollBefore = scrollY;
            await new Promise(requestAnimationFrame);
            const h = document.querySelector("#kc-game-heading");
            const r = h.getBoundingClientRect();
            return {
              activeElement: document.activeElement.tagName, id: document.activeElement.id,
              top: r.top, bottom: r.bottom, viewportHeight: innerHeight,
              visible: r.top >= 0 && r.bottom <= innerHeight,
              overflow: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) > innerWidth,
              stableScroll: scrollY === scrollBefore, scrollY,
              focusRing: h.matches(":focus-visible") && getComputedStyle(h).outlineStyle !== "none" && parseFloat(getComputedStyle(h).outlineWidth) > 0,
              focusChecks: window.kcFocusChecks,
            };
          });
          const label = `${width}x${height}/${reducedMotion}/${transition}`;
          check(proof.id === "kc-game-heading", `${label}: focus lost: ${JSON.stringify(proof)}`);
          check(proof.visible, `${label}: focused heading outside viewport: ${JSON.stringify(proof)}`);
          check(!proof.overflow && proof.stableScroll, `${label}: overflow or delayed scroll`);
          check(proof.focusChecks.length === ++focusCount, `${label}: duplicate/missing focus transition`);
          const focusCheck = proof.focusChecks.at(-1);
          check(focusCheck.scrolls.length <= 1, `${label}: double corrective scroll`);
          if (focusCheck.alreadyVisible) check(focusCheck.scrolls.length === 0 && focusCheck.scrollY === proof.scrollY, `${label}: unnecessary scroll`);
          if (/Enter|Space/.test(transition)) check(proof.focusRing, `${label}: heading needs visible keyboard focus`);
          if (drawn !== undefined) check(await p.locator("#kc-progress-text").textContent() === `Cards drawn: ${drawn} / 52`, `${label}: card count changed`);
          results.push({ viewport: `${width}x${height}`, reducedMotion, transition, ...proof, focusChecks: undefined });
        }
        async function tabTo(id) {
          await p.keyboard.press("Tab");
          check(await p.evaluate(() => document.activeElement.id) === id, `Tab should reach ${id}`);
          const ring = await p.locator(`#${id}`).evaluate(el => {
            const style = getComputedStyle(el);
            const r = el.getBoundingClientRect();
            return el.matches(":focus-visible") && style.outlineStyle !== "none" && parseFloat(style.outlineWidth) > 0 && r.top >= 0 && r.bottom <= innerHeight;
          });
          check(ring, `${id}: keyboard focus must be visible`);
        }
        async function draw(transition, count) {
          await p.locator("#kc-primary").click();
          await p.getByRole("button", { name: "Next player", exact: true }).waitFor();
          await state(transition, count === 1 ? "Player 1's turn" : "Player 2's turn", count);
        }

        await p.locator("#kc-start").click();
        await state("Start", "Player 1's turn", 0);
        await draw("Draw/reveal", 1);
        await p.locator("#kc-end").click();
        await state("End game", "Game finished");
        check((await p.getByRole("status").textContent()).includes("after 1 of 52 cards"), "End count");
        await tabTo("kc-play-again");
        await p.keyboard.press("Enter");
        await state("Play again (Enter)", "Player 1's turn", 0);
        await tabTo("kc-primary");
        await p.keyboard.press("Space");
        await p.locator("#kc-skip").waitFor();
        await state("Draw (Space)", "Player 1's turn", 1);
        await p.locator("#kc-skip").click();
        await state("Skip", "Player 2's turn", 1);
        await p.locator("#kc-pause").click();
        await state("Pause", "Game paused", 1);
        check(await p.locator("#kc-primary").count() === 0, "Paused draw/advance must be unavailable");
        await tabTo("kc-resume");
        await p.keyboard.press("Space");
        await state("Resume (Space)", "Player 2's turn", 1);

        // Two draw events in one turn must consume exactly one card.
        await p.locator("#kc-primary").evaluate(el => { el.click(); el.click(); });
        await p.locator("#kc-skip").waitFor();
        await state("Duplicate draw/reveal", "Player 2's turn", 2);
        await p.locator("#kc-primary").evaluate(el => { el.click(); el.click(); });
        await state("Duplicate next", "Player 3's turn", 2);

        // These DOM activations leave viewport position under test control.
        // A visible context must retain scroll; a partly clipped one must recover.
        await p.locator("#kc-pause").evaluate(el => el.click());
        await state("Pause with heading visible", "Game paused", 2);
        await p.evaluate(() => {
          const r = document.querySelector("#kc-game-heading").getBoundingClientRect();
          window.scrollTo(0, scrollY + r.top + r.height / 2);
        });
        await p.locator("#kc-resume").evaluate(el => el.click());
        await state("Resume with heading clipped", "Player 3's turn", 2);
        await p.locator("#kc-end").click();
        await state("End after replay", "Game finished");
        await tabTo("kc-play-again");
        await tabTo("kc-change-players");
        await p.keyboard.press("Enter");
        await state("Change players (Enter)", "Set up your game");
        await tabTo("kc-player-count");
        check(await p.locator("#kc-player-count").inputValue() === "3", "Setup selection retained");
        await p.locator("#kc-player-count").selectOption("2");
        await p.locator("#kc-start").tap();
        await state("Start with 2 players (touch)", "Player 1's turn", 0);
        for (let i = 1; i <= 2; i++) {
          await draw(`Draw ${i} after setup`, i);
          await p.locator("#kc-skip").tap();
          await state(`Skip ${i} (touch)`, i === 1 ? "Player 2's turn" : "Player 1's turn", i);
        }
        check(errors.length === 0, `Browser errors: ${errors.join("; ")}`);
      } finally {
        await context.close();
      }
    }
  }
  return { status: "PASS", origin, checks: results.length, results };
}
