import Link from "next/link";
import type { Metadata } from "next";
import { Wine, ChevronRight, Users, Zap, ShieldCheck, Flame, MessageCircleQuestion } from "lucide-react";

export const metadata: Metadata = {
  title: "Cómo Jugar a Yo Nunca — Reglas Completas y Trucos",
  description:
    "Descubre las reglas del clásico juego para beber Yo Nunca. Qué necesitas, cómo se juega, variantes extremas y todo lo necesario para pasarlo genial rompiendo el hielo.",
};

export default function YoNuncaReglasPage() {
  return (
    <div className="flex flex-1 flex-col items-center px-4 py-12 sm:py-20">
      <div className="w-full max-w-3xl">
        <Link
          href="/juegos/yo-nunca"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground transition-colors mb-8"
        >
          ← Volver al juego
        </Link>

        <header className="mb-12 flex flex-col gap-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/25">
            <Wine className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold sm:text-4xl mb-3">
              Cómo Jugar a Yo Nunca
            </h1>
            <p className="text-muted text-lg leading-relaxed">
              Conocido internacionalmente como "Never Have I Ever", este es sin duda el rey indiscutible de los juegos para romper el hielo. Saca a la luz verdades ocultas de forma divertida y sin presiones directas.
            </p>
          </div>
        </header>

        <div className="flex flex-col gap-8">
          {/* Materiales */}
          <section className="rounded-2xl border border-border bg-surface p-6 flex flex-col gap-4">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <Users className="h-5 w-5 text-purple-400" /> Lo que necesitas
            </h2>
            <ul className="text-sm text-muted space-y-2 leading-relaxed">
              <li>✅ <strong>Jugadores:</strong> Mínimo 2 personas (el punto ideal está entre 4 y 10).</li>
              <li>✅ <strong>Bebida:</strong> Vuestras copas llenas en todo momento.</li>
              <li>✅ <strong>Sinceridad:</strong> La regla de oro. Si mientes y te pillan... ¡toca beber el doble!</li>
              <li>✅ <strong>Nuestra aplicación:</strong> Que te servirá para leer las más de 500 frases seleccionadas a mano.</li>
            </ul>
          </section>

          {/* Dinámica paso a paso */}
          <section className="rounded-2xl border border-border bg-surface p-6 flex flex-col gap-6">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <Zap className="h-5 w-5 text-purple-400" /> Dinámica paso a paso
            </h2>
            <div className="flex flex-col gap-5">
              {[
                {
                  paso: "1",
                  titulo: "Preparación",
                  desc: "Todos los jugadores deben estar sentados en círculo con su vaso bien lleno.",
                },
                {
                  paso: "2",
                  titulo: "Configuración en la app",
                  desc: "Añadid todos los nombres en la aplicación de BeberGames y elegid el nivel de intensidad en el que queréis jugar (Suave, Normal o Picante).",
                },
                {
                  paso: "3",
                  titulo: "La confesión",
                  desc: "La pantalla mostrará una afirmación que empieza por 'Yo nunca he...' o 'Yo nunca...'. La persona que tenga el dispositivo debe leerla en voz alta para que todo el mundo la escuche.",
                },
                {
                  paso: "4",
                  titulo: "El momento de la verdad",
                  desc: "Todos los que SÍ hayan hecho lo que dice la tarjeta alguna vez en su vida, deben dar un trago a su bebida. Los que nunca lo hayan hecho se salvan por esta ronda.",
                },
              ].map(({ paso, titulo, desc }) => (
                <div key={paso} className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-sm font-bold text-white">
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

          {/* Intensidades */}
          <section className="rounded-2xl border border-border bg-surface p-6 flex flex-col gap-4">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <Flame className="h-5 w-5 text-purple-400" /> Explicación de Nuestras Intensidades
            </h2>
            <div className="flex flex-col gap-4 text-sm text-muted">
              <div className="rounded-lg bg-surface-hover p-4 border-l-4 border-emerald-500">
                <p className="font-bold text-foreground mb-1 text-base">🟢 Soft (Suave)</p>
                <p>Situaciones cotidianas, tontas y graciosas. Ideal para calentar motores, jugar en familia o con gente que acabas de conocer. Nadie se sentirá incómodo.</p>
              </div>
              <div className="rounded-lg bg-surface-hover p-4 border-l-4 border-yellow-500">
                <p className="font-bold text-foreground mb-1 text-base">🟡 Normal (Salseo)</p>
                <p>Mentirijillas, situaciones algo vergonzosas, pequeñas ilegalidades y exparejas. El nivel clásico perfecto para ese momento en que la fiesta empieza a animarse.</p>
              </div>
              <div className="rounded-lg bg-surface-hover p-4 border-l-4 border-red-500">
                <p className="font-bold text-foreground mb-1 text-base">🔴 Picante (Hot)</p>
                <p>Solo recomendado para grupos de confianza sin tabúes morales. Toca temas sobre sexo, secretos íntimos inconfesables, traiciones y límites cruzados.</p>
              </div>
            </div>
          </section>

          {/* Reglas Caseras (Hardcore) */}
          <section className="rounded-2xl border border-border bg-surface p-6 flex flex-col gap-4">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <MessageCircleQuestion className="h-5 w-5 text-purple-400" /> Reglas caseras (Modo Hardcore)
            </h2>
            <div className="flex flex-col gap-4 text-sm text-muted leading-relaxed">
              <p>Si la partida está demasiado tranquila y queréis subir el nivel, aplicad estas variaciones que son ya un estándar en muchas universidades:</p>
              
              <div className="mt-2 space-y-4">
                <div>
                  <strong className="text-foreground block mb-1">📖 La historia completa</strong>
                  Si tras leer una frase, eres la ÚNICA persona de la mesa que bebe, estás moralmente obligado a explicar detalladamente la historia de qué pasó y cómo ocurrió. Prepárate para ser juzgado.
                </div>
                <div>
                  <strong className="text-foreground block mb-1">😴 Solidaridad (o castigo por aburridos)</strong>
                  Si sale una frase picante o divertida y absolutamente nadie en el círculo bebe, significa que sois un grupo muy aburrido. Todos deberéis beber un trago simbólico de castigo.
                </div>
                <div>
                  <strong className="text-foreground block mb-1">🕵️‍♂️ El Detective</strong>
                  Si un jugador bebe, pero tú estás absolutamente seguro de que otro jugador también lo ha hecho y no está bebiendo (es decir, está mintiendo), puedes acusarlo. Si el grupo vota que miente, el infractor bebe 5 tragos seguidos.
                </div>
              </div>
            </div>
          </section>

          {/* Aviso */}
          <section className="rounded-2xl border border-purple-500/20 bg-purple-500/5 p-6 flex flex-col gap-3">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <ShieldCheck className="h-5 w-5 text-purple-400" /> Bebe con responsabilidad
            </h2>
            <p className="text-sm text-muted leading-relaxed">
              El Yo Nunca es un juego para conocer grandes historias de tus amigos. Es perfectamente disfrutable usando cerveza sin alcohol, agua, refrescos o zumos. BeberGames promueve el consumo responsable de alcohol en todo momento e insta a detener el juego si algún jugador se siente presionado.
            </p>
          </section>

          <Link
            href="/juegos/yo-nunca"
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition-all hover:scale-[1.02] hover:shadow-xl mt-4"
          >
            ¡Empezar a jugar! <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
