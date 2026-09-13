import EnglishPage from "@/components/layout/english/EnglishPage";
import EnglishLink from "@/components/layout/english/EnglishLink";
import KingsCupGame from "@/components/games/kings-cup/KingsCupGame";
import { FAQJsonLd, GameJsonLd } from "@/components/seo/JsonLd";
import { CARD_RULES, RANKS } from "@/lib/games/kings-cup";
import { KINGS_CUP_DESCRIPTION, KINGS_CUP_FAQS, KINGS_CUP_TITLE } from "@/lib/data/kings-cup-editorial";
import { englishPageMetadata } from "@/lib/i18n/metadata";

export const generateMetadata = englishPageMetadata("kings-cup", KINGS_CUP_TITLE, KINGS_CUP_DESCRIPTION);

export default function KingsCupPage() {
  return (
    <EnglishPage routeId="kings-cup" title="King's Cup Drinking Game" intro="One deck, a different prompt each turn, and room for everyone to pass. Play free with friends on one screen, with no account and no alcohol required.">
      <GameJsonLd name="King's Cup Drinking Game" description={KINGS_CUP_DESCRIPTION} url="https://bebergames.com/en/games/kings-cup" locale="en-US" />
      <KingsCupGame />

      <h2 id="how-to-play">How to Play King&apos;s Cup</h2>
      <p>Choose your player count and sit in order so everyone knows their number. Select Start game to shuffle a fresh deck. Player 1 draws first, then the screen shows whose turn comes next.</p>
      <ol>
        <li>Select Draw card and read the rank and action aloud.</li>
        <li>Try the prompt together, choose its alternative, or select Skip this card. Nobody needs to explain a pass.</li>
        <li>Select Next player to hand over the turn. The next card stays face down until that player draws it.</li>
        <li>Continue at your own pace. After the last card, select Finish game. Play again gives you a freshly shuffled deck with the same player count.</li>
      </ol>
      <p>There is no countdown. Pause keeps your place while you take a break, and End game lets you stop early. Closing or reloading the page clears the current game.</p>

      <h2 id="rules">King&apos;s Cup Rules — Our Online Version</h2>
      <p>Rules vary by group. This is BeberGames&apos; gentler online adaptation: word games, shared gestures, optional sips, and a different fourth-King moment. Read the table together before starting so nobody is surprised by a rule.</p>
      <p>The rank determines the prompt. A 9 of hearts and a 9 of clubs both start a rhyme round. Each card appears once per deck, and passing still uses that card and moves to the next player.</p>
      <p>The first three Kings invite a compliment. The fourth reveals a group finale: share a favorite moment from the game, or pass. It does not automatically end the deck. You can continue with the remaining cards or choose End game.</p>
      <p>A Jack&apos;s suggested rule needs everyone&apos;s agreement and expires after the next card. Keep it light, such as giving that card a nickname. The group can drop it sooner; forgetting a rule never adds a penalty.</p>

      <h2 id="card-meanings">King&apos;s Cup Card Meanings</h2>
      <p>These are the same prompts you will see in the game. All four suits share the meaning for their rank.</p>
      <table className="w-full table-fixed text-sm">
        <caption className="pb-3 text-left text-zinc-300">The 13 ranks in the BeberGames English deck</caption>
        <thead><tr><th scope="col" className="w-14">Card</th><th scope="col" className="w-24">Name</th><th scope="col">Rule in this version</th></tr></thead>
        <tbody>{RANKS.map((rank) => <tr key={rank}><th scope="row">{CARD_RULES[rank].label}</th><td>{CARD_RULES[rank].name}</td><td>{CARD_RULES[rank].rule}</td></tr>)}</tbody>
      </table>

      <h2 id="setup">King&apos;s Cup Setup</h2>
      <p>You need at least two players and a screen everyone can read. The player selector supports 2–12 people; assign numbers in seating order. A phone works well when you pass it between turns. There are no names to enter, invitations to send, or accounts to create.</p>
      <p>The online deck contains 52 cards: Ace through King in spades, hearts, diamonds, and clubs, with no jokers. You do not need physical cards or a shared cup. If you prefer a physical deck, use the table above as your reference and set drawn cards aside.</p>

      <h2 id="variations">King&apos;s Cup Variations</h2>
      <p>You may know related games as Circle of Death or Ring of Fire. Names and rules vary between groups, so they are not a promise of an identical game. Agree on the actual card meanings and ending before you play.</p>
      <p>Our Ace uses a wave passed around the group in place of a drinking cascade. Four and Seven are unhurried gestures with spoken alternatives. Five and Six are group prompts rather than rules based on gender. Eight makes a team for one card, without linking anyone&apos;s drinking to another player.</p>
      <p>For a word-game night, use the spoken alternatives on Two and Three and keep drinks out entirely. With two players, take turns adding examples in Categories or words in Story mix. You can also agree to stop after one turn each for a short round, using End game whenever you are ready.</p>

      <h2 id="play-responsibly">Play Responsibly</h2>
      <p>Water and soda work just as well as any other drink. If you choose alcohol, only drink if you are of legal drinking age where you are, and set your own limits. An optional sip is never a requirement to stay in the game.</p>
      <p>Skip any card, decline a personal question, or stop whenever you want. Respect that choice when someone else makes it. Do not add rules that pressure people to drink or take risks. See our <EnglishLink id="kc-responsible-link" routeId="about" fragment="#responsible-play">responsible play guide</EnglishLink> for the approach behind BeberGames.</p>

      <h2 id="faq">Frequently Asked Questions</h2>
      {KINGS_CUP_FAQS.map(({ q, a }, index) => <section key={q} aria-labelledby={`kc-faq-${index}`}><h3 id={`kc-faq-${index}`}>{q}</h3><p>{a}</p></section>)}
      <FAQJsonLd faqs={KINGS_CUP_FAQS} />
      <p>Explore the <EnglishLink id="kc-games-link" routeId="games-hub">English games hub</EnglishLink> or return to the <EnglishLink id="kc-home-link" routeId="home">BeberGames home page</EnglishLink>. For questions about using the site, read our <EnglishLink id="kc-terms-link" routeId="terms">terms of use</EnglishLink>.</p>
    </EnglishPage>
  );
}
