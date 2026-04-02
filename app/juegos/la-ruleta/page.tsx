"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  X,
  Users,
  ChevronRight,
  RotateCcw,
  Shuffle,
  Beer,
  PartyPopper,
  Clock,
} from "lucide-react";
import { useApp } from "@/lib/AppContext";

// ───── Castigos de la ruleta ─────
const CASTIGOS = [
  { texto: "Bebe 2 tragos", emoji: "🍺", color: "#a855f7" },
  { texto: "Imita a alguien del grupo", emoji: "🎭", color: "#ec4899" },
  { texto: "Todos beben", emoji: "🍻", color: "#f43f5e" },
  { texto: "Bebe 1 trago", emoji: "🥃", color: "#f97316" },
  { texto: "Cuenta un secreto", emoji: "🤫", color: "#eab308" },
  { texto: "Bebe 3 tragos", emoji: "🍷", color: "#84cc16" },
  { texto: "Haz 10 flexiones", emoji: "💪", color: "#22c55e" },
  { texto: "Canta una canción", emoji: "🎤", color: "#14b8a6" },
  { texto: "Fondo blanco", emoji: "🥂", color: "#06b6d4" },
  { texto: "Elige quién bebe", emoji: "🫵", color: "#3b82f6" },
  { texto: "Baila 15 segundos", emoji: "💃", color: "#6366f1" },
  { texto: "Te salvas esta vez", emoji: "😇", color: "#8b5cf6" },
  { texto: "Bebe sin manos", emoji: "🙌", color: "#d946ef" },
  { texto: "Di un piropo al de tu derecha", emoji: "😘", color: "#f43f5e" },
  { texto: "Waterfall: todos beben en cadena", emoji: "🌊", color: "#0ea5e9" },
  { texto: "Verdad o bebe 3", emoji: "🤔", color: "#10b981" },
];

