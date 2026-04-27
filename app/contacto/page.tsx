import type { Metadata } from 'next';
import { Mail } from 'lucide-react';
import ContactForm from '@/components/ui/ContactForm';

export const metadata: Metadata = {
  title: 'Contacto — Escríbenos',
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

        <ContactForm />
      </div>
    </div>
  );
}
