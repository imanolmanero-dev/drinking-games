import { DARES, TRUTHS } from "@/lib/data/truth-or-dare-prompts";
import { shuffle } from "@/lib/games/shuffle";

export type PromptType = "truth" | "dare";
export type GamePhase = "choosing" | "revealed" | "finished";

export type TruthOrDareState = {
  phase: GamePhase;
  playerCount: number;
  turn: number;
  truths: string[];
  dares: string[];
  truthIndex: number;
  dareIndex: number;
  current: { type: PromptType; text: string } | null;
};

export type TruthOrDareAction =
  | { type: "choose"; promptType: PromptType }
  | { type: "next" }
  | { type: "skip" }
  | { type: "finish" };

export function startTruthOrDare(playerCount: number, random: () => number = Math.random): TruthOrDareState {
  if (!Number.isInteger(playerCount) || playerCount < 2 || playerCount > 12) {
    throw new RangeError("Truth or Dare requires 2–12 players");
  }
  return {
    phase: "choosing",
    playerCount,
    turn: 0,
    truths: shuffle(TRUTHS, random),
    dares: shuffle(DARES, random),
    truthIndex: 0,
    dareIndex: 0,
    current: null,
  };
}

export function currentPlayerNumber(state: TruthOrDareState): number {
  return (state.turn % state.playerCount) + 1;
}

export function truthOrDareReducer(state: TruthOrDareState, action: TruthOrDareAction): TruthOrDareState {
  if (state.phase === "finished") return state;

  if (action.type === "finish") return { ...state, phase: "finished", current: null };

  if (action.type === "choose") {
    if (state.phase !== "choosing") return state;
    const isTruth = action.promptType === "truth";
    const prompts = isTruth ? state.truths : state.dares;
    const index = isTruth ? state.truthIndex : state.dareIndex;
    if (index >= prompts.length) return state;
    return {
      ...state,
      phase: "revealed",
      current: { type: action.promptType, text: prompts[index] },
      truthIndex: state.truthIndex + (isTruth ? 1 : 0),
      dareIndex: state.dareIndex + (isTruth ? 0 : 1),
    };
  }

  if (state.phase !== "revealed" || (action.type !== "next" && action.type !== "skip")) return state;
  const exhausted = state.truthIndex === state.truths.length && state.dareIndex === state.dares.length;
  return {
    ...state,
    phase: exhausted ? "finished" : "choosing",
    turn: state.turn + 1,
    current: null,
  };
}
