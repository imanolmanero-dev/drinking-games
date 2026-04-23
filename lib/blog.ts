import fs from "fs";
import path from "path";
import matter from "gray-matter";

const blogDirectory = path.join(process.cwd(), "content/blog");

export interface BlogPostMetadata {
  title: string;
  excerpt: string;
  coverImage?: string;
  date: string;
  author: string;
  tags?: string[];
}

export interface BlogPost {
  slug: string;
  content: string;
  metadata: BlogPostMetadata;
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tags = new Set<string>();
  posts.forEach((post) => {
    if (post.metadata.tags) {
      post.metadata.tags.forEach((tag) => tags.add(tag));
    }
  });
  return Array.from(tags);
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(blogDirectory)) {
    return [];
  }
  return fs.readdirSync(blogDirectory).filter((file) => file.endsWith(".mdx"));
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const realSlug = slug.replace(/\.mdx$/, "");
    const fullPath = path.join(blogDirectory, `${realSlug}.mdx`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug: realSlug,
      metadata: data as BlogPostMetadata,
      content,
    };
  } catch (error) {
    console.error(`Error reading blog post: ${slug}`, error);
    return null;
  }
}

export function getAllPosts(): BlogPost[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is BlogPost => post !== null)
    .sort((post1, post2) => (post1.metadata.date > post2.metadata.date ? -1 : 1));
  return posts;
}

/** Returns estimated reading time in minutes (200 wpm average). */
export function readingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}
