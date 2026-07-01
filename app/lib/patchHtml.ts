import fs from "fs";
import path from "path";

const SITE_ID = "6937ded41fbb0d4d0e15a31e";
const CDN_BASE = `https://cdn.prod.website-files.com/${SITE_ID}`;
const LOCAL_CDN_BASE = `../cdn.prod.website-files.com/${SITE_ID}`;
const GSAP_CDN = "https://cdn.prod.website-files.com/gsap/3.15.0";
const LOCAL_GSAP = "../cdn.prod.website-files.com/gsap/3.15.0";

// Map of original CDN filenames → local /assets paths (safe, no spaces/umlauts)
// Keys are the original filenames as they appear in the HTML (URL-decoded)
const IMAGE_MAP: Record<string, string> = {
  "6937ded51fbb0d4d0e15a3c8_Webflow Background.svg": "/assets/webflow-bg.svg",
  "6937e76d5753525e801ff711_logo autoklinik2.png": "/assets/images/6937e76d5753525e801ff711_logo-autoklinik2.png",
  "6937e0b4dab32eb0ce0c7f70_relume-460083.png": "/assets/images/6937e0b4dab32eb0ce0c7f70_relume-460083.png",
  "6937e715063be152c1cb3309_icon reperatur.png": "/assets/images/6937e715063be152c1cb3309_icon-reperatur.png",
  "6937e7151cc0063ec7b71870_Icon Smiley.png": "/assets/images/6937e7151cc0063ec7b71870_Icon-Smiley.png",
  "6937e71540070edab121f3aa_icon mercedes.png": "/assets/images/6937e71540070edab121f3aa_icon-mercedes.png",
  "6937e7158532daae3933f12c_icon bmw.png": "/assets/images/6937e7158532daae3933f12c_icon-bmw.png",
  "6937e7158bad018e0f304332_icon audi.png": "/assets/images/6937e7158bad018e0f304332_icon-audi.png",
  "6937e7159229bbc42b6c8632_icon tüv.png": "/assets/images/6937e7159229bbc42b6c8632_icon-tuev.png",
  "6937e715970dcf9d4e71dc89_icon mini.png": "/assets/images/6937e715970dcf9d4e71dc89_icon-mini.png",
  "6937e715ad67a7e8c6f8f320_icon hebebühne.png": "/assets/images/6937e715ad67a7e8c6f8f320_icon-hebebuehne.png",
  "6937e715ee8aa2907def19f0_Icon Checkmark.png": "/assets/images/6937e715ee8aa2907def19f0_Icon-Checkmark.png",
  "6937e715f0e031aca92d26f6_icon renault.png": "/assets/images/6937e715f0e031aca92d26f6_icon-renault.png",
  "6937e7163e052d298653ff55_reperatur mann -p-1080.png": "/assets/images/6937e7163e052d298653ff55_reperatur-mann--p-1080.png",
  "6937e7163e052d298653ff55_reperatur mann -p-1600.png": "/assets/images/6937e7163e052d298653ff55_reperatur-mann--p-1600.png",
  "6937e7163e052d298653ff55_reperatur mann -p-2000.png": "/assets/images/6937e7163e052d298653ff55_reperatur-mann--p-2000.png",
  "6937e7163e052d298653ff55_reperatur mann -p-500.png": "/assets/images/6937e7163e052d298653ff55_reperatur-mann--p-500.png",
  "6937e7163e052d298653ff55_reperatur mann -p-800.png": "/assets/images/6937e7163e052d298653ff55_reperatur-mann--p-800.png",
  "6937e7163e052d298653ff55_reperatur mann .png": "/assets/images/6937e7163e052d298653ff55_reperatur-mann-.png",
  "6937e7167a27ffa77e40aa08_Hero Image-p-1080.png": "/assets/images/6937e7167a27ffa77e40aa08_Hero-Image-p-1080.png",
  "6937e7167a27ffa77e40aa08_Hero Image-p-500.png": "/assets/images/6937e7167a27ffa77e40aa08_Hero-Image-p-500.png",
  "6937e7167a27ffa77e40aa08_Hero Image-p-800.png": "/assets/images/6937e7167a27ffa77e40aa08_Hero-Image-p-800.png",
  "6937e7167a27ffa77e40aa08_Hero Image.png": "/assets/images/6937e7167a27ffa77e40aa08_Hero-Image.png",
  "6937e7168920287b24bafc7c_icon reifen.png": "/assets/images/6937e7168920287b24bafc7c_icon-reifen.png",
  "6985c4ce9b76f043ec5d6390_faviauto.png": "/assets/images/6985c4ce9b76f043ec5d6390_faviauto.png",
  "6985c4d38cf52f31e3481ad8_webclipauto.png": "/assets/images/6985c4d38cf52f31e3481ad8_webclipauto.png",
  "698dccd20f3ec8ce449ef838_Icon Glas.png": "/assets/images/698dccd20f3ec8ce449ef838_Icon-Glas.png",
  "6a3d363154202915571e860a_Design ohne Titel (46)-p-1080.png": "/assets/images/6a3d363154202915571e860a_Design-ohne-Titel-46-p-1080.png",
  "6a3d363154202915571e860a_Design ohne Titel (46)-p-500.png": "/assets/images/6a3d363154202915571e860a_Design-ohne-Titel-46-p-500.png",
  "6a3d363154202915571e860a_Design ohne Titel (46)-p-800.png": "/assets/images/6a3d363154202915571e860a_Design-ohne-Titel-46-p-800.png",
  "6a3d363154202915571e860a_Design ohne Titel (46).png": "/assets/images/6a3d363154202915571e860a_Design-ohne-Titel-46.png",
};

