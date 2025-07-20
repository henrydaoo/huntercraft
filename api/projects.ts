import { supabaseServer } from "../src/integrations/supabase/serverClient";

export const config = { runtime: "edge" };

export default async function handler(req: Request): Promise<Response> {
  const { searchParams } = new URL(req.url);
  let query = supabaseServer.from("projects").select("*");
  let single = false;
  if (searchParams.has("id")) {
    query = query.eq("id", searchParams.get("id"));
    single = true;
  }
  if (searchParams.has("slug")) {
    query = query.eq("slug", searchParams.get("slug"));
    single = true;
  }
  query = query.order("order_index", { ascending: true });
  const { data, error } = single ? await query.single() : await query;

  const headers = {
    "Content-Type": "application/json",
    "Cache-Control":
      "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
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
