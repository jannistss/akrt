import { getTermine } from "@/lib/actions/crm";
import { TermineClient } from "./termine-client";

export default async function TerminePage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;

  let termine: Awaited<ReturnType<typeof getTermine>> = [];
  try {
    const from = new Date().toISOString();
    const to = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString();
    termine = await getTermine({ status, from, to });
  } catch {
    termine = [];
  }

  return <TermineClient initialTermine={termine} />;
}
