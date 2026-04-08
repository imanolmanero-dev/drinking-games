import { notFound } from "next/navigation";
import { getPostBySlug, getPostSlugs } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { ArrowLeft, CalendarDays } from "lucide-react";
import type { Metadata } from "next";

interface Params {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);
  if (!post) {
    return {
      title: "Artículo no encontrado",
    };
  }

  return {
    title: post.metadata.title,
    description: post.metadata.excerpt,
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.excerpt,
      type: "article",
      publishedTime: post.metadata.date,
      authors: [post.metadata.author],
    },
  };
}

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((file) => ({
    slug: file.replace(/\.mdx$/, ""),
  }));
}

export default async function BlogPostPage({ params }: Params) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);

  if (!post) {
    return notFound();
  }

  const customComponents = {
    // Custom components can be passed here to map standard MDX to our UI
    a: (props: any) => (
      <Link
        href={props.href}
        className="text-amber-500 hover:text-amber-400 no-underline hover:underline transition-colors font-medium relative z-10"
      >
        {props.children}
      </Link>
    ),
  };

  return (
    <article className="flex flex-col items-center px-4 py-12 sm:py-20 w-full">
      <div className="w-full max-w-3xl">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al blog
        </Link>
        <header className="mb-10 flex flex-col gap-4 border-b border-border pb-10">
          <div className="flex flex-wrap gap-2 text-sm text-muted">
            <time className="flex items-center gap-1.5 font-medium">
               <CalendarDays className="h-4 w-4" />
               {new Date(post.metadata.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
            <span className="hidden sm:inline">•</span>
            <span>Por {post.metadata.author}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
            {post.metadata.title}
          </h1>
          {post.metadata.tags && post.metadata.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {post.metadata.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-surface-hover border border-border px-3 py-1 text-xs font-semibold text-foreground">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* The typography plugin handles styling natively via prose */}
        <div className="prose prose-invert prose-amber max-w-none prose-headings:font-bold prose-a:font-medium prose-a:text-amber-500">
          <MDXRemote source={post.content} components={customComponents} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
        </div>
      </div>
    </article>
  );
}
