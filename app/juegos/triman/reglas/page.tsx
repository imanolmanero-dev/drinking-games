import Link from 'next/link';
import type { Metadata } from 'next';
import { Dice3, ChevronRight, Users, Zap, ShieldCheck, Crown, Target } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Reglas del Triman (El Señor del 3) | Cómo Jugar',
  description: 'Aprende a jugar al Triman, el mejor juego de dados para beber en grupo. Conoce todas las reglas, qué pasa con cada tirada de dados y cómo ser el Señor del Tres.',
};

export default function TrimanReglasPage() {
  return (
    <div className="flex flex-1 flex-col items-center px-4 py-12 sm:py-20">
      <div className="w-full max-w-3xl">
        <Link 
          href="/juegos/triman" 
          className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground transition-colors mb-8"
        >
          ← Volver al juego
        </Link>
        
        <header className="mb-12 flex flex-col gap-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/25">
            <Dice3 className="h-8 w-8 text-white" />
          </div>
           <div>
            <h1 className="text-3xl font-extrabold sm:text-4xl mb-3">
              Cómo Jugar a Triman
            </h1>
            <p className="text-muted text-lg leading-relaxed">
              Triman (o "Three Man" en el mundo universitario anglosajón) es posiblemente el juego táctico de dados más destructivo y veloz que puedes llevar a una previa. Las reglas saltan a la velocidad de la luz y cualquiera puede verse envuelto en un castigo.
            </p>
          </div>
        </header>

        <div className="flex flex-col gap-8">
          
          {/* Materiales */}
          <section className="rounded-2xl border border-border bg-surface p-6 flex flex-col gap-4">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <Users className="h-5 w-5 text-emerald-400" /> Lo que necesitas
            </h2>
            <ul className="text-sm text-muted space-y-2 leading-relaxed">
              <li>✅ <strong>Jugadores:</strong> De 3 a 8 jugadores es la cifra óptima para aguantar el ritmo sin aburrirse esperando turno.</li>
              <li>✅ <strong>Los Dados:</strong> La aplicación oficial de BeberGames, porque estos dados virtuales nunca se caen debajo del sofá o rompen vasos de cristal.</li>
              <li>✅ <strong>Bebida abundante:</strong> Tened cerca una botella de repuesto, porque los turnos pueden ser increíblemente ágiles.</li>
            </ul>
          </section>

          {/* El rol de Triman */}
          <section className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-6 flex flex-col gap-4">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <Crown className="h-5 w-5 text-emerald-500" /> Elegir al "Señor del Tres"
            </h2>
            <div className="flex flex-col gap-4 text-sm text-muted leading-relaxed">
              <p>
                Antes de comenzar el verdadero juego, es absolutamente prioritario elegir a la víctima principal de la noche: el <strong>Triman</strong> o "Señor del número 3".
              </p>
              <p>
                En la app, la primera persona que tire los dados y obtenga una suma igual a 3 (un 2 y un 1) se convierte automáticamente en el Triman. A partir de ese momento fatídico, su maldición comienza: <strong>cada vez que CUALQUIER OTRA PERSONA saque un "3" físico en uno de los dados o la suma de ambos dados sea 3, el Triman debe dar un trago.</strong>
              </p>
            </div>
          </section>

          {/* Reglas Fundamentales */}
          <section className="rounded-2xl border border-border bg-surface p-6 flex flex-col gap-6">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <Target className="h-5 w-5 text-emerald-400" /> Todas las Reglas de Tirada
            </h2>
            <div className="flex flex-col gap-3 text-sm text-muted leading-relaxed">
              <p>Una vez coronado el Triman, el jugador a su izquierda empieza a tirar. Cada tirada puede tener consecuencias terribles si se obtiene lo siguiente:</p>
              
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 list-none p-0">
                <li className="bg-surface-hover p-4 rounded-lg border border-border">
                  <span className="font-bold text-emerald-400 block mb-1">🎲🎲 Suma 7</span>El jugador sentado INMEDIATAMENTE a TU DERECHA debe beber un trago.
                </li>
                <li className="bg-surface-hover p-4 rounded-lg border border-border">
                  <span className="font-bold text-foreground block mb-1">🎲🎲 Suma 9</span>El jugador colocado INMEDIATAMENTE a TU IZQUIERDA debe realizar un trago.
                </li>
                <li className="bg-surface-hover p-4 rounded-lg border border-border">
                  <span className="font-bold text-red-400 block mb-1">🎲🎲 Suma 11</span>¡Fuego cruzado! Típico "Fondo Blanco Social". Toda la mesa al completo tiene que parar de hablar y chocar sus copas para beber al unísono.
                </li>
                <li className="bg-surface-hover p-4 rounded-lg border border-border">
                  <span className="font-bold text-violet-400 block mb-1">🎲🎲 Dobles (2-2, 4-4...)</span>Adquieres poder absoluto. Esa suma es el número de tragos y tú los repartes como te dé la gana. Puedes mandarle 10 tragos a un solo individuo.
                </li>
              </ul>
            </div>
          </section>

          {/* Conservar el turno */}
          <section className="rounded-2xl border border-border bg-surface p-6 flex flex-col gap-4">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <Zap className="h-5 w-5 text-emerald-400" /> La Regla de "La Racha"
            </h2>
            <div className="flex flex-col gap-4 text-sm text-muted leading-relaxed">
              <p>A diferencia de la inmensa mayoría de los juegos de mesa tradicionales, aquí <strong>tu turno no termina después de tirar</strong>.</p>
              <p>Te mantienes tirando los dados continuamente MIENTRAS saques resultados que produzcan alguna regla o penalización (ya sea castigar al de la izquierda, al Triman, sacar dobles, etc.). Solamente cuando saques una combinación "vacía" (por ejemplo un 4 y un 1, que suman 5 y no interactúan en nada) finaliza tu turno y pasas los dados al jugador de tu izquierda.</p>
            </div>
          </section>

          {/* Cómo escapar */}
          <section className="rounded-2xl border border-border bg-surface p-6 flex flex-col gap-4">
            <h2 className="text-lg font-bold">🏃‍♂️ ¿Cómo se libra el pobre Triman?</h2>
            <div className="flex flex-col gap-3 text-sm text-muted leading-relaxed">
              <p>
                Tarde o temprano, el hígado del "Señor del Tres" empezará a pedir tregua. Para liberarse del título soberano, el Triman solo tiene una forma de pasar la maldición a otro.
              </p>
              <p>
                Tiene que aguantar hasta que llegue formalmente su turno de lanzar los dados. Al tirar, <strong>debe sacar un número "3" en cualquiera de sus dados (o que sumen 3)</strong>. Si logra la hazaña, el embrujo se rompe al instante y puede designar explícitamente a cualquier otro jugador de la mesa como el nuevo y glorioso Triman.
              </p>
            </div>
          </section>

          {/* Aviso */}
          <section className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 flex flex-col gap-3">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <ShieldCheck className="h-5 w-5 text-emerald-400" /> Seguridad ante todo
            </h2>
            <p className="text-sm text-muted leading-relaxed">
              Ser el Triman en una mesa de más de 6 personas puede suponer tener que beber de manera muy continua y perjudicial. No presiones a ningún compañero; si alguien decide beber agua o un refresco mientras es Triman, felicitadle por su madurez. Todo grupo responsable debe velar por la hidratación de sus integrantes.
            </p>
          </section>

          <Link
            href="/juegos/triman"
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:scale-[1.02] hover:shadow-xl mt-4"
          >
            ¡Tirar los Dados! <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
