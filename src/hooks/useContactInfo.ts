import { useQuery } from '@tanstack/react-query';
import { contactService } from '@/services/contactService';

export const useContactInfo = () => {
  return useQuery({
    queryKey: ['contact-info'],
    queryFn: contactService.getContactInfo,
  });
};

export const useSocialLinks = () => {
  return useQuery({
    queryKey: ['social-links'],
    queryFn: contactService.getSocialLinks,
  });
};
