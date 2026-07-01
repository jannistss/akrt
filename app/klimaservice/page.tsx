import { getBodyContent, getExtraHeadContent } from "../lib/patchHtml";
import { HeadInjector } from "@/components/head-injector";
import { WebflowPage } from "@/components/webflow-page";

export const metadata = {
  title: "Klimaservice in Reutlingen | Autoklinik Reutlingen",
  description:
    "Klimaservice in Reutlingen: Klima-Check, Wartung, Desinfektion und Kältemittel-Service für dein Auto.",
};

export default function KlimaservicePage() {
  const bodyContent = getBodyContent("klimaservice.html");
  const headContent = getExtraHeadContent("klimaservice.html");
  return (
    <>
      <HeadInjector headHtml={headContent} />
      <WebflowPage html={bodyContent} />
    </>
  );
}
