import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { createRequire } from "node:module";
import { join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const { parse } = require("next/dist/compiled/node-html-parser");

export const SITE_ORIGIN = "https://bebergames.com";

export const GENERAL_PATHS = [
  "/",
  "/blog",
  "/contacto",
  "/juegos",
  "/legal/aviso-legal",
  "/legal/cookies",
  "/legal/privacidad",
  "/sobre-nosotros",
];

export const GAME_SLUGS = [
  "beer-pong",
  "la-bomba",
  "la-piramide",
  "la-ruleta",
  "medusa",
  "quien-es-mas-probable",
  "rey-de-la-copa",
  "ring-of-fire",
  "tabu",
  "triman",
  "verdad-o-reto",
  "yo-nunca",
  "yo-prefiero",
];

export const CATEGORY_SLUGS = [
  "cartas",
  "dados",
  "preguntas",
  "sin-materiales",
];

export const ERROR_DOCUMENTS = ["404.html", "_not-found.html"];

function toPosixPath(pathname) {
  return pathname.split(sep).join("/");
}

function sorted(values) {
  return [...values].sort((a, b) => a.localeCompare(b, "en"));
}

export function normalizeText(value) {
  return value.replace(/\s+/g, " ").trim();
}

function walkFiles(directory) {
  const files = [];

  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const absolutePath = join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkFiles(absolutePath));
    } else if (entry.isFile()) {
      files.push(absolutePath);
    }
  }

  return files;
}

export function buildSourceInventory(projectRoot = process.cwd()) {
  const blogDirectory = join(projectRoot, "content", "blog");
  const blogPaths = readdirSync(blogDirectory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => `/blog/${entry.name.slice(0, -4)}`);
  const gamePaths = GAME_SLUGS.flatMap((slug) => [
    `/juegos/${slug}`,
    `/juegos/${slug}/reglas`,
  ]);
  const categoryPaths = CATEGORY_SLUGS.map(
    (slug) => `/juegos/categorias/${slug}`,
  );

  return sorted([
    ...GENERAL_PATHS,
    ...gamePaths,
    ...categoryPaths,
    ...blogPaths,
    // Independent of the registry and fixtures: discover actual EN page files.
    ...walkFiles(join(projectRoot, "app", "(english)"))
      .filter((file) => /[\\/]page\.tsx$/.test(file))
      .map((file) => "/" + toPosixPath(relative(join(projectRoot, "app", "(english)"), file)).slice(0, -"/page.tsx".length)),
  ]);
}

export function pathnameFromHtmlFile(htmlFile) {
  const normalized = toPosixPath(htmlFile);

  if (normalized === "index.html") return "/";
  if (normalized.endsWith("/index.html")) {
    return `/${normalized.slice(0, -"/index.html".length)}`;
  }

  return `/${normalized.slice(0, -".html".length)}`;
}

function extractRobots(document) {
  return document
    .querySelectorAll("meta")
    .filter((element) => element.getAttribute("name")?.toLowerCase() === "robots")
    .map((element) => normalizeText(element.getAttribute("content") ?? ""))
    .filter(Boolean);
}

function getIndexability(robots) {
  const directives = robots
    .flatMap((content) => content.toLowerCase().split(","))
    .map((directive) => directive.trim());

  if (directives.includes("noindex")) return "non-indexable";
  if (directives.includes("index")) return "indexable";
  return "unspecified";
}

export function inspectHtml(html, pathname, htmlFile, inSitemap) {
  const document = parse(html);
  const canonicals = document
    .querySelectorAll("link")
    .filter((element) =>
      (element.getAttribute("rel") ?? "")
        .toLowerCase()
        .split(/\s+/)
        .includes("canonical"),
    )
    .map((element) => element.getAttribute("href") ?? "");
  const titles = document
    .querySelectorAll("title")
    .map((element) => normalizeText(element.textContent));
  const h1 = document
    .querySelectorAll("h1")
    .map((element) => normalizeText(element.textContent));
  const robots = extractRobots(document);

  return {
    pathname,
    htmlFile,
    canonical: canonicals[0] ?? null,
    canonicalCount: canonicals.length,
    canonicals,
    lang: document.querySelector("html")?.getAttribute("lang") ?? null,
    title: titles[0] ?? null,
    titleCount: titles.length,
    h1,
    h1Count: h1.length,
    inSitemap,
    robots,
    indexability: getIndexability(robots),
    languages: document.querySelectorAll("link[hreflang]").map((link) => ({
      locale: link.getAttribute("hreflang"), url: link.getAttribute("href"),
    })),
    adScripts: document.querySelectorAll("script[src]").filter((script) => /adsbygoogle|googlesyndication|doubleclick/.test(script.getAttribute("src"))).length,
    adSlots: document.querySelectorAll("ins.adsbygoogle, [data-ad-slot]").length,
    manifests: document.querySelectorAll('link[rel="manifest"]').length,
  };
}

