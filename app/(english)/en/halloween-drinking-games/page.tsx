import type { ResolvingMetadata } from "next";
import EnglishPage from "@/components/layout/english/EnglishPage";
import HalloweenContent from "@/components/seasonal/HalloweenContent";
import { halloweenEn as content } from "@/lib/data/halloween";
import { englishPageMetadata } from "@/lib/i18n/metadata";

export async function generateMetadata(props: unknown, parent: ResolvingMetadata) {
  const metadata = await englishPageMetadata("halloween", content.title, content.description)(props, parent);
  return { ...metadata, openGraph: { ...metadata.openGraph, alternateLocale: ["es_ES"] } };
}

export default function HalloweenPage() {
  return <EnglishPage routeId="halloween" title={content.h1} intro={content.intro} headerDecoration={<span>🎃 Halloween 2026</span>}>
    <HalloweenContent content={content} english />
  </EnglishPage>;
}
