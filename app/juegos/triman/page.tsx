"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dice1,
  Dice2,
  Dice3,
  Dice4,
  Dice5,
  Dice6,
  Plus,
  X,
  Users,
  ChevronRight,
  RotateCcw,
  Crown,
  Beer,
  Clock,
} from "lucide-react";
import { useApp } from "@/lib/AppContext";

// ───── Dice faces ─────
const DICE_ICONS = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];

// ───── Dot-based dice face (for the big animated die) ─────
function DiceFace({ value }: { value: number }) {
  const dotPositions: Record<number, [number, number][]> = {
    1: [[50, 50]],
    2: [
      [25, 25],
      [75, 75],
    ],
    3: [
      [25, 25],
      [50, 50],
      [75, 75],
    ],
    4: [
      [25, 25],
      [75, 25],
      [25, 75],
      [75, 75],
    ],
    5: [
      [25, 25],
      [75, 25],
      [50, 50],
      [25, 75],
      [75, 75],
    ],
    6: [
      [25, 25],
      [75, 25],
      [25, 50],
      [75, 50],
      [25, 75],
      [75, 75],
    ],
  };

  const dots = dotPositions[value] || [];

  return (
    <div className="relative h-28 w-28 rounded-2xl border-2 border-emerald-500/30 bg-gradient-to-br from-surface to-surface-hover shadow-2xl shadow-emerald-500/20 sm:h-36 sm:w-36">
      {dots.map(([cx, cy], i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, x: "-50%", y: "-50%" }}
          animate={{ scale: 1, x: "-50%", y: "-50%" }}
          transition={{ delay: i * 0.05, duration: 0.2 }}
          className="absolute h-5 w-5 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50 sm:h-6 sm:w-6"
          style={{
            left: `${cx}%`,
            top: `${cy}%`,
          }}
        />
      ))}
    </div>
  );
}

// ───── Rules text ─────
function getRuleText(
  value: number,
  roller: string,
  players: string[],
  rollerIdx: number,
  trimanName: string
): { who: string; message: string; emoji: string } {
  const rightIdx = (rollerIdx + 1) % players.length;
  const leftIdx = (rollerIdx - 1 + players.length) % players.length;

  switch (value) {
    case 1:
      return {
        who: roller,
        message: `${roller} bebe — ¡le tocó a quien lanzó!`,
        emoji: "🍺",
      };
    case 2:
      return {
        who: players[rightIdx],
        message: `Bebe ${players[rightIdx]} — a la derecha de ${roller}`,
        emoji: "👉",
      };
    case 3:
      return {
        who: trimanName,
        message: `¡Bebe el Triman! ${trimanName} siempre bebe con el 3`,
        emoji: "👑",
      };
    case 4:
      return {
        who: players[leftIdx],
        message: `Bebe ${players[leftIdx]} — a la izquierda de ${roller}`,
        emoji: "👈",
      };
    case 5:
      return {
        who: "",
        message: `${roller} elige quién bebe del grupo`,
        emoji: "🫵",
      };
    case 6:
      return {
        who: "¡TODOS!",
        message: "¡Beben TODOS! Nadie se salva",
        emoji: "🍻",
      };
    default:
      return { who: "", message: "", emoji: "" };
  }
}

type Phase = "setup" | "findTriman" | "playing" | "choosing" | "result";

