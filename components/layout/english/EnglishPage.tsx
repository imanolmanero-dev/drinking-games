import type { ReactNode } from "react";
import type { RouteId } from "@/lib/i18n/routes";
import LanguageSwitcher from "./LanguageSwitcher";

export default function EnglishPage({ routeId, title, intro, children }: {
  routeId: RouteId; title: string; intro: string; children: ReactNode;
}) {
  return (
    <article className="mx-auto w-full max-w-3xl px-5 py-12 sm:py-16">
      <LanguageSwitcher routeId={routeId} locale="en-US" />
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">{title}</h1>
        <p className="mt-6 text-lg leading-relaxed text-zinc-300">{intro}</p>
      </header>
      <div className="prose prose-invert max-w-none prose-a:text-purple-300 prose-a:underline-offset-4">{children}</div>
    </article>
  );
}
