"use client";

import { useEffect, useRef, useState } from "react";
import { GameSetup } from "@/components/games/english/GameSetup";
import NhieArtwork from "./NhieArtwork";
import type { NhieCategory } from "@/lib/data/never-have-i-ever-prompts";
import { startNhie, nhieReducer, type NhieState, type NhieAction } from "@/lib/games/never-have-i-ever";

export default function NeverHaveIEverGame() {
  const [category, setCategory] = useState<NhieCategory>("classic");
  const [game, setGame] = useState<NhieState | null>(null);
  const target = useRef<HTMLHeadingElement>(null);
  const interacted = useRef(false);
  const phase = game?.phase;
  const prompt = game?.deck[game.index];
  useEffect(() => {
    if (interacted.current) target.current?.focus();
  }, [phase, prompt?.id]);
  function start() { interacted.current = true; setGame(startNhie(category)); }
  function dispatch(action: NhieAction) { setGame(current => current ? nhieReducer(current, action) : current); }
  const last = game && game.index === game.deck.length - 1;
  return <section id="nhie-game" aria-labelledby="nhie-heading" className={`en-game en-nhie-game not-prose${!game ? " en-setup en-shared-setting-up" : ""}`}>
    <h2 id="nhie-heading" ref={!game || phase === "finished" ? target : undefined} tabIndex={-1}>
      {!game ? "Set up your game" : phase === "finished" ? game.completed ? "Session complete" : "Game ended" : "Never Have I Ever"}
    </h2>
    {!game ? <GameSetup artwork={<NhieArtwork />}
      intro="Choose a category and share one screen. Anyone may read aloud; everyone can respond together, at their own pace."
      facts={["2–12 players", "20 statements per session", "One shared screen"]}
      startId="nhie-start" onStart={start}
      note="Pass without explaining why. Stories and alcohol are optional. End whenever you want."
      fallback="Enable JavaScript for on-screen statements, or use the manual rules below.">
      <div className="en-setup-field"><label htmlFor="nhie-category">Category</label>
        <select id="nhie-category" aria-describedby="nhie-category-help" value={category} onChange={event => setCategory(event.target.value as NhieCategory)}>
          <option value="classic">Classic</option><option value="party">Party</option>
        </select>
        <span id="nhie-category-help">{category === "classic" ? "Everyday experiences and harmless mishaps." : "Social occasions, music and playful group moments."} 60 original statements.</span>
      </div>
    </GameSetup> : phase === "finished" ? <div className="en-nhie-panel">
      <p>{game.index + 1} {game.index === 0 ? "statement" : "statements"} shown. No answers were recorded.</p>
      <div className="en-nhie-actions"><button id="nhie-replay" className="en-button en-button-primary" onClick={start}>Play again</button>
        <button id="nhie-setup" className="en-button" onClick={() => setGame(null)}>Change setup</button></div>
      <p>Play again keeps your category and reshuffles. Statements may repeat across sessions.</p>
    </div> : prompt ? <div className="en-nhie-panel">
      <p id="nhie-progress">{game.category === "classic" ? "Classic" : "Party"} · Statement {game.index + 1} of {game.deck.length}</p>
      <h3 id="nhie-statement" ref={target} tabIndex={-1} aria-describedby="nhie-progress">{prompt.text}</h3>
      <p>If it applies, you may raise a hand or say “I have.” Silence is valid. Stories are optional.</p>
      <div className="en-nhie-actions">
        <button id="nhie-next" className="en-button en-button-primary" onClick={event => { if (event.detail <= 1) dispatch({ type: "next", expectedId: prompt.id }); }}>{last ? "Finish session" : "Next statement"}</button>
        <button id="nhie-skip" className="en-button" onClick={event => { if (event.detail <= 1) dispatch({ type: "skip", expectedId: prompt.id }); }}>{last ? "Skip and finish" : "Skip statement"}</button>
      </div>
      <p className="en-nhie-note">Skip changes the statement for everyone. Passing personally needs no button or explanation.</p>
      <div className="en-nhie-session"><button id="nhie-end" className="en-button en-button-danger" onClick={() => dispatch({ type: "end" })}>End game</button></div>
      <p className="en-nhie-note">Drinks are optional. If you choose to acknowledge an experience with a drink, take one small optional sip. Water, soft drinks or no drinks all work. Never make up skipped sips.</p>
    </div> : null}
  </section>;
}
