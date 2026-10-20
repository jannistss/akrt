import { del } from "@vercel/blob";
import { NextRequest } from "next/server";
import { purchaseDb, purchaseFailure, purchaseJson, type StoredPhoto } from "@/lib/autoankauf-server";

export const maxDuration = 60;
export async function GET(request: NextRequest) {
  if (!process.env.CRON_SECRET || request.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`) return purchaseJson({ error: "Nicht autorisiert." }, 401);
  try {
    const db = purchaseDb();
    const { data, error } = await db.from("autoankauf_drafts").select("id,images").lt("expires_at", new Date().toISOString()).limit(100);
    if (error) throw error;
    for (const row of data || []) {
      const paths = (row.images as StoredPhoto[]).map(image => image.path);
      if (paths.length) await del(paths);
      const deletion = await db.from("autoankauf_drafts").delete().eq("id", row.id);
      if (deletion.error) throw deletion.error;
    }
    const limits = await db.from("autoankauf_limits").delete().lt("expires_at", new Date().toISOString());
    if (limits.error) throw limits.error;
    return purchaseJson({ deleted: data?.length || 0 });
  } catch (error) { return purchaseFailure(error); }
}
