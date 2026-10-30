import { NHIE_PROMPTS, type NhieCategory, type NhiePrompt } from "@/lib/data/never-have-i-ever-prompts";
import { shuffle } from "@/lib/games/shuffle";

export type NhieState = {
  category: NhieCategory;
  deck: readonly NhiePrompt[];
  index: number;
  phase: "playing" | "finished";
  completed: boolean;
};
export type NhieAction = { type: "next" | "skip"; expectedId: string } | { type: "end" };

export function startNhie(category: NhieCategory = "classic", random: () => number = Math.random, pool: readonly NhiePrompt[] = NHIE_PROMPTS): NhieState {
  if (category !== "classic" && category !== "party") throw new RangeError("Unknown category");
  const selected = pool.filter(prompt => prompt.category === category);
  if (!selected.length) throw new RangeError("No statements available");
  return { category, deck: shuffle(selected, random).slice(0, 20), index: 0, phase: "playing", completed: false };
}

export function nhieReducer(state: NhieState, action: NhieAction): NhieState {
  if (state.phase === "finished") return state;
  if (action.type === "end") return { ...state, phase: "finished" };
  if (action.expectedId !== state.deck[state.index]?.id) return state;
  if (state.index === state.deck.length - 1) return { ...state, phase: "finished", completed: true };
  return { ...state, index: state.index + 1 };
}
