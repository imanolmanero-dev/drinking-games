import type { Metadata } from "next";
import GameLayout from "@/components/layout/GameLayout";

export const metadata: Metadata = {
  title: "El Rey de la Copa — Juego de Cartas para Beber",
  description:
    "Juega al Rey de la Copa online. Descubre las 13 reglas de la baraja, pasa cuando quieras y cuenta los reyes hasta el final de la partida.",
  openGraph: {
    title: "El Rey de la Copa — Juego de Cartas para Beber",
    description:
      "Roba cartas, juega la cascada y aparta la copa al cuarto rey.",
  },
  alternates: {
    canonical: "https://bebergames.com/juegos/rey-de-la-copa",
  },
};

export default function ReyDeLaCopaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <GameLayout gameId="rey-de-la-copa">{children}</GameLayout>;
}
