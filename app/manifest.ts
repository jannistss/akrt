import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Autoklinik Reutlingen",
    short_name: "Autoklinik RT",
    description:
      "Meisterwerkstatt in Reutlingen – Reparatur, Inspektion, TÜV und Unfallreparatur aller Marken.",
    start_url: "/",
    display: "standalone",
    background_color: "#001826",
    theme_color: "#0074a2",
    orientation: "portrait-primary",
    scope: "/",
    lang: "de",
    icons: [
      { src: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { src: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { src: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
      { src: "/maskable-icon.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    categories: ["automotive", "business", "utilities"],
  };
}
