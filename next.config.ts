import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Blog slugs antiguos que ya no existen (Google los tiene cacheados)
      {
        source: "/blog/la-bomba-reglas-juego-beber",
        destination: "/blog/la-bomba-juego-beber",
        permanent: true,
      },
      {
        source: "/blog/mejores-juegos-para-beber",
        destination: "/blog/los-20-mejores-juegos",
        permanent: true,
      },
      {
        source: "/blog/yo-nunca-preguntas-fuertes",
        destination: "/blog/yo-nunca-preguntas-picantes-18",
        permanent: true,
      },
      // Páginas legales movidas de raíz a /legal/
      {
        source: "/aviso-legal",
        destination: "/legal/aviso-legal",
        permanent: true,
      },
      {
        source: "/cookies",
        destination: "/legal/cookies",
        permanent: true,
      },
      {
        source: "/privacidad",
        destination: "/legal/privacidad",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(self), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
