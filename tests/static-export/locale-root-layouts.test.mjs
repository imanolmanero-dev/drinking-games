import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";
import test from "node:test";
import { auditStaticExport } from "../../scripts/audit-static-export.mjs";

const require = createRequire(import.meta.url);
const { parse } = require("next/dist/compiled/node-html-parser");
const audit = auditStaticExport();
const documents = [...audit.pages.filter((page) => page.lang === "es"), ...audit.errorDocuments].map((page) => ({
  ...page,
  document: parse(readFileSync(join("out", page.htmlFile), "utf8")),
}));

test("los 72 documentos conservan un solo html/body, CSS, fuentes, AdSense y manifest españoles", () => {
  assert.equal(documents.length, 72);
  for (const { document, pathname } of documents) {
    assert.equal(document.querySelectorAll("html").length, 1, pathname);
    assert.equal(document.querySelectorAll("body").length, 1, pathname);
    assert.equal(document.querySelector("html").getAttribute("lang"), "es", pathname);
    const styles = document.querySelectorAll('link[rel="stylesheet"]');
    assert.ok(styles.length > 0, pathname);
    assert.equal(new Set(styles.map((link) => link.getAttribute("href"))).size, styles.length, pathname);
    const fonts = document.querySelectorAll('link[as="font"]');
    const css = styles.map((link) => readFileSync(join("out", new URL(link.getAttribute("href"), "https://bebergames.com").pathname), "utf8")).join("\n");
    assert.match(css, /@font-face/, pathname);
    assert.match(css, /--font-geist-sans:/, pathname);
    assert.match(css, /--font-geist-mono:/, pathname);
    for (const link of [...styles, ...fonts]) {
      assert.ok(existsSync(join("out", new URL(link.getAttribute("href"), "https://bebergames.com").pathname)), pathname);
    }
    const manifests = document.querySelectorAll('link[rel="manifest"]');
    assert.equal(manifests.length, 1, pathname);
    assert.equal(manifests[0].getAttribute("href"), "/manifest.json", pathname);
    const scripts = document.querySelectorAll("script[src]").filter((script) => script.getAttribute("src").includes("adsbygoogle.js"));
    // The executable loader is created after hydration/load/idle, not by the HTML parser.
    assert.equal(scripts.length, 0, pathname);
    assert.equal(document.querySelector('meta[name="google-adsense-account"]').getAttribute("content"), "ca-pub-2015657577739632", pathname);
    const payload = document.querySelectorAll("script:not([src])").map(script => script.textContent).join("\n");
    // Verify the client descriptor remains, without treating inert RSC text as an executable tag.
    assert.equal(payload.split('spanish-adsense').length - 1, 1, pathname);
    assert.match(payload, /lazyOnload/, pathname);
    assert.match(payload, /pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js\?client=ca-pub-2015657577739632/, pathname);
    assert.equal(document.querySelectorAll("ins.adsbygoogle").length, pathname === "/juegos/verdad-o-reto" ? 1 : 0, pathname);
  }
});

test("la metadata social global mantiene su herencia española sin URLs localhost", () => {
  for (const { document, pathname } of documents) {
    const usesRootOpenGraph = document.querySelector('meta[property="og:title"]')?.getAttribute("content") === "BeberGames — Juegos para beber con amigos";
    for (const selector of ['meta[property="og:image"]', 'meta[name="twitter:image"]']) {
      const images = document.querySelectorAll(selector);
      assert.equal(images.length, usesRootOpenGraph ? 1 : 0, `${pathname}: ${selector}`);
      for (const image of images) {
        const url = new URL(image.getAttribute("content"));
        assert.equal(url.origin, "https://bebergames.com", pathname);
        assert.equal(url.pathname, "/opengraph-image", pathname);
        assert.ok(existsSync(join("out", url.pathname)), pathname);
      }
    }
    for (const element of document.querySelectorAll("meta,link")) {
      assert.doesNotMatch(element.getAttribute("content") ?? element.getAttribute("href") ?? "", /https?:\/\/(?:localhost|127\.0\.0\.1)/, pathname);
    }
  }
});
