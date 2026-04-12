/**
 * seo-update.ts
 *
 * Fetches each Substack post's full article content, then uses the Claude API
 * to generate:
 *   - improved excerpt (140–160 chars, SEO-optimised)
 *   - keywords aligned with the site's ad strategy
 *   - topic tags for user-facing search and filtering
 *
 * Results are written to data/seo-excerpts.json and picked up automatically
 * by lib/blog-unified.ts at build time (no code changes needed after a run).
 *
 * Usage:
 *   npm run seo:check    — report what needs updating, write nothing
 *   npm run seo:update   — fetch full articles, generate metadata, write file
 *
 * Required env vars (loaded from .env.local automatically):
 *   ANTHROPIC_API_KEY
 *   SUBSTACK_PUBLICATION  (e.g. "espaciointeriorec")
 */

import fs from "fs";
import path from "path";
import Anthropic from "@anthropic-ai/sdk";
import { XMLParser } from "fast-xml-parser";

// ---------------------------------------------------------------------------
// Load .env.local (script runs outside Next.js, no dotenv by default)
// ---------------------------------------------------------------------------
const envPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf-8").split("\n")) {
    const eq = line.indexOf("=");
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    const raw = line.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
    const val = raw.replace(/\s+#.*$/, ""); // strip inline comments
    if (key && !key.startsWith("#") && val) process.env[key] = process.env[key] ?? val;
  }
}

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------
const CHECK_ONLY = process.argv.includes("--check");
const FORCE = process.argv.includes("--force"); // re-process already-overridden posts
const OUT_FILE = path.join(process.cwd(), "data", "seo-excerpts.json");
const MIN_EXCERPT_LEN = 80;

const KEYWORD_STRATEGY = `
Primary: terapia en línea, psicóloga clínica, psicología online Ecuador
Secondary: transiciones de vida, salud mental, acompañamiento emocional, terapia individual
Long-tail: terapia en línea en español, sesión de exploración gratuita, psicóloga USFQ,
           ansiedad en línea, terapia para expatriados, psicóloga online Ecuador,
           psicólogo online Quito, terapia para ansiedad, terapia individual online,
           consulta psicológica online, ayuda psicológica online
`.trim();

// Canonical topic tags used for user-facing search on the blog page.
// Claude must choose from this list (or suggest new ones for review).
const AVAILABLE_TAGS = [
  "ansiedad",
  "duelo",
  "identidad",
  "relaciones",
  "transiciones",
  "autoconocimiento",
  "bienestar",
  "límites",
  "familia",
  "pareja",
  "trabajo",
  "cambio",
  "trauma",
  "autocuidado",
  "emociones",
  "terapia",
  "expatriados",
  "maternidad",
];

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface RssPost {
  slug: string;
  title: string;
  url: string;
  date: string;
  rawDescription: string;
}

interface SeoOverride {
  excerpt: string;
  keywords: string[];
  tags: string[];
  generatedAt: string;
}

// ---------------------------------------------------------------------------
// RSS helpers
// ---------------------------------------------------------------------------
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function slugFromUrl(url: string): string {
  try {
    const parts = new URL(url).pathname.replace(/\/$/, "").split("/");
    return parts[parts.length - 1] ?? url;
  } catch {
    return url;
  }
}

async function fetchRssPosts(): Promise<RssPost[]> {
  const publication = process.env.SUBSTACK_PUBLICATION;
  if (!publication) {
    console.error("Error: SUBSTACK_PUBLICATION env var not set.");
    process.exit(1);
  }

  const rssUrl = `https://${publication}.substack.com/feed`;
  console.log(`Fetching RSS: ${rssUrl}\n`);

  const res = await fetch(rssUrl);
  if (!res.ok) {
    console.error(`RSS fetch failed: ${res.status}`);
    process.exit(1);
  }

  const xml = await res.text();
  const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "@_" });
  const parsed = parser.parse(xml);
  const items: unknown[] = parsed?.rss?.channel?.item ?? [];
  const arr = Array.isArray(items) ? items : [items];

  return arr
    .filter((i): i is Record<string, unknown> => typeof i === "object" && i !== null)
    .map((item) => ({
      slug: slugFromUrl(String(item.link ?? "")),
      title: String(item.title ?? ""),
      url: String(item.link ?? ""),
      date: item.pubDate ? new Date(String(item.pubDate)).toISOString().split("T")[0] : "",
      rawDescription: String(item.description ?? ""),
    }))
    .filter((p) => p.title && p.url);
}

// ---------------------------------------------------------------------------
// Full article content — fetch the Substack post page and extract plain text
// ---------------------------------------------------------------------------
async function fetchArticleText(url: string): Promise<string> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; SEOBot/1.0)" },
    });
    if (!res.ok) return "";
    const html = await res.text();

    // Substack wraps the article body in <div class="body markup">
    const bodyMatch = html.match(
      /<div[^>]+class="[^"]*body\s+markup[^"]*"[^>]*>([\s\S]*?)<\/div>\s*(?:<\/div>|<footer)/i
    );
    const raw = bodyMatch ? bodyMatch[1] : html;

    return stripHtml(raw).slice(0, 6000); // cap for Claude token budget
  } catch {
    return "";
  }
}

