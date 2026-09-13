import EnglishPage from "@/components/layout/english/EnglishPage";
import EnglishLink from "@/components/layout/english/EnglishLink";
import { englishPageMetadata } from "@/lib/i18n/metadata";

export const generateMetadata = englishPageMetadata("about", "About BeberGames — Responsible Play", "Learn about BeberGames, a browser-based party game project built for time with friends, mobile browsing, and responsible play with or without alcohol.");

export default function EnglishAbout() {
  return (
    <EnglishPage routeId="about" title="About BeberGames" intro="BeberGames is a party game project built around a simple idea: spending time with friends should be easy to enjoy.">
      <h2>A project made for getting together</h2>
      <p>BeberGames was started by Imanol, a web developer in Spain. The project began with games and guides in Spanish. This English section brings the same focus on accessible entertainment to English-speaking visitors.</p>
      <p>The site is free to use and works in your browser without an account. Its layout is designed for phones as well as larger screens, so you can browse while planning a get-together or sitting with friends. The <EnglishLink id="en-about-games" routeId="games-hub">games hub</EnglishLink> shows the current English selection.</p>
      <h2 id="responsible-play">Responsible Play</h2>
      <p>BeberGames is for entertainment. Drinking is never a requirement, and taking part should always be your choice.</p>
      <ul>
        <li>If you choose to drink alcohol, only do so if you are of legal drinking age where you are.</li>
        <li>Use a non-alcoholic drink, keep score with points, or leave drinks out of the game.</li>
        <li>Skip any question or activity, take a break, or stop at any time. No explanation is needed.</li>
        <li>Respect other people's boundaries. Do not pressure anyone to drink or continue playing.</li>
        <li>Avoid activities that put anyone at risk. Never make speed or excessive drinking the aim of a game.</li>
      </ul>
      <p>A game is only worth playing while the people taking part are comfortable. Check in with each other, and change plans if the group wants something different.</p>
      <h2>Help us improve</h2>
      <p>Found confusing wording or a problem on your phone? <EnglishLink id="en-about-contact" routeId="contact">Contact BeberGames</EnglishLink> with the page and a short description. Specific feedback helps us understand what needs attention.</p>
    </EnglishPage>
  );
}
