import Link from 'next/link';
import type { Metadata } from 'next';
import { Hand, ChevronRight, Users, Zap, ShieldCheck, Flame, Scale } from 'lucide-react';

export const metadata: Metadata = {
  alternates: {
    canonical: "https://bebergames.com/juegos/quien-es-mas-probable/reglas",
  },
  title: 'Reglas de Quién Es Más Probable — Cómo Jugar',
  description: "Aprende a jugar a Quién Es Más Probable. Descubre cómo señalar a la vez, contar nominaciones y compartir un empate.",
};

export default function QuienEsMasProbableReglasPage() {
  return (
    <div className="flex flex-1 flex-col items-center px-4 py-12 sm:py-20">
      <div className="w-full max-w-3xl">
        <Link 
          href="/juegos/quien-es-mas-probable" 
          className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground transition-colors mb-8"
        >
          ← Volver al juego
        </Link>
        
        <header className="mb-12 flex flex-col gap-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/25">
            <Hand className="h-8 w-8 text-white" />
          </div>
           <div>
            <h1 className="text-3xl font-extrabold sm:text-4xl mb-3">
              Cómo Jugar: Quién Es Más Probable
            </h1>
            <p className="text-muted text-lg leading-relaxed">
              Conocido internacionalmente como "Most Likely To", este es el juego maestro para destruir amistades (o fortalecerlas de forma muy extraña). Descubre las verdaderas opiniones de tus amigos.
            </p>
          </div>
        </header>

        <div className="flex flex-col gap-8">
          
          {/* Materiales */}
          <section className="rounded-2xl border border-border bg-surface p-6 flex flex-col gap-4">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <Users className="h-5 w-5 text-cyan-400" /> Lo que necesitas
            </h2>
            <ul className="text-sm text-muted space-y-2 leading-relaxed">
              <li>✅ <strong>Jugadores:</strong> Recomendamos encarecidamente un mínimo de 4 personas. Con 3 es aburrido, con más de 10 es un descontrol muy divertido.</li>
              <li><strong>Grupo:</strong> Cualquiera puede saltarse una pregunta o pedir que no le nominen.</li>
              <li><strong>Espacio:</strong> Colocaos donde se vean las manos.</li>
              <li><strong>Un móvil:</strong> La app propone 60 preguntas repartidas por intensidad.</li>
            </ul>
          </section>

          {/* Dinámica paso a paso */}
          <section className="rounded-2xl border border-border bg-surface p-6 flex flex-col gap-6">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <Zap className="h-5 w-5 text-cyan-400" /> Dinámica del juego
            </h2>
            <div className="flex flex-col gap-5">
              {[
                {
                  paso: "1",
                  titulo: "Sentarse en Círculo",
                  desc: "Es obligatorio que os sentéis o estéis de pie formando un círculo donde TODOS los participantes se puedan ver las caras y, lo más importante, las manos.",
                },
                {
                  paso: "2",
                  titulo: "La Lectura",
                  desc: "Alguien lee la afirmación de la pantalla en voz alta. Por ejemplo: «¿Quién es más probable que termine en la cárcel después de una boda?»",
                },
                {
                  paso: "3",
                  titulo: "Reflexión Silenciosa",
                  desc: "Nadie dice una sola palabra. Durante 3 a 5 segundos todos miran al resto con ojos analíticos y deciden íntimamente a quién van a acusar.",
                },
                {
                  paso: "4",
                  titulo: "El Disparo",
                  desc: "A la de tres, quien quiera señala a una persona. Si prefieres abstenerte, deja la mano bajada.",
                },
              ].map(({ paso, titulo, desc }) => (
                <div key={paso} className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 text-sm font-bold text-white">
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

          {/* Castigos y Votaciones */}
          <section className="rounded-2xl border border-border bg-surface p-6 flex flex-col gap-4">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <Scale className="h-5 w-5 text-cyan-400" /> Cómo contar las nominaciones
            </h2>
            <div className="flex flex-col gap-4 text-sm text-muted leading-relaxed">
              <p>Contad los dedos en la mesa. La app muestra las preguntas y vosotros lleváis la votación.</p>
              
              <div className="rounded-lg bg-surface-hover p-4 border-l-4 border-cyan-500">
                <p className="font-bold text-foreground mb-1 text-base">👉 Un dedo, una nominación</p>
                <p>Si cinco personas te señalan, tienes cinco votos en esa ronda. Puedes comentar si te ves en ese papel o pedir la siguiente tarjeta.</p>
              </div>
              <div className="rounded-lg bg-surface-hover p-4 border-l-4 border-emerald-500">
                <p className="font-bold text-foreground mb-1 text-base">🗣️ El Derecho a Defensa</p>
                <p>Quien quiera puede explicar su voto. A veces basta con una mirada para que toda la mesa recuerde la misma anécdota.</p>
              </div>
            </div>
          </section>

          {/* Variaciones Caseras */}
          <section className="rounded-2xl border border-border bg-surface p-6 flex flex-col gap-4">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <Flame className="h-5 w-5 text-cyan-400" /> Variante Hardcore
            </h2>
            <div className="flex flex-col gap-3 text-sm text-muted leading-relaxed">
              <p>
                <strong className="text-foreground">Voto dividido:</strong> Si varias personas empatan, compartid la nominación. Si nadie vota, avanzad sin elegir a nadie.
              </p>
            </div>
          </section>

          {/* Aviso */}
          <section className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6 flex flex-col gap-3">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <ShieldCheck className="h-5 w-5 text-cyan-400" /> Juega de manera inclusiva
            </h2>
            <p className="text-sm text-muted leading-relaxed">
              Si una tarjeta incomoda a alguien, saltadla. No hace falta dar un motivo ni contar historias personales.
            </p>
          </section>

          <Link
            href="/juegos/quien-es-mas-probable"
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all hover:scale-[1.02] hover:shadow-xl mt-4"
          >
            ¡Empezar a Escoger! <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
