import type { Metadata } from "next";
import { VehicleValuationWizard } from "@/components/autoankauf/vehicle-purchase-form";
import { SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Dein Auto anbieten – kostenlose Ankaufanfrage",
  description: "Schritt für Schritt zur unverbindlichen Fahrzeugbewertung bei der Autoklinik Reutlingen. Einfach Fahrzeugdaten angeben und persönlich beraten lassen.",
  alternates: { canonical: `${SITE_URL}/autoankauf-reutlingen/anfrage` },
  robots: { index: false, follow: true },
};
export default function VehiclePurchaseRequestPage() {
  return <VehicleValuationWizard />;
}
