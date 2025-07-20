
export interface WebsiteInfo {
  site_name: string;
  site_description?: string;
}

async function getWebsiteInfo(): Promise<WebsiteInfo | null> {
  try {
    const res = await fetch('/api/website-info');
    if (!res.ok) {
      console.error('Error fetching website info:', res.statusText);
      return null;
    }
    const data = await res.json();
    return data || null;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export const websiteService = {
  getWebsiteInfo
};
