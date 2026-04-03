import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-border bg-surface py-8 mt-auto">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          
          <div className="flex flex-col items-center gap-2 sm:items-start">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg text-foreground hover:text-accent transition-colors">
              <span className="text-xl">🍻</span> BeberGames
            </Link>
            <p className="text-xs text-muted max-w-xs text-center sm:text-left">
              La mayor colección de juegos para beber con amigos. Bebe con moderación, tu responsabilidad.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs font-medium text-muted">
            <Link href="/blog" className="hover:text-accent transition-colors flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5" /> Blog
            </Link>
            <Link href="/legal/privacidad" className="hover:text-foreground transition-colors">
              Privacidad
            </Link>
            <Link href="/legal/cookies" className="hover:text-foreground transition-colors">
              Cookies
            </Link>
            <Link href="/legal/aviso-legal" className="hover:text-foreground transition-colors">
              Aviso Legal
            </Link>
            <Link href="/contacto" className="hover:text-foreground transition-colors">
              Contacto
            </Link>
          </div>

        </div>
        
        <div className="mt-8 flex items-center justify-center border-t border-border/50 pt-4 text-center text-[10px] text-muted">
          <p>© {new Date().getFullYear()} BeberGames. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
