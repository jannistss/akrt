import type { Metadata } from "next";
import { SITE } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Autoaufbereitung Reutlingen | Innenraumreinigung",
  description: "Professionelle Innenraum-Aufbereitung in Reutlingen mit transparenten Preisen und optionaler Waschanlagenfahrt für 15 €.",
  alternates: { canonical: `${SITE.url}/autoaufbereitung-reutlingen` },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
