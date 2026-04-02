"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wine, ArrowLeft, Gamepad2 } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border backdrop-blur-xl bg-background/80">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        {/* Logo / Brand */}
        <Link
          href="/"
          className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-secondary shadow-lg shadow-accent-glow">
            <Wine className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight">
            Beber<span className="text-accent">Games</span>
          </span>
        </Link>

        {/* Navigation action */}
        {!isHome ? (
          <Link
            href="/"
            className="flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition-all hover:border-accent/40 hover:bg-surface-hover hover:shadow-lg hover:shadow-accent-glow"
          >
            <ArrowLeft className="h-4 w-4" />
            Ver juegos
          </Link>
        ) : (
          <div className="flex items-center gap-2 text-sm text-muted">
            <Gamepad2 className="h-4 w-4" />
            <span className="hidden sm:inline">Juegos para beber</span>
          </div>
        )}
      </div>
    </nav>
  );
}
