import Link from 'next/link';
import type { Metadata } from 'next';
import { Sparkles, ChevronRight, Users, Zap, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  alternates: {
    canonical: "https://bebergames.com/juegos/verdad-o-reto/reglas",
  },
  title: 'Reglas de Verdad o Reto — Cómo Jugar Extremo para Fiestas',
  description: 'Aprende a jugar a Verdad o Reto con amigos. Elige la intensidad, descubre cómo se reparten los turnos y pasa cualquier tarjeta sin penalización.',
};

export default function VerdadORetoReglasPage() {
  return (
    <div className="flex flex-1 flex-col items-center px-4 py-12 sm:py-20">
      <div className="w-full max-w-3xl">
        <Link 
          href="/juegos/verdad-o-reto" 
          className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground transition-colors mb-8"
        >
          ← Volver al juego
        </Link>
        
        <header className="mb-12 flex flex-col gap-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg shadow-amber-500/25">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
           <div>
            <h1 className="text-3xl font-extrabold sm:text-4xl mb-3">
              Cómo Jugar a Verdad o Reto
            </h1>
            <p className="text-muted text-lg leading-relaxed">
              En cada turno, alguien elige entre contar algo sobre sí mismo o probar un reto delante del grupo.
            </p>
          </div>
        </header>

        <div className="flex flex-col gap-8">
          
          {/* Materiales */}
          <section className="rounded-2xl border border-border bg-surface p-6 flex flex-col gap-4">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <Users className="h-5 w-5 text-amber-500" /> Lo que necesitas
            </h2>
            <ul className="text-sm text-muted space-y-2 leading-relaxed">
              <li>✅ <strong>Jugadores:</strong> Aunque a partir de 3 personas sirve, los grupos mixtos de 5 o 6 son el número sagrado.</li>
              <li>✅ <strong>Mente abierta:</strong> Especialmente si elegís el modo Picante/Hot, se os realizarán preguntas y peticiones íntimas.</li>
              <li>✅ <strong>El árbitro virtual (nuestra App):</strong> Generará preguntas aleatorias asegurando que a nadie le falte imaginación.</li>
            </ul>
          </section>

          {/* Dinámica paso a paso */}
          <section className="rounded-2xl border border-border bg-surface p-6 flex flex-col gap-6">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <Zap className="h-5 w-5 text-amber-500" /> Dinámica del juego
            </h2>
            <div className="flex flex-col gap-5">
              {[
                {
                  paso: "1",
                  titulo: "Preparar la partida",
                  desc: "Añadid al menos tres nombres, elegid uno o varios niveles (Soft, Normal o Picante) y pulsad Empezar a jugar. La app sigue el orden de la lista.",
                },
                {
                  paso: "2",
                  titulo: "La decisión en voz alta",
                  desc: "Cuando veas tu nombre, elige Verdad o Reto para descubrir tu tarjeta.",
                },
                {
                  paso: "3",
                  titulo: "Opción: Verdad",
                  desc: "Lee la pregunta y decide qué quieres contar. Si prefieres guardártelo, puedes pasar.",
                },
                {
                  paso: "4",
                  titulo: "Opción: Reto",
                  desc: "Lee la propuesta y decide si te apetece probarla. Si participa otra persona, pregúntale primero.",
                },
              ].map(({ paso, titulo, desc }) => (
                <div key={paso} className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-500 text-sm font-bold text-white">
                    {paso}
                  </div>
                  <div>
                    <p className="font-semibold mb-1">{titulo}</p>
                    <p className="text-sm text-muted leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Aviso */}
          <section className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6 flex flex-col gap-3">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <ShieldCheck className="h-5 w-5 text-amber-500" /> Cómo pasar una tarjeta
            </h2>
            <p className="text-sm text-muted leading-relaxed">
              Puedes pasar cualquier tarjeta sin beber, sin penalización y sin dar explicaciones. Tanto si has participado como si has pasado, pulsa «Siguiente jugador» y entrega el móvil a quien le toque.
            </p>
          </section>

          <Link
            href="/juegos/verdad-o-reto"
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-amber-500/25 transition-all hover:scale-[1.02] hover:shadow-xl mt-4"
          >
            ¡Jugar a Verdad o Reto! <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
