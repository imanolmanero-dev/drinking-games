"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, ChevronRight, RotateCcw, Plus, X, Clock,
  Shuffle, BookOpen, Triangle, Eye, EyeOff, AlertTriangle,
} from "lucide-react";
import { useApp } from "@/lib/AppContext";
import Confetti from "@/components/ui/Confetti";
import {
  type CartaPiramide, PYRAMID_ROWS, PYRAMID_TOTAL,
  CARDS_PER_PLAYER, MEMORIZE_SECONDS,
  generateDeck, shuffleDeck,
} from "@/lib/data/la-piramide";

type Phase = "setup" | "memorize" | "playing" | "gameover";

/* ── Tiny Card UI ── */
function MiniCard({ card, faceUp, size = "md", onClick }: {
  card: CartaPiramide; faceUp: boolean; size?: "sm" | "md"; onClick?: () => void;
}) {
  const h = size === "sm" ? "h-14 w-10" : "h-20 w-14";
  if (!faceUp) {
    return (
      <button onClick={onClick} className={`${h} rounded-lg border-2 border-indigo-400/40 bg-indigo-900 shadow-md flex items-center justify-center transition-transform hover:scale-105 active:scale-95`}>
        <Triangle className="h-4 w-4 text-indigo-300" />
      </button>
    );
  }
  return (
    <button onClick={onClick} className={`${h} rounded-lg border border-border bg-white shadow-md flex flex-col items-center justify-between p-1 transition-transform hover:scale-105 active:scale-95`}>
      <span className={`self-start text-xs font-black leading-none ${card.color === "red" ? "text-red-600" : "text-gray-900"}`}>{card.valor}</span>
      <span className="text-base">{card.palo}</span>
      <span className={`self-end text-xs font-black leading-none ${card.color === "red" ? "text-red-600" : "text-gray-900"}`}>{card.valor}</span>
    </button>
  );
}

