import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yo Prefiero — Juego para beber online",
  description:
    "Juega a Yo Prefiero con amigos. ¿A o B? El grupo elige y la minoría bebe. Más de 60 dilemas en 3 niveles de intensidad. ¡Sin excusas!",
  openGraph: {
    title: "Yo Prefiero — Juego para beber online | BeberGames",
    description:
      "¿A o B? El grupo elige y la minoría bebe. Más de 60 dilemas para beber en grupo.",
  },
};

export default function YoPrefieroLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
