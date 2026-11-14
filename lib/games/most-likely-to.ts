import { MOST_LIKELY_PROMPTS, type MostLikelyPrompt } from "@/lib/data/most-likely-to-prompts";
import { shuffle } from "@/lib/games/shuffle";

export const SESSION_LENGTH = 20;
export type MostLikelyState = {
  session: number;
  deck: readonly MostLikelyPrompt[];
  index: number;
  phase: "playing" | "completed";
  completed: boolean;
};
export type MostLikelyAction = {
  type: "next" | "skip" | "end";
  expectedSession: number;
  expectedIndex: number;
};

export function startMostLikely(session: number, random: () => number = Math.random, pool = MOST_LIKELY_PROMPTS): MostLikelyState {
  if (pool.length < SESSION_LENGTH || new Set(pool.map(p => p.id)).size !== pool.length || new Set(pool.map(p => p.text.trim().toLowerCase())).size !== pool.length) {
    throw new RangeError("A session needs at least 20 unique prompts");
  }
  return { session, deck: shuffle(pool, random).slice(0, SESSION_LENGTH), index: 0, phase: "playing", completed: false };
}

export function mostLikelyReducer(state: MostLikelyState, action: MostLikelyAction): MostLikelyState {
  if (state.phase !== "playing" || action.expectedSession !== state.session || action.expectedIndex !== state.index) return state;
  if (action.type === "end") return { ...state, phase: "completed" };
  if (state.index === SESSION_LENGTH - 1) return { ...state, phase: "completed", completed: true };
  return { ...state, index: state.index + 1 };
}
