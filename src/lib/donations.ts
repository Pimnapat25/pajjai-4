import { getSupabase } from "@/lib/supabase";

export type DonationPayload = {
  category: string; // e.g., 'fund' | 'temple' | 'project' | 'general' | 'electricity' | ...
  amount: number;
  temple_id?: string | number;
  temple_name?: string;
  project_id?: string | number;
  project_name?: string;
};

export async function insertDonation(payload: DonationPayload) {
  const supabase = getSupabase();
  // Loose typing for dev without generated DB types
  const { error } = await (supabase as any)
    .from("donations")
    .insert({ category: payload.category, amount: payload.amount });
  if (error) throw error;

  try {
    const amt = Number(payload.amount) || 0;
    const total = Number(localStorage.getItem("donation_total") || "0");
    localStorage.setItem("donation_total", String(total + amt));

    if (payload.category === "fund") {
      const t = Number(localStorage.getItem("donation_total_fund") || "0");
      localStorage.setItem("donation_total_fund", String(t + amt));
    } else if (payload.category.startsWith("temple:")) {
      const id = payload.category.split(":")[1] || "unknown";
      const key = `donation_total_temple_${id}`;
      const t = Number(localStorage.getItem(key) || "0");
      localStorage.setItem(key, String(t + amt));
    } else if (payload.category.startsWith("project:")) {
      const id = payload.category.split(":")[1] || "unknown";
      const key = `donation_total_project_${id}`;
      const t = Number(localStorage.getItem(key) || "0");
      localStorage.setItem(key, String(t + amt));
    }
    // notify other pages in same tab
    try {
      window.dispatchEvent(new Event("donation-updated"));
    } catch {}
  } catch {}
}
