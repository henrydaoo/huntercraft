import { useQuery } from "@tanstack/react-query";
import { userService } from "@/services/userService";

export const usePersonalInfo = (options?: { enable?: boolean }) => {
  const enable = options?.enable ?? true;
  return useQuery({
    queryKey: ["personal-info"],
    queryFn: userService.getPersonalInfo,
    enabled: enable,
  });
};
