import type { Metadata } from "next";
import GameLayout from "@/components/layout/GameLayout";

export const metadata: Metadata = {
  title: "La Bomba — Juego de Beber con Countdown",
  description:
    "Juega a La Bomba online. Pasa el móvil mientras corre un temporizador secreto y descubre quién abrirá la siguiente ronda.",
  openGraph: {
    title: "La Bomba — Juego de Beber",
    description:
      "Enciende la mecha y pasa el móvil. La alarma decide quién abre la siguiente ronda.",
  },
  alternates: {
    canonical: "https://bebergames.com/juegos/la-bomba",
  },
};

export default function LaBombaLayout({ children }: { children: React.ReactNode }) {
  return <GameLayout gameId="la-bomba">{children}</GameLayout>;
}

