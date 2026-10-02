import type { Metadata, ResolvingMetadata } from "next";
import EnglishPage from "@/components/layout/english/EnglishPage";
import EnglishLink from "@/components/layout/english/EnglishLink";
import EnglishArticleJsonLd from "@/components/seo/EnglishArticleJsonLd";
import { BreadcrumbJsonLd, FAQJsonLd } from "@/components/seo/JsonLd";
import {
  drinkingGamesForTwoEditorial as editorial,
  drinkingGamesForTwoGames as games,
  drinkingGamesForTwoFaqs as faqs,
} from "@/lib/data/drinking-games-for-2-editorial";
import { englishArticleMetadata } from "@/lib/i18n/metadata";
import { absoluteUrl } from "@/lib/i18n/locales";
import { getPublishedRoute } from "@/lib/i18n/routes";

const articleMetadata = englishArticleMetadata("drinking-games-for-two", editorial.title, editorial.description, editorial.datePublished);
export async function generateMetadata(props: unknown, parent: ResolvingMetadata): Promise<Metadata> {
  const metadata = await articleMetadata(props, parent);
  return { ...metadata, openGraph: { ...metadata.openGraph, type: "article", modifiedTime: editorial.dateModified } };
}

const gameGroups = [
  ["without-cards", "Seven games with no equipment"],
  ["card-game", "A card game for two"],
  ["dice-game", "A simple dice game"],
  ["screen-game", "A movie or TV game"],
] as const;

const sections = [
  ["choose-a-game", "Choose a game for your setup"],
  ["before-you-start", "Before you start"],
  ...gameGroups,
  ["one-phone", "Only have one phone?"],
  ["partner-or-friend", "Playing with a partner or a friend"],
  ["frequently-asked-questions", "Frequently asked questions"],
] as const;

export default function DrinkingGamesForTwo() {
  const canonical = absoluteUrl(getPublishedRoute("drinking-games-for-two", "en-US")!.pathname);
  return (
    <EnglishPage routeId="drinking-games-for-two" title={editorial.headline}
      intro={`Just the two of you? These ${games.length} drinking games work with a friend or a partner. Choose wordplay, conversation, cards, dice or a movie, with clear rules for when a small sip is optional.`}>
      <EnglishArticleJsonLd {...editorial} url={canonical} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: absoluteUrl("/en") }, { name: "Drinking games for 2", url: canonical }]} />
      <FAQJsonLd faqs={faqs.map(({ q, a }) => ({ q, a }))} />
      <div className="en-article">
        <nav aria-label="Breadcrumb" className="en-article-breadcrumb">
          <EnglishLink id="two-breadcrumb-home" routeId="home" />
          <span aria-hidden="true"> / </span><span aria-current="page">Drinking games for 2</span>
        </nav>
        <p className="en-article-byline">By <EnglishLink id="two-author" routeId="about">BeberGames</EnglishLink>
          {editorial.datePublished && <> · Published <time dateTime={editorial.datePublished}>{editorial.datePublished}</time></>}
          {" · Updated "}<time dateTime={editorial.dateModified}>{editorial.dateModified}</time>
        </p>
        <p>Alcohol is optional in every game. Water, soda and mocktails work with the same sip rules, or you can leave drinks out. Only drink alcohol if you are of legal drinking age where you are. Use small sips, set your own limits, and stop whenever you want. No one needs to drink to keep playing.</p>

        <nav aria-label="On this page" className="en-article-toc">
          <p><strong>On this page</strong></p>
          <ul>{sections.map(([id, label]) => <li key={id}><a id={`two-toc-${id}`} href={`#${id}`}>{label}</a></li>)}</ul>
        </nav>

        <h2 id="choose-a-game">Choose a game for your setup</h2>
        <p>All {games.length} games below work with exactly two people. Pick one based on what you have and how you feel:</p>
        <ul className="en-article-choices">
          <li><a id="two-choose-words" href="#categories">Wordplay, no equipment</a>: Categories, Rhyme Round or Memory Chain.</li>
          <li><a id="two-choose-conversation" href="#two-truths-and-a-lie">Conversation</a>: Two Truths and a Lie, Never Have I Ever, Truth or Dare, or Would You Rather Match.</li>
          <li><a id="two-choose-cards" href="#higher-or-lower">A deck of cards</a>: Higher or Lower.</li>
          <li><a id="two-choose-dice" href="#roll-keep-or-reroll">One die</a>: Roll, Keep or Reroll.</li>
          <li><a id="two-choose-screen" href="#movie-tv-cue">A shared movie or episode</a>: Movie or TV Cue.</li>
        </ul>

        <h2 id="before-you-start">Before you start</h2>
        <div className="en-article-note">
          <p>Agree on topics, short rounds and a comfortable pace. Passing has no penalty, and either person can pause or stop without an explanation. Leave physical contact, private information, humiliating tasks and dangerous challenges out of the game.</p>
          <p>Every “When to sip” rule below is an invitation, never an obligation. You can decline any sip. Do not combine sip rules, save them up or add extra drinks for a final score. Take breaks between rounds and keep drinking separate from winning. Our <EnglishLink id="two-responsible" routeId="about" fragment="#responsible-play">responsible play approach</EnglishLink> applies throughout.</p>
        </div>

        {gameGroups.map(([group, heading]) => (
          <div key={group}>
            <h2 id={group}>{heading}</h2>
            {games.filter((game) => game.group === group).map((game) => (
              <section key={game.id} aria-labelledby={game.id} data-guide-game={game.id}>
                <h3 id={game.id}>{games.indexOf(game) + 1}. {game.name}</h3>
                <p><strong>What you need:</strong> {game.equipment}</p>
                <p><strong>Play:</strong> {game.play}</p>
                {game.id === "truth-or-dare" && <p>Want prompts on screen? <EnglishLink id="two-truth-or-dare-game" routeId="truth-or-dare">Play our online Truth or Dare</EnglishLink> together. It supports two players and free skipping. The optional round-end toast stays a table rule.</p>}
                <p data-sip-rule><strong>When to sip:</strong> {game.sip}</p>
                <p><strong>Round end:</strong> {game.ending}</p>
              </section>
            ))}
          </div>
        ))}

        <h2 id="one-phone">Only have one phone?</h2>
        <p>Keep this guide open and read a game aloud. The contents links jump to the rules. Put the phone between you or pass it over when you swap roles. This article provides instructions rather than an interactive game or prompt generator.</p>
        <p>For an on-screen card game, <EnglishLink id="two-kings-cup" routeId="kings-cup">King&apos;s Cup</EnglishLink> is usually a group game, but the BeberGames English version supports two players on one screen. Its rules differ from the short games above. You can also browse the <EnglishLink id="two-games" routeId="games-hub">English games hub</EnglishLink>.</p>

        <h2 id="partner-or-friend">Playing with a partner or a friend</h2>
        <p>Choose based on your mood, not your relationship. Wordplay keeps things light; conversation gives you space to swap stories. Knowing someone well never means they owe you an answer. Change a topic that falls flat, and keep a non-alcoholic option within reach. A short round you both enjoy is enough.</p>

        <h2 id="frequently-asked-questions">Frequently asked questions</h2>
        {faqs.map(({ id, q, a }) => <section key={id} data-guide-faq={id} aria-labelledby={id}><h3 id={id}>{q}</h3><p>{a}</p></section>)}
      </div>
    </EnglishPage>
  );
}
