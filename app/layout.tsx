import type { Metadata, Viewport } from "next";
import "./globals.css";
import { DM_Sans } from "next/font/google";
import { ChatWidget } from "@/components/chat-widget";
import { AnalyticsPlaceholders } from "@/components/analytics-placeholders";
import { Analytics } from "@vercel/analytics/next";

const dmSans = DM_Sans({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-dm-sans",
  display: "swap",
});

const SITE_URL = "https://autoklinik-reutlingen.de";
const SITE_NAME = "Autoklinik Reutlingen";
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Autoklinik Reutlingen | Meisterwerkstatt für Reparatur, Inspektion & TÜV",
    template: "%s | Autoklinik Reutlingen",
  },
  description:
    "Autoklinik Reutlingen – Reparatur, Inspektion, TÜV, Unfallinstandsetzung und Wartung aller Marken. Faire Preise, moderne Diagnosetechnik und schnelle Termine.",
  keywords: [
    "Werkstatt Reutlingen",
    "KFZ Reutlingen",
    "TÜV Reutlingen",
    "Inspektion Reutlingen",
    "Reparatur Reutlingen",
    "Ölwechsel Reutlingen",
    "Reifenwechsel Reutlingen",
    "Unfallreparatur Reutlingen",
    "Kfz Meisterwerkstatt",
    "Autoklinik Reutlingen",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Autoklinik Reutlingen | Meisterwerkstatt für Reparatur, Inspektion & TÜV",
    description:
      "Autoklinik Reutlingen – Reparatur, Inspektion, TÜV, Unfallinstandsetzung und Wartung aller Marken. Faire Preise, moderne Diagnosetechnik.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Autoklinik Reutlingen – Meisterwerkstatt" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Autoklinik Reutlingen | Meisterwerkstatt für Reparatur, Inspektion & TÜV",
    description:
      "Werkstatt in Reutlingen: Inspektion, Reparatur, TÜV & Unfall. Faire Preise, kurze Wartezeiten.",
    images: [OG_IMAGE],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    other: [
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#0074a2" },
    ],
  },
  manifest: "/manifest.json",
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? undefined,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0074a2" },
    { media: "(prefers-color-scheme: dark)", color: "#001826" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${dmSans.variable} bg-background`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://maps.googleapis.com" />
      </head>
      <body>
        <AnalyticsPlaceholders />
        {children}
        <ChatWidget />
        <Analytics />
      </body>
    </html>
  );
}
