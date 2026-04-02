"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wine,
  Plus,
  X,
  Users,
  ChevronRight,
  RotateCcw,
  Shuffle,
  Clock,
} from "lucide-react";
import { useApp } from "@/lib/AppContext";
import Confetti from "@/components/ui/Confetti";

// ───── 40 preguntas "Yo Nunca" ─────
const PREGUNTAS: string[] = [
  "Yo nunca he besado a alguien en la primera cita",
  "Yo nunca he enviado un mensaje al grupo equivocado",
  "Yo nunca me he colado en una fiesta",
  "Yo nunca he fingido estar enfermo para no ir a trabajar",
  "Yo nunca he llorado con una película de Disney",
  "Yo nunca he stalkeado a mi ex en redes sociales",
  "Yo nunca he bebido tanto que no recuerde nada",
  "Yo nunca he mentido sobre mi edad",
  "Yo nunca me he enamorado de alguien que no debía",
  "Yo nunca he cantado en la ducha a todo volumen",
  "Yo nunca he hecho ghosting a alguien",
  "Yo nunca he roto algo en casa ajena y no dicho nada",
  "Yo nunca he bailado solo/a frente al espejo",
  "Yo nunca me he despertado en un lugar sin saber cómo llegué",
  "Yo nunca he enviado una foto comprometedora",
  "Yo nunca he comido algo del suelo",
  "Yo nunca he fingido que me gustaba un regalo",
  "Yo nunca he copiado en un examen",
  "Yo nunca he besado a más de una persona en la misma noche",
  "Yo nunca me he quedado dormido/a en clase o en el trabajo",
  "Yo nunca he dicho 'te quiero' sin sentirlo",
  "Yo nunca he hecho algo ilegal estando borracho/a",
  "Yo nunca he mentido en una entrevista de trabajo",
  "Yo nunca he tenido una fantasía con alguien de este grupo",
  "Yo nunca he ligado con alguien solo por aburrimiento",
  "Yo nunca he llorado por una canción",
  "Yo nunca me he arrepentido de un tatuaje",
  "Yo nunca he mandado un audio largo llorando",
  "Yo nunca he salido de casa sin ropa interior",
  "Yo nunca he fingido un orgasmo",
  "Yo nunca he robado algo de un supermercado",
  "Yo nunca me he escapado de un bar sin pagar",
  "Yo nunca he vuelto con un/una ex",
  "Yo nunca he mantenido una relación en secreto",
  "Yo nunca he llamado borracho/a a mi ex",
  "Yo nunca he hecho algo por un reto que me arrepiento",
  "Yo nunca he dicho que estaba bien cuando no lo estaba",
  "Yo nunca he tenido una resaca de más de un día",
  "Yo nunca he mandado un mensaje borracho/a del que me arrepentí",
  "Yo nunca he besado a alguien del mismo sexo",
];

