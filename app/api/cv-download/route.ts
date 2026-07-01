import { NextRequest, NextResponse } from "next/server";
import { presignUrl } from "@vercel/blob";

// The token→blobUrl mapping is embedded in the link by the apply route.
// We never expose the real blob URL externally — the token IS the link,
// and the blob URL travels server-side only (encoded in the signed email link
// via a simple HMAC-like obfuscation using the BLOB_READ_WRITE_TOKEN secret).
//
// Implementation: apply route encodes blobUrl with a secret key → base64.
// cv-download route decodes it server-side → generates a fresh presignUrl → redirects.
// The link never expires because we can always generate a new presignUrl on demand.

function encode(blobUrl: string): string {
  const secret = (process.env.BLOB_READ_WRITE_TOKEN ?? "").slice(0, 32).padEnd(32, "x");
  const buf = Buffer.from(blobUrl, "utf8");
  const out = Buffer.alloc(buf.length);
  for (let i = 0; i < buf.length; i++) {
    out[i] = buf[i] ^ secret.charCodeAt(i % secret.length);
  }
  return out.toString("base64url");
}

export function encodeToken(blobUrl: string): string {
  return encode(blobUrl);
}

function decode(token: string): string {
  const secret = (process.env.BLOB_READ_WRITE_TOKEN ?? "").slice(0, 32).padEnd(32, "x");
  const buf = Buffer.from(token, "base64url");
  const out = Buffer.alloc(buf.length);
  for (let i = 0; i < buf.length; i++) {
    out[i] = buf[i] ^ secret.charCodeAt(i % secret.length);
  }
  return out.toString("utf8");
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 });
  }

  let blobUrl: string;
  try {
    blobUrl = decode(token);
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 403 });
  }

  if (!blobUrl.includes(".private.blob.vercel-storage.com")) {
    return NextResponse.json({ error: "Invalid URL" }, { status: 403 });
  }

  try {
    // Generate a fresh short-lived signed URL — but the token in the email is permanent.
    const signed = await presignUrl(blobUrl, { expiresIn: 3600 });
    return NextResponse.redirect(signed);
  } catch (err) {
    console.error("[cv-download] presign error:", err);
    return NextResponse.json({ error: "Could not generate download link" }, { status: 500 });
  }
}
