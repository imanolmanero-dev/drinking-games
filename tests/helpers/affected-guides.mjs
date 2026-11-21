import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";

const { parse } = createRequire(import.meta.url)("next/dist/compiled/node-html-parser");
export const guideChanges = JSON.parse(readFileSync(new URL("../fixtures/affected-guides.json", import.meta.url)));
export const proseHash = prose => createHash("sha256").update(prose.innerHTML.replaceAll("\r\n", "\n")).digest("hex");

function replaceText(node, before, after) {
  assert.equal(node.textContent, before);
  node.set_content(after);
}

// Project the reviewed edits onto the historical document before the existing
// whole-page comparison. All other nodes and attributes remain under that guard.
export function applyGuideChanges(previous, path) {
  if (path === "/blog") {
    for (const [slug, { minutes, excerpt }] of Object.entries(guideChanges)) {
      const card = previous.querySelector(`a[href="/blog/${slug}"]`);
      if (excerpt) replaceText(card.querySelector("p"), ...excerpt);
      replaceText(card.querySelectorAll("span").find(n => n.textContent === minutes[0]), ...minutes);
    }
    return;
  }
  const change = guideChanges[path.replace(/^\/blog\//, "")];
  if (!change) return;
  const updated = parse(readFileSync("out" + path + ".html", "utf8")).querySelector(".prose");
  const old = previous.querySelector(".prose");
  assert.deepEqual([proseHash(old), proseHash(updated)], change.prose);
  const structure = prose => prose.querySelectorAll("h2,h3,a").map(n => [
    n.tagName, n.id, n.getAttribute("href"), n.tagName === "A" ? null : n.textContent,
  ]);
  assert.deepEqual(structure(updated), structure(old));
  old.set_content(updated.innerHTML);
  for (const [question, before, after] of change.answers) {
    const heading = previous.querySelectorAll("article h3").find(n => n.textContent === question);
    replaceText(heading.parentNode.querySelector("p"), before, after);
  }
  if (change.excerpt) {
    for (const tag of previous.querySelectorAll('meta[name="description"],meta[property="og:description"]')) {
      assert.equal(tag.getAttribute("content"), change.excerpt[0]);
      tag.setAttribute("content", change.excerpt[1]);
    }
  }
  for (const script of previous.querySelectorAll('script[type="application/ld+json"]')) {
    const schema = JSON.parse(script.textContent);
    if (schema["@type"] === "Article" && change.excerpt) {
      assert.equal(schema.description, change.excerpt[0]);
      schema.description = change.excerpt[1];
    }
    if (schema["@type"] === "FAQPage") {
      for (const [question, before, after] of change.answers) {
        const answer = schema.mainEntity.find(q => q.name === question).acceptedAnswer;
        assert.equal(answer.text, before);
        answer.text = after;
      }
    }
    script.set_content(JSON.stringify(schema));
  }
}
