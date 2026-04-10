"use client";

import { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Crown,
  Plus,
  X,
  Users,
  ChevronRight,
  RotateCcw,
  Shuffle,
  Clock,
  BookOpen,
} from "lucide-react";
import { useApp } from "@/lib/AppContext";
import Confetti from "@/components/ui/Confetti";
import AdBanner from "@/components/ui/AdBanner";
import {
  buildDeck,
  shuffleDeck,
  type Carta,
  type Palo,
} from "@/lib/data/rey-de-la-copa";

const RED_PALOS: Palo[] = ["♥", "♦"];

export default function ReyDeLaCopaPage() {
  const { playSound, vibrateDevice, recentPlayers, savePlayersToRecent } =
    useApp();

  const [phase, setPhase] = useState<"setup" | "playing">("setup");
  const [players, setPlayers] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [deck, setDeck] = useState<Carta[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [kingsDrawn, setKingsDrawn] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [showKingCup, setShowKingCup] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const addPlayer = useCallback(() => {
    const name = inputValue.trim();
    if (name && !players.includes(name)) {
      setPlayers((prev) => [...prev, name]);
      setInputValue("");
      playSound("click");
    }
  }, [inputValue, players, playSound]);

  const removePlayer = useCallback(
    (name: string) => setPlayers((prev) => prev.filter((p) => p !== name)),
    []
  );

  const addRecentPlayer = useCallback(
    (name: string) => {
      if (!players.includes(name)) {
        setPlayers((prev) => [...prev, name]);
        playSound("click");
      }
    },
    [players, playSound]
  );

  const startGame = useCallback(() => {
    const newDeck = shuffleDeck(buildDeck());
    setDeck(newDeck);
    setCurrentIndex(0);
    setKingsDrawn(0);
    setPhase("playing");
    savePlayersToRecent(players);
    playSound("success");
  }, [players, savePlayersToRecent, playSound]);

  const drawCard = useCallback(() => {
    if (isFlipping) return;
    setIsFlipping(true);
    playSound("flip");
    vibrateDevice("flip");

    const carta = deck[currentIndex];
    if (carta?.regla.esCopa) {
      const newKings = kingsDrawn + 1;
      setKingsDrawn(newKings);
      if (newKings === 4) {
        setShowKingCup(true);
        playSound("drink");
        vibrateDevice("everyone");
      }
    }

    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setIsFlipping(false);
    }, 300);
  }, [isFlipping, deck, currentIndex, kingsDrawn, playSound, vibrateDevice]);

  const restartGame = useCallback(() => {
    setPhase("setup");
    setPlayers([]);
    setCurrentIndex(0);
    setKingsDrawn(0);
    setShowKingCup(false);
    setShowConfetti(false);
  }, []);

  const shuffleAndRestart = useCallback(() => {
    setDeck(shuffleDeck(buildDeck()));
    setCurrentIndex(0);
    setKingsDrawn(0);
    setShowKingCup(false);
    setShowConfetti(false);
    playSound("success");
  }, [playSound]);

  const isGameOver = currentIndex >= deck.length && deck.length > 0;
  const currentCard = deck[currentIndex];
  const progress = deck.length ? Math.round((currentIndex / deck.length) * 100) : 0;
  const isRed = currentCard ? RED_PALOS.includes(currentCard.palo) : false;

  if (phase === "setup") {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md flex flex-col gap-8"
        >
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 shadow-lg shadow-amber-400/25">
              <Crown className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              El Rey de la Copa
            </h1>
            <p className="text-sm text-muted max-w-xs">
              Roba cartas y cumple sus reglas. El que saque el 4º Rey bebe la
              copa entera. ¡Que empiece el reinado!
            </p>
            <Link
              href="/juegos/rey-de-la-copa/reglas"
              className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-surface-hover px-3 py-1 text-xs font-semibold text-accent transition-colors hover:bg-accent/10"
            >
              <BookOpen className="h-3.5 w-3.5" />
              Ver cómo se juega
            </Link>
          </div>

          <div className="flex gap-2">
            <input
              id="rey-player-input"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addPlayer()}
              placeholder="Nombre del jugador…"
              className="flex-1 rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted outline-none transition-colors focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
              autoComplete="off"
            />
            <button
              onClick={addPlayer}
              disabled={!inputValue.trim()}
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 text-white shadow-lg shadow-amber-400/25 transition-all hover:scale-105 disabled:opacity-40 disabled:hover:scale-100 disabled:cursor-not-allowed"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>

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
                      className="flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-muted transition-all hover:border-accent/40 hover:text-foreground hover:bg-surface-hover"
                    >
                      <Plus className="h-3 w-3" />
                      {name}
                    </button>
                  ))}
              </div>
            </div>
          )}

          <button
            onClick={startGame}
            disabled={players.length < 2}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-amber-400/25 transition-all hover:scale-[1.02] hover:shadow-xl disabled:opacity-40 disabled:hover:scale-100 disabled:cursor-not-allowed"
          >
            Empezar a jugar
            <ChevronRight className="h-4 w-4" />
          </button>
        </motion.div>
      </div>
    );
  }

  // 4th King screen
  if (showKingCup) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center gap-6 text-center"
        >
          <motion.div
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.6, repeat: 2 }}
            className="text-8xl"
          >
            👑
          </motion.div>
          <h2 className="text-3xl font-black text-amber-400">
            ¡4º REY!
          </h2>
          <p className="text-xl font-bold">¡BEBE LA COPA ENTERA!</p>
          <p className="text-muted text-sm max-w-xs">
            El que ha sacado el cuarto Rey tiene que beberse todo lo que hay en
            la copa del Rey. ¡Sin excusas!
          </p>
          <button
            onClick={() => setShowKingCup(false)}
            className="mt-4 flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-amber-400/25 transition-all hover:scale-[1.02]"
          >
            Continuar jugando <ChevronRight className="h-4 w-4" />
          </button>
        </motion.div>
      </div>
    );
  }

  // Game Over
  if (isGameOver) {
    if (!showConfetti) setShowConfetti(true);
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
        <Confetti active={showConfetti} />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-6 text-center"
        >
          <div className="text-6xl">🎉</div>
          <h2 className="text-2xl font-extrabold sm:text-3xl">
            ¡Se acabó la baraja!
          </h2>
          <p className="text-muted max-w-xs text-sm">
            Las {deck.length} cartas han sido robadas. ¿Otra partida?
          </p>
          <div className="flex gap-3">
            <button
              onClick={shuffleAndRestart}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-400/25 transition-all hover:scale-105"
            >
              <Shuffle className="h-4 w-4" />
              Jugar otra vez
            </button>
            <button
              onClick={restartGame}
              className="flex items-center gap-2 rounded-xl border border-border bg-surface px-5 py-3 text-sm font-medium transition-all hover:bg-surface-hover"
            >
              <RotateCcw className="h-4 w-4" />
              Cambiar jugadores
            </button>
          </div>
          <div className="mt-8 w-full">
            <AdBanner dataAdSlot="GAMEOVER_SLOT_ID" />
          </div>
        </motion.div>
      </div>
    );
  }

  // Playing screen
  return (
    <div className="flex flex-1 flex-col items-center px-4 py-8 sm:py-12">
      {/* Header */}
      <div className="w-full max-w-md mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-muted">
            Carta {currentIndex + 1} de {deck.length}
          </span>
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4].map((n) => (
              <span
                key={n}
                className={`text-sm transition-all ${
                  n <= kingsDrawn ? "text-amber-400" : "text-muted/30"
                }`}
              >
                👑
              </span>
            ))}
          </div>
        </div>
        <div className="h-1.5 w-full rounded-full bg-surface overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-amber-400 to-yellow-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
        <p className="text-center text-xs text-muted mt-2">
          Reyes: {kingsDrawn}/4 — La Copa del Rey espera 🏆
        </p>
      </div>

      {/* Card */}
      <div className="perspective-1000 w-full max-w-md flex-1 flex items-center justify-center mb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="preserve-3d w-full"
          >
            <div className="relative flex flex-col items-center gap-4 rounded-3xl border border-border bg-gradient-to-br from-surface to-surface-hover p-8 shadow-2xl shadow-amber-400/10 min-h-[300px] justify-center">
              {/* Top accent */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 h-1 w-24 rounded-b-full bg-gradient-to-r from-amber-400 to-yellow-500" />

              {/* Card value + suit */}
              <div className="flex items-center gap-3">
                <span
                  className={`text-5xl font-black ${
                    isRed ? "text-red-400" : "text-foreground"
                  }`}
                >
                  {currentCard?.valor}
                </span>
                <span
                  className={`text-3xl ${
                    isRed ? "text-red-400" : "text-muted"
                  }`}
                >
                  {currentCard?.palo}
                </span>
              </div>

              {/* Emoji */}
              <div className="text-4xl">{currentCard?.regla.emoji}</div>

              {/* Rule */}
              <div className="text-center">
                <p className="text-lg font-bold mb-2">
                  {currentCard?.regla.titulo}
                </p>
                <p className="text-sm text-muted leading-relaxed">
                  {currentCard?.regla.descripcion}
                </p>
              </div>

              {/* King indicator */}
              {currentCard?.regla.esCopa && (
                <div className="rounded-full bg-amber-400/15 border border-amber-400/30 px-3 py-1 text-xs font-semibold text-amber-400">
                  👑 Rey {kingsDrawn}/4 — ¡Llena la copa!
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Players */}
      <div className="w-full max-w-md mb-6">
        <div className="flex gap-2 justify-center flex-wrap">
          {players.map((name) => (
            <span
              key={name}
              className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted"
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      {currentIndex > 0 && currentIndex % 8 === 0 && (
        <div className="w-full max-w-md mb-6">
          <AdBanner dataAdSlot="IN_GAME_SLOT_ID" />
        </div>
      )}

      <button
        onClick={drawCard}
        disabled={isFlipping}
        className="w-full max-w-md flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-amber-400/25 transition-all hover:scale-[1.02] hover:shadow-xl disabled:opacity-60"
      >
        {currentIndex < deck.length - 1 ? (
          <>
            Robar carta <ChevronRight className="h-4 w-4" />
          </>
        ) : (
          <>
            Ver resultados <ChevronRight className="h-4 w-4" />
          </>
        )}
      </button>
    </div>
  );
}
