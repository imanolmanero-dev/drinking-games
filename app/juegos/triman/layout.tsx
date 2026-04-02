import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Triman — El Señor del 3",
  description:
    "Juega al Triman, el juego del dado para beber. Lanza el dado, descubre quién bebe según las 6 reglas. ¡El Señor del 3 siempre bebe!",
  openGraph: {
    title: "Triman — El Señor del 3 | BeberGames",
    description:
      "El juego del dado para beber. Lanza el dado y descubre quién bebe según las reglas.",
  },
};

export default function TrimanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
