"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Plus, X, Users, RotateCcw, BookOpen, ChevronRight, Check, AlertTriangle, Timer } from "lucide-react";
import { useApp } from "@/lib/AppContext";
import { tabuCards, shuffleCards, type TabuCard } from "@/lib/data/tabu";
import Confetti from "@/components/ui/Confetti";
import AdBanner from "@/components/ui/AdBanner";

const ROUND_TIME = 60; // seconds per turn

type Phase = "setup" | "turn-start" | "playing" | "turn-end" | "gameover";

interface TeamScore {
  name: string;
  points: number;
  drinks: number;
}

export default function TabuPage() {
  const { playSound, vibrateDevice, recentPlayers, savePlayersToRecent } = useApp();

  const [phase, setPhase] = useState<Phase>("setup");
  const [players, setPlayers] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [teams, setTeams] = useState<[string[], string[]]>([[], []]);
  const [currentTeam, setCurrentTeam] = useState(0); // 0 or 1
  const [scores, setScores] = useState<[TeamScore, TeamScore]>([
    { name: "Equipo 1", points: 0, drinks: 0 },
    { name: "Equipo 2", points: 0, drinks: 0 },
  ]);
  const [deck, setDeck] = useState<TabuCard[]>([]);
  const [currentCard, setCurrentCard] = useState<TabuCard | null>(null);
  const [cardIndex, setCardIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(ROUND_TIME);
  const [roundPoints, setRoundPoints] = useState(0);
  const [roundDrinks, setRoundDrinks] = useState(0);
  const [roundsPlayed, setRoundsPlayed] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Timer
  useEffect(() => {
    if (phase !== "playing") return;
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          endTurn();
          return 0;
        }
        if (prev === 11) playSound("click");
        return prev - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const endTurn = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setPhase("turn-end");
    playSound("drink");
    vibrateDevice("everyone");
  }, [playSound, vibrateDevice]);

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
    if (players.length < 4) return;
    savePlayersToRecent(players);
    // Split into 2 teams
    const shuffledPlayers = [...players].sort(() => Math.random() - 0.5);
    const half = Math.ceil(shuffledPlayers.length / 2);
    const t1 = shuffledPlayers.slice(0, half);
    const t2 = shuffledPlayers.slice(half);
    setTeams([t1, t2]);
    setScores([
      { name: "Equipo 1", points: 0, drinks: 0 },
      { name: "Equipo 2", points: 0, drinks: 0 },
    ]);
    setDeck(shuffleCards(tabuCards));
    setCardIndex(0);
    setCurrentTeam(0);
    setRoundsPlayed(0);
    setPhase("turn-start");
    playSound("success");
  }, [players, savePlayersToRecent, playSound]);

  const startTurn = useCallback(() => {
    setTimeLeft(ROUND_TIME);
    setRoundPoints(0);
    setRoundDrinks(0);
    setCurrentCard(deck[cardIndex] || deck[0]);
    setPhase("playing");
    playSound("flip");
  }, [deck, cardIndex, playSound]);

  const handleCorrect = useCallback(() => {
    setRoundPoints((p) => p + 1);
    const nextIdx = cardIndex + 1 >= deck.length ? 0 : cardIndex + 1;
    setCardIndex(nextIdx);
    setCurrentCard(deck[nextIdx]);
    playSound("success");
  }, [cardIndex, deck, playSound]);

  const handleTabu = useCallback(() => {
    setRoundDrinks((d) => d + 1);
    const nextIdx = cardIndex + 1 >= deck.length ? 0 : cardIndex + 1;
    setCardIndex(nextIdx);
    setCurrentCard(deck[nextIdx]);
    playSound("drink");
    vibrateDevice("turn");
  }, [cardIndex, deck, playSound, vibrateDevice]);

  const handleSkip = useCallback(() => {
    const nextIdx = cardIndex + 1 >= deck.length ? 0 : cardIndex + 1;
    setCardIndex(nextIdx);
    setCurrentCard(deck[nextIdx]);
    playSound("click");
  }, [cardIndex, deck, playSound]);

  const confirmTurnEnd = useCallback(() => {
    setScores((prev) => {
      const updated = [...prev] as [TeamScore, TeamScore];
      updated[currentTeam] = {
        ...updated[currentTeam],
        points: updated[currentTeam].points + roundPoints,
        drinks: updated[currentTeam].drinks + roundDrinks,
      };
      return updated;
    });
    const nextRounds = roundsPlayed + 1;
    setRoundsPlayed(nextRounds);

    if (nextRounds >= 6) {
      // 3 rounds per team = 6 total
      setPhase("gameover");
      setShowConfetti(true);
      playSound("success");
    } else {
      setCurrentTeam(currentTeam === 0 ? 1 : 0);
      setPhase("turn-start");
      playSound("click");
    }
  }, [currentTeam, roundPoints, roundDrinks, roundsPlayed, playSound]);

  const restartGame = useCallback(() => {
    setPhase("setup");
    setPlayers([]);
    setShowConfetti(false);
  }, []);

  const playAgain = useCallback(() => {
    setDeck(shuffleCards(tabuCards));
    setCardIndex(0);
    setCurrentTeam(0);
    setScores([
      { name: "Equipo 1", points: 0, drinks: 0 },
      { name: "Equipo 2", points: 0, drinks: 0 },
    ]);
    setRoundsPlayed(0);
    setPhase("turn-start");
    setShowConfetti(false);
    playSound("success");
  }, [playSound]);

  const teamColors = [
    { gradient: "from-violet-500 to-purple-600", shadow: "shadow-violet-500/25", text: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/30" },
    { gradient: "from-orange-500 to-red-500", shadow: "shadow-orange-500/25", text: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/30" },
  ];
  const tc = teamColors[currentTeam];

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
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-500/25">
                <MessageSquare className="h-7 w-7 text-white" />
              </div>
              <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Tabú Borracho</h1>
              <p className="text-sm text-muted max-w-xs">
                Describe la palabra sin decir las prohibidas. Si dices una palabra tabú… ¡tu equipo bebe!
              </p>
              <Link href="/juegos/tabu/reglas" className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-surface-hover px-3 py-1 text-xs font-semibold text-accent transition-colors hover:bg-accent/10">
                <BookOpen className="h-3.5 w-3.5" />
                Ver cómo se juega
              </Link>
            </div>

            {/* Player input */}
            <div className="flex gap-2">
              <input
                id="tabu-player-input"
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
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/25 transition-all hover:scale-105 disabled:opacity-40 disabled:hover:scale-100 disabled:cursor-not-allowed"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted">
                <Users className="h-3.5 w-3.5" />
                Jugadores ({players.length}) — mínimo 4
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
              {players.length < 4 && (
                <div className="flex items-center justify-center rounded-xl border border-dashed border-border py-6 text-sm text-muted">
                  {players.length === 0
                    ? "Añade al menos 4 jugadores para hacer 2 equipos"
                    : `Faltan ${4 - players.length} jugadores más`}
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
              disabled={players.length < 4}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:scale-[1.02] hover:shadow-xl disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              Crear equipos y empezar <ChevronRight className="h-4 w-4" />
            </button>
          </motion.div>
        </div>

        {/* SEO Static Content Block for crawlers */}
        <div className="w-full bg-surface border-t border-border mt-auto py-12 px-4">
          <div className="mx-auto max-w-3xl prose prose-invert prose-p:text-muted max-w-none">
            <h2>Tabú Borracho: Adivina la Palabra sin decir las Prohibidas</h2>
            <p>
              El clásico juego de mesa de deducción se transforma en <strong>Tabú Borracho</strong>, una competición brutal por equipos donde la falta de vocabulario se paga con alcohol. Necesitáis ser al menos 4 personas en la fiesta para poder formar dos equipos equilibrados.
            </p>
            <h3>Dinámica del Juego</h3>
            <p>
              Durante cada turno, un miembro del equipo se convierte en el "Descriptor". A lo largo de los 60 segundos implacables del temporizador, el Descriptor debe intentar que sus compañeros adivinen la palabra principal gigante que aparece en la tarjeta.
            </p>
            <p>
              <strong>La Trampa:</strong> Debajo de la palabra principal hay un listado de palabras clave prohibidas. El Descriptor no puede mencionar bajo ninguna circunstancia ninguna de esas palabras tabú, ni derivados, ni traducciones. Para asegurar que no hace trampas, <em>alguien del equipo contrario debe estar apoyado en su hombro vigilando la pantalla</em>.
            </p>
            <h3>Sistema de Puntuación y Castigos</h3>
            <ul>
              <li><strong>Acierto (+1 punto):</strong> Si los compañeros adivinan la palabra, se suma un punto y se pasa a la siguiente.</li>
              <li><strong>Infracción Tabú (Castigo):</strong> Si el Descriptor dice una palabra prohibida por los nervios, el juez del equipo contrario pulsará el botón de error. ¡El Descriptor y todo su equipo deben beber inmediatamente! Luego se salta esa tarjeta.</li>
              <li>¿Dudas sobre palabras compuestas o derivaciones? Visita las <Link href="/juegos/tabu/reglas" className="text-violet-500 underline">reglas completas de Tabú Borracho</Link> para dejar claro qué está permitido antes de jugar.</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // ── GAME OVER ──
  if (phase === "gameover") {
    const winner = scores[0].points > scores[1].points ? 0 : scores[1].points > scores[0].points ? 1 : -1;
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
        <Confetti active={showConfetti} />
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-6 text-center w-full max-w-md">
          <div className="text-6xl">{winner === -1 ? "🤝" : "🏆"}</div>
          <h2 className="text-2xl font-extrabold sm:text-3xl">
            {winner === -1 ? "¡Empate!" : `¡Gana el Equipo ${winner + 1}!`}
          </h2>

          <div className="grid grid-cols-2 gap-4 w-full">
            {scores.map((s, i) => (
              <div key={i} className={`rounded-2xl border p-4 flex flex-col gap-2 ${winner === i ? teamColors[i].border + " " + teamColors[i].bg : "border-border bg-surface"}`}>
                <p className={`text-xs font-bold uppercase tracking-wider ${teamColors[i].text}`}>Equipo {i + 1}</p>
                <p className="text-3xl font-black">{s.points}</p>
                <p className="text-xs text-muted">puntos</p>
                <p className="text-xs text-muted">🍺 {s.drinks} tragos bebidos</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {teams[i].map((name) => (
                    <span key={name} className="rounded-full border border-border bg-surface px-2 py-0.5 text-[10px] font-medium text-muted">{name}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3 w-full">
            <button onClick={playAgain} className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:scale-105">
              <MessageSquare className="h-4 w-4" />Revancha
            </button>
            <button onClick={restartGame} className="flex items-center gap-2 rounded-xl border border-border bg-surface px-5 py-3 text-sm font-medium transition-all hover:bg-surface-hover">
              <RotateCcw className="h-4 w-4" />Nuevos
            </button>
          </div>
          <div className="mt-8 w-full"><AdBanner dataAdSlot="GAMEOVER_SLOT_ID" /></div>
        </motion.div>
      </div>
    );
  }

  // ── TURN START ──
  if (phase === "turn-start") {
    const currentDescriber = teams[currentTeam][roundsPlayed % teams[currentTeam].length] || teams[currentTeam][0];
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-8 text-center w-full max-w-md"
        >
          {/* Scoreboard */}
          <div className="grid grid-cols-2 gap-3 w-full">
            {scores.map((s, i) => (
              <div key={i} className={`rounded-xl border p-3 text-center ${currentTeam === i ? teamColors[i].border + " " + teamColors[i].bg : "border-border bg-surface"}`}>
                <p className={`text-xs font-bold uppercase ${teamColors[i].text}`}>Equipo {i + 1}</p>
                <p className="text-2xl font-black">{s.points}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${tc.gradient} shadow-lg ${tc.shadow}`}>
              <MessageSquare className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-extrabold">Turno del Equipo {currentTeam + 1}</h2>
            <p className="text-sm text-muted max-w-xs">
              <strong className={tc.text}>{currentDescriber}</strong> describe las palabras. El resto del equipo adivina. ¡{ROUND_TIME} segundos!
            </p>
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {teams[currentTeam].map((name) => (
              <span key={name} className={`rounded-full border px-3 py-1 text-xs font-medium ${name === currentDescriber ? tc.border + " " + tc.text : "border-border text-muted"}`}>
                {name === currentDescriber ? "🎤 " : ""}{name}
              </span>
            ))}
          </div>

          <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-xs text-muted text-left w-full space-y-1">
            <p><strong className="text-amber-400">⚠️ Recuerda:</strong></p>
            <p>• Pasa el móvil al equipo contrario para que vigile las palabras tabú</p>
            <p>• Si el descriptor dice una palabra prohibida → ¡el equipo bebe!</p>
            <p>• El descriptor NO puede hacer gestos</p>
          </div>

          <button
            onClick={startTurn}
            className={`w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r ${tc.gradient} px-6 py-4 text-sm font-semibold text-white shadow-lg ${tc.shadow} transition-all hover:scale-[1.02] hover:shadow-xl`}
          >
            <Timer className="h-4 w-4" />
            ¡Empezar turno de {ROUND_TIME}s!
          </button>
        </motion.div>
      </div>
    );
  }

  // ── TURN END ──
  if (phase === "turn-end") {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-6 text-center w-full max-w-md"
        >
          <div className="text-6xl">⏰</div>
          <h2 className="text-2xl font-extrabold">¡Se acabó el tiempo!</h2>
          <p className={`text-sm font-semibold ${tc.text}`}>Equipo {currentTeam + 1}</p>

          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4 text-center">
              <p className="text-3xl font-black text-green-400">+{roundPoints}</p>
              <p className="text-xs text-muted mt-1">palabras acertadas</p>
            </div>
            <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-center">
              <p className="text-3xl font-black text-red-400">{roundDrinks}</p>
              <p className="text-xs text-muted mt-1">tragos por tabú</p>
            </div>
          </div>

          <button
            onClick={confirmTurnEnd}
            className={`w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r ${tc.gradient} px-6 py-4 text-sm font-semibold text-white shadow-lg ${tc.shadow} transition-all hover:scale-[1.02]`}
          >
            {roundsPlayed + 1 >= 6 ? "Ver resultados" : "Siguiente equipo"} <ChevronRight className="h-4 w-4" />
          </button>
        </motion.div>
      </div>
    );
  }

  // ── PLAYING ──
  const timerProgress = (timeLeft / ROUND_TIME) * 100;
  const timerColor = timeLeft <= 10 ? "from-red-500 to-rose-500" : `${tc.gradient}`;

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-md flex flex-col gap-6">
        {/* Timer bar */}
        <div className="flex items-center justify-between">
          <span className={`text-xs font-medium ${tc.text}`}>Equipo {currentTeam + 1}</span>
          <span className={`text-lg font-black tabular-nums ${timeLeft <= 10 ? "text-red-400 animate-pulse" : tc.text}`}>
            {timeLeft}s
          </span>
        </div>
        <div className="h-2 w-full rounded-full bg-surface overflow-hidden">
          <motion.div
            className={`h-full rounded-full bg-gradient-to-r ${timerColor}`}
            animate={{ width: `${timerProgress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Score this round */}
        <div className="flex gap-3 text-center">
          <div className="flex-1 rounded-lg bg-green-500/10 border border-green-500/20 py-1.5">
            <span className="text-sm font-bold text-green-400">{roundPoints}</span>
            <span className="text-[10px] text-muted ml-1">aciertos</span>
          </div>
          <div className="flex-1 rounded-lg bg-red-500/10 border border-red-500/20 py-1.5">
            <span className="text-sm font-bold text-red-400">{roundDrinks}</span>
            <span className="text-[10px] text-muted ml-1">tabús</span>
          </div>
        </div>

        {/* Current Card */}
        <AnimatePresence mode="wait">
          {currentCard && (
            <motion.div
              key={currentCard.word}
              initial={{ opacity: 0, x: 50, rotateY: 10 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: -50, rotateY: -10 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl border border-border bg-surface overflow-hidden"
            >
              {/* Word to describe */}
              <div className={`bg-gradient-to-r ${tc.gradient} p-6 text-center`}>
                <p className="text-2xl font-black text-white tracking-tight">{currentCard.word}</p>
              </div>
              {/* Taboo words */}
              <div className="p-5 flex flex-col gap-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-red-400 flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" /> Palabras prohibidas
                </p>
                <div className="flex flex-col gap-1.5">
                  {currentCard.taboo.map((word) => (
                    <div key={word} className="flex items-center gap-2 rounded-lg bg-red-500/5 border border-red-500/10 px-3 py-2">
                      <X className="h-3.5 w-3.5 text-red-400 shrink-0" />
                      <span className="text-sm font-semibold text-red-300">{word}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action buttons */}
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={handleCorrect}
            className="flex flex-col items-center gap-1.5 rounded-xl bg-green-500/10 border border-green-500/20 px-4 py-3 text-green-400 transition-all hover:bg-green-500/20 hover:border-green-500/30 active:scale-95"
          >
            <Check className="h-6 w-6" />
            <span className="text-xs font-bold">Correcto</span>
          </button>
          <button
            onClick={handleTabu}
            className="flex flex-col items-center gap-1.5 rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-red-400 transition-all hover:bg-red-500/20 hover:border-red-500/30 active:scale-95"
          >
            <AlertTriangle className="h-6 w-6" />
            <span className="text-xs font-bold">¡Tabú!</span>
          </button>
          <button
            onClick={handleSkip}
            className="flex flex-col items-center gap-1.5 rounded-xl bg-surface border border-border px-4 py-3 text-muted transition-all hover:bg-surface-hover hover:text-foreground active:scale-95"
          >
            <ChevronRight className="h-6 w-6" />
            <span className="text-xs font-bold">Pasar</span>
          </button>
        </div>
      </div>
    </div>
  );
}
