import Link from "next/link";
import { BreadcrumbJsonLd, FAQJsonLd } from "@/components/seo/JsonLd";
import type { HalloweenContent as Content } from "@/lib/data/halloween";

export default function HalloweenContent({ content, english = false }: { content: Content; english?: boolean }) {
  const home = english ? "/en" : "/";
  return <>
    <BreadcrumbJsonLd items={[{ name: english ? "Home" : "Inicio", url: `https://bebergames.com${english ? home : ""}` }, { name: english ? "Halloween party games" : "Juegos para Halloween", url: `https://bebergames.com${content.path}` }]} />
    <FAQJsonLd faqs={content.faqs} />
    <nav aria-label={english ? "Breadcrumb" : "Ruta de navegación"} className="text-sm mb-6">
      <Link id="halloween-home" href={home}>{english ? "Home" : "Inicio"}</Link><span aria-hidden="true"> → </span>{english ? "Halloween party games" : "Juegos para Halloween"}
    </nav>
    <nav aria-label={english ? "On this page" : "En esta página"} className={english ? "en-article-toc" : "rounded-2xl border border-border bg-surface p-5"}>
      <p><strong>{english ? "Pick your first game" : "Elige por dónde empezar"}</strong></p>
      <ul>{content.sections.map(section => <li key={section.id}><a id={`toc-${section.id}`} href={`#${section.id}`}>{section.title}</a></li>)}</ul>
    </nav>
    {content.sections.map(section => <section key={section.id} id={section.id} className={english ? "en-section en-halloween-card" : "my-8 rounded-2xl border border-border bg-surface p-5 sm:p-8 scroll-mt-24"}>
      <h2 className="!mt-0">{section.title}</h2>
      <p className="text-sm font-semibold text-muted">{section.setup}</p>
      {section.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
      {section.href && <Link id={`play-${section.id}`} href={section.href} className={english ? "en-button en-button-primary" : "inline-flex min-h-12 items-center justify-center rounded-xl bg-accent px-5 py-3 font-semibold !text-white no-underline"}>{section.cta}</Link>}
    </section>)}
    <section id="faq" className={english ? "en-section" : "my-10"}>
      <h2>{english ? "Halloween party questions" : "Preguntas sobre tu fiesta de Halloween"}</h2>
      {content.faqs.map(({ q, a }) => <div key={q}><h3>{q}</h3><p>{a}</p></div>)}
    </section>
    <p>{english ? "Ready for another round?" : "¿Seguimos jugando?"} <Link id="halloween-all-games" href={english ? "/en/games" : "/juegos"}>{english ? "Explore the online games" : "Ver todos los juegos online"}</Link>.</p>
  </>;
}
