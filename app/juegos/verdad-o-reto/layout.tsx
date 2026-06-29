import type { Metadata } from "next";
import GameLayout from "@/components/layout/GameLayout";

export const metadata: Metadata = {
  title: "Verdad o Reto — Juego para beber online",
  description:
    "Juega a Verdad o Reto para beber con amigos. Más de 80 verdades y 80 retos en español, en 3 niveles de intensidad. Si no cumples… ¡fondo blanco!",
  openGraph: {
    title: "Verdad o Reto — Juego para beber online",
    description:
      "Más de 160 tarjetas (80 verdades y 80 retos) en 3 niveles: suave, normal y picante. ¡Si no cumples, fondo blanco!",
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
