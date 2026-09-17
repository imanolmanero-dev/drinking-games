import EnglishLink from "./EnglishLink";
import type { RouteId } from "@/lib/i18n/routes";
import { BrandMark } from "./EnglishArtwork";

const navigation: RouteId[] = ["home", "games-hub", "about", "contact"];

export default function EnglishNav() {
  return (
    <header className="en-nav">
      <div className="en-nav-inner">
        <EnglishLink routeId="home" id="en-brand" className="en-brand"><BrandMark /><span>Beber<span className="en-brand-accent">Games</span></span></EnglishLink>
        <nav aria-label="Main navigation" className="en-nav-links">
          {navigation.map((id) => <EnglishLink key={id} routeId={id} id={`en-nav-${id}`} className="en-nav-link" />)}
        </nav>
      </div>
    </header>
  );
}
