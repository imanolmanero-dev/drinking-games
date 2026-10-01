import { shuffle } from "./shuffle";

export const SUITS = ["spades", "hearts", "diamonds", "clubs"] as const;
export const RANKS = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"] as const;
export type Rank = (typeof RANKS)[number];
export type Suit = (typeof SUITS)[number];
export type Card = { id: string; rank: Rank; suit: Suit };
export const SUIT_SYMBOLS: Record<Suit, string> = { spades: "♠", hearts: "♥", diamonds: "♦", clubs: "♣" };

// Shared by the visible server-rendered table and the playable card display.
export const CARD_RULES: Record<Rank, { label: string; name: string; rule: string }> = {
  A: { label: "Ace", name: "Waterfall", rule: "Start a sip together. The card drawer stops first, then stopping passes around in seating order. Sip at your own pace; anyone may stop or pass at any time, without waiting. There is no minimum amount or duration." },
  "2": { label: "2", name: "You", rule: "Choose another player to take a small sip of their chosen drink. They can pass." },
  "3": { label: "3", name: "Me", rule: "Take a small sip of your own drink, or pass." },
  "4": { label: "4", name: "Floor", rule: "Everyone touches the floor. The last player takes a small sip, or passes. If reaching the floor is uncomfortable, agree on an accessible surface before playing." },
  "5": { label: "5", name: "Odds", rule: "Players with odd numbers (1, 3, 5, 7, 9, 11) take a small sip, or pass. This house rule replaces the gender-based group rule." },
  "6": { label: "6", name: "Evens", rule: "Players with even numbers (2, 4, 6, 8, 10, 12) take a small sip, or pass. This house rule replaces the gender-based group rule." },
  "7": { label: "7", name: "Heaven", rule: "Everyone raises a hand. The last player takes a small sip, or passes. Agree on an accessible gesture if needed." },
  "8": { label: "8", name: "Mate", rule: "Choose a willing player as your mate. When either of you takes a sip for a card rule, the other is invited to sip too, once; no chain reactions. Either can pass. Remember the pair at the table until the next 8 replaces it; the screen does not track mates." },
  "9": { label: "9", name: "Rhyme", rule: "Say a word, then go around finding new rhymes. The first player to repeat a rhyme or run out takes a small sip and ends the round. Anyone can pass without a sip." },
  "10": { label: "10", name: "Categories", rule: "Pick a category, such as movie titles, then go around naming examples. The first player to repeat an answer or run out takes a small sip and ends the round. Anyone can pass without a sip." },
  J: { label: "Jack", name: "Make a rule", rule: "Propose a lighthearted rule, such as no first names. Everyone must agree. Remember it at the table until the next Jack replaces it. Breaking it invites a small sip, always optional; drop any rule that makes someone uncomfortable." },
  Q: { label: "Queen", name: "Questions", rule: "Ask another player a question. They respond with a question to someone else. Continue until someone answers instead of asking a question; they take a small sip and the round ends. Anyone can pass without a sip. Safety questions and rule clarifications do not count." },
  K: { label: "King", name: "King's Cup", rule: "On each of the first three Kings, add a small optional amount of your chosen drink to the physical central cup. On the fourth King, take a small optional sip from that cup, or pass, then set it aside and discard the rest. You can end the game or continue the deck." },
};

export const FOURTH_KING = "Fourth King — resolve the King's Cup! Take a small optional sip from the physical central cup, or pass. Set it aside and discard the rest; you never need to empty it by drinking. Choose End game to stop here, or Next player to continue the remaining deck (Finish game if this was the last card).";

export function buildKingsCupDeck(): Card[] {
  return SUITS.flatMap((suit) => RANKS.map((rank) => ({ id: `${rank}-${suit}`, rank, suit })));
}

export type GameState = {
  deck: readonly Card[];
  drawn: number;
  kings: number;
  playerCount: number;
  phase: "ready" | "revealing" | "revealed" | "finished";
  paused: boolean;
};
export type GameAction = { type: "draw" | "reveal" | "next" | "pause" | "resume" | "finish" };

export function startKingsCup(playerCount: number, random: () => number = Math.random): GameState {
  if (!Number.isInteger(playerCount) || playerCount < 2 || playerCount > 12) throw new Error("Choose 2 to 12 players");
  return { deck: shuffle(buildKingsCupDeck(), random), drawn: 0, kings: 0, playerCount, phase: "ready", paused: false };
}

/** Repeated draw/next events are idempotent until the matching stage completes. */
export function kingsCupReducer(state: GameState, action: GameAction): GameState {
  if (state.phase === "finished") return state;
  if (action.type === "finish") return { ...state, phase: "finished", paused: false };
  if (action.type === "pause") return { ...state, paused: true };
  if (action.type === "resume") return { ...state, paused: false };
  // A pending reveal may settle while paused; drawing/advancing stays blocked.
  if (action.type === "reveal") return state.phase === "revealing" ? { ...state, phase: "revealed" } : state;
  if (state.paused) return state;
  if (action.type === "draw" && state.phase === "ready" && state.drawn < state.deck.length) {
    return { ...state, phase: "revealing", drawn: state.drawn + 1, kings: state.kings + (state.deck[state.drawn].rank === "K" ? 1 : 0) };
  }
  if (action.type === "next" && state.phase === "revealed") {
    return { ...state, phase: state.drawn === state.deck.length ? "finished" : "ready" };
  }
  return state;
}

export function currentPlayerNumber(state: GameState): number {
  const turn = state.phase === "ready" ? state.drawn : Math.max(0, state.drawn - 1);
  return turn % state.playerCount + 1;
}
