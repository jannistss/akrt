import { getErinnerungen } from "@/lib/actions/crm";
import { ErinnerungenClient } from "./erinnerungen-client";

export default async function ErinnerungenPage() {
  let erinnerungen: Awaited<ReturnType<typeof getErinnerungen>> = [];
  try {
    erinnerungen = await getErinnerungen();
  } catch {
    erinnerungen = [];
  }

  return <ErinnerungenClient initialErinnerungen={erinnerungen} />;
}
