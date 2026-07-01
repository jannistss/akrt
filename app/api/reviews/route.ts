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

  let upstream: Response;
  try {
    upstream = await fetch(url.toString(), {
      next: { revalidate: 300 }, // cache 5 min server-side
    });
  } catch (err) {
    return NextResponse.json(
      { error: "upstream_unreachable", message: String(err) },
      { status: 502 }
    );
  }

  // Guard: only parse as JSON if the response actually says so.
  // Plain-text errors from the upstream (e.g. DB syntax errors) would
  // otherwise throw inside .json() and produce an unhandled 500.
  const contentType = upstream.headers.get("content-type") ?? "";
  if (!upstream.ok || !contentType.includes("application/json")) {
    const body = await upstream.text().catch(() => "(unreadable)");
    return NextResponse.json(
      { error: "upstream_error", status: upstream.status, message: body },
      { status: 502 }
    );
  }

  let data: unknown;
  try {
    data = await upstream.json();
  } catch (err) {
    return NextResponse.json(
      { error: "invalid_json", message: String(err) },
      { status: 502 }
    );
  }

  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
    },
  });
}
