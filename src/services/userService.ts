import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

export type PersonalInfo = Tables<'personal_info'>;

async function getPersonalInfo(): Promise<PersonalInfo | null> {
  try {
    const { data, error } = await supabase
      .from('personal_info')
      .select('*')
      .single();

    if (error) {
      console.error('Error fetching personal info:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export const userService = {
  getPersonalInfo
};
