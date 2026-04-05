import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aviso Legal | BeberGames',
  description: 'Aviso legal y condiciones de uso de BeberGames.',
  robots: { index: true, follow: true }
}

export default function AvisoLegalPage() {
  return (
    <div className="flex flex-1 flex-col mx-auto max-w-3xl w-full px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Aviso Legal</h1>
      
      <div className="prose prose-invert prose-p:text-muted prose-li:text-muted max-w-none prose-headings:text-foreground">
        <h2>Condiciones de Uso</h2>
        <p>El uso de la aplicación web BeberGames está sujeto a la aceptación de las presentes condiciones. BeberGames se proporciona "tal cual", como un recurso de entretenimiento y ocio digital diseñado para ser utilizado en reuniones y fiestas.</p>
        
        <h2>Exención de Responsabilidad</h2>
        <p>Esta aplicación no incita ni obliga al consumo inmoderado de alcohol o sustancias de ningún tipo. Toda actividad llevada a cabo durante el juego es de exclusiva elección y total responsabilidad de los participantes.</p>
        <p>Recomendamos encarecidamente:</p>
        <ul>
          <li>Beber con moderación.</li>
          <li>No conducir bajo los efectos del alcohol.</li>
          <li>Respetar la voluntad de cualquier persona que decida no beber o no completar un reto.</li>
        </ul>
        <p>Los creadores y administradores de BeberGames no asumen ninguna responsabilidad por cualquier daño, accidente, lesión, pérdida o percance derivado, de forma directa o indirecta, del uso de esta plataforma o de jugar a los juegos aquí listados.</p>

        <h2>Derecho de Propiedad y Contenido</h2>
        <p>Todos los conceptos de software y presentación pertenecen a BeberGames. La dinámica de los juegos se basa en la cultura popular, estando los textos creados originariamente para esta plataforma y sujetos a derechos de autor.</p>

        <hr />
        <p className="text-xs text-muted"><strong>Última actualización:</strong> Abril de 2026</p>
      </div>
    </div>
  );
}
