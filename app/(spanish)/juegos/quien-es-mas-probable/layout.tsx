import type { Metadata } from "next";
import GameLayout from "@/components/layout/GameLayout";

export const metadata: Metadata = {
  title: "Quién Es Más Probable — Juego para Beber Online",
  description:
    "Juega a Quién Es Más Probable con 60 preguntas repartidas por intensidad. Señalad a la vez, comparad las nominaciones en la mesa y pasad cuando queráis.",
  openGraph: {
    title: "Quién Es Más Probable — Juego para Beber Online",
    description: "Señalad a la de tres y descubrid a quién imagina el grupo en cada situación.",
  },
  alternates: {
    canonical: "https://bebergames.com/juegos/quien-es-mas-probable",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <GameLayout gameId="quien-es-mas-probable">{children}</GameLayout>;
}
