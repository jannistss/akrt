import { AutoklinikNavbarClient } from "@/components/autoklinik-navbar-client";
import type { NavItem } from "@/components/ui/resizable-navbar";

const navItems: NavItem[] = [
  { name: "Startseite", link: "/" },
  {
    name: "Leistungen",
    link: "#leistungen",
    children: [
      { name: "Inspektion & Wartung", link: "/inspektion" },
      { name: "Ölwechsel", link: "/oelwechsel-reutlingen" },
      { name: "Bremsenservice", link: "/bremsen-reutlingen" },
      { name: "Motordiagnose", link: "/motordiagnose-reutlingen" },
      { name: "Getriebespülung", link: "/getriebespuelung-reutlingen" },
      { name: "Achsvermessung", link: "/achsvermessung-reutlingen" },
      { name: "Autoaufbereitung", link: "/autoaufbereitung-reutlingen" },
      { name: "TÜV & AU", link: "/tuev-au" },
      { name: "Reifenservice", link: "/reifenservice" },
      { name: "Glasservice", link: "/glasservice" },
      { name: "Klimaservice", link: "/klimaservice" },
      { name: "Unfallservice", link: "/unfall" },
      { name: "Flottenbetreuung", link: "/flottenbetreuung" },
      { name: "Hagelschadenzentrum", link: "/hagelschaden" },
    ],
  },
  { name: "Autoankauf", link: "/autoankauf-reutlingen" },
  { name: "Flotte", link: "/flottenbetreuung" },
  { name: "Kfz-Gutachter", link: "/kfz-gutachter" },
  { name: "Ratgeber", link: "/blog" },
  { name: "Karriere", link: "/karriere" },
  { name: "Kontakt", link: "#kontakt" },
];

export function AutoklinikNavbar() {
  return <AutoklinikNavbarClient navItems={navItems} />;
}
