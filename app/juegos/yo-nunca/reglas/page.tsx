import Link from 'next/link';
import { Wine, ChevronLeft } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reglas de Yo Nunca | Cómo Jugar',
  description: 'Descubre las reglas del clásico juego para beber Yo Nunca. Qué necesitas, cómo se juega y todo lo necesario para pasarlo genial.',
}

export default function YoNuncaReglasPage() {
  return (
    <div className="flex flex-1 flex-col mx-auto max-w-3xl w-full px-4 py-12">
      <Link href="/juegos/yo-nunca" className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors mb-6">
        <ChevronLeft className="h-4 w-4" />
        Volver al juego
      </Link>
      
      <div className="flex items-center gap-4 mb-8">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/25">
          <Wine className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Cómo Jugar a Yo Nunca</h1>
      </div>

      <div className="prose prose-invert prose-p:text-muted prose-li:text-muted max-w-none prose-headings:text-foreground">
        <h2>El Origen del "Yo Nunca"</h2>
        <p>
          Conocido internacionalmente como <em>"Never Have I Ever"</em>, este es sin duda el rey indiscutible de los juegos para romper el hielo. Su popularidad radica en su capacidad para sacar a la luz verdades ocultas de forma divertida y sin presiones directas. En BeberGames hemos digitalizado la experiencia con cientos de frases para que nunca te quedes en blanco.
        </p>

        <h2>Lo que necesitas para jugar</h2>
        <ul>
          <li><strong>Jugadores:</strong> Mínimo 2 personas (el punto ideal está entre 4 y 10).</li>
          <li><strong>Bebida:</strong> Vuestras copas llenas en todo momento.</li>
          <li><strong>Sinceridad:</strong> La regla de oro. Si mientes y te pillan... ¡toca beber el doble!</li>
        </ul>

        <h2>Dinámica paso a paso</h2>
        <p>
          La mecánica es extremadamente sencilla, pero las situaciones que genera son inolvidables:
        </p>
        <ol>
          <li><strong>Preparación:</strong> Todos los jugadores deben estar sentados en círculo con su vaso.</li>
          <li><strong>Configuración:</strong> Añadid todos los nombres en la aplicación y elegid el nivel de intensidad.</li>
          <li><strong>La confesión:</strong> La pantalla mostrará una afirmación que empieza por <em>"Yo nunca he..."</em>.</li>
          <li><strong>El momento de la verdad:</strong> Todos los que <em>sí</em> hayan hecho lo que dice la tarjeta alguna vez en su vida, deben dar un trago a su bebida. (Los que nunca lo hayan hecho se salvan).</li>
        </ol>

        <h2>Reglas caseras para darle picante (Modo Hardcore)</h2>
        <p>Si la partida está tranquila, aplicad estas variaciones obligatorias:</p>
        <ul>
          <li><strong>La historia completa:</strong> Si eres la única persona de la mesa que bebe, estás moralmente obligado a explicar detalladamente la historia de qué pasó.</li>
          <li><strong>Solidaridad (o castigo):</strong> Si absolutamente nadie bebe tras una frase, todos deben beber un trago simbólico por aburridos.</li>
        </ul>

        <h2>Explicación de Nuestras Intensidades</h2>
        <ul>
          <li><strong>🟢 Soft (Suave):</strong> Situaciones cotidianas y graciosas. Ideal para calentar motores o jugar con gente que acabas de conocer.</li>
          <li><strong>🟡 Normal (Salseo):</strong> Mentirijillas, situaciones algo vergonzosas y exparejas. El nivel clásico perfecto para amigos.</li>
          <li><strong>🔴 Picante (Hot):</strong> Solo para grupos sin tabúes morales. Mucho sexo, secretos inconfesables y límites cruzados.</li>
        </ul>
      </div>

      <div className="mt-12 flex justify-center">
        <Link href="/juegos/yo-nunca" className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-purple-500/25 transition-all hover:scale-105">
          Jugar Yo Nunca Ahora
        </Link>
      </div>
    </div>
  );
}
