// Run through Playwright MCP against the production export served on port 4174.
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- invoked by MCP.
async function run(page) {
  const base = 'http://127.0.0.1:4174', results = [];
  const check = (value, message) => { if (!value) throw new Error(message); };
  for (const [width, height] of [[320,844],[390,844],[768,1024],[1440,900]]) {
    await page.setViewportSize({width,height});
    await page.goto(base+'/en/games/most-likely-to');
    await page.locator('#mlt-start').focus(); await page.keyboard.press('Enter');
    await page.locator('#mlt-next').dblclick();
    check(await page.locator('#mlt-progress').textContent()==='Prompt 2 / 20','double next');
    await page.locator('#mlt-skip').dblclick();
    check(await page.locator('#mlt-progress').textContent()==='Prompt 3 / 20','double skip');
    // A second pointer click can land on the page after focus scroll changes
    // layout. Check focus transfer separately with a single activation.
    await page.locator('#mlt-next').click();
    await page.waitForFunction(() => document.activeElement?.id === 'mlt-heading');
    const focus=await page.evaluate(()=>{const r=document.activeElement.getBoundingClientRect();return {id:document.activeElement.id,top:r.top,bottom:r.bottom};});
    check(focus.id==='mlt-heading'&&focus.top>=0&&focus.bottom<=height,'visible focus context');
    check(await page.locator('#mlt-game button').evaluateAll(es=>es.every(e=>e.getBoundingClientRect().height>=48)),'48px controls');
    check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'game overflow');
    await page.locator('#mlt-end').click();
    check(await page.locator('#mlt-heading').textContent()==='Game ended','early end');
    await page.locator('#mlt-replay').focus();await page.keyboard.press('Space');
    const seen=[];
    for(let i=1;i<=20;i++) {
      check(await page.locator('#mlt-progress').textContent()===`Prompt ${i} / 20`,'progress');
      seen.push(await page.locator('#mlt-heading').textContent());await page.locator('#mlt-next').click();
    }
    check(new Set(seen).size===20,'no repeats');
    check(await page.locator('#mlt-heading').textContent()==='Session complete','completion');
    const rect=await page.locator('#mlt-heading').boundingBox();check(rect.y>=0&&rect.y+rect.height<=height,'visible completion');
    await page.locator('#mlt-discover').click();await page.waitForURL('**/en/games');
    check(await page.locator('.en-catalog-card').count()===4,'four cards');
    check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'hub overflow');
    await page.goBack();check(page.url().endsWith('/en/games/most-likely-to'),'back');
    results.push({width,height,unique:seen.length,focus});
  }
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto(base+'/en/games/most-likely-to');await page.locator('#mlt-start').focus();await page.keyboard.press('Enter');
  await page.keyboard.press('Tab');check(await page.locator('#mlt-next').evaluate(e=>e===document.activeElement&&getComputedStyle(e).outlineStyle!=='none'),'keyboard focus ring');
  await page.keyboard.down('Enter');await page.keyboard.down('Enter');await page.keyboard.up('Enter');
  check(await page.locator('#mlt-progress').textContent()==='Prompt 2 / 20','held Enter');
  return {status:'PASS',results,reducedMotion:true};
}
