import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

export type Education = Tables<'education'>;

async function getEducations(): Promise<Education[]> {
  try {
    const { data, error } = await supabase
      .from('education')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) {
      console.error('Error fetching education:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

export const educationService = {
  getEducations
};
