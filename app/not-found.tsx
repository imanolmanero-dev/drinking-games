import Link from 'next/link';
import { BeerOff, Home } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Página no encontrada | BeberGames',
  description: 'Parece que has bebido demasiado, esta página no existe.',
}

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-20 text-center animate-in fade-in zoom-in duration-500">
      <div className="flex flex-col items-center justify-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-surface border border-border shadow-2xl mb-8">
          <BeerOff className="h-12 w-12 text-muted" />
        </div>
        <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-4 bg-gradient-to-br from-white to-white/50 bg-clip-text text-transparent">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-accent">¡Alguien se ha bebido esta página!</h2>
        <p className="text-muted text-lg max-w-md mx-auto mb-10 text-balance">
          Parece que te has perdido de camino a la barra. La URL que buscas no existe o la fiesta se ha movido a otra parte.
        </p>
        <Link 
          href="/" 
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent-secondary px-8 py-4 text-base font-semibold text-white shadow-lg shadow-accent-glow/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Home className="h-5 w-5" />
          Volver a la página principal
        </Link>
      </div>
    </div>
  );
}
