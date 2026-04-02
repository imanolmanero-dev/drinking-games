import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quién Es Más Probable",
  description:
    "Juego para beber de 'Quién Es Más Probable'. Lee la pregunta, cuenta hasta tres, y señalad todos a la vez. ¡El más votado bebe!",
  openGraph: {
    title: "Quién Es Más Probable | BeberGames",
    description: "El más señalado, bebe. Descubre qué piensan tus amigos de ti.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
