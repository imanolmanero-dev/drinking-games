import EnglishPage from "@/components/layout/english/EnglishPage";
import EnglishLink from "@/components/layout/english/EnglishLink";
import { publishedRoutes } from "@/lib/i18n/routes";
import { englishPageMetadata } from "@/lib/i18n/metadata";
import { CardArtwork } from "@/components/layout/english/EnglishArtwork";

export const generateMetadata = englishPageMetadata("games-hub", "Online Drinking Games — The Games Hub", "Check the English game selection at BeberGames and plan a relaxed game night with friends. Alcohol is optional, and everyone can play at their own pace.");

export default function EnglishGames() {
  const games = publishedRoutes("en-US", "game");
  return (
    <EnglishPage routeId="games-hub" title="Online drinking games" intro="A place to find a game for your group, with room for non-alcoholic play and everyone's comfort level.">
      <h2>Games in English</h2>
      {games.length > 0 ? (
        <ul className="en-catalog">{games.map((game) => <li key={game.id}>
          <div className="en-catalog-card">
            <CardArtwork />
            <div>
              <EnglishLink routeId={game.id} id={`en-catalog-${game.id}`} />
              <span className="en-catalog-arrow" aria-hidden="true">→</span>
            </div>
          </div>
        </li>)}</ul>
      ) : <p>There are no playable games in the English selection yet. You can still use the ideas below to plan your game night and agree on how you want to play.</p>}
      <aside className="en-guide-discovery" aria-label="Two-player guide">
        <p><strong>Playing with two people?</strong> <EnglishLink id="en-games-two-guide" routeId="drinking-games-for-two">Read our guide to seven games for two</EnglishLink> for simple rules you can follow together.</p>
      </aside>
      <h2>Set up a game night that works for everyone</h2>
      <p>Start by checking how much time you have and what your friends feel like doing. Some groups want a quiet conversation starter. Others want a short activity between other plans. Pick something everyone understands, and explain the rules before taking the first turn.</p>
      <p>If you share a phone, put it where everyone can see the screen. Take turns reading aloud and give people time to answer. You do not need to rush a round to keep it fun.</p>
      <h2>Decide on your boundaries together</h2>
      <p>Make skipping part of the rules from the start. Nobody needs to share a personal story, do a challenge, or drink to belong in the group. You can use points instead of drinks, choose a non-alcoholic option, or play just for the conversation.</p>
      <p><EnglishLink id="en-games-responsible" routeId="about" fragment="#responsible-play">Responsible play</EnglishLink> explains the approach behind BeberGames. If you have feedback about the English selection, <EnglishLink id="en-games-contact" routeId="contact">get in touch</EnglishLink>.</p>
    </EnglishPage>
  );
}
