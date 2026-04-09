import { NextRequest, NextResponse } from "next/server";
import { publishPost, schedulePost } from "@/lib/facebook";

function isAuthorized(request: NextRequest): boolean {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return false;
  // Accept either cookie-based auth (admin UI) or Bearer token (API calls)
  const cookie = request.cookies.get("admin_session")?.value;
  if (cookie === secret) return true;
  const bearer = request.headers.get("Authorization")?.replace("Bearer ", "").trim();
  return bearer === secret;
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { message?: string; link?: string; scheduledAt?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { message, link, scheduledAt } = body;

  if (!message || typeof message !== "string" || message.trim().length === 0) {
    return NextResponse.json(
      { error: "El mensaje no puede estar vacío" },
      { status: 400 }
    );
  }

  try {
    let result: { id: string };

    if (scheduledAt) {
      const publishAt = new Date(scheduledAt);
      if (isNaN(publishAt.getTime()) || publishAt <= new Date()) {
        return NextResponse.json(
          { error: "La fecha programada debe ser en el futuro" },
          { status: 400 }
        );
      }
      result = await schedulePost(message.trim(), publishAt, link);
    } else {
      result = await publishPost(message.trim(), link);
    }

    return NextResponse.json({ success: true, postId: result.id });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Error al publicar en Facebook";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
