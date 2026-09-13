import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join, resolve } from "node:path";
import test from "node:test";
import ts from "typescript";

const require = createRequire(import.meta.url);
const spanishRoot = "app/(spanish)/layout.tsx";
const englishRoot = "app/(english)/layout.tsx";
const read = (file) => readFileSync(file, "utf8");

function filesIn(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = `${directory}/${entry.name}`;
    return entry.isDirectory() ? filesIn(file) : [file];
  });
}

function localDependencies(entry, visited = new Set()) {
  const file = resolve(entry);
  if (visited.has(file)) return visited;
  visited.add(file);
  if (file.endsWith(".css")) return visited;

  for (const { fileName: specifier } of ts.preProcessFile(read(file)).importedFiles) {
    if (!specifier.startsWith(".") && !specifier.startsWith("@/")) continue;
    const base = specifier.startsWith("@/")
      ? resolve(specifier.slice(2))
      : resolve(dirname(file), specifier);
    const dependency = [base, `${base}.ts`, `${base}.tsx`, `${base}.js`, join(base, "index.ts"), join(base, "index.tsx")]
      .find((candidate) => existsSync(candidate) && statSync(candidate).isFile());
    assert.ok(dependency, `Import local sin resolver: ${file} -> ${specifier}`);
    localDependencies(dependency, visited);
  }
  return visited;
}

// Se ejecutan los layouts reales, sustituyendo solo CSS, next/font y los
// providers/UI ajenos al contrato de documento y metadata que probamos aquí.
function loadLayout(file) {
  const { outputText } = ts.transpileModule(read(file), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
    fileName: file,
  });
  const loaded = { exports: {} };
  const load = (specifier) => {
    if (specifier.endsWith(".css")) return {};
    if (specifier === "next/font/google") {
      const font = (options) => ({ variable: options.variable });
      return { Geist: font, Geist_Mono: font };
    }
    if (specifier.startsWith("@/") || specifier === "@vercel/analytics/next") {
      return { default: () => null, AppProvider: () => null, Analytics: () => null };
    }
    return require(specifier);
  };
  new Function("require", "module", "exports", outputText)(load, loaded, loaded.exports);
  return loaded.exports;
}

test("cada idioma tiene su propio documento html/body sin layout global", () => {
  assert.deepEqual(readdirSync("app").filter((name) => /^layout\./.test(name)), []);
  for (const [file, lang] of [[spanishRoot, "es"], [englishRoot, "en-US"]]) {
    const document = loadLayout(file).default({ children: "contenido de prueba" });
    assert.equal(document.type, "html");
    assert.equal(document.props.lang, lang);
    const children = [document.props.children].flat();
    assert.equal(children.filter((child) => child?.type === "body").length, 1);
    assert.equal(children.some((child) => child?.type === "html"), false);
  }
});

test("Fase 1 no publica páginas inglesas, prefijos es/en ni rutas fuera del grupo español", () => {
  const pages = filesIn("app").filter((file) => /\/(?:page|route)\.[cm]?[jt]sx?$/.test(file));
  assert.ok(pages.length > 0);
  for (const file of pages) {
    assert.ok(file.startsWith("app/(spanish)/"), file);
    const pathname = "/" + file.split("/").slice(1, -1).filter((part) => !part.startsWith("(")).join("/");
    assert.doesNotMatch(pathname, /^\/(?:en|es|english|spanish)(?:\/|$)/);
  }
});

test("el grafo inglés no alcanza publicidad ni PWA y los anuncios solo pertenecen a ES", () => {
  const englishDependencies = localDependencies(englishRoot);
  for (const file of englishDependencies) {
    assert.doesNotMatch(file, /\(spanish\)|InstallPWA|VerdadRetoExperimentAd/);
    assert.doesNotMatch(read(file), /adsbygoogle|googlesyndication|google-adsense-account|manifest\.json|appleWebApp|beforeinstallprompt/);
  }
  const sourceFiles = ["app", "components", "lib"].flatMap(filesIn).filter((file) => /\.[cm]?[jt]sx?$/.test(file));
  assert.deepEqual(sourceFiles.filter((file) => read(file).includes("pagead2.googlesyndication.com/pagead/js/adsbygoogle.js")), [spanishRoot]);
  assert.deepEqual(sourceFiles.filter((file) => read(file).includes("<VerdadRetoExperimentAd")), ["app/(spanish)/juegos/verdad-o-reto/page.tsx"]);
});

test("el futuro documento inglés conserva sus hijos sin manifest, scripts ni shell español", () => {
  const { renderToStaticMarkup } = require("react-dom/server");
  const { createElement } = require("react");
  const english = loadLayout(englishRoot);
  const html = renderToStaticMarkup(createElement(english.default, null, createElement("main", null, "prueba")));
  const { parse } = require("next/dist/compiled/node-html-parser");
  const document = parse(html);
  assert.equal(document.querySelector("html").getAttribute("lang"), "en-US");
  assert.equal(document.querySelector("body").innerHTML, "<main>prueba</main>");
  assert.equal(document.querySelectorAll("script, link, nav, footer").length, 0);
  assert.equal(english.metadata, undefined);
  assert.equal(english.generateMetadata, undefined);
});

test("el root español conserva la metadata PWA y monta InstallPWA", async () => {
  const spanish = loadLayout(spanishRoot);
  const metadata = await spanish.generateMetadata({}, Promise.resolve({}));
  assert.equal(metadata.manifest, "/manifest.json");
  assert.deepEqual(metadata.appleWebApp, { capable: true, statusBarStyle: "black-translucent", title: "BeberGames" });
  assert.match(read(spanishRoot), /<InstallPWA\s*\/>/);
  assert.ok(localDependencies(spanishRoot).has(resolve("components/ui/InstallPWA.tsx")));
  const manifest = JSON.parse(read("public/manifest.json"));
  assert.equal(manifest.lang, "es");
  assert.equal(manifest.start_url, "/");
});

test("la imagen social conserva descriptor y query usando el dominio español", async () => {
  const spanish = loadLayout(spanishRoot);
  const image = { url: "http://localhost:3000/opengraph-image?hash-de-prueba", width: 1200, height: 630, type: "image/png", alt: "imagen de prueba" };
  const metadata = await spanish.generateMetadata({}, Promise.resolve({ openGraph: { images: [image] } }));
  assert.deepEqual(metadata.openGraph.images, [{ ...image, url: "https://bebergames.com/opengraph-image?hash-de-prueba" }]);
  // Twitter debe seguir derivando imágenes de la metadata final de cada página.
  assert.equal(Object.hasOwn(metadata.twitter, "images"), false);
  const globalErrorMetadata = await spanish.generateMetadata({}, Promise.resolve({}));
  // Sin imagen heredada, Next debe poder aplicar la convención de archivo local.
  assert.equal(Object.hasOwn(globalErrorMetadata.openGraph, "images"), false);
});
