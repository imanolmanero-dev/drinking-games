import type { Metadata } from "next";
import GameLayout from "@/components/layout/GameLayout";

export const metadata: Metadata = {
  title: "Yo Prefiero — Juego para beber online",
  description:
    "Juega a Yo Prefiero online. Hay 60 dilemas repartidos por intensidad. Elegid A o B, comparad los votos y pasad cuando queráis.",
  openGraph: {
    title: "Yo Prefiero — Juego para beber online",
    description:
      "¿A o B? Comparad preferencias con 60 dilemas repartidos por intensidad.",
  },
  alternates: {
    canonical: "https://bebergames.com/juegos/yo-prefiero",
  },
};

export default function YoPrefieroLayout({ children }: { children: React.ReactNode }) {
  return <GameLayout gameId="yo-prefiero">{children}</GameLayout>;
}
