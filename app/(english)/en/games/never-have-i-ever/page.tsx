import EnglishPage from "@/components/layout/english/EnglishPage";
import EnglishLink from "@/components/layout/english/EnglishLink";
import NeverHaveIEverGame from "@/components/games/never-have-i-ever/NeverHaveIEverGame";
import { GameJsonLd, BreadcrumbJsonLd, FAQJsonLd } from "@/components/seo/JsonLd";
import { englishPageMetadata } from "@/lib/i18n/metadata";

const description = "Play Never Have I Ever together on one screen. Choose Classic or Party for 20 statements, with no repeats in a session. Alcohol is optional.";
const url = "https://bebergames.com/en/games/never-have-i-ever";
const faqs = [
  { q: "Can two people play?", a: "Yes. Both people consider every statement together. This version suits 2–12 players and does not assign turns or collect names." },
  { q: "Do we have to answer or drink?", a: "No. Silence is valid, stories are optional and passing needs no explanation. Water, soft drinks or no drinks work equally well. The game records no answers." },
  { q: "Will statements repeat?", a: "Each 20-statement session has no repeats. Play again keeps your category and shuffles a fresh selection, so statements can repeat across separate sessions." },
];
export const generateMetadata = englishPageMetadata("never-have-i-ever", "Never Have I Ever — Play Online", description);

export default function NeverHaveIEverPage() {
  return <EnglishPage routeId="never-have-i-ever" variant="game-detail" title="Never Have I Ever Online"
    intro="Share everyday surprises and playful party moments with 2–12 people. Choose Classic or Party for 20 original statements on one screen. No accounts, names or recorded answers.">
    <GameJsonLd name="Never Have I Ever Online" description={description} url={url} locale="en-US" />
    <BreadcrumbJsonLd items={[{ name: "Home", url: "https://bebergames.com/en" }, { name: "Games", url: "https://bebergames.com/en/games" }, { name: "Never Have I Ever", url }]} />
    <FAQJsonLd faqs={faqs} />
    <NeverHaveIEverGame />
    <h2 id="how-to-play">How to play together</h2>
    <p>Never Have I Ever is a group conversation game about things you may have done. Agree on boundaries and choose someone to operate the screen. Anyone may read the supplied statements aloud: reading one is not a claim about the reader.</p>
    <ol>
      <li>Choose Classic or Party and select Start game. The game shuffles that category and selects 20 statements.</li>
      <li>Everyone considers the same statement together. If it applies and you want to acknowledge it, raise a hand or say “I have.” Silence is valid and does not reveal whether it applies.</li>
      <li>Share a story only if you want to. Nobody checks, challenges or asks anyone to prove an answer. When the group is ready, select Next statement.</li>
      <li>Skip statement moves the whole group on. Passing personally needs no screen action and has no penalty.</li>
      <li>Finish after statement 20, or select End game whenever you want.</li>
    </ol>
    <p>A displayed statement counts as shown, even when skipped. There is no winner, elimination, active player or time limit. Play again keeps your category and starts a fresh shuffle; previous sessions may contain the same statements. Change setup returns to category selection. Reloading clears the session.</p>
    <h2 id="categories">Choose your mood</h2>
    <p><strong>Classic</strong> has 60 original statements about everyday experiences, harmless mistakes and small surprises. <strong>Party</strong> has 60 about social occasions, music and playful group moments. Party is not a spicy category. Each session uses only the category you choose.</p>
    <h2 id="optional-participation">Your response, your choice</h2>
    <p>Alcohol is optional. If you chose to include drinks and want to acknowledge an experience, you may take one small optional sip instead of a hand signal or spoken response. Water, soft drinks or no drinks work equally well. Nobody checks who drank. Passing never triggers a drink, and sips never accumulate or need making up. Take your time and stop whenever you want. Only drink alcohol if you are of legal drinking age where you are.</p>
    <p>The screen keeps session progress, not answers or drink counts. No response history is recorded. Keep stories voluntary and avoid explaining anyone else’s experiences for them.</p>
    <h2 id="questions">Questions before you start</h2>
    {faqs.map(({ q, a }, index) => <section key={q} aria-labelledby={`nhie-faq-${index}`}><h3 id={`nhie-faq-${index}`}>{q}</h3><p>{a}</p></section>)}
    <h2 id="more-games">More ways to play</h2>
    <p>Prefer to invent your own statements? The <EnglishLink id="nhie-manual" routeId="drinking-games-without-cards" fragment="#never-have-i-ever">manual Never Have I Ever rules</EnglishLink> use rotating readers and a different round ending. Browse the <EnglishLink id="nhie-hub" routeId="games-hub">English games hub</EnglishLink> for other playable options.</p>
  </EnglishPage>;
}
