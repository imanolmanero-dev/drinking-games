import type { Metadata } from "next";
import GameLayout from "@/components/layout/GameLayout";

export const metadata: Metadata = {
  title: "Triman — Juego de Dados para Beber Online",
  description:
    "Juega al Triman con un dado virtual. Descubre quién lleva la corona y qué gesto propone cada una de las seis caras.",
  openGraph: {
    title: "Triman — Juego de Dados para Beber",
    description:
      "Tira el dado, pasa la corona y prueba los gestos del Triman con tu grupo.",
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
