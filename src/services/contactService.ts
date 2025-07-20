export type ContactInfo = {
  id: number;
  email: string;
  phone?: string;
  address?: string;
};

export type SocialLink = {
  id: number;
  name: string;
  url: string;
  order_index: number;
  icon: string;
};

async function getContactInfo(): Promise<ContactInfo | null> {
  try {
    const res = await fetch("/api/contact-info");
    if (!res.ok) {
      console.error("Error fetching contact info:", res.statusText);
      return null;
    }
    const data = await res.json();
    return data || null;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

async function getSocialLinks(): Promise<SocialLink[]> {
  try {
    const res = await fetch("/api/social-links");
    if (!res.ok) {
      console.error("Error fetching social links:", res.statusText);
      return [];
    }
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

export const contactService = {
  getContactInfo,
  getSocialLinks,
};
