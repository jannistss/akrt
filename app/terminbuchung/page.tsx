import { readAndPatchHtml } from "../lib/patchHtml";

export const metadata = {
  title: "Terminbuchung | Autoklinik Reutlingen",
  description:
    "Buchen Sie jetzt Ihren Termin bei Autoklinik Reutlingen. Schnelle und unkomplizierte Online-Terminvereinbarung.",
};

export default function TerminbuchungPage() {
  const html = readAndPatchHtml("terminbuchung.html");
  return (
    <html
      dangerouslySetInnerHTML={{ __html: html.replace(/^<!DOCTYPE html>/, "") }}
    />
  );
}
