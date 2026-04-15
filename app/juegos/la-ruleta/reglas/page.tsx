import Link from 'next/link';
import type { Metadata } from 'next';
import { PartyPopper, ChevronRight, Users, Zap, ShieldCheck, Dices, RotateCw } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Reglas de La Ruleta para Beber | Cómo Jugar',
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
              El clásico juego de casino, reconvertido en la máquina de generar castigos aleatorios perfecta para cualquier fiesta. Aquí no hay estrategia que valga; todo depende del puro azar y del destino.
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
              <li>✅ <strong>Bebestibles:</strong> Tened vuestras copas llenas y a mano. En este juego, beber no es una opción, es una probabilidad estadística.</li>
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
                  desc: "Por defecto, la ruleta digital seleccionará a un jugador al azar como el primero en desafiar a su destino.",
                },
                {
                  paso: "3",
                  titulo: "El Giro de la Muerte",
                  desc: "En tu turno correspondiente, dale con decisión al botón central de girar la ruleta. Disfruta de esos segundos de tensión mientras ves la aguja ralentizarse.",
                },
                {
                  paso: "4",
                  titulo: "La Sentencia",
                  desc: "Espera a que se detenga por completo y lee en voz alta la sentencia que te ha tocado. Cúmplela sin protestar y pasa el turno. Si la ruleta dice que bebas 3 tragos, bebes 3. Si dice que tú te salvas y obligas a beber al resto, ¡celebra tu enorme suerte!",
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
              <Dices className="h-5 w-5 text-rose-400" /> Regla de Oro: La Ruleta Manda
            </h2>
            <div className="flex flex-col gap-4 text-sm text-muted leading-relaxed">
              <p>
                Nuestra ruleta virtual incluye decenas de muescas con una variada y malévola gama de retos. A veces caerás en "casillas salvavidas" (como mandar beber a otros) y otras veces en "trampas mortales" donde te tocará beber el doble.
              </p>
              <div className="rounded-lg bg-surface-hover p-4 border-l-4 border-rose-500">
                <p className="font-bold text-foreground mb-1 text-base">Penalización por Cobardía</p>
                <p>
                  La regla fundamental e inquebrantable de este juego es que <strong>la ruleta es la ley</strong>. No te lo tomes como algo personal. Si algún jugador se niega rotundamente a cumplir el dictamen que le ha tocado, el castigo automático a pagar al grupo es hacer "fondo blanco" (beberse la copa entera del tirón, o al menos 8 tragos largos).
                </p>
              </div>
            </div>
          </section>

          {/* Variantes */}
          <section className="rounded-2xl border border-border bg-surface p-6 flex flex-col gap-4">
            <h2 className="text-lg font-bold">⚡ Variantes de Juego</h2>
            <div className="flex flex-col gap-3 text-sm text-muted leading-relaxed">
              <p>
                <strong className="text-foreground">Modo Sobreviviente:</strong> Inicia la partida determinando un número máximo de tiradas fallidas por jugador. Quien acumule tres reglas que le obliguen a beber personalmente, queda "eliminado" del juego, hasta que solo quede un campeón invicto.
              </p>
              <p>
                 <strong className="text-foreground">Doble Suerte:</strong> Si alguien cae en una casilla que no le gusta, puede pedir el "Tiro Doble". Sin embargo, si al tirar de nuevo vuelve a salir un castigo para beber, debe cumplir AMBOS simultáneamente.
              </p>
            </div>
          </section>

          {/* Aviso */}
          <section className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-6 flex flex-col gap-3">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <ShieldCheck className="h-5 w-5 text-rose-500" /> Bebe con precaución
            </h2>
            <p className="text-sm text-muted leading-relaxed">
              Los juegos de puro azar como La Ruleta pueden provocar que una misma persona tenga muy mala suerte sostenida y se vea obligada a beber demasiadas veces seguidas de forma injusta. El grupo debe poner freno si observa que alguien no lo está pasando bien. Sustituir los castigos alcohólicos por sorbos de refresco o repeticiones de algún ejercicio (flexiones/sentadillas) es siempre una variante fantástica.
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
