import { readAndPatchHtml } from "../lib/patchHtml";

export const metadata = {
  title: "Unfallservice | Autoklinik Reutlingen",
  description:
    "Unfallgutachten & Reparatur an einem Ort. Unabhängiger Gutachter im Haus, kostenlos bei Fremdverschulden.",
};

export default function UnfallPage() {
  const html = readAndPatchHtml("unfall.html");
  return (
    <html
      dangerouslySetInnerHTML={{ __html: html.replace(/^<!DOCTYPE html>/, "") }}
    />
  );
}
