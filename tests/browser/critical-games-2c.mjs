/* eslint-disable @typescript-eslint/no-unused-expressions -- Playwright MCP invokes this function. */
async page => {
  const origin = "http://127.0.0.1:45226";
  const results = [];
  for (const width of [320,390,768,1440]) {
    await Promise.all(["beer-pong","medusa","tabu"].map(async slug => {
      const context = await page.context().browser().newContext({
        viewport: {width, height: width === 768 ? 1024 : width === 1440 ? 900 : 844},
        reducedMotion: "reduce", serviceWorkers: "block",
      });
      try {
        await context.route("**/*", route => new URL(route.request().url()).origin === origin ? route.continue() : route.abort());
        const p = await context.newPage();
        const errors = [];
        p.on("pageerror", e => errors.push(e.message));
        // Accelerate only the game's known clock delays in this isolated test document.
        await p.addInitScript(() => {
          const timeout = window.setTimeout.bind(window), interval = window.setInterval.bind(window);
          window.setTimeout = (fn,ms,...args) => timeout(fn,[400,900,1200].includes(ms) ? 25 : ms,...args);
          window.setInterval = (fn,ms,...args) => interval(fn,ms === 1000 ? 40 : ms,...args);
        });
        await p.goto(origin + "/juegos/" + slug);
        const main = p.locator("main");
        const see = label => main.getByText(label,{exact:true}).first().waitFor({timeout:6000});
        const btn = name => main.getByRole("button",{name,exact:typeof name === "string"}).first();
        const click = name => btn(name).evaluate(node => {
          const repeat = /^(Fin de turno|Siguiente ronda|Siguiente equipo|Correcto$|¡Tabú!$)/.test(node.textContent.trim());
          node.click();
          if (repeat) node.click();
        });
        const layout = async () => {
          if (await p.evaluate(() => document.documentElement.scrollWidth > innerWidth)) throw Error(slug+" overflow "+width);
          if (errors.length) throw Error(errors.join("; "));
        };
        await layout();
        if (slug === "beer-pong") {
          const size = width === 768 ? 10 : 6;
          await click(new RegExp(size + " vasos"));
          await click(/Empezar partida/);
          const cups = main.locator("button:enabled").filter({hasText:"🍺"});
          await cups.first().waitFor();
          await cups.first().click();
          if (await cups.count() !== size - 1) throw Error("First cup");
          await cups.first().click();
          await see("🔥 On Fire!");
          for (let n=size-2;n>4;n--) await cups.first().click();
          await click("Re-rack");
          if (!await btn("Re-rack usado").isDisabled()) throw Error("Repeat rerack");
          await click("Desafío"); await see("¡Desafío Especial!"); await click("¡Aceptado!");
          await click(/Fin de turno/); await cups.first().click(); await click(/Fin de turno/);
          for (let n=4;n>0;n--) await cups.first().click();
          await see("Equipo 1 ha retirado el último vaso de Equipo 2. ¿Otra partida?");
          await layout(); await click("Revancha");
          if (await cups.count() !== size) throw Error("Rematch cup count");
        } else {
          for (const name of ["Ana","Paz","Leo","Sol"]) {
            const input = main.locator("input").first();
            await input.fill(name); await input.press("Enter");
          }
          if (slug === "medusa") {
            await click(/Empezar 15/);
            for(let n=1;n<=15;n++) {
              await see("Ronda "+n+" de 15"); await click(/Iniciar cuenta/);
              await see("¿Quién se ha mirado?"); await layout();
              await click(n===15 ? "Ver resultados" : "Siguiente ronda");
            }
            await see("¡15 rondas completadas!");
            if(width===768) {await click("Cambiar jugadores"); await btn(/Empezar 15/).waitFor();}
            else {await click("Jugar otra vez"); await see("Ronda 1 de 15");}
          } else {
            await click(/Crear equipos/);
            for(let n=1;n<=6;n++) {
              await see("Turno del Equipo "+(n%2===1 ? 1 : 2));
              await click(/Empezar turno/);
              if(n%2===1 || width===768) await click("Correcto");
              await click("¡Tabú!"); await click("Pasar");
              await see("infracciones"); await layout();
              await click(n===6 ? "Ver resultados" : "Siguiente equipo");
            }
            await see(width===768 ? "¡Empate!" : "¡Gana el Equipo 1!"); await see("3 infracciones");
            const totals=await main.getByText("puntos",{exact:true}).evaluateAll(labels=>labels.map(label=>Number(label.previousElementSibling.textContent)));
            if(String(totals)!==String([3,width===768?3:0])) throw Error("Repeated turn confirmation: "+totals);
            if(width===768) {await click("Nuevos"); await btn(/Crear equipos/).waitFor();}
            else {await click("Revancha"); await btn(/Empezar turno/).waitFor();}
          }
        }
        const article = {"beer-pong":"beer-pong-reglas-completas",medusa:"medusa-juego-beber",tabu:"tabu-juego-beber"}[slug];
        for (const path of ["/juegos/"+slug+"/reglas","/blog/"+article]) {
          await p.goto(origin+path); await main.locator("h1").waitFor(); await layout();
        }
        results.push(slug+" "+width);
      } finally { await context.close(); }
    }));
  }
  return results;
}
