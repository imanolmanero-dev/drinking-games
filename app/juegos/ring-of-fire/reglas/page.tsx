import Link from 'next/link';
import type { Metadata } from 'next';
import { Flame, ChevronRight, Users, Zap, ShieldCheck, GlassWater, List } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Reglas de Ring of Fire (Copa del Rey) | Cómo Jugar',
  description: 'Las reglas completas de Ring of Fire o La Copa del Rey explicadas. Qué significa cada carta de la baraja y cómo sobrevivir a este mítico juego universitario.',
};

export default function RingOfFireReglasPage() {
  return (
    <div className="flex flex-1 flex-col items-center px-4 py-12 sm:py-20">
      <div className="w-full max-w-3xl">
        <Link 
          href="/juegos/ring-of-fire" 
          className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground transition-colors mb-8"
        >
          ← Volver al juego
        </Link>
        
        <header className="mb-12 flex flex-col gap-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 shadow-lg shadow-red-500/25">
            <Flame className="h-8 w-8 text-white" />
          </div>
           <div>
            <h1 className="text-3xl font-extrabold sm:text-4xl mb-3">
              Cómo Jugar a Ring of Fire
            </h1>
            <p className="text-muted text-lg leading-relaxed">
              Conocido internacionalmente como King's Cup (La Copa del Rey) o Cascada. El rey indiscutible de los juegos de cartas universitarios, ahora sin necesidad de llevar una baraja sucia en el bolsillo.
            </p>
          </div>
        </header>

        <div className="flex flex-col gap-8">
          
          {/* Materiales */}
          <section className="rounded-2xl border border-border bg-surface p-6 flex flex-col gap-4">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <Users className="h-5 w-5 text-red-500" /> Lo que necesitas
            </h2>
            <ul className="text-sm text-muted space-y-2 leading-relaxed">
              <li>✅ <strong>Jugadores:</strong> Lo ideal es a partir de 4 jugadores. En este juego, cuantos más seáis creando un gran círculo de sillas, mucho mejor será el caos.</li>
              <li>✅ <strong>El Altar:</strong> Un vaso vacío y de un tamaño generosamente grande situado obligatoriamente en el centro de la mesa (La famosa "Copa del Centro").</li>
              <li>✅ <strong>El mazo perfecto:</strong> La baraja virtual de BeberGames, porque aquí nunca faltará esa última carta que siempre se pierde debajo del sofá.</li>
              <li>✅ <strong>Bebestibles:</strong> Tenéis que tener claro qué vais a beber, porque los vasos de cada uno acabarán probablemente mezclados en alguna fase del juego.</li>
            </ul>
          </section>

          {/* Dinámica paso a paso */}
          <section className="rounded-2xl border border-border bg-surface p-6 flex flex-col gap-6">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <Zap className="h-5 w-5 text-red-500" /> Dinámica del juego
            </h2>
            <div className="flex flex-col gap-5">
              {[
                {
                  paso: "1",
                  titulo: "Sentarse en Círculo",
                  desc: "Los jugadores se acomodan formando un círculo perfecto alrededor de la mesa. El Santo Grial (el vaso vacío grande) preside en el centro.",
                },
                {
                  paso: "2",
                  titulo: "Turno a turno",
                  desc: "Comenzando por el jugador con el turno actual en la app, cada participante saca una carta y la enseña a todo el círculo para que conste en acta.",
                },
                {
                  paso: "3",
                  titulo: "Ejecución Inmediata",
                  desc: "Mágicamente, la app ya indica qué debe hacer la carta que ha tocado, pero se debe acatar en ese precoso instante antes de avanzar el turno de la app.",
                },
                {
                  paso: "4",
                  titulo: "El Cuarto Rey",
                  desc: "Esta es la regla inamovible de oro: Quien robe el cuarto y último rey de la baraja termina la partida por la fuerza mayor, obligándole a algo muy severo.",
                },
              ].map(({ paso, titulo, desc }) => (
                <div key={paso} className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-rose-600 text-sm font-bold text-white">
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

          {/* El chuletario de cartas */}
          <section className="rounded-2xl border border-border bg-surface p-6 flex flex-col gap-4">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <List className="h-5 w-5 text-red-500" /> Significado de la Baraja Clásica
            </h2>
            <div className="flex flex-col gap-3 text-sm text-muted leading-relaxed">
              <p>Aunque nuestra app ya te dicta qué hacer en pantalla para que no tengas que memorizar aburridas tablas, aquí te dejamos las mecánicas populares en toda España y LATAM:</p>
              
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 list-none p-0">
                <li className="bg-surface-hover p-3 rounded-lg border border-border">
                  <span className="font-bold text-red-400 mr-2">A:</span>"Cascada". El jugador empieza a tragar, y secuencialmente el de su derecha, y así sucesivamente. Nadie puede detener el vaso hasta que pare el jugador precedente.
                </li>
                <li className="bg-surface-hover p-3 rounded-lg border border-border">
                  <span className="font-bold text-foreground mr-2">2:</span>Tú. Señalas con arrogancia al jugador de tu elección para que beba dos tragos.
                </li>
                <li className="bg-surface-hover p-3 rounded-lg border border-border">
                  <span className="font-bold text-foreground mr-2">3:</span>Yo. Puras matemáticas. La culpa es tuya, toma tres sorbos rápidos de tu propia medicina.
                </li>
                <li className="bg-surface-hover p-3 rounded-lg border border-border">
                   <span className="font-bold text-foreground mr-2">4:</span>Chicas. Todas las mujeres presentes, sin excepción, levantan sus copas y beben.
                </li>
                <li className="bg-surface-hover p-3 rounded-lg border border-border">
                  <span className="font-bold text-foreground mr-2">5:</span>Pulgar (Thumbmaster). El que saque el 5 es el maldito dueño del pulgar. Puede, secretamente, en cualquier momento poner su pulgar en la mesa. El último que lo ponga, bebe.
                </li>
                <li className="bg-surface-hover p-3 rounded-lg border border-border">
                   <span className="font-bold text-foreground mr-2">6:</span>Chicos. Un brindis forzoso por toda la población masculina de la habitación.
                </li>
                <li className="bg-surface-hover p-3 rounded-lg border border-border">
                   <span className="font-bold text-foreground mr-2">7:</span>Cielo (Heaven). El jugador que saque este 7 deberá, cuando vea oportuno, apuntar un dedo al techo. El último en imitarlo de todo el círculo, sufre un trago.
                </li>
                <li className="bg-surface-hover p-3 rounded-lg border border-border">
                  <span className="font-bold text-foreground mr-2">8:</span>Compañero (Mate). Forma un enlace místico y espiritual. Escoge a alguien a tu lado. A partir de ahora, cada vez que él beba, tú bebes la misma cantidad, y viceversa.
                </li>
                <li className="bg-surface-hover p-3 rounded-lg border border-border">
                  <span className="font-bold text-foreground mr-2">9:</span>Rimas. Abres un concurso de rimas. Dices una palabra, el siguiente debe rimar y se va haciendo cola circular. Si te trabas o quedas en blanco antes de 5 segundos, fallas.
                </li>
                <li className="bg-surface-hover p-3 rounded-lg border border-border">
                  <span className="font-bold text-foreground mr-2">10:</span>Categorías. Muy parecido a los conocidos juegos de Scattegories. Ej: "Razas de Perro". En orden nombrais razas. Dudas, repites y beberás.
                </li>
                <li className="bg-surface-hover p-3 rounded-lg border border-border">
                  <span className="font-bold text-blue-400 mr-2">J:</span>Dictadura. Implantas la ley universal de esa noche. Ej: "Hablar sólo sin cruzar las piernas" o "Tocar tu nariz tras beber". Multarás fuertemente al infractor.
                </li>
                <li className="bg-surface-hover p-3 rounded-lg border border-border">
                  <span className="font-bold text-blue-400 mr-2">Q:</span>Preguntas (Questions). Le haces una pregunta a alguien. Esa persona no responde, sino que redirige una pregunta a otra persona. Es puramente reflejos psicológicos.
                </li>
              </ul>
            </div>
          </section>
          
          {/* El Final Apocalíptico */}
          <section className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6 flex flex-col gap-4">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <GlassWater className="h-5 w-5 text-red-500" /> El Final Apocalíptico (La Carta K)
            </h2>
            <div className="flex flex-col gap-4 text-sm text-muted leading-relaxed">
              <p>
                Los <strong>tres primeros jugadores que saquen la K (El Rey)</strong>, sin protestar, deben verter un tercio de lo que haya en sus propios vasos privados dentro de "La Copa del Centro". Esto genera una repulsiva amalgama inter-bebidas, y si sois muchos y algunos beben ron y otros vino... el combo es temible.
              </p>
              <p>
                Pero no todo se queda ahí. <strong>¡El pobre desdichado que robe el Cuarto y Último Rey (K) lo pierde todo!</strong> Debe levantarse estoicamente en medio de la sala, agarrar la Copa del Centro, tragar de un solo fondo todo el líquido sin rechistar y finalizar para siempre esa partida.
              </p>
            </div>
          </section>

          {/* Aviso */}
          <section className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-6 flex flex-col gap-3">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <ShieldCheck className="h-5 w-5 text-rose-500" /> Beber con moderación y seguridad
            </h2>
            <p className="text-sm text-muted leading-relaxed">
              La famosa Copa del Centro puede generar cócteles de alcohol muy peligrosos que irriten el estómago velozmente. Como app, recomendamos encarecidamente utilizar Ring of Fire mezclando únicamente zumos, agua o cerveza suave dentro de la Copa del Centro para mantener la compostura. ¡Las risas con agua sucia mezclada son las mismas y al día siguiente no hay ingresos en urgencias médicas!
            </p>
          </section>

          <Link
            href="/juegos/ring-of-fire"
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-red-500/25 transition-all hover:scale-[1.02] hover:shadow-xl mt-4"
          >
            ¡Repartir las cartas! <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
