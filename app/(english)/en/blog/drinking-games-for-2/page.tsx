import EnglishPage from "@/components/layout/english/EnglishPage";
import EnglishLink from "@/components/layout/english/EnglishLink";
import EnglishArticleJsonLd from "@/components/seo/EnglishArticleJsonLd";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { drinkingGamesForTwoEditorial as editorial } from "@/lib/data/drinking-games-for-2-editorial";
import { englishArticleMetadata } from "@/lib/i18n/metadata";
import { absoluteUrl } from "@/lib/i18n/locales";
import { getPublishedRoute } from "@/lib/i18n/routes";

export const generateMetadata = englishArticleMetadata("drinking-games-for-two", editorial.title, editorial.description, editorial.datePublished);

const sections = [
  ["choose-a-game", "Choose a game for your setup"],
  ["before-you-start", "Before you start"],
  ["without-cards", "Five games without cards"],
  ["card-game", "A card game for two"],
  ["dice-game", "A simple dice game"],
  ["one-phone", "Only have one phone?"],
  ["partner-or-friend", "Playing with a partner or a friend"],
  ["frequently-asked-questions", "Frequently asked questions"],
] as const;

export default function DrinkingGamesForTwo() {
  const canonical = absoluteUrl(getPublishedRoute("drinking-games-for-two", "en-US")!.pathname);
  return (
    <EnglishPage routeId="drinking-games-for-two" title={editorial.headline}
      intro="Just the two of you? These seven games work with a friend or a partner. Start with a conversation game, grab a deck for Higher or Lower, or try a simple dice challenge.">
      <EnglishArticleJsonLd {...editorial} url={canonical} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: absoluteUrl("/en") }, { name: "Drinking games for 2", url: canonical }]} />
      <div className="en-article">
        <nav aria-label="Breadcrumb" className="en-article-breadcrumb">
          <EnglishLink id="two-breadcrumb-home" routeId="home" />
          <span aria-hidden="true"> / </span><span aria-current="page">Drinking games for 2</span>
        </nav>
        <p className="en-article-byline">By <EnglishLink id="two-author" routeId="about">BeberGames</EnglishLink>
          {editorial.datePublished && <> · <time dateTime={editorial.datePublished}>{editorial.datePublished}</time></>}
        </p>
        <p>Alcohol is optional in every game. Use points, choose a non-alcoholic drink, or leave drinks out entirely. You can skip any question or challenge and stop whenever you want. Pick one game to start with, then switch if you feel like a change.</p>

        <nav aria-label="On this page" className="en-article-toc">
          <p><strong>On this page</strong></p>
          <ul>{sections.map(([id, label]) => <li key={id}><a id={`two-toc-${id}`} href={`#${id}`}>{label}</a></li>)}</ul>
        </nav>

        <h2 id="choose-a-game">Choose a game for your setup</h2>
        <p>These 2 player drinking games need very little preparation. Choose by what you have nearby:</p>
        <ul className="en-article-choices">
          <li><a id="two-choose-words" href="#categories">Nothing to set up</a>: Categories or Rhyme Round.</li>
          <li><a id="two-choose-conversation" href="#two-truths-and-a-lie">Time for conversation</a>: Two Truths and a Lie, Never Have I Ever, or Truth or Dare.</li>
          <li><a id="two-choose-cards" href="#higher-or-lower">A deck of cards</a>: Higher or Lower.</li>
          <li><a id="two-choose-dice" href="#roll-keep-or-reroll">One die</a>: Roll, Keep or Reroll.</li>
        </ul>

        <h2 id="before-you-start">Before you start</h2>
        <div className="en-article-note">
          <p>Agree on topics and challenges you both enjoy. Passing has no penalty, and either person can pause or stop without an explanation. Leave physical contact, private information, humiliating tasks, and dangerous challenges out of the game.</p>
          <p>If you choose alcohol, you must be of legal drinking age where you are. Keep drinks separate from scores and mistakes. A wrong answer is just a wrong answer. Our <EnglishLink id="two-responsible" routeId="about" fragment="#responsible-play">responsible play approach</EnglishLink> applies throughout.</p>
        </div>

        <h2 id="without-cards">Five games you can play without cards</h2>
        <p>All five work face to face with nothing on the table. Take turns reading the rules if you are sharing a phone.</p>

        <section aria-labelledby="categories" data-guide-game="categories">
          <h3 id="categories">1. Categories</h3>
          <p><strong>What you need:</strong> Nothing. Choose a category you both know, such as pizza toppings, films with animals, or things in a kitchen.</p>
          <p><strong>Play:</strong> Take turns naming one example. Each answer must fit the category and be different from everything already said. Give each other thinking time. If someone passes or runs out of ideas, the round ends without a penalty.</p>
          <p><strong>Next round:</strong> Pick a new category and swap who starts. Three categories make a simple first session. If an answer is debatable, agree together whether it fits.</p>
          <p><strong>Try this:</strong> Play cooperatively and aim for ten examples between you. No scores or drinks are needed.</p>
        </section>

        <section aria-labelledby="rhyme-round" data-guide-game="rhyme-round">
          <h3 id="rhyme-round">2. Rhyme Round</h3>
          <p><strong>What you need:</strong> Nothing. Start with a word that has several rhymes, such as “light.” Agree whether near rhymes count before you begin.</p>
          <p><strong>Play:</strong> Alternate different rhyming words: “night,” “bright,” “kite.” Avoid repeats and take your time. A pass ends the round, with no penalty for either person. Choose another starting word and let the other person go first.</p>
          <p><strong>Try this:</strong> Use a few of the words you found to build two silly lines of verse together. The fun is hearing what you come up with, so there is no need to keep score.</p>
        </section>

        <section aria-labelledby="two-truths-and-a-lie" data-guide-game="two-truths-and-a-lie">
          <h3 id="two-truths-and-a-lie">3. Two Truths and a Lie</h3>
          <p><strong>What you need:</strong> Three everyday statements about yourself. Two must be true and one made up. Keep them about things you are happy to share.</p>
          <p><strong>Play:</strong> Say all three. Your partner can ask one question before guessing the lie. Reveal the answer, then exchange roles. A guess ends that turn, whether it is right or wrong. Try three turns each for your first round.</p>
          <p><strong>Try this:</strong> Choose a theme such as food, travel, or hobbies. Small details can be surprisingly tricky to guess. You can pass without revealing anything private, and there is no drinking consequence.</p>
        </section>

        <section aria-labelledby="never-have-i-ever" data-guide-game="never-have-i-ever">
          <h3 id="never-have-i-ever">4. Never Have I Ever</h3>
          <p><strong>What you need:</strong> Nothing. Agree on light topics, then choose who will offer the first statement.</p>
          <p><strong>Play:</strong> Take turns saying something you have never done, starting with “Never have I ever…” Each person can say whether they have done it, volunteer a story, or pass. Nobody has to explain an answer. Move on when you are both ready.</p>
          <p><strong>Round end:</strong> Start with three statements each. There are no penalties for any response.</p>
          <p><strong>Try this:</strong> Keep every statement about cooking mishaps, missed buses, or unusual hobbies. “Never have I ever baked bread” can lead to a good story without putting anyone on the spot.</p>
        </section>

        <section aria-labelledby="truth-or-dare" data-guide-game="truth-or-dare">
          <h3 id="truth-or-dare">5. Truth or Dare</h3>
          <p><strong>What you need:</strong> Agreed boundaries. Choose who goes first and plan three turns each.</p>
          <p><strong>Play:</strong> One person chooses Truth or Dare. The other offers a question or challenge within your limits. Accept it, ask for another option, or pass without a penalty. Then swap roles. Finish after your agreed turns, or stop sooner.</p>
          <p><strong>Try this:</strong> Choose questions only, such as “What meal would you like to learn to cook?” For a creative dare, invent a slogan for a nearby object. Keep tasks light and comfortable for both people. You can enjoy the whole round without drinks.</p>
        </section>

        <h2 id="card-game">A card game for two</h2>
        <section aria-labelledby="higher-or-lower" data-guide-game="higher-or-lower">
          <h3 id="higher-or-lower">6. Higher or Lower</h3>
          <p><strong>What you need:</strong> A 52-card deck without jokers. Shuffle it and reveal one reference card. Rank cards Ace low, then 2–10, Jack, Queen, King. Suits do not matter.</p>
          <p><strong>Play:</strong> Predict whether the next card will be higher or lower, then reveal it. A correct prediction earns one point. A wrong prediction or equal rank earns zero. The newly revealed card becomes the reference, and the other person predicts next.</p>
          <p><strong>Round end:</strong> Make ten predictions total, five each. The higher score wins, and a tied score stays a tie. There are no drinking penalties.</p>
          <p><strong>Try this:</strong> Add your points together and try to beat that shared score next time. Reshuffle for each new game.</p>
        </section>

        <h2 id="dice-game">A simple dice game for two</h2>
        <section aria-labelledby="roll-keep-or-reroll" data-guide-game="roll-keep-or-reroll">
          <h3 id="roll-keep-or-reroll">7. Roll, Keep or Reroll</h3>
          <p><strong>What you need:</strong> One standard six-sided die and somewhere to roll it. Start both scores at zero.</p>
          <p><strong>Play:</strong> Roll once, then keep your result or reroll once. If you reroll, you must accept the second result, even if it is lower. The other person does the same. Compare final results: the higher earns one point, while a tie gives neither person a point.</p>
          <p><strong>Round end:</strong> Play three rounds, alternating who rolls first. The higher total score wins. A final tie is fine, and results never require drinking.</p>
          <p><strong>Try this:</strong> Skip competition, add both final die values each round, and try to improve your combined three-round total another day.</p>
        </section>

        <h2 id="one-phone">Only have one phone?</h2>
        <p>Keep this guide open and read a game aloud. The contents links let you jump straight to the rules. Put the phone between you, or pass it over when you change roles. The guide provides instructions rather than an interactive game or prompt generator.</p>
        <p>For an on-screen option, <EnglishLink id="two-kings-cup" routeId="kings-cup">King&apos;s Cup</EnglishLink> is usually a group game, but the BeberGames English version supports two players on one screen. You can also browse the <EnglishLink id="two-games" routeId="games-hub">English games hub</EnglishLink>.</p>

        <h2 id="partner-or-friend">Playing with a partner or a friend</h2>
        <p>Choose based on your mood, not your relationship. Word games work well when you want something light. Conversation games give you space to swap stories, but knowing someone well never means they owe you an answer. If a topic falls flat, change it. A short round you both enjoy is enough.</p>

        <h2 id="frequently-asked-questions">Frequently asked questions</h2>
        <h3 id="faq-two-people">What drinking games work with just two people?</h3>
        <p>All seven here work with exactly two. Start with Categories for wordplay, Higher or Lower for cards, or Roll, Keep or Reroll for dice.</p>
        <h3 id="faq-no-equipment">What can two people play without cards or dice?</h3>
        <p>Categories, Rhyme Round, Two Truths and a Lie, Never Have I Ever, and Truth or Dare need no equipment.</p>
        <h3 id="faq-no-alcohol">Can we play these games without alcohol?</h3>
        <p>Yes. Their rules use conversation or points. Water, a non-alcoholic drink, or no drink at all works equally well.</p>
        <h3 id="faq-one-phone">Can we play online using one phone?</h3>
        <p>Yes. Share this guide for the instructions, or open the English King&apos;s Cup game mentioned above for two-player play on one screen.</p>
      </div>
    </EnglishPage>
  );
}
