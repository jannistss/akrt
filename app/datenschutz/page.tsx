import { readAndPatchHtml } from "../lib/patchHtml";

export const metadata = {
  title: "Datenschutz | Autoklinik Reutlingen",
  description:
    "Datenschutzerklärung der Autoklinik Reutlingen.",
};

export default function DatenschutzPage() {
  const html = readAndPatchHtml("datenschutz.html");
  return (
    <html
      dangerouslySetInnerHTML={{ __html: html.replace(/^<!DOCTYPE html>/, "") }}
    />
  );
}
