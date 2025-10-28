import { createClient } from "@supabase/supabase-js";
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

let _client: ReturnType<typeof createClient> | null = null;

export function getSupabase() {
  if (_client) return _client;
  if (!supabaseUrl || !supabaseAnonKey) {
    const msg = "Missing Supabase env vars. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local";
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.error(msg);
    }
    throw new Error(msg);
  }
  _client = createClient(supabaseUrl, supabaseAnonKey);
  return _client;
}
