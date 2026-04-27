import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description: 'Política de Privacidad de BeberGames.',
  robots: { index: true, follow: true }
}

export default function PrivacidadPage() {
  return (
    <div className="flex flex-1 flex-col mx-auto max-w-3xl w-full px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Política de Privacidad</h1>
      
      <div className="prose prose-invert prose-p:text-muted prose-li:text-muted max-w-none prose-headings:text-foreground">
        <h2>1. Información general</h2>
        <p>En BeberGames, respetamos y protegemos la privacidad de nuestros usuarios. A continuación explicamos cómo recopilamos y usamos la información.</p>

        <h2>2. Datos recopilados</h2>
        <p>No recopilamos datos personales (nombres, correos, contraseñas) para el funcionamiento básico del juego. Los nombres insertados durante las partidas se guardan únicamente en el almacenamiento local de su dispositivo y no se transmiten a nuestros servidores.</p>
        <p>No obstante, utilizamos servicios de terceros (como Google Analytics y Google AdSense) que pueden recopilar información estadística o de navegación, según sus propias políticas.</p>

        <h2>3. Uso de proveedores externos</h2>
        <ul>
          <li><strong>Google Analytics:</strong> Nos ayuda a entender cómo navegas por la web para mejorar la experiencia.</li>
          <li><strong>Google AdSense:</strong> Proveedor de publicidad que utiliza cookies para mostrar anuncios relevantes basados en tus visitas previas.</li>
        </ul>

        <h2>4. Derechos de los usuarios</h2>
        <p>Dado que no almacenamos información de identidad personal de forma nativa en nuestros servidores, cualquier control de privacidad respecto a navegación de anuncios deberá gestionarse directamente ajustando las preferencias de Google y borrando el caché o almacenamiento local del navegador.</p>

        <h2>5. Cambios en la política</h2>
        <p>Nos reservamos el derecho de modificar esta política en cualquier momento. Los cambios se actualizarán en esta misma página.</p>

        <h2>6. Contacto sobre Protección de Datos</h2>
        <p>Para ejercer tu derecho de acceso, rectificación, cancelación u oposición respecto a tus datos o cookies (según la normativa vigente RGPD de la UE), no dudes en contactarnos directamente escribiendo a <a href="mailto:info@bebergames.com" className="text-accent underline font-semibold">info@bebergames.com</a>. Trataremos de resolver tu solicitud de inmediato.</p>

        <hr />
        <p className="text-xs text-muted"><strong>Última actualización:</strong> Abril de 2026</p>
      </div>
    </div>
  );
}
