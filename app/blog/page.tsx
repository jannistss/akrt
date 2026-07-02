import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AutoklinikNavbar } from "@/components/autoklinik-navbar";
import { AutoklinikFooter } from "@/components/autoklinik-footer";
import { blogPosts } from "@/lib/blog-data";

export const metadata: Metadata = {
  title: "Ratgeber & Blog | Autoklinik Reutlingen",
  description:
    "Tipps, Ratgeber und aktuelle Themen rund ums Auto: TÜV, Ölwechsel, Klimaanlage, Reifen und mehr – von den Experten der Autoklinik Reutlingen.",
  openGraph: {
    title: "Ratgeber & Blog | Autoklinik Reutlingen",
    description:
      "Tipps, Ratgeber und aktuelle Themen rund ums Auto von den Experten der Autoklinik Reutlingen.",
    url: "https://autoklinik-reutlingen.de/blog",
    type: "website",
  },
  alternates: { canonical: "https://autoklinik-reutlingen.de/blog" },
};

function AuthorAvatar({ name, size = 9 }: { name: string; size?: number }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");
  const px = size * 4;
  return (
    <div
      className={`flex items-center justify-center rounded-full text-white font-bold shrink-0`}
      style={{ width: px, height: px, fontSize: px * 0.35, backgroundColor: "#0074a2" }}
    >
      {initials}
    </div>
  );
}

export default function BlogPage() {
  const featured = blogPosts[0];
  const rest = blogPosts.slice(1);

  return (
    <>
      <AutoklinikNavbar />
      <main>
        {/* Hero */}
        <section style={{ backgroundColor: "#002e40" }} className="pt-32 pb-16">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
            <p
              className="text-xs font-semibold uppercase tracking-[0.2em] mb-4"
              style={{ color: "#4db8d8" }}
            >
              Ratgeber & Blog
            </p>
            <h1
              className="font-bold tracking-tight text-balance mb-5"
              style={{ color: "#ffffff", fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
            >
              Alles rund ums Auto –<br />erklärt von Experten
            </h1>
            <p
              className="text-base leading-relaxed max-w-xl"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              Praxisnahe Ratgeber zu TÜV, Wartung, Reifen, Klimaanlage und mehr – direkt aus der Werkstatt.
            </p>
          </div>
        </section>

        {/* Featured post */}
        <section style={{ backgroundColor: "#f5f9fc" }} className="py-14">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-6" style={{ color: "#0074a2" }}>
              Aktueller Beitrag
            </p>
            <Link href={`/blog/${featured.slug}`} className="group block">
              <div
                className="grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden"
                style={{
                  backgroundColor: "#ffffff",
                  boxShadow: "0 8px 40px rgba(0,46,64,0.10)",
                }}
              >
                {/* Image */}
                <div className="relative overflow-hidden" style={{ minHeight: 320 }}>
                  <Image
                    src={featured.image}
                    alt={featured.imageAlt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </div>

                {/* Text */}
                <div className="flex flex-col justify-between p-8 lg:p-12">
                  <div>
                    <span
                      className="inline-block rounded-full px-3 py-1 text-xs font-semibold mb-5"
                      style={{ backgroundColor: "#e8f4fa", color: "#0074a2" }}
                    >
                      {featured.category}
                    </span>
                    <h2
                      className="font-bold tracking-tight leading-snug mb-4 text-balance group-hover:text-[#0074a2] transition-colors duration-200"
                      style={{ color: "#002e40", fontSize: "clamp(1.35rem, 2vw, 1.8rem)" }}
                    >
                      {featured.title}
                    </h2>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "#4a6272" }}
                    >
                      {featured.excerpt}
                    </p>
                  </div>

                  {/* Author row */}
                  <div
                    className="flex items-center gap-3 mt-8 pt-6"
                    style={{ borderTop: "1px solid #e8f0f5" }}
                  >
                    <AuthorAvatar name={featured.author} size={9} />
                    <div>
                      <p className="text-sm font-semibold" style={{ color: "#002e40" }}>
                        {featured.author}
                      </p>
                      <p className="text-xs" style={{ color: "#94a3b8" }}>
                        {featured.dateDisplay} · {featured.readingTime}
                      </p>
                    </div>
                    <span
                      className="ml-auto text-xs font-semibold flex items-center gap-1.5 group-hover:gap-2.5 transition-all"
                      style={{ color: "#0074a2" }}
                    >
                      Lesen
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* All posts grid */}
        <section style={{ backgroundColor: "#ffffff" }} className="py-14 pb-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
            <h2
              className="font-bold mb-10"
              style={{ color: "#002e40", fontSize: "1.35rem" }}
            >
              Alle Artikel
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {rest.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                  style={{
                    backgroundColor: "#ffffff",
                    boxShadow: "0 2px 14px rgba(0,46,64,0.06)",
                    border: "1px solid #e8f0f5",
                  }}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden" style={{ height: 210 }}>
                    <Image
                      src={post.image}
                      alt={post.imageAlt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>

                  {/* Body */}
                  <div className="flex flex-col flex-1 p-6">
                    <span
                      className="inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold mb-3 w-fit"
                      style={{ backgroundColor: "#e8f4fa", color: "#0074a2" }}
                    >
                      {post.category}
                    </span>
                    <h3
                      className="font-bold leading-snug mb-2 text-balance group-hover:text-[#0074a2] transition-colors"
                      style={{ color: "#002e40", fontSize: "0.975rem" }}
                    >
                      {post.title}
                    </h3>
                    <p
                      className="text-xs leading-relaxed flex-1 mb-5 line-clamp-2"
                      style={{ color: "#64849a" }}
                    >
                      {post.excerpt}
                    </p>

                    {/* Author + meta */}
                    <div
                      className="flex items-center gap-2.5 pt-4"
                      style={{ borderTop: "1px solid #e8f0f5" }}
                    >
                      <AuthorAvatar name={post.author} size={7} />
                      <div className="flex-1 min-w-0">
                        <p
                          className="text-xs font-semibold truncate"
                          style={{ color: "#002e40" }}
                        >
                          {post.author}
                        </p>
                        <p className="text-xs" style={{ color: "#94a3b8" }}>
                          {post.dateDisplay} · {post.readingTime}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ backgroundColor: "#002e40" }} className="py-16">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <p
              className="text-xs font-semibold uppercase tracking-[0.2em] mb-4"
              style={{ color: "#4db8d8" }}
            >
              Termin buchen
            </p>
            <h2
              className="font-bold tracking-tight mb-4 text-balance"
              style={{ color: "#ffffff", fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}
            >
              Bereit für den nächsten Werkstattbesuch?
            </h2>
            <p
              className="text-sm leading-relaxed mb-8"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              Jetzt online Termin buchen oder anrufen – wir sind Mo–Fr 08:00–18:00 Uhr für Sie da.
            </p>
            <Link
              href="/terminbuchung"
              className="inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all hover:brightness-110"
              style={{ backgroundColor: "#0074a2" }}
            >
              Termin online buchen
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </section>
      </main>
      <AutoklinikFooter />
    </>
  );
}
