import { getBodyContent, getExtraHeadContent } from "../lib/patchHtml";
import { HeadInjector } from "@/components/head-injector";
import { WebflowPage } from "@/components/webflow-page";

export const metadata = {
  title: "Flottenbetreuung | Autoklinik Reutlingen",
  description:
    "Professionelle Flottenbetreuung für Handwerk, Pflegedienste & Kurierdienste. Meisterbetrieb mit fairen Preisen.",
};

export default function FottenbetreuungPage() {
  const bodyContent = getBodyContent("flottenbetreuung.html");
  const headContent = getExtraHeadContent("flottenbetreuung.html");
  return (
    <>
      <HeadInjector headHtml={headContent} />
      <WebflowPage html={bodyContent} />
    </>
  );
}
