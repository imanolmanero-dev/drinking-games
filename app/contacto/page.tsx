import type { Metadata } from 'next';
import { Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contacto | BeberGames',
  description: 'Ponte en contacto con el equipo de BeberGames.',
}

export default function ContactoPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-16">
      <div className="max-w-xl w-full flex flex-col items-center text-center gap-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent-secondary shadow-lg shadow-accent-glow/20">
          <Mail className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-balance">
          Contacta con Nosotros
        </h1>
        <p className="text-muted text-lg">
          ¿Tienes alguna sugerencia para un nuevo juego? ¿Has encontrado un bug? 
          ¿O tal vez una idea descabellada para una carta de Ring of Fire?
        </p>

        <div className="mt-8 rounded-2xl border border-border bg-surface p-8 w-full">
          <h2 className="text-xl font-bold mb-2">Escríbenos a:</h2>
          <a
            href="mailto:info@bebergames.com"
            className="text-2xl font-black text-accent hover:text-accent-secondary transition-colors break-all"
          >
            info@bebergames.com
          </a>
          <p className="mt-4 text-sm text-muted">
            Intentaremos responderte lo antes posible (si no estamos en mitad de una partida).
          </p>
        </div>
      </div>
    </div>
  );
}
