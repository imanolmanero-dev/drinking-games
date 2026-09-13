export type Locale = "es" | "en-US";

export const SITE_ORIGIN = "https://bebergames.com";

export const locales = {
  es: { prefix: "", htmlLang: "es", openGraphLocale: "es_ES", label: "ES" },
  "en-US": { prefix: "/en", htmlLang: "en-US", openGraphLocale: "en_US", label: "EN" },
} as const satisfies Record<Locale, { prefix: string; htmlLang: string; openGraphLocale: string; label: string }>;

export function localeFromPathname(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en-US" : "es";
}

export function absoluteUrl(pathname: string): string {
  return pathname === "/" ? SITE_ORIGIN : `${SITE_ORIGIN}${pathname}`;
}
