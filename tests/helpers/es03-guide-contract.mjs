import assert from "node:assert/strict";

const normalize = text => text.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase().replace(/[*_]/g, "").replace(/\s+/g, " ");

// Check each clause: a protective sentence must not hide a later obligation.
export function assertNoCoerciveGuideCopy(text) {
  const clauses = normalize(text).split(/[.!?;:\n]|\b(?:pero|sin embargo)\b/);
  const forbidden = [
    /\b(?:nadie puede|nadie debe|no puedes|no podeis|no se puede) (?:parar|dejar de beber)/,
    /\b(?:debes?|debeis|tienes? que|teneis que|hay que|es obligatorio) (?:echar|anadir|verter|aportar|beber\w*|seguir bebiendo|terminar|vaciar|acabar)/,
    /\b(?:bebe\w*|termina\w*|vacia\w*|acaba\w*)\b[^.!?;:]{0,65}\b(?:enter[oa]|toda (?:la|esa) mezcla|todo el (?:vaso|contenido))/,
    /\b(?:terminar|vaciar|acabar) (?:la copa|el vaso|la mezcla)/,
    /\bde golpe\b|\bsin excusas\b/,
  ];
  for (let clause of clauses) {
    // Remove only negated requirements. A positive obligation after "y" survives.
    clause = clause.replace(/\bno (?:tienes? que|teneis que|debes?|debeis|hay que|es obligatorio)\s+.*?(?=,|\by (?:debes?|tienes? que|hay que)\b|$)/g, "");
    clause = clause.replace(/\bsin (?:exigir|obligar)(?:le)?\b.*?(?=,|\by (?:debes?|tienes? que|hay que)\b|$)/g, "");
    clause = clause.replace(/\bninguna regla puede obligar a beber o impedir parar\b/g, "");
    for (const pattern of forbidden) assert.doesNotMatch(clause, pattern, "contradictory drinking instruction");
  }
}

export function assertReyGuideContract({ intro, ace, kings, faqs, fullText }) {
  for (const part of [intro, ace, kings, ...faqs]) assertNoCoerciveGuideCopy(part);
  assertNoCoerciveGuideCopy(fullText);
  assert.match(normalize(intro), /opcional/);
  assert.match(normalize(intro), /sin alcohol/);
  assert.match(normalize(intro), /puede pasar/);
  assert.match(normalize(ace), /(?:cascada|waterfall)/);
  assert.match(normalize(ace), /(?:izquierda|turnos|secuencia)/);
  assert.match(normalize(ace), /sorbo pequeno y opcional/);
  assert.match(normalize(ace), /pasar o parar en cualquier momento/);
  assert.match(normalize(kings), /(?:1º|primer)[\s\S]*(?:3º|tercer)/);
  assert.match(normalize(kings), /(?:anadir|aportar).*pequena y opcional/);
  assert.match(normalize(kings), /(?:agua|refresco)/);
  assert.match(normalize(kings), /(?:4º|cuarto).*termina.*variante/);
  assert.match(normalize(kings), /sorbo pequeno y opcional o pasar/);
  assert.match(normalize(kings), /(?:retir|apart).*desech/);
  assert.match(normalize(faqs.join(" ")), /aportacion pequena y opcional/);
  assert.match(normalize(faqs.join(" ")), /sorbo pequeno y opcional o pasar/);
  assert.match(normalize(faqs.join(" ")), /(?:retir|apart).*desech/);
}
