import { useQuery } from '@tanstack/react-query';
import { skillsService } from '@/services/skillsService';

export const useSkills = () => {
  return useQuery({
    queryKey: ['skills'],
    queryFn: skillsService.getSkills,
  });
};
