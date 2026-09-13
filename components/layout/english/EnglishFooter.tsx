import EnglishLink from "./EnglishLink";
import type { RouteId } from "@/lib/i18n/routes";

const navigation: RouteId[] = ["about", "contact", "privacy", "cookies", "terms"];

export default function EnglishFooter() {
  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="mx-auto max-w-5xl space-y-5 px-5 py-10 text-sm text-zinc-300">
        <p className="font-semibold text-foreground">BeberGames · Good company. Your pace.</p>
        <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-3">
          {navigation.map((id) => <EnglishLink key={id} routeId={id} id={`en-footer-${id}`} className="underline underline-offset-4 hover:text-white" />)}
        </nav>
        <p className="max-w-3xl leading-relaxed">For entertainment with friends. Alcohol is optional, and everyone can skip, pause, or stop at any time. If you choose to drink alcohol, only do so if you are of legal drinking age where you are.</p>
      </div>
    </footer>
  );
}
