import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { rootFile, loadingReplacements } from "./adsense-loading.mjs";
import { es02Replacements } from "./es02-baseline.mjs";

// Exact editorial + AdSense loading changes only. No whole-page exclusions.
export const es01Replacements = {
  ...es02Replacements,
  [rootFile]: loadingReplacements,
  "content/blog/preguntas-picantes-verdad-o-reto.mdx": [
    ['title: "65 preguntas picantes para Verdad o Reto (Adultos)"', 'title: "50 preguntas picantes para Verdad o Reto + 15 retos"'],
    ['excerpt: "Sube la temperatura con esta lista de 65 preguntas picantes para Verdad o Reto. Perfectas para previas con amigos de confianza."', 'excerpt: "50 preguntas picantes para Verdad o Reto y 15 retos para variar la partida. Ideas para previas con amigos de confianza."'],
    ['aquí tienes una lista de **65 preguntas picantes**. Están divididas', 'aquí tienes **50 preguntas picantes para Verdad o Reto y 15 retos** para variar la partida. Las preguntas están divididas'],
  ],
  "app/(spanish)/juegos/verdad-o-reto/layout.tsx": [
    ['Más de 80 verdades y 80 retos', '80 verdades y 80 retos'],
    ['Más de 160 tarjetas (80 verdades y 80 retos) en 3 niveles: suave, normal y picante.', '160 tarjetas (80 verdades y 80 retos) en 3 niveles: Soft, Normal y Picante.'],
  ],
  "app/(spanish)/juegos/verdad-o-reto/page.tsx": [
    ['Nuestra versión digital lo lleva al siguiente nivel con cientos de preguntas y retos organizados por intensidad.', 'Nuestra versión digital reúne 80 verdades y 80 retos organizados por intensidad.'],
    ['            <ul>\n              <li><strong>Nivel Normal:', '            <ul>\n              <li><strong>Nivel Soft (suave):</strong> Preguntas para romper el hielo y retos de imitación, baile o canciones.</li>\n              <li><strong>Nivel Normal:'],
    ['Preguntas más personales y retos que requieren valor.', 'Preguntas más íntimas y retos atrevidos.'],
    ['            <h3>Preguntas frecuentes</h3>', '            <p>Si buscas más ideas para el nivel Picante, consulta nuestras <Link href="/blog/preguntas-picantes-verdad-o-reto" className="text-amber-500 underline">50 preguntas picantes y 15 retos</Link> para Verdad o Reto.</p>\n\n            <h3>Preguntas frecuentes</h3>'],
    ['Sí. Puedes seleccionar Normal y Picante a la vez para una experiencia variada.', 'Sí. Puedes combinar Soft, Normal y Picante, o elegir solo el nivel que encaje con vuestro grupo.'],
  ],
  "scripts/audit-static-export.mjs": [
    ['export function readRouteContract(projectRoot = process.cwd()) {\n  return JSON.parse(\n    readFileSync(join(projectRoot, "tests", "fixtures", "es-routes.json"), "utf8"),\n  );\n}', 'export function readRouteContract(projectRoot = process.cwd()) {\n  const historical = JSON.parse(\n    readFileSync(join(projectRoot, "tests", "fixtures", "es-routes.json"), "utf8"),\n  );\n  // ES-01: keep the historical fixture immutable; review editorial changes separately.\n  const updates = JSON.parse(readFileSync(join(projectRoot, "tests", "fixtures", "es-editorial-updates.json"), "utf8"));\n  for (const [pathname, update] of Object.entries(updates)) {\n    if (!historical.some((route) => route.pathname === pathname)\n      || Object.keys(update).sort().join(",") !== "h1,title"\n      || typeof update.title !== "string" || typeof update.h1 !== "string") {\n      throw new Error(`Invalid editorial contract: ${pathname}`);\n    }\n  }\n  return historical.map((route) => ({ ...route, ...updates[route.pathname] }));\n}'],
  ],
};

export function assertEs01Compatible(base, paths, additionalExclusions = []) {
  const files = Object.keys(es01Replacements).filter((file) => paths.some((path) => file === path || file.startsWith(`${path}/`)));
  const exclusions = files.map((file) => `:(exclude,literal)${file}`);
  assert.equal(execFileSync("git", ["diff", base, "--", ...paths, ...additionalExclusions, ...exclusions], { encoding: "utf8" }), "");
  for (const file of files) {
    let expected = execFileSync("git", ["show", `${base}:${file}`], { encoding: "utf8" }).replace(/\r\n/g, "\n");
    for (const [before, after] of es01Replacements[file]) {
      assert.equal(expected.split(before).length - 1, 1, `${file}: exact original fragment`);
      expected = expected.replace(before, after);
    }
    assert.equal(readFileSync(file, "utf8").replace(/\r\n/g, "\n"), expected, `${file}: only explicit editorial/loading fragments`);
  }
}
