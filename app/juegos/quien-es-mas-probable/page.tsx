"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  ChevronRight,
  RotateCcw,
  Hand,
  Beer,
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

type Phase = "setup" | "playing" | "gameover";

export default function QuienEsMasProbablePage() {
  const { playSound, vibrateDevice } = useApp();

  const [phase, setPhase] = useState<Phase>("setup");
  const [showConfetti, setShowConfetti] = useState(false);
  const [niveles, setNiveles] = useState<Intensidad[]>(["normal"]);
  const [isLoading, setIsLoading] = useState(false);

  // Game state
  const [questions, setQuestions] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  const startGame = useCallback(async () => {
    setIsLoading(true);
    try {
      const { filtrarQEMP } = await import("@/lib/data/quien-es-mas-probable");
      const qs = filtrarQEMP(niveles).map(p => p.texto);
      setQuestions(shuffleArray(qs));
      setCurrentIndex(0);
      setPhase("playing");
      setShowConfetti(false);
      playSound("success");
      vibrateDevice("click");
    } finally {
      setIsLoading(false);
    }
  }, [niveles, playSound, vibrateDevice]);

  // ── Game handlers ──
  const nextQuestion = useCallback(() => {
    if (isFlipping) return;
    
    if (currentIndex >= questions.length - 1) {
      setPhase("gameover");
      return;
    }

    setIsFlipping(true);
    playSound("flip");
    vibrateDevice("flip");
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setIsFlipping(false);
    }, 300);
  }, [isFlipping, currentIndex, questions.length, playSound, vibrateDevice]);

  const restartGame = useCallback(() => {
    setPhase("setup");
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
      <div className="flex flex-1 flex-col w-full">
        <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md flex flex-col gap-8"
          >
            {/* Header */}
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/25">
                <Hand className="h-7 w-7 text-white" />
              </div>
              <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                Quién Es Más Probable
              </h1>
              <p className="text-sm text-muted max-w-xs">
                Lee la tarjeta, cuenta hasta 3 y señalad todos a la vez. ¡El que tenga más dedos apuntándole, bebe!
              </p>
              <Link href="/juegos/quien-es-mas-probable/reglas" className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-surface-hover px-3 py-1 text-xs font-semibold text-cyan-400 transition-colors hover:bg-cyan-500/10">
                <BookOpen className="h-3.5 w-3.5" />
                Ver cómo se juega
              </Link>
            </div>

            <IntensitySelector selected={niveles} onChange={setNiveles} />

            {/* Start */}
            <button
              onClick={startGame}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02] hover:shadow-xl disabled:opacity-50"
            >
              {isLoading ? "Cargando..." : "Empezar el juego"}
              {!isLoading && <ChevronRight className="h-4 w-4" />}
            </button>
          </motion.div>
        </div>

        {/* SEO Static Content Block for crawlers */}
        <div className="w-full bg-surface border-t border-border mt-auto py-12 px-4">
          <div className="mx-auto max-w-3xl prose prose-invert prose-p:text-muted max-w-none">
            <h2>Quién es más probable a... (El Juego de los Señalamientos)</h2>
            <p>
              También mundialmente conocido en fiestas anglosajonas como <em>"Most Likely To"</em> o el <em>Juego del Dedo</em>, esta dinámica nació con un único y perturbador objetivo: descubrir exactamente qué prejuicios tienen tus amigos sobre ti. Olvídate de los cumplidos, aquí se viene a juzgar y a ser juzgado sin ningún tipo de piedad.
            </p>
            <h3>El Funcionamiento de las Votaciones</h3>
            <p>
              La mecánica es ridículamente sencilla, por eso es el juego perfecto para jugar cuando la noche ya está avanzada y no apetece pensar en reglas complejas. La pantalla dictará una premisa escandalosa o muy específica (por ejemplo, <em>"¿Quién es más probable que termine uniéndose a una secta?"</em>). El grupo entero deberá meditar en silencio rotundo.
            </p>
            <p>
              Tras tres o cinco segundos de tensión mirando las caras de los demás, deberéis exclamar: <strong>¡Uno, dos y tres!</strong>. En ese preciso milisegundo, toda la mesa debe extender su brazo y apuntar con el dedo a la persona que consideran más probable de llevar a cabo lo narrado en la tarjeta.
            </p>
            <h3>Matemáticas Básicas del Castigo</h3>
            <ul>
              <li><strong>Castigo directo:</strong> Cada dedo que te esté apuntando equivale, de forma irrevocable, a un trago de tu bebida. Si sois un grupo de 8 personas y hay 7 dedos apuntando a tu cara, tendrás que dar 7 largos tragos.</li>
              <li><strong>Diferentes Intensidades:</strong> Al igual que muchos de nuestros otros títulos en BeberGames, este juego dispone de varios selectores de intensidad. Te sugerimos empezar en <em>Suave</em> o <em>Normal</em> para evitar herir sensibilidades demasiado pronto.</li>
              <li>Tienes todas las mecánicas, consejos y un modo "Supervivencia Extrema" explicados en las <Link href="/juegos/quien-es-mas-probable/reglas" className="text-cyan-500 underline">Reglas de Quién Es Más Probable</Link>.</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════
  // GAME OVER
  // ═══════════════════════════════════
  if (phase === "gameover" || isGameOver) {
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
          <div className="text-6xl">🤕</div>
          <h2 className="text-2xl font-extrabold sm:text-3xl">
            ¡Se acabaron las preguntas!
          </h2>
          <p className="text-muted max-w-xs text-sm">
            Creo que ya ha quedado claro qué opina el grupo de cada uno.
          </p>
          <button
            onClick={restartGame}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all hover:scale-105"
          >
            <RotateCcw className="h-4 w-4" />
            Volver a jugar
          </button>
          
          <div className="mt-8 w-full">
            <AdBanner dataAdSlot="GAMEOVER_SLOT_ID" />
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
      {/* Progress */}
      <div className="w-full max-w-md mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-muted">
            Pregunta {currentIndex + 1} de {questions.length}
          </span>
          <span className="text-xs font-semibold text-cyan-400">{progress}%</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-surface overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Card */}
      <div className="perspective-1000 w-full max-w-md flex-1 flex items-center justify-center mb-8">
        <AnimatePresence mode="wait">
          {!isFlipping && (
            <motion.div
              key={currentIndex}
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -90, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="preserve-3d w-full"
            >
              <div className="relative flex min-h-[300px] sm:min-h-[360px] flex-col items-center justify-center gap-8 rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-surface to-surface-hover p-8 shadow-2xl shadow-cyan-500/15">
                {/* Top accent bar */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-1 w-24 rounded-b-full bg-gradient-to-r from-cyan-500 to-blue-500" />

                {/* Badge */}
                <div className="flex items-center gap-2 rounded-full border border-cyan-500/30 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 px-4 py-1.5 text-xs font-semibold text-cyan-400">
                  <Hand className="h-4 w-4" />
                  SEÑALEN A LA DE 3
                </div>

                {/* Question */}
                <h2 className="text-center text-2xl font-bold leading-snug sm:text-3xl">
                  {questions[currentIndex]}
                </h2>

                <p className="text-sm text-muted">
                  El más votado bebe 🍻
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* AdSense Banner every 6 questions */}
      {currentIndex > 0 && currentIndex % 6 === 0 && (
        <div className="w-full max-w-md mb-6">
          <AdBanner dataAdSlot="IN_GAME_SLOT_ID" />
        </div>
      )}

      {/* Next button */}
      <button
        onClick={nextQuestion}
        disabled={isFlipping}
        className="w-full max-w-md flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02] hover:shadow-xl"
      >
        Siguiente pregunta
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
