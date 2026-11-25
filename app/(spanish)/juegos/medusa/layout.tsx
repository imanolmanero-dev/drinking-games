import type { Metadata } from "next";
import GameLayout from "@/components/layout/GameLayout";

export const metadata: Metadata = {
  title: "Medusa — Juego para beber con miradas",
  description:
    "Juega a Medusa con amigos. A la señal, levantad la vista. Si dos miradas coinciden, decid ¡Medusa! y quedaos de piedra.",
  openGraph: {
    title: "Medusa — Juego para beber",
    description:
      "Quince rondas para poner a prueba vuestros reflejos. Mirad abajo, esperad la señal y descubrid quién os está mirando.",
  },
  alternates: {
    canonical: "https://bebergames.com/juegos/medusa",
  },
};

export default function MedusaLayout({ children }: { children: React.ReactNode }) {
  return <GameLayout gameId="medusa">{children}</GameLayout>;
}