// ───── SVG Roulette Wheel ─────
function RouletteWheel({
  rotation,
  spinning,
}: {
  rotation: number;
  spinning: boolean;
}) {
  const segCount = CASTIGOS.length;
  const segAngle = 360 / segCount;
  const radius = 160;
  const center = 180;
  const innerRadius = 40;

  const segments = CASTIGOS.map((castigo, i) => {
    const startAngle = i * segAngle - 90;
    const endAngle = startAngle + segAngle;
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1 = center + radius * Math.cos(startRad);
    const y1 = center + radius * Math.sin(startRad);
    const x2 = center + radius * Math.cos(endRad);
    const y2 = center + radius * Math.sin(endRad);

    const largeArc = segAngle > 180 ? 1 : 0;

    const path = `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;

    // Text position (middle of segment)
    const midAngle = ((startAngle + endAngle) / 2) * (Math.PI / 180);
    const textR = radius * 0.65;
    const tx = center + textR * Math.cos(midAngle);
    const ty = center + textR * Math.sin(midAngle);
    const textRotation = (startAngle + endAngle) / 2 + 90;

    return (
      <g key={i}>
        <path d={path} fill={castigo.color} stroke="#0a0a0f" strokeWidth="2" />
        <text
          x={tx}
          y={ty}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="20"
          transform={`rotate(${textRotation}, ${tx}, ${ty})`}
        >
          {castigo.emoji}
        </text>
      </g>
    );
  });

  return (
    <div className="relative">
      {/* Pointer (top) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-20">
        <div className="w-0 h-0 border-l-[14px] border-r-[14px] border-t-[24px] border-l-transparent border-r-transparent border-t-white drop-shadow-lg" />
      </div>

      {/* Outer glow ring */}
      <div
        className={`absolute inset-0 rounded-full transition-shadow duration-500 ${
          spinning
            ? "shadow-[0_0_40px_10px_rgba(168,85,247,0.3)]"
            : "shadow-[0_0_20px_5px_rgba(168,85,247,0.15)]"
        }`}
      />

      {/* Wheel */}
      <motion.div
        animate={{ rotate: rotation }}
        transition={
          spinning
            ? {
                duration: 4 + Math.random() * 2,
                ease: [0.2, 0.8, 0.3, 1],
              }
            : { duration: 0 }
        }
        className="relative"
      >
        <svg
          width="360"
          height="360"
          viewBox="0 0 360 360"
          className="drop-shadow-2xl w-[280px] h-[280px] sm:w-[360px] sm:h-[360px]"
        >
          {/* Border circle */}
          <circle
            cx={center}
            cy={center}
            r={radius + 5}
            fill="none"
            stroke="#1e1e2a"
            strokeWidth="4"
          />
          {segments}
          {/* Center circle */}
          <circle
            cx={center}
            cy={center}
            r={innerRadius}
            fill="#0a0a0f"
            stroke="#1e1e2a"
            strokeWidth="3"
          />
          <text
            x={center}
            y={center}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="24"
          >
            🎯
          </text>
        </svg>
      </motion.div>
    </div>
  );
}

type Phase = "setup" | "playing" | "result";

export default function LaRuletaPage() {
  const { playSound, vibrateDevice, recentPlayers, savePlayersToRecent } = useApp();

  const [phase, setPhase] = useState<Phase>("setup");
  const [players, setPlayers] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const [turnIdx, setTurnIdx] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [selectedCastigo, setSelectedCastigo] = useState<
    (typeof CASTIGOS)[number] | null
  >(null);
  const [roundCount, setRoundCount] = useState(0);

  const spinResolveRef = useRef<(() => void) | null>(null);

  const currentPlayer = players[turnIdx % players.length] ?? "";

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
    setTurnIdx(0);
    setRotation(0);
    setRoundCount(0);
    setSelectedCastigo(null);
    setPhase("playing");
    savePlayersToRecent(players);
    playSound("success");
  }, [players, savePlayersToRecent, playSound]);

  // ── Spin the wheel ──
  const spinWheel = useCallback(() => {
    if (spinning) return;

    setSpinning(true);
    setSelectedCastigo(null);
    playSound("spin");
    vibrateDevice("dice");

    const segAngle = 360 / CASTIGOS.length;
    const segIndex = Math.floor(Math.random() * CASTIGOS.length);
    const fullRotations = (3 + Math.floor(Math.random() * 3)) * 360;
    const segMid = segIndex * segAngle + segAngle / 2;
    const targetRotation = rotation + fullRotations + (360 - segMid);

    setRotation(targetRotation);

    const duration = 4000 + Math.random() * 2000;
    setTimeout(() => {
      setSpinning(false);
      setSelectedCastigo(CASTIGOS[segIndex]);
      setRoundCount((r) => r + 1);
      setPhase("result");
      playSound("drink");
      vibrateDevice("result");
    }, duration);
  }, [spinning, rotation, playSound, vibrateDevice]);

  // ── Next turn ──
  const nextTurn = useCallback(() => {
    setTurnIdx((t) => t + 1);
    setSelectedCastigo(null);
    setPhase("playing");
  }, []);

  const restartGame = useCallback(() => {
    setPhase("setup");
    setPlayers([]);
    setRotation(0);
  }, []);

  // ═══════════════════════════════════
  // SETUP
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
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 to-pink-500 shadow-lg shadow-rose-500/25">
              <PartyPopper className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              La Ruleta
            </h1>
            <p className="text-sm text-muted max-w-xs">
              Gira la ruleta y cumple el castigo que te toque. Sin excusas. 🎡
            </p>
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
              className="flex-1 rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted outline-none transition-colors focus:border-rose-500/50 focus:ring-2 focus:ring-rose-500/20"
              autoComplete="off"
            />
            <button
              onClick={addPlayer}
              disabled={!inputValue.trim()}
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/20 transition-all hover:scale-105 disabled:opacity-40 disabled:hover:scale-100 disabled:cursor-not-allowed"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>

          {/* Preview of some castigos */}
          <div className="rounded-xl border border-border bg-surface p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-rose-400 mb-3">
              Algunos castigos posibles
            </h3>
            <div className="flex flex-wrap gap-2">
              {CASTIGOS.slice(0, 8).map((c, i) => (
                <span
                  key={i}
                  className="rounded-full border border-border bg-background/50 px-3 py-1 text-xs text-muted"
                >
                  {c.emoji} {c.texto}
                </span>
              ))}
              <span className="rounded-full border border-border bg-background/50 px-3 py-1 text-xs text-muted">
                …y más
              </span>
            </div>
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
                      className="flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-muted transition-all hover:border-rose-500/40 hover:text-foreground hover:bg-surface-hover"
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
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-rose-500/20 transition-all hover:scale-[1.02] hover:shadow-xl disabled:opacity-40 disabled:hover:scale-100 disabled:cursor-not-allowed"
          >
            Empezar a girar
            <ChevronRight className="h-4 w-4" />
          </button>
        </motion.div>
      </div>
    );
  }

  // ═══════════════════════════════════
  // RESULT — show castigo
  // ═══════════════════════════════════
  if (phase === "result" && selectedCastigo) {
    return (
      <div className="flex flex-1 flex-col items-center px-4 py-8 sm:py-12">
        {/* Round counter */}
        <div className="w-full max-w-md mb-6">
          <div className="flex items-center justify-between text-xs text-muted">
            <span>Ronda {roundCount}</span>
            <span>Turno de {currentPlayer}</span>
          </div>
        </div>

        {/* Wheel (stopped) */}
        <div className="mb-6">
          <RouletteWheel rotation={rotation} spinning={false} />
        </div>

        {/* Result card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`result-${roundCount}`}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full max-w-md"
          >
            <div
              className="flex flex-col items-center gap-4 rounded-2xl border p-6 text-center"
              style={{
                borderColor: selectedCastigo.color + "60",
                background: `linear-gradient(135deg, ${selectedCastigo.color}10, ${selectedCastigo.color}05)`,
              }}
            >
              <span className="text-5xl">{selectedCastigo.emoji}</span>
              <div>
                <p className="text-sm text-muted mb-1">
                  {currentPlayer} tiene que…
                </p>
                <p className="text-xl font-bold">{selectedCastigo.texto}</p>
              </div>
              <div
                className="flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold text-white"
                style={{ background: selectedCastigo.color }}
              >
                <Beer className="h-3.5 w-3.5" />
                ¡Sin excusas!
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Players */}
        <div className="w-full max-w-md my-4 overflow-x-auto">
          <div className="flex gap-2 justify-center flex-wrap">
            {players.map((name) => (
              <span
                key={name}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  name === currentPlayer
                    ? "border-rose-500/50 bg-rose-500/10 text-rose-400"
                    : "border-border bg-surface text-muted"
                }`}
              >
                {name}
              </span>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="w-full max-w-md flex gap-3">
          <button
            onClick={nextTurn}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-rose-500/20 transition-all hover:scale-[1.02] hover:shadow-xl"
          >
            Siguiente jugador
            <ChevronRight className="h-4 w-4" />
          </button>
          <button
            onClick={restartGame}
            className="flex items-center justify-center rounded-xl border border-border bg-surface px-4 py-4 text-sm text-muted transition-all hover:bg-surface-hover"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════
  // PLAYING — spin the wheel
  // ═══════════════════════════════════
  return (
    <div className="flex flex-1 flex-col items-center px-4 py-8 sm:py-12">
      {/* Round counter */}
      <div className="w-full max-w-md mb-6">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted">Ronda {roundCount + 1}</span>
          <button
            onClick={restartGame}
            className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-muted transition-colors hover:bg-surface-hover"
          >
            <RotateCcw className="h-3 w-3 inline mr-1" />
            Reiniciar
          </button>
        </div>
      </div>

      {/* Player turn */}
      <motion.div
        key={`turn-${turnIdx}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-2 mb-6"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-rose-500/20 to-pink-500/20 border border-rose-500/30">
          <span className="text-xl font-extrabold text-rose-400">
            {currentPlayer.charAt(0).toUpperCase()}
          </span>
        </div>
        <h2 className="text-lg font-extrabold sm:text-xl">
          Turno de{" "}
          <span className="bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">
            {currentPlayer}
          </span>
        </h2>
      </motion.div>

      {/* Wheel */}
      <div className="mb-8">
        <RouletteWheel rotation={rotation} spinning={spinning} />
      </div>

      {/* Spin button */}
      <button
        onClick={spinWheel}
        disabled={spinning}
        className="w-full max-w-md flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-rose-500/20 transition-all hover:scale-[1.02] hover:shadow-xl disabled:opacity-60"
      >
        {spinning ? (
          <>
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 0.6 }}
              className="inline-block"
            >
              🎡
            </motion.span>
            Girando…
          </>
        ) : (
          <>
            🎡 Girar la ruleta
          </>
        )}
      </button>

      {/* Players row */}
      <div className="w-full max-w-md mt-6 overflow-x-auto">
        <div className="flex gap-2 justify-center flex-wrap">
          {players.map((name) => (
            <span
              key={name}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                name === currentPlayer
                  ? "border-rose-500/50 bg-rose-500/10 text-rose-400"
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
