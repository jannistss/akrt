import { NextResponse } from "next/server";

const UPSTREAM = "https://google-business-profile-sync.vercel.app/api/reviews";
const CLIENT_SLUG = "autoklinik-reutlingen";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get("limit") ?? "12";
  const minStars = searchParams.get("min_stars") ?? "5";
  const showReplies = searchParams.get("show_replies");

  const url = new URL(UPSTREAM);
  url.searchParams.set("client", CLIENT_SLUG);
  url.searchParams.set("limit", limit);
  url.searchParams.set("min_stars", minStars);
  if (showReplies === "true") {
    url.searchParams.set("show_replies", "true");
  }

  // Tag-based caching: stays cached until POST /api/revalidate is called.
  // Falls back to a 1-hour TTL so stale data never lives forever.
  const upstream = await fetch(url.toString(), {
    next: { tags: ["google-reviews"], revalidate: 3600 },
  });

  const data = await upstream.json();

  return NextResponse.json(data, {
    headers: {
      // Let the browser re-use for 60 s, but allow stale for up to 5 min
      // while the server fetches fresh data in the background.
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
    },
  });
}
