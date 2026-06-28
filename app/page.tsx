import { getBodyContent, getExtraHeadContent } from "./lib/patchHtml";
import { HeadInjector } from "@/components/head-injector";
import { WebflowPage } from "@/components/webflow-page";

export default function HomePage() {
  const bodyContent = getBodyContent("index.html");
  const headContent = getExtraHeadContent("index.html");

  return (
    <>
      <HeadInjector headHtml={headContent} />
      <WebflowPage html={bodyContent} />
    </>
  );
}
