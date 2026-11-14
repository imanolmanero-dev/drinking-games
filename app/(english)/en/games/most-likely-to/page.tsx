import EnglishPage from "@/components/layout/english/EnglishPage";
import EnglishLink from "@/components/layout/english/EnglishLink";
import MostLikelyToGame from "@/components/games/most-likely-to/MostLikelyToGame";
import { GameJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { englishPageMetadata } from "@/lib/i18n/metadata";

const description = "Play Most Likely To online with friends on one shared screen. Count to three and point together through 20 prompts. Alcohol and participation are optional.";
const url = "https://bebergames.com/en/games/most-likely-to";
export const generateMetadata = englishPageMetadata("most-likely-to", "Most Likely To Online — Play With Friends", description);

export default function MostLikelyToPage() {
  return <EnglishPage routeId="most-likely-to" variant="game-detail" title="Most Likely To Online"
    intro="Find out how your friends see the group. Share one screen, read a playful prompt and point together on three. Recommended for 3–12 adults who are comfortable voting about each other.">
    <GameJsonLd name="Most Likely To Online" description={description} url={url} locale="en-US" />
    <BreadcrumbJsonLd items={[{ name: "Home", url: "https://bebergames.com/en" }, { name: "Games", url: "https://bebergames.com/en/games" }, { name: "Most Likely To", url }]} />
    <MostLikelyToGame />
    <h2 id="how-to-play">How to play Most Likely To</h2>
    <p>Choose someone to operate the screen and check that everyone is happy to be included. This works best with friends who enjoy light teasing. Agree to leave anyone out of a vote whenever they ask, without needing a reason.</p>
    <ol>
      <li>Select Start game. A shuffled selection of 20 prompts begins.</li>
      <li>Read the prompt aloud and give everyone a moment to think.</li>
      <li>Count to three together. Everyone points at, or names, the person they think fits best. You can pick yourself.</li>
      <li>Enjoy the reactions without asking anyone to defend the choice. Select Next when the group is ready.</li>
      <li>Skip prompt moves everyone on. Finish after 20 prompts, including skipped ones, or select End game at any time.</li>
    </ol>
    <p>The screen supplies prompts and progress. Voting happens around the table: there are no recorded votes, scores or winners. A split vote is fine; move on without a tiebreaker. Sitting out a vote never has a penalty.</p>
    <h2 id="optional-drinks">Optional drinking rule</h2>
    <p>If your group includes drinks, the most-selected participant may choose one small sip or pass. If tied, each tied participant may choose one small sip or pass. Never count sips per vote or carry them into another round. Water, soft drinks or no drinks work equally well. Only drink alcohol if you are of legal drinking age where you are.</p>
    <h2 id="replay">A short session, a fresh shuffle</h2>
    <p>The deck contains 60 curated English prompts about everyday quirks, friendships, food, outings and playful ambitions. Each session uses 20 without repetition. Play again starts a fresh shuffle, so later sessions may include prompts you have seen before. Reloading clears your session.</p>
    <h2 id="more-games">Choose your next game</h2>
    <p>Prefer responding about your own experiences? Try <EnglishLink id="mlt-nhie" routeId="never-have-i-ever">Never Have I Ever</EnglishLink>. For individual questions and light challenges, choose <EnglishLink id="mlt-tod" routeId="truth-or-dare">Truth or Dare</EnglishLink>.</p>
    <p>Browse the <EnglishLink id="mlt-hub" routeId="games-hub">English games hub</EnglishLink>, or use our <EnglishLink id="mlt-manual" routeId="drinking-games-without-cards" fragment="#most-likely-to">manual Most Likely To rules</EnglishLink> to invent prompts around the table.</p>
  </EnglishPage>;
}
