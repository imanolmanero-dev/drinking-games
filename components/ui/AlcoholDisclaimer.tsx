import Link from "next/link";

/**
 * Pequeño aviso de consumo responsable para páginas de juegos.
 * Requerido por la política de Google AdSense para contenido de alcohol.
 */
export default function AlcoholDisclaimer() {
  return (
    <div className="w-full border-t border-border bg-surface/50 px-4 py-3">
      <p className="mx-auto max-w-4xl text-center text-xs text-muted leading-relaxed">
        🔞 <strong className="text-foreground/70">Solo para mayores de 18 años.</strong>{" "}
        Bebe con moderación. Puedes jugar sin alcohol.{" "}
        <Link
          href="/sobre-nosotros#consumo-responsable"
          className="underline hover:text-foreground transition-colors"
        >
          Ver nuestra guía de consumo responsable
        </Link>
        .
      </p>
    </div>
  );
}
