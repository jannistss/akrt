/**
 * Structured Data (Schema.org JSON-LD)
 * All schemas for Autoklinik Reutlingen.
 * Import and render in page.tsx / layout.tsx as needed.
 */

const SITE_URL = "https://autoklinik-reutlingen.de";

// ── Shared Business Info ──────────────────────────────────────────────────────

export const BUSINESS = {
  name: "Autoklinik Reutlingen",
  legalName: "Autoklinik Reutlingen GmbH",
  url: SITE_URL,
  logo: `${SITE_URL}/assets/images/6937e76d5753525e801ff711_logo-autoklinik2.png`,
  image: `${SITE_URL}/og-image.jpg`,
  telephone: "+4907121988666",
  email: "info@autoklinik-reutlingen.de",
  priceRange: "€€",
  address: {
    streetAddress: "Haldenhaustraße 3",
    addressLocality: "Reutlingen",
    postalCode: "72770",
    addressCountry: "DE",
    addressRegion: "Baden-Württemberg",
  },
  geo: { latitude: 48.481, longitude: 9.204 },
  googleMapsUrl: "https://maps.google.com/?cid=autoklinik-reutlingen",
  openingHours: [
    "Mo 08:00-18:00",
    "Tu 08:00-18:00",
    "We 08:00-18:00",
    "Th 08:00-18:00",
    "Fr 08:00-17:00",
  ],
  sameAs: [
    "https://www.google.com/maps/place/Autoklinik+Reutlingen",
    "https://www.instagram.com/autoklinik.reutlingen",
  ],
} as const;

// ── LocalBusiness + AutoRepair ────────────────────────────────────────────────

export function LocalBusinessSchema({
  reviewCount = 37,
  ratingValue = 5.0,
}: {
  reviewCount?: number;
  ratingValue?: number;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "AutoRepair"],
    "@id": `${SITE_URL}/#localbusiness`,
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    url: BUSINESS.url,
    logo: {
      "@type": "ImageObject",
      url: BUSINESS.logo,
      width: 260,
      height: 80,
    },
    image: BUSINESS.image,
    telephone: BUSINESS.telephone,
    email: BUSINESS.email,
    priceRange: BUSINESS.priceRange,
    address: {
      "@type": "PostalAddress",
      ...BUSINESS.address,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS.geo.latitude,
      longitude: BUSINESS.geo.longitude,
    },
    hasMap: BUSINESS.googleMapsUrl,
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"], opens: "08:00", closes: "18:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Friday"], opens: "08:00", closes: "17:00" },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: ratingValue.toString(),
      reviewCount: reviewCount.toString(),
      bestRating: "5",
      worstRating: "1",
    },
    sameAs: BUSINESS.sameAs,
    currenciesAccepted: "EUR",
    paymentAccepted: "Cash, Credit Card, Debit Card, Invoice",
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: { "@type": "GeoCoordinates", latitude: BUSINESS.geo.latitude, longitude: BUSINESS.geo.longitude },
      geoRadius: "30000",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ── Organization ──────────────────────────────────────────────────────────────

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: BUSINESS.name,
    url: BUSINESS.url,
    logo: BUSINESS.logo,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: BUSINESS.telephone,
        contactType: "customer service",
        availableLanguage: ["German"],
        areaServed: "DE",
      },
      {
        "@type": "ContactPoint",
        telephone: BUSINESS.telephone,
        contactType: "reservations",
        availableLanguage: ["German"],
        areaServed: "DE",
      },
    ],
    sameAs: BUSINESS.sameAs,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ── WebSite with SearchAction ─────────────────────────────────────────────────

export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: BUSINESS.name,
    description: "Meisterwerkstatt in Reutlingen – Reparatur, Inspektion, TÜV und Unfallreparatur.",
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "de-DE",
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/?s={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ── FAQ ───────────────────────────────────────────────────────────────────────

export type FaqItem = { question: string; answer: string };

export function FaqSchema({ items }: { items: FaqItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ── Review ────────────────────────────────────────────────────────────────────

export type ReviewItem = {
  author: string;
  datePublished: string;
  reviewBody: string;
  ratingValue: number;
};

export function ReviewSchema({ reviews }: { reviews: ReviewItem[] }) {
  const schema = reviews.map((r) => ({
    "@context": "https://schema.org",
    "@type": "Review",
    author: { "@type": "Person", name: r.author },
    datePublished: r.datePublished,
    reviewBody: r.reviewBody,
    reviewRating: { "@type": "Rating", ratingValue: r.ratingValue, bestRating: 5, worstRating: 1 },
    itemReviewed: {
      "@type": "AutoRepair",
      name: BUSINESS.name,
      address: { "@type": "PostalAddress", ...BUSINESS.address },
    },
  }));

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ── Breadcrumb ────────────────────────────────────────────────────────────────

export type BreadcrumbItem = { name: string; url: string };

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ── JobPosting ────────────────────────────────────────────────────────────────

export function JobPostingSchema({
  title,
  description,
  datePosted,
  validThrough,
  employmentType = "FULL_TIME",
  baseSalary,
}: {
  title: string;
  description: string;
  datePosted: string;
  validThrough: string;
  employmentType?: string;
  baseSalary?: { min: number; max: number; currency?: string };
}) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title,
    description,
    datePosted,
    validThrough,
    employmentType,
    hiringOrganization: {
      "@type": "Organization",
      name: BUSINESS.name,
      sameAs: BUSINESS.url,
      logo: BUSINESS.logo,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        ...BUSINESS.address,
      },
    },
    applicantLocationRequirements: {
      "@type": "Country",
      name: "DE",
    },
    qualifications: "Abgeschlossene Ausbildung als Kfz-Mechatroniker oder Kfz-Mechaniker",
    responsibilities:
      "Diagnose, Wartung und Reparatur von Fahrzeugen aller Marken und Baujahre. Inspektion, Bremsen, Klima, Reifen und Unfallreparatur.",
    experienceRequirements: "Berufserfahrung als Kfz-Mechatroniker oder Kfz-Mechaniker",
    educationRequirements: "Abgeschlossene Berufsausbildung als Kfz-Mechatroniker",
    skills:
      "Kfz-Diagnose, Fahrzeugreparatur, Fahrzeugwartung, Bremsservice, Klimaservice, Reifenmontage",
    industry: "Kfz-Handwerk",
    occupationalCategory: "49-3023.00",
    directApply: true,
    jobLocationType: "TELECOMMUTE_NONE",
  };

  if (baseSalary) {
    schema.baseSalary = {
      "@type": "MonetaryAmount",
      currency: baseSalary.currency ?? "EUR",
      value: {
        "@type": "QuantitativeValue",
        minValue: baseSalary.min,
        maxValue: baseSalary.max,
        unitText: "MONTH",
      },
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
