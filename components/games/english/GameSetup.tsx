import type { ReactNode } from "react";

export function GameSetup({ artwork, intro, facts, children, startId, onStart, note, fallback }: {
  artwork: ReactNode; intro: ReactNode; facts: readonly ReactNode[]; children: ReactNode;
  startId: string; onStart: () => void; note: ReactNode; fallback: ReactNode;
}) {
  return <>
    <div className="en-setup-art">{artwork}</div>
    <div className="en-setup-panel">
      <p>{intro}</p>
      <ul className="en-setup-facts" aria-label="Game setup">{facts.map((fact, index) => <li key={index}>{fact}</li>)}</ul>
      {children}
      <button id={startId} type="button" onClick={onStart} className="en-button en-button-wide en-button-primary en-setup-start">Start game</button>
      <p className="en-setup-note">{note}</p>
      <noscript><p>{fallback}</p></noscript>
    </div>
  </>;
}

export function PlayerCountField({ id, value, onChange }: { id: string; value: number; onChange: (value: number) => void }) {
  const helpId = id.replace("count", "range");
  return <div className="en-setup-field">
    <label htmlFor={id}>Players</label>
    <select id={id} aria-describedby={helpId} value={value} onChange={(event) => onChange(Number(event.target.value))}>
      {Array.from({ length: 11 }, (_, index) => index + 2).map((count) => <option key={count} value={count}>{count}</option>)}
    </select>
    <span id={helpId}>2–12 players</span>
  </div>;
}
