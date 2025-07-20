import { useQuery } from "@tanstack/react-query";
import { websiteService } from "@/services/websiteService";

export const useWebsiteInfo = (options?: { enable?: boolean }) => {
  const enable = options?.enable ?? true;
  return useQuery({
    queryKey: ["website-info"],
    queryFn: websiteService.getWebsiteInfo,
    enabled: enable,
  });
};
