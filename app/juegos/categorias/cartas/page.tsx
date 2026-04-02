import Link from "next/link";
import { Flame, Users, ArrowRight } from "lucide-react";

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
    </div>
  );
}
