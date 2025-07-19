import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

export type Experience = Tables<'experiences'>;

async function getExperiences(): Promise<Experience[]> {
  try {
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .eq('visible', true)
      .order('order_index', { ascending: true });

    if (error) {
      console.error('Error fetching experiences:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

export const experienceService = {
  getExperiences
};
