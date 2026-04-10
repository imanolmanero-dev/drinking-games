import Link from "next/link";
import type { Metadata } from "next";
import { Zap, ChevronRight, Users, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Reglas de La Bomba — Cómo Jugar al Juego de la Bomba",
  description:
    "Aprende a jugar a La Bomba, el juego de beber del temporizador secreto. Pasa el móvil antes de que explote. El que la tenga cuando explote bebe. Reglas y variaciones.",
};

export default function LaBombaReglasPage() {
  return (
    <div className="flex flex-1 flex-col items-center px-4 py-12 sm:py-20">
      <div className="w-full max-w-3xl">
        <Link
          href="/juegos/la-bomba"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground transition-colors mb-8"
        >
          ← Volver al juego
        </Link>

        <header className="mb-12 flex flex-col gap-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 shadow-lg shadow-orange-500/25">
            <Zap className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold sm:text-4xl mb-3">
              Cómo jugar a La Bomba
            </h1>
            <p className="text-muted text-lg leading-relaxed">
              Un temporizador secreto. Un móvil que pasa de mano en mano. El
              que tenga la bomba cuando explote bebe. Así de simple, así de
              tenso.
            </p>
          </div>
        </header>

        <div className="flex flex-col gap-8">
          <section className="rounded-2xl border border-border bg-surface p-6 flex flex-col gap-4">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <Users className="h-5 w-5 text-orange-400" /> Lo que necesitas
            </h2>
            <ul className="text-sm text-muted space-y-2 leading-relaxed">
              <li>✅ <strong>3 o más jugadores</strong> (cuantos más, más tenso)</li>
              <li>✅ <strong>Un móvil</strong> con este juego</li>
              <li>✅ <strong>Bebidas</strong> para todos</li>
              <li>✅ Reflejos rápidos y sangre fría 😅</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-border bg-surface p-6 flex flex-col gap-6">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <Zap className="h-5 w-5 text-orange-400" /> Cómo se juega
            </h2>
            <div className="flex flex-col gap-5">
              {[
                {
                  paso: "1",
                  titulo: "Introducir jugadores (opcional)",
                  desc: "Puedes añadir los nombres de los jugadores para que la app lleve el control de quién la tiene. O simplemente pasar el móvil sin nombres — funciona igual.",
                },
                {
                  paso: "2",
                  titulo: "¡Encender la mecha!",
                  desc: "Pulsa el botón para iniciar la ronda. La bomba empieza a contar... pero el temporizador es SECRETO. Nadie sabe cuántos segundos tiene.",
                },
                {
                  paso: "3",
                  titulo: "¡Pasar la bomba!",
                  desc: "El jugador que la tiene pulsa '¡PASAR BOMBA!' o fisicamente pasa el móvil al siguiente. ¡Cuanto más rápido la pases, mejor!",
                },
                {
                  paso: "4",
                  titulo: "¡BOOM! — El que la tiene bebe",
                  desc: "Cuando el temporizador llega a cero, la bomba explota. La persona que la tenga en ese momento bebe. Sin excusas.",
                },
                {
                  paso: "5",
                  titulo: "Siguiente ronda",
                  desc: "Cada ronda tiene un tiempo diferente (entre 12 y 40 segundos, aleatorio). La tensión nunca es la misma. 12 rondas en total.",
                },
              ].map(({ paso, titulo, desc }) => (
                <div key={paso} className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-red-500 text-sm font-bold text-white">
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

          <section className="rounded-2xl border border-border bg-surface p-6 flex flex-col gap-4">
            <h2 className="text-lg font-bold">⚡ Variaciones</h2>
            <div className="flex flex-col gap-4 text-sm text-muted">
              <div>
                <strong className="text-foreground">La Bomba con Retos:</strong>{" "}
                Antes de pasar la bomba, el jugador debe completar un reto rápido
                (decir 3 capitales, cantar un estribillo, etc.). Si falla, bebe
                aunque luego explote en otro.
              </div>
              <div>
                <strong className="text-foreground">La Bomba Inversa:</strong>{" "}
                La persona que tenga la bomba cuando explote decide quién del
                grupo bebe — ¡no necesariamente ella misma!
              </div>
              <div>
                <strong className="text-foreground">La Bomba Rápida:</strong>{" "}
                Reduce el tiempo máximo a 20 segundos. La tensión se multiplica.
                Solo apta para veteranos.
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-orange-500/20 bg-orange-500/5 p-6 flex flex-col gap-3">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <ShieldCheck className="h-5 w-5 text-orange-400" /> Bebe con
              responsabilidad
            </h2>
            <p className="text-sm text-muted leading-relaxed">
              La Bomba es un juego de entretenimiento. Puedes jugar con agua o
              refrescos. Nadie está obligado a beber alcohol. BeberGames promueve
              el consumo responsable y la diversión segura.
            </p>
          </section>

          <Link
            href="/juegos/la-bomba"
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition-all hover:scale-[1.02] hover:shadow-xl"
          >
            ¡Encender la mecha! <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
