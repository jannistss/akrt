"use client";

import useSWR from "swr";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────────
   Types
───────────────────────────────────────────────────────────── */
interface Review {
  id: string;
  reviewer_name: string;
  star_rating: number;
  comment: string;
  create_time: string;
  reply_comment?: string | null;
}

interface ApiResponse {
  client: string;
  count: number;
  reviews: Review[];
}

/* ─────────────────────────────────────────────────────────────
   Helpers
───────────────────────────────────────────────────────────── */
const fetcher = (url: string) => fetch(url).then((r) => r.json());

/** Strip legacy UI artifact strings that can leak through from the data source. */
const ARTIFACT_STRINGS = ["Bearbeiten", "Löschen", "Antworten", "", "", ""];

function cleanText(raw: string | null | undefined): string {
  if (!raw) return "";
  let text = raw;
  for (const artifact of ARTIFACT_STRINGS) {
    text = text.split(artifact).join("");
  }
  return text.trim();
}

function relativeDate(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(mins / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);
  if (years >= 1) return `vor ${years} Jahr${years > 1 ? "en" : ""}`;
  if (months >= 1) return `vor ${months} Monat${months > 1 ? "en" : ""}`;
  if (days >= 1) return `vor ${days} Tag${days > 1 ? "en" : ""}`;
  if (hours >= 1) return `vor ${hours} Stunde${hours > 1 ? "n" : ""}`;
  return "gerade eben";
}

/* ─────────────────────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────────────────────── */
function StarRow({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <polygon
            points="10,1 12.9,7 19.5,7.6 14.5,12 16.2,18.5 10,15 3.8,18.5 5.5,12 0.5,7.6 7.1,7"
            fill={i < rating ? "#F59E0B" : "#E5E7EB"}
          />
        </svg>
      ))}
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-2xl p-5 flex flex-col gap-3 animate-pulse" style={{ backgroundColor: "#ffffff", border: "1px solid #d5e8f0" }}>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full" style={{ backgroundColor: "#e5eef3" }} />
        <div className="flex flex-col gap-1.5">
          <div className="h-3.5 w-28 rounded" style={{ backgroundColor: "#e5eef3" }} />
          <div className="h-3 w-20 rounded" style={{ backgroundColor: "#e5eef3" }} />
        </div>
      </div>
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="w-4 h-4 rounded" style={{ backgroundColor: "#e5eef3" }} />
        ))}
      </div>
      <div className="space-y-2">
        <div className="h-3 w-full rounded" style={{ backgroundColor: "#e5eef3" }} />
        <div className="h-3 w-5/6 rounded" style={{ backgroundColor: "#e5eef3" }} />
        <div className="h-3 w-4/6 rounded" style={{ backgroundColor: "#e5eef3" }} />
      </div>
    </div>
  );
}

function ReviewCard({ review, showReplies }: { review: Review; showReplies: boolean }) {
  const initials = review.reviewer_name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const comment = cleanText(review.comment);
  const replyComment = cleanText(review.reply_comment);

  return (
    <article className="rounded-2xl p-5 flex flex-col gap-4 transition-colors duration-200" style={{ backgroundColor: "#ffffff", border: "1px solid #d5e8f0" }}>
      {/* Reviewer header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold shrink-0"
            style={{ background: "linear-gradient(135deg, #1a6fcf, #0d1b2a)", color: "#fff" }}
            aria-hidden="true"
          >
            {initials}
          </div>
          <div>
            <p className="text-sm font-semibold leading-tight" style={{ color: "#002e40" }}>
              {review.reviewer_name}
            </p>
            <p className="text-xs mt-0.5" style={{ color: "#7a96a3" }}>
              {relativeDate(review.create_time)}
            </p>
          </div>
        </div>
        {/* Google G logo */}
        <svg width="18" height="18" viewBox="0 0 24 24" aria-label="Google" className="shrink-0 opacity-60 mt-0.5">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
      </div>

      {/* Stars */}
      <StarRow rating={review.star_rating} />

      {/* Comment — only rendered when non-empty after cleaning */}
      {comment && (
        <p className="text-sm leading-relaxed flex-1" style={{ color: "#334e5c" }}>
          {comment}
        </p>
      )}

      {/* Owner reply — only shown when showReplies is enabled and reply is non-empty */}
      {showReplies && replyComment && (
        <div className="rounded-xl border border-[#1a6fcf]/25 bg-[#0d1b2a]/60 p-4 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-[#1a6fcf]/30 flex items-center justify-center shrink-0">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" fill="#1a6fcf"/>
              </svg>
            </div>
            <p className="text-xs font-semibold text-[#3b8fe8]">
              Antwort vom Inhaber
            </p>
          </div>
          <p className="text-xs text-white/55 leading-relaxed">
            {replyComment}
          </p>
        </div>
      )}
    </article>
  );
}

