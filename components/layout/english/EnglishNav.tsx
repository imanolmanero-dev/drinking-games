import EnglishLink from "./EnglishLink";
import type { RouteId } from "@/lib/i18n/routes";

const navigation: RouteId[] = ["home", "games-hub", "about", "contact"];

export default function EnglishNav() {
  return (
    <header className="border-b border-border bg-surface/60">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-5 py-5">
        <EnglishLink routeId="home" id="en-brand" className="text-xl font-extrabold tracking-tight">BeberGames</EnglishLink>
        <nav aria-label="Main navigation" className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-zinc-200">
          {navigation.map((id) => <EnglishLink key={id} routeId={id} id={`en-nav-${id}`} className="hover:text-purple-300" />)}
        </nav>
      </div>
    </header>
  );
}
