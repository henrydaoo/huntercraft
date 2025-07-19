import { supabase } from '@/integrations/supabase/client';

export interface WebsiteInfo {
  site_name: string;
  site_description?: string;
}

async function getWebsiteInfo(): Promise<WebsiteInfo | null> {
  try {
    const { data, error } = await supabase
      .from('website_info')
      .select('*')
      .single();

    if (error) {
      console.error('Error fetching website info:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export const websiteService = {
  getWebsiteInfo
};
