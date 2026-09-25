"use client";

import { useEffect, useRef, useState } from "react";
import { TruthOrDareMark } from "@/components/layout/english/EnglishArtwork";
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
    <section id="truth-or-dare-game" aria-labelledby="tod-game-heading" className={`en-game en-tod-game not-prose${phase === "finished" ? " en-tod-finished" : ""}`}>
      {phase === "finished" && <TruthOrDareMark />}
      <h2 id="tod-game-heading" ref={heading} tabIndex={-1}>
        {!game ? "Set up your game" : phase === "finished" ? "Game finished" : `Player ${player}'s turn`}
      </h2>

      {!game ? (
        <div className="en-tod-panel en-tod-setup">
          <p>Share one screen and sit in player order. You only need to choose how many people are playing; no names or accounts are needed.</p>
          <ul className="en-tod-facts" aria-label="Game setup">
            <li><strong>60</strong> prompts</li>
            <li>No materials</li>
            <li>One shared screen</li>
          </ul>
          <div className="en-tod-players">
            <label htmlFor="tod-player-count">Players</label>
            <div className="en-tod-stepper">
              <button id="tod-player-decrease" type="button" aria-label="Decrease player count" aria-controls="tod-player-count" disabled={playerCount === 2} onClick={() => setPlayerCount((count) => Math.max(2, count - 1))} className="en-button">−</button>
              <select id="tod-player-count" aria-describedby="tod-player-range" value={playerCount} onChange={(event) => setPlayerCount(Number(event.target.value))}>
                {Array.from({ length: 11 }, (_, index) => index + 2).map((count) => <option key={count} value={count}>{count}</option>)}
              </select>
              <button id="tod-player-increase" type="button" aria-label="Increase player count" aria-controls="tod-player-count" disabled={playerCount === 12} onClick={() => setPlayerCount((count) => Math.min(12, count + 1))} className="en-button">+</button>
            </div>
            <span id="tod-player-range">2–12 players</span>
          </div>
          <button id="tod-start" type="button" onClick={start} className="en-button en-button-wide en-button-primary">Start game</button>
          <p className="en-tod-note">Choose Truth or Dare on your turn. You can pass without a penalty or end the game whenever you want. Alcohol is optional.</p>
          <noscript><p>Enable JavaScript to use the on-screen prompts. The rules below still explain how to play together.</p></noscript>
        </div>
      ) : phase === "finished" ? (
        <div className="en-tod-panel en-finished">
          <p role="status">{used === 60 ? "All 60 prompts were used." : `You ended the game after ${used} ${used === 1 ? "prompt" : "prompts"}.`} Thanks for playing!</p>
          <div className="en-tod-actions">
            <button id="tod-restart" type="button" onClick={start} className="en-button en-button-primary">Play again</button>
            <button id="tod-change-players" type="button" onClick={() => setGame(null)} className="en-button">Change players</button>
          </div>
        </div>
      ) : (
        <div className="en-tod-panel">
          <div className="en-tod-progress">
            <p id="tod-progress-text">Prompts used: {used} / 60 · Truth left: {truthLeft} · Dare left: {dareLeft}</p>
            <progress aria-labelledby="tod-progress-text" value={used} max={60} className="en-progress" />
          </div>
          {phase === "choosing" ? (
            <div className="en-tod-stage en-tod-choosing" aria-live="polite">
              <p>Player {player}, choose one.</p>
              <div className="en-tod-choices">
                <button id="tod-truth" type="button" onClick={() => dispatch({ type: "choose", promptType: "truth" })} disabled={truthLeft === 0} className="en-button en-tod-choice en-tod-truth">
                  <span className="en-tod-symbol" aria-hidden="true">?</span><span className="en-tod-choice-label">Truth</span><span className="en-tod-remaining">{truthLeft} left</span>
                </button>
                <button id="tod-dare" type="button" onClick={() => dispatch({ type: "choose", promptType: "dare" })} disabled={dareLeft === 0} className="en-button en-tod-choice en-tod-dare">
                  <span className="en-tod-symbol" aria-hidden="true">!</span><span className="en-tod-choice-label">Dare</span><span className="en-tod-remaining">{dareLeft} left</span>
                </button>
              </div>
              <p className="en-tod-note">A type stays unavailable once all 30 of its prompts have been shown.</p>
            </div>
          ) : (
            <div className={`en-tod-stage ${game.current?.type === "truth" ? "en-tod-truth" : "en-tod-dare"}`} aria-live="polite" aria-atomic="true">
              <p className="en-tod-type"><span aria-hidden="true">{game.current?.type === "truth" ? "?" : "!"}</span> {game.current?.type === "truth" ? "Truth" : "Dare"} for Player {player}</p>
              <p className="en-tod-prompt">{game.current?.text}</p>
              <p className="en-tod-note">You can answer or try it, or pass without explaining why.</p>
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
