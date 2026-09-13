import EnglishPage from "@/components/layout/english/EnglishPage";
import EnglishLink from "@/components/layout/english/EnglishLink";
import { englishPageMetadata } from "@/lib/i18n/metadata";

export const generateMetadata = englishPageMetadata("contact", "Contact BeberGames — Feedback and Questions", "Email BeberGames with feedback, questions, or a problem you found on the site. Contact us directly without a form or an account.");

export default function EnglishContact() {
  return (
    <EnglishPage routeId="contact" title="Contact BeberGames" intro="Have a question, an idea, or something that is not working as expected? You can reach us by email.">
      <p><a id="en-contact-email" href="mailto:info@bebergames.com">info@bebergames.com</a></p>
      <h2>Tell us what happened</h2>
      <p>For a site problem, include the page address, the device and browser you were using, and what you expected to happen. A short description is enough to start. For a wording suggestion, mention the part that felt unclear and how you would phrase it.</p>
      <p>Please avoid sending passwords, financial information, or private details about other players. We do not need those details to understand a suggestion or a display problem.</p>
      <h2>How email contact works</h2>
      <p>The email link opens your email app. Nothing is sent until you choose to send a message there. There is no contact form or account registration on these English pages.</p>
      <p>If you email us, your email address and the message you send will be available to us so we can read and respond. See our <EnglishLink id="en-contact-privacy" routeId="privacy">privacy information</EnglishLink> for more about contact and browsing.</p>
    </EnglishPage>
  );
}
