import { useQuery } from '@tanstack/react-query';
import { educationService } from '@/services/educationService';

export const useEducations = () => {
  return useQuery({
    queryKey: ['educations'],
    queryFn: educationService.getEducations,
  });
};
