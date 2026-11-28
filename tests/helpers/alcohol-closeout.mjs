import assert from "node:assert/strict";

const copyChanges = {
  "/juegos/categorias/cartas": [
    [
      "¿Tienes una baraja a mano? Estos juegos no requieren más que cartas y algo para beber.",
      "Elige un juego y usa la baraja digital desde el móvil. Podéis jugar sin bebida."
    ],
    [
      "Los juegos de cartas para beber son los grandes clásicos de las previas y fiestas en casa. La mecánica es simple: cada carta del mazo tiene una regla asociada, y el azar decide quién bebe, quién manda y quién sufre. Son juegos que funcionan con cualquier tamaño de grupo y que mantienen la tensión ronda tras ronda.",
      "Los juegos de cartas para beber son clásicos de las previas y fiestas en casa. En Ring of Fire y El Rey de la Copa, cada carta propone una acción y el cuarto rey cierra la partida. En La Pirámide, las cartas reveladas dan pie a faroles y los puntos suben con cada fila."
    ]
  ],
  "/juegos/categorias/dados": [
    [
      "Gira la ruleta y deja que la suerte decida tu castigo. ¡Una alternativa perfecta y rápida a los dados!",
      "Gira la ruleta, descubre la propuesta y decide si la haces o pasas. Después juega la siguiente persona."
    ]
  ],
  "/juegos/la-ruleta/reglas": [
    [
      "El clásico juego de casino, reconvertido en la máquina de generar castigos aleatorios perfecta para cualquier fiesta. Aquí no hay estrategia que valga; todo depende del puro azar y del destino.",
      "Girad por turnos. Cada giro elige una de las 16 propuestas al azar. Puedes hacer la que salga o pasar sin penalización."
    ]
  ]
};

export function beforeAlcoholCloseoutSource(file, source) {
  const route = file.replace(/^app\/\(spanish\)/, "").replace(/\/page\.tsx$/, "");
  for (const [before, after] of copyChanges[route] ?? []) {
    assert.equal(source.split(after).length, 2, file);
    source = source.replace(after, before);
  }
  return source;
}

export function restoreAlcoholCloseoutCopy(doc, route) {
  for (const [before, after] of copyChanges[route] ?? []) {
    const paragraphs = doc.querySelectorAll("p").filter(node => node.textContent === after);
    assert.equal(paragraphs.length, 1, route);
    paragraphs[0].set_content(before);
  }
}
