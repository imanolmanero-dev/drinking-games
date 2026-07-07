import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Juegos para Beber Sin Materiales",
  description:
    "Juegos para beber que no necesitan cartas, dados ni ningún material. Solo gente, bebidas y ganas de pasarlo bien.",
  openGraph: {
    title: "Juegos para Beber Sin Materiales",
    description: "Solo necesitáis gente y bebidas. Los mejores juegos para beber sin ningún material extra.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
