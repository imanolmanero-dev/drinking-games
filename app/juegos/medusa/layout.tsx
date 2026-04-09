import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Medusa — Juego para beber con miradas",
  description:
    "Juega a Medusa con amigos. Todos miran abajo, a la de 3 mira a alguien. Si dos se miran… ¡beben! El juego de contacto visual más divertido para previas y fiestas.",
  openGraph: {
    title: "Medusa — Juego para beber | BeberGames",
    description:
      "Todos miran abajo. A la de 3, mira a alguien. Si hacéis contacto visual… ¡MEDUSA! A beber.",
  },
};

export default function MedusaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
