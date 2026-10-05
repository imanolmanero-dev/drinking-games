import assert from "node:assert/strict";

export function normalizeRuleText(text) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[*_]/g, "").replace(/\s+/g, " ").trim().toLowerCase();
}

// Concept families, not a blacklist of the current sentences. Negated obligation
// verbs remain valid: "no obliga a beber" is protection, not an instruction.
const coercionPatterns = [
  ["required drinking or disclosure", /(?<!no )(?<!nunca )\b(?:debe(?:s|n|ra|ras|ran)?|tiene(?:s|n)? que|hay que|toca|(?:es )?obligatori[oa]|obligad[oa]s? a|obliga(?:n)? a|exige(?:n)?)\s+(?:(?:siempre|tambien|obligatoriamente)\s+){0,2}(?:beber|vaciar|(?:dar|tomar)\s+(?:(?:un|una|el|otro)\s+)?(?:trago|sorbo|vaso)|contar|explicar|revelar)\b/],
  ["implicit creator or group drinking", /\b(?:todos|el creador|el infractor|el que lo haya hecho,?|quien (?:dijo|propuso|formulo) la frase)\s+(?:se\s+)?bebe(?:n)?\b/],
  ["drinking as punishment", /\bbebe(?:n|s)?\s+como\s+(?:penalizacion|castigo)\b/],
  ["quantity escalation", /\b(?:beber|bebe(?:n|s)?|tomar|dar)\s+(?:el doble|(?:un\s+)?vaso entero)\b|\b(?:\d+|dos|tres|cuatro|cinco)\s+(?:tragos|sorbos)\s+(?:seguidos|consecutivos)\b/],
  ["passing penalty", /\bsi\s+(?:pasas|pasais|alguien pasa|te niegas|no respondes)\s*,?\s*(?:debes?\s+|tienes? que\s+)?(?:beb(?:es|er)|pierdes?\s+(?:un\s+)?(?:dedo|punto)|recibes?\s+(?:un\s+)?castigo)\b/],
  ["forced story", /(?<!no )(?<!nunca )\b(?:exigir|exige(?:n)?|obligar)\s+(?:a\s+)?que\s+(?:cuente|explique|revele)\b/],
  ["required alcohol", /\b(?:alcohol|bebida alcoholica)\s+(?:es\s+)?(?:obligatori[oa]|necesari[oa])\b|(?<!no )\b(?:necesitas?|requiere(?:n)?)\s+(?:(?:beber|consumir)\s+)?alcohol\b/],
];

export function assertNoCoercion(text) {
  const normalized = normalizeRuleText(text)
    .replace(/\bno es (?:una regla )?universal ni obliga a beber\b/g, "no obliga a beber");
  for (const [concept, pattern] of coercionPatterns) {
    assert.doesNotMatch(normalized, pattern, concept);
  }
}

export function assertChosenReaction(text) {
  assertNoCoercion(text);
  const normalized = normalizeRuleText(text);
  assert.match(normalized, /levantar la mano|levantan la mano/);
  assert.match(normalized, /bajar un dedo|bajan un dedo/);
  assert.match(normalized, /acordad|acordado|regla elegida|segun lo acordado/);
  assert.match(normalized, /sorbo pequeno y opcional/);
  assert.match(normalized, /pasar sin penalizacion|pasar sin explicar/);
}

export function assertCreatorRule(text) {
  assertNoCoercion(text);
  assert.match(text, /si nadie (?:ha hecho lo dicho|lo ha hecho)/i);
  assert.match(text, /(?:siguiente turno sin consecuencia|sigue sin consecuencia)/i);
  assert.match(text, /opcional/i);
  assert.match(text, /acordado antes|acordarse antes/i);
  assert.match(text, /no (?:es (?:una regla )?universal ni )?obliga a beber/i);
}

export function assertAlcoholFree(text) {
  assertNoCoercion(text);
  assert.match(text, /levantar la mano|levantan la mano/i);
  assert.match(text, /cinco dedos/i);
  assert.match(text, /bajar? (?:un|uno)|bajan (?:un|uno)/i);
  assert.match(text, /turnos/i);
  assert.match(text, /terminar/i);
  assert.match(text, /pasar sin (?:penalización|explicar)/i);
}
