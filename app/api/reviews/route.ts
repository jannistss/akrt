import { NextResponse } from "next/server";

const UPSTREAM = "https://google-business-profile-sync.vercel.app/api/reviews";
const CLIENT_SLUG = "autoklinik-reutlingen";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get("limit") ?? "12";
  const minStars = searchParams.get("min_stars") ?? "5";

  const url = new URL(UPSTREAM);
  url.searchParams.set("client", CLIENT_SLUG);
  url.searchParams.set("limit", limit);
  url.searchParams.set("min_stars", minStars);

  const upstream = await fetch(url.toString(), {
    next: { revalidate: 300 }, // cache 5 min server-side
  });

  const data = await upstream.json();

  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
    },
  });
}
