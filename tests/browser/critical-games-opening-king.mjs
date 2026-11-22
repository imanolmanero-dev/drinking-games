/* eslint-disable @typescript-eslint/no-unused-expressions -- Playwright MCP runs this function expression. */
async (page, origin = "http://127.0.0.1:4173") => {
  const context = await page.context().browser().newContext({
    viewport: { width: 390, height: 844 },
    reducedMotion: "reduce",
  });
  try {
    await context.route("**/*", route => new URL(route.request().url()).origin === origin ? route.continue() : route.abort());
    const game = await context.newPage();
    const errors = [];
    game.on("pageerror", error => errors.push(error.message));
    const navigate = async path => {
      const response = await game.goto(origin + path);
      if (response?.status() !== 200) throw Error(`${path}: HTTP ${response?.status()}`);
    };
    const visible = text => game.locator("main").getByText(text, { exact: typeof text === "string" }).waitFor({ timeout: 5000 });
    const assertLayout = async () => {
      if (errors.length) throw Error(errors.join("\n"));
      if (await game.evaluate(() => document.documentElement.scrollWidth > innerWidth)) throw Error("Horizontal overflow");
    };

    await navigate("/juegos/la-bomba");
    const referral = game.locator('main li').filter({ has: game.getByRole("link", { name: "Ring of Fire", exact: true }) });
    await referral.getByText(/El cuarto rey marca el final de la partida/).waitFor({ timeout: 5000 });
    await assertLayout();

    await navigate("/juegos/rey-de-la-copa");
    const input = game.locator("main input").first();
    for (const name of ["Ana", "Paz", "Leo"]) {
      await input.fill(name);
      await input.press("Enter");
    }
    const shuffle = (button, prefix) => button.evaluate((element, firstCards) => {
      const deck = Array.from({ length: 52 }, (_, index) => index);
      const order = [...firstCards, ...deck.filter(index => !firstCards.includes(index))];
      const values = [];
      for (let index = 51; index > 0; index--) {
        const swap = deck.indexOf(order[index]);
        values.push((swap + 0.5) / (index + 1));
        [deck[index], deck[swap]] = [deck[swap], deck[index]];
      }
      const random = Math.random;
      Math.random = () => values.shift() ?? random();
      try {
        element.click();
      } finally {
        Math.random = random;
      }
      if (values.length) throw Error("The game did not consume the prescribed shuffle");
    }, prefix);
    await shuffle(game.getByRole("button", { name: "Empezar a jugar" }), [12, 0, 25, 38, 51]);
    const advance = game.getByRole("button", { name: "Robar carta" });
    const count = kings => visible(new RegExp(`^Reyes: ${kings}/4`));
    await visible("K");
    await count(1);
    await advance.evaluate(button => { button.click(); button.click(); });
    await visible("A");
    await count(1);
    await advance.click();
    await visible("K");
    await count(2);
    await advance.click();
    await count(3);
    await advance.click();
    await visible("¡4º REY!");
    await visible("Apartad la copa del centro");
    await visible(/desechad lo que quede/);
    await advance.waitFor({ state: "hidden", timeout: 5000 });
    await shuffle(game.getByRole("button", { name: "Volver a barajar" }), [0]);
    await visible("A");
    await count(0);
    await assertLayout();
    return { viewport: "390x844", referral: "PASS", openingKing: "PASS", counts: [1, 1, 2, 3, "fourth king closes", 0] };
  } finally {
    await context.close();
  }
}
