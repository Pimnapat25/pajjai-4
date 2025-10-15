import { getSupabase } from "@/lib/supabase";

export type TempleItemRow = {
  temple_id: string;
  item_id: number;
  item_name: string;
  quantity: number; // total needed
  remaining: number; // how many still needed
  price?: number | null;
};

export async function ensureTempleItems(templeId: string, items: Array<{ id: number; name: string; total: number; remaining: number; price?: number }>) {
  const supabase = getSupabase();
  try {
    const { data, error } = await (supabase as any)
      .from("temple_items")
      .select("item_id")
      .eq("temple_id", templeId);
    if (error) throw error;
    const existingIds = new Set<number>((data || []).map((r: any) => r.item_id));
    const toInsert: TempleItemRow[] = items
      .filter((it) => !existingIds.has(it.id))
      .map((it) => ({
        temple_id: templeId,
        item_id: it.id,
        item_name: it.name,
        quantity: it.total,
        remaining: it.remaining,
        price: it.price ?? null,
      }));
    if (toInsert.length > 0) {
      const { error: insErr } = await (supabase as any)
        .from("temple_items")
        .insert(toInsert);
      if (insErr) throw insErr;
    }
  } catch (e) {
    // swallow errors in dev if table is missing; UI will still work locally
    // console.error(e);
  }
}

export async function updateTempleItems(templeId: string, updates: Array<{ id: number; remaining: number }>) {
  const supabase = getSupabase();
  if (updates.length === 0) return;
  try {
    // Batch upserts with unique (temple_id, item_id)
    const payload = updates.map((u) => ({ temple_id: templeId, item_id: u.id, remaining: u.remaining }));
    const { error } = await (supabase as any)
      .from("temple_items")
      .upsert(payload, { onConflict: "temple_id,item_id" });
    if (error) throw error;
  } catch (e) {
    // console.error(e);
  }
}

export async function getTempleItems(templeId: string): Promise<Record<number, number>> {
  const supabase = getSupabase();
  try {
    const { data, error } = await (supabase as any)
      .from("temple_items")
      .select("item_id, remaining")
      .eq("temple_id", templeId);
    if (error) throw error;
    const map: Record<number, number> = {};
    for (const row of data || []) {
      map[row.item_id as number] = row.remaining as number;
    }
    return map;
  } catch (e) {
    return {};
  }
}
