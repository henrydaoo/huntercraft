import { useQuery } from "@tanstack/react-query";
import { contactService } from "@/services/contactService";

export const useSocialLinks = (options?: { enable?: boolean }) => {
  const enable = options?.enable ?? true;
  return useQuery({
    queryKey: ["social-links"],
    queryFn: contactService.getSocialLinks,
    enabled: enable,
  });
};
