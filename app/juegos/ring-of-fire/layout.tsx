import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ring of Fire / Anillo de Fuego",
  description:
    "El clásico juego de cartas Ring of Fire para beber. Roba una carta y cumple la regla. De 2 a Rey, ¿quién se beberá la Copa del Rey?",
  openGraph: {
    title: "Ring of Fire | BeberGames",
    description: "Roba una carta de la baraja y cumple la regla. El clásico juego para previas.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
