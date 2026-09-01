import type { Metadata } from "next";

// This route only issues a permanent redirect to /hagelschaden (the canonical
// URL for this content) — it never renders, so metadata stays minimal and
// points crawlers straight to the real page instead of duplicating its tags.
export const metadata: Metadata = {
  title: "Hagelschadenzentrum Reutlingen",
  alternates: {
    canonical: "/hagelschaden",
  },
  robots: { index: false, follow: true },
};

export default function HagelschadenzentrumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
