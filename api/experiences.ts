import { supabaseServer } from '../src/integrations/supabase/serverClient';

export const config = { runtime: 'edge' };

export default async function handler(req: Request): Promise<Response> {
  const { data, error } = await supabaseServer
    .from('experiences')
    .select('*')
    .eq('visible', true)
    .order('order_index', { ascending: true });

  const headers = {
    'Content-Type': 'application/json',
    'Cache-Control': 'public, max-age=3600',
  };

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers,
    });
  }

  return new Response(JSON.stringify(data || []), {
    status: 200,
    headers,
  });
}
