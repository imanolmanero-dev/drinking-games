import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "La Bomba — Juego de Beber con Countdown",
  description:
    "Juega a La Bomba online. Pasa el móvil antes de que explote el temporizador secreto. El que tenga la bomba cuando explote... ¡bebe! El juego de beber más tenso.",
  openGraph: {
    title: "La Bomba — Juego de Beber | BeberGames",
    description:
      "Pasa el móvil antes de que explote. El que tenga la bomba cuando explote bebe. ¡Tensión pura!",
  },
};

export default function LaBombaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