const JS_MAP: Record<string, string> = {
  "webflow.schunk.56cc6380bad280e6.js": "/assets/js/webflow.schunk.56cc6380bad280e6.js",
  "webflow.schunk.58f76f2901951073.js": "/assets/js/webflow.schunk.58f76f2901951073.js",
  "webflow.schunk.9dfb96661114d3db.js": "/assets/js/webflow.schunk.9dfb96661114d3db.js",
  "webflow.schunk.a3140c51201be139.js": "/assets/js/webflow.schunk.a3140c51201be139.js",
  "webflow.schunk.dac51c455b7e76af.js": "/assets/js/webflow.schunk.dac51c455b7e76af.js",
  "webflow.3f52dc54.a5dcc66113103265.js": "/assets/js/webflow.3f52dc54.a5dcc66113103265.js",
  "webflow.a477aef1.960c15ea0ee51f3c.js": "/assets/js/webflow.a477aef1.960c15ea0ee51f3c.js",
  "webflow.a9ba356d.d790faab5eca85f2.js": "/assets/js/webflow.a9ba356d.d790faab5eca85f2.js",
  "webflow.b74344a1.ab4605a3efde22bd.js": "/assets/js/webflow.b74344a1.ab4605a3efde22bd.js",
};

// Page link rewrites: .html links → Next.js routes
function rewritePageLinks(html: string): string {
  return html
    .replace(/href="index\.html(#[^"]*)?"/g, (_, hash) => `href="/${hash || ""}"`)
    .replace(/href="klimaservice\.html"/g, `href="/klimaservice"`)
    .replace(/href="unfall\.html"/g, `href="/unfall"`)
    .replace(/href="flottenbetreuung\.html"/g, `href="/flottenbetreuung"`)
    .replace(/href="terminbuchung\.html"/g, `href="/terminbuchung"`)
    .replace(/href="datenschutz\.html"/g, `href="/datenschutz"`)
    .replace(/href="impressum\.html"/g, `href="/impressum"`);
}

