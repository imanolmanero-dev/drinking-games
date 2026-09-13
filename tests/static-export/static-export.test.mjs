import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

import {
  ERROR_DOCUMENTS,
  SITE_ORIGIN,
  auditStaticExport,
  readRedirectContract,
  readRouteContract,
  readEnglishRouteContract,
} from "../../scripts/audit-static-export.mjs";

const projectRoot = process.cwd();
const routeContract = readRouteContract(projectRoot);
const redirectContract = readRedirectContract(projectRoot);
const audit = auditStaticExport(projectRoot);
const contractPathnames = routeContract.map(({ pathname }) => pathname);
const englishContract = readEnglishRouteContract(projectRoot);
const unionPathnames = sorted([...contractPathnames, ...englishContract.map(({ pathname }) => pathname)]);
const spanishPages = audit.pages.filter(({ pathname }) => contractPathnames.includes(pathname));

function sorted(values) {
  return [...values].sort((a, b) => a.localeCompare(b, "en"));
}

function sortedRedirects(redirects) {
  return [...redirects].sort((a, b) =>
    a.source.localeCompare(b.source, "en"),
  );
}

function expectedCanonical(pathname) {
  return pathname === "/" ? SITE_ORIGIN : `${SITE_ORIGIN}${pathname}`;
}

function expectedHtmlFile(pathname) {
  return pathname === "/" ? "index.html" : `${pathname.slice(1)}.html`;
}

function hasLocalePrefix(value) {
  const pathname = value.startsWith("http") ? new URL(value).pathname : value;
  return /^\/es(?:\/|$)/.test(pathname);
}

test("el fixture fija 70 rutas españolas únicas, explícitas y ordenadas", () => {
  assert.equal(routeContract.length, 70);
  assert.equal(new Set(contractPathnames).size, 70);
  assert.deepEqual(contractPathnames, sorted(contractPathnames));
  assert.ok(routeContract.every(({ pathname, title, h1 }) =>
    pathname.startsWith("/")
      && typeof title === "string"
      && title.length > 0
      && typeof h1 === "string"
      && h1.length > 0));
});

test("el inventario fuente coincide con el contrato versionado", () => {
  assert.deepEqual(audit.sourceInventory, unionPathnames);
});

test("el export contiene la unión exacta de 70 ES y 8 EN", () => {
  assert.deepEqual(audit.exportedInventory, unionPathnames);
  assert.equal(audit.pages.length, 78);
  assert.equal(spanishPages.length, 70);
  assert.equal(audit.technicalDocuments.length, 0);

  for (const document of audit.technicalDocuments) {
    assert.equal(document.indexability, "non-indexable", document.pathname);
    assert.equal(document.inSitemap, false, document.pathname);
    assert.equal(document.canonicalCount, 0, document.pathname);
  }

  for (const page of audit.pages) {
    assert.equal(page.htmlFile, expectedHtmlFile(page.pathname));
    assert.equal(
      existsSync(join(projectRoot, "out", page.htmlFile)),
      true,
      `Falta ${page.htmlFile}`,
    );
  }
});

test("las 70 páginas declaran lang es y son indexables", () => {
  for (const page of spanishPages) {
    assert.equal(page.lang, "es", page.pathname);
    assert.deepEqual(page.robots, ["index, follow"], page.pathname);
    assert.equal(page.indexability, "indexable", page.pathname);
  }
});

test("cada página tiene un canonical propio, absoluto y único", () => {
  const canonicals = [];

  for (const page of audit.pages) {
    assert.equal(page.canonicalCount, 1, page.pathname);
    assert.deepEqual(page.canonicals, [expectedCanonical(page.pathname)]);
    assert.equal(page.canonical, expectedCanonical(page.pathname));

    const canonical = new URL(page.canonical);
    assert.equal(canonical.origin, SITE_ORIGIN, page.pathname);
    assert.equal(canonical.search, "", page.pathname);
    assert.equal(canonical.hash, "", page.pathname);
    canonicals.push(page.canonical);
  }

  assert.equal(new Set(canonicals).size, 78);
  assert.equal(audit.pages[0].canonical, "https://bebergames.com");
});

