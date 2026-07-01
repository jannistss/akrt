import { getBodyContent, getExtraHeadContent } from "../lib/patchHtml";
import { HeadInjector } from "@/components/head-injector";
import { WebflowPage } from "@/components/webflow-page";

export const metadata = {
  title: "Datenschutz | Autoklinik Reutlingen",
  description: "Datenschutzerklärung der Autoklinik Reutlingen.",
};

export default function DatenschutzPage() {
  const bodyContent = getBodyContent("datenschutz.html");
  const headContent = getExtraHeadContent("datenschutz.html");
  return (
    <>
      <HeadInjector headHtml={headContent} />
      <WebflowPage html={bodyContent} />
    </>
  );
}
