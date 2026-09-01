import { permanentRedirect } from "next/navigation";

// This URL was consolidated into /hagelschaden to avoid duplicate content.
// A permanent (308) redirect passes link equity to the canonical URL.
export default function HagelschadenzentrumRedirect() {
  permanentRedirect("/hagelschaden");
}
