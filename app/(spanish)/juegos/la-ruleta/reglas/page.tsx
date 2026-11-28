import Link from 'next/link';
import type { Metadata } from 'next';
import { PartyPopper, ChevronRight, Users, ShieldCheck, Dices, RotateCw } from 'lucide-react';

export const metadata: Metadata = {
  alternates: {
    canonical: "https://bebergames.com/juegos/la-ruleta/reglas",
  },
  title: 'Reglas de La Ruleta para Beber — Cómo Jugar',
  description: 'Gira la ruleta y que la suerte decida tu castigo. Descubre las reglas, castigos y cómo pasarlo genial con nuestro juego de ruleta para beber en grupo.',
};

export default function LaRuletaReglasPage() {
  return (
    <div className="flex flex-1 flex-col items-center px-4 py-12 sm:py-20">
      <div className="w-full max-w-3xl">
        <Link 
          href="/juegos/la-ruleta" 
          className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground transition-colors mb-8"
        >
          ← Volver al juego
        </Link>
        
        <header className="mb-12 flex flex-col gap-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 to-pink-500 shadow-lg shadow-rose-500/25">
            <PartyPopper className="h-8 w-8 text-white" />
          </div>
           <div>
            <h1 className="text-3xl font-extrabold sm:text-4xl mb-3">
              Cómo Jugar a La Ruleta
            </h1>
            <p className="text-muted text-lg leading-relaxed">
              Girad por turnos. Cada giro elige una de las 16 propuestas al azar. Puedes hacer la que salga o pasar sin penalización.
            </p>
          </div>
        </header>

        <div className="flex flex-col gap-8">
          
          {/* Materiales */}
          <section className="rounded-2xl border border-border bg-surface p-6 flex flex-col gap-4">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <Users className="h-5 w-5 text-rose-400" /> Lo que necesitas
            </h2>
            <ul className="text-sm text-muted space-y-2 leading-relaxed">
              <li>✅ <strong>Jugadores:</strong> Desde 2 personas (para un uno contra uno muy tenso) hasta todos los que queráis.</li>
              <li>✅ <strong>Dispositivo:</strong> Un teléfono móvil o una tablet colocada estratégicamente en el centro de la mesa con la app de BeberGames abierta.</li>
              <li>✅ <strong>Bebida opcional:</strong> Podéis jugar con agua, con un refresco o sin vaso.</li>
            </ul>
          </section>

          {/* Dinámica paso a paso */}
          <section className="rounded-2xl border border-border bg-surface p-6 flex flex-col gap-6">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <RotateCw className="h-5 w-5 text-rose-400" /> La Dinámica del Giro
            </h2>
            <div className="flex flex-col gap-5">
              {[
                {
                  paso: "1",
                  titulo: "Registro de Jugadores",
                  desc: "Añade los nombres de todos los jugadores en la configuración de la app antes de empezar. Solo necesitas hacerlo una vez.",
                },
                {
                  paso: "2",
                  titulo: "El Elegido",
                  desc: "Empieza la primera persona de la lista y los turnos siguen ese orden.",
                },
                {
                  paso: "3",
                  titulo: "El Giro de la Muerte",
                  desc: "En tu turno correspondiente, dale con decisión al botón central de girar la ruleta. Disfruta de esos segundos de tensión mientras ves la aguja ralentizarse.",
                },
                {
                  paso: "4",
                  titulo: "El resultado",
                  desc: "Cuando se pare el disco, lee la propuesta. Tanto si la haces como si prefieres pasar, pulsa «Siguiente jugador» y entrega el móvil.",
                },
              ].map(({ paso, titulo, desc }) => (
                <div key={paso} className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-pink-500 text-sm font-bold text-white">
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

          {/* Reglas de Oro */}
          <section className="rounded-2xl border border-border bg-surface p-6 flex flex-col gap-4">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <Dices className="h-5 w-5 text-rose-400" /> Qué puede salir en la ruleta
            </h2>
            <div className="flex flex-col gap-4 text-sm text-muted leading-relaxed">
              <p>
                Las 16 casillas tienen la misma probabilidad en cada giro. En «Brindis de grupo» puedes dedicar unas palabras sin beber. En «Haced la ola en cadena» levantáis los brazos por turnos.
              </p>
              <div className="rounded-lg bg-surface-hover p-4 border-l-4 border-rose-500">
                <p className="font-bold text-foreground mb-1 text-base">¿Y si prefiero pasar?</p>
                <p>
                  Puedes pasar cualquier casilla sin penalización. En «Verdad o pasa» tú decides qué contar. Si pasas, el turno sigue igual.
                </p>
              </div>
            </div>
          </section>

          {/* Variantes */}
          <section className="rounded-2xl border border-border bg-surface p-6 flex flex-col gap-4">
            <h2 className="text-lg font-bold">⚡ Variantes de Juego</h2>
            <div className="flex flex-col gap-3 text-sm text-muted leading-relaxed">
              <p>
                <strong className="text-foreground">Partida corta:</strong> Acordad cuántas vueltas a la mesa queréis jugar antes de empezar.
              </p>
              <p>
                 <strong className="text-foreground">Brindis temático:</strong> Si sale «Brindis de grupo», dedicádselo a una anécdota que recordéis con cariño.
              </p>
            </div>
          </section>

          {/* Aviso */}
          <section className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-6 flex flex-col gap-3">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <ShieldCheck className="h-5 w-5 text-rose-500" /> Bebe con precaución
            </h2>
            <p className="text-sm text-muted leading-relaxed">
              La casilla «Un sorbo pequeño, si te apetece» también se puede pasar. Si vuelve a salir, los sorbos no se acumulan.
            </p>
          </section>

          <Link
            href="/juegos/la-ruleta"
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-rose-500/25 transition-all hover:scale-[1.02] hover:shadow-xl mt-4"
          >
            ¡Tirar de la Ruleta! <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
