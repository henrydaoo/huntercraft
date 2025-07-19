import { useQuery } from '@tanstack/react-query';
import { websiteService } from '@/services/websiteService';

export const useWebsiteInfo = () => {
  return useQuery({
    queryKey: ['website-info'],
    queryFn: websiteService.getWebsiteInfo,
  });
};
