import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
const { parse } = createRequire(import.meta.url)("next/dist/compiled/node-html-parser");
export function snapshot() {
  const routes = ["es", "en"].flatMap(lang => JSON.parse(readFileSync(`tests/fixtures/${lang}-routes.json`, "utf8")));
  return Object.fromEntries(routes.map(({ pathname }) => {
    const doc = parse(readFileSync(`out${pathname === "/" ? "/index" : pathname}.html`, "utf8"));
    const result = {
      metadata: doc.querySelector("head").querySelectorAll("title,meta,link").filter(n => n.tagName !== "LINK" || ["canonical", "alternate", "manifest"].includes(n.getAttribute("rel"))).map(n => n.outerHTML),
      schemas: doc.querySelectorAll('script[type="application/ld+json"]').map(n => n.textContent),
      headings: doc.querySelectorAll("h1,h2,h3,h4,h5,h6").map(n => n.outerHTML),
      links: doc.querySelectorAll("a").map(n => n.outerHTML),
    };
    const body = doc.querySelector("body");
    body.querySelectorAll("script,style").forEach(n => n.remove());
    result.text = body.textContent.replace(/\s+/g, " ").trim();
    return [pathname, result];
  }));
}