export default function TrimanPage() {
  const { playSound, vibrateDevice, recentPlayers, savePlayersToRecent } = useApp();

  // Setup
  const [phase, setPhase] = useState<Phase>("setup");
  const [players, setPlayers] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  // Find Triman
  const [searchIdx, setSearchIdx] = useState(0);
  const [trimanName, setTrimanName] = useState("");
  const [searchDice, setSearchDice] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);

  // Playing
  const [turnIdx, setTurnIdx] = useState(0);
  const [diceValue, setDiceValue] = useState<number | null>(null);
  const [ruleResult, setRuleResult] = useState<{
    who: string;
    message: string;
    emoji: string;
  } | null>(null);

  const currentPlayer = players[turnIdx % players.length] ?? "";
  const searchPlayer = players[searchIdx % players.length] ?? "";

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
    setSearchIdx(0);
    setSearchDice(null);
    setTrimanName("");
    setPhase("findTriman");
    savePlayersToRecent(players);
    playSound("success");
  }, [players, savePlayersToRecent, playSound]);

  // ── Roll dice (animated) ──
  const rollDice = useCallback((): Promise<number> => {
    return new Promise((resolve) => {
      setIsRolling(true);
      playSound("dice");
      vibrateDevice("dice");
      let count = 0;
      const max = 10 + Math.floor(Math.random() * 6);
      const interval = setInterval(() => {
        const fake = Math.floor(Math.random() * 6) + 1;
        // For findTriman phase, update searchDice; for playing phase, update diceValue
        setSearchDice(fake);
        setDiceValue(fake);
        count++;
        if (count >= max) {
          clearInterval(interval);
          const final = Math.floor(Math.random() * 6) + 1;
          setSearchDice(final);
          setDiceValue(final);
          setIsRolling(false);
          resolve(final);
        }
      }, 80);
    });
  }, []);

  // ── Find Triman: roll for current search player ──
  const rollForTriman = useCallback(async () => {
    if (isRolling) return;
    const result = await rollDice();
    if (result === 3) {
      // Found the Triman!
      setTrimanName(searchPlayer);
      playSound("success");
      vibrateDevice("everyone");
      setTimeout(() => {
        setTurnIdx(0);
        setDiceValue(null);
        setRuleResult(null);
        setPhase("playing");
      }, 2000);
    } else {
      // Next player
      setTimeout(() => {
        setSearchIdx((i) => i + 1);
        setSearchDice(null);
      }, 1200);
    }
  }, [isRolling, rollDice, searchPlayer]);

  // ── Playing: roll the dice ──
  const rollGameDice = useCallback(async () => {
    if (isRolling) return;
    setRuleResult(null);
    const result = await rollDice();
    const playerIdx = turnIdx % players.length;

    if (result === 5) {
      // Player chooses who drinks
      setDiceValue(result);
      setPhase("choosing");
    } else {
      const rule = getRuleText(result, currentPlayer, players, playerIdx, trimanName);
      setRuleResult(rule);
      setPhase("result");
    }
  }, [isRolling, rollDice, turnIdx, players, currentPlayer, trimanName]);

  // ── Choose who drinks (for 5) ──
  const chooseDrinker = useCallback(
    (name: string) => {
      setRuleResult({
        who: name,
        message: `${currentPlayer} ha elegido: ¡bebe ${name}!`,
        emoji: "🫵",
      });
      setPhase("result");
    },
    [currentPlayer]
  );

  // ── Next turn ──
  const nextTurn = useCallback(() => {
    setTurnIdx((t) => t + 1);
    setDiceValue(null);
    setRuleResult(null);
    setPhase("playing");
  }, []);

  // ── Restart ──
  const restartGame = useCallback(() => {
    setPhase("setup");
    setPlayers([]);
    setTrimanName("");
    setTurnIdx(0);
  }, []);

  const newTriman = useCallback(() => {
    setSearchIdx(0);
    setSearchDice(null);
    setTrimanName("");
    setDiceValue(null);
    setRuleResult(null);
    setPhase("findTriman");
  }, []);

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
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/25">
              <Dice3 className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              Triman
            </h1>
            <p className="text-xs font-medium uppercase tracking-widest text-emerald-400">
              El Señor del 3
            </p>
            <p className="text-sm text-muted max-w-xs mt-1">
              Añade al menos 3 jugadores. Necesitaréis un dado (nosotros lo
              tiramos por vosotros 🎲).
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
              className="flex-1 rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted outline-none transition-colors focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20"
              autoComplete="off"
            />
            <button
              onClick={addPlayer}
              disabled={!inputValue.trim()}
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 disabled:opacity-40 disabled:hover:scale-100 disabled:cursor-not-allowed"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>

          {/* Rules preview */}
          <div className="rounded-xl border border-border bg-surface p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-3">
              Reglas del dado
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs text-muted">
              {[
                { n: 1, icon: Dice1, text: "Bebe quien lanzó" },
                { n: 2, icon: Dice2, text: "Bebe el de la derecha" },
                { n: 3, icon: Dice3, text: "Bebe el Triman 👑" },
                { n: 4, icon: Dice4, text: "Bebe el de la izquierda" },
                { n: 5, icon: Dice5, text: "Elige quién bebe" },
                { n: 6, icon: Dice6, text: "¡Beben TODOS!" },
              ].map(({ n, icon: Icon, text }) => (
                <div key={n} className="flex items-center gap-2 rounded-lg bg-background/50 px-3 py-2">
                  <Icon className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>{text}</span>
                </div>
              ))}
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
                      className="flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-muted transition-all hover:border-emerald-500/40 hover:text-foreground hover:bg-surface-hover"
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
            disabled={players.length < 3}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] hover:shadow-xl disabled:opacity-40 disabled:hover:scale-100 disabled:cursor-not-allowed"
          >
            Buscar al Triman
            <Dice3 className="h-4 w-4" />
          </button>
        </motion.div>
      </div>
    );
  }

  // ═══════════════════════════════════
  // FIND TRIMAN — roll until someone gets 3
  // ═══════════════════════════════════
  if (phase === "findTriman") {
    const foundTriman = searchDice === 3;

    return (
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full max-w-md flex flex-col items-center gap-8"
        >
          {/* Title */}
          <div className="text-center">
            <p className="text-xs font-medium uppercase tracking-widest text-emerald-400 mb-2">
              Buscando al Triman
            </p>
            <h2 className="text-xl font-extrabold sm:text-2xl">
              {foundTriman ? (
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  ¡{searchPlayer} es el Triman! 👑
                </span>
              ) : (
                <>
                  Turno de{" "}
                  <span className="text-emerald-400">{searchPlayer}</span>
                </>
              )}
            </h2>
            <p className="text-sm text-muted mt-1">
              {foundTriman
                ? "El juego va a empezar…"
                : "El primero en sacar un 3 será el Triman"}
            </p>
          </div>

          {/* Dice */}
          <div className="flex flex-col items-center gap-6">
            {searchDice ? (
              <motion.div
                key={searchDice}
                initial={{ rotate: -180, scale: 0.5 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <DiceFace value={searchDice} />
              </motion.div>
            ) : (
              <div className="flex h-28 w-28 items-center justify-center rounded-2xl border-2 border-dashed border-border sm:h-36 sm:w-36">
                <Dice3 className="h-10 w-10 text-muted" />
              </div>
            )}

            {foundTriman && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.3 }}
                className="flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-5 py-2 text-sm font-semibold text-emerald-400"
              >
                <Crown className="h-4 w-4" />
                {searchPlayer} es el Señor del 3
              </motion.div>
            )}
          </div>

          {/* Roll button */}
          {!foundTriman && (
            <button
              onClick={rollForTriman}
              disabled={isRolling}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] hover:shadow-xl disabled:opacity-60"
            >
              {isRolling ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 0.5 }}
                  >
                    <Dice3 className="h-5 w-5" />
                  </motion.div>
                  Lanzando…
                </>
              ) : (
                <>
                  <Dice3 className="h-5 w-5" />
                  Lanzar dado para {searchPlayer}
                </>
              )}
            </button>
          )}

          {/* Players circle */}
          <div className="flex gap-2 flex-wrap justify-center">
            {players.map((name) => (
              <span
                key={name}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-all ${
                  name === searchPlayer && foundTriman
                    ? "border-emerald-500/50 bg-emerald-500/15 text-emerald-400 shadow-lg shadow-emerald-500/10"
                    : name === searchPlayer
                    ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400"
                    : "border-border bg-surface text-muted"
                }`}
              >
                {name === trimanName && "👑 "}
                {name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  // ═══════════════════════════════════
  // CHOOSING — player rolls 5, choose who drinks
  // ═══════════════════════════════════
  if (phase === "choosing") {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md flex flex-col items-center gap-8"
        >
          {/* Dice showing 5 */}
          <DiceFace value={5} />

          <div className="text-center">
            <h2 className="text-xl font-extrabold sm:text-2xl">
              <span className="text-emerald-400">{currentPlayer}</span> elige
            </h2>
            <p className="text-sm text-muted mt-1">
              ¿Quién bebe? 🫵
            </p>
          </div>

          {/* Buttons for each other player */}
          <div className="w-full flex flex-col gap-2">
            {players
              .filter((_, i) => i !== turnIdx % players.length)
              .map((name) => (
                <button
                  key={name}
                  onClick={() => chooseDrinker(name)}
                  className="flex items-center justify-between rounded-xl border border-border bg-surface px-5 py-4 text-sm font-medium transition-all hover:border-emerald-500/40 hover:bg-surface-hover hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-500/10"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold">
                      {name.charAt(0).toUpperCase()}
                    </div>
                    {name}
                    {name === trimanName && (
                      <span className="text-xs text-amber-400">👑 Triman</span>
                    )}
                  </div>
                  <Beer className="h-4 w-4 text-muted" />
                </button>
              ))}
          </div>
        </motion.div>
      </div>
    );
  }

  // ═══════════════════════════════════
  // RESULT — show who drinks
  // ═══════════════════════════════════
  if (phase === "result" && ruleResult) {
    const isBebe6 = diceValue === 6;

    return (
      <div className="flex flex-1 flex-col items-center px-4 py-8 sm:py-12">
        {/* Triman badge */}
        <div className="w-full max-w-md mb-6">
          <div className="flex items-center justify-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5 text-xs font-medium text-emerald-400">
            <Crown className="h-3.5 w-3.5" />
            Triman: {trimanName}
          </div>
        </div>

        {/* Card */}
        <div className="perspective-1000 w-full max-w-md flex-1 flex items-center justify-center mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={`result-${turnIdx}-${diceValue}`}
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -90, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="preserve-3d w-full"
            >
              <div className="relative flex min-h-[320px] sm:min-h-[380px] flex-col items-center justify-center gap-6 rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-surface to-surface-hover p-8 shadow-2xl shadow-emerald-500/10">
                {/* Top accent */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-1 w-24 rounded-b-full bg-gradient-to-r from-emerald-500 to-teal-500" />

                {/* Dice */}
                <DiceFace value={diceValue!} />

                {/* Emoji */}
                <span className="text-4xl">{ruleResult.emoji}</span>

                {/* Who drinks */}
                <div className="text-center">
                  <p className="text-sm text-muted mb-1">
                    {currentPlayer} ha lanzado
                  </p>
                  <p className="text-lg font-bold leading-relaxed sm:text-xl">
                    {ruleResult.message}
                  </p>
                </div>

                {/* The drinker */}
                {!isBebe6 && ruleResult.who && (
                  <div className="flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-5 py-2 text-sm font-semibold text-red-400">
                    <Beer className="h-4 w-4" />
                    ¡{ruleResult.who} bebe!
                  </div>
                )}

                {isBebe6 && (
                  <div className="flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-5 py-2 text-sm font-semibold text-amber-400">
                    <Beer className="h-4 w-4" />
                    ¡Todos beben!
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Players */}
        <div className="w-full max-w-md mb-6 overflow-x-auto">
          <div className="flex gap-2 justify-center flex-wrap">
            {players.map((name) => {
              const isDrinker =
                isBebe6 ||
                name === ruleResult.who;
              return (
                <span
                  key={name}
                  className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                    isDrinker
                      ? "border-red-500/50 bg-red-500/10 text-red-400"
                      : name === currentPlayer
                      ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400"
                      : "border-border bg-surface text-muted"
                  }`}
                >
                  {name === trimanName && "👑 "}
                  {isDrinker && "🍺 "}
                  {name}
                </span>
              );
            })}
          </div>
        </div>

        {/* Next button */}
        <button
          onClick={nextTurn}
          className="w-full max-w-md flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] hover:shadow-xl"
        >
          Siguiente turno
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    );
  }

  // ═══════════════════════════════════
  // PLAYING — roll the dice
  // ═══════════════════════════════════
  return (
    <div className="flex flex-1 flex-col items-center px-4 py-8 sm:py-12">
      {/* Triman badge */}
      <div className="w-full max-w-md mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5 text-xs font-medium text-emerald-400">
            <Crown className="h-3.5 w-3.5" />
            Triman: {trimanName}
          </div>
          <div className="flex gap-2">
            <button
              onClick={newTriman}
              className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-muted transition-colors hover:bg-surface-hover"
            >
              <RotateCcw className="h-3 w-3 inline mr-1" />
              Nuevo Triman
            </button>
          </div>
        </div>
      </div>

      {/* Turn card */}
      <div className="flex flex-1 items-center justify-center w-full max-w-md mb-8">
        <motion.div
          key={`playing-${turnIdx}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full flex flex-col items-center gap-6"
        >
          {/* Player avatar */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30">
              <span className="text-2xl font-extrabold text-emerald-400">
                {currentPlayer.charAt(0).toUpperCase()}
              </span>
            </div>
            <h2 className="text-xl font-extrabold sm:text-2xl">
              Turno de{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                {currentPlayer}
              </span>
            </h2>
            {currentPlayer === trimanName && (
              <span className="flex items-center gap-1 text-xs text-amber-400">
                <Crown className="h-3.5 w-3.5" />
                ¡Es el Triman!
              </span>
            )}
          </div>

          {/* Dice placeholder or rolling */}
          <div className="my-4">
            {diceValue && !isRolling ? (
              <motion.div
                key={diceValue}
                initial={{ rotate: -180, scale: 0.5 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <DiceFace value={diceValue} />
              </motion.div>
            ) : isRolling && diceValue ? (
              <motion.div
                animate={{ rotate: [0, 15, -15, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 0.3 }}
              >
                <DiceFace value={diceValue} />
              </motion.div>
            ) : (
              <div className="flex h-28 w-28 items-center justify-center rounded-2xl border-2 border-dashed border-border sm:h-36 sm:w-36">
                <Dice3 className="h-10 w-10 text-muted" />
              </div>
            )}
          </div>

          {/* Roll button */}
          <button
            onClick={rollGameDice}
            disabled={isRolling}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] hover:shadow-xl disabled:opacity-60 w-full"
          >
            {isRolling ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 0.5 }}
                >
                  <Dice3 className="h-5 w-5" />
                </motion.div>
                Lanzando…
              </>
            ) : (
              <>
                <Dice3 className="h-5 w-5" />
                Lanzar dado
              </>
            )}
          </button>
        </motion.div>
      </div>

      {/* Players row */}
      <div className="w-full max-w-md overflow-x-auto">
        <div className="flex gap-2 justify-center flex-wrap">
          {players.map((name) => (
            <span
              key={name}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                name === currentPlayer
                  ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400"
                  : "border-border bg-surface text-muted"
              }`}
            >
              {name === trimanName && "👑 "}
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
