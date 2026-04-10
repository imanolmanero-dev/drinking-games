import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beer Pong Virtual — Juego para Beber Online",
  description:
    "Lleva el marcador de tu partida de Beer Pong desde el móvil. Gestiona los vasos, rondas y desafíos especiales. ¡El árbitro digital definitivo para vuestro Beer Pong!",
  openGraph: {
    title: "Beer Pong Virtual — Árbitro Digital | BeberGames",
    description:
      "Controla tu partida de Beer Pong desde el móvil. Vasos, turnos, reglas especiales y desafíos automáticos.",
  },
};

export default function BeerPongLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
