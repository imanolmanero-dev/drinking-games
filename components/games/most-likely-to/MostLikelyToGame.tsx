"use client";

import { useEffect, useRef, useState } from "react";
import { GameSetup } from "@/components/games/english/GameSetup";
import { startMostLikely, mostLikelyReducer, type MostLikelyState, type MostLikelyAction } from "@/lib/games/most-likely-to";
import MostLikelyArtwork from "./MostLikelyArtwork";

export default function MostLikelyToGame() {
  const [game, setGame] = useState<MostLikelyState | null>(null);
  const session = useRef(0);
  const heading = useRef<HTMLHeadingElement>(null);
  const phase = game?.phase;
  const index = game?.index;
  const sessionId = game?.session;
  useEffect(() => {
    if (!sessionId) return;
    const node = heading.current;
    node?.focus({ preventScroll: true });
    const rect = node?.getBoundingClientRect();
    if (rect && (rect.top < 16 || rect.bottom > window.innerHeight - 16)) node?.scrollIntoView({ block: "center", behavior: "instant" });
  }, [phase, index, sessionId]);
  function start() { session.current += 1; setGame(startMostLikely(session.current)); }
  function dispatch(type: MostLikelyAction["type"]) {
    if (!game) return;
    const action = { type, expectedSession: game.session, expectedIndex: game.index };
    setGame(current => current ? mostLikelyReducer(current, action) : current);
  }
  return <section id="mlt-game" aria-labelledby="mlt-heading" onKeyDown={event => { if (event.repeat && (event.key === "Enter" || event.key === " ")) event.preventDefault(); }} className={`en-game en-mlt-game not-prose${!game ? " en-setup en-shared-setting-up" : ""}`}>
    {!game ? <>
      <h2 id="mlt-heading">Set up your game</h2>
      <GameSetup artwork={<MostLikelyArtwork />} intro="Share one screen with friends. Read each prompt, count to three together, then everyone points or names someone at the same time."
        facts={["3–12 recommended players", "20 prompts per session", "One shared screen"]} startId="mlt-start" onStart={start}
        note="Nobody has to join a vote or explain a choice. Alcohol is optional."
        fallback="Enable JavaScript to play on screen, or use the manual rules below.">{null}</GameSetup>
    </> : game.phase === "completed" ? <>
      <h2 id="mlt-heading" ref={heading} tabIndex={-1}>{game.completed ? "Session complete" : "Game ended"}</h2>
      <div className="en-mlt-panel"><p>Thanks for playing together. Ready for another round?</p>
        <div className="en-mlt-actions"><button id="mlt-replay" className="en-button en-button-primary" onClick={start}>Play again</button>
          <a id="mlt-discover" className="en-button" href="/en/games">Choose another game</a></div>
        <p className="en-mlt-note">Play again starts a fresh shuffle. Prompts may repeat across sessions.</p>
      </div>
    </> : <div className="en-mlt-panel">
      <p id="mlt-progress">Prompt {game.index + 1} / {game.deck.length}</p>
      <h2 id="mlt-heading" ref={heading} tabIndex={-1} aria-describedby="mlt-progress">{game.deck[game.index].text}</h2>
      <p>Count to three, then point or name someone together. Anyone can sit out a vote.</p>
      <div className="en-mlt-actions">
        <button id="mlt-next" className="en-button en-button-primary" onClick={event => { if (event.detail <= 1) dispatch("next"); }}>Next</button>
        <button id="mlt-skip" className="en-button" onClick={event => { if (event.detail <= 1) dispatch("skip"); }}>Skip prompt</button>
      </div>
      <p className="en-mlt-note">Skip changes the prompt for everyone. Passing personally needs no button.</p>
      <div className="en-mlt-session"><button id="mlt-end" className="en-button en-button-danger" onClick={() => dispatch("end")}>End game</button></div>
    </div>}
  </section>;
}
