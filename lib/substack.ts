import { XMLParser } from "fast-xml-parser";
import { SUBSTACK_RSS_URL } from "@/lib/constants";

export type SubstackPost = {
  id: string;
  title: string;
  slug: string;
  date: string; // ISO date string
  excerpt: string;
  url: string;
  imageUrl?: string;
  source: "substack";
};

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

function slugFromUrl(url: string): string {
  try {
    const parts = new URL(url).pathname.replace(/\/$/, "").split("/");
    return parts[parts.length - 1] ?? url;
  } catch {
    return url;
  }
}

function extractImageUrl(item: Record<string, unknown>): string | undefined {
  // <enclosure url="..." type="image/jpeg" />
  const enclosure = item["enclosure"];
  if (enclosure && typeof enclosure === "object") {
    const url = (enclosure as Record<string, unknown>)["@_url"];
    if (typeof url === "string" && url) return url;
  }

  // <media:content url="..." medium="image" />
  const media = item["media:content"];
  if (media && typeof media === "object") {
    const url = (media as Record<string, unknown>)["@_url"];
    if (typeof url === "string" && url) return url;
  }

  return undefined;
}

/**
 * Fetches the full HTML of a Substack post and returns plain text content.
 * Used by the seo-update script to give Claude the complete article body.
 * Substack posts are publicly accessible HTML pages.
 */
export async function fetchPostContent(url: string): Promise<string> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; SEOBot/1.0)" },
    });
    if (!res.ok) return "";
    const html = await res.text();

    // Extract the article body — Substack wraps post content in <div class="body markup">
    // Fall back to stripping all tags if the marker isn't found.
    const bodyMatch = html.match(
      /<div[^>]+class="[^"]*body markup[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/i
    );
    const raw = bodyMatch ? bodyMatch[1] : html;

    return raw
      .replace(/<[^>]*>/g, " ")   // strip HTML tags
      .replace(/\s+/g, " ")        // collapse whitespace
      .trim()
      .slice(0, 6000);             // cap for Claude token budget
  } catch {
    return "";
  }
}

export async function getSubstackPosts(): Promise<SubstackPost[]> {
  if (!SUBSTACK_RSS_URL) return [];

  try {
    const res = await fetch(SUBSTACK_RSS_URL, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) return [];

    const xml = await res.text();
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_",
    });
    const parsed = parser.parse(xml);

    const items: unknown[] = parsed?.rss?.channel?.item ?? [];
    const itemArray = Array.isArray(items) ? items : [items];

    return itemArray
      .filter((item): item is Record<string, unknown> =>
        typeof item === "object" && item !== null
      )
      .map((item) => {
        const url = String(item.link ?? "");
        const rawDate = String(item.pubDate ?? "");
        const isoDate = rawDate ? new Date(rawDate).toISOString().split("T")[0] : "";
        const rawDesc = String(item.description ?? "");
        const excerpt = stripHtml(rawDesc).slice(0, 200);
        const imageUrl = extractImageUrl(item);

        return {
          id: url,
          title: String(item.title ?? ""),
          slug: slugFromUrl(url),
          date: isoDate,
          excerpt,
          url,
          imageUrl,
          source: "substack" as const,
        };
      })
      .filter((p) => p.title && p.url);
  } catch {
    return [];
  }
}
