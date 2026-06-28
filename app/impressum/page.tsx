import { getBodyContent, getExtraHeadContent } from "../lib/patchHtml";
import { HeadInjector } from "@/components/head-injector";
import { WebflowPage } from "@/components/webflow-page";

export const metadata = {
  title: "Impressum | Autoklinik Reutlingen",
  description: "Impressum der Autoklinik Reutlingen.",
};

export default function ImpressumPage() {
  const bodyContent = getBodyContent("impressum.html");
  const headContent = getExtraHeadContent("impressum.html");
  return (
    <>
      <HeadInjector headHtml={headContent} />
      <WebflowPage html={bodyContent} />
    </>
  );
}
