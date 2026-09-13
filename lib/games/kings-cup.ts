import { shuffle } from "./shuffle";

export const SUITS = ["spades", "hearts", "diamonds", "clubs"] as const;
export const RANKS = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"] as const;
export type Rank = (typeof RANKS)[number];
export type Suit = (typeof SUITS)[number];
export type Card = { id: string; rank: Rank; suit: Suit };
export const SUIT_SYMBOLS: Record<Suit, string> = { spades: "♠", hearts: "♥", diamonds: "♦", clubs: "♣" };

// Shared by the visible server-rendered table and the playable card display.
export const CARD_RULES: Record<Rank, { label: string; name: string; rule: string }> = {
  A: { label: "Ace", name: "Wave", rule: "Send a wave around the group, one person at a time. Wave a hand or say hello; everyone can pass." },
  "2": { label: "2", name: "You", rule: "Invite someone to take a sip of any drink, or choose a word for the group to repeat. They can decline." },
  "3": { label: "3", name: "Me", rule: "Take an optional sip of your own drink, or share one good thing about your day." },
  "4": { label: "4", name: "Table", rule: "Tap the table or say 'table.' Let everyone join at their own pace; there is no last-place penalty." },
  "5": { label: "5", name: "Five favorites", rule: "Name a topic, such as snacks. Together, come up with five favorites. Help each other if you get stuck." },
  "6": { label: "6", name: "Story mix", rule: "Start a sentence with 'On the way to the party...' Each person adds a few words, or passes." },
  "7": { label: "7", name: "Heaven", rule: "Point up or say 'sky.' Give everyone time to join; this is a shared gesture, not a race." },
  "8": { label: "8", name: "Mate", rule: "Invite a willing partner to invent a team name. Your partnership lasts for this card only." },
  "9": { label: "9", name: "Rhyme", rule: "Say a word and take turns finding rhymes. Stop the round when you run out; passing has no penalty." },
  "10": { label: "10", name: "Categories", rule: "Pick a category, such as movie titles. Each person offers an example or passes. No timer needed." },
  J: { label: "Jack", name: "Make a rule", rule: "Suggest a lighthearted rule, such as giving the next card a nickname. Everyone must agree; it expires after the next card." },
  Q: { label: "Queen", name: "Questions", rule: "Ask a playful question. The next person replies with another question or passes. Keep personal topics optional." },
  K: { label: "King", name: "Crown moment", rule: "The first three Kings invite you to give someone a compliment. The fourth reveals a group finale, then you can keep playing." },
};

export const FOURTH_KING = "Fourth King — group finale! Invite everyone to share a favorite moment from the game, or pass. Keep drawing afterward if you want to finish the deck.";

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
