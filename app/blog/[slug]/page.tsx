import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { AutoklinikNavbar } from "@/components/autoklinik-navbar";
import { AutoklinikFooter } from "@/components/autoklinik-footer";
import { blogPosts, getBlogPost, getRelatedPosts } from "@/lib/blog-data";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Autoklinik Reutlingen`,
    description: post.excerpt,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://autoklinik-reutlingen.de/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: `https://autoklinik-reutlingen.de${post.image}`, alt: post.imageAlt }],
    },
    alternates: { canonical: `https://autoklinik-reutlingen.de/blog/${post.slug}` },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug, 3);

  // Article structured data
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: `https://autoklinik-reutlingen.de${post.image}`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author,
      jobTitle: post.authorRole,
    },
    publisher: {
      "@type": "Organization",
      name: "Autoklinik Reutlingen",
      url: "https://autoklinik-reutlingen.de",
      logo: {
        "@type": "ImageObject",
        url: "https://autoklinik-reutlingen.de/assets/images/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://autoklinik-reutlingen.de/blog/${post.slug}`,
    },
  };

  // FAQ structured data
  const faqJsonLd = post.faqs && post.faqs.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.a,
          },
        })),
      }
    : null;

  // BreadcrumbList
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startseite", item: "https://autoklinik-reutlingen.de" },
      { "@type": "ListItem", position: 2, name: "Ratgeber", item: "https://autoklinik-reutlingen.de/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: `https://autoklinik-reutlingen.de/blog/${post.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <AutoklinikNavbar />
      <main>
        {/* Hero */}
        <section style={{ backgroundColor: "#002e40" }} className="pt-32 pb-0">
          <div className="max-w-4xl mx-auto px-6 sm:px-10 pb-10">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs mb-8" style={{ color: "rgba(255,255,255,0.45)" }}>
              <Link href="/" className="hover:text-white transition-colors">Startseite</Link>
              <span aria-hidden="true">/</span>
              <Link href="/blog" className="hover:text-white transition-colors">Ratgeber</Link>
              <span aria-hidden="true">/</span>
              <span style={{ color: "rgba(255,255,255,0.7)" }}>{post.category}</span>
            </nav>

            <span className="inline-block rounded-full px-3 py-1 text-xs font-semibold mb-5" style={{ backgroundColor: "rgba(0,116,162,0.35)", color: "#7dd3fc" }}>
              {post.category}
            </span>
            <h1 className="font-bold tracking-tight text-balance mb-6 leading-[1.1]" style={{ color: "#ffffff", fontSize: "clamp(1.9rem, 4vw, 3rem)" }}>
              {post.title}
            </h1>
            <p className="text-base leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.7)", maxWidth: "680px" }}>
              {post.excerpt}
            </p>

            {/* Author + meta */}
            <div className="flex items-center gap-4 pb-10">
              <div className="h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0" style={{ backgroundColor: "#0074a2" }}>
                IT
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: "#ffffff" }}>{post.author}</p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{post.authorRole} · {post.dateDisplay} · {post.readingTime}</p>
              </div>
            </div>
          </div>

          {/* Hero image */}
          <div className="max-w-5xl mx-auto px-6 sm:px-10">
            <div className="relative rounded-t-2xl overflow-hidden" style={{ height: "clamp(260px, 45vw, 480px)" }}>
              <Image
                src={post.image}
                alt={post.imageAlt}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 960px"
              />
            </div>
          </div>
        </section>

        {/* Content */}
        <section style={{ backgroundColor: "#ffffff" }} className="py-16">
          <div className="max-w-4xl mx-auto px-6 sm:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-16">
              {/* Article body */}
              <article
                className="prose-article"
                style={{ color: "#1e3a4a", lineHeight: 1.75 }}
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Sidebar */}
              <aside className="lg:sticky lg:top-28 self-start space-y-6">
                {/* CTA card */}
                <div className="rounded-2xl p-6" style={{ backgroundColor: "#002e40" }}>
                  <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#4db8d8" }}>Termin buchen</p>
                  <p className="text-sm font-semibold mb-2 text-white">Jetzt Werkstatttermin vereinbaren</p>
                  <p className="text-xs leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.6)" }}>
                    Online oder telefonisch – schnell und unkompliziert.
                  </p>
                  <Link
                    href="/terminbuchung"
                    className="block text-center rounded-xl py-3 text-sm font-semibold text-white transition-all hover:brightness-110"
                    style={{ backgroundColor: "#0074a2" }}
                  >
                    Termin online buchen
                  </Link>
                  <a
                    href="tel:071219886660"
                    className="block text-center rounded-xl py-3 text-sm font-medium mt-2 transition-all hover:bg-white/10"
                    style={{ color: "rgba(255,255,255,0.75)", border: "1px solid rgba(255,255,255,0.15)" }}
                  >
                    07121 988 6660
                  </a>
                </div>

                {/* Tags */}
                <div className="rounded-2xl p-5" style={{ backgroundColor: "#f5f9fc" }}>
                  <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#4a6272" }}>Themen</p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="rounded-full px-3 py-1 text-xs font-medium" style={{ backgroundColor: "#e8f4fa", color: "#0074a2" }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Related posts */}
                {related.length > 0 && (
                  <div className="rounded-2xl p-5" style={{ backgroundColor: "#f5f9fc" }}>
                    <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#4a6272" }}>Weitere Artikel</p>
                    <div className="space-y-3">
                      {related.map((r) => (
                        <Link key={r.slug} href={`/blog/${r.slug}`} className="flex gap-3 group items-start">
                          <div className="relative rounded-lg overflow-hidden shrink-0" style={{ width: 52, height: 52 }}>
                            <Image src={r.image} alt={r.imageAlt} fill className="object-cover" sizes="52px" />
                          </div>
                          <div>
                            <p className="text-xs font-semibold leading-snug group-hover:text-[#0074a2] transition-colors" style={{ color: "#002e40" }}>
                              {r.title}
                            </p>
                            <p className="text-xs mt-1" style={{ color: "#94a3b8" }}>{r.readingTime}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </aside>
            </div>
          </div>
        </section>

        {/* FAQ section */}
        {post.faqs && post.faqs.length > 0 && (
          <section style={{ backgroundColor: "#f5f9fc" }} className="py-16">
            <div className="max-w-3xl mx-auto px-6 sm:px-10">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#0074a2" }}>FAQ</p>
              <h2 className="font-bold tracking-tight mb-10" style={{ color: "#002e40", fontSize: "clamp(1.6rem, 2.5vw, 2rem)" }}>
                Häufige Fragen
              </h2>
              <div style={{ borderTop: "1px solid #d5e8f0" }}>
                {post.faqs.map((faq) => (
                  <details key={faq.q} className="group py-5" style={{ borderBottom: "1px solid #d5e8f0" }}>
                    <summary className="flex items-center justify-between cursor-pointer list-none gap-4">
                      <span className="text-base font-semibold" style={{ color: "#002e40" }}>{faq.q}</span>
                      <span className="shrink-0 transition-transform group-open:rotate-45" style={{ color: "#0074a2" }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                      </span>
                    </summary>
                    <p className="mt-4 text-sm leading-relaxed" style={{ color: "#4a6272" }}>{faq.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* More articles */}
        <section style={{ backgroundColor: "#ffffff" }} className="py-16 pb-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
            <div className="flex items-center justify-between mb-10">
              <h2 className="font-bold" style={{ color: "#002e40", fontSize: "1.3rem" }}>Weitere Ratgeber</h2>
              <Link href="/blog" className="text-sm font-medium hover:underline" style={{ color: "#0074a2" }}>
                Alle Artikel
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link key={r.slug} href={`/blog/${r.slug}`} className="group flex flex-col rounded-2xl overflow-hidden transition-shadow hover:shadow-md" style={{ border: "1px solid #e8f0f5" }}>
                  <div className="relative overflow-hidden" style={{ height: 180 }}>
                    <Image src={r.image} alt={r.imageAlt} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 100vw, 33vw" />
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-medium mb-2 block" style={{ color: "#0074a2" }}>{r.category}</span>
                    <h3 className="text-sm font-bold leading-snug group-hover:text-[#0074a2] transition-colors" style={{ color: "#002e40" }}>
                      {r.title}
                    </h3>
                    <p className="text-xs mt-2" style={{ color: "#94a3b8" }}>{r.dateDisplay} · {r.readingTime}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <AutoklinikFooter />

      <style>{`
        .prose-article h2 { font-size: 1.35rem; font-weight: 700; color: #002e40; margin: 2.2rem 0 1rem; line-height: 1.3; }
        .prose-article h3 { font-size: 1.1rem; font-weight: 700; color: #002e40; margin: 1.8rem 0 0.75rem; }
        .prose-article p { margin: 0 0 1.2rem; font-size: 0.975rem; color: #2a4a5a; }
        .prose-article ul, .prose-article ol { padding-left: 1.4rem; margin: 0 0 1.4rem; }
        .prose-article li { margin: 0.5rem 0; font-size: 0.975rem; color: #2a4a5a; }
        .prose-article strong { color: #002e40; font-weight: 700; }
        .prose-article a { color: #0074a2; text-decoration: underline; }
      `}</style>
    </>
  );
}
