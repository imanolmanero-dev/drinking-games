import { CARTAS_ROF } from "@/lib/data/ring-of-fire";
import Link from 'next/link';
import type { Metadata } from 'next';
import { Flame, ChevronRight, Users, Zap, ShieldCheck, GlassWater, List } from 'lucide-react';

export const metadata: Metadata = {
  alternates: {
    canonical: "https://bebergames.com/juegos/ring-of-fire/reglas",
  },
  title: 'Reglas de Ring of Fire (Copa del Rey) — Cómo Jugar',
  description: 'Las reglas completas de Ring of Fire o La Copa del Rey explicadas. Qué significa cada carta de la baraja y cómo sobrevivir a este mítico juego universitario.',
};

export default function RingOfFireReglasPage() {
  return (
    <div className="flex flex-1 flex-col items-center px-4 py-12 sm:py-20">
      <div className="w-full max-w-3xl">
        <Link 
          href="/juegos/ring-of-fire" 
          className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground transition-colors mb-8"
        >
          ← Volver al juego
        </Link>
        
        <header className="mb-12 flex flex-col gap-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 shadow-lg shadow-red-500/25">
            <Flame className="h-8 w-8 text-white" />
          </div>
           <div>
            <h1 className="text-3xl font-extrabold sm:text-4xl mb-3">
              Cómo Jugar a Ring of Fire
            </h1>
            <p className="text-muted text-lg leading-relaxed">
              Conocido internacionalmente como King's Cup (La Copa del Rey) o Cascada. El rey indiscutible de los juegos de cartas universitarios, ahora sin necesidad de llevar una baraja sucia en el bolsillo.
            </p>
          </div>
        </header>

        <div className="flex flex-col gap-8">
          
          {/* Materiales */}
          <section className="rounded-2xl border border-border bg-surface p-6 flex flex-col gap-4">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <Users className="h-5 w-5 text-red-500" /> Lo que necesitas
            </h2>
            <ul className="text-sm text-muted space-y-2 leading-relaxed">
              <li>✅ <strong>Jugadores:</strong> Lo ideal es a partir de 4 jugadores. En este juego, cuantos más seáis creando un gran círculo de sillas, mucho mejor será el caos.</li>
              <li><strong>Copa central:</strong> Colocad una copa vacía para marcar el centro.</li>
              <li>✅ <strong>El mazo perfecto:</strong> La baraja virtual de BeberGames, porque aquí nunca faltará esa última carta que siempre se pierde debajo del sofá.</li>
              <li>Dejad sitio para levantar las manos durante la cascada.</li>
            </ul>
          </section>

          {/* Dinámica paso a paso */}
          <section className="rounded-2xl border border-border bg-surface p-6 flex flex-col gap-6">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <Zap className="h-5 w-5 text-red-500" /> Dinámica del juego
            </h2>
            <div className="flex flex-col gap-5">
              {[
                {
                  paso: "1",
                  titulo: "Sentarse en Círculo",
                  desc: "Los jugadores se acomodan formando un círculo perfecto alrededor de la mesa. El Santo Grial (el vaso vacío grande) preside en el centro.",
                },
                {
                  paso: "2",
                  titulo: "Turno a turno",
                  desc: "Comenzando por el jugador con el turno actual en la app, cada participante saca una carta y la enseña a todo el círculo para que conste en acta.",
                },
                {
                  paso: "3",
                  titulo: "Ejecución Inmediata",
                  desc: "Lee la propuesta o pasa directamente al siguiente jugador, sin penalización.",
                },
                {
                  paso: "4",
                  titulo: "El Cuarto Rey",
                  desc: "Al cuarto rey se aparta la copa y termina la partida.",
                },
              ].map(({ paso, titulo, desc }) => (
                <div key={paso} className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-rose-600 text-sm font-bold text-white">
                    {paso}
                  </div>
                  <div>
                    <p className="font-semibold mb-1">{titulo}</p>
                    <p className="text-sm text-muted leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* El chuletario de cartas */}
          <section className="rounded-2xl border border-border bg-surface p-6 flex flex-col gap-4">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <List className="h-5 w-5 text-red-500" /> Significado de la Baraja Clásica
            </h2>
            <div className="flex flex-col gap-3 text-sm text-muted leading-relaxed">
              <p>Aunque nuestra app ya te dicta qué hacer en pantalla para que no tengas que memorizar aburridas tablas, aquí te dejamos las mecánicas populares en toda España y LATAM:</p>
              
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 list-none p-0">
                {CARTAS_ROF.map(carta => <li key={carta.valor} className="bg-surface-hover p-3 rounded-lg border border-border"><strong>{carta.valor} — {carta.nombre}:</strong> {carta.descripcion}</li>)}
              </ul>
            </div>
          </section>
          
          {/* El Final Apocalíptico */}
          <section className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6 flex flex-col gap-4">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <GlassWater className="h-5 w-5 text-red-500" /> El Final Apocalíptico (La Carta K)
            </h2>
            <div className="flex flex-col gap-4 text-sm text-muted leading-relaxed">
              <p>
                Los tres primeros reyes quedan apuntados en el contador. La copa permanece vacía.
              </p>
              <p>
                Quien saque el cuarto rey aparta la copa del centro. Podéis barajar para empezar otra partida.
              </p>
            </div>
          </section>

          {/* Aviso */}
          <section className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-6 flex flex-col gap-3">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <ShieldCheck className="h-5 w-5 text-rose-500" /> Beber con moderación y seguridad
            </h2>
            <p className="text-sm text-muted leading-relaxed">
              Todas las cartas se pueden pasar sin beber ni dar explicaciones.
            </p>
          </section>

          <Link
            href="/juegos/ring-of-fire"
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-red-500/25 transition-all hover:scale-[1.02] hover:shadow-xl mt-4"
          >
            ¡Repartir las cartas! <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
