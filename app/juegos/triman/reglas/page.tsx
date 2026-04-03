import Link from 'next/link';
import { Dice3, ChevronLeft } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reglas del Triman (Juego de Dados) | Cómo Jugar',
  description: 'Aprende a jugar al Triman, el mejor juego de dados para beber. Conoce todas las reglas, qué pasa con cada tirada y cómo ser el Señor del Tres.',
}

export default function TrimanReglasPage() {
  return (
    <div className="flex flex-1 flex-col mx-auto max-w-3xl w-full px-4 py-12">
      <Link href="/juegos/triman" className="inline-flex items-center gap-2 text-sm text-muted hover:text-emerald-500 transition-colors mb-6">
        <ChevronLeft className="h-4 w-4" />
        Volver al juego
      </Link>
      
      <div className="flex items-center gap-4 mb-8">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/25">
          <Dice3 className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Cómo Jugar a Triman</h1>
      </div>

      <div className="prose prose-invert prose-p:text-muted prose-li:text-muted max-w-none prose-headings:text-foreground">
        <h2>Lo que necesitas</h2>
        <ul>
          <li>3 o más jugadores.</li>
          <li>Nuestra aplicación (que actúa como los 2 dados virtuales).</li>
          <li>Bebida.</li>
        </ul>

        <h2>El Triman</h2>
        <p>Al empezar la partida, se debe elegir a un "Triman" (Señor del 3). Normalmente el primer Triman se decide porque saca un 3 tirando los dados, o se asigna a dedo si usáis la app. <strong>Cada vez que el resultado de los dados sume 3 o haya un 3 en uno de ellos, el Triman debe beber.</strong></p>

        <h2>Reglas por resultados</h2>
        <p>En cada turno, el jugador tira ambos dados y aplica la regla correspondiente a la suma:</p>
        <ul>
          <li><strong>7:</strong> El jugador de la derecha bebe.</li>
          <li><strong>9:</strong> El jugador de la izquierda bebe.</li>
          <li><strong>11:</strong> Todos beben.</li>
          <li><strong>Dobles:</strong> El que tira reparte el número de tragos (ej: si saca 4 y 4, reparte 8 tragos).</li>
          <li><strong>Tres:</strong> Si la suma es 3, o alguno de los dados es un 3, ¡El Triman bebe!</li>
        </ul>

        <p>Si sacas dobles, sigues tirando. El juego fluye rápido y requiere de atención para no confundirse.</p>
      </div>

      <div className="mt-12 flex justify-center">
        <Link href="/juegos/triman" className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:scale-105">
          Jugar Triman Ahora
        </Link>
      </div>
    </div>
  );
}
