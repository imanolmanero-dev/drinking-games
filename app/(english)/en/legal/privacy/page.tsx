import EnglishPage from "@/components/layout/english/EnglishPage";
import EnglishLink from "@/components/layout/english/EnglishLink";
import { englishPageMetadata } from "@/lib/i18n/metadata";

export const generateMetadata = englishPageMetadata("privacy", "Privacy — English Site", "How the BeberGames English pages handle browsing and email contact, including the scope of this information and links to browser storage details.");

export default function EnglishPrivacy() {
  return (
    <EnglishPage routeId="privacy" title="Privacy" intro="This page describes the English section of BeberGames. The Spanish section has its own privacy information because some of its features differ.">
      <h2>Browsing the English pages</h2>
      <p>You do not need an account to read these pages. They do not ask for player names, registration details, or payment information. There is no contact form, and these English pages do not load advertising or analytics scripts.</p>
      <p>Your browser requests pages and supporting files to display the site. Serving those requests involves technical information such as the requested address and connection information. Hosting and network providers may process technical data as part of delivering the site. This page does not promise that those providers keep no logs or set no cookies.</p>
      <h2>If you contact us</h2>
      <p>Contact is by email. When you send a message, we receive your email address and the contents you choose to include. We use that information to read your request and respond. Your email provider also handles the message under its own practices.</p>
      <p>Please send only what is needed to explain your question. Do not include passwords or private information about other people.</p>
      <h2>Browser storage and other sections</h2>
      <p>The English pages do not save player profiles or preferences in localStorage. Data left by a previous visit to the Spanish section may still be present in your browser because both sections use the same domain. See <EnglishLink id="en-privacy-cookies" routeId="cookies">cookies and browser storage</EnglishLink> for the distinction and available browser controls.</p>
      <p>If you follow a link to the Spanish section, its features and privacy information apply to that section. External sites and your email app have their own privacy practices.</p>
      <h2>Questions and updates</h2>
      <p>For questions about this information or an email you have sent us, <EnglishLink id="en-privacy-contact" routeId="contact">contact BeberGames</EnglishLink>. This page will be updated when the English section's features change.</p>
    </EnglishPage>
  );
}
