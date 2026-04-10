import { notFound } from "next/navigation";
import { getPostBySlug, getPostSlugs } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { ArrowLeft, CalendarDays } from "lucide-react";
import type { Metadata } from "next";
import {
  FAQJsonLd,
  ArticleJsonLd,
  BreadcrumbJsonLd,
} from "@/components/seo/JsonLd";
import { blogFAQs } from "@/lib/data/blog-faqs";

const BASE_URL = "https://bebergames.com";

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
      url: `${BASE_URL}/blog/${resolvedParams.slug}`,
    },
    alternates: {
      canonical: `${BASE_URL}/blog/${resolvedParams.slug}`,
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

  const faqs = blogFAQs[resolvedParams.slug] ?? [];
  const articleUrl = `${BASE_URL}/blog/${resolvedParams.slug}`;

  const customComponents = {
    // Custom components can be passed here to map standard MDX to our UI
    a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
      <Link
        href={props.href ?? "/"}
        className="text-amber-500 hover:text-amber-400 no-underline hover:underline transition-colors font-medium relative z-10"
      >
        {props.children}
      </Link>
    ),
  };

  return (
    <article className="flex flex-col items-center px-4 py-12 sm:py-20 w-full">
      {/* Structured Data */}
      <ArticleJsonLd
        title={post.metadata.title}
        description={post.metadata.excerpt}
        url={articleUrl}
        datePublished={post.metadata.date}
        author={post.metadata.author}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: BASE_URL },
          { name: "Blog", url: `${BASE_URL}/blog` },
          { name: post.metadata.title, url: articleUrl },
        ]}
      />
      {faqs.length > 0 && <FAQJsonLd faqs={faqs} />}

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

        {/* FAQ section visible on page if post has FAQs */}
        {faqs.length > 0 && (
          <div className="mt-16 flex flex-col gap-6">
            <h2 className="text-xl font-bold border-t border-border pt-8">
              Preguntas frecuentes
            </h2>
            <div className="flex flex-col gap-4">
              {faqs.map(({ q, a }, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border bg-surface p-5 flex flex-col gap-2"
                >
                  <h3 className="text-sm font-bold text-foreground">{q}</h3>
                  <p className="text-sm text-muted leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

