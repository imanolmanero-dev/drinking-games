import type { Metadata } from "next";
import GameLayout from "@/components/layout/GameLayout";

export const metadata: Metadata = {
  title: "La Pirámide — Juego de Beber con Cartas Online",
  description:
    "Juega a La Pirámide online y gratis. Memoriza tus cartas, farolea y asigna tragos. El juego de cartas con más farol de todas las previas.",
  openGraph: {
    title: "La Pirámide",
    description: "Memoriza, farolea y asigna tragos. El clásico juego de cartas para beber.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <GameLayout gameId="la-piramide">{children}</GameLayout>;
}
