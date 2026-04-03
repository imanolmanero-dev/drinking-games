import Link from 'next/link';
import { Flame, ChevronLeft } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reglas de Ring of Fire (Copa del Rey) | Cómo Jugar',
  description: 'Las reglas completas de Ring of Fire o La Copa del Rey en español con la baraja inglesa. Uno de los juegos más míticos.',
}

export default function RingOfFireReglasPage() {
  return (
    <div className="flex flex-1 flex-col mx-auto max-w-3xl w-full px-4 py-12">
      <Link href="/juegos/ring-of-fire" className="inline-flex items-center gap-2 text-sm text-muted hover:text-red-500 transition-colors mb-6">
        <ChevronLeft className="h-4 w-4" />
        Volver al juego
      </Link>
      
      <div className="flex items-center gap-4 mb-8">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 shadow-lg shadow-red-500/25">
          <Flame className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Cómo Jugar a Ring of Fire</h1>
      </div>

      <div className="prose prose-invert prose-p:text-muted prose-li:text-muted max-w-none prose-headings:text-foreground">
        <h2>El Rey Indiscutible de los Juegos de Cartas</h2>
        <p>Conocido mundialmente como <em>Ring of Fire</em>, <em>King's Cup</em>, o <em>La Copa del Rey</em>, estamos ante el juego universitario por excelencia. Su mezcla de reglas aleatorias, pruebas de reflejos y el componente de suspense con la Copa del Centro lo hacen inigualable. Con BeberGames ya no necesitas acordarte de las reglas ni llevar una baraja sucia en el bolsillo.</p>

        <h2>Lo que necesitas para jugar</h2>
        <ul>
          <li><strong>Jugadores:</strong> Ideal a partir de 4 jugadores. Cuantos más, más caos.</li>
          <li><strong>El Altar:</strong> Un vaso vacío y de gran tamaño situado justo en el centro de la mesa (La famosa "Copa del Rey").</li>
          <li><strong>El mazo:</strong> Nuestra app con su baraja virtual aleatoria.</li>
          <li><strong>Bebidas:</strong> Las copas de todos. Cuidado: puede que se tengan que mezclar al final.</li>
        </ul>

        <h2>Dinámica Básica</h2>
        <p>Los jugadores se sientan alrededor del vaso central. Por turnos (siguiendo el sentido de las agujas del reloj), cada participante roba una carta virtual de nuestra aplicación. Instantáneamente, la persona que ha robado debe cumplir la regla que nuestra app indica en pantalla para esa carta.</p>
        
        <h2>El Místico Valor de las Cartas</h2>
        <p>Aunque nosotros te mostramos la regla en pantalla, aquí tienes el chuletario definitivo:</p>
        <ul>
          <li><strong>As = "Cascada" (Waterfall)</strong>: El que saca la carta empieza a beber, y todos los demás deben empezar a beber también a la vez. Nadie puede parar hasta que no pare la persona de su derecha. ¡El del As controla el grifo!</li>
          <li><strong>2 = "Tú"</strong>: Eliges a cualquier persona de la mesa para que dé dos generosos tragos.</li>
          <li><strong>3 = "Yo"</strong>: Castigo directo. Tú bebes tres tragos de tu copa.</li>
          <li><strong>4 = "Chicas" (Whores)</strong>: Todas las mujeres presentes levantan su copa y beben.</li>
          <li><strong>5 = "Pulgar maestro"</strong>: Te conviertes en el maestro del pulgar. Cuando quieras (incluso minutos más tarde), pon disimuladamente tu pulgar en la mesa. El resto debe imitarte. ¡El último bebe!</li>
          <li><strong>6 = "Chicos" (Dicks)</strong>: Todos los hombres presentes beben.</li>
          <li><strong>7 = "Al Cielo" (Heaven)</strong>: El último en levantar los dos brazos apuntando al techo, bebe.</li>
          <li><strong>8 = "Compañero" (Mate)</strong>: Eliges a una pareja de baile. Desde ahora y hasta el fin del juego, cada vez que tú bebas, él/ella está obligado a beber la misma cantidad.</li>
          <li><strong>9 = "Rima"</strong>: Dices una palabra (ej: Camión) y el turno avanza. Todos deben decir palabras que rimen (avión, balcón). El primero que tarde mucho o repita palabra, traga.</li>
          <li><strong>10 = "Categorías"</strong>: Nombra una temática (ej: "Marcas de zapatillas", "Enfermedades raras"). Vamos por orden. El que se quede en blanco, bebe.</li>
          <li><strong>J = "Tú mandas" (Rule)</strong>: Tu momento divino. Inventa una norma nueva. Ej: "Solo se puede beber con la mano izquierda" o "Antes de hablar hay que gruñir". Si alguien incumple tu nueva ley durante la noche, castigo.</li>
          <li><strong>Q = "Preguntas" (Questions)</strong>: Empiezas haciendo una pregunta mirando a alguien a los ojos. Esa persona NO puede responder, debe hacerle inmediatamente otra pregunta a otro jugador. Quien conteste o tarde en preguntar, pierde y bebe.</li>
          <li><strong>K = "El Rey" (King's Cup)</strong>: La carta más temida. Los primeros tres Reyes que salgan: deben echar un generoso chorro de sus propias bebidas (aunque sea una mezcla rara) dentro del vaso grande del centro. <strong>El pobre desgraciado que saque el cuarto y último Rey debe beberse íntegramente la repugnante mezcla de la Copa del Centro y el juego se termina.</strong></li>
        </ul>
      </div>

      <div className="mt-12 flex justify-center">
        <Link href="/juegos/ring-of-fire" className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-red-500/25 transition-all hover:scale-105">
          Jugar Ring of Fire Ahora
        </Link>
      </div>
    </div>
  );
}
