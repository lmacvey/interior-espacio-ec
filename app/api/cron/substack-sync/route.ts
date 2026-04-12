import { NextRequest, NextResponse } from "next/server";
import { getSubstackPosts } from "@/lib/substack";
import { isAlreadyPosted, markAsPosted } from "@/lib/dynamodb";
import { publishPost } from "@/lib/facebook";

export async function POST(request: NextRequest) {
  // Validate cron secret
  const secret = request.headers.get("x-cron-secret");
  if (!secret || secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const posts = await getSubstackPosts();

  let checked = 0;
  let posted = 0;
  let skipped = 0;
  const errors: string[] = [];

  for (const post of posts) {
    checked++;

    try {
      const alreadyPosted = await isAlreadyPosted(post.id);
      if (alreadyPosted) {
        skipped++;
        continue;
      }

      const message = `${post.title}\n\n${post.excerpt}\n\nLeer más → ${post.url}`;
      const result = await publishPost(message, post.url);

      await markAsPosted({
        substackPostId: post.id,
        facebookPostId: result.id,
        title: post.title,
        url: post.url,
      });

      posted++;
    } catch (err) {
      errors.push(`${post.title}: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  return NextResponse.json({ checked, posted, skipped, errors });
}
