import { createClient } from "@/lib/supabase/server";
import { RepdocClient } from "./repdoc-client";

export const metadata = { title: "Repdoc Import | Autoklinik CRM" };

export default async function RepdocPage() {
  const supabase = await createClient();
  const { data: logs } = await supabase
    .from("repdoc_import_log")
    .select("*")
    .order("erstellt_am", { ascending: false })
    .limit(20);

  return <RepdocClient logs={logs ?? []} />;
}
