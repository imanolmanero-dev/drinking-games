import Link from "next/link";
import { BookOpen } from "lucide-react";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.17 8.17 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
    </svg>
  );
}

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
            {/* Redes sociales */}
            <div className="flex items-center gap-2 mt-1">
              <a
                href="https://www.instagram.com/bebergames"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="BeberGames en Instagram"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-all hover:text-pink-400 hover:bg-pink-500/10"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href="https://www.tiktok.com/@bebergames"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="BeberGames en TikTok"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-all hover:text-foreground hover:bg-surface-hover"
              >
                <TikTokIcon className="h-4 w-4" />
              </a>
            </div>
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
