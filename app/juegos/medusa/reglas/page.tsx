import Link from "next/link";
import type { Metadata } from "next";
import { Eye, ChevronRight, Users, Zap, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Cómo Jugar a Medusa — Reglas del Juego de Beber",
  description:
    "Aprende las reglas de Medusa, el juego de beber de contacto visual. Todos miran abajo, a la de 3 todos miran a alguien. Si dos se cruzan la mirada… ¡MEDUSA! A beber.",
};

export default function MedusaReglasPage() {
  return (
    <div className="flex flex-1 flex-col items-center px-4 py-12 sm:py-20">
      <div className="w-full max-w-3xl">
        <Link href="/juegos/medusa" className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground transition-colors mb-8">
          ← Volver al juego
        </Link>

        <header className="mb-12 flex flex-col gap-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-lime-500 to-green-600 shadow-lg shadow-lime-500/25">
            <Eye className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold sm:text-4xl mb-3">Cómo jugar a Medusa</h1>
            <p className="text-muted text-lg leading-relaxed">El juego de beber más sencillo y más tenso del mundo. Sin cartas, sin dados, sin móvil. Solo miradas.</p>
          </div>
        </header>

        <div className="flex flex-col gap-8">
          {/* Materiales */}
          <section className="rounded-2xl border border-border bg-surface p-6 flex flex-col gap-4">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <Users className="h-5 w-5 text-lime-400" /> Lo que necesitas
            </h2>
            <ul className="text-sm text-muted space-y-2 leading-relaxed">
              <li>✅ <strong>4 o más jugadores</strong> (cuantos más, más caos)</li>
              <li>✅ <strong>Bebidas</strong> para todos</li>
              <li>✅ Nada más — ¡ningún material adicional!</li>
            </ul>
          </section>

          {/* Reglas */}
          <section className="rounded-2xl border border-border bg-surface p-6 flex flex-col gap-6">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <Zap className="h-5 w-5 text-lime-400" /> Reglas del juego
            </h2>
            <div className="flex flex-col gap-5">
              {[
                { paso: "1", titulo: "Todos miran hacia abajo", desc: "Al inicio de cada ronda, todos los jugadores bajan la vista al suelo o a la mesa. Nadie puede mirar a los demás todavía." },
                { paso: "2", titulo: "La cuenta atrás", desc: "El jugador con el móvil pulsa el botón. El juego hace la cuenta atrás: 3… 2… 1… ¡MEDUSA!" },
                { paso: "3", titulo: "¡Mirad!", desc: "En cuanto aparece '¡MEDUSA!', todos levantan la vista y miran directamente a otro jugador del grupo. ¡Instintivo y rápido!" },
                { paso: "4", titulo: "Contacto visual = beber", desc: "Si dos jugadores se miran directamente a los ojos en ese momento, ambos gritan '¡MEDUSA!' y deben beber." },
                { paso: "5", titulo: "El último en gritar bebe doble", desc: "De los dos que se miraron, el que tarde más en gritar '¡MEDUSA!' bebe el doble. ¡Hay que estar alerta!" },
                { paso: "6", titulo: "Siguiente ronda", desc: "Todos vuelven a mirar abajo y empieza la siguiente ronda. ¡15 rondas de tensión pura!" },
              ].map(({ paso, titulo, desc }) => (
                <div key={paso} className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-lime-500 to-green-600 text-sm font-bold text-white">{paso}</div>
                  <div>
                    <p className="font-semibold mb-1">{titulo}</p>
                    <p className="text-sm text-muted leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Estrategia */}
          <section className="rounded-2xl border border-border bg-surface p-6 flex flex-col gap-4">
            <h2 className="text-lg font-bold">🧠 Estrategia y consejos</h2>
            <div className="flex flex-col gap-3 text-sm text-muted leading-relaxed">
              <p><strong className="text-foreground">Desenfoca la vista:</strong> En lugar de mirar a alguien fijo, intenta ver el grupo de forma periférica. Luego enfoca rápido.</p>
              <p><strong className="text-foreground">El efecto sorpresa:</strong> Mira siempre a alguien diferente en cada ronda. Los patrones son predecibles y te delatan.</p>
              <p><strong className="text-foreground">La trampa del mejor:</strong> Los mejores jugadores miran a quien menos se lo espera. El que sempre mira al mismo lado es fácil de pillar.</p>
            </div>
          </section>

          {/* Variaciones */}
          <section className="rounded-2xl border border-border bg-surface p-6 flex flex-col gap-4">
            <h2 className="text-lg font-bold">⚡ Variaciones</h2>
            <div className="flex flex-col gap-4 text-sm text-muted">
              <div><strong className="text-foreground">Medusa Encadenada:</strong> Si en una ronda nadie se mira, el que lleve más rondas salvadas bebe igualmente.</div>
              <div><strong className="text-foreground">Medusa con reto:</strong> El que pierda además de beber tiene que hacer un reto que el grupo elija.</div>
              <div><strong className="text-foreground">Medusa Oscura:</strong> Jugad con poca luz. La tensión se multiplica.</div>
            </div>
          </section>

          {/* Aviso */}
          <section className="rounded-2xl border border-lime-500/20 bg-lime-500/5 p-6 flex flex-col gap-3">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <ShieldCheck className="h-5 w-5 text-lime-400" /> Bebe con responsabilidad
            </h2>
            <p className="text-sm text-muted leading-relaxed">
              Medusa es un juego de entretenimiento. Puedes jugar con agua o refrescos si lo prefieres. BeberGames promueve el consumo responsable de alcohol. Nunca bebas y conduzcas.
            </p>
          </section>

          <Link
            href="/juegos/medusa"
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-lime-500 to-green-600 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-lime-500/25 transition-all hover:scale-[1.02] hover:shadow-xl"
          >
            ¡Jugar ahora! <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
