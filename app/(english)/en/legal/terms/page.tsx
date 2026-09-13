import EnglishPage from "@/components/layout/english/EnglishPage";
import EnglishLink from "@/components/layout/english/EnglishLink";
import { englishPageMetadata } from "@/lib/i18n/metadata";

export const generateMetadata = englishPageMetadata("terms", "Terms of Use — Play Responsibly", "Simple guidelines for using BeberGames for entertainment: respect other players, make alcohol optional, and skip or stop whenever you choose.");

export default function EnglishTerms() {
  return (
    <EnglishPage routeId="terms" title="Terms of use" intro="BeberGames is for entertainment with friends. These guidelines describe the approach we ask you to take when using the site and choosing how to play.">
      <h2>Your choices come first</h2>
      <p>You decide whether to take part and which activities are appropriate for you. A suggestion on a website does not override your judgment or another person's boundaries. If something feels uncomfortable or unsafe, skip it or stop.</p>
      <h2>Alcohol is optional</h2>
      <p>If you choose to drink alcohol, only do so if you are of legal drinking age where you are. You can use a non-alcoholic drink, play with points, or leave drinks out altogether.</p>
      <p>Do not use a game to pressure anyone to drink, consume excessive amounts, or take part in dangerous activities. Do not add rules that reward risky behavior. The aim is shared entertainment, and every player can choose their own pace.</p>
      <h2>Respect everyone in the group</h2>
      <p>Anyone can skip a question, decline an activity, pause, or leave at any time. Accept that choice without asking for an explanation. Agree on boundaries before starting and check that everyone is still comfortable as you go.</p>
      <h2>Using the site</h2>
      <p>Use BeberGames in a way that respects other visitors and the site itself. If a page is unclear or does not work, <EnglishLink id="en-terms-contact" routeId="contact">let us know</EnglishLink>. Avoid sharing private information about others in your feedback.</p>
      <p>Read more about <EnglishLink id="en-terms-responsible" routeId="about" fragment="#responsible-play">responsible play</EnglishLink> and how the English pages handle <EnglishLink id="en-terms-privacy" routeId="privacy">privacy</EnglishLink>. These guidelines concern the English section; they are not a translation of the Spanish legal notice.</p>
    </EnglishPage>
  );
}
