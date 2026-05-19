export interface CartaPiramide {
  valor: string;
  palo: "♠" | "♥" | "♦" | "♣";
  color: "red" | "black";
}

export const VALORES = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"] as const;
export const PALOS: { symbol: "♠" | "♥" | "♦" | "♣"; color: "red" | "black" }[] = [
  { symbol: "♠", color: "black" },
  { symbol: "♥", color: "red" },
  { symbol: "♦", color: "red" },
  { symbol: "♣", color: "black" },
];

/** Number of cards in each row of the pyramid, bottom to top */
export const PYRAMID_ROWS = [6, 5, 4, 3, 2, 1];

/** Total cards in the pyramid */
export const PYRAMID_TOTAL = PYRAMID_ROWS.reduce((a, b) => a + b, 0); // 21

/** Cards dealt to each player */
export const CARDS_PER_PLAYER = 4;

/** Seconds to memorize cards */
export const MEMORIZE_SECONDS = 10;

/** Generate a full 52-card deck */
export function generateDeck(): CartaPiramide[] {
  const deck: CartaPiramide[] = [];
  for (const palo of PALOS) {
    for (const valor of VALORES) {
      deck.push({ valor, palo: palo.symbol, color: palo.color });
    }
  }
  return deck;
}

/** Fisher-Yates shuffle */
export function shuffleDeck<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
