import { getAllPosts, type PostMeta } from "@/lib/blog";
import { getSubstackPosts } from "@/lib/substack";

export async function getUnifiedPosts(): Promise<PostMeta[]> {
  const [localPosts, substackPosts] = await Promise.all([
    Promise.resolve(getAllPosts()),
    getSubstackPosts(),
  ]);

  const local: PostMeta[] = localPosts.map((p) => ({ ...p, source: "local" as const }));

  const substack: PostMeta[] = substackPosts.map((p) => ({
    title: p.title,
    slug: p.slug,
    date: p.date,
    excerpt: p.excerpt,
    published: true,
    source: "substack" as const,
    url: p.url,
    imageUrl: p.imageUrl,
  }));

  return [...local, ...substack].sort((a, b) => (a.date < b.date ? 1 : -1));
}
