import { NextResponse } from "next/server";

const UPSTREAM = "https://google-business-profile-sync.vercel.app/api/reviews";
const CLIENT_SLUG = "autoklinik-reutlingen";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get("limit") ?? "50";
  const minStars = searchParams.get("min_stars") ?? "5";
  const showReplies = searchParams.get("show_replies");

  const url = new URL(UPSTREAM);
  url.searchParams.set("client", CLIENT_SLUG);
  url.searchParams.set("limit", limit);
  url.searchParams.set("min_stars", minStars);
  if (showReplies === "true") {
    url.searchParams.set("show_replies", "true");
  }

  // No Next.js server-side cache - the backend (google-business-profile-sync)
  // handles its own 60 s cache and purges it instantly after every sync via
  // its own /api/revalidate endpoint. Caching here would only delay updates.
  const upstream = await fetch(url.toString(), { cache: "no-store" });
  const data = await upstream.json();

  if (!upstream.ok) {
    return NextResponse.json(
      { error: data?.error ?? "Upstream error", status: upstream.status },
      { status: upstream.status, headers: { "Cache-Control": "no-store" } }
    );
  }

  return NextResponse.json(data, {
    headers: { "Cache-Control": "no-store" },
  });
}
