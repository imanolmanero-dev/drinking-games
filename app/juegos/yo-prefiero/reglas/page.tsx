import Link from "next/link";
import type { Metadata } from "next";
import { Scale, ChevronRight, Users, Zap, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Cómo Jugar a Yo Prefiero — Reglas del Juego",
  description:
    "Aprende las reglas de Yo Prefiero, el juego de beber de dilemas. A o B, el grupo elige y la minoría bebe. Variaciones, consejos y más de 60 preguntas.",
};

export default function YoPrefieroReglasPage() {
  return (
    <div className="flex flex-1 flex-col items-center px-4 py-12 sm:py-20">
      <div className="w-full max-w-3xl">
        <Link href="/juegos/yo-prefiero" className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground transition-colors mb-8">
          ← Volver al juego
        </Link>

        <header className="mb-12 flex flex-col gap-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-lg shadow-violet-500/25">
            <Scale className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold sm:text-4xl mb-3">Cómo jugar a Yo Prefiero</h1>
            <p className="text-muted text-lg leading-relaxed">El juego de los dilemas imposibles. A o B — el grupo decide y la minoría paga con un trago.</p>
          </div>
        </header>

        <div className="flex flex-col gap-8">
          {/* Materiales */}
          <section className="rounded-2xl border border-border bg-surface p-6 flex flex-col gap-4">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <Users className="h-5 w-5 text-violet-400" /> Lo que necesitas
            </h2>
            <ul className="text-sm text-muted space-y-2 leading-relaxed">
              <li>✅ <strong>3 o más jugadores</strong></li>
              <li>✅ <strong>Bebidas</strong> para todos (lo que prefiráis 🍺🍷)</li>
              <li>✅ Este juego — ¡nada más!</li>
            </ul>
          </section>

          {/* Cómo se juega */}
          <section className="rounded-2xl border border-border bg-surface p-6 flex flex-col gap-6">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <Zap className="h-5 w-5 text-violet-400" /> Cómo se juega
            </h2>
            <div className="flex flex-col gap-5">
              {[
                { paso: "1", titulo: "Aparece un dilema", desc: "En la pantalla aparece un dilema con dos opciones: A y B. Por ejemplo: «¿Preferirías volar o ser invisible?»" },
                { paso: "2", titulo: "Cada uno elige en silencio", desc: "Todos eligen mentalmente (o en voz baja) su opción. Sin revelarla todavía — ¡hay que ser honesto!" },
                { paso: "3", titulo: "Revelar a la vez", desc: "A la cuenta de 3, todos levantan la mano o señalan: un dedo para la A, dos para la B." },
                { paso: "4", titulo: "La minoría bebe", desc: "Los que estén en minoría dan un trago. Si hay empate, todos beben (o nadie — como prefiráis)." },
                { paso: "5", titulo: "Siguiente dilema", desc: "Se pasa a la siguiente pregunta. El juego continúa hasta terminar todas las preguntas." },
              ].map(({ paso, titulo, desc }) => (
                <div key={paso} className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-sm font-bold text-white">{paso}</div>
                  <div>
                    <p className="font-semibold mb-1">{titulo}</p>
                    <p className="text-sm text-muted leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Variaciones */}
          <section className="rounded-2xl border border-border bg-surface p-6 flex flex-col gap-4">
            <h2 className="text-lg font-bold">⚡ Variaciones para subir el nivel</h2>
            <div className="flex flex-col gap-4 text-sm text-muted">
              <div><strong className="text-foreground">Modo Confesión:</strong> Quien queda en minoría debe explicar por qué eligió esa opción. Si la razón convence al grupo... ¡se salva del trago!</div>
              <div><strong className="text-foreground">Modo Debate:</strong> Antes de revelar, cada uno defiende su elección durante 30 segundos. Luego el grupo vota si fue convincente.</div>
              <div><strong className="text-foreground">Modo Ultra Picante:</strong> Activa el nivel Picante y el que quede solo en su elección bebe doble.</div>
              <div><strong className="text-foreground">Modo Parejas:</strong> Jugad en parejas. Si los dos miembros de la pareja no coinciden entre sí, ambos beben extra.</div>
            </div>
          </section>

          {/* Aviso */}
          <section className="rounded-2xl border border-violet-500/20 bg-violet-500/5 p-6 flex flex-col gap-3">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <ShieldCheck className="h-5 w-5 text-violet-400" /> Bebe con responsabilidad
            </h2>
            <p className="text-sm text-muted leading-relaxed">
              Yo Prefiero es un juego de entretenimiento. Puedes sustituir el alcohol por agua, refrescos o cualquier otra bebida. BeberGames promueve el consumo responsable. Si no deseas beber, siempre puedes pasar.
            </p>
          </section>

          <Link
            href="/juegos/yo-prefiero"
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:scale-[1.02] hover:shadow-xl"
          >
            ¡Jugar ahora! <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
