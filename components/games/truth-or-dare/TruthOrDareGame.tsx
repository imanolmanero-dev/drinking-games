"use client";

import { useEffect, useRef, useState } from "react";
import {
  currentPlayerNumber,
  startTruthOrDare,
  truthOrDareReducer,
  type TruthOrDareAction,
  type TruthOrDareState,
} from "@/lib/games/truth-or-dare";

export default function TruthOrDareGame() {
  const [playerCount, setPlayerCount] = useState(4);
  const [game, setGame] = useState<TruthOrDareState | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const hasStarted = useRef(false);

  const phase = game?.phase;
  const turn = game?.turn;
  useEffect(() => {
    if (hasStarted.current) heading.current?.focus({ preventScroll: true });
  }, [phase, turn]);

  function start() {
    hasStarted.current = true;
    setGame(startTruthOrDare(playerCount));
  }

  function dispatch(action: TruthOrDareAction) {
    setGame((current) => current ? truthOrDareReducer(current, action) : current);
  }

  const player = game ? currentPlayerNumber(game) : null;
  const truthLeft = game ? game.truths.length - game.truthIndex : 30;
  const dareLeft = game ? game.dares.length - game.dareIndex : 30;
  const used = game ? game.truthIndex + game.dareIndex : 0;
  const lastPrompt = game ? truthLeft === 0 && dareLeft === 0 : false;

  return (
    <section id="truth-or-dare-game" aria-labelledby="tod-game-heading" className="en-game en-tod-game not-prose">
      <h2 id="tod-game-heading" ref={heading} tabIndex={-1}>
        {!game ? "Set up your game" : phase === "finished" ? "Game finished" : `Player ${player}'s turn`}
      </h2>

      {!game ? (
        <div className="en-tod-panel">
          <p>Share one screen and sit in player order. You only need to choose how many people are playing; no names or accounts are needed.</p>
          <div className="en-players">
            <label htmlFor="tod-player-count" className="font-semibold">Players</label>
            <select id="tod-player-count" value={playerCount} onChange={(event) => setPlayerCount(Number(event.target.value))} className="en-button bg-background">
              {Array.from({ length: 11 }, (_, index) => index + 2).map((count) => <option key={count} value={count}>{count}</option>)}
            </select>
            <span>2–12 players · 60 prompts</span>
          </div>
          <p>Choose Truth or Dare on your turn. You can pass without a penalty or end the game whenever you want. Alcohol is optional.</p>
          <button id="tod-start" type="button" onClick={start} className="en-button en-button-wide en-button-primary">Start game</button>
          <noscript><p>Enable JavaScript to use the on-screen prompts. The rules below still explain how to play together.</p></noscript>
        </div>
      ) : phase === "finished" ? (
        <div className="en-tod-panel en-finished">
          <p role="status">{used === 60 ? "All 60 prompts were used." : `You ended the game after ${used} prompts.`} Thanks for playing!</p>
          <div className="en-tod-actions">
            <button id="tod-restart" type="button" onClick={start} className="en-button en-button-primary">Play again</button>
            <button id="tod-change-players" type="button" onClick={() => setGame(null)} className="en-button">Change players</button>
          </div>
        </div>
      ) : (
        <div className="en-tod-panel">
          <p id="tod-progress-text">Prompts used: {used} / 60 · Truth left: {truthLeft} · Dare left: {dareLeft}</p>
          <progress aria-labelledby="tod-progress-text" value={used} max={60} className="en-progress" />
          {phase === "choosing" ? (
            <div className="en-tod-stage" aria-live="polite">
              <p>Player {player}, choose one. A type stays unavailable once all 30 of its prompts have been shown.</p>
              <div className="en-tod-actions">
                <button id="tod-truth" type="button" onClick={() => dispatch({ type: "choose", promptType: "truth" })} disabled={truthLeft === 0} className="en-button en-button-primary">Truth · {truthLeft} left</button>
                <button id="tod-dare" type="button" onClick={() => dispatch({ type: "choose", promptType: "dare" })} disabled={dareLeft === 0} className="en-button en-button-primary">Dare · {dareLeft} left</button>
              </div>
            </div>
          ) : (
            <div className="en-tod-stage" aria-live="polite" aria-atomic="true">
              <p className="en-tod-type">{game.current?.type === "truth" ? "Truth" : "Dare"} for Player {player}</p>
              <p className="en-tod-prompt">{game.current?.text}</p>
              <p>You can answer or try it, or pass without explaining why.</p>
              <div className="en-tod-actions">
                <button id="tod-next" type="button" onClick={() => dispatch({ type: "next" })} className="en-button en-button-primary">{lastPrompt ? "Finish game" : "Next player"}</button>
                <button id="tod-skip" type="button" onClick={() => dispatch({ type: "skip" })} className="en-button">{lastPrompt ? "Skip and finish" : "Skip · next player"}</button>
              </div>
            </div>
          )}
          <div className="en-tod-actions en-tod-secondary">
            <button id="tod-finish" type="button" onClick={() => dispatch({ type: "finish" })} className="en-button en-button-danger">End game</button>
            <button id="tod-back-setup" type="button" onClick={() => setGame(null)} className="en-button">Change players</button>
          </div>
        </div>
      )}
    </section>
  );
}
