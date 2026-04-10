// Beer Pong Virtual — game data and logic helpers

export interface BeerPongConfig {
  cups: number; // default 10
  players: [string, string]; // team names
}

// Challenge cards shown when rules say so (bounces, etc.)
export const challenges = [
  "Si encesta de espaldas, el rival bebe 2 vasos",
  "Tiro con la mano no dominante",
  "Tiro desde 1 metro más lejos de lo normal",
  "Si fallas 3 seguidos, tu equipo bebe 1 extra",
  "Tiro con los ojos cerrados — si encesta, vale el doble",
  "Ambos jugadores tiran a la vez",
  "El rival puede intentar desviar la pelota con la mano",
  "Lleva la camiseta al revés durante esta ronda",
  "El que no lanza canta un estribillo antes del tiro",
  "Tiro sentado en el suelo",
  "El lanzador no puede hablar hasta que la pelota aterrice",
  "Si encesta en el vaso central, los rivales beben 3",
  "Ronda de 'heating up': si encestas, vuelves a tirar",
  "El equipo contrario puede hacer ruido para distraerte",
  "Tiro libre: lanza desde donde quieras de tu lado",
];

export function getRandomChallenge(): string {
  return challenges[Math.floor(Math.random() * challenges.length)];
}

// Cup positions for a triangle of N cups (10-cup layout)
// Returns an array of {row, col} positions (visual only)
export const CUP_LAYOUT_10 = [
  // row 0 (back) - 4 cups
  [0, 0], [0, 1], [0, 2], [0, 3],
  // row 1 - 3 cups
  [1, 0], [1, 1], [1, 2],
  // row 2 - 2 cups
  [2, 0], [2, 1],
  // row 3 (front) - 1 cup
  [3, 0],
];

export const CUP_LAYOUT_6 = [
  [0, 0], [0, 1], [0, 2],
  [1, 0], [1, 1],
  [2, 0],
];
