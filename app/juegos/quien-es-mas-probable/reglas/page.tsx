import Link from 'next/link';
import { Hand, ChevronLeft } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reglas de Quién Es Más Probable | Cómo Jugar',
  description: 'El juego perfecto para descubrir qué piensan tus amigos de ti. Aprende las reglas de Quién Es Más Probable.',
}

export default function QuienEsMasProbableReglasPage() {
  return (
    <div className="flex flex-1 flex-col mx-auto max-w-3xl w-full px-4 py-12">
      <Link href="/juegos/quien-es-mas-probable" className="inline-flex items-center gap-2 text-sm text-muted hover:text-cyan-400 transition-colors mb-6">
        <ChevronLeft className="h-4 w-4" />
        Volver al juego
      </Link>
      
      <div className="flex items-center gap-4 mb-8">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/25">
          <Hand className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-left">Cómo Jugar: Quién Es Más Probable</h1>
      </div>

      <div className="prose prose-invert prose-p:text-muted prose-li:text-muted max-w-none prose-headings:text-foreground">
        <h2>Un juego que destruirá confianzas (o las fortalecerá)</h2>
        <p><em>"Quién Es Más Probable"</em> (conocido en inglés como <em>Most Likely To</em>) es probablemente el mejor juego para descubrir qué piensan realmente tus amigos de ti. Prepárate para juicios apresurados, risas incómodas y mucho salseo. Es ideal para grupos que ya se conocen un poco o que quieren romper el hielo de forma contundente.</p>

        <h2>Lo que necesitas para jugar</h2>
        <ul>
          <li><strong>Jugadores:</strong> Recomendamos un mínimo de 4 personas para que haya suficiente variedad y debate.</li>
          <li><strong>Mentalidad abierta:</strong> Estar listos para aguantar bromas y no tomarse las preguntas a pecho.</li>
          <li><strong>Bebida:</strong> Un vaso en la mano de cada persona en todo momento.</li>
        </ul>

        <h2>Dinámica del juego</h2>
        <p>La mecánica es vibrante y muy participativa, garantizando que todos estén atentos:</p>
        <ol>
          <li>Sentaros en círculo para que todos os podáis ver las caras claramente.</li>
          <li>Una persona se encarga de leer la pregunta de la pantalla en voz alta. Por ejemplo: <em>"¿Quién es más probable que termine en la cárcel después de una gran fiesta?"</em></li>
          <li>Todo el mundo se toma unos segundos (en silencio) para mirar al resto y pensar su respuesta.</li>
          <li>Alguien (o la propia persona que lee) hace una cuenta atrás: <strong>"¡Un, dos, tres!"</strong></li>
          <li>En ese exacto instante, todos extienden el brazo y <strong>señalan con el dedo</strong> a la persona que creen que mejor encaja en la descripción.</li>
        </ol>

        <h2>Sistema de Castigos y Debates</h2>
        <p>A diferencia de otros juegos, aquí el castigo es cuantitativo:</p>
        <ul>
          <li><strong>Cada dedo que te apunta, es un trago.</strong> Si tienes a cuatro personas señalándote, tendrás que beber cuatro sorbos de tu copa.</li>
          <li><strong>Justificaciones:</strong> Es una regla no escrita que la persona más votada pida explicaciones. ¡Las excusas y justificaciones que dan tus amigos son siempre la mejor parte de la noche!</li>
        </ul>
      </div>

      <div className="mt-12 flex justify-center">
        <Link href="/juegos/quien-es-mas-probable" className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all hover:scale-105">
          Jugar Quién Es Más Probable Ahora
        </Link>
      </div>
    </div>
  );
}
