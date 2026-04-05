import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Cookies | BeberGames',
  description: 'Política de Cookies de BeberGames.',
  robots: { index: true, follow: true }
}

export default function CookiesPage() {
  return (
    <div className="flex flex-1 flex-col mx-auto max-w-3xl w-full px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Política de Cookies</h1>
      
      <div className="prose prose-invert prose-p:text-muted prose-li:text-muted max-w-none prose-headings:text-foreground">
        <h2>¿Qué son las cookies?</h2>
        <p>Una cookie es un pequeño fichero de texto que un sitio web almacena en tu ordenador o dispositivo móvil cuando lo visitas. Facilita la navegación y ayuda a mostrar anuncios personalizados.</p>

        <h2>¿Para qué utilizamos cookies?</h2>
        <p>En BeberGames no utilizamos cookies perjudiciales. Solamente usamos tecnologías para asegurar el correcto funcionamiento técnico (como guardar tus preferencias) e integrar servicios de terceros.</p>

        <h2>Cookies de Terceros</h2>
        <ul>
          <li><strong>Google Analytics:</strong> Recopila estadísticas anónimas sobre el tráfico de la web.</li>
          <li><strong>Google AdSense:</strong> Google utiliza cookies para publicar anuncios basados en las visitas anteriores del usuario a este u otros sitios web. Los usuarios pueden inhabilitar esta publicidad en la Configuración de anuncios de Google.</li>
        </ul>

        <h2>Uso del LocalStorage</h2>
        <p>Para mejorar tu experiencia de juego y que no tengas que escribir de nuevo los nombres de los participantes, hacemos uso del <code>localStorage</code> de tu navegador, una memoria temporal de tu propio móvil u ordenador. Nosotros nunca accedemos remotamente a ella.</p>

        <h2>¿Cómo desactivar cookies?</h2>
        <p>Puedes restringir, bloquear o borrar las cookies de cualquier página web usando tu navegador. En cada navegador la operativa es diferente, la función de "Ayuda" web te mostrará cómo hacerlo.</p>
      </div>
    </div>
  );
}
