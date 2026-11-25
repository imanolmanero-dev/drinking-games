import type { Metadata } from "next";
import GameLayout from "@/components/layout/GameLayout";

export const metadata: Metadata = {
  title: "Tabú Borracho — Juego de Palabras para Beber",
  description:
    "Juega al Tabú Borracho con amigos. Describe la palabra sin usar las pistas prohibidas y suma aciertos en turnos de un minuto.",
  openGraph: {
    title: "Tabú Borracho — Juego de Palabras para Beber",
    description:
      "Dos equipos, seis turnos y un minuto para dar pistas. Cada palabra acertada suma un punto.",
  },
  alternates: {
    canonical: "https://bebergames.com/juegos/tabu",
  },
};

export default function TabuLayout({ children }: { children: React.ReactNode }) {
  return <GameLayout gameId="tabu">{children}</GameLayout>;
}
