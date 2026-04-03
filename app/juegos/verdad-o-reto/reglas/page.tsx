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
        <h2>Lo que necesitas</h2>
        <ul>
          <li>3 o más jugadores.</li>
          <li>Bebida para los castigos.</li>
          <li>Ganas de pasarlo bien.</li>
        </ul>

        <h2>Dinámica del juego</h2>
        <p>Un clásico infalible. En cada turno, el jugador elegido debe enfrentarse a una difícil decisión:</p>
        <ol>
          <li><strong>Verdad:</strong> Deberá responder a una pregunta íntima, incómoda o secreta. Si se niega a responder, debe beber un castigo (ej: un vaso entero).</li>
          <li><strong>Reto:</strong> Deberá cumplir un desafío físico o social frente a todos. Si no lo hace o no lo completa, deberá beber el doble.</li>
        </ol>

        <h2>Castigos con Alcohol</h2>
        <p>No cumplir un reto o no contestar a una verdad tiene consecuencias. Normalmente el grupo decide cuánto debe beber el cobarde, pero la regla general es: <strong>1 vaso por una verdad no contestada, y 2 por no cumplir un reto.</strong></p>
      </div>

      <div className="mt-12 flex justify-center">
        <Link href="/juegos/verdad-o-reto" className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-amber-500/25 transition-all hover:scale-105">
          Jugar Verdad o Reto Ahora
        </Link>
      </div>
    </div>
  );
}
