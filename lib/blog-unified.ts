import fs from "fs";
import path from "path";
import { getAllPosts, type PostMeta } from "@/lib/blog";
import { getSubstackPosts } from "@/lib/substack";

interface SeoOverride {
  excerpt?: string;
  keywords?: string[];
  tags?: string[];
}

// Load generated SEO overrides from data/seo-excerpts.json (created by npm run seo:update).
// Returns an empty object if the file doesn't exist yet.
function loadSeoOverrides(): Record<string, SeoOverride> {
  const filePath = path.join(process.cwd(), "data", "seo-excerpts.json");
  if (!fs.existsSync(filePath)) return {};
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch {
    return {};
  }
}

export async function getUnifiedPosts(): Promise<PostMeta[]> {
  const [localPosts, substackPosts, overrides] = await Promise.all([
    Promise.resolve(getAllPosts()),
    getSubstackPosts(),
    Promise.resolve(loadSeoOverrides()),
  ]);

  const local: PostMeta[] = localPosts.map((p) => {
    const ov = overrides[p.slug];
    return {
      ...p,
      source: "local" as const,
      ...(ov?.excerpt && { excerpt: ov.excerpt }),
      ...(ov?.tags && { tags: ov.tags }),
    };
  });

  const substack: PostMeta[] = substackPosts.map((p) => {
    const ov = overrides[p.slug];
    return {
      title: p.title,
      slug: p.slug,
      date: p.date,
      excerpt: ov?.excerpt ?? p.excerpt,
      published: true,
      source: "substack" as const,
      url: p.url,
      imageUrl: p.imageUrl,
      ...(ov?.tags && { tags: ov.tags }),
    };
  });

  return [...local, ...substack].sort((a, b) => (a.date < b.date ? 1 : -1));
}
