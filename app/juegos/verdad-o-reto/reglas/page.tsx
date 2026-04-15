import Link from 'next/link';
import type { Metadata } from 'next';
import { Sparkles, ChevronRight, Users, Zap, ShieldCheck, Gamepad2, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Reglas de Verdad o Reto | Cómo Jugar Extremo para Fiestas',
  description: 'Descubre las reglas para jugar a Verdad o Reto con amigos. Retos divertidos, preguntas incómodas y mucho alcohol. Conoce las variantes y sube de nivel.',
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
              El clásico juego de campamentos, llevado al límite para las fiestas de adultos. Respuestas incómodas, confesiones ridículas y castigos muy severos si alguien decide acobardarse.
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
              <li>✅ <strong>Algo para beber:</strong> Actuará como moneda de cambio y penalización para aquellos jugadores cobardes.</li>
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
                  titulo: "Elegir turno y castigo base",
                  desc: "Sentáos todos en círculo. Podéis añadir los nombres a la App para que ella misma os elija de forma rotatoria, o jugar libremente. Acordad al principio cuánto se debe beber por negarse a cumplir una prueba (generalmente, medio vaso o un trago largo).",
                },
                {
                  paso: "2",
                  titulo: "La decisión en voz alta",
                  desc: "Cuando sea el turno de alguien, esa persona debe decir en voz alta (¡antes de ver qué le toca!) si desea 'Verdad' o 'Reto'. No se vale cambiar una vez elegida la opción.",
                },
                {
                  paso: "3",
                  titulo: "Opción: Verdad",
                  desc: "Pulsad sobre la carta de Verdad. El jugador debe contestar a la pregunta de manera honesta, rápida y mirando al resto, idealmente dando contexto.",
                },
                {
                  paso: "4",
                  titulo: "Opción: Reto",
                  desc: "Pulsad sobre el botón de Reto. El jugador debe levantarse y ejecutar la acción. Dependiendo del grupo y el reto, algunos pueden necesitar la colaboración indirecta de otros.",
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

          {/* Castigos y Cobardía */}
          <section className="rounded-2xl border border-border bg-surface p-6 flex flex-col gap-4">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <AlertTriangle className="h-5 w-5 text-amber-500" /> El Sistema de Castigos (Regla de Oro)
            </h2>
            <div className="flex flex-col gap-4 text-sm text-muted leading-relaxed">
              <p>Aquí nadie está obligado a hacer algo con lo que se sienta verdaderamente incómodo o violentado. Ahora bien, el coste de rendirse debe ser muy alto para mantener la emoción del juego.</p>
              
              <div className="rounded-lg bg-surface-hover p-4 border border-border">
                <p className="font-bold text-foreground mb-1 text-base">🤫 Negarse a confesar una Verdad</p>
                <p>Si alguien prefiere guardar su secreto en lugar de responder, el equipo debe penalizarle de forma rápida y concisa. La regla estándar en España y México suele ser <strong>beber una copa entera de un trago o dar un mínimo de 5 tragos largos</strong> contados en voz alta por el grupo.</p>
              </div>
              <div className="rounded-lg bg-surface-hover p-4 border border-border">
                <p className="font-bold text-foreground mb-1 text-base">🚫 Rajarse ante un Reto físico</p>
                <p>Los retos requieren valor y descaro frente a los demás. Si un jugador abandona su reto, el grupo suele imponerle un castigo severo, como <strong>beber el doble que una Verdad</strong>, o invitarse a la primera ronda de la discoteca si salís de fiesta luego.</p>
              </div>
            </div>
          </section>

          {/* Reglas Caseras (Hardcore) */}
          <section className="rounded-2xl border border-border bg-surface p-6 flex flex-col gap-4">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <Gamepad2 className="h-5 w-5 text-amber-500" /> Opciones Avanzadas
            </h2>
            <div className="flex flex-col gap-3 text-sm text-muted leading-relaxed">
              <p>
                <strong className="text-foreground">Regla del Tope de Dos:</strong> Normalmente la gente suele elegir "Verdad" al principio porque resulta más cómodo hablar que ponerse en evidencia. Recomendamos tajantemente la regla del tope: No puedes elegir "Verdad" más de 2 turnos consecutivos. ¡A la tercera elegirás acción sí o sí!
              </p>
              <p>
                <strong className="text-foreground">Derecho de Veto:</strong> Cada jugador dispone de "1 Veto" en todo el juego. Permite descartar una ÚNICA carta de pregunta o reto en toda la noche sin penalización y sacar una nueva opción del mismo tipo. Usadlo con extrema sabiduría.
              </p>
            </div>
          </section>

          {/* Aviso */}
          <section className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6 flex flex-col gap-3">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <ShieldCheck className="h-5 w-5 text-amber-500" /> Bebe con responsabilidad
            </h2>
            <p className="text-sm text-muted leading-relaxed">
              Aunque la penalización suele ser alcohólica, el Verdad o Reto ha arruinado amistades sin necesidad de bebidas. Usa el sentido común; no obliguéis a las personas a sobrepasar completamente su límite psicológico y fomentad un ambiente seguro. Jugar con refrescos sigue siendo ridículamente divertido.
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
