import { useQuery } from '@tanstack/react-query';
import { experienceService } from '@/services/experienceService';

export const useExperiences = () => {
  return useQuery({
    queryKey: ['experiences'],
    queryFn: experienceService.getExperiences,
  });
};
