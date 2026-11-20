import type { Metadata } from "next";
import GameLayout from "@/components/layout/GameLayout";

export const metadata: Metadata = {
  title: "La Ruleta — Juego para beber online",
  description:
    "Gira la ruleta con tu grupo y descubre uno de los 16 retos. En cada turno puedes jugar o pasar.",
  openGraph: {
    title: "La Ruleta — Juego para beber online",
    description:
      "Gira la ruleta y descubre uno de los 16 retos. Puedes pasar en cualquier turno.",
  },
  alternates: {
    canonical: "https://bebergames.com/juegos/la-ruleta",
  },
};

export default function LaRuletaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <GameLayout gameId="la-ruleta">{children}</GameLayout>;
}
