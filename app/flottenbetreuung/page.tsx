import { readAndPatchHtml } from "../lib/patchHtml";

export const metadata = {
  title: "Flottenbetreuung | Autoklinik Reutlingen",
  description:
    "Professionelle Flottenbetreuung für Handwerk, Pflegedienste & Kurierdienste. Meisterbetrieb mit fairen Preisen.",
};

export default function FottenbetreuungPage() {
  const html = readAndPatchHtml("flottenbetreuung.html");
  return (
    <html
      dangerouslySetInnerHTML={{ __html: html.replace(/^<!DOCTYPE html>/, "") }}
    />
  );
}
