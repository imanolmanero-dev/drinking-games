import type { Metadata } from "next";
import GameLayout from "@/components/layout/GameLayout";

export const metadata: Metadata = {
  title: "Verdad o Reto — Juego para beber online",
  description:
    "Juega a Verdad o Reto para beber con amigos. 30 verdades y 30 retos en español. Si no cumples… ¡fondo blanco!",
  openGraph: {
    title: "Verdad o Reto — Juego para beber online | BeberGames",
    description:
      "30 verdades y 30 retos en español. Elige verdad o reto. Si no cumples… ¡fondo blanco!",
  },
};

export default function VerdadORetoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <GameLayout gameId="verdad-o-reto">{children}</GameLayout>;
}
