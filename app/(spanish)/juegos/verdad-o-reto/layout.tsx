import type { Metadata } from "next";
import GameLayout from "@/components/layout/GameLayout";

export const metadata: Metadata = {
  title: "Verdad o Reto — Juego para beber online",
  description:
    "Juega a Verdad o Reto online con amigos desde el navegador. Elige la intensidad y descubre preguntas y retos al azar en cada turno.",
  openGraph: {
    title: "Verdad o Reto — Juego para beber online",
    description:
      "160 tarjetas (80 verdades y 80 retos) en 3 niveles: Soft, Normal y Picante. ¡Si no cumples, fondo blanco!",
  },
  alternates: {
    canonical: "https://bebergames.com/juegos/verdad-o-reto",
  },
};

export default function VerdadORetoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <GameLayout gameId="verdad-o-reto">{children}</GameLayout>;
}
