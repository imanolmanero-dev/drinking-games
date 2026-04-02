import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Juegos de preguntas para beber",
  description:
    "Colección de juegos para beber basados en preguntas. Yo Nunca, Verdad o Reto, Quién es más probable... descubre los secretos de tus amigos.",
  openGraph: {
    title: "Juegos de Preguntas para Beber | BeberGames",
    description: "Salseo, secretos y risas. Los mejores juegos de preguntas para grupos.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
