import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Juegos de mesa y dados para beber",
  description:
    "Colección de juegos de dados para beber en grupo. Lanza los dados y que la suerte decida quién bebe esta ronda.",
  openGraph: {
    title: "Juegos de Dados para Beber | BeberGames",
    description: "Juegos de dados clásicos para previas como el Señor del 3 (Triman).",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
