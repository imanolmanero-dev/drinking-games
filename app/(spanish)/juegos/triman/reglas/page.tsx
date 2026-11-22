import Link from 'next/link';
import type { Metadata } from 'next';
import { Dice3, ChevronRight, Users, Zap, ShieldCheck, Crown, Target } from 'lucide-react';

export const metadata: Metadata = {
  alternates: {
    canonical: "https://bebergames.com/juegos/triman/reglas",
  },
  title: 'Reglas del Triman (El Señor del 3) — Cómo Jugar',
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
              En la app jugáis con un dado. Para jugar en la mesa con dos dados, probad la variante de las sumas que aparece más abajo.
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
              <li>✅ <strong>Espacio:</strong> Sentaos en círculo para distinguir derecha e izquierda.</li>
            </ul>
          </section>

          {/* El rol de Triman */}
          <section className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-6 flex flex-col gap-4">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <Crown className="h-5 w-5 text-emerald-500" /> Elegir al "Señor del Tres"
            </h2>
            <div className="flex flex-col gap-4 text-sm text-muted leading-relaxed">
              <p>
                Lanzad el dado por turnos. El primer tres corona al Triman.
              </p>
              <p>
                En la app, el uno invita a marcar un ritmo. Con el dos saluda la persona de la derecha y con el cuatro guiña un ojo la de la izquierda. El tres invita al Triman a hacer una reverencia, el cinco permite elegir a alguien para inventar un gesto y el seis inicia una ola. Podéis pasar siempre.
              </p>
            </div>
          </section>

          {/* Reglas Fundamentales */}
          <section className="rounded-2xl border border-border bg-surface p-6 flex flex-col gap-6">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <Target className="h-5 w-5 text-emerald-400" /> Todas las Reglas de Tirada
            </h2>
            <div className="flex flex-col gap-3 text-sm text-muted leading-relaxed">
              Para la variante física, usad dos dados. Quien sume tres primero lleva la corona. Después aplicad una sola acción por tirada:
              
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 list-none p-0">
                <li className="bg-surface-hover p-4 rounded-lg border border-border">
                  <strong>Suma 7.</strong> Saluda la persona de la derecha.
                </li>
                <li className="bg-surface-hover p-4 rounded-lg border border-border">
                  <strong>Suma 9.</strong> La persona de la izquierda propone un ritmo.
                </li>
                <li className="bg-surface-hover p-4 rounded-lg border border-border">
                  <strong>Suma 11.</strong> Pasad una ola de brazos alrededor de la mesa.
                </li>
                <li className="bg-surface-hover p-4 rounded-lg border border-border">
                  <strong>Dobles.</strong> Invita a alguien a inventar un gesto o pasa.
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
              La app avanza al pulsar Siguiente turno, sea cual sea el resultado.
              En la mesa podéis acordar una tirada extra si sale una de las combinaciones anteriores. Después pasad los dados, incluso si alguien ha preferido saltarse el gesto.
            </div>
          </section>

          {/* Cómo escapar */}
          <section className="rounded-2xl border border-border bg-surface p-6 flex flex-col gap-4">
            <h2 className="text-lg font-bold">🏃‍♂️ ¿Cómo se libra el pobre Triman?</h2>
            <div className="flex flex-col gap-3 text-sm text-muted leading-relaxed">
              <p>
                En la app, Nuevo Triman abre otra búsqueda con los mismos jugadores.
              </p>
              <p>
                En la variante de mesa, al sumar tres podéis ofrecer la corona a otra persona. Si prefiere pasar, seguid jugando.
              </p>
            </div>
          </section>

          {/* Aviso */}
          <section className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 flex flex-col gap-3">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <ShieldCheck className="h-5 w-5 text-emerald-400" /> Seguridad ante todo
            </h2>
            <p className="text-sm text-muted leading-relaxed">
              Cada gesto dura una sola tirada. Si se repite un número, podéis probar otro gesto o pasar directamente al turno siguiente.
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
