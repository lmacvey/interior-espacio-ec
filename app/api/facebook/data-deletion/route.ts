import { createHmac } from "crypto";
import { NextRequest, NextResponse } from "next/server";

/**
 * Facebook Data Deletion Request Callback
 *
 * Facebook POSTs here when a user removes the app from their account.
 * We verify the signed_request signature, then return the required
 * confirmation JSON. No user data is stored, so deletion is immediate.
 *
 * Docs: https://developers.facebook.com/docs/development/create-an-app/app-dashboard/data-deletion-callback
 */

function parseSignedRequest(
  signedRequest: string,
  appSecret: string,
): Record<string, unknown> | null {
  const parts = signedRequest.split(".");
  if (parts.length !== 2) return null;

  const [encodedSig, payload] = parts;

  // Verify HMAC-SHA256 signature
  const expectedSig = createHmac("sha256", appSecret)
    .update(payload)
    .digest("base64url");

  if (expectedSig !== encodedSig) return null;

  try {
    const decoded = Buffer.from(payload, "base64url").toString("utf-8");
    return JSON.parse(decoded) as Record<string, unknown>;
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  const appSecret = process.env.FACEBOOK_APP_SECRET;
  if (!appSecret) {
    console.error("[facebook/data-deletion] FACEBOOK_APP_SECRET not set");
    return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
  }

  let body: URLSearchParams;
  try {
    const text = await request.text();
    body = new URLSearchParams(text);
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const signedRequest = body.get("signed_request");
  if (!signedRequest) {
    return NextResponse.json({ error: "Missing signed_request" }, { status: 400 });
  }

  const data = parseSignedRequest(signedRequest, appSecret);
  if (!data) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
  }

  const userId = typeof data.user_id === "string" ? data.user_id : "unknown";
  const confirmationCode = `${userId}-${Date.now()}`;

  console.info(
    `[facebook/data-deletion] Deletion request received. user_id=${userId} — no data stored, deletion complete.`,
  );

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://espaciointeriorec.com";

  return NextResponse.json({
    url: `${siteUrl}/facebook/data-deletion?code=${confirmationCode}`,
    confirmation_code: confirmationCode,
  });
}
