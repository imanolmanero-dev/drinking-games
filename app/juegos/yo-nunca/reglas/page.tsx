import Link from 'next/link';
import { Wine, ChevronLeft } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reglas de Yo Nunca | Cómo Jugar',
  description: 'Descubre las reglas del clásico juego para beber Yo Nunca. Qué necesitas, cómo se juega y todo lo necesario para pasarlo genial.',
}

export default function YoNuncaReglasPage() {
  return (
    <div className="flex flex-1 flex-col mx-auto max-w-3xl w-full px-4 py-12">
      <Link href="/juegos/yo-nunca" className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors mb-6">
        <ChevronLeft className="h-4 w-4" />
        Volver al juego
      </Link>
      
      <div className="flex items-center gap-4 mb-8">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/25">
          <Wine className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Cómo Jugar a Yo Nunca</h1>
      </div>

      <div className="prose prose-invert prose-p:text-muted prose-li:text-muted max-w-none prose-headings:text-foreground">
        <h2>Lo que necesitas</h2>
        <ul>
          <li>2 o más jugadores (¡cuantos más, mejor!).</li>
          <li>Alcohol o tu bebida favorita.</li>
        </ul>

        <h2>Dinámica del juego</h2>
        <p>
          "Yo Nunca" es el clásico juego para descubrir los secretos más profundos y vergonzosos de tus amigos. El funcionamiento es el siguiente:
        </p>
        <ol>
          <li>Añade a todos los jugadores y seleccionad la intensidad (Soft, Normal o Picante).</li>
          <li>Os aparecerá una afirmación en pantalla que empieza por "Yo nunca...".</li>
          <li><strong>Si has hecho lo que dice la tarjeta</strong>, tienes que beber.</li>
          <li><strong>Si no lo has hecho</strong>, te salvas.</li>
        </ol>

        <h2>Niveles de Intensidad</h2>
        <ul>
          <li><strong>Soft:</strong> Situaciones cotidianas y graciosas.</li>
          <li><strong>Normal:</strong> Mentiras y un poco de salseo.</li>
          <li><strong>Picante:</strong> Solo para grupos sin tabúes. Mucho sexo y situaciones límite.</li>
        </ul>
      </div>

      <div className="mt-12 flex justify-center">
        <Link href="/juegos/yo-nunca" className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-purple-500/25 transition-all hover:scale-105">
          Jugar Yo Nunca Ahora
        </Link>
      </div>
    </div>
  );
}
