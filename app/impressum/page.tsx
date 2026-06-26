import { readAndPatchHtml } from "../lib/patchHtml";

export const metadata = {
  title: "Impressum | Autoklinik Reutlingen",
  description: "Impressum der Autoklinik Reutlingen.",
};

export default function ImpressumPage() {
  const html = readAndPatchHtml("impressum.html");
  return (
    <html
      dangerouslySetInnerHTML={{ __html: html.replace(/^<!DOCTYPE html>/, "") }}
    />
  );
}
