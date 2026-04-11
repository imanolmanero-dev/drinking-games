import type { Metadata } from "next";
import GameLayout from "@/components/layout/GameLayout";

export const metadata: Metadata = {
  title: "La Ruleta — Juego para beber online",
  description:
    "Gira la ruleta y cumple el castigo que te toque. 16 castigos divertidos para tu grupo. ¡Sin excusas!",
  openGraph: {
    title: "La Ruleta — Juego para beber online | BeberGames",
    description:
      "Gira la ruleta y cumple el castigo que te toque. 16 castigos divertidos. ¡Sin excusas!",
  },
};

export default function LaRuletaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <GameLayout gameId="la-ruleta">{children}</GameLayout>;
}
