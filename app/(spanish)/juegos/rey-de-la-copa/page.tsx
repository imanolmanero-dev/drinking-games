"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Crown,
  Plus,
  X,
  Users,
  ChevronRight,
  RotateCcw,
  Clock,
  BookOpen,
} from "lucide-react";
import { useApp } from "@/lib/AppContext";
import Confetti from "@/components/ui/Confetti";

import {
  reglasCartas,
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
  const kingsDrawn = deck.slice(0, currentIndex + 1).filter(card => card.regla.esCopa).length;
  const [isFlipping, setIsFlipping] = useState(false);

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
    setPhase("playing");
    savePlayersToRecent(players);
    playSound("success");
  }, [players, savePlayersToRecent, playSound]);

  const drawCard = useCallback(() => {
    if (isFlipping) return;
    setIsFlipping(true);
    playSound("flip");
    vibrateDevice("flip");

    setTimeout(() => {
      if (deck[currentIndex + 1]?.regla.esCopa && kingsDrawn === 3) {
        playSound("everyone");
        vibrateDevice("everyone");
      }
      setCurrentIndex(currentIndex + 1);
      setIsFlipping(false);
    }, 300);
  }, [isFlipping, deck, currentIndex, kingsDrawn, playSound, vibrateDevice]);

  const restartGame = useCallback(() => {
    setPhase("setup");
    setPlayers([]);
    setCurrentIndex(0);
  }, []);

  const shuffleAndRestart = useCallback(() => {
    setDeck(shuffleDeck(buildDeck()));
    setCurrentIndex(0);
    playSound("success");
  }, [playSound]);

  const currentCard = deck[currentIndex];
  const progress = deck.length ? Math.round((currentIndex / deck.length) * 100) : 0;
  const isRed = currentCard ? RED_PALOS.includes(currentCard.palo) : false;

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
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 shadow-lg shadow-amber-400/25">
                <Crown className="h-7 w-7 text-white" />
              </div>
              <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                El Rey de la Copa
              </h1>
              <p className="text-sm text-muted max-w-xs">
                Roba cartas y descubre su regla. Puedes pasar cualquier carta.
                El cuarto rey cierra la partida.
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

        {/* SEO Static Content Block for crawlers */}
        <div className="w-full bg-surface border-t border-border mt-auto py-12 px-4">
          <div className="mx-auto max-w-3xl prose prose-invert prose-p:text-muted max-w-none">
            <h2>Rey de la Copa (Kings Cup): El Juego de Cartas para Beber</h2>
            <p>
              El <strong>Rey de la Copa</strong> — también conocido como Kings Cup o Círculo de la Muerte — es el juego de beber con cartas más famoso del mundo. Nuestra versión digital genera la baraja y hace de árbitro para que podáis jugar en cualquier sitio sin necesidad de cartas físicas.
            </p>
            <p>
              Colocad la copa en el centro y robad por turnos. Cada rey cuenta, aunque la copa siga vacía. Al cuarto rey se aparta la copa.
            </p>

            <h3>Las cartas y sus reglas</h3>
            <ul>
              {reglasCartas.map(regla => <li key={regla.valor}><strong>{regla.valor} — {regla.titulo}:</strong> {regla.descripcion}</li>)}
            </ul>

            <h3>Preguntas frecuentes</h3>
            <p><strong>¿Cuántos jugadores hacen falta?</strong> Funciona bien con un grupo de cuatro a ocho.</p>
            <p><strong>¿Qué se pone en la copa?</strong> Puedes dejarla vacía. Cualquier aportación es opcional.</p>
            <p><strong>¿Se puede jugar sin alcohol?</strong> Sí. Puedes brindar con palabras o pasar cualquier carta.</p>

            <h3>Otros juegos de cartas que te gustarán</h3>
            <ul>
              <li><Link href="/juegos/tabu" className="text-amber-500 underline">Tabú Borracho</Link> — Adivina la palabra sin decir las prohibidas. Ideal para grupos grandes.</li>
              <li><Link href="/juegos/beer-pong" className="text-amber-500 underline">Beer Pong</Link> — El clásico de las fiestas universitarias. Apunta bien.</li>
              <li><Link href="/juegos/triman" className="text-amber-500 underline">Triman</Link> — Dados y el poder del 3. Simple, rápido y brutal.</li>
            </ul>
            <p>Para conocer variantes y consejos para jugar con una baraja física, consulta la <Link href="/blog/rey-de-la-copa-reglas" className="text-amber-500 underline">guía del Rey de la Copa</Link>.</p>
          </div>
        </div>
      </div>
    );
  }

  // 4th King screen
  if (kingsDrawn === 4) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
        <Confetti active />
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
          <p className="text-xl font-bold">Apartad la copa del centro</p>
          <p className="text-muted text-sm max-w-xs">
            El cuarto rey cierra la partida.
            Si la copa contiene bebida, desechad lo que quede.
          </p>
          <button
            onClick={shuffleAndRestart}
            className="mt-4 flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-amber-400/25 transition-all hover:scale-[1.02]"
          >
            Volver a barajar <ChevronRight className="h-4 w-4" />
          </button>
          <button onClick={restartGame} className="flex items-center gap-2 rounded-xl border border-border px-5 py-3">
            <RotateCcw className="h-4 w-4" /> Cambiar jugadores
          </button>
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

              <p className="text-xs text-muted">Puedes pasar esta carta sin penalización.</p>

              {/* King indicator */}
              {currentCard?.regla.esCopa && (
                <div className="rounded-full bg-amber-400/15 border border-amber-400/30 px-3 py-1 text-xs font-semibold text-amber-400">
                  👑 Rey a la vista — Puedes dejar la copa vacía.
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
