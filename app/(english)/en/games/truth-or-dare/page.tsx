import EnglishPage from "@/components/layout/english/EnglishPage";
import EnglishLink from "@/components/layout/english/EnglishLink";
import TruthOrDareGame from "@/components/games/truth-or-dare/TruthOrDareGame";
import { GameJsonLd } from "@/components/seo/JsonLd";
import { englishPageMetadata } from "@/lib/i18n/metadata";
import { TOTAL_PROMPTS } from "@/lib/data/truth-or-dare-prompts";

const title = "Truth or Dare Online — Play With Friends";
const description = `Play Truth or Dare online with 2–12 friends. Choose Classic, Party, or Both from ${TOTAL_PROMPTS} prompts on one shared screen. No signup; pass freely.`;
const url = "https://bebergames.com/en/games/truth-or-dare";

export const generateMetadata = englishPageMetadata("truth-or-dare", title, description);

export default function TruthOrDarePage() {
  return (
    <EnglishPage routeId="truth-or-dare" variant="game-detail" title="Truth or Dare Online" intro={`Take turns choosing a question or a challenge. Pick Classic, Party, or Both from ${TOTAL_PROMPTS} original prompts for 2–12 people on one shared screen. Pass freely, with no need to drink.`}>
      <GameJsonLd name="Truth or Dare Online" description={description} url={url} locale="en-US" />
      <TruthOrDareGame />

      <h2 id="how-to-play">How to play Truth or Dare online</h2>
      <p>Choose the number of people playing and sit in order. The screen calls out Player 1 first, then moves through the group by number. You can put a phone where everyone can read it or pass the screen around. There are no names to enter and no account to create.</p>
      <ol>
        <li>Choose <strong>Classic</strong>, <strong>Party</strong>, or <strong>Both</strong>, then select <strong>Start game</strong>. Your selected Truth and Dare pools shuffle separately.</li>
        <li>On your turn, choose <strong>Truth</strong> for a question or <strong>Dare</strong> for a light challenge.</li>
        <li>Read the prompt, then select <strong>Next player</strong>. If it does not feel right, select <strong>Skip</strong>; the next person still gets the next turn.</li>
        <li>Keep going until you want to stop or all prompts in your selected category have appeared. Select <strong>End game</strong> to finish early.</li>
      </ol>
      <p>Passing never carries a penalty. A skipped prompt is still used, so it will not appear again during that game. Play again reshuffles fresh pools with the same player count and category. Change setup lets you change either choice before starting fresh. Reloading the page starts a new session.</p>

      <h2 id="setup">What you need</h2>
      <p>All you need is one shared screen and at least two people. The selector supports up to twelve, and the numbered turns work the same way for a pair or a larger group. No signup or download is needed. You do not need cards, a timer, or drinks. Agree on topics and boundaries before starting so everyone knows they can pass.</p>
      <p>For two people, take turns reading the screen together. In a larger group, move around your seating order. You can play for a few prompts or continue through the full set. The game does not set a time limit.</p>

      <h2 id="prompts">Truths and dares in this version</h2>
      <p><strong>Classic</strong> is the default: 30 Truths about everyday memories and preferences, plus 30 light Dares such as inventing a mascot or telling a two-sentence story. It is an easygoing place to start.</p>
      <p><strong>Party</strong> adds 50 Truths about harmless embarrassing moments and funny group choices, plus 50 playful Dares. You might tell the story of trying to look cool, deliver a dramatic acceptance speech, or invite a willing player into a silly scene. Joining another player&apos;s challenge is optional too.</p>
      <p><strong>Both</strong> combines all {TOTAL_PROMPTS} prompts: 80 Truths and 80 Dares. It shuffles each combined pool once, so either category can appear next without repeats. Classic and Party alone use only their own prompts.</p>
      <p>You choose the type each turn. When all Truths have appeared, the Truth button becomes unavailable; the same applies to Dares. The game never substitutes a different type for the one you chose. Once both sets are used, the final prompt remains visible until you finish or skip it.</p>

      <h2 id="play-responsibly">Play at your own pace</h2>
      <p>Keep the game comfortable for everyone. Do not push someone to answer a personal question or complete a challenge. Skip without giving a reason, and stop whenever you want. None of the prompts requires physical contact, contacting someone outside the game, or sharing private information.</p>
      <p>Alcohol is optional. Water, soda, or no drink at all works just as well. If you choose alcohol, only drink if you are of legal drinking age where you are and decide your own limits. Read more about <EnglishLink id="tod-responsible" routeId="about" fragment="#responsible-play">responsible play</EnglishLink>.</p>

      <h2 id="more-games">Find another game</h2>
      <p>See both playable options in the <EnglishLink id="tod-games" routeId="games-hub">English games hub</EnglishLink>. If your group wants a digital deck, try <EnglishLink id="tod-kings-cup" routeId="kings-cup">King&apos;s Cup</EnglishLink>. For a quieter evening with one other person, the <EnglishLink id="tod-two-guide" routeId="drinking-games-for-two">seven games for two guide</EnglishLink> includes a version of Truth or Dare you can play without a screen.</p>
    </EnglishPage>
  );
}
