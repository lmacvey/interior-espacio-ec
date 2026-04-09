import { getPageFeed, type FeedPost } from "@/lib/facebook";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-EC", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function truncate(text: string, max: number) {
  if (text.length <= max) return text;
  return text.slice(0, max).trimEnd() + "…";
}

export async function FacebookPageFeed({ limit = 5 }: { limit?: number }) {
  let posts: FeedPost[] = [];

  try {
    posts = await getPageFeed(limit);
  } catch {
    // Silently fail if FB credentials aren't configured — don't break the page
    return null;
  }

  if (posts.length === 0) return null;

  return (
    <section aria-label="Publicaciones recientes en Facebook">
      <ul className="space-y-6">
        {posts.map((post) => {
          const text = post.message ?? post.story ?? "";
          return (
            <li key={post.id} className="border rounded-lg overflow-hidden">
              {post.full_picture && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={post.full_picture}
                  alt=""
                  className="w-full aspect-video object-cover"
                />
              )}
              <div className="p-4 space-y-2">
                {text && (
                  <p className="text-sm leading-relaxed">
                    {truncate(text, 200)}
                  </p>
                )}
                <div className="flex items-center justify-between">
                  <time className="text-xs text-muted-foreground">
                    {formatDate(post.created_time)}
                  </time>
                  <a
                    href={post.permalink_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium hover:underline underline-offset-2"
                  >
                    Ver en Facebook →
                  </a>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
