import EnglishLink from "./EnglishLink";
import type { RouteId } from "@/lib/i18n/routes";
import { BrandMark } from "./EnglishArtwork";

type NavIconName = "home" | "games" | "about" | "contact";

const navigation: { id: RouteId; label: string; icon: NavIconName }[] = [
  { id: "home", label: "Home", icon: "home" },
  { id: "games-hub", label: "Games", icon: "games" },
  { id: "about", label: "About", icon: "about" },
  { id: "contact", label: "Contact", icon: "contact" },
];

function NavIcon({ name }: { name: NavIconName }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {name === "home" && <><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" /><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></>}
      {name === "games" && <><rect width="7" height="7" x="3" y="3" rx="1" /><rect width="7" height="7" x="14" y="3" rx="1" /><rect width="7" height="7" x="14" y="14" rx="1" /><rect width="7" height="7" x="3" y="14" rx="1" /></>}
      {name === "about" && <><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></>}
      {name === "contact" && <><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" /><rect x="2" y="4" width="20" height="16" rx="2" /></>}
    </svg>
  );
}

export default function EnglishNav() {
  return (
    <header className="en-nav">
      <div className="en-nav-inner">
        <EnglishLink routeId="home" id="en-brand" className="en-brand"><BrandMark /><span>Beber<span className="en-brand-accent">Games</span></span></EnglishLink>
        <nav aria-label="Main navigation" className="en-nav-links">
          {navigation.map(({ id, label, icon }) => (
            <EnglishLink key={id} routeId={id} id={`en-nav-${id}`} className={`en-nav-link${id === "games-hub" ? " en-nav-cta" : ""}`}>
              <NavIcon name={icon} />
              <span>{label}</span>
            </EnglishLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
