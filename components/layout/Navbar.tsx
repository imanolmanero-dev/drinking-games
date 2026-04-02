"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wine, ArrowLeft, Gamepad2, Volume2, VolumeX, BookOpen } from "lucide-react";
import { useApp } from "@/lib/AppContext";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { soundEnabled, toggleSound, playSound } = useApp();

  const handleSoundToggle = () => {
    toggleSound();
    // If enabling, play a click to confirm
    if (!soundEnabled) {
      setTimeout(() => {
        // Play after state update
        const ctx = new (window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.06);
      }, 50);
    }
  };

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

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Sound toggle */}
          <button
            onClick={handleSoundToggle}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-hover hover:text-foreground"
            aria-label={soundEnabled ? "Desactivar sonido" : "Activar sonido"}
            title={soundEnabled ? "Sonido activado" : "Sonido desactivado"}
          >
            {soundEnabled ? (
              <Volume2 className="h-4 w-4" />
            ) : (
              <VolumeX className="h-4 w-4" />
            )}
          </button>

          {/* Blog Link */}
          <Link
            href="/blog"
            className="flex items-center gap-1.5 rounded-lg border border-transparent px-3 py-1.5 text-sm font-medium text-muted transition-colors hover:bg-surface-hover hover:text-foreground"
          >
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Blog</span>
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
      </div>
    </nav>
  );
}
