import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

/**
 * POST /api/revalidate?secret=<REVALIDATE_SECRET>
 *
 * Called by the reviews backend after every sync to invalidate the
 * server-side cache for Google Reviews. Returns immediately so the
 * backend does not time out waiting on the revalidation.
 *
 * Set the REVALIDATE_SECRET environment variable to a random string and
 * configure the same value as the webhook secret in the backend.
 */
export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");

  // Protect against unauthorized cache-busting
  if (
    process.env.REVALIDATE_SECRET &&
    secret !== process.env.REVALIDATE_SECRET
  ) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  revalidateTag("google-reviews");

  return NextResponse.json({ revalidated: true, at: new Date().toISOString() });
}
