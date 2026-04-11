import type { Metadata } from "next";
import GameLayout from "@/components/layout/GameLayout";

export const metadata: Metadata = {
  title: "Yo Nunca — Juego para beber online",
  description:
    "Juega a Yo Nunca con amigos. 40 preguntas divertidas en español para beber en grupo. ¡El que lo haya hecho, bebe!",
  openGraph: {
    title: "Yo Nunca — Juego para beber online | BeberGames",
    description:
      "40 preguntas divertidas para beber en grupo. ¡El que lo haya hecho, bebe!",
  },
};

export default function YoNuncaLayout({ children }: { children: React.ReactNode }) {
  return <GameLayout gameId="yo-nunca">{children}</GameLayout>;
}
