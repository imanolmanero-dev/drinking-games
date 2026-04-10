import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://bebergames.com";

  const juegos = [
    "yo-nunca",
    "verdad-o-reto",
    "triman",
    "la-ruleta",
    "quien-es-mas-probable",
    "ring-of-fire",
    "yo-prefiero",
    "medusa",
    "rey-de-la-copa",
    "la-bomba",
    "tabu",
    "beer-pong",
  ];

  const categorias = ["preguntas", "cartas", "dados", "sin-materiales"];

  const blogPosts = getAllPosts();

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    // Páginas de juego principales
    ...juegos.map((juego) => ({
      url: `${baseUrl}/juegos/${juego}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    // Páginas de reglas (SSR con contenido textual — alto valor SEO)
    ...juegos.map((juego) => ({
      url: `${baseUrl}/juegos/${juego}/reglas`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    // Categorías
    ...categorias.map((cat) => ({
      url: `${baseUrl}/juegos/categorias/${cat}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    // Blog
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.metadata.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    // Páginas de contacto y legales
    {
      url: `${baseUrl}/contacto`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/legal/privacidad`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${baseUrl}/legal/cookies`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${baseUrl}/legal/aviso-legal`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
