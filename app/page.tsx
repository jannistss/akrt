import { readAndPatchHtml } from "./lib/patchHtml";

export default function HomePage() {
  const html = readAndPatchHtml("index.html");
  return (
    <html
      dangerouslySetInnerHTML={{ __html: html.replace(/^<!DOCTYPE html>/, "") }}
    />
  );
}
