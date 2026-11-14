// Run through Playwright MCP browser_run_code_unsafe(filename) on a local export.
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- invoked by Playwright MCP.
async function run(page) {
  const results = [];
  for (const [width, height] of [[320, 844], [390, 844], [768, 1024], [1440, 900]]) {
    await page.setViewportSize({ width, height });
    await page.evaluate(() => document.fonts.ready);
    const cards = await page.locator('.en-catalog-card').evaluateAll(cards => cards.map(card => {
      const area = card.querySelector('.en-catalog-art');
      const art = area.firstElementChild;
      const title = card.querySelector('h3');
      const rect = el => {
        const r = el.getBoundingClientRect();
        return { left: r.left, right: r.right, top: r.top, bottom: r.bottom, width: r.width, height: r.height };
      };
      return { title: title.textContent, area: rect(area), art: rect(art), heading: rect(title),
        decorative: art.getAttribute('aria-hidden') === 'true',
        focusable: art.querySelectorAll('a, button, [tabindex]').length,
        cta: card.querySelector('a').textContent };
    }));
    if (cards.length !== 3) throw new Error('Expected three hub cards');
    for (const card of cards) {
      const { art: a, area: b, heading: h } = card;
      const fail = message => { throw new Error(`${width}/${card.title}: ${message}`); };
      if (a.left < h.right && a.right > h.left && a.top < h.bottom && a.bottom > h.top) fail('art intersects title');
      if (a.left < b.left - 1 || a.right > b.right + 1 || a.top < b.top - 1 || a.bottom > b.bottom + 1) fail('art escapes reserved area');
      if (Math.abs((a.left + a.right - b.left - b.right) / 2) > 1) fail('art not centered');
      if (!h.width || !h.height || !card.decorative || card.focusable) fail('title/decorative semantics');
    }
    if (await page.evaluate(() => Math.max(document.body.scrollWidth, document.documentElement.scrollWidth) > innerWidth)) throw new Error(`${width}: horizontal overflow`);
    for (const link of await page.locator('.en-catalog-card a').all()) {
      await link.focus();
      await link.scrollIntoViewIfNeeded();
      if (!await link.isVisible()) throw new Error('CTA not reachable');
    }
    results.push({ width, height, cards });
  }
  return { status: 'PASS', results };
}
