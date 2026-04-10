import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  title: string;
  slug: string;
  date: string; // ISO date string
  excerpt: string;
  published: boolean;
  source?: "local" | "substack";
  url?: string; // canonical URL — only set for substack posts
};

export type Post = {
  meta: PostMeta;
  content: string;
};

function slugFromFilename(filename: string): string {
  return filename.replace(/\.md$/, "");
}

function readAllFiles(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .sort();
}

export function getAllPosts(includeUnpublished = false): PostMeta[] {
  return readAllFiles()
    .map((filename) => {
      const filePath = path.join(BLOG_DIR, filename);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(raw);
      return {
        title: data.title ?? slugFromFilename(filename),
        slug: data.slug ?? slugFromFilename(filename),
        date: data.date ? String(data.date) : "",
        excerpt: data.excerpt ?? "",
        published: data.published !== false,
      } satisfies PostMeta;
    })
    .filter((post) => includeUnpublished || post.published)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    meta: {
      title: data.title ?? slug,
      slug: data.slug ?? slug,
      date: data.date ? String(data.date) : "",
      excerpt: data.excerpt ?? "",
      published: data.published !== false,
    },
    content,
  };
}
