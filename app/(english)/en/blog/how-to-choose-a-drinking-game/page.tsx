import EnglishPage from "@/components/layout/english/EnglishPage";
import EnglishLink from "@/components/layout/english/EnglishLink";
import EnglishArticleJsonLd from "@/components/seo/EnglishArticleJsonLd";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { decisionEditorial as editorial } from "@/lib/data/how-to-choose-a-drinking-game";
import { englishArticleMetadata } from "@/lib/i18n/metadata";
import { absoluteUrl } from "@/lib/i18n/locales";
import { getPublishedRoute } from "@/lib/i18n/routes";

export const generateMetadata = englishArticleMetadata("choose-drinking-game", editorial.title, editorial.description, editorial.datePublished);

const sections = [
  ["participation", "Start with how people want to take part"],
  ["choose", "Choose a format for tonight’s group"],
  ["personal", "Personal questions or something less revealing?"],
  ["turns", "One person’s turn or everyone together?"],
  ["room", "Check the room, materials, and time you have"],
  ["switch", "Try one short round—and know when to switch"],
] as const;

export default function ChooseDrinkingGame() {
  const canonical = absoluteUrl(getPublishedRoute("choose-drinking-game", "en-US")!.pathname);
  return <EnglishPage routeId="choose-drinking-game" title={editorial.headline}
    intro="Start with how people want to take part. A group that wants to react together needs a different format from friends who want individual questions and challenges. A universal ranking will not tell you which fits tonight.">
    <EnglishArticleJsonLd {...editorial} url={canonical} />
    <BreadcrumbJsonLd items={[{ name: "Home", url: absoluteUrl("/en") }, { name: editorial.headline, url: canonical }]} />
    <div className="en-article">
      <nav aria-label="Breadcrumb" className="en-article-breadcrumb"><EnglishLink id="choice-home" routeId="home" /> / <span aria-current="page">Choosing a game</span></nav>
      <p className="en-article-byline">By <EnglishLink id="choice-author" routeId="about">BeberGames</EnglishLink>{editorial.datePublished && <> · Published <time dateTime={editorial.datePublished}>{editorial.datePublished}</time></>}</p>
      <p>Ask two things before opening a game: does anyone want to avoid personal questions, and would people rather answer together or take turns? Then check the room and the time you have. Choose one format to try, with an easy alternative ready if it feels awkward.</p>
      <nav aria-label="On this page" className="en-article-toc"><p><strong>On this page</strong></p><ul>{sections.map(([id, label]) => <li key={id}><a id={`choice-toc-${id}`} href={`#${id}`}>{label}</a></li>)}</ul></nav>
      <h2 id="participation">{sections[0][1]}</h2>
      <p>Describe the activity before asking people to agree. “We all react to a statement” is a different invitation from “one person answers a question or tries a challenge.” Someone can enjoy a lively group and still dislike being the centre of attention.</p>
      <p>Check what people want today, even among close friends. Offer an impersonal option without asking anyone to explain their preference. Agree that passing, pausing and changing games are ordinary choices. A quieter response is not a reason to push for a story.</p>
      <h2 id="choose">{sections[1][1]}</h2>
      <p>Use these situations as starting points. The limitation matters as much as the recommendation.</p>
      <ul className="en-article-choices" aria-label="Choose by participation style">
        <li><strong>Your group wants:</strong> everyone responding together.<br /><strong>Try:</strong> <EnglishLink id="choice-nhie" routeId="never-have-i-ever">Never Have I Ever</EnglishLink>.<br /><strong>Why it fits:</strong> supplied statements prompt a shared reaction without an active-player queue.<br /><strong>Choose something else when:</strong> personal experiences feel too revealing.</li>
        <li><strong>Your group wants:</strong> individual questions and challenges.<br /><strong>Try:</strong> <EnglishLink id="choice-tod" routeId="truth-or-dare">Truth or Dare</EnglishLink>.<br /><strong>Why it fits:</strong> each person gets a turn and can skip a prompt.<br /><strong>Choose something else when:</strong> people dislike individual attention or waiting for their turn.</li>
        <li><strong>Your group wants:</strong> different activities around a table.<br /><strong>Try:</strong> <EnglishLink id="choice-kings" routeId="kings-cup">King&apos;s Cup</EnglishLink>.<br /><strong>Why it fits:</strong> changing card ranks bring different actions into one game.<br /><strong>Choose something else when:</strong> the group wants fewer rules or cannot manage the central-cup setup.</li>
        <li><strong>Your group wants:</strong> wordplay without personal questions.<br /><strong>Try:</strong> manual <EnglishLink id="choice-categories" routeId="drinking-games-without-cards" fragment="#categories">Categories</EnglishLink> or <EnglishLink id="choice-rhyme" routeId="drinking-games-without-cards" fragment="#rhyme-round">Rhyme Round</EnglishLink>.<br /><strong>Why it fits:</strong> attention stays on words rather than personal disclosures.<br /><strong>Choose something else when:</strong> people cannot hear each answer or dislike thinking of words on their turn.</li>
        <li><strong>Your group wants:</strong> a game for just two people.<br /><strong>Try:</strong> the <EnglishLink id="choice-two" routeId="drinking-games-for-two">drinking games for two guide</EnglishLink>.<br /><strong>Why it fits:</strong> pair-specific turns and endings avoid group mechanics that fall flat with two.<br /><strong>Choose something else when:</strong> more people join; reassess the format rather than keeping rules designed for a pair.</li>
      </ul>
      <h2 id="personal">{sections[2][1]}</h2>
      <p>Never Have I Ever removes the need to invent statements, but the subject is still personal experience. Answers are not recorded in the online game. Nobody has to tell a story, and staying silent or passing personally requires no screen action. Silence does not reveal an answer. Those freedoms do not make every statement comfortable for every group.</p>
      <p>Truth or Dare offers Classic, Party, or Both. A category label is a starting point, not a promise that every prompt will suit everyone. Its questions and challenges put more attention on one person. Use skip freely; refusing a question or dare never creates a drinking consequence.</p>
      <p>Categories and Rhyme Round avoid disclosure, although speaking on a turn can still feel demanding. King&apos;s Cup offers variety rather than one continuous personal prompt type, but some card actions involve conversation or another player. It is not a guarantee of impersonal play: read the rules and pass on anything that does not fit.</p>
      <h3 id="scenario-mixed">Mixed group meeting for the first time</h3>
      <p>Several people have just met and nobody wants introductions to become confessions. Start with Categories on a familiar topic. If thinking of words puts people on the spot, stop the round and let the conversation continue. Try personal prompts later only if the group asks for them; NHIE is not automatically the right icebreaker for strangers.</p>
      <h2 id="turns">{sections[3][1]}</h2>
      <p>With NHIE, everyone can react to each statement together. One shared screen supplies a 20-statement session; the group moves on when ready. This avoids waiting for a named player, but conversation after each statement can still slow the session. Leave room for voluntary stories without asking each person to justify a response.</p>
      <p>Truth or Dare uses individual turns for 2–12 numbered players. That gives each person a clear moment, with more waiting as the group grows. If side conversations make the active person repeat every prompt, a format where everyone responds together may work better.</p>
      <p>King&apos;s Cup asks people to follow changing rank rules. Attention is shared, but the action varies: not everyone does the same thing on every card. Choose it when the table wants variety and is willing to check unfamiliar rules.</p>
      <h3 id="scenario-friends">Close friends wanting individual turns</h3>
      <p>Friends are settled in and want questions mixed with light challenges. Try a few Truth or Dare turns in Classic, then check whether anyone wants a different category. If waiting becomes the problem, switch to NHIE for shared reactions. If the prompts themselves are uncomfortable, choose impersonal wordplay instead.</p>
      <h2 id="room">{sections[4][1]}</h2>
      <p>One phone can supply prompts or a digital deck, but someone still needs to read it aloud. Put it within reach without making people lean across drinks. In a noisy room, spoken word chains and detailed instructions are hard to follow. Move to a quieter spot or pause rather than repeatedly raising the volume.</p>
      <p>A digital deck replaces physical cards, not every physical requirement. The linked King&apos;s Cup version uses a real cup in the middle. The first three Kings invite a small optional addition; the fourth invites a small optional sip or passing, then removing the cup and discarding the rest. Nobody needs to finish its contents. Check table space and that setup before choosing it.</p>
      <p>If people are arriving and leaving, favour short manual rounds that can finish before someone joins. A settled group can more easily follow numbered turns or card rules carried between draws. These browser games do not save a session for later: do not plan around closing the page and resuming it.</p>
      <h3 id="scenario-table">A table group wanting varied activities</h3>
      <p>Everyone can hear, has space around the table and wants changing tasks. Try King&apos;s Cup after checking the setup together. If people keep asking what the ranks mean, switch to one familiar Categories round. If the table starts breaking up, end the game instead of trying to maintain shared rules across absent players.</p>
      <h2 id="switch">{sections[5][1]}</h2>
      <p>Agree on a checkpoint before starting: a few turns, the end of a manual round, or the end of NHIE&apos;s 20 statements. You can stop earlier. Ask a concrete question: “More of this, something less personal, or a break?” Nobody has to defend wanting a change.</p>
      <p>Switch when waiting dominates, instructions keep getting repeated, prompts feel uncomfortable or the room makes the activity impractical. Match the alternative to the problem. Shared responses can reduce turn queues; wordplay can remove disclosure; fewer rules can reduce explanation. Low energy may simply mean it is time to stop.</p>
      <div className="en-article-note"><p>Keep game actions separate from optional drinking. Alcohol is never required; water, soda or no drink are equal ways to join. Any sip invitation stays small and optional, without accumulated amounts or escalation. Passing never carries a penalty. Never use drinking to solve discomfort or refusing a prompt. Only drink alcohol if you are of legal drinking age where you are.</p></div>
      <p>Once you know the format you want, the <EnglishLink id="choice-games" routeId="games-hub">English games hub</EnglishLink> has the playable options. For a manual alternative, follow the linked rules above and agree on an ending before the first turn.</p>
    </div>
  </EnglishPage>;
}
