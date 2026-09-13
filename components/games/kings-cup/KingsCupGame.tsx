"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CARD_RULES, FOURTH_KING, SUIT_SYMBOLS, currentPlayerNumber, kingsCupReducer, startKingsCup, type GameAction, type GameState } from "@/lib/games/kings-cup";

const button = "min-h-12 rounded-xl border border-border px-4 py-3 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300 disabled:cursor-not-allowed disabled:opacity-50";

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
    <section id="kings-cup-game" aria-labelledby="kc-game-heading" className="not-prose my-8 rounded-3xl border border-amber-400/30 bg-surface p-4 shadow-xl shadow-amber-400/5 sm:p-7">
      <h2 id="kc-game-heading" ref={heading} tabIndex={-1} className="text-xl font-bold text-amber-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300">
        {!game ? "Set up your game" : game.phase === "finished" ? "Game finished" : game.paused ? "Game paused" : `Player ${currentPlayerNumber(game)}'s turn`}
      </h2>
      {!game ? (
        <div className="mt-5 space-y-5">
          <p className="text-sm leading-relaxed text-zinc-300">Share one screen and take seats in order. Players use numbers, so there are no names to enter or save.</p>
          <div className="flex flex-wrap items-center gap-4">
            <label htmlFor="kc-player-count" className="font-semibold">Players</label>
            <select id="kc-player-count" value={playerCount} onChange={(event) => setPlayerCount(Number(event.target.value))} className={`${button} bg-background`}>
              {Array.from({ length: 11 }, (_, index) => index + 2).map((count) => <option key={count} value={count}>{count}</option>)}
            </select>
            <span className="text-sm text-zinc-300">2–12 players · 52 cards</span>
          </div>
          <p className="text-sm text-zinc-300">Use water, soda, or no drinks. Every action is optional. You can skip a card, pause, or end the game whenever you want.</p>
          <button id="kc-start" type="button" onClick={start} className={`${button} w-full bg-amber-300 text-zinc-950 hover:bg-amber-200`}>Start game</button>
          <noscript><p className="mt-3">Turn on JavaScript to use the online deck, or play with physical cards using the rules below.</p></noscript>
        </div>
      ) : game.phase === "finished" ? (
        <div className="mt-5 space-y-5">
          <p role="status">{game.drawn === 52 ? "All 52 cards drawn. Thanks for playing!" : `You ended the game after ${game.drawn} of 52 cards. Thanks for playing!`}</p>
          <div className="flex flex-wrap gap-3">
            <button id="kc-play-again" type="button" onClick={start} className={`${button} bg-amber-300 text-zinc-950`}>Play again</button>
            <button id="kc-change-players" type="button" onClick={() => setGame(null)} className={button}>Change players</button>
          </div>
        </div>
      ) : (
        <div className="mt-5 space-y-5">
          <div className="flex flex-wrap justify-between gap-2 text-sm text-zinc-300">
            <span id="kc-progress-text">Cards drawn: {game.drawn} / 52</span>
            <span>Kings: {game.kings} / 4</span>
          </div>
          <progress aria-labelledby="kc-progress-text" value={game.drawn} max={52} className="h-2 w-full accent-amber-300" />
          <div className="min-h-56 rounded-2xl border border-border bg-background p-5 text-center" aria-live="polite" aria-atomic="true" aria-busy={game.phase === "revealing"}>
            {game.paused ? <p className="py-12 text-zinc-300">Take your time. Resume when everyone is ready.</p> : card && rule ? (
              <motion.div key={card.id} initial={reducedMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reducedMotion ? 0 : 0.2 }}>
                <div aria-hidden="true" className={`mb-3 text-5xl font-black ${card.suit === "hearts" || card.suit === "diamonds" ? "text-rose-300" : "text-zinc-100"}`}>{card.rank} {SUIT_SYMBOLS[card.suit]}</div>
                <p id="kc-card-name" className="text-sm text-zinc-300">{rule.label} of {card.suit}</p>
                <h3 className="my-3 text-xl font-bold text-amber-200">{fourthKing ? "Group finale" : rule.name}</h3>
                <p id="kc-card-rule" className="text-sm leading-relaxed text-zinc-200">{fourthKing ? FOURTH_KING : rule.rule}</p>
              </motion.div>
            ) : <p className="py-12 text-zinc-300">Your next card is face down. Draw when you are ready.</p>}
          </div>
          {game.paused ? (
            <button id="kc-resume" type="button" onClick={() => dispatch({ type: "resume" })} className={`${button} w-full bg-amber-300 text-zinc-950`}>Resume game</button>
          ) : (
            <>
              <button id="kc-primary" type="button" disabled={game.phase === "revealing"} onClick={() => dispatch({ type: game.phase === "ready" ? "draw" : "next" })} className={`${button} w-full bg-amber-300 text-zinc-950 hover:bg-amber-200`}>
                {game.phase === "ready" ? "Draw card" : game.phase === "revealing" ? "Revealing card…" : game.drawn === 52 ? "Finish game" : "Next player"}
              </button>
              <div className="flex flex-wrap gap-3">
                {game.phase === "revealed" && <button id="kc-skip" type="button" onClick={() => dispatch({ type: "next" })} className={button}>Skip this card</button>}
                <button id="kc-pause" type="button" onClick={() => dispatch({ type: "pause" })} className={button}>Pause</button>
              </div>
            </>
          )}
          <button id="kc-end" type="button" onClick={() => dispatch({ type: "finish" })} className={button}>End game</button>
          <p className="text-xs leading-relaxed text-zinc-300">No timer, no penalties. Optional sips can always become a word, a gesture, or a pass.</p>
        </div>
      )}
    </section>
  );
}
