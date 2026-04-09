const GRAPH_BASE = "https://graph.facebook.com/v21.0";

function getConfig() {
  const pageId = process.env.FACEBOOK_PAGE_ID;
  const token = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
  if (!pageId || !token) {
    throw new Error(
      "Missing FACEBOOK_PAGE_ID or FACEBOOK_PAGE_ACCESS_TOKEN environment variables"
    );
  }
  return { pageId, token };
}

export type FeedPost = {
  id: string;
  message?: string;
  story?: string;
  created_time: string;
  full_picture?: string;
  permalink_url: string;
};

/** Post a message to the Facebook Page immediately. */
export async function publishPost(
  message: string,
  link?: string
): Promise<{ id: string }> {
  const { pageId, token } = getConfig();

  const body: Record<string, string> = { message, access_token: token };
  if (link) body.link = link;

  const res = await fetch(`${GRAPH_BASE}/${pageId}/feed`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.error?.message ?? "Facebook API error");
  }
  return data as { id: string };
}

/** Schedule a post to the Facebook Page (uses FB native scheduling). */
export async function schedulePost(
  message: string,
  publishAt: Date,
  link?: string
): Promise<{ id: string }> {
  const { pageId, token } = getConfig();

  const scheduledTime = Math.floor(publishAt.getTime() / 1000);
  const body: Record<string, string | number | boolean> = {
    message,
    access_token: token,
    published: false,
    scheduled_publish_time: scheduledTime,
  };
  if (link) body.link = link;

  const res = await fetch(`${GRAPH_BASE}/${pageId}/feed`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.error?.message ?? "Facebook API error");
  }
  return data as { id: string };
}

/** Fetch recent posts from the Facebook Page feed (for site embed). */
export async function getPageFeed(limit = 5): Promise<FeedPost[]> {
  const { pageId, token } = getConfig();

  const fields =
    "id,message,story,created_time,full_picture,permalink_url";
  const url = `${GRAPH_BASE}/${pageId}/feed?fields=${fields}&limit=${limit}&access_token=${token}`;

  const res = await fetch(url, { next: { revalidate: 1800 } });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error?.message ?? "Facebook API error");
  }

  return (data.data ?? []) as FeedPost[];
}
