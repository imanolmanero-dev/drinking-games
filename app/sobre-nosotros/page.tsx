import type { Metadata } from 'next';
import Link from 'next/link';
import { Info, ShieldAlert, Heart, Smartphone, Users, BookOpen, Gamepad2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sobre Nosotros — Quiénes Somos',
  description: 'BeberGames es un proyecto creado por Imanol, desarrollador web español. 13 juegos de beber gratuitos, más de 30 artículos y cero anuncios intrusivos.',
};

export default function SobreNosotrosPage() {
  return (
    <div className="flex flex-1 flex-col items-center px-4 py-16 sm:py-24">
      <div className="w-full max-w-3xl">
        <header className="mb-12 flex flex-col gap-6 text-center sm:text-left">
          <div className="flex justify-center sm:justify-start">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent-secondary shadow-lg shadow-accent-glow/20">
              <Info className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Sobre Nosotros
          </h1>
          <p className="text-xl text-muted leading-relaxed">
            La historia de BeberGames: un proyecto personal que se convirtió en la plataforma de juegos para beber más completa en español.
          </p>
        </header>

        {/* Stats */}
        <div className="mb-12 grid grid-cols-3 gap-4 text-center">
          <div className="rounded-2xl border border-border bg-surface p-5 flex flex-col items-center gap-2">
            <Gamepad2 className="h-6 w-6 text-accent" />
            <p className="text-3xl font-black">13</p>
            <p className="text-xs text-muted">Juegos interactivos</p>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-5 flex flex-col items-center gap-2">
            <BookOpen className="h-6 w-6 text-accent" />
            <p className="text-3xl font-black">32</p>
            <p className="text-xs text-muted">Artículos del blog</p>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-5 flex flex-col items-center gap-2">
            <Users className="h-6 w-6 text-accent" />
            <p className="text-3xl font-black">100%</p>
            <p className="text-xs text-muted">Gratuito y sin descarga</p>
          </div>
        </div>

        <article className="prose prose-invert prose-p:text-muted prose-li:text-muted max-w-none prose-headings:text-foreground prose-a:text-accent">

          <h2 className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-accent" /> La historia
          </h2>
          <p>
            BeberGames lo empecé yo, <strong>Imanol</strong>, en 2024. Soy desarrollador web español y la idea nació de una frustración muy concreta: todas las apps de juegos para beber que encontraba en el mercado tenían el mismo problema. O estaban en inglés, o estaban llenas de anuncios que interrumpían cada 30 segundos, o las preguntas eran tan genéricas que daban vergüenza ajena.
          </p>
          <p>
            Así que decidí construir lo que me hubiera gustado encontrar: una plataforma completamente gratuita, sin descargas, con contenido escrito a mano en español de verdad. No traducciones automáticas, no listas generadas por algoritmos. Cada pregunta de Yo Nunca, cada dilema de Yo Prefiero y cada reto de Verdad o Reto está curado para que tenga gracia de verdad con un grupo de amigos hispanohablantes.
          </p>
          <p>
            Lo que empezó como un proyecto de fin de semana acabó convirtiéndose en una plataforma con 13 juegos interactivos y más de 30 artículos de blog. Todo sin dejar de ser gratuito y sin muro de pago.
          </p>

          <h2 className="flex items-center gap-2 mt-10">
            <Smartphone className="h-6 w-6 text-accent" /> Diseño pensado para la fiesta real
          </h2>
          <p>
            BeberGames está diseñado para el contexto donde realmente se usa. Estás en un bar con poca luz, o en el salón de un amigo con música alta. Por eso los botones son grandes, el contraste está optimizado para pantallas oscuras (modo oscuro nativo) y las transiciones son rápidas.
          </p>
          <p>
            La tecnología tiene que ser invisible. Lo que importa son las personas que tienes delante, no entender cómo funciona una interfaz complicada. Abres el móvil, eliges el juego y en menos de 30 segundos estáis jugando.
          </p>

          <h2 className="flex items-center gap-2 mt-10" id="consumo-responsable">
            <ShieldAlert className="h-6 w-6 text-yellow-500" /> Consumo responsable
          </h2>
          <p>
            Esto es lo más importante. BeberGames está diseñado para desinhibir y divertir. <strong>No promovemos ni justificamos el consumo excesivo de alcohol ni la presión social para beber.</strong>
          </p>
          <ul>
            <li>
              <strong>Solo para mayores de 18 años.</strong> Todo el contenido está dirigido exclusivamente a personas mayores de edad legal para consumir alcohol en su país.
            </li>
            <li>
              <strong>Puedes jugar sin alcohol.</strong> Ningún juego obliga a beber alcohol. Agua, refresco, zumo o cualquier otra bebida funcionan igual de bien. Lo importante es la dinámica, no la sustancia.
            </li>
            <li>
              <strong>Nadie está obligado a nada.</strong> Cualquier jugador puede pasar un reto, no responder una pregunta o salir del juego sin ser presionado. El respeto es parte de las reglas.
            </li>
            <li>
              <strong>Nunca bebas y conduzcas.</strong> Si consumes alcohol, organiza el regreso a casa antes de empezar: transporte público, taxi, VTC o conductor designado.
            </li>
          </ul>

          <div className="my-10 rounded-2xl border-2 border-red-500/30 bg-red-500/5 p-6 flex flex-col items-center text-center">
            <ShieldAlert className="h-10 w-10 text-red-500 mb-3" />
            <h3 className="text-xl font-bold text-foreground mt-0 mb-2">Aviso de Seguridad</h3>
            <p className="text-sm text-muted m-0">
              El consumo excesivo de alcohol supone un grave riesgo para la salud física y mental. Disfruta con moderación. Si crees que el alcohol está afectando negativamente a tu vida o a la de alguien cercano, busca ayuda profesional.
            </p>
          </div>

          <h2 className="mt-10">Contacto</h2>
          <p>
            Si tienes sugerencias para nuevos juegos, has encontrado algún error, o simplemente quieres decir algo, puedes escribirme a través de la <Link href="/contacto">página de contacto</Link>. Leo todos los mensajes y actualizo los juegos con las propuestas que más sentido tienen.
          </p>
          <div className="not-prose mt-8 flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
            <Link
              href="/contacto"
              className="flex items-center justify-center gap-2 rounded-xl bg-surface px-6 py-3 text-sm font-semibold text-foreground border border-border shadow-sm transition-all hover:bg-surface-hover"
            >
              Contactar
            </Link>
            <Link
              href="/juegos"
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent-secondary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent-glow/20 transition-all hover:scale-105"
            >
              Explorar los juegos
            </Link>
          </div>

        </article>
      </div>
    </div>
  );
}
