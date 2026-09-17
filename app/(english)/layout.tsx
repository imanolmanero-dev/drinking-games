import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import EnglishNav from "@/components/layout/english/EnglishNav";
import EnglishFooter from "@/components/layout/english/EnglishFooter";
import "../globals.css";
import styles from "@/components/layout/english/EnglishDesign.module.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://bebergames.com"),
  title: { default: "BeberGames — Party Games with Friends", template: "%s | BeberGames" },
};

export default function EnglishRootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en-US" className={`${geistSans.variable} h-full antialiased`}>
      <body className={`${styles.root} flex min-h-full flex-col`}>
        <a id="en-skip-content" href="#main-content" className="sr-only focus:not-sr-only focus:p-4">Skip to content</a>
        <EnglishNav />
        <main id="main-content" className="flex-1">{children}</main>
        <EnglishFooter />
      </body>
    </html>
  );
}
