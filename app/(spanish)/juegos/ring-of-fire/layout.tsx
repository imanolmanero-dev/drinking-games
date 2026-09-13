import type { Metadata } from "next";
import GameLayout from "@/components/layout/GameLayout";

export const metadata: Metadata = {
  title: "Ring of Fire — Anillo de Fuego para Beber Online",
  description:
    "El clásico juego de cartas Ring of Fire para beber. Roba una carta y cumple la regla. De 2 a Rey, ¿quién se beberá la Copa del Rey?",
  openGraph: {
    title: "Ring of Fire — Anillo de Fuego para Beber",
    description: "Roba una carta de la baraja y cumple la regla. El clásico juego para previas.",
  },
  alternates: {
    canonical: "https://bebergames.com/juegos/ring-of-fire",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <GameLayout gameId="ring-of-fire">{children}</GameLayout>;
}

