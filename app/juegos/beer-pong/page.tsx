"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Plus,
  RotateCcw,
  BookOpen,
  ChevronRight,
  Zap,
  Settings,
} from "lucide-react";
import { useApp } from "@/lib/AppContext";
import { CUP_LAYOUT_10, CUP_LAYOUT_6, getRandomChallenge } from "@/lib/data/beer-pong";
import Confetti from "@/components/ui/Confetti";
import AdBanner from "@/components/ui/AdBanner";

type Phase = "setup" | "playing" | "gameover";
type CupMode = 10 | 6;

interface TeamState {
  name: string;
  cups: boolean[]; // true = still standing, false = sunk
  score: number; // cups sunk
}

export default function BeerPongPage() {
  const { playSound, vibrateDevice } = useApp();

  const [phase, setPhase] = useState<Phase>("setup");
  const [cupMode, setCupMode] = useState<CupMode>(10);
  const [team1Name, setTeam1Name] = useState("Equipo 1");
  const [team2Name, setTeam2Name] = useState("Equipo 2");
  const [currentTurn, setCurrentTurn] = useState(0); // 0 = team1, 1 = team2
  const [teams, setTeams] = useState<[TeamState, TeamState]>([
    { name: "Equipo 1", cups: [], score: 0 },
    { name: "Equipo 2", cups: [], score: 0 },
  ]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [winner, setWinner] = useState<number | null>(null);
  const [challenge, setChallenge] = useState<string | null>(null);
  const [showChallenge, setShowChallenge] = useState(false);
  const [rerackUsed, setRerackUsed] = useState<[boolean, boolean]>([false, false]);
  const [heatingUp, setHeatingUp] = useState(false);
  const [lastShotMade, setLastShotMade] = useState(false);

  const layout = cupMode === 10 ? CUP_LAYOUT_10 : CUP_LAYOUT_6;

  const startGame = useCallback(() => {
    const initialCups = Array(cupMode).fill(true);
    setTeams([
      { name: team1Name || "Equipo 1", cups: [...initialCups], score: 0 },
      { name: team2Name || "Equipo 2", cups: [...initialCups], score: 0 },
    ]);
    setCurrentTurn(0);
    setRerackUsed([false, false]);
    setHeatingUp(false);
    setLastShotMade(false);
    setWinner(null);
    setShowConfetti(false);
    setPhase("playing");
    playSound("success");
  }, [team1Name, team2Name, cupMode, playSound]);

  // Sink a cup for the OPPONENT team (cups are being hit by the current team)
  const sinkCup = useCallback((cupIndex: number, teamIndex: number) => {
    if (!teams[teamIndex].cups[cupIndex]) return; // already sunk

    const newTeams = [...teams] as [TeamState, TeamState];
    const newCups = [...newTeams[teamIndex].cups];
    newCups[cupIndex] = false;
    const newScore = newTeams[teamIndex].score + 1;
    newTeams[teamIndex] = { ...newTeams[teamIndex], cups: newCups, score: newScore };
    setTeams(newTeams);
    playSound("success");
    vibrateDevice("turn");
    setLastShotMade(true);

    // Heating up: if last shot was also made, enable heating up
    if (lastShotMade) {
      setHeatingUp(true);
    }

    // Check if game is over
    if (newScore >= cupMode) {
      setWinner(currentTurn); // current team wins
      setShowConfetti(true);
      setPhase("gameover");
      playSound("success");
    }
  }, [teams, cupMode, currentTurn, lastShotMade, playSound, vibrateDevice]);

  const endTurn = useCallback(() => {
    setCurrentTurn((t) => (t === 0 ? 1 : 0));
    setHeatingUp(false);
    setLastShotMade(false);
    playSound("click");
  }, [playSound]);

  const handleRerack = useCallback((teamIndex: number) => {
    if (rerackUsed[teamIndex]) return;
    const newRerack = [...rerackUsed] as [boolean, boolean];
    newRerack[teamIndex] = true;
    setRerackUsed(newRerack);
    playSound("click");
  }, [rerackUsed, playSound]);

  const triggerChallenge = useCallback(() => {
    const c = getRandomChallenge();
    setChallenge(c);
    setShowChallenge(true);
    playSound("flip");
  }, [playSound]);

  const restartGame = useCallback(() => {
    setPhase("setup");
    setShowConfetti(false);
    setWinner(null);
    setHeatingUp(false);
    setLastShotMade(false);
    setChallenge(null);
  }, []);

  const tc = [
    { gradient: "from-blue-500 to-cyan-500", shadow: "shadow-blue-500/25", text: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/30", cupColor: "bg-blue-400", cupBorder: "border-blue-500/50" },
    { gradient: "from-rose-500 to-pink-500", shadow: "shadow-rose-500/25", text: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/30", cupColor: "bg-rose-400", cupBorder: "border-rose-500/50" },
  ];

  // Build grid from layout
  function renderCups(teamIndex: number, flipped = false) {
    const layout = cupMode === 10 ? CUP_LAYOUT_10 : CUP_LAYOUT_6;
    const maxRow = cupMode === 10 ? 3 : 2;
    const maxCol = cupMode === 10 ? 4 : 3;
    const rows: number[][] = Array(maxRow + 1).fill(null).map(() => []);

    layout.forEach((pos, i) => {
      rows[pos[0]].push(i);
    });

    const displayRows = flipped ? [...rows].reverse() : rows;

    return (
      <div className="flex flex-col items-center gap-2">
        {displayRows.map((row, ri) => (
          <div key={ri} className="flex gap-2 justify-center">
            {row.map((cupIdx) => {
              const standing = teams[teamIndex].cups[cupIdx];
              return (
                <motion.button
                  key={cupIdx}
                  onClick={() => sinkCup(cupIdx, teamIndex)}
                  disabled={!standing || currentTurn === teamIndex || phase !== "playing"}
                  whileTap={{ scale: 0.85 }}
                  className={`relative flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                    standing
                      ? `${tc[teamIndex].cupColor} ${tc[teamIndex].cupBorder} shadow-md cursor-pointer hover:brightness-110 disabled:cursor-not-allowed`
                      : "bg-surface border-border opacity-20 cursor-not-allowed"
                  }`}
                >
                  {standing && (
                    <span className="text-white text-xs font-bold">🍺</span>
                  )}
                  {!standing && (
                    <span className="text-muted text-xs">✕</span>
                  )}
                </motion.button>
              );
            })}
          </div>
        ))}
      </div>
    );
  }

  // ── SETUP ──
  if (phase === "setup") {
    return (
      <div className="flex flex-1 flex-col w-full">
        <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md flex flex-col gap-8"
          >
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-400/25">
                <Trophy className="h-7 w-7 text-white" />
              </div>
              <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Beer Pong Virtual</h1>
              <p className="text-sm text-muted max-w-xs">
                El árbitro digital para tu partida. Gestiona vasos, turnos y reglas especiales desde el móvil.
              </p>
              <Link href="/juegos/beer-pong/reglas" className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-surface-hover px-3 py-1 text-xs font-semibold text-accent transition-colors hover:bg-accent/10">
                <BookOpen className="h-3.5 w-3.5" />
                Ver cómo se juega
              </Link>
            </div>

            {/* Team names */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted">
                <Settings className="h-3.5 w-3.5" /> Configuración
              </div>
              <div className="flex flex-col gap-3">
                <input
                  id="bp-team1"
                  type="text"
                  value={team1Name}
                  onChange={(e) => setTeam1Name(e.target.value)}
                  placeholder="Nombre Equipo 1"
                  className="rounded-xl border border-blue-500/30 bg-blue-500/5 px-4 py-3 text-sm text-foreground placeholder:text-muted outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
                />
                <input
                  id="bp-team2"
                  type="text"
                  value={team2Name}
                  onChange={(e) => setTeam2Name(e.target.value)}
                  placeholder="Nombre Equipo 2"
                  className="rounded-xl border border-rose-500/30 bg-rose-500/5 px-4 py-3 text-sm text-foreground placeholder:text-muted outline-none focus:border-rose-500/50 focus:ring-2 focus:ring-rose-500/20"
                />
              </div>
            </div>

            {/* Cup mode */}
            <div className="flex flex-col gap-3">
              <p className="text-xs font-medium uppercase tracking-wider text-muted">Número de vasos</p>
              <div className="grid grid-cols-2 gap-3">
                {([10, 6] as CupMode[]).map((n) => (
                  <button
                    key={n}
                    onClick={() => setCupMode(n)}
                    className={`rounded-xl border py-3 text-sm font-bold transition-all ${
                      cupMode === n
                        ? "border-amber-400/50 bg-amber-400/10 text-amber-400"
                        : "border-border bg-surface text-muted hover:bg-surface-hover"
                    }`}
                  >
                    {n} vasos {n === 10 ? "(Clásico)" : "(Rápido)"}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={startGame}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-amber-400/25 transition-all hover:scale-[1.02] hover:shadow-xl"
            >
              ¡Empezar partida! <ChevronRight className="h-4 w-4" />
            </button>
          </motion.div>
        </div>

        {/* SEO Static Content Block for crawlers */}
        <div className="w-full bg-surface border-t border-border mt-auto py-12 px-4">
          <div className="mx-auto max-w-3xl prose prose-invert prose-p:text-muted max-w-none">
            <h2>Beer Pong Árbitro Virtual: Ayudante para Tus Partidas Físicas</h2>
            <p>
              El <strong>Beer Pong</strong> es el rey indiscutible de las fiestas en cualquier país del mundo. En nuestra plataforma no lanzas pelotas digitales; hemos diseñado esta web app para que actúe como un árbitro en el medio de la mesa mientras juegas con vasos y pelotas de ping-pong reales.
            </p>
            <h3>Funciones de la App de BeerPong</h3>
            <p>
              Muchos jugadores terminan discutiendo sobre de quién es el turno o si alguien ya pidió un "Re-rack". Nuestra app elimina esas disputas y agiliza el juego de mesa mediante:
            </p>
            <ul>
              <li><strong>Rastreador de Vasos (Cup Tracker):</strong> Marca en la pantalla qué vaso ha sido hundido para que todo el mundo vea el estado de la partida, útil si usáis mesas opacas o queréis concentraros en divertiros.</li>
              <li><strong>Gestión de Turnos y Re-rack:</strong> Sigue de forma automática a qué equipo le toca lanzar y controla que solo se pueda pedir "Re-rack" (reagrupación de vasos) una vez por partida de forma lícita.</li>
              <li><strong>"On Fire":</strong> El sistema detecta cuando un jugador acierta dos pelotas seguidas, encendiéndole el indicador de <em>On Fire</em>, para que tenga un tercer tiro de regalo (y la gloria que ello conlleva).</li>
            </ul>
            <h3>¿No te sabes la normativa oficial?</h3>
            <p>
              Si vuestro grupo está discutiendo sobre reglas internacionales de rebotes, codos en la mesa o soplidos de la bola, échale un vistazo inmediato a las <Link href="/juegos/beer-pong/reglas" className="text-amber-500 underline">reglas y normas del Beer Pong</Link> en nuestra guía completa.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── GAME OVER ──
  if (phase === "gameover" && winner !== null) {
    const loser = winner === 0 ? 1 : 0;
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
        <Confetti active={showConfetti} />
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-6 text-center w-full max-w-md">
          <div className="text-6xl">🏆</div>
          <h2 className="text-2xl font-extrabold sm:text-3xl">
            ¡Gana {teams[winner].name}!
          </h2>
          <p className="text-sm text-muted">
            {teams[loser].name} bebe los vasos restantes y brinda por los campeones 🍺
          </p>

          <div className="grid grid-cols-2 gap-4 w-full">
            {[winner, loser].map((ti) => (
              <div
                key={ti}
                className={`rounded-2xl border p-4 text-center ${
                  ti === winner
                    ? `${tc[ti].border} ${tc[ti].bg}`
                    : "border-border bg-surface opacity-60"
                }`}
              >
                <p className={`text-xs font-bold uppercase tracking-wider ${tc[ti].text}`}>
                  {ti === winner ? "🥇 " : "🥈 "}{teams[ti].name}
                </p>
                <p className="text-2xl font-black mt-1">{teams[ti].score}</p>
                <p className="text-xs text-muted">vasos hundidos</p>
              </div>
            ))}
          </div>

          <div className="flex gap-3 w-full">
            <button
              onClick={startGame}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-400/25 transition-all hover:scale-105"
            >
              <Trophy className="h-4 w-4" />Revancha
            </button>
            <button
              onClick={restartGame}
              className="flex items-center gap-2 rounded-xl border border-border bg-surface px-5 py-3 text-sm font-medium transition-all hover:bg-surface-hover"
            >
              <RotateCcw className="h-4 w-4" />Nuevo
            </button>
          </div>
          <div className="mt-4 w-full"><AdBanner dataAdSlot="GAMEOVER_SLOT_ID" /></div>
        </motion.div>
      </div>
    );
  }

  // ── PLAYING ──
  const defender = currentTurn === 0 ? 1 : 0;

  return (
    <div className="flex flex-1 flex-col items-center px-4 py-6 gap-6">
      {/* Turn indicator */}
      <div className="w-full max-w-md">
        <div className={`flex items-center justify-between rounded-xl border ${tc[currentTurn].border} ${tc[currentTurn].bg} px-4 py-3`}>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted">Turno de</p>
            <p className={`text-base font-extrabold ${tc[currentTurn].text}`}>{teams[currentTurn].name}</p>
          </div>
          {heatingUp && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-xs font-bold text-orange-400 animate-pulse"
            >
              🔥 On Fire!
            </motion.span>
          )}
          <div className="text-right">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted">Vasos hundidos</p>
            <p className={`text-base font-extrabold ${tc[currentTurn].text}`}>
              {teams[defender].score}/{cupMode}
            </p>
          </div>
        </div>
      </div>

      {/* Game board — two triangles */}
      <div className="w-full max-w-md flex flex-col gap-6">
        {/* Opponent cups (defender — current team attacks these) */}
        <div className={`flex flex-col items-center gap-3 rounded-2xl border ${tc[defender].border} ${tc[defender].bg} p-5`}>
          <div className="flex items-center justify-between w-full">
            <p className={`text-xs font-bold uppercase tracking-wider ${tc[defender].text}`}>
              🎯 {teams[defender].name} — apunta aquí
            </p>
            <span className="text-xs font-bold text-muted">
              {teams[defender].cups.filter(Boolean).length} restantes
            </span>
          </div>
          {renderCups(defender, false)}
          <p className="text-[10px] text-muted">Toca un vaso para marcarlo como hundido</p>
        </div>

        {/* Mid board */}
        <div className="flex items-center justify-center gap-3">
          {/* Rerack button */}
          <button
            onClick={() => handleRerack(defender)}
            disabled={rerackUsed[defender] || teams[defender].cups.filter(Boolean).length > 4}
            className="rounded-lg border border-border bg-surface px-3 py-2 text-xs font-medium text-muted transition-all hover:bg-surface-hover disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {rerackUsed[defender] ? "Re-rack usado" : "Re-rack"}
          </button>

          {/* Challenge button */}
          <button
            onClick={triggerChallenge}
            className="flex items-center gap-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs font-bold text-amber-400 transition-all hover:bg-amber-500/20"
          >
            <Zap className="h-3.5 w-3.5" />Desafío
          </button>

          {/* End turn */}
          <button
            onClick={endTurn}
            className={`rounded-lg bg-gradient-to-r ${tc[currentTurn].gradient} px-3 py-2 text-xs font-bold text-white shadow-md transition-all hover:scale-105`}
          >
            Fin de turno →
          </button>
        </div>

        {/* Own cups */}
        <div className={`flex flex-col items-center gap-3 rounded-2xl border ${tc[currentTurn].border} bg-surface/50 p-5 opacity-70`}>
          <div className="flex items-center justify-between w-full">
            <p className={`text-xs font-bold uppercase tracking-wider ${tc[currentTurn].text}`}>
              🛡️ {teams[currentTurn].name} — tus vasos
            </p>
            <span className="text-xs font-bold text-muted">
              {teams[currentTurn].cups.filter(Boolean).length} restantes
            </span>
          </div>
          {renderCups(currentTurn, true)}
        </div>
      </div>

      {/* Score bar */}
      <div className="w-full max-w-md grid grid-cols-2 gap-3">
        {teams.map((t, i) => (
          <div key={i} className={`rounded-xl border p-3 text-center ${tc[i].bg} ${tc[i].border}`}>
            <p className={`text-[10px] font-bold uppercase ${tc[i].text}`}>{t.name}</p>
            <p className={`text-xl font-black ${tc[i].text}`}>{t.score}</p>
            <p className="text-[10px] text-muted">hundidos</p>
          </div>
        ))}
      </div>

      {/* Challenge modal */}
      <AnimatePresence>
        {showChallenge && challenge && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
            onClick={() => setShowChallenge(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              className="w-full max-w-sm rounded-2xl border border-amber-500/30 bg-background p-8 text-center shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-lg font-extrabold mb-3 text-amber-400">¡Desafío Especial!</h3>
              <p className="text-sm text-muted leading-relaxed mb-6">{challenge}</p>
              <button
                onClick={() => setShowChallenge(false)}
                className="w-full rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 py-3 text-sm font-semibold text-white"
              >
                ¡Aceptado!
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
