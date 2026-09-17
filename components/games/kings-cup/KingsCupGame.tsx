"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CARD_RULES, FOURTH_KING, SUIT_SYMBOLS, currentPlayerNumber, kingsCupReducer, startKingsCup, type GameAction, type GameState } from "@/lib/games/kings-cup";
import { CardArtwork } from "@/components/layout/english/EnglishArtwork";

const button = "en-button";

export default function KingsCupGame() {
  const [playerCount, setPlayerCount] = useState(4);
  const [game, setGame] = useState<GameState | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const hasStarted = useRef(false);
  const reducedMotion = useReducedMotion();
  const phase = game?.phase;
  const paused = game?.paused;
  const dispatch = (action: GameAction) => setGame((current) => current ? kingsCupReducer(current, action) : current);

  useEffect(() => {
    if (phase !== "revealing") return;
    const timer = setTimeout(() => dispatch({ type: "reveal" }), reducedMotion ? 0 : 250);
    return () => clearTimeout(timer);
  }, [phase, reducedMotion]);

  useEffect(() => {
    if (hasStarted.current && phase !== "revealing") heading.current?.focus({ preventScroll: true });
  }, [phase, paused]);

  function start() {
    hasStarted.current = true;
    setGame(startKingsCup(playerCount));
  }

  const card = game && game.phase !== "ready" ? game.deck[game.drawn - 1] : undefined;
  const rule = card ? CARD_RULES[card.rank] : undefined;
  const fourthKing = card?.rank === "K" && game?.kings === 4;

  return (
    <section id="kings-cup-game" aria-labelledby="kc-game-heading" className="en-game not-prose">
      <h2 id="kc-game-heading" ref={heading} tabIndex={-1}>
        {!game ? "Set up your game" : game.phase === "finished" ? "Game finished" : game.paused ? "Game paused" : `Player ${currentPlayerNumber(game)}'s turn`}
      </h2>
      {!game ? (
        <div className="en-setup">
          <CardArtwork />
          <div className="en-setup-copy">
            <p className="text-sm leading-relaxed text-zinc-300">Share one screen and take seats in order. Players use numbers, so there are no names to enter or save.</p>
            <div className="en-players">
              <label htmlFor="kc-player-count" className="font-semibold">Players</label>
              <select id="kc-player-count" value={playerCount} onChange={(event) => setPlayerCount(Number(event.target.value))} className={`${button} bg-background`}>
                {Array.from({ length: 11 }, (_, index) => index + 2).map((count) => <option key={count} value={count}>{count}</option>)}
              </select>
              <span className="text-sm text-zinc-300">2–12 players · 52 cards</span>
            </div>
            <p className="text-sm text-zinc-300">Use water, soda, or no drinks. Every action is optional. You can skip a card, pause, or end the game whenever you want.</p>
            <button id="kc-start" type="button" onClick={start} className={`${button} en-button-wide en-button-primary`}>Start game</button>
            <noscript><p className="mt-3">Turn on JavaScript to use the online deck, or play with physical cards using the rules below.</p></noscript>
          </div>
        </div>
      ) : game.phase === "finished" ? (
        <div className="en-finished space-y-5">
          <div className="en-state-mark" aria-hidden="true">✓</div>
          <p role="status">{game.drawn === 52 ? "All 52 cards drawn. Thanks for playing!" : `You ended the game after ${game.drawn} of 52 cards. Thanks for playing!`}</p>
          <div className="flex flex-wrap gap-3">
            <button id="kc-play-again" type="button" onClick={start} className={`${button} en-button-primary`}>Play again</button>
            <button id="kc-change-players" type="button" onClick={() => setGame(null)} className={button}>Change players</button>
          </div>
        </div>
      ) : (
        <div className="mt-5 space-y-5">
          <div className="en-game-progress">
            <span id="kc-progress-text">Cards drawn: {game.drawn} / 52</span>
            <span>Kings: {game.kings} / 4</span>
          </div>
          <progress aria-labelledby="kc-progress-text" value={game.drawn} max={52} className="en-progress" />
          <div className="en-card-stage" aria-live="polite" aria-atomic="true" aria-busy={game.phase === "revealing"}>
            {game.paused ? <div><span className="en-state-mark" aria-hidden="true">Ⅱ</span><p className="text-zinc-300">Take your time. Resume when everyone is ready.</p></div> : card && rule ? (
              <motion.div className="en-drawn-card" key={card.id} initial={reducedMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reducedMotion ? 0 : 0.2 }}>
                <div aria-hidden="true" className={`en-card-face ${card.suit === "hearts" || card.suit === "diamonds" ? "text-rose-300" : "text-zinc-100"}`}>
                  <span className="en-card-suit">{SUIT_SYMBOLS[card.suit]}</span>
                  <span className="en-card-rank">{card.rank}</span>
                  <span className="en-card-suit en-card-suit-bottom">{SUIT_SYMBOLS[card.suit]}</span>
                </div>
                <div className="en-card-rule">
                  <p id="kc-card-name" className="text-sm text-zinc-300">{rule.label} of {card.suit}</p>
                  <h3>{fourthKing ? "Group finale" : rule.name}</h3>
                  <p id="kc-card-rule" className="text-sm leading-relaxed text-zinc-200">{fourthKing ? FOURTH_KING : rule.rule}</p>
                </div>
              </motion.div>
            ) : <div><div className="en-card-back" aria-hidden="true">♠</div><p className="text-zinc-300">Your next card is face down. Draw when you are ready.</p></div>}
          </div>
          {game.paused ? (
            <button id="kc-resume" type="button" onClick={() => dispatch({ type: "resume" })} className={`${button} en-button-wide en-button-primary`}>Resume game</button>
          ) : (
            <>
              <button id="kc-primary" type="button" disabled={game.phase === "revealing"} onClick={() => dispatch({ type: game.phase === "ready" ? "draw" : "next" })} className={`${button} en-button-wide en-button-primary`}>
                {game.phase === "ready" ? "Draw card" : game.phase === "revealing" ? "Revealing card…" : game.drawn === 52 ? "Finish game" : "Next player"}
              </button>
              <div className="flex flex-wrap gap-3">
                {game.phase === "revealed" && <button id="kc-skip" type="button" onClick={() => dispatch({ type: "next" })} className={button}>Skip this card</button>}
                <button id="kc-pause" type="button" onClick={() => dispatch({ type: "pause" })} className={button}>Pause</button>
              </div>
            </>
          )}
          <button id="kc-end" type="button" onClick={() => dispatch({ type: "finish" })} className={`${button} en-button-danger`}>End game</button>
          <p className="text-xs leading-relaxed text-zinc-300">No timer, no penalties. Optional sips can always become a word, a gesture, or a pass.</p>
        </div>
      )}
    </section>
  );
}
