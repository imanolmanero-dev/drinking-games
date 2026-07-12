import Link from 'next/link';
import type { Metadata } from 'next';
import { Triangle, ChevronRight, Users, Zap, ShieldCheck, Eye, List, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  alternates: {
    canonical: "https://bebergames.com/juegos/la-piramide/reglas",
  },
  title: 'Reglas de La Pirámide — Cómo Jugar al Juego de Cartas',
  description: 'Las reglas completas de La Pirámide explicadas paso a paso. Aprende a jugar, farolear y asignar tragos en este clásico juego de beber con cartas.',
};

export default function LaPiramideReglasPage() {
  return (
    <div className="flex flex-1 flex-col items-center px-4 py-12 sm:py-20">
      <div className="w-full max-w-3xl">
        <Link href="/juegos/la-piramide" className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground transition-colors mb-8">
          ← Volver al juego
        </Link>

        <header className="mb-12 flex flex-col gap-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/25">
            <Triangle className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold sm:text-4xl mb-3">Cómo Jugar a La Pirámide</h1>
            <p className="text-muted text-lg leading-relaxed">
              El juego de cartas donde la memoria y el farol son tus mejores armas. Memoriza, miente y asigna tragos.
            </p>
          </div>
        </header>

        <div className="flex flex-col gap-8">
          {/* Materiales */}
          <section className="rounded-2xl border border-border bg-surface p-6 flex flex-col gap-4">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <Users className="h-5 w-5 text-indigo-500" /> Lo que necesitas
            </h2>
            <ul className="text-sm text-muted space-y-2 leading-relaxed">
              <li>✅ <strong>Jugadores:</strong> Mínimo 2, ideal entre 4 y 8. Cuantos más, más faroles y más caos.</li>
              <li>✅ <strong>Baraja:</strong> La app de BeberGames se encarga. Sin cartas pegajosas ni perdidas.</li>
              <li>✅ <strong>Bebidas:</strong> Cada jugador con su vaso lleno. Los tragos se acumulan rápido en las filas altas.</li>
              <li>✅ <strong>Memoria:</strong> Vas a necesitar recordar 4 cartas durante toda la partida. Solo tienes 10 segundos para memorizarlas.</li>
            </ul>
          </section>

          {/* Paso a paso */}
          <section className="rounded-2xl border border-border bg-surface p-6 flex flex-col gap-6">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <Zap className="h-5 w-5 text-indigo-500" /> Paso a paso
            </h2>
            <div className="flex flex-col gap-5">
              {[
                { paso: "1", titulo: "Se construye la pirámide", desc: "La app coloca 21 cartas boca abajo formando una pirámide: 6 en la base, 5, 4, 3, 2 y 1 en la cima." },
                { paso: "2", titulo: "Se reparten las cartas", desc: "Cada jugador recibe 4 cartas. Tienes exactamente 10 segundos para memorizar los valores. Después se ocultan." },
                { paso: "3", titulo: "Se revelan las cartas de la pirámide", desc: "De la base hacia la cima, se va destapando una carta por turno. Si coincide con una de tus cartas, puedes asignar tragos a otro jugador." },
                { paso: "4", titulo: "¡El farol entra en juego!", desc: "No necesitas tener la carta de verdad. Puedes decir que la tienes y asignar tragos igualmente. Si el otro jugador te cree, bebe. Si te reta y no la tienes, bebes tú el doble." },
                { paso: "5", titulo: "Los tragos suben por fila", desc: "La base vale 1 trago. La segunda fila 2. Y así hasta la cima, donde una sola carta vale 6 tragos. Los faroles se ponen muy arriesgados arriba." },
              ].map(({ paso, titulo, desc }) => (
                <div key={paso} className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-sm font-bold text-white">{paso}</div>
                  <div>
                    <p className="font-semibold mb-1">{titulo}</p>
                    <p className="text-sm text-muted leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* El farol */}
          <section className="rounded-2xl border border-indigo-500/20 bg-indigo-500/10 p-6 flex flex-col gap-4">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <Eye className="h-5 w-5 text-indigo-400" /> El Arte del Farol
            </h2>
            <div className="flex flex-col gap-4 text-sm text-muted leading-relaxed">
              <p>El farol es lo que convierte La Pirámide de un juego de suerte a un juego de estrategia. Cuando se revela una carta, <strong>cualquier jugador</strong> puede decir que la tiene y asignar tragos.</p>
              <p>El jugador señalado puede aceptar los tragos o <strong>retar al farol</strong>:</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>Si retó y el otro <strong>sí tenía la carta</strong> → el retador bebe el <strong>doble</strong>.</li>
                <li>Si retó y el otro <strong>no tenía la carta</strong> → el farolero bebe el <strong>doble</strong>.</li>
              </ul>
              <p>En las filas altas (5-6 tragos), retar un farol puede significar beber 10-12 tragos. La tensión es brutal.</p>
            </div>
          </section>

          {/* Aviso */}
          <section className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6 flex flex-col gap-3">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <ShieldCheck className="h-5 w-5 text-amber-500" /> Beber con moderación
            </h2>
            <p className="text-sm text-muted leading-relaxed">
              Los tragos se acumulan rápido en La Pirámide, especialmente si te pillan faroleando en las filas altas. Usad tragos pequeños, alternad con agua y recordad que la gracia está en el farol, no en la cantidad de alcohol. BeberGames promueve el juego responsable.
            </p>
          </section>

          <Link href="/juegos/la-piramide" className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:scale-[1.02] hover:shadow-xl mt-4">
            ¡Construir la pirámide! <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
