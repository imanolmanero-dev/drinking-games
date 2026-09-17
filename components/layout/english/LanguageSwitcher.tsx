import { locales, type Locale } from "@/lib/i18n/locales";
import { languageSwitch, type RouteId } from "@/lib/i18n/routes";

export default function LanguageSwitcher({ routeId, locale }: { routeId: RouteId; locale: Locale }) {
  const target = languageSwitch(routeId, locale);
  return (
    <nav aria-label="Language" className="en-language">
      <span aria-current="page">{locales[locale].label}</span>
      {target && <><span aria-hidden="true">/</span><a id="language-switch" href={target.pathname} hrefLang={target.locale}>{target.fallback ? target.label : locales[target.locale].label}</a></>}
    </nav>
  );
}
