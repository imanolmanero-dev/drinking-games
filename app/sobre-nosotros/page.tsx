import type { Metadata } from 'next';
import Link from 'next/link';
import { Info, ShieldAlert, Heart, Smartphone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sobre Nosotros | BeberGames',
  description: 'Conoce la historia detrás de BeberGames, nuestra misión, valores y el compromiso rotundo con el consumo responsable y la seguridad.',
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
            La historia, misión y valores detrás de la plataforma líder de juegos de beber en habla hispana.
          </p>
        </header>

        <article className="prose prose-invert prose-p:text-muted prose-li:text-muted max-w-none prose-headings:text-foreground prose-a:text-accent">
          
          <h2 className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-accent" /> Nuestra Historia
          </h2>
          <p>
            BeberGames nació de una necesidad real que compartíamos muchos grupos de amigos. Todos hemos estado en una fiesta, una cena o una previa donde el ambiente empezaba a decaer y alguien sugería: <em>"¿Jugamos a algo?"</em>. El problema siempre era el mismo: o nadie recordaba bien las reglas de Ring of Fire, o no teníamos una baraja de cartas a mano, o las aplicaciones que descargábamos estaban llenas de anuncios intrusivos, muros de pago y traducciones automáticas sin sentido.
          </p>
          <p>
            Decidimos crear la solución definitiva: una plataforma <strong>completamente gratuita, sin necesidad de descargas, y con contenido 100% curado a mano por hispanohablantes</strong>. No dependemos de algoritmos generadores de frases al azar; cada tarjeta de Yo Nunca, cada castigo de La Ruleta y cada dilema de Yo Prefiero ha sido escrito, revisado y clasificado por nuestro equipo para asegurar la máxima diversión.
          </p>

          <h2 className="flex items-center gap-2 mt-10">
            <Smartphone className="h-6 w-6 text-accent" /> Diseño Mobile-First y Accesibilidad
          </h2>
          <p>
            Entendemos el contexto en el que se usa BeberGames. Estás en un bar con poca luz, o en el salón de un amigo con música alta. Por eso hemos puesto un énfasis obsesivo en nuestro diseño y en la experiencia de usuario (UX). 
          </p>
          <p>
            Toda nuestra infraestructura está diseñada bajo el paradigma <strong>Mobile-First</strong>. Esto significa que los botones son grandes y fáciles de pulsar, el contraste de colores está optimizado para pantallas oscuras (Dark Mode nativo), y las transiciones son suaves pero rápidas. Queremos que la tecnología sea invisible y que la atención se concentre en las personas que tienes delante, no en entender cómo funciona una interfaz complicada.
          </p>

          <h2 className="flex items-center gap-2 mt-10" id="consumo-responsable">
            <ShieldAlert className="h-6 w-6 text-yellow-500" /> Compromiso con el Consumo Responsable
          </h2>
          <p>
            Este es nuestro valor más importante. En BeberGames creamos juegos diseñados para desinhibir, socializar y romper el hielo de forma divertida. <strong>No promovemos, ni apoyamos, ni justificamos el consumo excesivo de alcohol ni las dinámicas de presión social dañinas ("peer pressure").</strong>
          </p>
          <p>
            Queremos dejar nuestra postura completamente clara para toda nuestra comunidad:
          </p>
          <ul>
            <li>
              <strong>Para adultos (+18):</strong> Todo el contenido de BeberGames y la mecánica de los juegos están dirigidos estricta y exclusivamente a personas mayores de edad legal para consumir alcohol en su respectivo país (18 años en la mayoría de los países hispanohablantes).
            </li>
            <li>
              <strong>Tú pones las reglas de tu vaso:</strong> Nadie está obligado a beber alcohol para jugar a BeberGames. Puedes disfrutar de toda la experiencia bebiendo agua, refrescos, zumos o cócteles sin alcohol ("mocktails"). Lo importante es la confesión, el reto o la dinámica, no la sustancia.
            </li>
            <li>
              <strong>Cero presión:</strong> Fomentamos un ambiente de juego seguro donde cualquier jugador tiene pleno derecho a "pasar" de un reto, no contestar a una pregunta o retirarse del juego sin ser juzgado por el resto.
            </li>
            <li>
              <strong>Nunca bebas y conduzcas:</strong> Si vas a beber alcohol, planifica tu regreso a casa de forma segura. Usa el transporte público, designa a un conductor que no beba o utiliza servicios de VTC/Taxis.
            </li>
          </ul>

          <div className="my-10 rounded-2xl border-2 border-red-500/30 bg-red-500/5 p-6 flex flex-col items-center text-center">
            <ShieldAlert className="h-10 w-10 text-red-500 mb-3" />
            <h3 className="text-xl font-bold text-foreground mt-0 mb-2">Aviso de Seguridad</h3>
            <p className="text-sm text-muted m-0">
              El consumo excesivo de alcohol supone un grave riesgo para tu salud física y mental. Disfruta con moderación. Si crees que el alcohol está afectando negativamente a tu vida o a la de alguien cercano, busca ayuda profesional de inmediato.
            </p>
          </div>

          <h2 className="mt-10">Contacto y Transparencia</h2>
          <p>
            Detrás de BeberGames hay un equipo de desarrolladores web y diseñadores comprometidos con la mejora continua. Escuchamos a nuestra comunidad y actualizamos constantemente nuestras base de datos de preguntas y la infraestructura técnica del sitio.
          </p>
          <p>
            Si tienes sugerencias para nuevos juegos, has encontrado algún error, o simplemente quieres dejarnos tu opinión, siempre estamos disponibles. Te invitamos a utilizar nuestra <Link href="/contacto">página oficial de Contacto</Link> o a revisar nuestras políticas en el pie de página para entender cómo protegemos tu privacidad.
          </p>
          <div className="not-prose mt-8 flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
             <Link 
              href="/contacto" 
              className="flex items-center justify-center gap-2 rounded-xl bg-surface px-6 py-3 text-sm font-semibold text-foreground border border-border shadow-sm transition-all hover:bg-surface-hover"
            >
              Contactar al equipo
            </Link>
             <Link 
              href="/juegos" 
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent-secondary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent-glow/20 transition-all hover:scale-105"
            >
              Explorar los Juegos
            </Link>
          </div>

        </article>
      </div>
    </div>
  );
}
