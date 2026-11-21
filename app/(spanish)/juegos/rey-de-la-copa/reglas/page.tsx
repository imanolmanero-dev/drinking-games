import Link from "next/link";
import type { Metadata } from "next";
import { Crown, ChevronRight, Users, Zap, ShieldCheck, HelpCircle } from "lucide-react";
import { reglasCartas } from "@/lib/data/rey-de-la-copa";
import { FAQJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://bebergames.com/juegos/rey-de-la-copa/reglas",
  },
  title: "Reglas de El Rey de la Copa — Cómo Jugar",
  description:
    "Consulta las reglas de las 13 cartas del Rey de la Copa, cómo jugar la cascada y cómo cerrar la partida al cuarto rey.",
};

export default function ReyReglasPage() {
  return (
    <div className="flex flex-1 flex-col items-center px-4 py-12 sm:py-20">
      <div className="w-full max-w-3xl">
        <Link
          href="/juegos/rey-de-la-copa"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground transition-colors mb-8"
        >
          ← Volver al juego
        </Link>

        <header className="mb-12 flex flex-col gap-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 shadow-lg shadow-amber-400/25">
            <Crown className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold sm:text-4xl mb-3">
              Reglas de El Rey de la Copa
            </h1>
            <p className="text-muted text-lg leading-relaxed">
              El clásico juego de cartas para beber. Cada carta tiene una regla
              diferente y el cuarto rey cierra la partida.
            </p>
          </div>
        </header>

        <div className="flex flex-col gap-8">
          <section className="rounded-2xl border border-border bg-surface p-6 flex flex-col gap-4">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <Users className="h-5 w-5 text-amber-400" /> Lo que necesitas
            </h2>
            <ul className="text-sm text-muted space-y-2 leading-relaxed">
              <li>✅ <strong>3 o más jugadores</strong></li>
              <li>Espacio para que todos vean la carta</li>
              <li>✅ <strong>Un vaso grande central</strong> — la Copa del Rey</li>
              <li>✅ Este juego — ¡la baraja es virtual!</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-border bg-surface p-6 flex flex-col gap-6">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <Zap className="h-5 w-5 text-amber-400" /> Cómo se juega
            </h2>
            <div className="flex flex-col gap-5">
              {[
                {
                  paso: "1",
                  titulo: "Poneros en círculo",
                  desc: "Colocad la copa en el centro. Puede quedarse vacía toda la partida.",
                },
                {
                  paso: "2",
                  titulo: "Robar cartas por turnos",
                  desc: "En orden, cada jugador pulsa 'Robar carta'. La carta muestra su regla y puedes probarla o pasar sin penalización.",
                },
                {
                  paso: "3",
                  titulo: "Reglas especiales de los Reyes",
                  desc: "Los tres primeros reyes permiten una aportación opcional. Al cuarto rey se retira la copa y termina la partida.",
                },
                {
                  paso: "4",
                  titulo: "La partida termina",
                  desc: "Cuando se acaba la baraja (52 cartas) o cuando alguien saca el 4º Rey.",
                },
              ].map(({ paso, titulo, desc }) => (
                <div key={paso} className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 text-sm font-bold text-white">
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

          {/* All card rules */}
          <section className="rounded-2xl border border-border bg-surface p-6 flex flex-col gap-4">
            <h2 className="text-lg font-bold">🃏 Reglas de cada carta</h2>
            <div className="flex flex-col gap-3">
              {reglasCartas.map((regla) => (
                <div
                  key={regla.valor}
                  className={`flex gap-4 rounded-xl p-4 ${
                    regla.esCopa
                      ? "border border-amber-400/30 bg-amber-400/8"
                      : "border border-border bg-background"
                  }`}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-hover text-lg font-black">
                    {regla.valor}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">
                      {regla.emoji} {regla.titulo}
                    </p>
                    <p className="text-xs text-muted leading-relaxed mt-1">
                      {regla.descripcion}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-amber-400/20 bg-amber-400/5 p-6 flex flex-col gap-3">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <ShieldCheck className="h-5 w-5 text-amber-400" /> Bebe con responsabilidad
            </h2>
            <p className="text-sm text-muted leading-relaxed">
              El Rey de la Copa es un juego de entretenimiento. Puedes usar agua, zumos o refrescos. Nunca presiones a nadie a beber más de lo que quiera. BeberGames promueve el consumo responsable.
            </p>
          </section>

          <section className="rounded-2xl border border-border bg-surface p-6 flex flex-col gap-6">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <HelpCircle className="h-5 w-5 text-amber-400" /> Preguntas Frecuentes (FAQ)
            </h2>
            <div className="flex flex-col gap-5">
              {[
                {
                  q: "¿Qué pasa si se rompe el círculo de cartas en la vida real?",
                  a: "Volved a juntar las cartas y continuad. Romper el círculo no tiene penalización.",
                },
                {
                  q: "¿Se pueden cambiar las reglas de las cartas?",
                  a: "Sí. La pantalla muestra nuestra variante. Acordad cualquier cambio en la mesa antes de empezar y respetad a quien prefiera pasar.",
                },
                {
                  q: "¿Qué cantidad hay que echar en la Copa del Rey?",
                  a: "Puedes dejar la copa vacía o añadir una pequeña cantidad cuando salga uno de los tres primeros reyes. Al cuarto rey se aparta y se desecha el contenido.",
                },
                {
                  q: "¿Se puede jugar al Rey de la Copa con 2 personas?",
                  a: "No es lo ideal. El juego está diseñado para grupos de 3 o más personas, siendo el número perfecto entre 5 y 8 jugadores. Si solo sois dos, muchas de las cartas pierden su gracia (como la regla, los pulgares o señalar). Si sois dos, os recomendamos probar otros juegos más directos como 'Verdad o Reto' o 'Yo Nunca'.",
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
                  q: "¿Qué pasa si se rompe el círculo de cartas en la vida real?",
                  a: "Volved a juntar las cartas y continuad. Romper el círculo no tiene penalización.",
                },
                {
                  q: "¿Se pueden cambiar las reglas de las cartas?",
                  a: "Sí. La pantalla muestra nuestra variante. Acordad cualquier cambio en la mesa antes de empezar y respetad a quien prefiera pasar.",
                },
                {
                  q: "¿Qué cantidad hay que echar en la Copa del Rey?",
                  a: "Puedes dejar la copa vacía o añadir una pequeña cantidad cuando salga uno de los tres primeros reyes. Al cuarto rey se aparta y se desecha el contenido.",
                },
                {
                  q: "¿Se puede jugar al Rey de la Copa con 2 personas?",
                  a: "No es lo ideal. El juego está diseñado para grupos de 3 o más personas, siendo el número perfecto entre 5 y 8 jugadores.",
                },
              ]}
            />
          </section>

          <Link
            href="/juegos/rey-de-la-copa"
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-amber-400/25 transition-all hover:scale-[1.02] hover:shadow-xl"
          >
            ¡Jugar ahora! <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
