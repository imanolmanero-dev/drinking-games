import EnglishPage from "@/components/layout/english/EnglishPage";
import EnglishLink from "@/components/layout/english/EnglishLink";
import { WebSiteJsonLd } from "@/components/seo/JsonLd";
import { englishPageMetadata } from "@/lib/i18n/metadata";

export const generateMetadata = englishPageMetadata("home", "Party Games with Friends — Free and Online", "Meet BeberGames: a free, mobile-friendly home for browser-based party and drinking games, with no account required and alcohol always optional.");

export default function EnglishHome() {
  return (
    <EnglishPage routeId="home" title="Good company. Your pace." intro="BeberGames is a home for browser-based party and drinking games with friends. Free to use, easy to browse on your phone, and no account required.">
      <WebSiteJsonLd locale="en-US" />
      <h2>Make room for a little fun</h2>
      <p>A relaxed night with friends does not need a complicated setup. BeberGames brings party game ideas and online play together, with a focus on the people around you. There is nothing to download to browse the site.</p>
      <p>The English games hub is where you can check which games are available in English. It also has a few practical ways to get your group ready, whether you are using one phone around a table or planning the evening ahead of time.</p>
      <p><EnglishLink id="en-home-games" routeId="games-hub">Explore the games hub</EnglishLink></p>
      <h2>Everyone gets a say</h2>
      <p>You can play without alcohol. Choose a non-alcoholic drink, use points, or leave drinks out entirely. Agree on what feels comfortable before starting, and let anyone skip a question or stop without explaining why.</p>
      <p>If you choose to drink alcohol, only do so if you are of legal drinking age where you are. Keep the focus on conversation and having a good time together.</p>
      <p><EnglishLink id="en-home-responsible" routeId="about" fragment="#responsible-play">Read about responsible play</EnglishLink>, or <EnglishLink id="en-home-contact" routeId="contact">send us feedback</EnglishLink> to help make BeberGames easier to use.</p>
    </EnglishPage>
  );
}
