import { NextRequest, NextResponse } from "next/server";
import { presignUrl } from "@vercel/blob";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
  }

  // Only allow our own private blob store URLs
  if (!url.includes(".private.blob.vercel-storage.com")) {
    return NextResponse.json({ error: "Invalid URL" }, { status: 403 });
  }

  try {
    // Generate a signed URL valid for 1 hour
    const signed = await presignUrl(url, {
      expiresIn: 3600,
    });

    // Redirect directly to the signed URL
    return NextResponse.redirect(signed);
  } catch (err) {
    console.error("[v0] cv-download error:", err);
    return NextResponse.json({ error: "Could not generate download link" }, { status: 500 });
  }
}