/* ────────────────────────────────────────��────────────────────
   Main widget
───────────────────────────────────────────────────────────── */
interface GoogleReviewsProps {
  /**
   * When true, owner replies are fetched from the API (show_replies=true)
   * and rendered beneath each review card. Default: false.
   */
  showReplies?: boolean;
}

export default function GoogleReviews({ showReplies = false }: GoogleReviewsProps) {
  const fetchUrl = `/api/reviews?limit=12&min_stars=5${showReplies ? "&show_replies=true" : ""}`;

  const { data, error, isLoading } = useSWR<ApiResponse>(
    fetchUrl,
    fetcher,
    { revalidateOnFocus: false }
  );

  // Treat API-level errors (e.g. unknown slug) the same as network errors
  const hasApiError = !isLoading && (!data || "error" in (data as object));
  const reviews = (!hasApiError && data?.reviews) ? data.reviews : [];
  const count = data?.count ?? 0;
  const hasReviews = reviews.length > 0;

  return (
    <section
      className="py-20 px-4"
      style={{ backgroundColor: "#f5f9fc" }}
      aria-labelledby="reviews-heading"
    >
      <div className="max-w-6xl mx-auto">

        {/* Header card */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#0074a2" }}>
              Kundenstimmen
            </p>
            <h2
              id="reviews-heading"
              className="text-3xl font-bold leading-tight"
              style={{ color: "#002e40" }}
            >
              Was unsere Kunden sagen
            </h2>
          </div>

          {/* Rating badge + CTA */}
            <div className="flex items-center gap-4 shrink-0">
              <div className="flex flex-col items-center rounded-2xl px-5 py-3 gap-1" style={{ backgroundColor: "#ffffff", border: "1px solid #d5e8f0" }}>
                <div className="flex items-center gap-2">
                  {/* Google logo */}
                  <svg width="20" height="20" viewBox="0 0 24 24" aria-label="Google">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span className="text-2xl font-bold" style={{ color: "#002e40" }}>5.0</span>
                  <StarRow rating={5} size={14} />
                </div>
                {!isLoading && !hasApiError && hasReviews && (
                  <p className="text-xs" style={{ color: "#4a6272" }}>{count} Bewertungen</p>
                )}
              </div>

            <a
              href="https://g.page/r/autoklinik-reutlingen/review"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:brightness-110 active:scale-[.98]"
              style={{ background: "#1a6fcf" }}
            >
              Bewertung abgeben
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 17L17 7M7 7h10v10"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Grid */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {(error || hasApiError) && !isLoading && (
          <div className="text-center py-16 text-sm" style={{ color: "#7a96a3" }}>
            Bewertungen konnten nicht geladen werden.
          </div>
        )}

        {!isLoading && !error && !hasApiError && !hasReviews && (
          <div className="text-center py-16 text-sm" style={{ color: "#7a96a3" }}>
            Noch keine Bewertungen vorhanden.
          </div>
        )}

        {!isLoading && hasReviews && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} showReplies={showReplies} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
