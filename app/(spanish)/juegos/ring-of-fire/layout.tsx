import type { Metadata } from "next";
import GameLayout from "@/components/layout/GameLayout";

export const metadata: Metadata = {
  title: "Ring of Fire — Anillo de Fuego para Beber Online",
  description:
    "Juega al Ring of Fire con 52 cartas. Pasa la ola, enlaza rimas y cuenta los reyes hasta retirar la copa central.",
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

