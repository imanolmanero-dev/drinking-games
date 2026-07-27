import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Bots de AdSense — acceso explícito garantizado
      { userAgent: "Mediapartners-Google", allow: "/" },
      { userAgent: "AdsBot-Google", allow: "/" },
      // Resto de crawlers
      { userAgent: "*", allow: "/" },
    ],
    sitemap: "https://bebergames.com/sitemap.xml",
  };
}
