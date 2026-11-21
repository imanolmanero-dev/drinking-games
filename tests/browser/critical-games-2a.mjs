/* eslint-disable @typescript-eslint/no-unused-expressions -- Playwright MCP loads this function expression directly. */
async (page) => {
  const results = [];
  for (const [width, height] of [[320,844],[390,844],[768,1024],[1440,900]]) {
    await Promise.all(["la-bomba","ring-of-fire","rey-de-la-copa"].map(async slug => {
      const context = await page.context().browser().newContext({viewport:{width,height}, reducedMotion:"reduce"});
      try {
        await context.route("**/*", route => new URL(route.request().url()).hostname === "127.0.0.1" ? route.continue() : route.abort());
        const p = await context.newPage();
        const errors = [];
        p.on("pageerror", e => errors.push(e.message));
        await p.goto("http://127.0.0.1:4173/juegos/"+slug);
        const check = async () => {
          if (await p.evaluate(() => document.documentElement.scrollWidth > innerWidth)) throw Error(slug+" overflow at "+width);
          if (errors.length) throw Error(errors.join(", "));
        };
        const click = async (name) => {await p.getByRole("button",{name}).first().click({timeout:4000});await check()};
        const expect = async (value) => {await p.getByText(value,{exact:false}).first().waitFor({timeout:5000});await check()};
        const input = p.locator("input").first();
        for (const name of ["Ana","Paz","Leo"]) {await input.fill(name);await input.press("Enter")}
        if (slug === "la-bomba") {
          await p.clock.install();
          await click(/Encender la mecha/);
          await click(/PASAR BOMBA/);
          for (let round=1;round<=12;round++) {
            await p.clock.fastForward(41000);
            await expect("¡BOOM!");
            await expect("Paz");
            if ((await p.locator("main").innerText()).includes("Fondo blanco")) throw Error("Obsolete detonation result");
            await click(round===12?/resultados|finalizar|terminar|resumen/i:/Siguiente ronda/);
          }
          await expect("12 rondas completadas");
          await p.evaluate(() => {
            // Track the new round's own timeout and pulse across a client-side route change.
            window.bombaAudit = { timers: new Set(), pulses: new Set() };
            for (const [start, stop, active, matches] of [
              ["setTimeout", "clearTimeout", window.bombaAudit.timers, ms => ms >= 12000 && ms < 40000],
              ["setInterval", "clearInterval", window.bombaAudit.pulses, ms => ms === 800],
            ]) {
              const schedule = window[start].bind(window);
              const cancel = window[stop].bind(window);
              window[start] = (callback, delay, ...args) => {
                const id = schedule(callback, delay, ...args);
                if (matches(delay)) active.add(id);
                return id;
              };
              window[stop] = id => { active.delete(id); cancel(id) };
            }
          });
          await click(/otra vez|otra partida|repetir|jugar de nuevo/i);
          await expect("Ronda 1 de 12");
          await p.waitForFunction(() => window.bombaAudit.timers.size === 1 && window.bombaAudit.pulses.size === 1);
          await p.locator('a[href="/"]').first().evaluate(link => link.click());
          await p.waitForURL("http://127.0.0.1:4173/");
          await p.waitForFunction(() => window.bombaAudit.timers.size === 0 && window.bombaAudit.pulses.size === 0);
          await p.clock.fastForward(41000);
        } else {
          // Prescribe A, 8 and the four kings using the app's own Fisher–Yates shuffle.
          await p.evaluate(() => {
            const deck=Array.from({length:52},(_,i)=>i);
            const order=[0,7,12,25,38,51,...deck.filter(i=>![0,7,12,25,38,51].includes(i))];
            const values=[];
            for(let i=51;i>0;i--){const j=deck.indexOf(order[i]); values.push((j+0.5)/(i+1));[deck[i],deck[j]]=[deck[j],deck[i]]}
            const random=Math.random;
            const button=[...document.querySelectorAll("button")].find(b=>/empezar|iniciar|barajar/i.test(b.innerText));
            if(!button)throw Error("start missing");
            Math.random=()=>values.shift()??random();
            try{button.click()}finally{Math.random=random}
          });
          for(let i=0;i<6;i++){
            if(slug==="ring-of-fire"){
              const draw = p.locator("main button.group");
              if (i === 0) await draw.evaluate(button => { button.click(); button.click() });
              else await draw.click();
              if(i===5)break;
              await expect("Reyes: "+Math.max(0,i-1)+" / 4");
              await expect(i===0?"Levanta los brazos":i===1?"inventar un saludo":"Cuenta este rey");
              if (i === 0) await p.getByRole("button", {name:/Siguiente jugador/}).evaluate(button => { button.click(); button.click() });
              else await click(/Siguiente jugador/);
            }else{
              if(i===5)break;
              await expect(i===0?"Puedes parar inmediatamente":i===1?"compartir un saludo":"tres primeros reyes");
              await expect("Reyes: "+Math.max(0,i-1)+"/4");
              if (i === 0) await p.getByRole("button", {name:/Robar carta/}).evaluate(button => { button.click(); button.click() });
              else await click(/Robar carta/);
            }
          }
          await expect(slug==="ring-of-fire"?"Apartad la copa":"Apartad la copa del centro");
          await click(slug==="ring-of-fire"?/Otra ronda/:/Volver a barajar/);
          await expect(slug==="ring-of-fire"?"0 / 52":/Reyes: [01]\/4/);
        }
        results.push([width,slug,"PASS"]);
      } finally {await context.close()}
    }));
  }
  return results;
}
