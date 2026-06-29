import type { Metadata } from "next";
import GameLayout from "@/components/layout/GameLayout";

export const metadata: Metadata = {
  title: "Yo Nunca — Juego para beber online",
  description:
    "Juega a Yo Nunca con amigos. Más de 150 preguntas en español para beber en grupo, en 3 niveles de intensidad. ¡El que lo haya hecho, bebe!",
  openGraph: {
    title: "Yo Nunca — Juego para beber online",
    description:
      "Más de 150 preguntas para beber en grupo en 3 niveles: suave, normal y picante. ¡El que lo haya hecho, bebe!",
  },
  alternates: {
    canonical: "https://bebergames.com/juegos/yo-nunca",
  },
};

export default function YoNuncaLayout({ children }: { children: React.ReactNode }) {
  return <GameLayout gameId="yo-nunca">{children}</GameLayout>;
}
