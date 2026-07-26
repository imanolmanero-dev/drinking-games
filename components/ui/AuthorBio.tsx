import Link from "next/link";
import { UserCircle2 } from "lucide-react";

/**
 * Bloque de autor al final de cada post del blog.
 * Señal de E-E-A-T para Google: identifica a la persona real detrás del contenido.
 */
export default function AuthorBio() {
  return (
    <div className="mt-12 border-t border-border pt-8">
      <div className="flex items-start gap-4 rounded-2xl border border-border bg-surface p-6">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-amber-500/20">
          <UserCircle2 className="h-6 w-6 text-white" />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-bold text-foreground">
            Escrito por{" "}
            <Link
              href="/sobre-nosotros"
              className="text-amber-500 hover:text-amber-400 transition-colors"
            >
              Imanol — BeberGames
            </Link>
          </p>
          <p className="text-sm text-muted leading-relaxed">
            Desarrollador web y creador de BeberGames. Llevo desde 2024
            construyendo la plataforma de juegos para beber en español más
            completa: 13 juegos interactivos, gratis, sin descargas y sin
            anuncios molestos.{" "}
            <Link
              href="/sobre-nosotros"
              className="text-amber-500 hover:text-amber-400 transition-colors"
            >
              Saber más →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
