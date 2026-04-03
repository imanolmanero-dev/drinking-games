import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://drinking-games-lemon.vercel.app";

  const juegos = [
    "yo-nunca",
    "verdad-o-reto",
    "triman",
    "la-ruleta",
    "quien-es-mas-probable",
    "ring-of-fire",
  ];

  const categorias = ["preguntas", "cartas", "dados"];

  const blogPosts = getAllPosts();

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...juegos.map((juego) => ({
      url: `${baseUrl}/juegos/${juego}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...categorias.map((cat) => ({
      url: `${baseUrl}/juegos/categorias/${cat}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
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
  ];
}
