import { NextResponse } from "next/server";
import { getPageFeed } from "@/lib/facebook";

export const revalidate = 1800; // 30 minutes

export async function GET() {
  try {
    const posts = await getPageFeed(5);
    return NextResponse.json(posts);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Error al obtener el feed";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
