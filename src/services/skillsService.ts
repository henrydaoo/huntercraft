import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

export type Skill = Tables<'skills'>;

async function getSkills(): Promise<Skill[]> {
  try {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) {
      console.error('Error fetching skills:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

export const skillsService = {
  getSkills
};
