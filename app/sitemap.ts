import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog-data";

const SITE_URL = "https://autoklinik-reutlingen.de";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const blogEntries: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...blogPosts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.date).toISOString(),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ];

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    // Leistungsseiten
    {
      url: `${SITE_URL}/inspektion`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/reifenservice`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/tuev-au`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/unfall`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/glasservice`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/klimaservice`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/kfz-gutachter`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/flottenbetreuung`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    // Unternehmen
    {
      url: `${SITE_URL}/karriere`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/karriere/kfz-mechatroniker`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/terminbuchung`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    // Rechtliches
    {
      url: `${SITE_URL}/impressum`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${SITE_URL}/datenschutz`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    // Blog & Ratgeber
    ...blogEntries,
  ];
}
