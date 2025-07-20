import { PostgrestClient } from "@supabase/postgrest-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
if (!SUPABASE_URL) {
  throw new Error("Missing Supabase URL environment variable");
}
export const supabase = new PostgrestClient(SUPABASE_URL);
