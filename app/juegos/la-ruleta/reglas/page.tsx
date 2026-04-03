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
        <h2>Lo que necesitas</h2>
        <ul>
          <li>2 o más jugadores.</li>
          <li>Nuestra Ruleta Virtual.</li>
          <li>Bebida abundante.</li>
        </ul>

        <h2>Dinámica del juego</h2>
        <p>No hay juego más fácil y directo que este. Simplemente nos basamos en el puro azar para emborrachar a tus amigos o a ti mismo.</p>
        <ol>
          <li>Añade los nombres de los jugadores antes de empezar.</li>
          <li>En tu turno, dale a girar la ruleta.</li>
          <li>Espera a que se detenga y lee en voz alta el castigo.</li>
          <li>¡Cúmplelo! Si no lo haces, fondo blanco.</li>
        </ol>

        <h2>Consejo de Oro</h2>
        <p>La ruleta incluye una variada gama de retos y "trampas" donde a veces te salvas y otras te toca beber el doble. No te lo tomes como algo personal, ¡es la voluntad de la ruleta!</p>
      </div>

      <div className="mt-12 flex justify-center">
        <Link href="/juegos/la-ruleta" className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-rose-500/25 transition-all hover:scale-105">
          Jugar La Ruleta Ahora
        </Link>
      </div>
    </div>
  );
}