// Rewrite local relative CDN paths to absolute /assets paths
function rewriteAssets(html: string): string {
  // CSS – rewrite path and strip the integrity/crossorigin so the local file loads
  html = html.replace(
    new RegExp(
      `<link href="\\.\\./cdn\\.prod\\.website-files\\.com/${SITE_ID}/css/autoklinik\\.webflow\\.shared\\.d092d1d49\\.css" rel="stylesheet" type="text/css"[^>]*>`,
      "g"
    ),
    `<link href="/assets/css/autoklinik.css" rel="stylesheet" type="text/css"/>`
  );

  // JS files – rewrite path and strip integrity/crossorigin attributes
  for (const [filename, localPath] of Object.entries(JS_MAP)) {
    const escapedFilename = filename.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    // Replace full <script> tag including integrity attr
    html = html.replace(
      new RegExp(
        `<script src="\\.\\./cdn\\.prod\\.website-files\\.com/${SITE_ID}/js/${escapedFilename}"[^>]*></script>`,
        "g"
      ),
      `<script src="${localPath}" type="text/javascript"></script>`
    );
    // Fallback: plain src replacement
    html = html.replace(
      new RegExp(`\\.\\./cdn\\.prod\\.website-files\\.com/${SITE_ID}/js/${escapedFilename}`, "g"),
      localPath
    );
  }

  // GSAP
  html = html.replace(
    /\.\.\/cdn\.prod\.website-files\.com\/gsap\/3\.15\.0\/gsap\.min\.js/g,
    "/assets/js/gsap.min.js"
  );
  html = html.replace(
    /\.\.\/cdn\.prod\.website-files\.com\/gsap\/3\.15\.0\/ScrollTrigger\.min\.js/g,
    "/assets/js/ScrollTrigger.min.js"
  );

  // jQuery (hosted on Webflow's Cloudfront CDN)
  html = html.replace(
    /https:\/\/d3e54v103j8qbb\.cloudfront\.net\/js\/jquery-3\.5\.1\.min\.dc5e7f18c8\.js[^"]*/g,
    "/assets/js/jquery-3.5.1.min.js"
  );

  // Images - replace URL-encoded paths from local CDN mirror
  // Pattern: ../cdn.prod.website-files.com/SITE_ID/FILENAME (may be URL-encoded)
  for (const [filename, localPath] of Object.entries(IMAGE_MAP)) {
    const encoded = encodeURIComponent(filename);
    // Replace both encoded and plain versions in local relative paths
    html = html.replace(
      new RegExp(`\\.\\./cdn\\.prod\\.website-files\\.com/${SITE_ID}/${encoded.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`, "g"),
      localPath
    );
    html = html.replace(
      new RegExp(`\\.\\./cdn\\.prod\\.website-files\\.com/${SITE_ID}/${filename.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`, "g"),
      localPath
    );
    // Also rewrite absolute CDN URLs for images we have locally
    html = html.replace(
      new RegExp(`https://cdn\\.prod\\.website-files\\.com/${SITE_ID}/${encoded.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`, "g"),
      localPath
    );
    html = html.replace(
      new RegExp(`https://cdn\\.prod\\.website-files\\.com/${SITE_ID}/${filename.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`, "g"),
      localPath
    );
  }

  // Video files – four distinct forms appear in the HTML:
  //   1. https://cdn.../%2F...   (absolute CDN, %2F-encoded slash)
  //   2. ../cdn.../%252F...      (relative local path, double-encoded slash)
  //   3. comma-separated data attribute mixing both forms above
  // The local files live at /assets/hero.{mp4,webm} and /assets/hero-poster.jpg
  const videoFilename = "6937e4e4e0cf1553ecb4976f_031";
  const cdnHost = "cdn\\.prod\\.website-files\\.com";
  const siteSlash = "6937ded41fbb0d4d0e15a31e(?:%2F|%252F)"; // %2F or %252F
  const videoBase = `${cdnHost}\\/${siteSlash}${videoFilename}`;

  // Absolute https:// form
  html = html.replace(new RegExp(`https?:\\/\\/${videoBase}_mp4\\.mp4`, "g"), "/assets/hero.mp4");
  html = html.replace(new RegExp(`https?:\\/\\/${videoBase}_webm\\.webm`, "g"), "/assets/hero.webm");
  html = html.replace(new RegExp(`https?:\\/\\/${videoBase}_poster\\.0000000\\.jpg`, "g"), "/assets/hero-poster.jpg");

  // Relative ../cdn... form (used in <source src="...">)
  const relVideoBase = `\\.\\.\\/cdn\\.prod\\.website-files\\.com\\/${siteSlash}${videoFilename}`;
  html = html.replace(new RegExp(`${relVideoBase}_mp4\\.mp4`, "g"), "/assets/hero.mp4");
  html = html.replace(new RegExp(`${relVideoBase}_webm\\.webm`, "g"), "/assets/hero.webm");
  html = html.replace(new RegExp(`${relVideoBase}_poster\\.0000000\\.jpg`, "g"), "/assets/hero-poster.jpg");

  return html;
}

export function readAndPatchHtml(filename: string): string {
  const filePath = path.join(process.cwd(), "www.autoklinik-reutlingen.de", filename);
  let html = fs.readFileSync(filePath, "utf-8");
  html = rewriteAssets(html);
  html = rewritePageLinks(html);
  return html;
}

/**
 * Returns just the inner body content (without <body> tags) from the patched
 * Webflow HTML, with the Webflow navbar stripped so the React AutoklinikNavbar
 * can be injected in its place.
 */
export function getBodyContent(filename: string): string {
  let html = readAndPatchHtml(filename);

  // Extract content between <body> and </body>
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  let body = bodyMatch ? bodyMatch[1] : html;

  // Remove the Webflow navbar: the <div role="banner" ... class="...w-nav..."> element
  // It is a nested structure; we strip from the opening tag through its closing pair
  body = body.replace(
    /<div[^>]+role="banner"[^>]+class="[^"]*w-nav[^"]*"[^>]*>[\s\S]*?<\/div>\s*<\/div>/,
    ""
  );

  return body;
}

/**
 * Returns additional <head> tags extracted from the Webflow HTML (styles,
 * fonts, meta) so they can be re-injected via Next.js metadata / head.
 * Returns an array of raw tag strings.
 */
export function getExtraHeadContent(filename: string): string {
  let html = readAndPatchHtml(filename);
  const headMatch = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  return headMatch ? headMatch[1] : "";
}
