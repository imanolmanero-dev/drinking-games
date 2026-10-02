export default function EnglishArticleJsonLd({ headline, description, url, datePublished, dateModified }: {
  headline: string; description: string; url: string; datePublished: string | null; dateModified?: string | null;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline,
    description,
    url,
    mainEntityOfPage: url,
    inLanguage: "en-US",
    author: { "@type": "Organization", name: "BeberGames", url: "https://bebergames.com/en/about" },
    publisher: { "@type": "Organization", name: "BeberGames", url: "https://bebergames.com/en" },
    isAccessibleForFree: true,
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />;
}