export function readSitemapUrls(outDirectory) {
  const sitemapFile = join(outDirectory, "sitemap.xml");
  const document = parse(readFileSync(sitemapFile, "utf8"));

  return document
    .querySelectorAll("loc")
    .map((element) => normalizeText(element.textContent));
}

export function readRedirects(redirectsFile) {
  return readFileSync(redirectsFile, "utf8")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"))
    .map((line, index) => {
      const fields = line.split(/\s+/);
      if (fields.length !== 3 || !/^\d{3}$/.test(fields[2])) {
        throw new Error(
          `Redirect inválido en ${redirectsFile}:${index + 1}: ${line}`,
        );
      }

      return {
        source: fields[0],
        destination: fields[1],
        status: Number(fields[2]),
      };
    });
}

function urlToPathname(url) {
  const parsed = new URL(url);
  return parsed.pathname === "/" ? "/" : parsed.pathname.replace(/\/$/, "");
}

export function readRouteContract(projectRoot = process.cwd()) {
  return JSON.parse(
    readFileSync(join(projectRoot, "tests", "fixtures", "es-routes.json"), "utf8"),
  );
}

export function readEnglishRouteContract(projectRoot = process.cwd()) {
  return JSON.parse(readFileSync(join(projectRoot, "tests", "fixtures", "en-routes.json"), "utf8"));
}

export function readRedirectContract(projectRoot = process.cwd()) {
  return JSON.parse(
    readFileSync(
      join(projectRoot, "tests", "fixtures", "es-redirects.json"),
      "utf8",
    ),
  );
}

export function auditStaticExport(projectRoot = process.cwd()) {
  const outDirectory = join(projectRoot, "out");
  if (!existsSync(outDirectory)) {
    throw new Error('No existe out/. Ejecuta primero "npm run build".');
  }

  const sitemapUrls = readSitemapUrls(outDirectory);
  const sitemapPathnames = sitemapUrls.map(urlToPathname);
  const sitemapSet = new Set(sitemapPathnames);
  const allFiles = walkFiles(outDirectory);
  const htmlFiles = sorted(
    allFiles
      .filter((file) => file.endsWith(".html"))
      .map((file) => toPosixPath(relative(outDirectory, file))),
  );
  const expectedErrorSet = new Set(ERROR_DOCUMENTS);
  const publicHtmlFiles = htmlFiles.filter((file) => !expectedErrorSet.has(file));
  const htmlDocuments = publicHtmlFiles
    .map((htmlFile) => {
      const pathname = pathnameFromHtmlFile(htmlFile);
      return inspectHtml(
        readFileSync(join(outDirectory, htmlFile), "utf8"),
        pathname,
        htmlFile,
        sitemapSet.has(pathname),
      );
    })
    .sort((a, b) => a.pathname.localeCompare(b.pathname, "en"));
  const pages = htmlDocuments.filter(
    (document) =>
      document.indexability !== "non-indexable"
      || document.inSitemap
      || document.canonicalCount > 0,
  );
  const technicalDocuments = htmlDocuments.filter(
    (document) => !pages.includes(document),
  );
  const errorDocuments = ERROR_DOCUMENTS.map((htmlFile) => {
    const absolutePath = join(outDirectory, htmlFile);
    if (!existsSync(absolutePath)) {
      return { htmlFile, present: false };
    }

    const pathname = pathnameFromHtmlFile(htmlFile);
    return {
      ...inspectHtml(
        readFileSync(absolutePath, "utf8"),
        pathname,
        htmlFile,
        sitemapSet.has(pathname),
      ),
      present: true,
    };
  });
  const fileStats = allFiles.map((file) => ({
    file: toPosixPath(relative(outDirectory, file)),
    bytes: statSync(file).size,
  }));
  const largestFile = [...fileStats].sort(
    (a, b) => b.bytes - a.bytes || a.file.localeCompare(b.file, "en"),
  )[0];
  const javascriptChunks = fileStats.filter(
    ({ file }) => file.startsWith("_next/static/chunks/") && file.endsWith(".js"),
  );

  return {
    sourceInventory: buildSourceInventory(projectRoot),
    exportedInventory: pages.map(({ pathname }) => pathname),
    pages,
    sitemap: {
      urls: sitemapUrls,
      pathnames: sitemapPathnames,
    },
    redirects: readRedirects(join(projectRoot, "public", "_redirects")),
    errorDocuments,
    technicalDocuments,
    httpStatusVerification: {
      status: "PENDING",
      reason:
        "El export local demuestra archivos, no los códigos HTTP de Cloudflare Pages.",
    },
    performance: {
      totalFiles: fileStats.length,
      totalBytes: fileStats.reduce((total, file) => total + file.bytes, 0),
      htmlFiles: htmlFiles.length,
      largestFile,
      javascriptChunks: javascriptChunks.length,
      javascriptChunkBytes: javascriptChunks.reduce(
        (total, file) => total + file.bytes,
        0,
      ),
    },
  };
}

