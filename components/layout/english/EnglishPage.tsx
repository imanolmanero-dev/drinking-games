import type { ReactNode } from "react";
import type { RouteId } from "@/lib/i18n/routes";
import LanguageSwitcher from "./LanguageSwitcher";

export default function EnglishPage({ routeId, title, intro, children, hero, actions, headerDecoration, variant }: {
  routeId: RouteId; title: string; intro: string; children: ReactNode; hero?: ReactNode; actions?: ReactNode; headerDecoration?: ReactNode; variant?: "game-detail";
}) {
  const wide = variant === "game-detail" || routeId === "home" || routeId === "games-hub" || routeId === "kings-cup";
  return (
    <article className={`en-page${wide ? " en-page-wide" : ""}`}>
      <LanguageSwitcher routeId={routeId} locale="en-US" />
      <header className={`en-page-header${hero ? " en-hero" : ""}${headerDecoration ? " en-page-header-decorated" : ""}`}>
        <div>
          {headerDecoration && <div className="en-header-decoration">{headerDecoration}</div>}
          <h1>{title}</h1>
          <p className="en-intro">{intro}</p>
          {actions && <div className="en-hero-actions">{actions}</div>}
        </div>
        {hero}
      </header>
      <div className="en-copy prose prose-invert max-w-none">{children}</div>
    </article>
  );
}
