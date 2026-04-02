import Link from "next/link";
import { ArrowRight, CalendarDays, ScrollText } from "lucide-react";
import { getAllPosts } from "@/lib/blog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Artículos, reglas, trucos y consejos sobre los mejores juegos de mesa y juegos picantes para beber en previas y fiestas.",
  openGraph: {
    title: "Blog | BeberGames",
    description: "Los mejores artículos de juegos con alcohol, verdad o reto, ring of fire y más.",
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="flex flex-1 flex-col items-center px-4 py-12 sm:py-20">
      <div className="w-full max-w-4xl text-center mb-16">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/25 mb-6">
          <ScrollText className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-3xl font-extrabold sm:text-5xl mb-4">
          Nuestro <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Blog</span>
        </h1>
        <p className="text-muted max-w-2xl mx-auto">
          Trucos, guías completas y las mejores ideas para que tu previa, fiesta y botellón sean legendarias. Descubre todo lo que hay detrás de los clásicos juegos para beber.
        </p>
      </div>

      <div className="grid gap-6 w-full max-w-4xl sm:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col gap-4 rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:border-indigo-500/40 hover:bg-surface-hover hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1"
          >
            <div className="flex flex-col gap-2 flex-1">
              {post.metadata.tags && post.metadata.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {post.metadata.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-xs font-semibold text-indigo-400">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <h2 className="text-xl font-bold group-hover:text-indigo-400 transition-colors">
                {post.metadata.title}
              </h2>
              <p className="text-sm leading-relaxed text-muted line-clamp-3">
                {post.metadata.excerpt}
              </p>
            </div>
            <div className="mt-4 flex items-center justify-between pt-4 border-t border-border">
              <span className="flex items-center gap-1.5 text-xs text-muted">
                <CalendarDays className="h-3.5 w-3.5" />
                {new Date(post.metadata.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
              <span className="flex items-center gap-1 text-xs font-medium text-indigo-400 transition-transform group-hover:translate-x-1">
                Leer artículo <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
