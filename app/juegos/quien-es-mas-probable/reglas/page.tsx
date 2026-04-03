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
        <h2>Lo que necesitas</h2>
        <ul>
          <li>3 o más jugadores (recomendado 4+).</li>
          <li>Bebida.</li>
          <li>Estar listos para el salseo.</li>
        </ul>

        <h2>Dinámica del juego</h2>
        <p>¿Crees que conoces a tus amigos? Este juego os pondrá a prueba a todos.</p>
        <ol>
          <li>Una persona lee la pregunta en voz alta. Ejemplo: <em>"¿Quién es más probable que termine en la cárcel?"</em></li>
          <li>Todo el mundo se toma unos segundos para pensar su respuesta.</li>
          <li>A la cuenta de tres ("¡Un, dos, tres!"), todos señalan con el dedo a la persona que creen que es la más probable.</li>
          <li><strong>Cada voto es un trago.</strong> Si tres personas te están apuntando, bebes tres tragos. ¡Así de fácil!</li>
        </ol>

        <h2>Empates y discusiones</h2>
        <p>Es muy probable que después de cada ronda alguien empiece a justificarse diciendo "¡Yo no haría eso!". El juego es ideal no solo para beber, sino para escuchar grandes anécdotas y debates.</p>
      </div>

      <div className="mt-12 flex justify-center">
        <Link href="/juegos/quien-es-mas-probable" className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all hover:scale-105">
          Jugar Quién Es Más Probable Ahora
        </Link>
      </div>
    </div>
  );
}
