import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from "@vercel/analytics/next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AppProvider } from "@/lib/AppContext";
import InstallPWA from "@/components/ui/InstallPWA";
import CookieBanner from "@/components/ui/CookieBanner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bebergames.com"),
  title: {
    default: "BeberGames — Juegos para beber con amigos",
    template: "%s | BeberGames",
  },
  description:
    "La mejor colección de juegos para beber en grupo. Yo Nunca, Verdad o Reto, Triman, La Ruleta y más. Diversión garantizada con tus amigos. ¡Elige un juego y a beber!",
  keywords: [
    "juegos para beber",
    "drinking games",
    "yo nunca",
    "never have i ever",
    "verdad o reto",
    "truth or dare",
    "triman",
    "juego del dado",
    "ruleta para beber",
    "juegos para fiestas",
    "juegos en grupo",
    "juegos de beber online",
    "juegos para previas",
    "juegos borrachos",
    "ring of fire",
    "anillo de fuego juego",
    "quien es mas probable",
    "juegos de cartas para beber",
    "preguntas picantes",
    "yo prefiero juego",
    "medusa juego beber",
    "rey de la copa",
    "la bomba juego",
    "juegos sin cartas para beber",
    "juegos para beber en grupo",
    "tabú borracho",
    "tabu juego beber",
    "beer pong virtual",
    "beer pong reglas",
    "juegos de palabras para beber",
  ],
  authors: [{ name: "BeberGames" }],
  creator: "BeberGames",
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "BeberGames",
    title: "BeberGames — Juegos para beber con amigos",
    description:
      "La mejor colección de juegos para beber en grupo. ¡Elige un juego y a beber! 🍻",
  },
  twitter: {
    card: "summary_large_image",
    title: "BeberGames — Juegos para beber con amigos",
    description:
      "La mejor colección de juegos para beber en grupo. ¡Elige un juego y a beber! 🍻",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "BeberGames",
  },
  verification: {
    google: "u-Uwc22BnlD9rUJxvPXr2uMFwnBjb4vDvRRt2FshYR4",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <meta name="theme-color" content="#0a0a0f" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2015657577739632" 
          crossOrigin="anonymous"
        ></script>
        <meta name="google-adsense-account" content="ca-pub-2015657577739632" />
      </head>
      <body className="min-h-full flex flex-col">
        <AppProvider>
          <Navbar />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
          <CookieBanner />
          <InstallPWA />
        </AppProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
