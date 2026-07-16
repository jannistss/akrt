import { getKunden } from "@/lib/actions/crm";
import { KundenClient } from "./kunden-client";

export default async function KundenPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; status?: string }>;
}) {
  const { search, status } = await searchParams;

  let kunden: Awaited<ReturnType<typeof getKunden>> = [];
  try {
    kunden = await getKunden(search, status);
  } catch {
    kunden = [];
  }

  return <KundenClient initialKunden={kunden} />;
}
