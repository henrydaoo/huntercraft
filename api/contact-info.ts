import { supabaseServer } from '../src/integrations/supabase/serverClient';

export const config = { runtime: 'edge' };

export default async function handler(req: Request): Promise<Response> {
  const { data, error } = await supabaseServer
    .from('contact_info')
    .select('*')
    .single();

  const headers = {
    'Content-Type': 'application/json',
    'Cache-Control': 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400',
  };

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers,
    });
  }

  return new Response(JSON.stringify(data || null), {
    status: 200,
    headers,
  });
}
