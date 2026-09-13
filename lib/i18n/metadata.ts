import type { Metadata, ResolvingMetadata } from "next";
import { absoluteUrl, locales, SITE_ORIGIN } from "./locales";
import { getPublishedRoute, languageAlternates, type RouteId } from "./routes";

export function englishMetadata(id: RouteId, title: string, description: string, images: NonNullable<Metadata["openGraph"]>["images"]): Metadata {
  const route = getPublishedRoute(id, "en-US");
  if (!route) throw new Error(`Cannot create metadata for unpublished English route: ${id}`);
  const canonical = absoluteUrl(route.pathname);
  const languages = languageAlternates(id);
  return {
    metadataBase: new URL(SITE_ORIGIN),
    title,
    description,
    alternates: { canonical, ...(languages ? { languages } : {}) },
    robots: { index: true, follow: true },
    openGraph: { type: "website", locale: locales["en-US"].openGraphLocale, siteName: "BeberGames", title, description, url: canonical, images },
    twitter: { card: "summary_large_image", title, description },
  };
}

export function englishPageMetadata(id: RouteId, title: string, description: string) {
  return async function generateMetadata(_props: unknown, parent: ResolvingMetadata): Promise<Metadata> {
    const images = (await parent).openGraph?.images?.map((image) => {
      const descriptor = typeof image === "string" ? { url: image } : image;
      const url = new URL(descriptor.url, SITE_ORIGIN);
      if (!url.pathname.startsWith("/en/opengraph-image")) throw new Error("English social image is missing from the parent segment");
      return { ...descriptor, url: new URL(`${url.pathname}${url.search}`, SITE_ORIGIN).href };
    });
    if (!images?.length) throw new Error("English social image is missing");
    return englishMetadata(id, title, description, images);
  };
}
