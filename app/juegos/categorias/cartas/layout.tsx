import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Juegos de cartas para beber",
  description:
    "Colección de juegos de cartas de póker para beber en grupo. Saca la baraja y descubre juegos clásicos como Ring of Fire o El Mentiroso.",
  openGraph: {
    title: "Juegos de Cartas para Beber | BeberGames",
    description: "Cartas, reglas y mucho alcohol. Los mejores juegos con cartas para tus previas.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
