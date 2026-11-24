import { beforeBatch2bDigest } from "./critical-games-2b-export.mjs";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

const changes = JSON.parse(readFileSync(new URL("../fixtures/critical-games-export.json", import.meta.url)));
const digest = value => createHash("sha256").update(JSON.stringify(value)).digest("hex");

export function projectCriticalGames(path, previous, current) {
  const key = path === "/blog/juegos-para-beber-con-cartas" && Object.hasOwn(current, "header")
    ? path + "#before-navigation" : path;
  for (const [field, expected] of Object.entries(changes[key] ?? {})) {
    assert.deepEqual([digest(previous[field]), beforeBatch2bDigest(path, current, field)], expected, path + " " + field);
    previous[field] = current[field];
  }
}

// Reconstruct the earlier article card before applying older discovery-page guards.
export function restoreBombaCard(doc, path) {
  if (path !== "/" && path !== "/blog") return;
  if (path === "/blog") {
    const description = doc.querySelector('a[href="/blog/100-preguntas-yo-nunca"] p');
    assert.match(description.textContent, /^100 ideas de frases/);
    description.set_content("Más de " + description.textContent);
  }
  const card = doc.querySelector('a[href="/blog/la-bomba-juego-beber"]');
  const excerpt = card.querySelector("p");
  assert.equal(excerpt.textContent, "Cómo jugar a La Bomba con un temporizador secreto. Descubre quién empieza cada ronda y prueba las variantes de palabras y categorías.");
  excerpt.set_content("Aprende a jugar a La Bomba, el juego de beber más tenso y explosivo del mundo. Un temporizador secreto, palabras prohibidas y mucha presión. Descubre reglas y variaciones extremas.");
  const time = card.querySelectorAll("span").filter(node => node.textContent === "5 min");
  assert.equal(time.length, 1);
  time[0].set_content("6 min");
}
