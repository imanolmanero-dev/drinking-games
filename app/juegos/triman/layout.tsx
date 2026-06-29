import type { Metadata } from "next";
import GameLayout from "@/components/layout/GameLayout";

export const metadata: Metadata = {
  title: "Triman — Juego de Dados para Beber Online",
  description:
    "Juega al Triman, el juego del dado para beber. Lanza el dado, descubre quién bebe según las 6 reglas. ¡El Señor del 3 siempre bebe!",
  openGraph: {
    title: "Triman — Juego de Dados para Beber",
    description:
      "El juego del dado para beber. Lanza el dado y descubre quién bebe según las reglas.",
  },
  alternates: {
    canonical: "https://bebergames.com/juegos/triman",
  },
};

export default function TrimanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <GameLayout gameId="triman">{children}</GameLayout>;
}
