import type { Metadata } from "next";
import { SITE } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Autoaufbereitung: Was wird gemacht? | Autoklinik Reutlingen",
  description: "Was gehört zu einer professionellen Autoaufbereitung? Unterschiede zwischen Wäsche, Innenraumreinigung, Außenpflege und Versiegelung erklärt.",
  alternates: { canonical: `${SITE.url}/ratgeber/autoaufbereitung-was-wird-gemacht` },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
