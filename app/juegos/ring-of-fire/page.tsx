"use client";

import { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  ChevronRight,
  RotateCcw,
  Plus,
  Flame,
  X,
  Clock,
  Shuffle,
  BookOpen,
} from "lucide-react";
import { useApp } from "@/lib/AppContext";
import Confetti from "@/components/ui/Confetti";
import { CARTAS_ROF, type CartaROF } from "@/lib/data/ring-of-fire";

// ───── Shuffle helper ─────
function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Generates a 52-card deck (4 of each)
function generateDeck(): CartaROF[] {
  const deck: CartaROF[] = [];
  for (let i = 0; i < 4; i++) {
    deck.push(...CARTAS_ROF);
  }
  return shuffleArray(deck);
}

type Phase = "setup" | "playing" | "gameover";

export default function RingOfFirePage() {
  const { playSound, vibrateDevice, recentPlayers, savePlayersToRecent } = useApp();

  const [phase, setPhase] = useState<Phase>("setup");
  const [showConfetti, setShowConfetti] = useState(false);

  // Setup state
  const [players, setPlayers] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  // Game state
  const [deck, setDeck] = useState<CartaROF[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0); // number of cards drawn
  const [turnIdx, setTurnIdx] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  const currentPlayer = players[turnIdx % players.length] ?? "";
  const currentCard = currentIndex > 0 ? deck[currentIndex - 1] : null;

  // Track kings to know when the game ends (4th King = game over)
  const kingsDrawn = useMemo(() => {
    return deck.slice(0, currentIndex).filter((c) => c.valor === "K").length;
  }, [deck, currentIndex]);

  // ── Setup ──
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

  const startGame = useCallback(() => {
    setDeck(generateDeck());
    setCurrentIndex(0);
    setTurnIdx(0);
    setPhase("playing");
    setShowConfetti(false);
    savePlayersToRecent(players);
    playSound("success");
    vibrateDevice("click");
  }, [players, savePlayersToRecent, playSound, vibrateDevice]);

  // ── Game handlers ──
  const drawCard = useCallback(() => {
    if (isFlipping) return;

    if (kingsDrawn >= 4 || currentIndex >= deck.length) {
      setPhase("gameover");
      return;
    }

    setIsFlipping(true);
    playSound("flip");
    vibrateDevice("flip");
    
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      
      const newCard = deck[currentIndex];
      if (newCard.valor === "K" && kingsDrawn + 1 >= 4) {
        // This is the 4th king. The player has to drink the cup.
        playSound("everyone");
        vibrateDevice("everyone");
        setTimeout(() => setPhase("gameover"), 3000);
      }
      
      setIsFlipping(false);
    }, 300);
  }, [isFlipping, currentIndex, deck, kingsDrawn, playSound, vibrateDevice]);

  const nextTurn = useCallback(() => {
    // Check game over
    if (kingsDrawn >= 4 || currentIndex >= deck.length) {
      setPhase("gameover");
      return;
    }
    setTurnIdx((t) => t + 1);
  }, [kingsDrawn, currentIndex, deck.length]);

  const restartGame = useCallback(() => {
    setPhase("setup");
    setPlayers([]);
  }, []);

  const reshuffleAndRestart = useCallback(() => {
    startGame();
  }, [startGame]);

  // ═══════════════════════════════════
  // SETUP SCREEN
  // ═══════════════════════════════════
  if (phase === "setup") {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md flex flex-col gap-8"
        >
          {/* Header */}
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 shadow-lg shadow-red-500/25">
              <Flame className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              Ring of Fire
            </h1>
            <p className="text-sm text-muted max-w-xs">
              Roba cartas y cumple sus reglas. ¡El que saque el cuarto Rey se bebe la mezcla central!
            </p>
            <Link href="/juegos/ring-of-fire/reglas" className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-surface-hover px-3 py-1 text-xs font-semibold text-rose-400 transition-colors hover:bg-rose-500/10">
              <BookOpen className="h-3.5 w-3.5" />
              Ver cómo se juega
            </Link>
          </div>

          {/* Input */}
          <div className="flex gap-2">
            <input
              id="player-input"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addPlayer()}
              placeholder="Nombre del jugador…"
              className="flex-1 rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted outline-none transition-colors focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20"
              autoComplete="off"
            />
            <button
              onClick={addPlayer}
              disabled={!inputValue.trim()}
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-lg shadow-red-500/20 transition-all hover:scale-105 disabled:opacity-40 disabled:hover:scale-100 disabled:cursor-not-allowed"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>

          {/* Player list */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted">
              <Users className="h-3.5 w-3.5" />
              Jugadores ({players.length})
            </div>

            <AnimatePresence mode="popLayout">
              {players.map((name) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, x: -20, height: 0 }}
                  animate={{ opacity: 1, x: 0, height: "auto" }}
                  exit={{ opacity: 0, x: 20, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-3"
                >
                  <span className="text-sm font-medium">{name}</span>
                  <button
                    onClick={() => removePlayer(name)}
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-muted transition-colors hover:bg-red-500/10 hover:text-red-400"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>

            {players.length === 0 && (
              <div className="flex items-center justify-center rounded-xl border border-dashed border-border py-8 text-sm text-muted">
                Aún no hay jugadores
              </div>
            )}
          </div>

          {/* Recent players */}
          {recentPlayers.filter((n) => !players.includes(n)).length > 0 && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted">
                <Clock className="h-3.5 w-3.5" />
                Jugadores recientes
              </div>
              <div className="flex flex-wrap gap-2">
                {recentPlayers
                  .filter((n) => !players.includes(n))
                  .slice(0, 8)
                  .map((name) => (
                    <button
                      key={name}
                      onClick={() => addRecentPlayer(name)}
                      className="flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-muted transition-all hover:border-red-500/40 hover:text-foreground hover:bg-surface-hover"
                    >
                      <Plus className="h-3 w-3" />
                      {name}
                    </button>
                  ))}
              </div>
            </div>
          )}

          {/* Start */}
          <button
            onClick={startGame}
            disabled={players.length < 2}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-red-500/20 transition-all hover:scale-[1.02] hover:shadow-xl disabled:opacity-40 disabled:hover:scale-100 disabled:cursor-not-allowed"
          >
            Empezar el juego
            <ChevronRight className="h-4 w-4" />
          </button>
        </motion.div>
      </div>
    );
  }

  // ═══════════════════════════════════
  // GAME OVER
  // ═══════════════════════════════════
  if (phase === "gameover" || kingsDrawn >= 4) {
    if (!showConfetti) {
      setShowConfetti(true);
      playSound("success");
      vibrateDevice("everyone");
    }
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
        <Confetti active={showConfetti} />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-6 text-center"
        >
          <div className="text-6xl">👑</div>
          <h2 className="text-2xl font-extrabold sm:text-3xl text-rose-400">
            ¡FIN DEL JUEGO!
          </h2>
          <p className="text-muted max-w-xs text-sm">
            {currentPlayer} se bebe la mezcla central. ¡Que aproveche!
          </p>
          <div className="flex gap-3 mt-4">
            <button
              onClick={reshuffleAndRestart}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-red-500/20 transition-all hover:scale-105"
            >
              <Shuffle className="h-4 w-4" />
              Otra ronda
            </button>
            <button
              onClick={restartGame}
              className="flex items-center gap-2 rounded-xl border border-border bg-surface px-5 py-3 text-sm font-medium transition-all hover:bg-surface-hover"
            >
              <RotateCcw className="h-4 w-4" />
              Cambiar setup
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // ═══════════════════════════════════
  // PLAYING SCREEN
  // ═══════════════════════════════════
  
  // Decide whether the current turn action is drawing or passing
  const isDrawingTurn = currentIndex === turnIdx; 

  return (
    <div className="flex flex-1 flex-col items-center px-4 py-8 sm:py-12">
      {/* Progress */}
      <div className="w-full max-w-md mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-muted">
            Cartas robadas: {currentIndex} / 52
          </span>
          <span className="text-xs font-semibold text-rose-400">
            Reyes: {kingsDrawn} / 4 👑
          </span>
        </div>
      </div>

      {/* Current Turn Header */}
      <motion.div
        key={`turn-${turnIdx}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-2 mb-6"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-red-500/20 to-rose-600/20 border border-red-500/30">
          <span className="text-xl font-extrabold text-rose-400">
            {currentPlayer.charAt(0).toUpperCase()}
          </span>
        </div>
        <h2 className="text-lg font-extrabold sm:text-xl">
          Turno de{" "}
          <span className="bg-gradient-to-r from-red-400 to-rose-400 bg-clip-text text-transparent">
            {currentPlayer}
          </span>
        </h2>
      </motion.div>

      {/* The Deck / Card Area */}
      <div className="perspective-1000 w-full max-w-md flex-1 flex flex-col items-center justify-center mb-8 h-64">
        <AnimatePresence mode="wait">
          {isDrawingTurn ? (
            // Deck face down
            <motion.div
              key="deck"
              initial={{ rotateY: -90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: 90, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="preserve-3d"
            >
              <button
                onClick={drawCard}
                disabled={isFlipping}
                className="group relative h-64 w-44 rounded-2xl border-4 border-white bg-red-600 shadow-xl shadow-red-900/50 transition-transform active:scale-95 disabled:scale-100 disabled:opacity-50"
              >
                {/* Back of Card Design */}
                <div className="absolute inset-1 border border-white/20 rounded-xl bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-white/10" />
                <div className="flex h-full w-full items-center justify-center">
                  <div className="rounded-full bg-white p-3 shadow-lg group-hover:scale-110 transition-transform">
                    <Flame className="h-8 w-8 text-red-600" />
                  </div>
                </div>
              </button>
              <p className="text-center mt-6 text-sm text-muted animate-pulse">Toca el mazo para robar</p>
            </motion.div>
          ) : currentCard ? (
            // Revealed Card
            <motion.div
              key="revealed"
              initial={{ rotateY: 90, opacity: 0, scale: 0.8 }}
              animate={{ rotateY: 0, opacity: 1, scale: 1 }}
              exit={{ rotateY: -90, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="preserve-3d w-full"
            >
              <div className="relative flex min-h-[300px] flex-col items-center justify-center rounded-3xl border border-red-500/30 bg-gradient-to-br from-surface to-surface-hover p-6 shadow-2xl shadow-red-500/15">
                {/* Top accent bar */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-1 w-24 rounded-b-full bg-gradient-to-r from-red-500 to-rose-600" />
                
                {/* Visual Card Representation */}
                <div className="mb-4 flex h-24 w-16 flex-col items-center justify-between rounded-lg border border-border bg-white shadow-sm p-2 text-black">
                  <span className="self-start text-lg font-black leading-none">{currentCard.valor}</span>
                  <span className="text-2xl">{['A','J','Q','K'].includes(currentCard.valor) ? '👑' : '♦️'}</span>
                  <span className="self-end text-lg font-black leading-none">{currentCard.valor}</span>
                </div>

                {/* Rule info */}
                <h3 className="text-xl font-bold uppercase tracking-wider mb-2">
                  {currentCard.nombre}
                </h3>
                <p className="font-semibold text-rose-400 mb-2">
                  {currentCard.regla}
                </p>
                <p className="text-center text-sm text-muted">
                  {currentCard.descripcion}
                </p>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      {/* Players row */}
      <div className="w-full max-w-md mb-6 overflow-x-auto">
        <div className="flex gap-2 justify-center flex-wrap">
          {players.map((name) => (
            <span
              key={name}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                name === currentPlayer
                  ? "border-red-500/50 bg-red-500/10 text-rose-400"
                  : "border-border bg-surface text-muted"
              }`}
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      {/* Next player button (only visible when a card is revealed) */}
      {!isDrawingTurn && (
        <button
          onClick={nextTurn}
          className="w-full max-w-md flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-red-500/20 transition-all hover:scale-[1.02] hover:shadow-xl"
        >
          Siguiente jugador
          <ChevronRight className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
