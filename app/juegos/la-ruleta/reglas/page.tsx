import Link from 'next/link';
import { PartyPopper, ChevronLeft } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reglas de La Ruleta para Beber | Cómo Jugar',
  description: 'Gira la ruleta y que la suerte decida tu castigo. Descubre las reglas y cómo pasarlo genial con nuestro juego de ruleta para beber.',
}

export default function LaRuletaReglasPage() {
  return (
    <div className="flex flex-1 flex-col mx-auto max-w-3xl w-full px-4 py-12">
      <Link href="/juegos/la-ruleta" className="inline-flex items-center gap-2 text-sm text-muted hover:text-rose-500 transition-colors mb-6">
        <ChevronLeft className="h-4 w-4" />
        Volver al juego
      </Link>
      
      <div className="flex items-center gap-4 mb-8">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 to-pink-500 shadow-lg shadow-rose-500/25">
          <PartyPopper className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Cómo Jugar a La Ruleta</h1>
      </div>

      <div className="prose prose-invert prose-p:text-muted prose-li:text-muted max-w-none prose-headings:text-foreground">
        <h2>El clásico juego de casino, versión Fiestas</h2>
        <p>Inspirado en la famosa ruleta rusa, <em>La Ruleta para Beber</em> es la forma más rápida y directa de encender cualquier reunión. Aquí no hay estrategia que valga; todo depende del puro azar y de tu suerte. En BeberGames hemos diseñado una ruleta virtual con decenas de castigos y situaciones inesperadas para que cada giro sea una sorpresa.</p>

        <h2>Lo que necesitas para jugar</h2>
        <ul>
          <li><strong>Jugadores:</strong> Desde 2 personas hasta todos los que queráis.</li>
          <li><strong>Dispositivo:</strong> Un móvil o tablet en el centro de la mesa con <em>BeberGames</em> abierto.</li>
          <li><strong>Bebestibles:</strong> Tened vuestras copas llenas y a mano.</li>
        </ul>

        <h2>Dinámica del juego paso a paso</h2>
        <p>No hay juego más fácil de explicar a tus amigos cuando ya llevan unas copas de más:</p>
        <ol>
          <li>Añade los nombres de todos los jugadores en la configuración antes de empezar.</li>
          <li>Por defecto, la ruleta seleccionará a un jugador al azar como el primero.</li>
          <li>En tu turno, dale con decisión al botón de girar la ruleta.</li>
          <li>Espera con tensión a que se detenga y lee en voz alta la sentencia que te ha tocado.</li>
          <li><strong>¡Cúmplelo!</strong> Si la ruleta dice que bebas 3 tragos, bebes 3. Si dice que tú te salvas y bebe el resto, ¡celebra tu suerte!</li>
        </ol>

        <h2>Regla de Oro (Penalización por Cobardía)</h2>
        <p>La ruleta incluye una variada gama de retos y "trampas" donde a veces te salvas y otras te toca beber el doble. La regla fundamental es que <strong>la ruleta manda</strong>. No te lo tomes como algo personal. Si algún jugador se niega a cumplir el dictamen de la ruleta, el castigo automático es hacer "fondo blanco" (beberse la copa entera del tirón).</p>
      </div>

      <div className="mt-12 flex justify-center">
        <Link href="/juegos/la-ruleta" className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-rose-500/25 transition-all hover:scale-105">
          Jugar La Ruleta Ahora
        </Link>
      </div>
    </div>
  );
}
