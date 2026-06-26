import { readAndPatchHtml } from "../lib/patchHtml";

export const metadata = {
  title: "Klimaservice in Reutlingen | Autoklinik Reutlingen",
  description:
    "Klimaservice in Reutlingen: Klima-Check, Wartung, Desinfektion und Kältemittel-Service für dein Auto.",
};

export default function KlimaservicePage() {
  const html = readAndPatchHtml("klimaservice.html");
  return (
    <html
      dangerouslySetInnerHTML={{ __html: html.replace(/^<!DOCTYPE html>/, "") }}
    />
  );
}