// ---------------------------------------------------------------------------
// Claude — generate excerpt, keywords, and tags from full article text
// ---------------------------------------------------------------------------
async function generateSeoMetadata(
  post: RssPost,
  articleText: string,
  client: Anthropic
): Promise<SeoOverride> {
  const content = articleText || stripHtml(post.rawDescription);

  const message = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 400,
    messages: [
      {
        role: "user",
        content: `You are an SEO specialist for a Spanish-language therapy practice in Ecuador.

Site keyword strategy:
${KEYWORD_STRATEGY}

Available topic tags (choose 2–4 that best match this article):
${AVAILABLE_TAGS.join(", ")}

Blog post title: "${post.title}"
Full article text:
${content}

Return ONLY a JSON object — no markdown, no explanation:
{
  "excerpt": "Compelling Spanish meta description: 140–160 chars, includes at least one target keyword, ends naturally",
  "keywords": ["4–6 relevant Spanish keywords from the keyword strategy above"],
  "tags": ["2–4 tags chosen from the available tags list above that best describe the article topics"]
}`,
      },
    ],
  });

  const raw = message.content[0].type === "text" ? message.content[0].text.trim() : "{}";

  try {
    const parsed = JSON.parse(raw) as Partial<SeoOverride>;
    return {
      excerpt: parsed.excerpt ?? "",
      keywords: parsed.keywords ?? [],
      tags: (parsed.tags ?? []).filter((t) => AVAILABLE_TAGS.includes(t)),
      generatedAt: new Date().toISOString(),
    };
  } catch {
    const match = raw.match(/\{[\s\S]*\}/);
    if (match) {
      const parsed = JSON.parse(match[0]) as Partial<SeoOverride>;
      return {
        excerpt: parsed.excerpt ?? "",
        keywords: parsed.keywords ?? [],
        tags: (parsed.tags ?? []).filter((t) => AVAILABLE_TAGS.includes(t)),
        generatedAt: new Date().toISOString(),
      };
    }
    throw new Error(`Could not parse Claude response: ${raw}`);
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  const posts = await fetchRssPosts();

  if (posts.length === 0) {
    console.log("No posts found in RSS feed.");
    return;
  }

  // Load existing overrides
  let existing: Record<string, SeoOverride> = {};
  if (fs.existsSync(OUT_FILE)) {
    try {
      existing = JSON.parse(fs.readFileSync(OUT_FILE, "utf-8"));
    } catch { /* ignore */ }
  }

  // Determine which posts need work
  const toProcess = posts.filter((p) => {
    if (FORCE) return true;
    if (existing[p.slug]) return false; // already has overrides
    return stripHtml(p.rawDescription).length < MIN_EXCERPT_LEN;
  });

  if (toProcess.length === 0 && !FORCE) {
    console.log(`✓ All ${posts.length} posts already have SEO overrides.`);
    console.log("  Use --force to regenerate all.");
    return;
  }

  console.log(`${posts.length} posts in feed.`);
  console.log(`${Object.keys(existing).length} already have overrides.`);
  console.log(`${toProcess.length} post(s) to process:\n`);

  for (const p of toProcess) {
    const excerpt = stripHtml(p.rawDescription).slice(0, 80);
    console.log(`  ${p.slug} — "${excerpt}..."`);
  }

  if (CHECK_ONLY) {
    console.log("\nRun `npm run seo:update` to generate metadata.");
    return;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error("\nError: ANTHROPIC_API_KEY not set.");
    process.exit(1);
  }

  const client = new Anthropic({ apiKey });
  const updated = { ...existing };

  console.log("\nFetching full articles and generating metadata...\n");

  for (const post of toProcess) {
    process.stdout.write(`  ${post.slug}\n    fetching article... `);
    const articleText = await fetchArticleText(post.url);
    console.log(articleText ? `${articleText.length} chars` : "fallback to RSS excerpt");

    process.stdout.write("    generating metadata... ");
    try {
      const result = await generateSeoMetadata(post, articleText, client);
      updated[post.slug] = result;
      console.log("✓");
      console.log(`    excerpt: "${result.excerpt}"`);
      console.log(`    tags:    [${result.tags.join(", ")}]`);
      console.log(`    keywords: [${result.keywords.join(", ")}]\n`);
    } catch (err) {
      console.log("✗ failed");
      console.error(`    ${err instanceof Error ? err.message : String(err)}\n`);
    }
  }

  // Write output
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  fs.writeFileSync(OUT_FILE, JSON.stringify(updated, null, 2), "utf-8");

  const tagCounts: Record<string, number> = {};
  for (const ov of Object.values(updated)) {
    for (const tag of ov.tags ?? []) {
      tagCounts[tag] = (tagCounts[tag] ?? 0) + 1;
    }
  }

  console.log(`\nWrote overrides for ${Object.keys(updated).length} post(s) → data/seo-excerpts.json`);
  console.log(`\nAll tags in use:`);
  for (const [tag, count] of Object.entries(tagCounts).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${tag}: ${count}`);
  }
}

main().catch((err) => { console.error(err); process.exit(1); });
