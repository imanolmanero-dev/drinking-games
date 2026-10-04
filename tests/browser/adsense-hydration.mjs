// Run only through Playwright MCP browser_run_code_unsafe(filename).
// Network response instrumentation never changes source or remote settings.
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- Playwright MCP invokes this function from the file.
async function run(page) {
const assert = {
  equal(actual, expected, message = "equality") { if (actual !== expected) throw new Error(`${message}: ${actual} != ${expected}`); },
  ok(value, message) { if (!value) throw new Error(message); },
  deepEqual(actual, expected, message = "deep equality") { if (JSON.stringify(actual) !== JSON.stringify(expected)) throw new Error(`${message}: ${JSON.stringify(actual)}`); },
};

const origin = "http://127.0.0.1:4173";
const adUrl = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2015657577739632";
const articles = ["preguntas-picantes-verdad-o-reto", "yo-prefiero-preguntas", "ring-of-fire-reglas-cartas", "reglas-del-yo-nunca"];

// The mock attempts the exact confirmed structural mutation immediately. If
// parsing has not reached the article, observe until it does (test code only).
const mockAd = `(() => {
  window.__adExecutions = (window.__adExecutions || 0) + 1;
  window.__adReady = document.readyState;
  window.__manualQueue = (window.adsbygoogle || []).length;
  window.adsbygoogle = {push() { window.__manualQueue++; }};
  const mutate = () => {
    if (window.__adProof) return true;
    const prose = document.querySelector('article .prose');
    if (!prose) return false;
    const p = prose.querySelector('p');
    window.__adProof = {
      hydrated: !!Object.keys(p || {}).find(k => k.startsWith('__reactFiber')),
      committed: window.__hydrationCommitted === true,
      at: performance.now(), ready: window.__adReady
    };
    const ad = document.createElement('div');
    ad.className = 'google-auto-placed';
    ad.innerHTML = '<ins class="adsbygoogle adsbygoogle-noablate"></ins>';
    prose.before(ad);
    return true;
  };
  if (!mutate()) {
    const observer = new MutationObserver(() => { if (mutate()) observer.disconnect(); });
    observer.observe(document.documentElement, {childList:true, subtree:true});
  }
})();`;

  const results = [];
  for (const old of [true, false]) {
    for (const width of old ? [390] : [390, 1440]) {
      const context = await page.context().browser().newContext({viewport:{width,height:width === 390 ? 844 : 900}});
      await context.addInitScript(() => {
        window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = {
          supportsFiber:true, inject:() => 1, onCommitFiberUnmount() {},
          onCommitFiberRoot(_renderer, root) {
            const pending = fiber => {
              if (!fiber) return false;
              return !!fiber.memoizedState?.dehydrated || pending(fiber.child) || pending(fiber.sibling);
            };
            window.__hydrationCommitted = root.current.memoizedState?.isDehydrated === false && !pending(root.current);
          },
        };
      });
      await context.route('**/adsbygoogle.js?*', route => route.fulfill({contentType:"application/javascript",body:mockAd}));
      // Hold every Next execution resource while the advertising resource is fast.
      await context.route('**/_next/**/*.js', async route => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await route.continue();
      });
      if (old) {
        await context.route(`${origin}/blog/${articles[0]}`, async route => {
          const response = await route.fetch();
          const html = (await response.text()).replace('</head>', `<script async src="${adUrl}" crossorigin="anonymous"></script></head>`);
          await route.fulfill({response,body:html});
        });
      }
      for (const slug of old ? articles.slice(0,1) : articles) {
        const p = await context.newPage();
        const errors = [];
        p.on('pageerror', error => errors.push(error.message));
        p.on('console', message => { if(message.type() === 'error') errors.push(message.text()); });
        await p.goto(`${origin}/blog/${slug}`);
        await p.waitForFunction(() => window.__adProof);
        await p.waitForTimeout(250);
        const proof = await p.evaluate(() => ({...window.__adProof, executions:window.__adExecutions,
          scripts:[...document.scripts].filter(s => s.src.includes('adsbygoogle.js')).length,
          overflow:document.documentElement.scrollWidth > innerWidth,
          title:document.querySelector('h1')?.textContent}));
        const hydrationErrors = errors.filter(e => /418|hydration|hydrated/i.test(e));
        if (old) {
          assert.equal(proof.hydrated, false, 'positive control must mutate before hydration');
          assert.equal(proof.committed, false);
          assert.ok(hydrationErrors.some(e => /418/.test(e)), 'positive control must reproduce React #418');
        } else {
          assert.equal(proof.hydrated, true, `${slug}: article claimed before ad execution`);
          assert.equal(proof.committed, true, `${slug}: root committed without dehydrated boundaries`);
          assert.equal(proof.ready, 'complete');
          assert.equal(proof.executions, 1);
          assert.equal(proof.scripts, 1);
          assert.equal(proof.overflow, false);
          assert.deepEqual(hydrationErrors, []);
          // Refresh exercises repeated direct hydration in the same context.
          await p.reload();
          await p.waitForFunction(() => window.__adProof);
          await p.waitForTimeout(250);
          assert.equal(await p.evaluate(() => window.__adProof.hydrated), true);
          assert.equal(await p.evaluate(() => window.__adProof.committed), true);
          assert.deepEqual(errors.filter(e => /418|hydration|hydrated/i.test(e)), []);
        }
        results.push({old,width,slug,proof,hydrationErrors});
        await p.close();
      }
      await context.close();
    }
  }
  return results;
}
