import Link from "next/link";
import type { Metadata } from "next";
import { Trophy, ChevronRight, Users, Zap, ShieldCheck, Target } from "lucide-react";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://bebergames.com/juegos/beer-pong/reglas",
  },
  title: "Cómo Jugar al Beer Pong — Reglas Completas",
  description:
    "Las reglas completas del Beer Pong: montaje, turnos, reglas especiales (Re-rack, Heating Up, Redemption) y cómo usar el árbitro virtual de BeberGames.",
};

export default function BeerPongReglasPage() {
  return (
    <div className="flex flex-1 flex-col items-center px-4 py-12 sm:py-20">
      <div className="w-full max-w-3xl">
        <Link href="/juegos/beer-pong" className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground transition-colors mb-8">
          ← Volver al juego
        </Link>

        <header className="mb-12 flex flex-col gap-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-400/25">
            <Trophy className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold sm:text-4xl mb-3">Cómo jugar al Beer Pong</h1>
            <p className="text-muted text-lg leading-relaxed">El deporte más noble de cualquier previa. Reglas oficiales y todas las variaciones.</p>
          </div>
        </header>

        <div className="flex flex-col gap-8">
          {/* Materiales */}
          <section className="rounded-2xl border border-border bg-surface p-6 flex flex-col gap-4">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <Users className="h-5 w-5 text-amber-400" /> Lo que necesitas
            </h2>
            <ul className="text-sm text-muted space-y-2 leading-relaxed">
              <li>✅ <strong>2 equipos</strong> (1-3 personas por equipo)</li>
              <li>✅ <strong>20 vasos de plástico</strong> (10 por equipo)</li>
              <li>✅ <strong>2 pelotas de ping-pong</strong></li>
              <li>✅ <strong>Una mesa larga</strong> (al menos 2 metros)</li>
              <li>✅ <strong>Agua</strong> para los vasos de puntería</li>
              <li>✅ <strong>BeberGames</strong> como árbitro digital (opcional pero recomendado)</li>
            </ul>
          </section>

          {/* Montaje */}
          <section className="rounded-2xl border border-border bg-surface p-6 flex flex-col gap-4">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <Target className="h-5 w-5 text-amber-400" /> Montaje inicial
            </h2>
            <div className="text-sm text-muted space-y-3 leading-relaxed">
              <p>Coloca <strong>10 vasos en triángulo</strong> en cada extremo de la mesa (como los bolos en un bowling). La punta del triángulo mira hacia el centro de la mesa.</p>
              <div className="rounded-xl bg-amber-500/5 border border-amber-500/20 p-4 font-mono text-center text-amber-300 text-xs">
                <p>● ● ● ●</p>
                <p>● ● ●</p>
                <p>● ●</p>
                <p>●</p>
                <p className="text-muted mt-2 font-sans normal-case">Formación de 10 vasos (vista desde arriba)</p>
              </div>
              <p>Pon agua en el fondo de cada vaso para darle estabilidad. Dejad las bebidas personales fuera de la zona de tiro.</p>
            </div>
          </section>

          {/* Reglas */}
          <section className="rounded-2xl border border-border bg-surface p-6 flex flex-col gap-6">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <Zap className="h-5 w-5 text-amber-400" /> Reglas básicas
            </h2>
            <div className="flex flex-col gap-5">
              {[
                { paso: "1", titulo: "Por turnos, cada equipo lanza", desc: "El equipo atacante lanza una pelota intentando que caiga dentro de un vaso del equipo rival. Cada jugador del equipo lanza una vez por turno." },
                { paso: "2", titulo: "Retirad el vaso", desc: "Cuando entre la pelota, retira ese vaso y tócalo en la pantalla del árbitro." },
                { paso: "3", titulo: "Si rebota en la mesa y entra", desc: "La defensa puede desviar la pelota después del bote. Si entra, retirad ese vaso y otro que quede en pie. Marcad los dos en el móvil." },
                { paso: "4", titulo: "Victoria", desc: "El árbitro da la victoria a quien retire el último vaso rival. Podéis volver a preparar los triángulos para la revancha." },
              ].map(({ paso, titulo, desc }) => (
                <div key={paso} className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-sm font-bold text-white">{paso}</div>
                  <div>
                    <p className="font-semibold mb-1">{titulo}</p>
                    <p className="text-sm text-muted leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Reglas especiales */}
          <section className="rounded-2xl border border-border bg-surface p-6 flex flex-col gap-4">
            <h2 className="text-lg font-bold">⚡ Reglas especiales</h2>
            <div className="flex flex-col gap-4 text-sm text-muted leading-relaxed">
              <div className="rounded-lg bg-surface-hover p-3">
                <p className="font-semibold text-foreground mb-1">🔄 Re-rack (Reorganización)</p>
                <p>Con cuatro vasos o menos en el lado defensor podéis juntarlos en la mesa. Marcad el re-rack en el móvil. Cada lado dispone de uno por partida.</p>
              </div>
              <div className="rounded-lg bg-surface-hover p-3">
                <p className="font-semibold text-foreground mb-1">🔥 Heating Up (On Fire)</p>
                <p>Si un mismo jugador encesta <strong>2 seguidas</strong>, su equipo puede gritar &quot;¡Heating up!&quot;. Si encesta una tercera, está &quot;On Fire&quot; y puede seguir lanzando hasta que falle.</p>
              </div>
              <div className="rounded-lg bg-surface-hover p-3">
                <p className="font-semibold text-foreground mb-1">🎯 Redemption (Salvación)</p>
                <p>Si pactáis redención, resolvedla en la mesa tras el resultado del árbitro. El rival lanza hasta fallar. Si retira todos los vasos, preparad tres por equipo para la prórroga.</p>
              </div>
              <div className="rounded-lg bg-surface-hover p-3">
                <p className="font-semibold text-foreground mb-1">💧 Vaso de agua</p>
                <p>Ten siempre un vaso de agua en la mesa para limpiar la pelota entre tiros. La pelota del suelo directamente al vaso es pérdida de turno.</p>
              </div>
            </div>
          </section>

          {/* Usando el árbitro */}
          <section className="rounded-2xl border border-amber-400/20 bg-amber-400/5 p-6 flex flex-col gap-4">
            <h2 className="text-lg font-bold text-amber-400">📱 Cómo usar el árbitro virtual</h2>
            <div className="flex flex-col gap-2 text-sm text-muted leading-relaxed">
              <p>El árbitro virtual de BeberGames os facilita el seguimiento de la partida:</p>
              <ul className="space-y-2 mt-2">
                <li>🍺 <strong>Toca un vaso</strong> para marcarlo como hundido</li>
                <li>🔄 <strong>Botón Re-rack:</strong> actívalo cuando el equipo lo pida (solo 1 vez)</li>
                <li>⚡ <strong>Botón Desafío:</strong> genera una regla especial aleatoria</li>
                <li>🔥 <strong>On Fire</strong> se activa automáticamente si encestas 2 seguidas</li>
                <li>➡️ <strong>Fin de turno:</strong> cambia al equipo contrario</li>
              </ul>
            </div>
          </section>

          {/* Aviso */}
          <section className="rounded-2xl border border-border bg-surface p-6 flex flex-col gap-3">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <ShieldCheck className="h-5 w-5 text-amber-400" /> Bebe con responsabilidad
            </h2>
            <p className="text-sm text-muted leading-relaxed">
              Usad agua en los vasos de juego. Cada persona decide si quiere tomar algo de su propia bebida, aparte de la partida.
            </p>
          </section>

          <Link
            href="/juegos/beer-pong"
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-amber-400/25 transition-all hover:scale-[1.02] hover:shadow-xl"
          >
            ¡Empezar partida! <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
