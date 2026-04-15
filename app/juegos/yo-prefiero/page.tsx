"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Scale, Plus, X, Users, ChevronRight, RotateCcw, Shuffle, Clock, BookOpen } from "lucide-react";
import { useApp } from "@/lib/AppContext";
import Confetti from "@/components/ui/Confetti";
import IntensitySelector from "@/components/ui/IntensitySelector";
import type { Intensidad } from "@/lib/data/yo-nunca";
import type { PreguntaYoPrefiero } from "@/lib/data/yo-prefiero";
import AdBanner from "@/components/ui/AdBanner";

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function YoPrefieroPage() {
  const { playSound, vibrateDevice, recentPlayers, savePlayersToRecent } = useApp();

  const [phase, setPhase] = useState<"setup" | "playing">("setup");
  const [showConfetti, setShowConfetti] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [players, setPlayers] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [niveles, setNiveles] = useState<Intensidad[]>(["normal"]);

  const [questions, setQuestions] = useState<PreguntaYoPrefiero[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  const addPlayer = useCallback(() => {
    const name = inputValue.trim();
    if (name && !players.includes(name)) {
      setPlayers((prev) => [...prev, name]);
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
    setPlayers((prev) => prev.filter((p) => p !== name));
  }, []);

  const startGame = useCallback(async () => {
    setIsLoading(true);
    try {
      const { filtrarPorIntensidad } = await import("@/lib/data/yo-prefiero");
      const filtered = filtrarPorIntensidad(niveles);
      setQuestions(shuffleArray(filtered));
      setCurrentIndex(0);
      setPhase("playing");
      savePlayersToRecent(players);
      playSound("success");
      vibrateDevice("click");
    } finally {
      setIsLoading(false);
    }
  }, [players, niveles, savePlayersToRecent, playSound, vibrateDevice]);

  const nextQuestion = useCallback(() => {
    if (isFlipping) return;
    setIsFlipping(true);
    playSound("flip");
    vibrateDevice("flip");
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setIsFlipping(false);
    }, 300);
  }, [isFlipping, playSound, vibrateDevice]);

  const restartGame = useCallback(() => {
    setPhase("setup");
    setPlayers([]);
    setCurrentIndex(0);
  }, []);

  const reshuffleAndRestart = useCallback(async () => {
    setIsLoading(true);
    try {
      const { filtrarPorIntensidad } = await import("@/lib/data/yo-prefiero");
      const filtered = filtrarPorIntensidad(niveles);
      setQuestions(shuffleArray(filtered));
      setCurrentIndex(0);
    } finally {
      setIsLoading(false);
    }
  }, [niveles]);

  const isGameOver = currentIndex >= questions.length && questions.length > 0;
  const progress = questions.length ? Math.round(((currentIndex + 1) / questions.length) * 100) : 0;
  const currentQuestion = questions[currentIndex];

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
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-lg shadow-violet-500/25">
                <Scale className="h-7 w-7 text-white" />
              </div>
              <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Yo Prefiero</h1>
              <p className="text-sm text-muted max-w-xs">
                A o B, sin excusas. El grupo elige y la minoría bebe.
              </p>
              <Link href="/juegos/yo-prefiero/reglas" className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-surface-hover px-3 py-1 text-xs font-semibold text-accent transition-colors hover:bg-accent/10">
                <BookOpen className="h-3.5 w-3.5" />
                Ver cómo se juega
              </Link>
            </div>

            <IntensitySelector selected={niveles} onChange={setNiveles} />

            <div className="flex gap-2">
              <input
                id="player-input"
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
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/25 transition-all hover:scale-105 disabled:opacity-40 disabled:hover:scale-100 disabled:cursor-not-allowed"
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
              disabled={players.length < 2 || isLoading}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:scale-[1.02] hover:shadow-xl disabled:opacity-40 disabled:hover:scale-100 disabled:cursor-not-allowed"
            >
              {isLoading ? "Cargando..." : "Empezar a jugar"}
              {!isLoading && <ChevronRight className="h-4 w-4" />}
            </button>
          </motion.div>
        </div>

        {/* SEO Static Content Block for crawlers */}
        <div className="w-full bg-surface border-t border-border mt-auto py-12 px-4">
          <div className="mx-auto max-w-3xl prose prose-invert prose-p:text-muted max-w-none">
            <h2>Yo Prefiero (Would You Rather): Versión para Beber</h2>
            <p>
              Bienvenido al juego de los dilemas morales e incómodos. <strong>Yo Prefiero (Would You Rather en inglés)</strong> te obligará a elegir entre dos opciones igualmente terribles o absurdas. Es el juego de beber definitivo para descubrir cómo funcionan las mentes retorcidas de tus amigos.
            </p>
            <h3>Cómo Funciona la Mayoría Manda</h3>
            <p>
              La dinámica es súper sencilla: La pantalla mostrará dos opciones, A y B. A la cuenta de tres, todos los jugadores deben señalar qué opción prefieren, levantar la mano izquierda o derecha, o simplemente gritar "A" o "B".
            </p>
            <p>
              <strong>La regla de oro:</strong> Una vez contados los votos, el grupo que haya quedado en minoria (es decir, la opción menos votada) recibe un castigo implacable y debe beber su vaso. En caso de empate técnico, los dioses del alcohol deciden que absolutamente todos beben.
            </p>
            <h3>Escoge tu Nivel de Intensidad</h3>
            <ul>
              <li><strong>Modo Tranquilo:</strong> Dilemas genéricos sobre viajes, poderes mágicos o comidas extrañas. Perfecto para jugar con compañeros de trabajo o familiares.</li>
              <li><strong>Modo Picante (+18):</strong> Aquí entramos en terreno peligroso. Preguntas personales, situaciones íntimas asquerosas o dilemas éticos oscuros reservados solo para los amigos más cercanos (¡o para romper el hielo a lo bestia en Tinder!).</li>
              <li>Lee en detalle los mejores <Link href="/juegos/yo-prefiero/reglas" className="text-violet-500 underline">castigos y versiones de Yo Prefiero (Would You Rather)</Link> para sacarle todo el jugo al modo Picante.</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // ── GAME OVER ──
  if (isGameOver) {
    if (!showConfetti) {
      setShowConfetti(true);
      playSound("success");
      vibrateDevice("everyone");
    }
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
        <Confetti active={showConfetti} />
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-6 text-center">
          <div className="text-6xl">🎉</div>
          <h2 className="text-2xl font-extrabold sm:text-3xl">¡Se acabaron los dilemas!</h2>
          <p className="text-muted max-w-xs text-sm">Habéis superado las {questions.length} preguntas. ¿Otra ronda?</p>
          <div className="flex gap-3">
            <button onClick={() => { reshuffleAndRestart().then(() => setShowConfetti(false)); }} disabled={isLoading} className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:scale-105 disabled:opacity-50">
              <Shuffle className="h-4 w-4" />
              {isLoading ? "Cargando..." : "Jugar otra vez"}
            </button>
            <button onClick={() => { restartGame(); setShowConfetti(false); }} className="flex items-center gap-2 rounded-xl border border-border bg-surface px-5 py-3 text-sm font-medium transition-all hover:bg-surface-hover">
              <RotateCcw className="h-4 w-4" />Cambiar jugadores
            </button>
          </div>
          <div className="mt-8 w-full"><AdBanner dataAdSlot="GAMEOVER_SLOT_ID" /></div>
        </motion.div>
      </div>
    );
  }

  // ── PLAYING ──
  return (
    <div className="flex flex-1 flex-col items-center px-4 py-8 sm:py-12">
      <div className="w-full max-w-md mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-muted">Pregunta {currentIndex + 1} de {questions.length}</span>
          <span className="text-xs font-semibold text-violet-400">{progress}%</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-surface overflow-hidden">
          <motion.div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.4, ease: "easeOut" }} />
        </div>
      </div>

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
            <div className="relative flex flex-col gap-5 rounded-3xl border border-border bg-gradient-to-br from-surface to-surface-hover p-6 shadow-2xl shadow-violet-500/10">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 h-1 w-24 rounded-b-full bg-gradient-to-r from-violet-500 to-fuchsia-500" />
              <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted pt-2">¿Preferirías...?</p>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col items-center gap-2 rounded-2xl border border-violet-500/25 bg-violet-500/8 p-4 text-center min-h-[100px] justify-center">
                  <span className="text-xs font-bold text-violet-400 uppercase tracking-wider">A</span>
                  <p className="text-sm font-semibold leading-snug">{currentQuestion?.opcionA}</p>
                </div>
                <div className="flex flex-col items-center gap-2 rounded-2xl border border-fuchsia-500/25 bg-fuchsia-500/8 p-4 text-center min-h-[100px] justify-center">
                  <span className="text-xs font-bold text-fuchsia-400 uppercase tracking-wider">B</span>
                  <p className="text-sm font-semibold leading-snug">{currentQuestion?.opcionB}</p>
                </div>
              </div>

              <p className="text-center text-xs text-muted">La minoría… ¡bebe! 🍺</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="w-full max-w-md mb-6 overflow-x-auto">
        <div className="flex gap-2 justify-center flex-wrap">
          {players.map((name) => (
            <span key={name} className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted">{name}</span>
          ))}
        </div>
      </div>

      {currentIndex > 0 && currentIndex % 6 === 0 && (
        <div className="w-full max-w-md mb-6"><AdBanner dataAdSlot="IN_GAME_SLOT_ID" /></div>
      )}

      <button
        onClick={nextQuestion}
        disabled={isFlipping}
        className="w-full max-w-md flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:scale-[1.02] hover:shadow-xl disabled:opacity-60"
      >
        {currentIndex < questions.length - 1 ? (
          <>Siguiente dilema <ChevronRight className="h-4 w-4" /></>
        ) : (
          <>Ver resultados <ChevronRight className="h-4 w-4" /></>
        )}
      </button>
    </div>
  );
}
