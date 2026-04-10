import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "El Rey de la Copa — Juego de Cartas para Beber",
  description:
    "Juega a El Rey de la Copa online. Roba cartas y cumple sus reglas. El cuarto Rey tiene que beberse la copa entera. ¡El juego de cartas más épico para beber!",
  openGraph: {
    title: "El Rey de la Copa — Juego de Cartas para Beber | BeberGames",
    description:
      "Roba cartas y cumple sus reglas. El cuarto Rey bebe la copa. El clásico juego de cartas para beber.",
  },
};

export default function ReyDeLaCopaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
