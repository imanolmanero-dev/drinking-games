import type { Metadata, ResolvingMetadata } from "next";
import HalloweenContent from "@/components/seasonal/HalloweenContent";
import { halloweenEs as content } from "@/lib/data/halloween";
import { languageAlternates } from "@/lib/i18n/routes";

export async function generateMetadata(_props: unknown, parent: ResolvingMetadata): Promise<Metadata> {
  const url = `https://bebergames.com${content.path}`;
  return {
    title: content.title, description: content.description,
    alternates: { canonical: url, languages: languageAlternates("halloween") },
    robots: { index: true, follow: true },
    openGraph: { type: "website", title: content.title, description: content.description, url, siteName: "BeberGames", locale: "es_ES", alternateLocale: ["en_US"], images: (await parent).openGraph?.images },
    twitter: { card: "summary_large_image", title: content.title, description: content.description },
  };
}

export default function HalloweenPage() {
  return <article className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-6">
    <nav aria-label="Idioma" className="flex justify-end items-center gap-3 text-sm"><span aria-current="page">ES</span><a id="language-switch" href="/en/halloween-drinking-games" hrefLang="en-US" className="inline-flex min-h-12 items-center rounded-xl border border-border px-4">EN</a></nav>
    <header className="py-8">
      <p className="mb-4 text-sm font-semibold text-accent">🎃 Especial Halloween 2026</p>
      <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">{content.h1}</h1>
      <p className="mt-6 text-lg leading-relaxed text-muted">{content.intro}</p>
    </header>
    <div className="prose prose-invert max-w-none"><HalloweenContent content={content} /></div>
  </article>;
}
