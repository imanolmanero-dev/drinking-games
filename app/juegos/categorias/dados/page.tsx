import Link from "next/link";
import type { Metadata } from "next";
import { Dice3, Users, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Juegos de Dados para Beber — Triman y Más",
  description:
    "Los mejores juegos de dados para beber. Juega al Triman desde el móvil con dado digital. Sin necesidad de dados físicos, gratis y sin descargas.",
};

const juegos = [
  {
    id: "triman",
    nombre: "Triman (El Señor del 3)",
    descripcion: "Lanza el dado y descubre quién bebe según las reglas. ¡El que saque 3 es el Triman!",
    icono: Dice3,
    color: "from-emerald-500 to-teal-500",
    shadowColor: "shadow-emerald-500/20",
    jugadores: "3+",
  },
];

export default function DadosCategoryPage() {
  return (
    <div className="flex flex-1 flex-col items-center px-4 py-12 sm:py-20">
      <div className="w-full max-w-4xl text-center mb-12">
        <h1 className="text-3xl font-extrabold sm:text-5xl mb-4">
          Juegos de <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Dados</span> para beber
        </h1>
        <p className="text-muted max-w-2xl mx-auto">
          Los juegos de mesa y dados son perfectos para grupos que buscan depender del azar. Descubre los mejores juegos de dados, como el clásico Triman.
        </p>
      </div>

      <div className="grid gap-4 w-full max-w-4xl sm:grid-cols-2">
        {juegos.map((juego) => {
          const Icon = juego.icono;
          return (
            <Link
              key={juego.id}
              href={`/juegos/${juego.id}`}
              className={`group flex flex-col gap-4 rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:border-emerald-500/30 hover:bg-surface-hover hover:shadow-xl hover:-translate-y-1 ${juego.shadowColor}`}
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${juego.color} shadow-lg ${juego.shadowColor}`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-lg font-bold">{juego.nombre}</h3>
                <p className="text-sm leading-relaxed text-muted">{juego.descripcion}</p>
              </div>
              <div className="mt-auto flex items-center justify-between pt-2 border-t border-border">
                <span className="flex items-center gap-1.5 text-xs text-muted">
                  <Users className="h-3.5 w-3.5" />
                  {juego.jugadores} jugadores
                </span>
                <span className="flex items-center gap-1 text-xs font-medium text-emerald-400 transition-transform group-hover:translate-x-1">
                  Jugar <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* SEO content */}
      <div className="w-full max-w-4xl mt-16">
        <div className="rounded-2xl border border-border bg-surface p-8">
          <h2 className="text-xl font-bold mb-4">
            Juegos de dados para beber: que el azar decida tu destino
          </h2>
          <div className="text-sm text-muted space-y-3 leading-relaxed">
            <p>
              Los juegos de dados para beber llevan décadas siendo los favoritos de las fiestas universitarias y las previas en casa. La razón es simple: no hay que pensar demasiado, no hay que recordar reglas complejas y el dado siempre tiene la última palabra. Tiras, obedeces, bebes o te salvas.
            </p>
            <p>
              El <Link href="/juegos/triman" className="text-accent hover:underline">Triman</Link> (también conocido como El Señor del 3) es el rey de los juegos de dados para beber. Su mecánica es adictiva: el jugador que saca un 3 se convierte en el Triman y queda maldito hasta que otro jugador lo libere sacando otro 3. Mientras tanto, cada ronda que pasa le toca beber.
            </p>
            <p>
              En BeberGames tienes el dado digital integrado: la app lanza el dado por ti, aplica las reglas automáticamente y lleva el control de quién es el Triman en cada momento. Sin dados físicos que se pierdan debajo del sofá ni discusiones sobre si el dado estaba torcido. Si quieres conocer todos los juegos de dados que existen, echa un vistazo a nuestra <Link href="/blog/juegos-para-beber-con-dados" className="text-accent hover:underline">guía completa de juegos de dados para beber</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
