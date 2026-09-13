import type { ReactNode } from "react";
import "../globals.css";

// Preparado para futuras páginas bajo /en; este layout no publica ninguna ruta.
export default function EnglishRootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en-US">
      <body>{children}</body>
    </html>
  );
}
