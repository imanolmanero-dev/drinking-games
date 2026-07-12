import type { Metadata } from 'next';
import { Mail } from 'lucide-react';
import ContactForm from '@/components/ui/ContactForm';

export const metadata: Metadata = {
  title: 'Contacto — Escríbenos',
  description: 'Ponte en contacto con el equipo de BeberGames.',
  alternates: {
    canonical: "https://bebergames.com/contacto",
  },
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

        <div className="text-sm text-muted text-left w-full space-y-3 rounded-xl bg-surface/50 p-6 border border-border mt-2 mb-6">
          <p>
            BeberGames es un proyecto creado para asegurar la mejor diversión en tus previas y fiestas. Trabajamos constantemente para añadir nuevos <strong>juegos para beber online</strong> y mejorar los existentes.
          </p>
          <p>
            Si tienes sugerencias sobre reglas alternativas, has notado algún error en la aplicación o simplemente quieres saludarnos, utiliza el formulario de abajo. Intentamos responder a todos los mensajes en un plazo de 24 a 48 horas.
          </p>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