test("los titles siguen presentes y asociados a su pathname", () => {
  const pagesByPathname = new Map(
    audit.pages.map((page) => [page.pathname, page]),
  );

  for (const expected of routeContract) {
    const page = pagesByPathname.get(expected.pathname);
    assert.ok(page, expected.pathname);
    assert.equal(page.titleCount, 1, expected.pathname);
    assert.equal(page.title, expected.title, expected.pathname);
  }
});

test("cada página mantiene un único H1 con el texto normalizado de baseline", () => {
  const pagesByPathname = new Map(
    audit.pages.map((page) => [page.pathname, page]),
  );

  for (const expected of routeContract) {
    const page = pagesByPathname.get(expected.pathname);
    assert.ok(page, expected.pathname);
    assert.equal(page.h1Count, 1, expected.pathname);
    assert.deepEqual(page.h1, [expected.h1], expected.pathname);
  }
});

test("el sitemap contiene exactamente la unión ES + EN sin duplicados", () => {
  assert.equal(audit.sitemap.urls.length, 78);
  assert.equal(new Set(audit.sitemap.urls).size, 78);
  assert.deepEqual(sorted(audit.sitemap.pathnames), unionPathnames);

  for (const url of audit.sitemap.urls) {
    assert.equal(new URL(url).origin, SITE_ORIGIN);
    assert.doesNotMatch(url, /(?:404|_not-found|placeholder)/i);
  }

  assert.ok(audit.pages.every(({ inSitemap }) => inSitemap));
});

test("no aparecen rutas es ni EN fuera del contrato independiente", () => {
  const checkedValues = [
    ...audit.exportedInventory,
    ...audit.sitemap.urls,
    ...audit.pages.flatMap(({ canonicals }) => canonicals),
  ];

  assert.equal(checkedValues.some(hasLocalePrefix), false);
  assert.deepEqual(audit.exportedInventory, unionPathnames);
});

test("los seis redirects históricos conservan destino y status 308", () => {
  assert.equal(redirectContract.length, 6);
  assert.equal(audit.redirects.length, 6);
  assert.equal(new Set(audit.redirects.map(({ source }) => source)).size, 6);
  assert.ok(audit.redirects.every(({ status }) => status === 308));
  assert.deepEqual(sortedRedirects(audit.redirects), redirectContract);
});

test("404 y _not-found se exportan como documentos de error razonables", () => {
  assert.deepEqual(
    audit.errorDocuments.map(({ htmlFile }) => htmlFile),
    ERROR_DOCUMENTS,
  );

  for (const document of audit.errorDocuments) {
    assert.equal(document.present, true, document.htmlFile);
    assert.equal(document.lang, "es", document.htmlFile);
    assert.equal(document.title, "Página no encontrada | BeberGames");
    assert.equal(document.titleCount, 1, document.htmlFile);
    assert.deepEqual(document.h1, ["404"], document.htmlFile);
    assert.equal(document.h1Count, 1, document.htmlFile);
    assert.equal(document.indexability, "non-indexable", document.htmlFile);
    assert.equal(document.inSitemap, false, document.htmlFile);
  }
});

test("la auditoría separa páginas, errores y métricas sin fijar límites frágiles", () => {
  assert.equal(
    audit.performance.htmlFiles,
    audit.pages.length
      + audit.errorDocuments.filter(({ present }) => present).length
      + audit.technicalDocuments.length,
  );
  assert.ok(audit.performance.totalFiles >= audit.performance.htmlFiles);
  assert.ok(audit.performance.totalBytes > 0);
  assert.ok(audit.performance.largestFile.bytes > 0);
  assert.ok(audit.performance.javascriptChunks > 0);
  assert.ok(audit.performance.javascriptChunkBytes > 0);
  assert.deepEqual(audit.httpStatusVerification, {
    status: "PENDING",
    reason:
      "El export local demuestra archivos, no los códigos HTTP de Cloudflare Pages.",
  });
});