export default function LaPiramidePage() {
  const { playSound, vibrateDevice, recentPlayers, savePlayersToRecent } = useApp();

  const [phase, setPhase] = useState<Phase>("setup");

  // Setup
  const [players, setPlayers] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  // Game state
  const [pyramidCards, setPyramidCards] = useState<CartaPiramide[]>([]);
  const [playerHands, setPlayerHands] = useState<Record<string, CartaPiramide[]>>({});
  const [revealedPyramid, setRevealedPyramid] = useState<boolean[]>([]);
  const [currentPyramidIdx, setCurrentPyramidIdx] = useState(0);
  const [memorizeTimer, setMemorizeTimer] = useState(MEMORIZE_SECONDS);
  const [showHands, setShowHands] = useState(true);
  const [currentRow, setCurrentRow] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [activePlayerIdx, setActivePlayerIdx] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── Setup handlers ──
  const addPlayer = useCallback(() => {
    const name = inputValue.trim();
    if (name && !players.includes(name)) {
      setPlayers((p) => [...p, name]);
      setInputValue("");
      playSound("click");
    }
  }, [inputValue, players, playSound]);

  const addRecentPlayer = useCallback((name: string) => {
    if (!players.includes(name)) {
      setPlayers((prev) => [...prev, name]);
      playSound("click");
    }
  }, [players, playSound]);

  const removePlayer = useCallback((name: string) => {
    setPlayers((p) => p.filter((n) => n !== name));
  }, []);

  // ── Start game ──
  const startGame = useCallback(() => {
    const deck = shuffleDeck(generateDeck());
    const pCards = deck.slice(0, PYRAMID_TOTAL);
    const remaining = deck.slice(PYRAMID_TOTAL);

    const hands: Record<string, CartaPiramide[]> = {};
    players.forEach((p, i) => {
      hands[p] = remaining.slice(i * CARDS_PER_PLAYER, (i + 1) * CARDS_PER_PLAYER);
    });

    setPyramidCards(pCards);
    setPlayerHands(hands);
    setRevealedPyramid(new Array(PYRAMID_TOTAL).fill(false));
    setCurrentPyramidIdx(0);
    setCurrentRow(0);
    setMemorizeTimer(MEMORIZE_SECONDS);
    setShowHands(true);
    setShowConfetti(false);
    setActivePlayerIdx(0);
    setPhase("memorize");
    savePlayersToRecent(players);
    playSound("success");
    vibrateDevice("click");
  }, [players, savePlayersToRecent, playSound, vibrateDevice]);

  // ── Memorize countdown ──
  useEffect(() => {
    if (phase !== "memorize") return;
    if (memorizeTimer <= 0) {
      setShowHands(false);
      setPhase("playing");
      playSound("flip");
      return;
    }
    timerRef.current = setInterval(() => {
      setMemorizeTimer((t) => t - 1);
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [phase, memorizeTimer, playSound]);

  // ── Compute current row from index ──
  const getRowForIndex = (idx: number): number => {
    let count = 0;
    for (let r = 0; r < PYRAMID_ROWS.length; r++) {
      count += PYRAMID_ROWS[r];
      if (idx < count) return r;
    }
    return PYRAMID_ROWS.length - 1;
  };

  // ── Reveal pyramid card ──
  const revealCard = useCallback(() => {
    if (currentPyramidIdx >= PYRAMID_TOTAL) {
      setPhase("gameover");
      return;
    }
    const newRevealed = [...revealedPyramid];
    newRevealed[currentPyramidIdx] = true;
    setRevealedPyramid(newRevealed);
    setCurrentRow(getRowForIndex(currentPyramidIdx));
    playSound("flip");
    vibrateDevice("flip");
  }, [currentPyramidIdx, revealedPyramid, playSound, vibrateDevice]);

  const nextCard = useCallback(() => {
    const nextIdx = currentPyramidIdx + 1;
    if (nextIdx >= PYRAMID_TOTAL) {
      setPhase("gameover");
      playSound("everyone");
      vibrateDevice("everyone");
      return;
    }
    setCurrentPyramidIdx(nextIdx);
    setActivePlayerIdx((prev) => (prev + 1) % players.length);
  }, [currentPyramidIdx, players.length, playSound, vibrateDevice]);

  const restartGame = useCallback(() => {
    setPhase("setup");
    setPlayers([]);
  }, []);

  const reshuffleAndRestart = useCallback(() => {
    startGame();
  }, [startGame]);

  // Drinks for current row (1-indexed)
  const drinksForRow = currentRow + 1;

  // Build pyramid layout
  const buildPyramidLayout = () => {
    const rows: { card: CartaPiramide; idx: number; revealed: boolean }[][] = [];
    let idx = 0;
    // Reverse order so bottom (largest) row renders at bottom
    for (let r = PYRAMID_ROWS.length - 1; r >= 0; r--) {
      const row: { card: CartaPiramide; idx: number; revealed: boolean }[] = [];
      const startIdx = PYRAMID_ROWS.slice(0, PYRAMID_ROWS.length - 1 - r)
        .reduce((a, b) => a + b, 0);
      // Actually let's compute properly
      let si = 0;
      for (let rr = 0; rr < PYRAMID_ROWS.length - 1 - r; rr++) {
        si += PYRAMID_ROWS[rr];
      }
      for (let c = 0; c < PYRAMID_ROWS[PYRAMID_ROWS.length - 1 - r]; c++) {
        const i = si + c;
        row.push({ card: pyramidCards[i], idx: i, revealed: revealedPyramid[i] });
      }
      rows.push(row);
    }
    return rows;
  };

  // ═══════════════════════════════════
  // SETUP SCREEN
  // ═══════════════════════════════════
  if (phase === "setup") {
    return (
      <div className="flex flex-1 flex-col w-full">
        <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md flex flex-col gap-8">
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/25">
                <Triangle className="h-7 w-7 text-white" />
              </div>
              <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">La Pirámide</h1>
              <p className="text-sm text-muted max-w-xs">Memoriza tus cartas, farolea y asigna tragos. ¡El farol es la clave!</p>
              <Link href="/juegos/la-piramide/reglas" className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-surface-hover px-3 py-1 text-xs font-semibold text-indigo-400 transition-colors hover:bg-indigo-500/10">
                <BookOpen className="h-3.5 w-3.5" /> Ver cómo se juega
              </Link>
            </div>
            <div className="flex gap-2">
              <input id="player-input-piramide" type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addPlayer()} placeholder="Nombre del jugador…" className="flex-1 rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted outline-none transition-colors focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20" autoComplete="off" />
              <button onClick={addPlayer} disabled={!inputValue.trim()} className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/20 transition-all hover:scale-105 disabled:opacity-40 disabled:hover:scale-100 disabled:cursor-not-allowed">
                <Plus className="h-5 w-5" />
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted"><Users className="h-3.5 w-3.5" /> Jugadores ({players.length})</div>
              <AnimatePresence mode="popLayout">
                {players.map((name) => (
                  <motion.div key={name} initial={{ opacity: 0, x: -20, height: 0 }} animate={{ opacity: 1, x: 0, height: "auto" }} exit={{ opacity: 0, x: 20, height: 0 }} transition={{ duration: 0.25 }} className="flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-3">
                    <span className="text-sm font-medium">{name}</span>
                    <button onClick={() => removePlayer(name)} className="flex h-7 w-7 items-center justify-center rounded-lg text-muted transition-colors hover:bg-red-500/10 hover:text-red-400"><X className="h-4 w-4" /></button>
                  </motion.div>
                ))}
              </AnimatePresence>
              {players.length === 0 && (<div className="flex items-center justify-center rounded-xl border border-dashed border-border py-8 text-sm text-muted">Aún no hay jugadores</div>)}
            </div>
            {recentPlayers.filter((n) => !players.includes(n)).length > 0 && (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted"><Clock className="h-3.5 w-3.5" /> Jugadores recientes</div>
                <div className="flex flex-wrap gap-2">
                  {recentPlayers.filter((n) => !players.includes(n)).slice(0, 8).map((name) => (
                    <button key={name} onClick={() => addRecentPlayer(name)} className="flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-muted transition-all hover:border-indigo-500/40 hover:text-foreground hover:bg-surface-hover"><Plus className="h-3 w-3" />{name}</button>
                  ))}
                </div>
              </div>
            )}
            <button onClick={startGame} disabled={players.length < 2} className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:scale-[1.02] hover:shadow-xl disabled:opacity-40 disabled:hover:scale-100 disabled:cursor-not-allowed">
              Empezar el juego <ChevronRight className="h-4 w-4" />
            </button>
          </motion.div>
        </div>
        <div className="w-full bg-surface border-t border-border mt-auto py-12 px-4">
          <div className="mx-auto max-w-3xl prose prose-invert prose-p:text-muted max-w-none">
            <h2>La Pirámide: Memoria, Farol y Tragos por Fila</h2>
            <p>
              <strong>La Pirámide</strong> es uno de los juegos de cartas para beber más adictivos que existen. Combina tres habilidades que rara vez van juntas: memoria a corto plazo, cara de póker y la capacidad de mentir mirando a los ojos a tus amigos.
            </p>
            <p>
              La app construye una pirámide virtual de 21 cartas (6 filas) y reparte 4 cartas a cada jugador. Tenéis 10 segundos para memorizar vuestras cartas. Después se ocultan y empieza el juego de verdad.
            </p>

            <h3>Las reglas paso a paso</h3>
            <ul>
              <li><strong>Fase de memoria:</strong> Se reparten 4 cartas a cada jugador, boca arriba. Tienes exactamente 10 segundos para memorizar sus valores. Luego se dan la vuelta.</li>
              <li><strong>Fase de juego:</strong> Se van revelando las cartas de la pirámide una por una, empezando por la base (fila 1).</li>
              <li><strong>Asignar tragos:</strong> Si la carta revelada coincide con una de las tuyas, puedes asignar tragos a quien quieras. La fila determina cuántos: fila 1 = 1 trago, fila 2 = 2 tragos, y así hasta la cima (fila 6 = 6 tragos).</li>
              <li><strong>El farol:</strong> Aquí está la magia. Puedes decir que tienes la carta <strong>aunque no la tengas</strong>. Si nadie te reta, el otro bebe. Si alguien te pilla, bebes tú el doble.</li>
              <li><strong>Retar un farol:</strong> Si crees que alguien miente, dices &ldquo;¡Farol!&rdquo;. El acusado debe mostrar su carta. Si la tiene, el retador bebe el doble. Si no la tiene, el farolero bebe el doble.</li>
            </ul>

            <h3>Estructura de la pirámide</h3>
            <p>
              La pirámide tiene 6 filas con esta distribución: 6 cartas en la base, 5 en la segunda, 4, 3, 2 y 1 en la cima. En total son 21 cartas. Las filas inferiores se revelan rápido y los tragos son suaves. A medida que subes, quedan menos cartas pero cada una vale más. La cima vale 6 tragos — y si farolean ahí arriba y les pillan, son 12.
            </p>

            <h3>Preguntas frecuentes</h3>
            <p><strong>¿Cuántos jugadores hacen falta?</strong> Mínimo 2, pero con 4-6 es donde más brilla. Con más gente hay más faroles y más caos.</p>
            <p><strong>¿Qué pasa si no recuerdo mis cartas?</strong> Ese es el punto. La memoria se degrada ronda tras ronda (sobre todo si estás bebiendo). Cuanto peor recuerdes, más arriesgados serán tus faroles.</p>
            <p><strong>¿Puedo farolear siempre?</strong> Sí, no hay límite. Pero si te pillan repetidamente, el grupo dejará de creerte y retarán todos tus movimientos.</p>
            <p><strong>¿Cuánto dura una partida?</strong> Unos 15-20 minutos. La pirámide tiene 21 cartas y se revelan a ritmo de los jugadores.</p>

            <h3>Otros juegos de cartas</h3>
            <ul>
              <li><Link href="/juegos/ring-of-fire" className="text-indigo-400 underline">Ring of Fire</Link> — Cada carta de la baraja tiene una regla diferente. El 4º Rey lo paga todo.</li>
              <li><Link href="/juegos/rey-de-la-copa" className="text-indigo-400 underline">Rey de la Copa</Link> — La versión española del Ring of Fire con reglas propias.</li>
              <li><Link href="/juegos/medusa" className="text-indigo-400 underline">Medusa</Link> — Miradas que matan. Si cruzas la mirada con alguien, los dos bebéis.</li>
            </ul>
            <p>Consulta todas las estrategias de farol y variantes avanzadas en la <Link href="/juegos/la-piramide/reglas" className="text-indigo-400 underline">guía completa de La Pirámide</Link>.</p>
          </div>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════
  // MEMORIZE PHASE
  // ═══════════════════════════════════
  if (phase === "memorize") {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-6 w-full max-w-md">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-600/20 border border-indigo-500/30">
            <span className="text-3xl font-extrabold text-indigo-400">{memorizeTimer}</span>
          </div>
          <h2 className="text-xl font-extrabold text-center">¡Memoriza tus cartas!</h2>
          <p className="text-sm text-muted text-center">Tienes {memorizeTimer} segundos. Después se ocultan.</p>
          <div className="w-full flex flex-col gap-4">
            {players.map((player) => (
              <div key={player} className="rounded-xl border border-border bg-surface p-4">
                <p className="text-sm font-bold mb-2 text-indigo-400">{player}</p>
                <div className="flex gap-2 justify-center">
                  {playerHands[player]?.map((card, i) => (
                    <MiniCard key={i} card={card} faceUp={true} size="md" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  // ═══════════════════════════════════
  // GAME OVER
  // ═══════════════════════════════════
  if (phase === "gameover") {
    if (!showConfetti) {
      setShowConfetti(true);
      playSound("success");
      vibrateDevice("everyone");
    }
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
        <Confetti active={showConfetti} />
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-6 text-center">
          <div className="text-6xl">🔺</div>
          <h2 className="text-2xl font-extrabold sm:text-3xl text-indigo-400">¡PIRÁMIDE COMPLETADA!</h2>
          <p className="text-muted max-w-xs text-sm">Todas las cartas han sido reveladas. ¿Quién faroleó más?</p>
          <div className="flex gap-3 mt-4">
            <button onClick={reshuffleAndRestart} className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:scale-105">
              <Shuffle className="h-4 w-4" /> Otra ronda
            </button>
            <button onClick={restartGame} className="flex items-center gap-2 rounded-xl border border-border bg-surface px-5 py-3 text-sm font-medium transition-all hover:bg-surface-hover">
              <RotateCcw className="h-4 w-4" /> Cambiar setup
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // ═══════════════════════════════════
  // PLAYING SCREEN
  // ═══════════════════════════════════
  const isCurrentRevealed = revealedPyramid[currentPyramidIdx];
  const currentCard = pyramidCards[currentPyramidIdx];
  const currentPlayer = players[activePlayerIdx % players.length];

  // Build rows for visual pyramid (top=1 card, bottom=6 cards)
  const pyramidLayout: { card: CartaPiramide; idx: number; revealed: boolean }[][] = [];
  let flatIdx = 0;
  for (let r = 0; r < PYRAMID_ROWS.length; r++) {
    const row: { card: CartaPiramide; idx: number; revealed: boolean }[] = [];
    for (let c = 0; c < PYRAMID_ROWS[r]; c++) {
      row.push({ card: pyramidCards[flatIdx], idx: flatIdx, revealed: revealedPyramid[flatIdx] });
      flatIdx++;
    }
    pyramidLayout.push(row);
  }
  // Reverse so smallest row (top) is first
  pyramidLayout.reverse();

  return (
    <div className="flex flex-1 flex-col items-center px-4 py-6 sm:py-10">
      {/* Progress */}
      <div className="w-full max-w-lg mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-muted">Carta: {currentPyramidIdx + 1} / {PYRAMID_TOTAL}</span>
          <span className="text-xs font-semibold text-indigo-400">Fila {currentRow + 1} → {drinksForRow} {drinksForRow === 1 ? "trago" : "tragos"} 🍺</span>
        </div>
      </div>

      {/* Current turn */}
      <motion.div key={`turn-${activePlayerIdx}-${currentPyramidIdx}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center gap-1 mb-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-600/20 border border-indigo-500/30">
          <span className="text-lg font-extrabold text-indigo-400">{currentPlayer.charAt(0).toUpperCase()}</span>
        </div>
        <h2 className="text-base font-extrabold">
          Turno de <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">{currentPlayer}</span>
        </h2>
      </motion.div>

      {/* Pyramid visual */}
      <div className="w-full max-w-lg mb-4 flex flex-col items-center gap-1">
        {pyramidLayout.map((row, ri) => (
          <div key={ri} className="flex gap-1 justify-center">
            {row.map(({ card, idx, revealed }) => (
              <div key={idx} className={`transition-all ${idx === currentPyramidIdx ? "ring-2 ring-indigo-400 rounded-lg" : ""}`}>
                <MiniCard card={card} faceUp={revealed} size="sm" />
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Current card detail */}
      <AnimatePresence mode="wait">
        {isCurrentRevealed && currentCard && (
          <motion.div key={`card-${currentPyramidIdx}`} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="w-full max-w-lg mb-4">
            <div className="rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-surface to-surface-hover p-6 flex flex-col items-center gap-3 shadow-xl shadow-indigo-500/10">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 h-1 w-24 rounded-b-full bg-gradient-to-r from-indigo-500 to-purple-600" />
              <MiniCard card={currentCard} faceUp={true} size="md" />
              <p className="text-lg font-bold">{currentCard.valor} {currentCard.palo}</p>
              <p className="text-sm text-muted text-center">
                ¿Alguien tiene un <strong>{currentCard.valor}</strong>? Puede asignar <strong className="text-indigo-400">{drinksForRow} {drinksForRow === 1 ? "trago" : "tragos"}</strong> a otro jugador. ¡O farolear!
              </p>
              <div className="flex items-center gap-2 rounded-lg bg-amber-500/10 border border-amber-500/20 px-3 py-2 mt-1">
                <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0" />
                <p className="text-xs text-amber-300">Si te pillan faroleando, bebes el doble: {drinksForRow * 2} tragos</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Players row */}
      <div className="w-full max-w-lg mb-4 overflow-x-auto">
        <div className="flex gap-2 justify-center flex-wrap">
          {players.map((name) => (
            <span key={name} className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${name === currentPlayer ? "border-indigo-500/50 bg-indigo-500/10 text-indigo-400" : "border-border bg-surface text-muted"}`}>{name}</span>
          ))}
        </div>
      </div>

      {/* Action button */}
      {!isCurrentRevealed ? (
        <button onClick={revealCard} className="w-full max-w-lg flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:scale-[1.02] hover:shadow-xl">
          <Eye className="h-4 w-4" /> Revelar carta
        </button>
      ) : (
        <button onClick={nextCard} className="w-full max-w-lg flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:scale-[1.02] hover:shadow-xl">
          Siguiente carta <ChevronRight className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
