"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Plus, X, Users, RotateCcw, BookOpen, ChevronRight } from "lucide-react";
import { useApp } from "@/lib/AppContext";
import Confetti from "@/components/ui/Confetti";
import AdBanner from "@/components/ui/AdBanner";

const TOTAL_ROUNDS = 15;

type Phase = "setup" | "waiting" | "countdown" | "reveal" | "gameover";

export default function MedusaPage() {
  const { playSound, vibrateDevice, recentPlayers, savePlayersToRecent } = useApp();

  const [phase, setPhase] = useState<Phase>("setup");
  const [players, setPlayers] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [round, setRound] = useState(1);
  const [countdown, setCountdown] = useState(3);
  const [showMedusa, setShowMedusa] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Countdown effect
  useEffect(() => {
    if (phase !== "countdown") return;
    if (countdown <= 0) {
      const t = setTimeout(() => {
        setShowMedusa(true);
        playSound("drink");
        vibrateDevice("everyone");
        setTimeout(() => {
          setShowMedusa(false);
          setPhase("reveal");
        }, 1200);
      }, 400);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setCountdown((c) => c - 1), 900);
    return () => clearTimeout(t);
  }, [phase, countdown, playSound, vibrateDevice]);

  const addPlayer = useCallback(() => {
    const name = inputValue.trim();
    if (name && !players.includes(name)) {
      setPlayers((prev) => [...prev, name]);
      setInputValue("");
      playSound("click");
    }
  }, [inputValue, players, playSound]);

  const removePlayer = useCallback((name: string) => {
    setPlayers((prev) => prev.filter((p) => p !== name));
  }, []);

  const addRecentPlayer = useCallback((name: string) => {
    if (!players.includes(name)) {
      setPlayers((prev) => [...prev, name]);
      playSound("click");
    }
  }, [players, playSound]);

  const startGame = useCallback(() => {
    savePlayersToRecent(players);
    setRound(1);
    setPhase("waiting");
    playSound("success");
  }, [players, savePlayersToRecent, playSound]);

  const startCountdown = useCallback(() => {
    setCountdown(3);
    setPhase("countdown");
    playSound("flip");
  }, [playSound]);

  const nextRound = useCallback(() => {
    if (round >= TOTAL_ROUNDS) {
      setPhase("gameover");
      setShowConfetti(true);
      playSound("success");
    } else {
      setRound((r) => r + 1);
      setPhase("waiting");
      playSound("click");
    }
  }, [round, playSound]);

  const restartGame = useCallback(() => {
    setPhase("setup");
    setRound(1);
    setPlayers([]);
    setShowConfetti(false);
  }, []);

  const playAgain = useCallback(() => {
    setRound(1);
    setPhase("waiting");
    setShowConfetti(false);
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
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-lime-500 to-green-600 shadow-lg shadow-lime-500/25">
                <Eye className="h-7 w-7 text-white" />
              </div>
              <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Medusa</h1>
              <p className="text-sm text-muted max-w-xs">
                Todos miran abajo. A la de 3, mira a alguien. Si os cruzáis la mirada… ¡MEDUSA! A beber.
              </p>
              <Link href="/juegos/medusa/reglas" className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-surface-hover px-3 py-1 text-xs font-semibold text-accent transition-colors hover:bg-accent/10">
                <BookOpen className="h-3.5 w-3.5" />
                Ver cómo se juega
              </Link>
            </div>

            {/* Player input */}
            <div className="flex gap-2">
              <input
                id="medusa-player-input"
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
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-lime-500 to-green-600 text-white shadow-lg shadow-lime-500/25 transition-all hover:scale-105 disabled:opacity-40 disabled:hover:scale-100 disabled:cursor-not-allowed"
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
                    <button onClick={() => removePlayer(name)} className="flex h-7 w-7 items-center justify-center rounded-lg text-muted transition-colors hover:bg-red-500/10 hover:text-red-400">
                      <X className="h-4 w-4" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
              {players.length === 0 && (
                <div className="flex items-center justify-center rounded-xl border border-dashed border-border py-6 text-sm text-muted">
                  Sin jugadores — el juego funciona igual 😄
                </div>
              )}
            </div>

            {recentPlayers.filter((n) => !players.includes(n)).length > 0 && (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted">
                  Recientes
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentPlayers.filter((n) => !players.includes(n)).slice(0, 8).map((name) => (
                    <button key={name} onClick={() => addRecentPlayer(name)} className="flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-muted transition-all hover:border-accent/40 hover:text-foreground hover:bg-surface-hover">
                      <Plus className="h-3 w-3" />{name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={startGame}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-lime-500 to-green-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-lime-500/25 transition-all hover:scale-[1.02] hover:shadow-xl"
            >
              Empezar {TOTAL_ROUNDS} rondas <ChevronRight className="h-4 w-4" />
            </button>
          </motion.div>
        </div>

        {/* SEO Static Content Block for crawlers */}
        <div className="w-full bg-surface border-t border-border mt-auto py-12 px-4">
          <div className="mx-auto max-w-3xl prose prose-invert prose-p:text-muted max-w-none">
            <h2>Medusa: El Juego de las Miradas Asesinas</h2>
            <p>
              Adéntrate en la mitología y comprueba qué amigos son los más predecibles con el juego de beber <strong>Medusa</strong>. Este es un juego perfecto para calentar el ambiente antes de salir, no requiere cartas ni dados, y las únicas armas que necesitas son tus ojos y reflejos felinos.
            </p>
            <h3>Fase 1: El Descenso a los Infiernos</h3>
            <p>
              El juego transcurre en rondas. Al inicio, toda la mesa, sin excepciones, debe agachar la cabeza y mantener la vista fijada en sus zapatos (o en la pantalla de su teléfono si lo usan para llevar el control). Con nuestra aplicación, simplemente tendréis que escuchar la inquietante cuenta atrás y mantener los nervios a raya.
            </p>
            <h3>Fase 2: El Contacto Letal</h3>
            <p>
              A la cuenta de la máquina ("tres, dos, uno, <strong>¡MEDUSA!</strong>"), todos los participantes deben levantar bruscamente la cabeza y clavar la mirada fijamente en los ojos de otro jugador. Y aquí es donde ocurre la masacre:
            </p>
            <ul>
              <li><strong>Castigo directo:</strong> Si miras a un amigo y él está observando a otra persona (es decir, sus ojos no se cruzan contigo), te salvas. <em>Estás libre de petrificación.</em></li>
              <li><strong>Grito de castigo:</strong> Pero si levantas la vista y, por puro azar fatídico, ese amigo también decidió clavar la mirada en ti... se produce el temido Contacto Medusa. Ambos debéis gritar rápidamente <strong>¡MEDUSA!</strong> y tragar un shot o un buen trago de vuestra bebida.</li>
              <li>Si queréis añadir la regla del "Grito Tardío", revisa los detalles en el <Link href="/juegos/medusa/reglas" className="text-lime-500 underline">manual oficial de Medusa</Link>.</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // ── GAME OVER ──
  if (phase === "gameover") {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
        <Confetti active={showConfetti} />
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-6 text-center">
          <div className="text-6xl">👁️</div>
          <h2 className="text-2xl font-extrabold sm:text-3xl">¡{TOTAL_ROUNDS} rondas completadas!</h2>
          <p className="text-muted max-w-xs text-sm">Medusa os ha sometido. Esperemos que todos estéis de pie todavía. 🍺</p>
          <div className="flex gap-3">
            <button onClick={playAgain} className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-lime-500 to-green-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-lime-500/25 transition-all hover:scale-105">
              <Eye className="h-4 w-4" />Jugar otra vez
            </button>
            <button onClick={restartGame} className="flex items-center gap-2 rounded-xl border border-border bg-surface px-5 py-3 text-sm font-medium transition-all hover:bg-surface-hover">
              <RotateCcw className="h-4 w-4" />Cambiar jugadores
            </button>
          </div>
          <div className="mt-8 w-full"><AdBanner dataAdSlot="GAMEOVER_SLOT_ID" /></div>
        </motion.div>
      </div>
    );
  }

  // ── COUNTDOWN ──
  if (phase === "countdown") {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-4">
        <AnimatePresence mode="wait">
          {showMedusa ? (
            <motion.div
              key="medusa-flash"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1.1, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center gap-4 text-center"
            >
              <div className="text-8xl">👁️</div>
              <h2 className="text-4xl font-black text-lime-400 tracking-widest">¡MEDUSA!</h2>
            </motion.div>
          ) : (
            <motion.div
              key={countdown}
              initial={{ scale: 1.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center gap-6 text-center"
            >
              <p className="text-sm font-semibold uppercase tracking-widest text-muted">
                {countdown > 0 ? "¡Preparados!" : "¡MIRAD!"}
              </p>
              <div className="flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br from-lime-500 to-green-600 shadow-2xl shadow-lime-500/30">
                <span className="text-7xl font-black text-white">
                  {countdown > 0 ? countdown : "👆"}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // ── WAITING / REVEAL ──
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
      {/* Round progress */}
      <div className="w-full max-w-md mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-muted">Ronda {round} de {TOTAL_ROUNDS}</span>
          <span className="text-xs font-semibold text-lime-400">{Math.round((round / TOTAL_ROUNDS) * 100)}%</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-surface overflow-hidden">
          <motion.div className="h-full rounded-full bg-gradient-to-r from-lime-500 to-green-600" animate={{ width: `${(round / TOTAL_ROUNDS) * 100}%` }} transition={{ duration: 0.4 }} />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {phase === "waiting" ? (
          <motion.div
            key="waiting"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center gap-8 text-center w-full max-w-md"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="text-6xl">👇</div>
              <h2 className="text-2xl font-extrabold">¡Todos miren hacia abajo!</h2>
              <p className="text-sm text-muted max-w-xs">Cuando estéis listos, pulsa el botón para iniciar la cuenta atrás</p>
            </div>

            {players.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center">
                {players.map((name) => (
                  <span key={name} className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted">{name}</span>
                ))}
              </div>
            )}

            <button
              onClick={startCountdown}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-lime-500 to-green-600 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-lime-500/25 transition-all hover:scale-[1.02] hover:shadow-xl"
            >
              <Eye className="h-4 w-4" />¡Iniciar cuenta atrás!
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="reveal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center gap-8 text-center w-full max-w-md"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="text-5xl">🍺</div>
              <h2 className="text-2xl font-extrabold">¿Quién se ha mirado?</h2>
              <p className="text-sm text-muted max-w-xs">
                Si alguien ha hecho contacto visual… <strong className="text-lime-400">¡bebe!</strong><br />
                El último en gritar &quot;¡MEDUSA!&quot; bebe el doble 👀
              </p>
            </div>

            <button
              onClick={nextRound}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-lime-500 to-green-600 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-lime-500/25 transition-all hover:scale-[1.02] hover:shadow-xl"
            >
              {round < TOTAL_ROUNDS ? (
                <>Siguiente ronda <ChevronRight className="h-4 w-4" /></>
              ) : (
                <>Ver resultados <ChevronRight className="h-4 w-4" /></>
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