// ───── Shuffle helper ─────
function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// ───── Component ─────
export default function YoNuncaPage() {
  const { playSound, vibrateDevice, recentPlayers, savePlayersToRecent } = useApp();

  // Phase: "setup" or "playing"
  const [phase, setPhase] = useState<"setup" | "playing">("setup");
  const [showConfetti, setShowConfetti] = useState(false);

  // Setup state
  const [players, setPlayers] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  // Game state
  const [questions, setQuestions] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  // ── Setup handlers ──
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

  const startGame = useCallback(() => {
    setQuestions(shuffleArray(PREGUNTAS));
    setCurrentIndex(0);
    setPhase("playing");
    savePlayersToRecent(players);
    playSound("success");
    vibrateDevice("click");
  }, [players, savePlayersToRecent, playSound, vibrateDevice]);

  // ── Game handlers ──
  const nextQuestion = useCallback(() => {
    if (isFlipping) return;
    setIsFlipping(true);
    playSound("flip");
    vibrateDevice("flip");
    // Small delay for flip-out, then flip-in with new question
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

  const reshuffleAndRestart = useCallback(() => {
    setQuestions(shuffleArray(PREGUNTAS));
    setCurrentIndex(0);
  }, []);

  const isGameOver = currentIndex >= questions.length;
  const progress = questions.length
    ? Math.round(((currentIndex + 1) / questions.length) * 100)
    : 0;

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
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/25">
              <Wine className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              Yo Nunca
            </h1>
            <p className="text-sm text-muted max-w-xs">
              Añade al menos 2 jugadores para empezar. Las preguntas se
              barajarán automáticamente.
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
              className="flex-1 rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted outline-none transition-colors focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
              autoComplete="off"
            />
            <button
              onClick={addPlayer}
              disabled={!inputValue.trim()}
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-secondary text-white shadow-lg shadow-accent-glow transition-all hover:scale-105 disabled:opacity-40 disabled:hover:scale-100 disabled:cursor-not-allowed"
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
                      className="flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-muted transition-all hover:border-accent/40 hover:text-foreground hover:bg-surface-hover"
                    >
                      <Plus className="h-3 w-3" />
                      {name}
                    </button>
                  ))}
              </div>
            </div>
          )}

          {/* Start button */}
          <button
            onClick={startGame}
            disabled={players.length < 2}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent-secondary px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-accent-glow transition-all hover:scale-[1.02] hover:shadow-xl disabled:opacity-40 disabled:hover:scale-100 disabled:cursor-not-allowed"
          >
            Empezar a jugar
            <ChevronRight className="h-4 w-4" />
          </button>
        </motion.div>
      </div>
    );
  }

  // ═══════════════════════════════════
  // GAME OVER SCREEN
  // ═══════════════════════════════════
  if (isGameOver) {
    // Trigger confetti once
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
          <div className="text-6xl">🎉</div>
          <h2 className="text-2xl font-extrabold sm:text-3xl">
            ¡Se acabaron las preguntas!
          </h2>
          <p className="text-muted max-w-xs text-sm">
            Habéis sobrevivido a las {questions.length} preguntas. ¿Otra ronda?
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => { reshuffleAndRestart(); setShowConfetti(false); }}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent-secondary px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-accent-glow transition-all hover:scale-105"
            >
              <Shuffle className="h-4 w-4" />
              Jugar otra vez
            </button>
            <button
              onClick={() => { restartGame(); setShowConfetti(false); }}
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

  // ═══════════════════════════════════
  // PLAYING SCREEN
  // ═══════════════════════════════════
  return (
    <div className="flex flex-1 flex-col items-center px-4 py-8 sm:py-12">
      {/* Top bar: counter + progress */}
      <div className="w-full max-w-md mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-muted">
            Pregunta {currentIndex + 1} de {questions.length}
          </span>
          <span className="text-xs font-semibold text-accent">{progress}%</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-surface overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-accent to-accent-secondary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Card with flip animation */}
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
            <div className="relative flex min-h-[280px] sm:min-h-[340px] flex-col items-center justify-center gap-6 rounded-3xl border border-border bg-gradient-to-br from-surface to-surface-hover p-8 shadow-2xl shadow-accent-glow/10">
              {/* Decorative top accent */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 h-1 w-24 rounded-b-full bg-gradient-to-r from-accent to-accent-secondary" />

              {/* Wine icon */}
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                <Wine className="h-6 w-6 text-accent" />
              </div>

              {/* Question text */}
              <p className="text-center text-lg font-semibold leading-relaxed sm:text-xl">
                {questions[currentIndex]}
              </p>

              {/* Subtle hint */}
              <p className="text-xs text-muted">
                Los que sí lo hayan hecho… ¡beben! 🍺
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Players row (scrollable) */}
      <div className="w-full max-w-md mb-6 overflow-x-auto">
        <div className="flex gap-2 justify-center flex-wrap">
          {players.map((name, i) => (
            <span
              key={name}
              className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted"
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      {/* Next button */}
      <button
        onClick={nextQuestion}
        disabled={isFlipping}
        className="w-full max-w-md flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent-secondary px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-accent-glow transition-all hover:scale-[1.02] hover:shadow-xl disabled:opacity-60"
      >
        {currentIndex < questions.length - 1 ? (
          <>
            Siguiente pregunta
            <ChevronRight className="h-4 w-4" />
          </>
        ) : (
          <>
            Ver resultados
            <ChevronRight className="h-4 w-4" />
          </>
        )}
      </button>
    </div>
  );
}
