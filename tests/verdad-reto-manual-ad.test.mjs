import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const projectRoot = process.cwd();
const pageSource = readFileSync(
  join(projectRoot, "app/juegos/verdad-o-reto/page.tsx"),
  "utf8",
);
const adSource = readFileSync(
  join(projectRoot, "app/juegos/verdad-o-reto/VerdadRetoExperimentAd.tsx"),
  "utf8",
);
const layoutSource = readFileSync(join(projectRoot, "app/layout.tsx"), "utf8");

const setupStart = pageSource.indexOf('if (phase === "setup")');
const setupEnd = pageSource.indexOf("// GAME OVER", setupStart);
const setupSource = pageSource.slice(setupStart, setupEnd);
const gameplaySource = pageSource.slice(setupEnd);

test("la unidad solo existe en el retorno de setup", () => {
  assert.notEqual(setupStart, -1);
  assert.notEqual(setupEnd, -1);
  assert.equal(setupSource.match(/<VerdadRetoExperimentAd \/>/g)?.length, 1);
  assert.doesNotMatch(gameplaySource, /VerdadRetoExperimentAd/);
});

test("la unidad ocupa la posición editorial aprobada", () => {
  const secondIntroParagraph = setupSource.indexOf(
    "Olvídate de quedarte en blanco",
  );
  const experiment = setupSource.indexOf("<VerdadRetoExperimentAd />");
  const nextEditorialSection = setupSource.indexOf(
    "¿Cómo funciona la versión para beber?",
  );

  assert.notEqual(secondIntroParagraph, -1);
  assert.notEqual(experiment, -1);
  assert.notEqual(nextEditorialSection, -1);
  assert.ok(secondIntroParagraph < experiment);
  assert.ok(experiment < nextEditorialSection);
});

test("usa exactamente el publisher y el slot del experimento", () => {
  assert.match(adSource, /ca-pub-2015657577739632/);
  assert.match(adSource, /5189742299/);
  assert.match(adSource, /className="adsbygoogle"/);
  assert.match(adSource, /data-ad-format="auto"/);
  assert.match(adSource, /data-full-width-responsive="true"/);
});

test("inicializa una vez por montaje sin cargar otro script", () => {
  assert.equal(adSource.match(/\.push\(\{\}\)/g)?.length, 1);
  assert.match(adSource, /useRef\(false\)/);
  assert.match(adSource, /if \(initialized\.current\) return/);
  assert.doesNotMatch(adSource, /<script|pagead2\.googlesyndication/);
  assert.equal(
    layoutSource.match(/pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js/g)
      ?.length,
    1,
  );
});

test("solo hay un bloque adsbygoogle para el experimento", () => {
  assert.equal(adSource.match(/className="adsbygoogle"/g)?.length, 1);
  assert.equal(pageSource.match(/<VerdadRetoExperimentAd \/>/g)?.length, 1);
});
