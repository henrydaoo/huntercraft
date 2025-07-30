import { supabaseServer } from "../src/integrations/supabase/serverClient";

export const config = { runtime: "edge" };

export default async function handler(req: Request): Promise<Response> {
  const { searchParams } = new URL(req.url);
  let query = supabaseServer.from("projects").select("*").eq("is_visible", true);;
  let single = false;

  if (searchParams.has("slug")) {
    query = query.eq("slug", searchParams.get("slug"));
    single = true;
  }
  query = query.order("order_index", { ascending: true });
  const { data, error } = single ? await query.single() : await query;

  const headers = {
    "Content-Type": "application/json",
    "Cache-Control":
      "public, max-age=604800, s-maxage=2592000, stale-while-revalidate=2592000",
  };

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers,
    });
  }

  return new Response(JSON.stringify(data || (single ? null : [])), {
    status: 200,
    headers,
  });
}
