import Link from 'next/link';
import { Dice3, ChevronLeft } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reglas del Triman (Juego de Dados) | Cómo Jugar',
  description: 'Aprende a jugar al Triman, el mejor juego de dados para beber. Conoce todas las reglas, qué pasa con cada tirada y cómo ser el Señor del Tres.',
}

export default function TrimanReglasPage() {
  return (
    <div className="flex flex-1 flex-col mx-auto max-w-3xl w-full px-4 py-12">
      <Link href="/juegos/triman" className="inline-flex items-center gap-2 text-sm text-muted hover:text-emerald-500 transition-colors mb-6">
        <ChevronLeft className="h-4 w-4" />
        Volver al juego
      </Link>
      
      <div className="flex items-center gap-4 mb-8">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/25">
          <Dice3 className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Cómo Jugar a Triman</h1>
      </div>

      <div className="prose prose-invert prose-p:text-muted prose-li:text-muted max-w-none prose-headings:text-foreground">
        <h2>El mejor juego táctico y veloz de dados para fiestas</h2>
        <p><em>Triman</em> (también conocido como <em>Three Man</em> en los países anglosajones) no es tan conocido como otros juegos comerciales, pero quienes lo prueban afirman que no hay otro juego que emborrache de forma tan rápida e impredecible. ¿Por qué? Porque al usar dos dados, las reglas saltan a la velocidad de la luz y cualquiera puede verse envuelto en un castigo en cuestión de segundos.</p>

        <h2>Lo que necesitas para jugar</h2>
        <ul>
          <li><strong>Jugadores:</strong> De 3 a 8 jugadores aguantan bien el ritmo sin aburrirse.</li>
          <li><strong>Nuestra aplicación:</strong> Que te servirá como "dados perfectos" que nunca se caen debajo del sofá o se pierden, además de que te indicará la regla a seguir.</li>
          <li><strong>Bebida abundante:</strong> Ten cerca una botella porque los turnos son muy ágiles.</li>
        </ul>

        <h2>El Rol del Triman (Señor del 3)</h2>
        <p>Antes de comenzar el verdadero juego, hay que elegir a la víctima principal: el <strong>Triman</strong> o "Señor del número 3". Podéis elegirlo tirando los dados de forma aleatoria (el primero que saque algo que sume/contenga 3, se convierte en el Triman) o votando democráticamente. <br/>
        <strong>¿Su maldición?:</strong> Cada vez que, en TODA la partida posterior, cualquier tirada de dados contenga un "3" o sumen juntos "3", el Triman está obligado legalmente a beber.</p>

        <h2>Reglas Fundamentales de Tirada</h2>
        <p>Una vez nombrado al Triman, el juego empieza por el jugador con los dados. En tu turno, tiras los dados y ocurre lo siguiente según sus resultados:</p>
        <ul>
          <li><strong>Si suman 7:</strong> Sorpresa, el jugador sentado a tu derecha debe beber en ese instante.</li>
          <li><strong>Si suman 9:</strong> Al revés, el jugador colocado a tu izquierda bebe.</li>
          <li><strong>Si suman 11:</strong> Fuego cruzado, "Fondo Blanco Social". Toda la mesa al completo tiene que parar de hablar y beber al unísono.</li>
          <li><strong>Si sacas Dobles (1-1, 2-2, 4-4...):</strong> Si sacas números iguales, adquieres poderes totales. Tienes que repartir esa cantidad de número de tragos entre quien quieras. Ejemplo: sacas 5-5. Son 10 tragos que puedes hacer que una sola persona se los beba, o puedes repartir 5 al Triman y 5 al de tu derecha.</li>
          <li><strong>La presencia del Tres:</strong> Recuerda, si sale un [3] y un [1], o si salen [1] y [2], el maldito Triman bebe siempre.</li>
        </ul>

        <h2>La regla de "La Racha"</h2>
        <p>A diferencia de la mayoría de los juegos, aquí <strong>tu turno no termina después de tirar</strong>. Te mantienes tirando los dados continuamente MIENTRAS saques resultados que produzcan una regla/penalización. Solamente cuando saques una combinación "vacía" (sin efectos, por ejemplo un 4 y un 1, que suman 5), pasas los dados al jugador de tu izquierda.</p>
        
        <h2>¿Cómo se libra el Triman?</h2>
        <p>Ser Triman es agotador. Para pasar el cargo y salvar tu hígado, solo hay una forma de escapar: Tienes que conseguir que llegue tu turno de lanzar, y <strong>al tirar tú mismo los dados, sacar un número 3</strong>. Solo de esta forma te libras del título y se lo pasas a quien tú decidas o a la persona a tu izquierda.</p>
      </div>

      <div className="mt-12 flex justify-center">
        <Link href="/juegos/triman" className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:scale-105">
          Jugar Triman Ahora
        </Link>
      </div>
    </div>
  );
}
