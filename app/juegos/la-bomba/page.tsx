"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  Plus,
  X,
  Users,
  ChevronRight,
  RotateCcw,
  BookOpen,
  Clock,
} from "lucide-react";
import { useApp } from "@/lib/AppContext";
import Confetti from "@/components/ui/Confetti";


const TOTAL_RONDAS = 12;
const MIN_MS = 12000;
const MAX_MS = 40000;

type Phase = "setup" | "holding" | "exploded" | "gameover";

export default function LaBombaPage() {
  const { playSound, vibrateDevice, recentPlayers, savePlayersToRecent } =
    useApp();

  const [phase, setPhase] = useState<Phase>("setup");
  const [players, setPlayers] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [ronda, setRonda] = useState(1);
  const [currentPlayerIdx, setCurrentPlayerIdx] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [loserName, setLoserName] = useState("");
  const [pulse, setPulse] = useState(false);

  // Secret countdown — players don't see the timer
  useEffect(() => {
    if (phase !== "holding") return;
    const duration =
      Math.floor(Math.random() * (MAX_MS - MIN_MS)) + MIN_MS;
    const timer = setTimeout(() => {
      const loser =
        players.length > 0 ? players[currentPlayerIdx] : "¡El que la tenga!";
      setLoserName(loser);
      setPhase("exploded");
      playSound("drink");
      vibrateDevice("everyone");
    }, duration);

    // Pulse animation every second to build tension (but no number shown)
    const pulseInterval = setInterval(() => setPulse((p) => !p), 800);

    return () => {
      clearTimeout(timer);
      clearInterval(pulseInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, ronda]); // re-run each round

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
    savePlayersToRecent(players);
    setRonda(1);
    setCurrentPlayerIdx(0);
    setPhase("holding");
    playSound("success");
  }, [players, savePlayersToRecent, playSound]);

  const pasarBomba = useCallback(() => {
    if (players.length === 0) return;
    playSound("click");
    vibrateDevice("click");
    setCurrentPlayerIdx((prev) => (prev + 1) % players.length);
  }, [players.length, playSound, vibrateDevice]);

  const nextRound = useCallback(() => {
    if (ronda >= TOTAL_RONDAS) {
      setPhase("gameover");
      setShowConfetti(true);
      playSound("success");
    } else {
      setRonda((r) => r + 1);
      setCurrentPlayerIdx((prev) =>
        players.length > 0 ? (prev + 1) % players.length : 0
      );
      setPhase("holding");
      playSound("flip");
    }
  }, [ronda, players.length, playSound]);

  const restartGame = useCallback(() => {
    setPhase("setup");
    setRonda(1);
    setCurrentPlayerIdx(0);
    setShowConfetti(false);
    setLoserName("");
  }, []);

  const playAgain = useCallback(() => {
    setRonda(1);
    setCurrentPlayerIdx(0);
    setShowConfetti(false);
    setLoserName("");
    setPhase("holding");
    playSound("success");
  }, [playSound]);

  // ── SETUP ──
  if (phase === "setup") {
    return (
      <div className="flex flex-1 flex-col w-full">
        <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md flex flex-col gap-8"
          >
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 shadow-lg shadow-orange-500/25">
                <Zap className="h-7 w-7 text-white" />
              </div>
              <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                La Bomba
              </h1>
              <p className="text-sm text-muted max-w-xs">
                La bomba tiene un temporizador secreto. Pásala antes de que
                explote. ¡El que la tenga cuando explote bebe!
              </p>
              <Link
                href="/juegos/la-bomba/reglas"
                className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-surface-hover px-3 py-1 text-xs font-semibold text-accent transition-colors hover:bg-accent/10"
              >
                <BookOpen className="h-3.5 w-3.5" />
                Ver cómo se juega
              </Link>
            </div>

            <div className="flex gap-2">
              <input
                id="bomba-player-input"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addPlayer()}
                placeholder="Nombre del jugador… (opcional)"
                className="flex-1 rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted outline-none transition-colors focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
                autoComplete="off"
              />
              <button
                onClick={addPlayer}
                disabled={!inputValue.trim()}
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/25 transition-all hover:scale-105 disabled:opacity-40 disabled:hover:scale-100 disabled:cursor-not-allowed"
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
                <div className="flex items-center justify-center rounded-xl border border-dashed border-border py-6 text-sm text-muted">
                  Sin jugadores — funciona igual 💣
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
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition-all hover:scale-[1.02] hover:shadow-xl"
            >
              Encender la mecha 💣 <ChevronRight className="h-4 w-4" />
            </button>
          </motion.div>
        </div>

        {/* SEO Static Content Block for crawlers */}
        <div className="w-full bg-surface border-t border-border mt-auto py-12 px-4">
          <div className="mx-auto max-w-3xl prose prose-invert prose-p:text-muted max-w-none">
            <h2>La Bomba: El Juego de Beber de la Patata Caliente</h2>
            <p>
              Basado en el clásico juego infantil de la patata caliente, <strong>La Bomba</strong> añade un elemento devastador: nadie sabe cuándo va a explotar. El temporizador es completamente secreto, lo que convierte cada segundo en tensión pura.
            </p>
            <p>
              Una vez encendida la mecha, la bomba empieza a latir. El algoritmo elige un tiempo de detonación aleatorio: puede explotar a los 12 segundos o aguantar hasta los 40. Tu trabajo es pasársela al siguiente jugador lo más rápido posible.
            </p>

            <h3>Modos de juego</h3>
            <ul>
              <li><strong>Modo libre:</strong> Pasad el móvil físicamente de mano en mano. Sin botones, sin trampa. El pánico es real.</li>
              <li><strong>Modo con nombres:</strong> Introduce los jugadores y la app controla los turnos automáticamente. Pulsa el botón para pasar la bomba al siguiente.</li>
              <li><strong>Categoría Explosiva:</strong> Antes de pasar, cada uno debe decir una palabra de una categoría elegida (ej. marcas de coches, países, nombres). Si te quedas en blanco, la bomba te explota en la cara.</li>
            </ul>

            <h3>Preguntas frecuentes</h3>
            <p><strong>¿Cuántos jugadores hacen falta?</strong> Con 3 ya funciona, pero con 5 o más el caos se dispara. Cuanta más gente, más incertidumbre sobre quién va a tener la bomba cuando explote.</p>
            <p><strong>¿La bomba siempre explota en el mismo tiempo?</strong> No. Cada ronda tiene un tiempo diferente y completamente aleatorio entre 12 y 40 segundos. Nadie puede predecirlo.</p>
            <p><strong>¿Qué pasa si la bomba explota en el traspaso?</strong> Si explota justo cuando la estás pasando, el que la envía bebe. En caso de duda, el que la tenía en la mano pierde.</p>

            <h3>Juegos de tensión que también te gustarán</h3>
            <ul>
              <li><Link href="/juegos/medusa" className="text-orange-500 underline">Medusa</Link> — Miradas cruzadas = beber. Sin temporizador, pero igual de tenso.</li>
              <li><Link href="/juegos/ring-of-fire" className="text-orange-500 underline">Ring of Fire</Link> — Roba cartas y cumple sus reglas. El 4º Rey paga el precio máximo.</li>
              <li><Link href="/juegos/triman" className="text-orange-500 underline">Triman</Link> — El dado manda. El Señor del 3 reparte castigos sin piedad.</li>
            </ul>
            <p>Consulta el <Link href="/juegos/la-bomba/reglas" className="text-orange-500 underline">manual de La Bomba</Link> para todas las reglas y variantes avanzadas.</p>
          </div>
        </div>
      </div>
    );
  }

  // ── EXPLOSION ──
  if (phase === "exploded") {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
        <motion.div
          initial={{ scale: 0.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="flex flex-col items-center gap-6 text-center"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.4, repeat: 3 }}
            className="text-8xl"
          >
            💥
          </motion.div>
          <h2 className="text-4xl font-black text-orange-400">¡BOOM!</h2>
          <div className="rounded-2xl border border-orange-500/30 bg-orange-500/10 px-6 py-4">
            <p className="text-lg font-bold">{loserName}</p>
            <p className="text-sm text-muted mt-1">¡Fondo blanco! 🍺</p>
          </div>
          <p className="text-xs text-muted">
            Ronda {ronda} de {TOTAL_RONDAS}
          </p>
          <button
            onClick={nextRound}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition-all hover:scale-[1.02]"
          >
            {ronda < TOTAL_RONDAS ? (
              <>
                Siguiente ronda <ChevronRight className="h-4 w-4" />
              </>
            ) : (
              <>
                Ver resultados <ChevronRight className="h-4 w-4" />
              </>
            )}
          </button>
        </motion.div>
      </div>
    );
  }

  // ── GAME OVER ──
  if (phase === "gameover") {
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
            ¡{TOTAL_RONDAS} rondas completadas!
          </h2>
          <p className="text-muted max-w-xs text-sm">
            La mecha se ha apagado. Esperemos que aún todos estéis de pie. 💣
          </p>
          <div className="flex gap-3">
            <button
              onClick={playAgain}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition-all hover:scale-105"
            >
              <Zap className="h-4 w-4" />
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

        </motion.div>
      </div>
    );
  }

  // ── HOLDING (main game) ──
  const currentName =
    players.length > 0 ? players[currentPlayerIdx] : null;

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-8">
      {/* Round progress */}
      <div className="w-full max-w-md mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-muted">
            Ronda {ronda} de {TOTAL_RONDAS}
          </span>
          <span className="text-xs font-semibold text-orange-400">
            {Math.round((ronda / TOTAL_RONDAS) * 100)}%
          </span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-surface overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-orange-500 to-red-500"
            animate={{ width: `${(ronda / TOTAL_RONDAS) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      {/* Bomb */}
      <div className="flex flex-1 flex-col items-center justify-center gap-8 w-full max-w-md">
        <motion.div
          animate={{
            scale: pulse ? 1.08 : 1,
            boxShadow: pulse
              ? "0 0 60px rgba(249,115,22,0.5)"
              : "0 0 20px rgba(249,115,22,0.2)",
          }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center justify-center h-44 w-44 rounded-full bg-gradient-to-br from-orange-500 to-red-600 cursor-default select-none"
        >
          <span className="text-7xl">💣</span>
        </motion.div>

        {currentName && (
          <div className="text-center">
            <p className="text-xs uppercase tracking-widest text-muted mb-1">
              La tiene
            </p>
            <p className="text-2xl font-black text-orange-400">{currentName}</p>
          </div>
        )}

        <p className="text-xs text-muted text-center max-w-xs">
          El temporizador es secreto. ¡Pásala rápido!
        </p>

        {/* Pass button (only with named players) */}
        {players.length > 1 && (
          <button
            onClick={pasarBomba}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-6 py-4 text-base font-bold text-white shadow-lg shadow-orange-500/25 transition-all hover:scale-[1.02] active:scale-95"
          >
            💣 ¡PASAR BOMBA!
          </button>
        )}

        {players.length <= 1 && (
          <p className="text-sm text-muted text-center">
            Pasad el móvil de mano en mano físicamente
          </p>
        )}
      </div>
    </div>
  );
}
