import EnglishLink from "./EnglishLink";
import type { RouteId } from "@/lib/i18n/routes";
import { BrandMark } from "./EnglishArtwork";

const navigation: RouteId[] = ["about", "contact", "privacy", "cookies", "terms"];

export default function EnglishFooter() {
  return (
    <footer className="en-footer">
      <div className="en-footer-inner">
        <div className="en-footer-top">
          <p className="en-footer-brand"><BrandMark />BeberGames · Good company. Your pace.</p>
          <nav aria-label="Footer navigation" className="en-footer-links">
            {navigation.map((id) => <EnglishLink key={id} routeId={id} id={`en-footer-${id}`} />)}
          </nav>
        </div>
        <p className="en-footer-note">For entertainment with friends. Alcohol is optional, and everyone can skip, pause, or stop at any time. If you choose to drink alcohol, only do so if you are of legal drinking age where you are.</p>
      </div>
    </footer>
  );
}
