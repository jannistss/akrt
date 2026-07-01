import { getBodyContent, getExtraHeadContent } from "../lib/patchHtml";
import { HeadInjector } from "@/components/head-injector";
import { WebflowPage } from "@/components/webflow-page";

export const metadata = {
  title: "Terminbuchung | Autoklinik Reutlingen",
  description:
    "Buchen Sie jetzt Ihren Termin bei Autoklinik Reutlingen. Schnelle und unkomplizierte Online-Terminvereinbarung.",
};

export default function TerminbuchungPage() {
  const bodyContent = getBodyContent("terminbuchung.html");
  const headContent = getExtraHeadContent("terminbuchung.html");
  return (
    <>
      <HeadInjector headHtml={headContent} />
      <WebflowPage html={bodyContent} />
    </>
  );
}
