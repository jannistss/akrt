import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hagelschadenzentrum Reutlingen | Gutachten & Reparatur",
  description:
    "Hagelschaden am Auto? Das Hagelschadenzentrum der Autoklinik Reutlingen hilft bei Gutachten, Reparatur und Windschutzscheibentausch. Jetzt per Telefon oder WhatsApp Kontakt aufnehmen.",
  alternates: {
    canonical: "/hagelschaden",
  },
  openGraph: {
    title: "Hagelschadenzentrum Reutlingen",
    description:
      "Gutachten, Hagelschadenreparatur und Autoglas-Service aus einer Hand. Jetzt schnell Kontakt aufnehmen.",
    url: "https://autoklinik-reutlingen.de/hagelschaden",
    siteName: "Autoklinik Reutlingen",
    locale: "de_DE",
    type: "website",
  },
};

export default function HagelschadenzentrumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
