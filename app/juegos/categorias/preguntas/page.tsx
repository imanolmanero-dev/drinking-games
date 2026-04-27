import Link from "next/link";
import type { Metadata } from "next";
import { Wine, Sparkles, Hand, Scale, Users, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Juegos de Preguntas para Beber — Yo Nunca, Verdad o Reto y Más",
  description:
    "Los mejores juegos de preguntas para beber en grupo. Yo Nunca, Verdad o Reto, Quién Es Más Probable y Yo Prefiero. Gratis, sin descargas y desde el móvil.",
};

const juegos = [
  {
    id: "yo-nunca",
    nombre: "Yo Nunca",
    descripcion: "Di algo que nunca hayas hecho. Los que sí lo hayan hecho… ¡beben!",
    icono: Wine,
    color: "from-purple-500 to-pink-500",
    shadowColor: "shadow-purple-500/20",
    jugadores: "2+",
  },
  {
    id: "verdad-o-reto",
    nombre: "Verdad o Reto",
    descripcion: "Elige verdad o reto. Si no cumples… ¡fondo blanco!",
    icono: Sparkles,
    color: "from-amber-500 to-orange-500",
    shadowColor: "shadow-amber-500/20",
    jugadores: "3+",
  },
  {
    id: "quien-es-mas-probable",
    nombre: "Quién Es Más Probable",
    descripcion: "Lee la tarjeta, cuenta hasta 3 y señalad a la vez. ¡El más votado bebe!",
    icono: Hand,
    color: "from-cyan-500 to-blue-500",
    shadowColor: "shadow-cyan-500/20",
    jugadores: "3+",
  },
  {
    id: "yo-prefiero",
    nombre: "Yo Prefiero",
    descripcion: "A o B, sin excusas. El grupo elige y la minoría bebe. ¡Más de 60 dilemas!",
    icono: Scale,
    color: "from-violet-500 to-fuchsia-500",
    shadowColor: "shadow-violet-500/20",
    jugadores: "3+",
  },
];

export default function PreguntasCategoryPage() {
  return (
    <div className="flex flex-1 flex-col items-center px-4 py-12 sm:py-20">
      <div className="w-full max-w-4xl text-center mb-12">
        <h1 className="text-3xl font-extrabold sm:text-5xl mb-4">
          Juegos de <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Preguntas</span> para beber
        </h1>
        <p className="text-muted max-w-2xl mx-auto">
          ¿Quieres salseo y descubrir qué esconden tus amigos? Estos juegos sacarán a la luz la verdad.
        </p>
      </div>

      <div className="grid gap-4 w-full max-w-4xl sm:grid-cols-2 lg:grid-cols-3">
        {juegos.map((juego) => {
          const Icon = juego.icono;
          return (
            <Link
              key={juego.id}
              href={`/juegos/${juego.id}`}
              className={`group flex flex-col gap-4 rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:border-purple-500/30 hover:bg-surface-hover hover:shadow-xl hover:-translate-y-1 ${juego.shadowColor}`}
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
                <span className="flex items-center gap-1 text-xs font-medium text-purple-400 transition-transform group-hover:translate-x-1">
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
            Juegos de preguntas para beber: confesiones, debates y señalamientos
          </h2>
          <div className="text-sm text-muted space-y-3 leading-relaxed">
            <p>
              Los juegos de preguntas son el alma de cualquier previa porque van directos al grano: obligan a confesar, a debatir y a señalar al culpable del grupo. No necesitas cartas, dados ni ningún material físico — solo un móvil con BeberGames y ganas de descubrir los secretos de tus amigos.
            </p>
            <p>
              <Link href="/juegos/yo-nunca" className="text-accent hover:underline">Yo Nunca</Link> es el clásico de las confesiones: lees una frase y los que la hayan hecho beben. <Link href="/juegos/verdad-o-reto" className="text-accent hover:underline">Verdad o Reto</Link> sube la apuesta con preguntas comprometidas y retos físicos. <Link href="/juegos/quien-es-mas-probable" className="text-accent hover:underline">Quién Es Más Probable</Link> convierte al grupo en un jurado: todos señalan a la vez y el más votado bebe. Y <Link href="/juegos/yo-prefiero" className="text-accent hover:underline">Yo Prefiero</Link> plantea dilemas imposibles donde la minoría siempre pierde.
            </p>
            <p>
              Todos tienen niveles de intensidad (suave, normal y picante), así que puedes adaptarlos al momento de la noche. Ideal para romper el hielo al principio con modo suave y subir a picante cuando la fiesta ya esté caliente. Consulta nuestras <Link href="/blog/100-preguntas-yo-nunca" className="text-accent hover:underline">100 preguntas de Yo Nunca</Link> o las <Link href="/blog/preguntas-picantes-verdad-o-reto" className="text-accent hover:underline">preguntas picantes de Verdad o Reto</Link> para ver ejemplos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
