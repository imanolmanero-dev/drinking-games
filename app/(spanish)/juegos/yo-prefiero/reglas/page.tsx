import Link from "next/link";
import type { Metadata } from "next";
import { Scale, ChevronRight, Users, Zap, ShieldCheck, HelpCircle } from "lucide-react";
import { FAQJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://bebergames.com/juegos/yo-prefiero/reglas",
  },
  title: "Cómo Jugar a Yo Prefiero — Reglas del Juego",
  description:
    "Cómo jugar a Yo Prefiero: elegid A o B, contad los votos en la mesa y comentad el dilema. Hay 60 dilemas repartidos por intensidad.",
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
            <p className="text-muted text-lg leading-relaxed">¿A o B? Comparad lo que elige cada persona y descubrid si alguien ha pensado como vosotros.</p>
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
              <li>Un móvil para leer las dos opciones</li>
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
                { paso: "2", titulo: "Piensa tu respuesta", desc: "Puedes elegir una opción o abstenerte." },
                { paso: "3", titulo: "Revelar a la vez", desc: "A la de tres, un dedo para A, dos para B o la mano bajada para pasar." },
                { paso: "4", titulo: "Contar las manos", desc: "Comparad los votos en la mesa. Puede haber empate, unanimidad o una mayoría clara. Si nadie vota, avanzad." },
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
              <div><strong>Conversación:</strong> Quien quiera puede contar qué detalle le hizo decidirse.</div>
              <div><strong>Debate:</strong> Inventad un argumento a favor de cualquiera de las dos opciones.</div>
              <div><strong>Nivel picante:</strong> Podéis saltar un dilema en cuanto aparezca.</div>
              <div><strong>En pareja:</strong> Antes de votar podéis intentar adivinar qué elegirá la otra persona.</div>
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

          {/* Preguntas Frecuentes */}
          <section className="rounded-2xl border border-border bg-surface p-6 flex flex-col gap-6">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <HelpCircle className="h-5 w-5 text-violet-400" /> Preguntas Frecuentes (FAQ)
            </h2>
            <div className="flex flex-col gap-5">
              {[
                {
                  q: "¿Qué pasa si hay un empate exacto en los votos?",
                  a: "Si empatan A y B, podéis comentar el resultado o pasar al siguiente dilema. Si todos coinciden, hay unanimidad.",
                },
                {
                  q: "¿Puede alguien negarse a votar?",
                  a: "Sí. Puedes abstenerte con la mano bajada y pasar sin dar explicaciones. Si nadie vota, avanzad al siguiente dilema.",
                },
                {
                  q: "¿Cuántas preguntas tiene la aplicación?",
                  a: "Hay 60 dilemas repartidos por intensidad. La partida usa los niveles que seleccionéis.",
                },
                {
                  q: "¿Es apto para jugar por videollamada?",
                  a: "¡Totalmente! Es uno de los mejores juegos para videollamadas. Solo necesitas que una persona comparta pantalla o lea la pregunta en voz alta. Para votar, todos pueden mostrar 1 o 2 dedos a la cámara al mismo tiempo. Funciona perfecto en Zoom, Discord o WhatsApp.",
                },
              ].map(({ q, a }, idx) => (
                <div key={idx} className="flex flex-col gap-1">
                  <h3 className="font-semibold text-sm">❓ {q}</h3>
                  <p className="text-sm text-muted leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
            <FAQJsonLd
              faqs={[
                {
                  q: "¿Qué pasa si hay un empate exacto en los votos?",
                  a: "Si empatan A y B, podéis comentar el resultado o pasar al siguiente dilema. Si todos coinciden, hay unanimidad.",
                },
                {
                  q: "¿Puede alguien negarse a votar?",
                  a: "Sí. Puedes abstenerte con la mano bajada y pasar sin dar explicaciones. Si nadie vota, avanzad al siguiente dilema.",
                },
                {
                  q: "¿Cuántas preguntas tiene la aplicación?",
                  a: "Hay 60 dilemas repartidos por intensidad. La partida usa los niveles que seleccionéis.",
                },
                {
                  q: "¿Es apto para jugar por videollamada?",
                  a: "¡Totalmente! Es uno de los mejores juegos para videollamadas. Solo necesitas que una persona comparta pantalla o lea la pregunta en voz alta. Para votar, todos pueden mostrar 1 o 2 dedos a la cámara al mismo tiempo. Funciona perfecto en Zoom, Discord o WhatsApp.",
                },
              ]}
            />
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
