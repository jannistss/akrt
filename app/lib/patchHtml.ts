import fs from "fs";
import path from "path";

const SITE_ID = "6937ded41fbb0d4d0e15a31e";
const CDN_BASE = `https://cdn.prod.website-files.com/${SITE_ID}`;
const LOCAL_CDN_BASE = `../cdn.prod.website-files.com/${SITE_ID}`;
const GSAP_CDN = "https://cdn.prod.website-files.com/gsap/3.15.0";
const LOCAL_GSAP = "../cdn.prod.website-files.com/gsap/3.15.0";

// Map of original CDN filenames to local /assets paths
const IMAGE_MAP: Record<string, string> = {
  "6937ded51fbb0d4d0e15a3c8_Webflow Background.svg": "/assets/webflow-bg.svg",
  "6937e0b4dab32eb0ce0c7f70_relume-460083.png": "/assets/images/6937e0b4dab32eb0ce0c7f70_relume-460083.png",
  "6937e715063be152c1cb3309_icon reperatur.png": "/assets/images/6937e715063be152c1cb3309_icon reperatur.png",
  "6937e7151cc0063ec7b71870_Icon Smiley.png": "/assets/images/6937e7151cc0063ec7b71870_Icon Smiley.png",
  "6937e71540070edab121f3aa_icon mercedes.png": "/assets/images/6937e71540070edab121f3aa_icon mercedes.png",
  "6937e7158532daae3933f12c_icon bmw.png": "/assets/images/6937e7158532daae3933f12c_icon bmw.png",
  "6937e7158bad018e0f304332_icon audi.png": "/assets/images/6937e7158bad018e0f304332_icon audi.png",
  "6937e7159229bbc42b6c8632_icon tüv.png": "/assets/images/6937e7159229bbc42b6c8632_icon tüv.png",
  "6937e715970dcf9d4e71dc89_icon mini.png": "/assets/images/6937e715970dcf9d4e71dc89_icon mini.png",
  "6937e715ad67a7e8c6f8f320_icon hebebühne.png": "/assets/images/6937e715ad67a7e8c6f8f320_icon hebebühne.png",
  "6937e715ee8aa2907def19f0_Icon Checkmark.png": "/assets/images/6937e715ee8aa2907def19f0_Icon Checkmark.png",
  "6937e715f0e031aca92d26f6_icon renault.png": "/assets/images/6937e715f0e031aca92d26f6_icon renault.png",
  "6937e7163e052d298653ff55_reperatur mann -p-1080.png": "/assets/images/6937e7163e052d298653ff55_reperatur mann -p-1080.png",
  "6937e7163e052d298653ff55_reperatur mann -p-1600.png": "/assets/images/6937e7163e052d298653ff55_reperatur mann -p-1600.png",
  "6937e7163e052d298653ff55_reperatur mann -p-2000.png": "/assets/images/6937e7163e052d298653ff55_reperatur mann -p-2000.png",
  "6937e7163e052d298653ff55_reperatur mann -p-500.png": "/assets/images/6937e7163e052d298653ff55_reperatur mann -p-500.png",
  "6937e7163e052d298653ff55_reperatur mann -p-800.png": "/assets/images/6937e7163e052d298653ff55_reperatur mann -p-800.png",
  "6937e7163e052d298653ff55_reperatur mann .png": "/assets/images/6937e7163e052d298653ff55_reperatur mann .png",
  "6937e7167a27ffa77e40aa08_Hero Image-p-1080.png": "/assets/images/6937e7167a27ffa77e40aa08_Hero Image-p-1080.png",
  "6937e7167a27ffa77e40aa08_Hero Image-p-500.png": "/assets/images/6937e7167a27ffa77e40aa08_Hero Image-p-500.png",
  "6937e7167a27ffa77e40aa08_Hero Image-p-800.png": "/assets/images/6937e7167a27ffa77e40aa08_Hero Image-p-800.png",
  "6937e7167a27ffa77e40aa08_Hero Image.png": "/assets/images/6937e7167a27ffa77e40aa08_Hero Image.png",
  "6937e7168920287b24bafc7c_icon reifen.png": "/assets/images/6937e7168920287b24bafc7c_icon reifen.png",
  "6985c4ce9b76f043ec5d6390_faviauto.png": "/assets/images/6985c4ce9b76f043ec5d6390_faviauto.png",
  "6985c4d38cf52f31e3481ad8_webclipauto.png": "/assets/images/6985c4d38cf52f31e3481ad8_webclipauto.png",
  "698dccd20f3ec8ce449ef838_Icon Glas.png": "/assets/images/698dccd20f3ec8ce449ef838_Icon Glas.png",
  "6a3d363154202915571e860a_Design ohne Titel (46)-p-1080.png": "/assets/images/6a3d363154202915571e860a_Design ohne Titel (46)-p-1080.png",
  "6a3d363154202915571e860a_Design ohne Titel (46)-p-500.png": "/assets/images/6a3d363154202915571e860a_Design ohne Titel (46)-p-500.png",
  "6a3d363154202915571e860a_Design ohne Titel (46)-p-800.png": "/assets/images/6a3d363154202915571e860a_Design ohne Titel (46)-p-800.png",
  "6a3d363154202915571e860a_Design ohne Titel (46).png": "/assets/images/6a3d363154202915571e860a_Design ohne Titel (46).png",
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

  // Video files
  html = html.replace(
    /https:\/\/cdn\.prod\.website-files\.com\/6937ded41fbb0d4d0e15a31e%2F6937e4e4e0cf1553ecb4976f_031_mp4\.mp4/g,
    "/assets/hero.mp4"
  );
  html = html.replace(
    /https:\/\/cdn\.prod\.website-files\.com\/6937ded41fbb0d4d0e15a31e%2F6937e4e4e0cf1553ecb4976f_031_webm\.webm/g,
    "/assets/hero.webm"
  );

  // Favicon / webclip
  html = html.replace(
    new RegExp(`\\.\\./cdn\\.prod\\.website-files\\.com/${SITE_ID}/6985c4ce9b76f043ec5d6390_faviauto\\.png`, "g"),
    "/assets/images/6985c4ce9b76f043ec5d6390_faviauto.png"
  );
  html = html.replace(
    new RegExp(`\\.\\./cdn\\.prod\\.website-files\\.com/${SITE_ID}/6985c4d38cf52f31e3481ad8_webclipauto\\.png`, "g"),
    "/assets/images/6985c4d38cf52f31e3481ad8_webclipauto.png"
  );

  return html;
}

export function readAndPatchHtml(filename: string): string {
  const filePath = path.join(process.cwd(), "www.autoklinik-reutlingen.de", filename);
  let html = fs.readFileSync(filePath, "utf-8");
  html = rewriteAssets(html);
  html = rewritePageLinks(html);
  return html;
}
