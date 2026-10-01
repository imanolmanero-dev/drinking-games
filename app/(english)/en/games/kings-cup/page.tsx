import EnglishPage from "@/components/layout/english/EnglishPage";
import EnglishLink from "@/components/layout/english/EnglishLink";
import KingsCupGame from "@/components/games/kings-cup/KingsCupGame";
import { FAQJsonLd, GameJsonLd } from "@/components/seo/JsonLd";
import { CARD_RULES, FOURTH_KING, RANKS } from "@/lib/games/kings-cup";
import { KINGS_CUP_DESCRIPTION, KINGS_CUP_FAQS, KINGS_CUP_TITLE } from "@/lib/data/kings-cup-editorial";
import { englishPageMetadata } from "@/lib/i18n/metadata";

export const generateMetadata = englishPageMetadata("kings-cup", KINGS_CUP_TITLE, KINGS_CUP_DESCRIPTION);

export default function KingsCupPage() {
  return (
    <EnglishPage routeId="kings-cup" title="King's Cup Drinking Game" intro="Play King's Cup free online with a 52-card deck, Waterfall, and a physical cup in the middle. Learn every card rule below, share one screen, and pass whenever you want. Alcohol is optional.">
      <GameJsonLd name="King's Cup Drinking Game" description={KINGS_CUP_DESCRIPTION} url="https://bebergames.com/en/games/kings-cup" locale="en-US" />
      <KingsCupGame />

      <h2 id="how-to-play">How to Play King&apos;s Cup</h2>
      <p>King&apos;s Cup is a group card game where each rank tells you what to do: choose someone for a sip, start a word round, or add to the cup in the middle. Rules vary between groups. This page uses familiar English-language card meanings with small, optional sips and gender-neutral group rules.</p>
      <p>Choose your player count and sit in order so everyone knows their number. Put a physical King&apos;s Cup in the middle and agree on the drinks you will use. Select Start game to shuffle a fresh deck. Player 1 draws first, then the screen shows whose turn comes next.</p>
      <ol>
        <li>Select Draw card and read the rank and action aloud.</li>
        <li>Play the card rule together, or select Skip this card. Nobody needs to explain a pass or take a replacement sip.</li>
        <li>Select Next player to hand over the turn. The next card stays face down until that player draws it.</li>
        <li>Resolve the central cup on the fourth King. Choose End game to stop there or continue the remaining cards. After the last card, select Finish game. Play again shuffles a fresh deck with the same player count.</li>
      </ol>
      <p>There is no countdown. Pause keeps your place while you take a break, and End game lets you stop early. Closing or reloading the page clears the current game.</p>

      <h2 id="rules">King&apos;s Cup Rules — Our Online Version</h2>
      <p>Read the table together before starting. Ace is Waterfall, Two is You, Three is Me, Four is Floor, and Seven is Heaven. Five and Six divide the group by odd and even player numbers rather than gender. These two house rules keep the group-sip format.</p>
      <p>The rank determines the prompt. A 9 of hearts and a 9 of clubs both start a rhyme round. Each card appears once per deck, and passing still uses that card and moves to the next player.</p>
      <p>Eight chooses a willing mate. Remember the pair at the table: when one takes a sip for a card rule, the other is invited to join once, with no chain reactions. The next Eight replaces the pair. Jack proposes an agreed rule that lasts until the next Jack. The browser tracks cards, turns and Kings; it does not track mates or enforce your house rules.</p>
      <p>Queen starts Questions for one round. Respond to a question with another question. An answer ends the round and invites a small sip. It does not make anyone an ongoing Question Master. Rhyme and Categories also end when someone repeats an answer or runs out. There is no timer, and anyone can pass without a sip.</p>

      <h3 id="waterfall">What is Waterfall?</h3>
      <p>{CARD_RULES.A.rule} The stopping order is the shared cue, not a demand to keep drinking. Use water or another non-alcoholic drink if you prefer.</p>

      <h3 id="central-cup">The Central Cup and the Fourth King</h3>
      <p>On each of the first three Kings, the drawer adds a small optional amount of their chosen drink to the physical central cup. Keep additions small and use only drinks the group has agreed on. Passing still counts the drawn King; the screen cannot tell whether anyone poured.</p>
      <p>{FOURTH_KING}</p>

      <h2 id="card-meanings">King&apos;s Cup Card Meanings</h2>
      <p>These are the same prompts you will see in the game. All four suits share the meaning for their rank.</p>
      <table className="w-full table-fixed text-sm">
        <caption className="pb-3 text-left text-zinc-300">The 13 ranks in the BeberGames English deck</caption>
        <thead><tr><th scope="col" className="w-14">Card</th><th scope="col" className="w-24">Name</th><th scope="col">Rule in this version</th></tr></thead>
        <tbody>{RANKS.map((rank) => <tr key={rank}><th scope="row">{CARD_RULES[rank].label}</th><td>{CARD_RULES[rank].name}</td><td>{CARD_RULES[rank].rule}</td></tr>)}</tbody>
      </table>

      <h2 id="setup">King&apos;s Cup Setup</h2>
      <p>You need at least two players and a screen everyone can read. The player selector supports 2–12 people; assign numbers in seating order. A phone works well when you pass it between turns. There are no names to enter, invitations to send, or accounts to create.</p>
      <p>Bring your chosen drinks and one physical central cup. Agree on its contents before playing; water or soda works. The online deck contains 52 cards: Ace through King in spades, hearts, diamonds, and clubs, with no jokers. You do not need physical cards. If you prefer a physical deck, use the table above as your reference and set drawn cards aside.</p>

      <h2 id="variations">King&apos;s Cup Variations</h2>
      <p>You may know related games as Circle of Death or Ring of Fire. Names and rules vary between groups, so they are not a promise of an identical game. Agree on the actual card meanings and ending before you play.</p>
      <p>Five and Six use player numbers here: Odds and Evens. For Floor or Heaven, agree on an accessible surface or gesture if anyone needs one. Some groups use an ongoing Question Master for Queen; this deck uses a question chain that ends within the card&apos;s turn.</p>
      <p>To play without drinks, keep the central cup empty and pass on sip actions. Keep the gestures, questions and word rounds. With two players, alternate rhymes and category examples; each of you belongs to one numbered group. For a short game, agree to stop after one turn each and use End game.</p>

      <h2 id="play-responsibly">Play Responsibly</h2>
      <p>Water, soda and other non-alcoholic drinks work for every rule, including the central cup. If you choose alcohol, only drink if you are of legal drinking age where you are. Keep sips and cup additions small, know your limits, and stop whenever you need. Waterfall has no required amount or duration, and the fourth King never asks you to empty the cup by drinking.</p>
      <p>Skip any card, decline a personal question, or stop whenever you want. Respect that choice when someone else makes it. Do not add rules that pressure people to drink or take risks. See our <EnglishLink id="kc-responsible-link" routeId="about" fragment="#responsible-play">responsible play guide</EnglishLink> for the approach behind BeberGames.</p>

      <h2 id="faq">Frequently Asked Questions</h2>
      {KINGS_CUP_FAQS.map(({ q, a }, index) => <section key={q} aria-labelledby={`kc-faq-${index}`}><h3 id={`kc-faq-${index}`}>{q}</h3><p>{a}</p></section>)}
      <FAQJsonLd faqs={KINGS_CUP_FAQS} />
      <p>For a game of questions and light challenges, <EnglishLink id="kc-truth-or-dare" routeId="truth-or-dare">play Truth or Dare</EnglishLink>. Playing with just one other person? The <EnglishLink id="kc-two-guide" routeId="drinking-games-for-two">seven games for two guide</EnglishLink> has more ways to play together.</p>
      <p>Explore the <EnglishLink id="kc-games-link" routeId="games-hub">English games hub</EnglishLink> or return to the <EnglishLink id="kc-home-link" routeId="home">BeberGames home page</EnglishLink>. For questions about using the site, read our <EnglishLink id="kc-terms-link" routeId="terms">terms of use</EnglishLink>.</p>
    </EnglishPage>
  );
}
