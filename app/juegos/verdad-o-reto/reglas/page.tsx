import Link from 'next/link';
import { Sparkles, ChevronLeft } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reglas de Verdad o Reto | Cómo Jugar',
  description: 'Descubre las reglas para jugar a Verdad o Reto extremo con amigos. Retos divertidos, preguntas incómodas y mucho alcohol.',
}

export default function VerdadORetoReglasPage() {
  return (
    <div className="flex flex-1 flex-col mx-auto max-w-3xl w-full px-4 py-12">
      <Link href="/juegos/verdad-o-reto" className="inline-flex items-center gap-2 text-sm text-muted hover:text-amber-500 transition-colors mb-6">
        <ChevronLeft className="h-4 w-4" />
        Volver al juego
      </Link>
      
      <div className="flex items-center gap-4 mb-8">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg shadow-amber-500/25">
          <Sparkles className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Cómo Jugar a Verdad o Reto</h1>
      </div>

      <div className="prose prose-invert prose-p:text-muted prose-li:text-muted max-w-none prose-headings:text-foreground">
        <h2>Un clásico de campamentos llevado al límite de la fiesta</h2>
        <p>Cualquiera conoce el <em>"Verdad o Atrevimiento"</em> de cuando éramos niños. Sin embargo, en el mundo de las previas y las fiestas de adultos, este juego cobra una dimensión completamente nueva. Sustituimos las confesiones ingenuas por verdades oscuras, y las penitencias infantiles por retos físicos, ridículos o muy calientes. Y por supuesto, todo se penaliza con alcohol.</p>

        <h2>Lo que necesitas para jugar</h2>
        <ul>
          <li><strong>Jugadores:</strong> A partir de 3 personas sirve, pero los grupos mixtos de 5 o 6 son ideales.</li>
          <li><strong>Mente abierta:</strong> Especialmente si elegís el modo 'Picante', se os realizarán preguntas y peticiones sin ningún tipo de filtro moral.</li>
          <li><strong>Alcohol:</strong> Actuará como moneda de cambio y penalización de los cobardes.</li>
        </ul>

        <h2>Dinámica del juego</h2>
        <p>No cambian las reglas básicas, solo aumentan las consecuencias:</p>
        <ol>
          <li>Registrad vuestros nombres en la ruleta de jugadores. La app seleccionará un nombre aleatorio.</li>
          <li>Esa persona debe decir en voz alta (antes de ver qué le toca) su elección: <strong>"¡Verdad o Reto!"</strong></li>
          <li><strong>Si es Verdad:</strong> Pulsad sobre "Verdad" y leed la pregunta íntima. El jugador debe contestar con total y absoluta sinceridad mirando a los ojos del resto.</li>
          <li><strong>Si es Reto:</strong> Pulsad sobre "Reto" y leed el desafío. El jugador debe levantarse y ejecutar la acción, por muy ridícula que sea.</li>
        </ol>

        <h2>El Sistema de Castigos y Cobardía</h2>
        <p>Aquí no se obliga a nadie a hacer algo con lo que se sienta verdaderamente incómodo, pero el coste es alto:</p>
        <ul>
          <li><strong>Negarse a una Verdad:</strong> Si alguien prefiere guardar su secreto en lugar de responder, el equipo debe penalizarle. La regla estándar es beber <strong>una copa entera o 5 tragos largos</strong>.</li>
          <li><strong>Negarse a un Reto:</strong> Los retos requieren valor físico. Si un jugador no se atreve a cumplir su reto, el grupo suele imponerle un castigo mucho más duro, como <strong>beber el doble que una verdad</strong> o tener que beber un chupito de una mezcla desagradable.</li>
        </ul>

        <h2>Opciones de Juego Frecuentes</h2>
        <p>Normalmente la gente elige Verdad al principio porque es "más fácil", así que recomendamos jugar con la regla del <strong>"Tope de 2"</strong>: No puedes elegir "Verdad" más de dos turnos consecutivos. ¡Al tercero tienes que atreverte a la acción sí o sí!</p>
      </div>

      <div className="mt-12 flex justify-center">
        <Link href="/juegos/verdad-o-reto" className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-amber-500/25 transition-all hover:scale-105">
          Jugar Verdad o Reto Ahora
        </Link>
      </div>
    </div>
  );
}
