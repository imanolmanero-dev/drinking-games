import EnglishPage from "@/components/layout/english/EnglishPage";
import EnglishLink from "@/components/layout/english/EnglishLink";
import EnglishArticleJsonLd from "@/components/seo/EnglishArticleJsonLd";
import { BreadcrumbJsonLd, FAQJsonLd } from "@/components/seo/JsonLd";
import { withoutCardsEditorial as editorial, withoutCardsGames as games, withoutCardsFaqs as faqs } from "@/lib/data/drinking-games-without-cards";
import { englishArticleMetadata } from "@/lib/i18n/metadata";
import { absoluteUrl } from "@/lib/i18n/locales";
import { getPublishedRoute } from "@/lib/i18n/routes";

export const generateMetadata = englishArticleMetadata("drinking-games-without-cards", editorial.title, editorial.description, editorial.datePublished);

export default function DrinkingGamesWithoutCards() {
  const canonical = absoluteUrl(getPublishedRoute("drinking-games-without-cards", "en-US")!.pathname);
  return <EnglishPage routeId="drinking-games-without-cards" title={editorial.headline}
    intro="No physical deck? Choose a game for the people in the room. These eight games suit small and medium in-person groups: pick wordplay for less personal conversation, or questions when everyone is comfortable sharing.">
    <EnglishArticleJsonLd {...editorial} url={canonical} />
    <BreadcrumbJsonLd items={[{ name: "Home", url: absoluteUrl("/en") }, { name: editorial.headline, url: canonical }]} />
    <FAQJsonLd faqs={faqs.map(({ q, a }) => ({ q, a }))} />
    <div className="en-article">
      <nav aria-label="Breadcrumb" className="en-article-breadcrumb"><EnglishLink id="nc-home" routeId="home" /> / <span aria-current="page">Without cards</span></nav>
      <p className="en-article-byline">By <EnglishLink id="nc-author" routeId="about">BeberGames</EnglishLink> · Published <time dateTime={editorial.datePublished}>{editorial.datePublished}</time></p>
      <h2 id="choose">Choose by group and mood</h2>
      <p>Player ranges below are recommendations for these tabletop versions. Start with one round, then decide whether to keep going. Nothing needs printing or dealing.</p>
      <ul className="en-article-choices" aria-label="Game comparison">
        {games.map(game => <li key={game.id}><a id={`nc-choose-${game.id}`} href={`#${game.id}`}>{game.name}</a><br /><strong>Group:</strong> {game.players} players · <strong>Materials:</strong> {game.materials}<br /><strong>Style:</strong> {game.style}</li>)}
      </ul>
      <nav aria-label="On this page" className="en-article-toc"><p><strong>On this page</strong></p><ul>
        <li><a id="nc-toc-equipment" href="#equipment">No cards versus no equipment</a></li>
        {games.map(game => <li key={game.id}><a id={`nc-toc-${game.id}`} href={`#${game.id}`}>{game.name}</a></li>)}
        <li><a id="nc-toc-phone" href="#one-phone">One phone or just two players?</a></li>
        <li><a id="nc-toc-faq" href="#faq">Questions before you start</a></li>
      </ul></nav>
      <h2 id="equipment">No cards does not always mean no equipment</h2>
      <p>Without cards means no physical deck. Some no-card games still need dice, cups or other objects. The eight core games below need no props, with optional notes or a phone where stated. Medusa needs a circle with clear sightlines. If you choose a different game involving a cup, check its setup before gathering everyone.</p>
      <div className="en-article-note">
        <p>Alcohol is optional. Water, soda or no drink at all are equally welcome. Only drink alcohol if you are of legal drinking age where you are. Each sip rule is a small optional invitation, separate from scoring or winning. Never accumulate sips or increase quantities. Take breaks between rounds.</p>
        <p>Passing has no penalty. Anyone can pause or stop without an explanation, including declining a sip. Agree on boundaries before starting and respect a change of mind. Read our <EnglishLink id="nc-responsible" routeId="about" fragment="#responsible-play">responsible play approach</EnglishLink>.</p>
      </div>
      {games.map((game, index) => <section key={game.id} aria-labelledby={game.id} data-guide-game={game.id}>
        <h2 id={game.id}>{index + 1}. {game.name}</h2>
        <p><strong>Players:</strong> {game.players} · <strong>Materials:</strong> {game.materials}</p>
        <p><strong>Start:</strong> {game.setup}</p>
        <p><strong>Play:</strong> {game.play}</p>
        <p><strong>Round end:</strong> {game.ending}</p>
        {game.id === "never-have-i-ever" && <p data-nhie-link>Want supplied statements? <EnglishLink id="nc-nhie-online" routeId="never-have-i-ever">Play Never Have I Ever online</EnglishLink> together in a 20-statement session. The manual version here keeps its own round ending.</p>}
        <p data-sip-rule><strong>Optional sip:</strong> {game.sip}</p>
      </section>)}
      <h2 id="one-phone">One phone or just two players?</h2>
      <p>If nobody wants to invent prompts, <EnglishLink id="nc-truth-or-dare" routeId="truth-or-dare">play Truth or Dare</EnglishLink> on one shared phone. It supports 2–12 numbered players and lets you skip. The round-end toast described above is an optional table rule, not a consequence imposed by the app.</p>
      <p>Only two of you? Our <EnglishLink id="nc-two" routeId="drinking-games-for-two">drinking games for two guide</EnglishLink> adapts turns and guessing for a pair. That is a better fit than trying to make group voting work with two people. For other playable options, browse the <EnglishLink id="nc-games" routeId="games-hub">English games hub</EnglishLink>.</p>
      <h2 id="faq">Questions before you start</h2>
      {faqs.map(({ q, a }, index) => <section key={q} data-guide-faq aria-labelledby={`nc-faq-${index}`}><h3 id={`nc-faq-${index}`}>{q}</h3><p>{a}</p></section>)}
    </div>
  </EnglishPage>;
}
