import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tabú Borracho — Juego de Palabras para Beber",
  description:
    "Juega al Tabú Borracho con amigos. Describe la palabra sin decir las prohibidas. Si usas una palabra tabú… ¡bebes! Más de 65 tarjetas para fiestas y previas.",
  openGraph: {
    title: "Tabú Borracho — Juego de Palabras para Beber | BeberGames",
    description:
      "Describe la palabra sin decir las prohibidas. Si fallas… ¡bebes! El juego perfecto para fiestas.",
  },
};

export default function TabuLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
