// Run on a local build through Playwright MCP browser_run_code_unsafe(filename).
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- invoked by Playwright MCP.
async function run(page) {
  const origin = new URL(page.url()).origin;
  if (!/^http:\/\/127\.0\.0\.1:\d+$/.test(origin)) throw new Error("Use a local server");
  const results = [], errors = [];
  page.on("pageerror", error => errors.push(error.message));
  const check = (ok, message) => { if (!ok) throw new Error(message); };
  for (const [slug, prefix, section, heading, end, replay, setup] of [
    ["truth-or-dare", "tod", "truth-or-dare-game", "tod-game-heading", "tod-finish", "tod-restart", "tod-change-players"],
    ["kings-cup", "kc", "kings-cup-game", "kc-game-heading", "kc-end", "kc-play-again", "kc-change-players"],
    ["never-have-i-ever", "nhie", "nhie-game", "nhie-heading", "nhie-end", "nhie-replay", "nhie-setup"],
  ]) {
    for (const [width, height] of [[320, 844], [390, 844], [768, 1024], [1440, 900]]) {
      await page.setViewportSize({ width, height });
      await page.goto(`${origin}/en/games/${slug}`);
      const link = page.locator(`#${prefix}-choose-game`);
      check(await link.count() === 0, "Link must be absent in setup");
      await page.locator(`#${prefix}-start`).click();
      if (prefix === "kc") {
        await page.locator('#kc-primary').click();
        await page.getByRole('button', { name: 'Next player', exact: true }).waitFor();
      } else if (prefix === "tod") {
        await page.locator('#tod-truth').click();
        await page.locator('#tod-next').click();
      } else await page.locator('#nhie-next').click();
      check(await link.count() === 0, "Link must be absent in play");
      await page.locator(`#${end}`).click();
      await link.waitFor();
      check(await page.evaluate(id => document.activeElement.id === id, heading), "Completion focus changed");
      if (prefix === "kc") check(await page.locator(`#${heading}`).evaluate(h => {
        const r = h.getBoundingClientRect(); return r.top >= 0 && r.bottom <= innerHeight;
      }), "King's Cup heading clipped");
      check(await link.getAttribute('href') === '/en/games', 'Catalog destination');
      check(await link.textContent() === 'Choose another game', 'Catalog label');
      check((await page.locator(`#${replay}`).getAttribute('class')).includes('en-button-primary'), 'Replay primary');
      const geometry = await page.locator(`#${section}`).evaluate(section => {
        const controls = [...section.querySelectorAll('button, a')].map(el => {
          const r = el.getBoundingClientRect();
          return { id: el.id, x: r.x, y: r.y, right: r.right, bottom: r.bottom, width: r.width, height: r.height };
        });
        return { controls, overflow: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) > innerWidth };
      });
      check(!geometry.overflow, 'Horizontal overflow');
      for (const [i, a] of geometry.controls.entries()) {
        check(a.height >= 48, 'Touch target');
        for (const b of geometry.controls.slice(i + 1)) check(!(a.x < b.right && a.right > b.x && a.y < b.bottom && a.bottom > b.y), 'Controls collide');
      }
      for (const id of [replay, setup, `${prefix}-choose-game`]) {
        await page.keyboard.press('Tab');
        check(await page.evaluate(id => document.activeElement.id === id, id), 'Keyboard order');
      }
      check(await link.evaluate(el => el.matches(':focus-visible') && getComputedStyle(el).outlineStyle !== 'none'), 'Visible keyboard focus');
      await page.keyboard.press('Enter');
      await page.waitForURL(`${origin}/en/games`);
      for (const id of ['never-have-i-ever', 'kings-cup', 'truth-or-dare']) check(await page.locator(`#en-catalog-${id}`).isVisible(), 'Hub catalog');
      check(await page.locator('html').getAttribute('lang') === 'en-US', 'English navigation');
      await page.goBack();
      check(new URL(page.url()).pathname === `/en/games/${slug}`, 'Back destination');
      results.push({ slug, width, height, ...geometry });
    }
  }
  check(errors.length === 0, errors.join('; '));
  return { status: 'PASS', checks: results.length, errors, results };
}
