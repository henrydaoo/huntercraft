import { supabaseServer } from "../src/integrations/supabase/serverClient";

export const config = { runtime: "edge" };

export default async function handler(req: Request): Promise<Response> {
  // Fetch both tables in parallel
  const [personalRes, socialRes] = await Promise.all([
    supabaseServer.from("personal_info").select("*").single(),
    supabaseServer.from("social_links").select("*").order("order_index", { ascending: true }),
  ]);

  const headers = {
    "Content-Type": "application/json",
    "Cache-Control": "public, max-age=604800, s-maxage=2592000, stale-while-revalidate=2592000",
  };

  if (personalRes.error || socialRes.error) {
    return new Response(
      JSON.stringify({
        error: personalRes.error?.message || socialRes.error?.message,
      }),
      {
        status: 500,
        headers,
      }
    );
  }

  return new Response(
    JSON.stringify({
      personalInfo: personalRes.data || null,
      socialLinks: socialRes.data || [],
    }),
    {
      status: 200,
      headers,
    }
  );
}
