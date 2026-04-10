import Link from "next/link";
import type { Metadata } from "next";
import { Eye, Zap, Scale, Hand, Users, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Juegos para Beber Sin Materiales — Solo Necesitáis Gente y Bebidas",
  description:
    "Los mejores juegos para beber que no necesitan cartas, dados ni ningún material. Solo personas, bebidas y el móvil. Medusa, La Bomba, Yo Prefiero y más.",
};

const juegos = [
  {
    id: "medusa",
    nombre: "Medusa",
    descripcion:
      "Todos miran abajo. A la de 3, mira a alguien. Si os cruzáis la mirada… ¡MEDUSA! A beber.",
    icono: Eye,
    color: "from-lime-500 to-green-600",
    shadowColor: "shadow-lime-500/20",
    jugadores: "4+",
  },
  {
    id: "la-bomba",
    nombre: "La Bomba",
    descripcion:
      "Temporizador secreto. Pasa el móvil antes de que explote. ¡El que la tenga cuando explote bebe!",
    icono: Zap,
    color: "from-orange-500 to-red-500",
    shadowColor: "shadow-orange-500/20",
    jugadores: "3+",
  },
  {
    id: "yo-prefiero",
    nombre: "Yo Prefiero",
    descripcion:
      "A o B, sin excusas. El grupo elige su opción y la minoría bebe. ¡Más de 60 dilemas!",
    icono: Scale,
    color: "from-violet-500 to-fuchsia-500",
    shadowColor: "shadow-violet-500/20",
    jugadores: "3+",
  },
  {
    id: "quien-es-mas-probable",
    nombre: "Quién Es Más Probable",
    descripcion:
      "Lee la tarjeta, cuenta hasta 3 y señalad a la vez. ¡El más votado bebe!",
    icono: Hand,
    color: "from-cyan-500 to-blue-500",
    shadowColor: "shadow-cyan-500/20",
    jugadores: "3+",
  },
];

export default function SinMaterialesCategoryPage() {
  return (
    <div className="flex flex-1 flex-col items-center px-4 py-12 sm:py-20">
      <div className="w-full max-w-4xl text-center mb-12">
        <h1 className="text-3xl font-extrabold sm:text-5xl mb-4">
          Juegos para Beber{" "}
          <span className="bg-gradient-to-r from-lime-400 to-green-400 bg-clip-text text-transparent">
            Sin Materiales
          </span>
        </h1>
        <p className="text-muted max-w-2xl mx-auto">
          Sin cartas, sin dados, sin nada. Solo necesitáis gente, bebidas y el
          móvil. Perfectos para previas, botellones y fiestas improvisadas.
        </p>
      </div>

      <div className="grid gap-4 w-full max-w-4xl sm:grid-cols-2">
        {juegos.map((juego) => {
          const Icon = juego.icono;
          return (
            <Link
              key={juego.id}
              href={`/juegos/${juego.id}`}
              className={`group flex flex-col gap-4 rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:border-lime-500/30 hover:bg-surface-hover hover:shadow-xl hover:-translate-y-1 ${juego.shadowColor}`}
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${juego.color} shadow-lg ${juego.shadowColor}`}
              >
                <Icon className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-lg font-bold">{juego.nombre}</h3>
                <p className="text-sm leading-relaxed text-muted">
                  {juego.descripcion}
                </p>
              </div>
              <div className="mt-auto flex items-center justify-between pt-2 border-t border-border">
                <span className="flex items-center gap-1.5 text-xs text-muted">
                  <Users className="h-3.5 w-3.5" />
                  {juego.jugadores} jugadores
                </span>
                <span className="flex items-center gap-1 text-xs font-medium text-lime-400 transition-transform group-hover:translate-x-1">
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
            ¿Por qué jugar sin materiales?
          </h2>
          <div className="text-sm text-muted space-y-3 leading-relaxed">
            <p>
              A veces llegas a la fiesta y no hay cartas, no hay dados, no hay
              nada. Pero sí hay gente con ganas de pasarlo bien. Estos juegos
              son perfectos para esos momentos: solo necesitáis vuestras voces,
              vuestros ojos y un móvil con{" "}
              <Link href="/" className="text-accent hover:underline">
                BeberGames
              </Link>
              .
            </p>
            <p>
              <strong>Medusa</strong> es el más rápido — 3 segundos por ronda.{" "}
              <strong>La Bomba</strong> es el más tenso — nadie sabe cuándo
              explota. <strong>Yo Prefiero</strong> genera los mejores debates.
              Y <strong>Quién Es Más Probable</strong> saca los trapos sucios
              del grupo.
            </p>
            <p>
              Todos funcionan desde el móvil, sin descargar nada, sin registro y
              sin anuncios molestos. Abre la web y a jugar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
