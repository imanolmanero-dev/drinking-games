"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if already dismissed this session
    const wasDismissed = sessionStorage.getItem("bg_pwa_dismissed");
    if (wasDismissed) {
      setDismissed(true);
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Show banner after 5 seconds so it doesn't appear immediately
      setTimeout(() => setShowBanner(true), 5000);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setShowBanner(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowBanner(false);
    setDismissed(true);
    sessionStorage.setItem("bg_pwa_dismissed", "1");
  };

  if (dismissed || !showBanner) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", damping: 25 }}
        className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-md"
      >
        <div className="flex items-center gap-3 rounded-2xl border border-accent/20 bg-surface/95 backdrop-blur-xl p-4 shadow-2xl shadow-accent-glow/10">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-secondary">
            <Download className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold">Instalar BeberGames</p>
            <p className="text-xs text-muted truncate">
              Juega sin conexión directamente desde tu pantalla
            </p>
          </div>
          <button
            onClick={handleInstall}
            className="shrink-0 rounded-lg bg-gradient-to-r from-accent to-accent-secondary px-3 py-1.5 text-xs font-semibold text-white transition-transform hover:scale-105"
          >
            Instalar
          </button>
          <button
            onClick={handleDismiss}
            className="shrink-0 rounded-lg p-1.5 text-muted transition-colors hover:text-foreground hover:bg-surface-hover"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