function arraysEqual(left, right) {
  return left.length === right.length
    && left.every((value, index) => value === right[index]);
}

function containsSpanishPrefix(value) {
  const pathname = value.startsWith("http") ? new URL(value).pathname : value;
  return /^\/es(?:\/|$)/.test(pathname);
}

export function validateStaticExportAudit(audit, projectRoot = process.cwd()) {
  const violations = [];
  const routeContract = readRouteContract(projectRoot);
  const englishContract = readEnglishRouteContract(projectRoot);
  const redirectContract = readRedirectContract(projectRoot);
  const spanishPathnames = routeContract.map(({ pathname }) => pathname);
  const englishPathnames = englishContract.map(({ pathname }) => pathname);
  const contractPathnames = sorted([...spanishPathnames, ...englishPathnames]);
  const pagesByPathname = new Map(
    audit.pages.map((page) => [page.pathname, page]),
  );

  if (routeContract.length !== 70 || new Set(spanishPathnames).size !== 70) {
    violations.push("El contrato no contiene 70 rutas únicas.");
  }
  if (!arraysEqual(spanishPathnames, sorted(spanishPathnames)) || !arraysEqual(englishPathnames, sorted(englishPathnames))) {
    violations.push("El contrato de rutas no está ordenado.");
  }
  if (englishContract.length !== 7 || new Set(englishPathnames).size !== 7 || englishPathnames.some((path) => !/^\/en(?:\/|$)/.test(path))) {
    violations.push("El contrato inglés no contiene exactamente 7 rutas /en únicas.");
  }
  if (audit.technicalDocuments.length !== 0) {
    violations.push("El export contiene documentos adicionales fuera del contrato, aunque tengan noindex.");
  }
  if (!arraysEqual(audit.sourceInventory, contractPathnames)) {
    violations.push("El inventario fuente no coincide con el contrato.");
  }
  if (!arraysEqual(audit.exportedInventory, contractPathnames)) {
    violations.push("El inventario exportado no coincide con el contrato.");
  }
  if (!arraysEqual(sorted(audit.sitemap.pathnames), contractPathnames)) {
    violations.push("El sitemap no coincide con el contrato.");
  }
  if (new Set(audit.sitemap.urls).size !== audit.sitemap.urls.length) {
    violations.push("El sitemap contiene URLs duplicadas.");
  }

  for (const expected of [...routeContract, ...englishContract]) {
    const page = pagesByPathname.get(expected.pathname);
    if (!page) continue;

    const expectedCanonical = expected.pathname === "/"
      ? SITE_ORIGIN
      : `${SITE_ORIGIN}${expected.pathname}`;
    const expectedLang = englishPathnames.includes(expected.pathname) ? "en-US" : "es";
    if (page.lang !== expectedLang) {
      violations.push(`${expected.pathname}: lang no es ${expectedLang}.`);
    }
    if (page.indexability !== "indexable") {
      violations.push(`${expected.pathname}: no consta como indexable.`);
    }
    if (page.canonicalCount !== 1 || page.canonical !== expectedCanonical) {
      violations.push(`${expected.pathname}: canonical inesperado.`);
    }
    if (page.titleCount !== 1 || page.title !== expected.title) {
      violations.push(`${expected.pathname}: title inesperado.`);
    }
    if (page.h1Count !== 1 || page.h1[0] !== expected.h1) {
      violations.push(`${expected.pathname}: H1 inesperado.`);
    }
    if (!page.inSitemap) {
      violations.push(`${expected.pathname}: ausente del sitemap.`);
    }
    if (expectedLang === "en-US" && (page.adScripts || page.adSlots || page.manifests)) {
      violations.push(`${expected.pathname}: EN contiene anuncios o manifest.`);
    }
    const pair = englishContract.find((route) => route.equivalentEs && (route.pathname === expected.pathname || route.equivalentEs === expected.pathname));
    const expectedLanguages = pair ? [
      { locale: "es", url: pair.equivalentEs === "/" ? SITE_ORIGIN : `${SITE_ORIGIN}${pair.equivalentEs}` },
      { locale: "en-US", url: `${SITE_ORIGIN}${pair.pathname}` },
    ] : [];
    if (!arraysEqual(sorted(page.languages.map((link) => JSON.stringify(link))), sorted(expectedLanguages.map((link) => JSON.stringify(link))))) {
      violations.push(`${expected.pathname}: hreflang inesperado (DELIBERATE SEO ADDITION solo para equivalentes).`);
    }
  }

  const canonicalValues = audit.pages.flatMap(({ canonicals }) => canonicals);
  if (new Set(canonicalValues).size !== canonicalValues.length) {
    violations.push("Hay canonicals duplicados.");
  }

  const localeCheckedValues = [
    ...audit.exportedInventory,
    ...audit.sitemap.urls,
    ...canonicalValues,
  ];
  if (localeCheckedValues.some(containsSpanishPrefix)) {
    violations.push("El export contiene una URL /es.");
  }
  if (audit.sitemap.urls.some((url) => new URL(url).origin !== SITE_ORIGIN || url !== (new URL(url).pathname === "/" ? SITE_ORIGIN : `${SITE_ORIGIN}${new URL(url).pathname}`) || (new URL(url).pathname !== "/" && new URL(url).pathname.endsWith("/")))) {
    violations.push("El sitemap contiene URLs no canónicas.");
  }

  const actualRedirects = sorted(
    audit.redirects.map((redirect) => JSON.stringify(redirect)),
  );
  const expectedRedirects = sorted(
    redirectContract.map((redirect) => JSON.stringify(redirect)),
  );
  if (!arraysEqual(actualRedirects, expectedRedirects)) {
    violations.push("Los redirects no coinciden con el contrato histórico.");
  }
  if (
    new Set(audit.redirects.map(({ source }) => source)).size
      !== audit.redirects.length
  ) {
    violations.push("Hay redirects de origen duplicados.");
  }

  for (const errorDocument of audit.errorDocuments) {
    if (
      !errorDocument.present
      || errorDocument.lang !== "es"
      || errorDocument.title !== "Página no encontrada | BeberGames"
      || errorDocument.h1Count !== 1
      || errorDocument.h1[0] !== "404"
      || errorDocument.indexability !== "non-indexable"
      || errorDocument.inSitemap
    ) {
      violations.push(`${errorDocument.htmlFile}: baseline de error inesperada.`);
    }
  }

  return violations;
}

function isDirectExecution() {
  return process.argv[1]
    && fileURLToPath(import.meta.url) === resolve(process.argv[1]);
}

if (isDirectExecution()) {
  const audit = auditStaticExport();
  const violations = validateStaticExportAudit(audit);
  console.log(JSON.stringify({
    validation: {
      status: violations.length === 0 ? "PASS" : "FAIL",
      violations,
    },
    ...audit,
  }, null, 2));
  if (violations.length > 0) process.exitCode = 1;
}
