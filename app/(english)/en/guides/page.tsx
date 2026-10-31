import EnglishPage from "@/components/layout/english/EnglishPage";
import EnglishLink from "@/components/layout/english/EnglishLink";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { englishPageMetadata } from "@/lib/i18n/metadata";
import { absoluteUrl } from "@/lib/i18n/locales";
import { englishGuides } from "@/lib/data/english-guides";

export const generateMetadata = englishPageMetadata("guides-hub", "Drinking Game Guides — Rules, Ideas & Group Picks", "Find guides for two players, games without cards, choosing a format for your group, and seasonal party ideas.");

export default function EnglishGuides() {
  return <EnglishPage routeId="guides-hub" title="Drinking Game Guides" intro="Find rules and formats for the situation you have in mind. Start with the question that brought you here, then use the matching guide to plan a round.">
    <BreadcrumbJsonLd items={[{ name: "Home", url: absoluteUrl("/en") }, { name: "Guides", url: absoluteUrl("/en/guides") }]} />
    <h2>Which guide do you need?</h2>
    <ul>{englishGuides.map(guide => <li key={guide.id}><strong>{guide.situation}?</strong> <EnglishLink id={`guides-quick-${guide.id}`} routeId={guide.id}>{guide.title}</EnglishLink></li>)}</ul>
    {[false, true].map(seasonal => <section key={String(seasonal)} aria-labelledby={seasonal ? "seasonal-guides" : "evergreen-guides"}>
      <h2 id={seasonal ? "seasonal-guides" : "evergreen-guides"}>{seasonal ? "Seasonal guides" : "Evergreen guides"}</h2>
      {englishGuides.filter(guide => guide.seasonal === seasonal).map(guide => <section key={guide.id}>
        <h3><EnglishLink id={`guides-detail-${guide.id}`} routeId={guide.id}>{guide.title}</EnglishLink></h3>
        <p><strong>{guide.label}.</strong> {guide.description}</p>
      </section>)}
    </section>)}
    <h2>Ready to play?</h2>
    <p>Already know the format you want? <EnglishLink id="guides-games" routeId="games-hub">Browse and launch the online games</EnglishLink>.</p>
  </EnglishPage>;
}
