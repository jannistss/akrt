import type { Metadata } from "next";
import { SITE } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Autoaufbereitung Reutlingen | Innenraum & Außenreinigung",
  description: "Professionelle Auto- und Fahrzeugaufbereitung in Reutlingen. Innenraumreinigung, Außenreinigung und Komplettaufbereitung mit transparenten Preisen.",
  alternates: { canonical: `${SITE.url}/autoaufbereitung-reutlingen` },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
