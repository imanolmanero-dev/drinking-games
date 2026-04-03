import Link from 'next/link';
import { Flame, ChevronLeft } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reglas de Ring of Fire (Copa del Rey) | Cómo Jugar',
  description: 'Las reglas completas de Ring of Fire o La Copa del Rey en español con la baraja inglesa. Uno de los juegos más míticos.',
}

export default function RingOfFireReglasPage() {
  return (
    <div className="flex flex-1 flex-col mx-auto max-w-3xl w-full px-4 py-12">
      <Link href="/juegos/ring-of-fire" className="inline-flex items-center gap-2 text-sm text-muted hover:text-red-500 transition-colors mb-6">
        <ChevronLeft className="h-4 w-4" />
        Volver al juego
      </Link>
      
      <div className="flex items-center gap-4 mb-8">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 shadow-lg shadow-red-500/25">
          <Flame className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Cómo Jugar a Ring of Fire</h1>
      </div>

      <div className="prose prose-invert prose-p:text-muted prose-li:text-muted max-w-none prose-headings:text-foreground">
        <h2>Lo que necesitas</h2>
        <ul>
          <li>4 o más jugadores.</li>
          <li>Nuestra app con baraja virtual (o una baraja de poker real).</li>
          <li>Un vaso vacío grande en el centro (La Copa del Rey).</li>
        </ul>

        <h2>Dinámica del juego</h2>
        <p>Ring of Fire es sin duda uno de los juegos para beber con cartas más populares del mundo. Los jugadores se turnan robando una carta de la baraja y realizando la acción asociada a ella.</p>
        
        <h2>Valor de las Cartas</h2>
        <ul>
          <li><strong>As: "Cascada" (Waterfall)</strong>. Todos empiezan a beber a la vez. No puedes parar hasta que pare el jugador de tu derecha. El que sacó el As decide cuándo parar.</li>
          <li><strong>2: "Tú"</strong>. Elige a alguien para que beba dos veces.</li>
          <li><strong>3: "Yo"</strong>. Tú bebes tres veces.</li>
          <li><strong>4: "Zorras" (Whores)</strong>. Solo beben las chicas.</li>
          <li><strong>5: "Pulgar"</strong>. Pon el pulgar en la mesa. El último que lo ponga bebe.</li>
          <li><strong>6: "Dicks"</strong>. Solo beben los chicos.</li>
          <li><strong>7: "Cielo" (Heaven)</strong>. Levanta las manos apuntando al techo. El último bebe.</li>
          <li><strong>8: "Compañero" (Mate)</strong>. Elige a un compañero; cada vez que tú bebas, él debe beber.</li>
          <li><strong>9: "Rima"</strong>. Di una frase, y los demás (en círculo) deben seguir rimando; el primero que falle o repita, bebe.</li>
          <li><strong>10: "Categorías"</strong>. Escoge un tema (ej: Marcas de coche), nombra uno y el resto sigue. Si tardas o repites, bebes.</li>
          <li><strong>J: "Tú mandas" (Rule)</strong>. Inventas una regla que perdura hasta el final. Si alguien la rompe, bebe.</li>
          <li><strong>Q: "Preguntas" (Questions)</strong>. Empiezas haciendo una pregunta a alguien, y esa persona contesta con otra pregunta a otra persona. El primero que falle o responda afirmativamente, bebe.</li>
          <li><strong>K: "El Rey" (King)</strong>. Échale parte de tu bebida a la Copa del centro. La persona que saca el cuarto y último Rey debe beberse la copa entera. ¡Ahí acaba el juego!</li>
        </ul>

      </div>

      <div className="mt-12 flex justify-center">
        <Link href="/juegos/ring-of-fire" className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-red-500/25 transition-all hover:scale-105">
          Jugar Ring of Fire Ahora
        </Link>
      </div>
    </div>
  );
}
