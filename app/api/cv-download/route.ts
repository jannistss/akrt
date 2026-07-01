import { NextRequest, NextResponse } from "next/server";

// Obfuscates the real blob URL so it is never exposed in the email link.
// The token in the email is permanent - on every click the server fetches the file
// directly using the BLOB_READ_WRITE_TOKEN and streams it to the browser.

function xorCipher(input: string): string {
  const secret = (process.env.BLOB_READ_WRITE_TOKEN ?? "").slice(0, 32).padEnd(32, "x");
  const buf = Buffer.from(input, "utf8");
  const out = Buffer.alloc(buf.length);
  for (let i = 0; i < buf.length; i++) {
    out[i] = buf[i] ^ secret.charCodeAt(i % secret.length);
  }
  return out.toString("base64url");
}

export function encodeToken(blobUrl: string): string {
  return xorCipher(blobUrl);
}

function decodeToken(token: string): string {
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
    blobUrl = decodeToken(token);
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 403 });
  }

  if (!blobUrl.includes(".blob.vercel-storage.com")) {
    return NextResponse.json({ error: "Invalid URL" }, { status: 403 });
  }

  // Fetch the private blob server-side using the read/write token as auth.
  const blobRes = await fetch(blobUrl, {
    headers: {
      Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN ?? ""}`,
    },
  });

  if (!blobRes.ok) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  const contentType = blobRes.headers.get("content-type") ?? "application/octet-stream";
  const filename = blobUrl.split("/").pop() ?? "lebenslauf";

  return new NextResponse(blobRes.body, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
