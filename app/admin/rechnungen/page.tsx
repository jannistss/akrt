import { getRechnungen } from "@/lib/actions/crm";
import { RechnungenClient } from "./rechnungen-client";

export default async function RechnungenPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;

  let rechnungen: Awaited<ReturnType<typeof getRechnungen>> = [];
  try {
    rechnungen = await getRechnungen(status);
  } catch {
    rechnungen = [];
  }

  return <RechnungenClient initialRechnungen={rechnungen} />;
}
