import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AutoklinikNavbar } from "@/components/autoklinik-navbar";
import { AutoklinikFooter } from "@/components/autoklinik-footer";
import { blogPosts } from "@/lib/blog-data";

export const metadata: Metadata = {
  title: "Ratgeber & Blog | Autoklinik Reutlingen",
  description: "Tipps, Ratgeber und aktuelle Themen rund ums Auto: TÜV, Ölwechsel, Klimaanlage, Reifen und mehr – von den Experten der Autoklinik Reutlingen.",
  openGraph: {
    title: "Ratgeber & Blog | Autoklinik Reutlingen",
    description: "Tipps, Ratgeber und aktuelle Themen rund ums Auto von den Experten der Autoklinik Reutlingen.",
    url: "https://autoklinik-reutlingen.de/blog",
    type: "website",
  },
  alternates: { canonical: "https://autoklinik-reutlingen.de/blog" },
};

const categories = Array.from(new Set(blogPosts.map((p) => p.category)));

export default function BlogPage() {
  const featured = blogPosts[0];
  const rest = blogPosts.slice(1);

  return (
    <>
      <AutoklinikNavbar />
      <main>
        {/* Hero */}
        <section style={{ backgroundColor: "#002e40" }} className="pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#4db8d8" }}>
              Ratgeber & Blog
            </p>
            <h1 className="font-bold tracking-tight text-balance mb-6" style={{ color: "#ffffff", fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)" }}>
              Alles rund ums Auto –<br />erklärt von Experten
            </h1>
            <p className="text-lg leading-relaxed max-w-2xl" style={{ color: "rgba(255,255,255,0.7)" }}>
              Praxisnahe Ratgeber zu TÜV, Wartung, Reifen, Klimaanlage und mehr. Direkt aus der Werkstatt – verständlich erklärt.
            </p>
          </div>
        </section>

        {/* Featured post */}
        <section style={{ backgroundColor: "#f5f9fc" }} className="py-16">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
            <Link href={`/blog/${featured.slug}`} className="group block">
              <div className="grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden" style={{ backgroundColor: "#ffffff", boxShadow: "0 4px 24px rgba(0,46,64,0.08)" }}>
                <div className="relative" style={{ minHeight: 360 }}>
                  <Image
                    src={featured.image}
                    alt={featured.imageAlt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </div>
                <div className="flex flex-col justify-center p-10 lg:p-14">
                  <span className="inline-block rounded-full px-3 py-1 text-xs font-semibold mb-5 w-fit" style={{ backgroundColor: "#e8f4fa", color: "#0074a2" }}>
                    {featured.category}
                  </span>
                  <h2 className="font-bold tracking-tight leading-snug mb-4 text-balance group-hover:text-[#0074a2] transition-colors" style={{ color: "#002e40", fontSize: "clamp(1.4rem, 2.2vw, 1.9rem)" }}>
                    {featured.title}
                  </h2>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: "#4a6272" }}>
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: "#0074a2" }}>
                      IT
                    </div>
                    <div>
                      <p className="text-xs font-semibold" style={{ color: "#002e40" }}>{featured.author}</p>
                      <p className="text-xs" style={{ color: "#94a3b8" }}>{featured.dateDisplay} · {featured.readingTime}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* All posts grid */}
        <section style={{ backgroundColor: "#ffffff" }} className="py-16 pb-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
            <h2 className="font-bold mb-10" style={{ color: "#002e40", fontSize: "1.4rem" }}>Alle Artikel</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {rest.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex flex-col rounded-2xl overflow-hidden transition-shadow hover:shadow-lg" style={{ backgroundColor: "#ffffff", boxShadow: "0 2px 12px rgba(0,46,64,0.06)", border: "1px solid #e8f0f5" }}>
                  <div className="relative overflow-hidden" style={{ height: 220 }}>
                    <Image
                      src={post.image}
                      alt={post.imageAlt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="flex flex-col flex-1 p-6">
                    <span className="inline-block rounded-full px-3 py-1 text-xs font-semibold mb-3 w-fit" style={{ backgroundColor: "#e8f4fa", color: "#0074a2" }}>
                      {post.category}
                    </span>
                    <h3 className="font-bold leading-snug mb-3 text-balance group-hover:text-[#0074a2] transition-colors" style={{ color: "#002e40", fontSize: "1rem" }}>
                      {post.title}
                    </h3>
                    <p className="text-sm leading-relaxed flex-1 mb-4 line-clamp-2" style={{ color: "#4a6272" }}>
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-4" style={{ borderTop: "1px solid #e8f0f5" }}>
                      <p className="text-xs" style={{ color: "#94a3b8" }}>{post.dateDisplay}</p>
                      <p className="text-xs font-medium" style={{ color: "#0074a2" }}>{post.readingTime}</p>
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
            <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#4db8d8" }}>Termin buchen</p>
            <h2 className="font-bold tracking-tight mb-4 text-balance" style={{ color: "#ffffff", fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}>
              Bereit für den nächsten Werkstattbesuch?
            </h2>
            <p className="text-sm leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.65)" }}>
              Jetzt online Termin buchen oder anrufen – wir sind Mo–Fr 08:00–18:00 Uhr für Sie da.
            </p>
            <Link
              href="/terminbuchung"
              className="inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all hover:brightness-110"
              style={{ backgroundColor: "#0074a2" }}
            >
              Termin online buchen
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
          </div>
        </section>
      </main>
      <AutoklinikFooter />
    </>
  );
}
