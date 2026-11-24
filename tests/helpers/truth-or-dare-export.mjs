import { beforeBatch2bDigest, compareBatch2bExport } from "./critical-games-2b-export.mjs";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";

// Pin the complete old and new normalized body text. Every other field still
// uses the historical structural comparison with only these literal substitutions.
export function compareTruthOrDareExport(path, current, previous) {
  const game = "/juegos/verdad-o-reto";
  if (path === game || path === game + "/reglas") {
    const isGame = path === game;
    const hashes = isGame
      ? ["a6bb77b160b942186d700d581580ce388e47545892a955105b6e370bad532028", "cd89be8f951f69fbc1dd6250e76bc692f98e5ac860b6e7f0d4dd482d57e3aad9"]
      : ["8737dd8c9dcc49422ad6fc2e322b391713355aaad8ba119cce84017ae4eefc67", "f29b5563d2cae76a0aa5598d045d445c9d6d49e9747363f758579077d6d14e88"];
    for (const [i, snapshot] of [previous, current].entries()) {
      const actual = i === 1 ? beforeBatch2bDigest(path, current, "text") : createHash("sha256").update(JSON.stringify(snapshot.text)).digest("hex");
      assert.equal(actual, hashes[i], path);
    }
    previous.text = current.text;
    previous.metadata = previous.metadata.map(tag => tag
      .replace("¡Si no cumples, fondo blanco!", "Puedes pasar cualquier tarjeta.")
      .replace("Descubre las reglas para jugar a Verdad o Reto con amigos. Retos divertidos, preguntas incómodas y mucho alcohol. Conoce las variantes y sube de nivel.", "Aprende a jugar a Verdad o Reto con amigos. Elige la intensidad, descubre cómo se reparten los turnos y pasa cualquier tarjeta sin penalización."));
    for (const schema of previous.schema) {
      if (schema["@type"] === "WebApplication" && schema.description === "Elige entre responder una verdad comprometida o cumplir un reto. Si no cumples, bebes.") {
        schema.description = "Elige entre responder una pregunta o probar un reto. Puedes pasar cualquier tarjeta sin penalización.";
      }
    }
    previous.headings = previous.headings
      .filter(h => ![" El Sistema de Castigos (Regla de Oro)", " Opciones Avanzadas"].includes(h))
      .map(h => h.replace("¿Cómo funciona la versión para beber?", "¿Cómo funciona cada turno?").replace(" Bebe con responsabilidad", " Cómo pasar una tarjeta"));
  }
  compareBatch2bExport(path, current, previous);
}
