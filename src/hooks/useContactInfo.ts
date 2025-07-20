import { useQuery } from "@tanstack/react-query";
import { contactService } from "@/services/contactService";

export const useContactInfo = (options?: { enable?: boolean }) => {
  const enable = options?.enable ?? true;
  return useQuery({
    queryKey: ["contact-info"],
    queryFn: contactService.getContactInfo,
    enabled: enable,
  });
};

export const useSocialLinks = (options?: { enable?: boolean }) => {
  const enable = options?.enable ?? true;
  return useQuery({
    queryKey: ["social-links"],
    queryFn: contactService.getSocialLinks,
    enabled: enable,
  });
};
