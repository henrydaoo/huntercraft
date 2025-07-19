import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

export type ContactInfo = Tables<'contact_info'>;
export type SocialLink = Tables<'social_links'>;

async function getContactInfo(): Promise<ContactInfo | null> {
  try {
    const { data, error } = await supabase
      .from('contact_info')
      .select('*')
      .single();

    if (error) {
      console.error('Error fetching contact info:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

async function getSocialLinks(): Promise<SocialLink[]> {
  try {
    const { data, error } = await supabase
      .from('social_links')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) {
      console.error('Error fetching social links:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

export const contactService = {
  getContactInfo,
  getSocialLinks
};
