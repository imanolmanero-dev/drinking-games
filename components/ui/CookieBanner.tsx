"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CookieBanner() {
  const [hasMounted, setHasMounted] = useState(false);
  const [visibleState, setVisibleState] = useState(false);

  // We only show it client-side to prevent hydration mismatch
  useEffect(() => {
    setHasMounted(true);
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setVisibleState(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setVisibleState(false);
  };

  const rejectCookies = () => {
    localStorage.setItem("cookie_consent", "rejected");
    setVisibleState(false);
  };

  if (!hasMounted) return null;

  return (
    <AnimatePresence>
      {visibleState && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-4xl"
        >
          <div className="flex flex-col gap-4 rounded-xl border border-border bg-surface/95 p-4 md:p-6 shadow-2xl shadow-black/50 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-4">
              <div className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10">
                <Cookie className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-foreground font-medium mb-1">
                  Valoramos tu privacidad
                </p>
                <p className="text-xs text-muted max-w-2xl">
                  En BeberGames no usamos cookies peligrosas. Utilizamos el almacenamiento local para guardar tus participantes y servicios genéricos de analítica y anuncios. Si continúas, asumimos que estás de acuerdo.{' '}
                  <Link href="/legal/cookies" className="text-accent hover:underline whitespace-nowrap">
                    Política de cookies
                  </Link>.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row flex-wrap items-center gap-3 shrink-0 mt-4 sm:mt-0 w-full sm:w-auto">
              <button
                onClick={rejectCookies}
                className="flex items-center justify-center rounded-lg bg-background hover:bg-surface-hover border border-border px-5 py-2.5 text-xs font-semibold text-muted hover:text-foreground transition-all whitespace-nowrap w-full sm:w-auto"
              >
                Solo Esenciales
              </button>
              <button
                onClick={acceptCookies}
                className="flex items-center justify-center rounded-lg bg-gradient-to-r from-accent to-accent-secondary px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-accent-glow transition-all hover:scale-105 whitespace-nowrap w-full sm:w-auto"
              >
                ¡Acepto todo! 🍻
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
