import Link from "next/link";
import type { Metadata } from "next";
import { MessageSquare, ChevronRight, Users, Zap, ShieldCheck, Timer, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Cómo Jugar al Tabú Borracho — Reglas del Juego de Beber",
  description:
    "Aprende las reglas del Tabú Borracho, el juego de palabras para beber en equipo. Describe la palabra sin decir las prohibidas o todo tu equipo bebe.",
};

export default function TabuReglasPage() {
  return (
    <div className="flex flex-1 flex-col items-center px-4 py-12 sm:py-20">
      <div className="w-full max-w-3xl">
        <Link href="/juegos/tabu" className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground transition-colors mb-8">
          ← Volver al juego
        </Link>

        <header className="mb-12 flex flex-col gap-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-500/25">
            <MessageSquare className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold sm:text-4xl mb-3">Cómo jugar al Tabú Borracho</h1>
            <p className="text-muted text-lg leading-relaxed">El juego de palabras más divertido para fiestas. Describe, adivina y bebe.</p>
          </div>
        </header>

        <div className="flex flex-col gap-8">
          {/* Materiales */}
          <section className="rounded-2xl border border-border bg-surface p-6 flex flex-col gap-4">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <Users className="h-5 w-5 text-violet-400" /> Lo que necesitas
            </h2>
            <ul className="text-sm text-muted space-y-2 leading-relaxed">
              <li>✅ <strong>4 o más jugadores</strong> (para hacer 2 equipos)</li>
              <li>✅ <strong>Bebidas</strong> para todos</li>
              <li>✅ <strong>Un móvil</strong> con BeberGames abierto</li>
              <li>✅ Nada más — ¡el juego tiene más de 65 tarjetas!</li>
            </ul>
          </section>

          {/* Reglas */}
          <section className="rounded-2xl border border-border bg-surface p-6 flex flex-col gap-6">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <Zap className="h-5 w-5 text-violet-400" /> Reglas del juego
            </h2>
            <div className="flex flex-col gap-5">
              {[
                { paso: "1", titulo: "Divide en 2 equipos", desc: "El juego divide automáticamente a los jugadores en 2 equipos al azar. Cada equipo tendrá turnos alternos." },
                { paso: "2", titulo: "Un descriptor por turno", desc: "En cada turno, un jugador del equipo es el 'descriptor'. Su trabajo es explicar la palabra que aparece en pantalla para que su equipo la adivine." },
                { paso: "3", titulo: "Cuidado con las palabras tabú", desc: "Debajo de la palabra aparecen 4 palabras PROHIBIDAS que el descriptor NO puede decir. El equipo contrario vigila el móvil." },
                { paso: "4", titulo: "60 segundos por turno", desc: "Cada turno dura 60 segundos. Hay que acertar tantas palabras como sea posible en ese tiempo." },
                { paso: "5", titulo: "Acierto = punto / Tabú = trago", desc: "Por cada palabra que el equipo adivine, suman 1 punto. Si el descriptor dice una palabra tabú, ¡TODO el equipo bebe!" },
                { paso: "6", titulo: "3 turnos por equipo", desc: "Cada equipo juega 3 turnos (6 rondas en total). El equipo con más puntos gana. ¡El perdedor brinda por los ganadores!" },
              ].map(({ paso, titulo, desc }) => (
                <div key={paso} className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600 text-sm font-bold text-white">{paso}</div>
                  <div>
                    <p className="font-semibold mb-1">{titulo}</p>
                    <p className="text-sm text-muted leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Ejemplo */}
          <section className="rounded-2xl border border-border bg-surface p-6 flex flex-col gap-4">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <BookOpen className="h-5 w-5 text-violet-400" /> Ejemplo de jugada
            </h2>
            <div className="text-sm text-muted leading-relaxed space-y-3">
              <div className="rounded-xl overflow-hidden border border-border">
                <div className="bg-gradient-to-r from-violet-500 to-purple-600 p-4 text-center">
                  <p className="text-xl font-black text-white">Pizza</p>
                </div>
                <div className="p-3 space-y-1.5 text-xs">
                  <p className="text-red-400 font-bold">❌ italia · queso · masa · horno</p>
                </div>
              </div>
              <p><strong className="text-foreground">El descriptor podría decir:</strong> &quot;Es un plato redondo que pides por teléfono, viene en una caja de cartón, tiene tomate por encima y la cortas en triángulos…&quot;</p>
              <p><strong className="text-red-400">¡PERO NO puede decir:</strong> Italia, queso, masa ni horno.</p>
              <p className="text-foreground font-medium">Si dice &quot;tiene mucho queso&quot; → ¡el equipo contrario pulsa TABÚ y todo su equipo bebe! 🍺</p>
            </div>
          </section>

          {/* Consejos */}
          <section className="rounded-2xl border border-border bg-surface p-6 flex flex-col gap-4">
            <h2 className="text-lg font-bold">🧠 Estrategia y consejos</h2>
            <div className="flex flex-col gap-3 text-sm text-muted leading-relaxed">
              <p><strong className="text-foreground">Velocidad:</strong> No pierdas tiempo con una palabra difícil. ¡Usa el botón de Pasar y ve a la siguiente!</p>
              <p><strong className="text-foreground">Sinónimos:</strong> Piensa en sinónimos antes de hablar. Si no puedes decir &quot;queso&quot;, di &quot;ingrediente amarillo derretido&quot;.</p>
              <p><strong className="text-foreground">Contexto:</strong> Usa situaciones. &quot;Cuando sales de la discoteca a las 4 de la mañana y pides comida por teléfono…&quot;</p>
              <p><strong className="text-foreground">La trampa del nervio:</strong> Cuando queda poco tiempo, la presión hace que digas palabras tabú sin pensar. ¡Cuidado!</p>
            </div>
          </section>

          {/* Aviso */}
          <section className="rounded-2xl border border-violet-500/20 bg-violet-500/5 p-6 flex flex-col gap-3">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <ShieldCheck className="h-5 w-5 text-violet-400" /> Bebe con responsabilidad
            </h2>
            <p className="text-sm text-muted leading-relaxed">
                Tabú Borracho es un juego de entretenimiento para mayores de 18 años. Puedes jugar con agua o refrescos si lo prefieres. BeberGames promueve el consumo responsable.
            </p>
          </section>

          <Link
            href="/juegos/tabu"
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:scale-[1.02] hover:shadow-xl"
          >
            ¡Jugar ahora! <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
