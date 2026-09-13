import EnglishPage from "@/components/layout/english/EnglishPage";
import EnglishLink from "@/components/layout/english/EnglishLink";
import { englishPageMetadata } from "@/lib/i18n/metadata";

export const generateMetadata = englishPageMetadata("cookies", "Cookies and Browser Storage — English Site", "Understand cookies, localStorage, and cached files when browsing BeberGames in English, and how browser controls can manage stored site data.");

export default function EnglishCookies() {
  return (
    <EnglishPage routeId="cookies" title="Cookies and browser storage" intro="Cookies, saved preferences, and cached files are different kinds of browser data. This page explains the scope of the English section.">
      <h2>Cookies</h2>
      <p>Cookies are small pieces of data a browser can store for a website and send with later requests. These English pages do not include advertising, analytics, or consent scripts, and their application code does not set cookies.</p>
      <p>That is not a guarantee that every visit involves no cookies. Hosting and network services can operate separately from the page code, and cookies from an earlier visit to the same domain may remain in your browser.</p>
      <h2>Local storage and cached files</h2>
      <p>localStorage keeps data in your browser for a site. Unlike cookies, its contents are not automatically attached to each page request. The current English pages do not read or write player details or preferences there.</p>
      <p>The Spanish section uses browser storage for game preferences and player information. Both sections share a domain, so switching languages does not automatically remove existing data.</p>
      <p>Your browser may also cache images, styles, fonts, and other files to load pages more efficiently. These English pages do not offer an app installation prompt or register a service worker.</p>
      <h2>Managing site data</h2>
      <p>Your browser's privacy or site settings let you inspect and clear cookies and other stored data. Clearing data for bebergames.com can also remove preferences saved by the Spanish section. Browser controls and their names vary, so check your browser's help for the exact steps.</p>
      <p>For questions, <EnglishLink id="en-cookies-contact" routeId="contact">contact us</EnglishLink>. You can also read the <EnglishLink id="en-cookies-privacy" routeId="privacy">English privacy page</EnglishLink>.</p>
    </EnglishPage>
  );
}
