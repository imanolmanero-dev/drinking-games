import EnglishPage from "@/components/layout/english/EnglishPage";
import EnglishLink from "@/components/layout/english/EnglishLink";
import { WebSiteJsonLd } from "@/components/seo/JsonLd";
import { englishPageMetadata } from "@/lib/i18n/metadata";
import { CardArtwork } from "@/components/layout/english/EnglishArtwork";

export const generateMetadata = englishPageMetadata("home", "Party Games with Friends — Free and Online", "Meet BeberGames: a free, mobile-friendly home for browser-based party and drinking games, with no account required and alcohol always optional.");

export default function EnglishHome() {
  return (
    <EnglishPage routeId="home" title="Good company. Your pace." intro="BeberGames is a home for browser-based party and drinking games with friends. Free to use, easy to browse on your phone, and no account required."
      hero={<CardArtwork />}
      actions={<EnglishLink id="en-home-games" routeId="games-hub" className="en-button en-button-primary">Explore the games hub<span aria-hidden="true">→</span></EnglishLink>}>
      <WebSiteJsonLd locale="en-US" />
      <section className="en-section">
        <h2>Make room for a little fun</h2>
        <p>A relaxed night with friends does not need a complicated setup. BeberGames brings party game ideas and online play together, with a focus on the people around you. There is nothing to download to browse the site.</p>
        <p>The English games hub is where you can check which games are available in English. It also has a few practical ways to get your group ready, whether you are using one phone around a table or planning the evening ahead of time.</p>
      </section>
      <section className="en-feature">
        <span className="en-state-mark" aria-hidden="true">♠</span>
        <h2>Try a round of King&apos;s Cup</h2>
        <p>Draw from a full deck and follow the prompt on each card. Our alcohol-optional version has word games, shared gestures, and room to pass. <span className="en-feature-action"><EnglishLink id="en-home-kings-cup" routeId="kings-cup" className="en-button">Play King&apos;s Cup</EnglishLink><span> with friends on one screen.</span></span></p>
      </section>
      <aside className="en-guide-discovery" aria-label="Two-player guide">
        <p><strong>Just the two of you?</strong> <EnglishLink id="en-home-two-guide" routeId="drinking-games-for-two">Try seven games for two</EnglishLink>, with or without cards, dice, or alcohol.</p>
      </aside>
      <section className="en-section en-value">
        <h2>Everyone gets a say</h2>
        <p>You can play without alcohol. Choose a non-alcoholic drink, use points, or leave drinks out entirely. Agree on what feels comfortable before starting, and let anyone skip a question or stop without explaining why.</p>
        <p>If you choose to drink alcohol, only do so if you are of legal drinking age where you are. Keep the focus on conversation and having a good time together.</p>
        <p><EnglishLink id="en-home-responsible" routeId="about" fragment="#responsible-play">Read about responsible play</EnglishLink>, or <EnglishLink id="en-home-contact" routeId="contact">send us feedback</EnglishLink> to help make BeberGames easier to use.</p>
      </section>
    </EnglishPage>
  );
}
