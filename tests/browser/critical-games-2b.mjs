/* eslint-disable @typescript-eslint/no-unused-expressions -- Playwright MCP executes this function. */
async (page, widths = [320, 390, 768, 1440]) => {
  const results = [];
  for (const width of widths) {
    await Promise.all(["la-piramide", "triman", "yo-prefiero", "quien-es-mas-probable"].map(async slug => {
      const height = width === 1440 ? 900 : width === 768 ? 1024 : 844;
      const context = await page.context().browser().newContext({viewport: {width, height}, reducedMotion: "reduce", serviceWorkers: "block"});
      try {
        await context.route("**/*", route => new URL(route.request().url()).origin === "http://127.0.0.1:4173" ? route.continue() : route.abort());
        const p = await context.newPage();
        const errors = [];
        p.on("pageerror", error => errors.push(error.message));
        await p.goto("http://127.0.0.1:4173/juegos/" + slug);
        const main = p.locator("main");
        const see = label => main.getByText(label, {exact: typeof label === "string"}).first().waitFor({timeout: 5000});
        const click = async (name, twice = false) => {
          const button = main.getByRole("button", {name}).first();
          await button.waitFor({timeout: 5000});
          await button.evaluate((node, twice) => {node.click(); if (twice) node.click();}, twice);
        };
        const layout = async () => {
          if (await p.evaluate(() => document.documentElement.scrollWidth > innerWidth)) throw Error(slug + " overflow at " + width);
          if (errors.length) throw Error(errors.join(", "));
        };
        await layout();
        if (slug !== "quien-es-mas-probable") {
          const input = main.locator("input").first();
          for (const name of ["Ana","Paz","Leo"]) {await input.fill(name); await input.press("Enter");}
        }
        if (slug === "la-piramide") {
          // An unshuffled deck gives Ana ranks 9 through Q after the 21 pyramid cards.
          await p.evaluate(() => { Math.random = () => 0.9999; });
          await click(/Empezar el juego/);
          await see("¡Memoriza tus cartas!");
          await main.getByRole("button", {name:"Revelar carta"}).waitFor({timeout:15000});
          for (let i=0; i<21; i++) {
            await see("Carta: " + (i+1) + " / 21");
            await see("Turno de " + ["Ana","Paz","Leo"][i%3]);
            await click("Revelar carta");
            const points = [6,11,15,18,20,21].findIndex(end => i < end) + 1;
            await see(new RegExp("anota " + points*2 + " puntos en papel"));
            await click("Comprobar a Ana");
            const challenge = i >= 8 && i <= 11 ? "El retador" : "Ana";
            await see(new RegExp(challenge + " anota " + points*2 + " puntos[.]$"));
            await layout();
            await click("Siguiente carta", i === 0);
          }
          await see("¡PIRÁMIDE COMPLETADA!");
          await click("Otra ronda");
          await see("¡Memoriza tus cartas!");
        } else if (slug === "triman") {
          const roll = async (name, face) => {
            const button = main.getByRole("button", {name});
            await button.waitFor({timeout: 6000});
            await button.evaluate((node, face) => { Math.random = () => (face - 0.5) / 6; node.click(); }, face);
          };
          await click("Buscar al Triman");
          await roll(/Lanzar dado para Ana/,3);
          const outcomes = [/marcar un ritmo/, /desde la derecha/, /reverencia/, /desde la izquierda/, /inventas un gesto/, /ola alrededor/];
          let chosePlayer = false;
          for (const face of [1,2,3,3,4,5,5,6]) {
            await roll(/^Lanzar dado$/,face);
            if (face === 5) {
              await see("¿A quién invitas a inventar un gesto?");
              if (chosePlayer) {await click("Pasar sin elegir"); continue;}
              await click(/Ana/);
              chosePlayer = true;
            }
            await see(outcomes[face-1]);
            await layout();
            await click("Siguiente turno", face === 1);
          }
          await click("Nuevo Triman");
          await roll(/Lanzar dado para Ana/,1);
          await roll(/Lanzar dado para Paz/,3);
          await see(/Paz es el Triman/);
          await main.getByRole("button",{name:"Nuevo Triman"}).waitFor();
          await click(/Reiniciar|Cambiar jugadores|Salir|Terminar/i);
          await see("Reglas del dado");
        } else {
          const dilemma = slug === "yo-prefiero";
          await click(/Empezar/);
          const counter = main.getByText(/^Pregunta 1 de \d+$/);
          const count = Number((await counter.innerText()).split(" ").pop());
          for (let i=1; i<=count; i++) {
            await see("Pregunta " + i + " de " + count);
            await see(dilemma ? /Puedes abstenerte/ : /Compartid la nominación/);
            await layout();
            await click(/Siguiente dilema|Ver resultados|Siguiente pregunta/, i===1);
          }
          await see(dilemma ? "¡Se acabaron los dilemas!" : "¡Se acabaron las preguntas!");
          await click(dilemma ? "Jugar otra vez" : "Volver a jugar");
          if (!dilemma) await click(/Empezar/);
          await see("Pregunta 1 de " + count);
        }
        results.push({slug,width,height});
      } finally {await context.close();}
    }));
  }
  return results;
}
