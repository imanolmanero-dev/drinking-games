"use client";

import { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Plus,
  X,
  Users,
  ChevronRight,
  RotateCcw,
  Shuffle,
  ShieldQuestion,
  Flame,
  Check,
  Clock,
  BookOpen,
} from "lucide-react";
import { useApp } from "@/lib/AppContext";
import Confetti from "@/components/ui/Confetti";
import IntensitySelector from "@/components/ui/IntensitySelector";
import { type Intensidad } from "@/lib/data/yo-nunca";
import AdBanner from "@/components/ui/AdBanner";

// ───── Shuffle helper ─────
function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

type Phase = "setup" | "choosing" | "reveal" | "gameover";

export default function VerdadORetoPage() {
  const { playSound, vibrateDevice, recentPlayers, savePlayersToRecent } = useApp();

  // Setup
  const [phase, setPhase] = useState<Phase>("setup");
  const [players, setPlayers] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [niveles, setNiveles] = useState<Intensidad[]>(["normal"]);
  const [isLoading, setIsLoading] = useState(false);

  // Game
  const [verdades, setVerdades] = useState<string[]>([]);
  const [retos, setRetos] = useState<string[]>([]);
  const [verdadIdx, setVerdadIdx] = useState(0);
  const [retoIdx, setRetoIdx] = useState(0);
  const [turnIdx, setTurnIdx] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [currentType, setCurrentType] = useState<"verdad" | "reto" | null>(null);
  const [roundCount, setRoundCount] = useState(0);

  const currentPlayer = players[turnIdx % players.length] ?? "";
  const totalRounds = verdades.length + retos.length;
  const progress = totalRounds ? Math.round((roundCount / totalRounds) * 100) : 0;

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

  const startGame = useCallback(async () => {
    setIsLoading(true);
    try {
      const { filtrarVerdades, filtrarRetos } = await import("@/lib/data/verdad-o-reto");
      setVerdades(shuffleArray(filtrarVerdades(niveles).map(v => v.texto)));
      setRetos(shuffleArray(filtrarRetos(niveles).map(r => r.texto)));
      setVerdadIdx(0);
      setRetoIdx(0);
      setTurnIdx(0);
      setRoundCount(0);
      setCurrentType(null);
      setShowConfetti(false);
      setPhase("choosing");
      savePlayersToRecent(players);
      playSound("success");
    } finally {
      setIsLoading(false);
    }
  }, [players, niveles, savePlayersToRecent, playSound]);

  // ── Game actions ──
  const chooseVerdad = useCallback(() => {
    if (verdadIdx >= verdades.length && retoIdx >= retos.length) {
      setPhase("gameover");
      return;
    }
    if (verdadIdx >= verdades.length) {
      // No more verdades, force reto
      chooseReto();
      return;
    }
    setCurrentText(verdades[verdadIdx]);
    setCurrentType("verdad");
    setVerdadIdx((i) => i + 1);
    setRoundCount((r) => r + 1);
    setPhase("reveal");
    playSound("flip");
    vibrateDevice("flip");
  }, [verdadIdx, verdades, retoIdx, retos.length]);

  const chooseReto = useCallback(() => {
    if (retoIdx >= retos.length && verdadIdx >= verdades.length) {
      setPhase("gameover");
      return;
    }
    if (retoIdx >= retos.length) {
      // No more retos, force verdad
      chooseVerdad();
      return;
    }
    setCurrentText(retos[retoIdx]);
    setCurrentType("reto");
    setRetoIdx((i) => i + 1);
    setRoundCount((r) => r + 1);
    setPhase("reveal");
    playSound("flip");
    vibrateDevice("flip");
  }, [retoIdx, retos, verdadIdx, verdades.length]);

  const nextTurn = useCallback(() => {
    // Check if all questions exhausted
    if (verdadIdx >= verdades.length && retoIdx >= retos.length) {
      setPhase("gameover");
      return;
    }
    setTurnIdx((t) => t + 1);
    setCurrentType(null);
    setPhase("choosing");
  }, [verdadIdx, verdades.length, retoIdx, retos.length]);

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
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg shadow-amber-500/25">
              <Sparkles className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              Verdad o Reto
            </h1>
            <p className="text-sm text-muted max-w-xs">
              Añade al menos 3 jugadores. Cada uno elegirá verdad o reto en su turno.
            </p>
            <Link href="/juegos/verdad-o-reto/reglas" className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-surface-hover px-3 py-1 text-xs font-semibold text-amber-500 transition-colors hover:bg-amber-500/10">
              <BookOpen className="h-3.5 w-3.5" />
              Ver cómo se juega
            </Link>
          </div>

          <IntensitySelector selected={niveles} onChange={setNiveles} />

          {/* Input */}
          <div className="flex gap-2">
            <input
              id="player-input"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addPlayer()}
              placeholder="Nombre del jugador…"
              className="flex-1 rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted outline-none transition-colors focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20"
              autoComplete="off"
            />
            <button
              onClick={addPlayer}
              disabled={!inputValue.trim()}
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/20 transition-all hover:scale-105 disabled:opacity-40 disabled:hover:scale-100 disabled:cursor-not-allowed"
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
                      className="flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-muted transition-all hover:border-amber-500/40 hover:text-foreground hover:bg-surface-hover"
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
            disabled={players.length < 3 || isLoading}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] hover:shadow-xl disabled:opacity-40 disabled:hover:scale-100 disabled:cursor-not-allowed"
          >
            {isLoading ? "Cargando..." : "Empezar a jugar"}
            {!isLoading && <ChevronRight className="h-4 w-4" />}
          </button>
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
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-6 text-center"
        >
          <div className="text-6xl">🔥</div>
          <h2 className="text-2xl font-extrabold sm:text-3xl">
            ¡Se acabaron las preguntas y retos!
          </h2>
          <p className="text-muted max-w-xs text-sm">
            Habéis completado {roundCount} rondas. ¿Os atrevéis con otra?
          </p>
          <div className="flex gap-3">
            <button
              onClick={reshuffleAndRestart}
              disabled={isLoading}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-500/20 transition-all hover:scale-105 disabled:opacity-50"
            >
              <Shuffle className="h-4 w-4" />
              {isLoading ? "Cargando..." : "Jugar otra vez"}
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

  // ═══════════════════════════════════
  // CHOOSING SCREEN — player picks verdad or reto
  // ═══════════════════════════════════
  if (phase === "choosing") {
    const verdadesLeft = verdades.length - verdadIdx;
    const retosLeft = retos.length - retoIdx;

    return (
      <div className="flex flex-1 flex-col items-center px-4 py-8 sm:py-12">
        {/* Progress */}
        <div className="w-full max-w-md mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-muted">
              Ronda {roundCount + 1} · Quedan {verdadesLeft + retosLeft} tarjetas
            </span>
            <span className="text-xs font-semibold text-amber-400">{progress}%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-surface overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Turn card */}
        <div className="flex flex-1 items-center justify-center w-full max-w-md">
          <motion.div
            key={`turn-${turnIdx}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full flex flex-col items-center gap-8"
          >
            {/* Player name */}
            <div className="flex flex-col items-center gap-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30">
                <span className="text-2xl font-extrabold text-amber-400">
                  {currentPlayer.charAt(0).toUpperCase()}
                </span>
              </div>
              <h2 className="text-xl font-extrabold sm:text-2xl">
                Turno de{" "}
                <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                  {currentPlayer}
                </span>
              </h2>
              <p className="text-sm text-muted">¿Qué eliges?</p>
            </div>

            {/* Two buttons */}
            <div className="grid grid-cols-2 gap-4 w-full">
              {/* Verdad */}
              <button
                onClick={chooseVerdad}
                disabled={verdadesLeft === 0}
                className="group relative flex flex-col items-center gap-3 rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:border-blue-500/40 hover:bg-surface-hover hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 shadow-lg shadow-blue-500/20">
                  <ShieldQuestion className="h-6 w-6 text-white" />
                </div>
                <span className="text-lg font-bold">Verdad</span>
                <span className="text-xs text-muted">{verdadesLeft} restantes</span>
              </button>

              {/* Reto */}
              <button
                onClick={chooseReto}
                disabled={retosLeft === 0}
                className="group relative flex flex-col items-center gap-3 rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:border-red-500/40 hover:bg-surface-hover hover:shadow-xl hover:shadow-red-500/10 hover:-translate-y-1 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-rose-500 shadow-lg shadow-red-500/20">
                  <Flame className="h-6 w-6 text-white" />
                </div>
                <span className="text-lg font-bold">Reto</span>
                <span className="text-xs text-muted">{retosLeft} restantes</span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* AdSense Banner every 6 rounds */}
        {roundCount > 0 && roundCount % 6 === 0 && (
          <div className="w-full max-w-md mt-6">
            <AdBanner dataAdSlot="IN_GAME_SLOT_ID" />
          </div>
        )}

        {/* Players row */}
        <div className="w-full max-w-md mt-8 overflow-x-auto">
          <div className="flex gap-2 justify-center flex-wrap">
            {players.map((name, i) => (
              <span
                key={name}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  name === currentPlayer
                    ? "border-amber-500/50 bg-amber-500/10 text-amber-400"
                    : "border-border bg-surface text-muted"
                }`}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════
  // REVEAL SCREEN — show verdad or reto
  // ═══════════════════════════════════
  const isVerdad = currentType === "verdad";
  const accentFrom = isVerdad ? "from-blue-500" : "from-red-500";
  const accentTo = isVerdad ? "to-indigo-500" : "to-rose-500";
  const glowColor = isVerdad ? "shadow-blue-500/15" : "shadow-red-500/15";
  const borderAccent = isVerdad ? "border-blue-500/30" : "border-red-500/30";

  return (
    <div className="flex flex-1 flex-col items-center px-4 py-8 sm:py-12">
      {/* Progress */}
      <div className="w-full max-w-md mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-muted">
            Ronda {roundCount} de {totalRounds}
          </span>
          <span className="text-xs font-semibold text-amber-400">{progress}%</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-surface overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Card */}
      <div className="perspective-1000 w-full max-w-md flex-1 flex items-center justify-center mb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentType}-${roundCount}`}
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="preserve-3d w-full"
          >
            <div
              className={`relative flex min-h-[300px] sm:min-h-[360px] flex-col items-center justify-center gap-6 rounded-3xl border ${borderAccent} bg-gradient-to-br from-surface to-surface-hover p-8 shadow-2xl ${glowColor}`}
            >
              {/* Top accent bar */}
              <div
                className={`absolute top-0 left-1/2 -translate-x-1/2 h-1 w-24 rounded-b-full bg-gradient-to-r ${accentFrom} ${accentTo}`}
              />

              {/* Badge */}
              <div
                className={`flex items-center gap-2 rounded-full border ${borderAccent} bg-gradient-to-r ${accentFrom} ${accentTo} px-4 py-1.5 text-xs font-semibold text-white`}
              >
                {isVerdad ? (
                  <ShieldQuestion className="h-3.5 w-3.5" />
                ) : (
                  <Flame className="h-3.5 w-3.5" />
                )}
                {isVerdad ? "VERDAD" : "RETO"}
              </div>

              {/* Player name */}
              <p className="text-sm text-muted">
                Para{" "}
                <span className="font-semibold text-foreground">
                  {currentPlayer}
                </span>
              </p>

              {/* The question / challenge */}
              <p className="text-center text-lg font-semibold leading-relaxed sm:text-xl">
                {currentText}
              </p>

              {/* Hint */}
              <p className="text-xs text-muted">
                {isVerdad
                  ? "Si no contestas… ¡fondo blanco! 🍷"
                  : "Si no lo cumples… ¡doble shot! 🔥"}
              </p>
            </div>
          </motion.div>
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
                  ? "border-amber-500/50 bg-amber-500/10 text-amber-400"
                  : "border-border bg-surface text-muted"
              }`}
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      {/* Done button */}
      <button
        onClick={nextTurn}
        className="w-full max-w-md flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] hover:shadow-xl"
      >
        <Check className="h-4 w-4" />
        Cumplido — Siguiente jugador
      </button>
    </div>
  );
}
