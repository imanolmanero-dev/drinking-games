import { absoluteUrl, type Locale } from "./locales";

export type RouteId =
  | "home" | "games-hub" | "about" | "contact" | "privacy" | "cookies"
  | "terms" | "legal-notice" | "kings-cup" | "truth-or-dare"
  | "drinking-games-for-two" | "drinking-games-without-cards";

type LocalizedRoute = { pathname: string; label: string };
type RouteEntry = {
  id: RouteId;
  kind: "page" | "game" | "guide";
  routes: Partial<Record<Locale, LocalizedRoute>>;
  published: Record<Locale, boolean>;
  equivalence: "equivalent" | "unpaired";
  related?: readonly RouteId[];
};

// Identity is editorial, never a translated slug. A reserved path is not a link.
export const routeRegistry: readonly RouteEntry[] = [
  { id: "home", kind: "page", routes: { es: { pathname: "/", label: "Inicio" }, "en-US": { pathname: "/en", label: "Home" } }, published: { es: true, "en-US": true }, equivalence: "equivalent" },
  { id: "games-hub", kind: "page", routes: { es: { pathname: "/juegos", label: "Juegos" }, "en-US": { pathname: "/en/games", label: "Games" } }, published: { es: true, "en-US": true }, equivalence: "equivalent" },
  { id: "about", kind: "page", routes: { es: { pathname: "/sobre-nosotros", label: "Sobre nosotros" }, "en-US": { pathname: "/en/about", label: "About" } }, published: { es: true, "en-US": true }, equivalence: "equivalent" },
  { id: "contact", kind: "page", routes: { es: { pathname: "/contacto", label: "Contacto" }, "en-US": { pathname: "/en/contact", label: "Contact" } }, published: { es: true, "en-US": true }, equivalence: "equivalent" },
  { id: "privacy", kind: "page", routes: { es: { pathname: "/legal/privacidad", label: "Privacidad" }, "en-US": { pathname: "/en/legal/privacy", label: "Privacy" } }, published: { es: true, "en-US": true }, equivalence: "equivalent" },
  { id: "cookies", kind: "page", routes: { es: { pathname: "/legal/cookies", label: "Cookies" }, "en-US": { pathname: "/en/legal/cookies", label: "Cookies" } }, published: { es: true, "en-US": true }, equivalence: "equivalent" },
  { id: "terms", kind: "page", routes: { "en-US": { pathname: "/en/legal/terms", label: "Terms" } }, published: { es: false, "en-US": true }, equivalence: "unpaired", related: ["legal-notice"] },
  { id: "legal-notice", kind: "page", routes: { es: { pathname: "/legal/aviso-legal", label: "Aviso legal" } }, published: { es: true, "en-US": false }, equivalence: "unpaired", related: ["terms"] },
  // Reviewed in Phase 3: EN changes core rules (Ace, fourth King); it is not a translation of ES.
  { id: "kings-cup", kind: "game", routes: { es: { pathname: "/juegos/rey-de-la-copa", label: "El Rey de la Copa" }, "en-US": { pathname: "/en/games/kings-cup", label: "King's Cup" } }, published: { es: true, "en-US": true }, equivalence: "unpaired" },
  // Phase 6: EN allows 2–12 players and penalty-free passing; ES has different core rules.
  { id: "truth-or-dare", kind: "game", routes: { es: { pathname: "/juegos/verdad-o-reto", label: "Verdad o Reto" }, "en-US": { pathname: "/en/games/truth-or-dare", label: "Truth or Dare" } }, published: { es: true, "en-US": true }, equivalence: "unpaired" },
  { id: "drinking-games-for-two", kind: "guide", routes: { es: { pathname: "/blog/juegos-para-beber-dos-personas", label: "Juegos para beber de dos personas" }, "en-US": { pathname: "/en/blog/drinking-games-for-2", label: "Drinking games for 2" } }, published: { es: true, "en-US": true }, equivalence: "unpaired" },
  { id: "drinking-games-without-cards", kind: "guide", routes: { es: { pathname: "/blog/juegos-para-beber-sin-cartas", label: "Juegos para beber sin cartas" } }, published: { es: true, "en-US": false }, equivalence: "unpaired" },
];

export function getPublishedRoute(id: RouteId, locale: Locale): LocalizedRoute | undefined {
  const entry = routeRegistry.find((route) => route.id === id);
  return entry?.published[locale] ? entry.routes[locale] : undefined;
}

export function publishedRoutes(locale: Locale, kind?: RouteEntry["kind"]) {
  return routeRegistry.flatMap((entry) => {
    const route = getPublishedRoute(entry.id, locale);
    return route && (!kind || entry.kind === kind) ? [{ id: entry.id, ...route }] : [];
  });
}

export function languageAlternates(id: RouteId): Partial<Record<Locale, string>> | undefined {
  const entry = routeRegistry.find((route) => route.id === id);
  const es = getPublishedRoute(id, "es");
  const en = getPublishedRoute(id, "en-US");
  if (entry?.equivalence !== "equivalent" || !es || !en) return undefined;
  return { es: absoluteUrl(es.pathname), "en-US": absoluteUrl(en.pathname) };
}

export function languageSwitch(id: RouteId, locale: Locale) {
  if (!getPublishedRoute(id, locale)) return undefined;
  const target: Locale = locale === "es" ? "en-US" : "es";
  const equivalent = languageAlternates(id) && getPublishedRoute(id, target);
  if (equivalent) return { ...equivalent, locale: target, fallback: false };
  const home = getPublishedRoute("home", target);
  return home ? { ...home, label: target === "es" ? "Spanish home" : "English home", locale: target, fallback: true } : undefined;
}
