import Link from "next/link";
import type { Metadata } from "next";
import { Flame, Crown, Users, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Juegos de Cartas para Beber — Ring of Fire y El Rey de la Copa",
  description:
    "Los mejores juegos de cartas para beber online. Juega al Ring of Fire y al Rey de la Copa desde el móvil sin necesidad de una baraja física.",
};

const juegos = [
  {
    id: "ring-of-fire",
    nombre: "Ring of Fire",
    descripcion: "Roba cartas y cumple sus reglas. ¡El que saque el cuarto Rey se bebe la mezcla central!",
    icono: Flame,
    color: "from-red-500 to-rose-600",
    shadowColor: "shadow-red-500/20",
    jugadores: "2+",
  },
  {
    id: "rey-de-la-copa",
    nombre: "El Rey de la Copa",
    descripcion: "Roba cartas y cumple sus reglas. El que saque el 4º Rey bebe la copa entera. ¡El clásico!",
    icono: Crown,
    color: "from-amber-400 to-yellow-500",
    shadowColor: "shadow-amber-400/20",
    jugadores: "3+",
  },
];

export default function CartasCategoryPage() {
  return (
    <div className="flex flex-1 flex-col items-center px-4 py-12 sm:py-20">
      <div className="w-full max-w-4xl text-center mb-12">
        <h1 className="text-3xl font-extrabold sm:text-5xl mb-4">
          Juegos de <span className="bg-gradient-to-r from-red-400 to-rose-400 bg-clip-text text-transparent">Cartas</span> para beber
        </h1>
        <p className="text-muted max-w-2xl mx-auto">
          ¿Tienes una baraja a mano? Estos juegos no requieren más que cartas y algo para beber.
        </p>
      </div>

      <div className="grid gap-4 w-full max-w-4xl sm:grid-cols-2">
        {juegos.map((juego) => {
          const Icon = juego.icono;
          return (
            <Link
              key={juego.id}
              href={`/juegos/${juego.id}`}
              className={`group flex flex-col gap-4 rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:border-red-500/30 hover:bg-surface-hover hover:shadow-xl hover:-translate-y-1 ${juego.shadowColor}`}
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
                <span className="flex items-center gap-1 text-xs font-medium text-rose-400 transition-transform group-hover:translate-x-1">
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
            Juegos de cartas para beber: la baraja como excusa perfecta
          </h2>
          <div className="text-sm text-muted space-y-3 leading-relaxed">
            <p>
              Los juegos de cartas para beber son los grandes clásicos de las previas y fiestas en casa. La mecánica es simple: cada carta del mazo tiene una regla asociada, y el azar decide quién bebe, quién manda y quién sufre. Son juegos que funcionan con cualquier tamaño de grupo y que mantienen la tensión ronda tras ronda.
            </p>
            <p>
              En BeberGames tienes dos variantes digitales disponibles: el <Link href="/juegos/ring-of-fire" className="text-accent hover:underline">Ring of Fire</Link> (también conocido como Anillo de Fuego o Kings), el juego de cartas para beber más famoso del mundo con 13 reglas diferentes; y <Link href="/juegos/rey-de-la-copa" className="text-accent hover:underline">El Rey de la Copa</Link>, la adaptación española con sus propias reglas por carta y la temida Copa del Rey en el centro.
            </p>
            <p>
              La versión digital tiene una ventaja clara: no necesitas una baraja física, no se mojan las cartas con cerveza y la app recuerda las reglas por ti. Solo abre el móvil, elige tu juego y empieza. Si quieres conocer todas las reglas carta por carta, consulta nuestra <Link href="/blog/ring-of-fire-reglas-cartas" className="text-accent hover:underline">guía completa del Ring of Fire</Link> o la <Link href="/blog/rey-de-la-copa-reglas" className="text-accent hover:underline">guía del Rey de la Copa</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

