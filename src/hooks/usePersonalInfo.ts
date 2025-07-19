import { useQuery } from '@tanstack/react-query';
import { userService } from '@/services/userService';

export const usePersonalInfo = () => {
  return useQuery({
    queryKey: ['personal-info'],
    queryFn: userService.getPersonalInfo,
  });
};
