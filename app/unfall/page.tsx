import { getBodyContent, getExtraHeadContent } from "../lib/patchHtml";
import { HeadInjector } from "@/components/head-injector";
import { WebflowPage } from "@/components/webflow-page";

export const metadata = {
  title: "Unfallservice | Autoklinik Reutlingen",
  description:
    "Unfallgutachten & Reparatur an einem Ort. Unabhängiger Gutachter im Haus, kostenlos bei Fremdverschulden.",
};

export default function UnfallPage() {
  const bodyContent = getBodyContent("unfall.html");
  const headContent = getExtraHeadContent("unfall.html");
  return (
    <>
      <HeadInjector headHtml={headContent} />
      <WebflowPage html={bodyContent} />
    </>
  );
}
