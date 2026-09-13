import type { Metadata } from "next";
import GameLayout from "@/components/layout/GameLayout";

export const metadata: Metadata = {
  title: "Quién Es Más Probable — Juego para Beber Online",
  description:
    "¿Quién bebería antes en un apocalipsis zombie? Señalad al culpable y que beba. +200 preguntas gratis, sin descargar nada. ¡Probadlo ahora!",
  openGraph: {
    title: "Quién Es Más Probable — Juego para Beber Online",
    description: "El más señalado, bebe. Descubre qué piensan tus amigos de ti.",
  },
  alternates: {
    canonical: "https://bebergames.com/juegos/quien-es-mas-probable",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <GameLayout gameId="quien-es-mas-probable">{children}</GameLayout>;
}
