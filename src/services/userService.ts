export type PersonalInfo = {
  id: number;
  name: string;
  bio: string;
  avatar_url?: string;
  title?: string;
};

async function getPersonalInfo(): Promise<PersonalInfo | null> {
  try {
    const res = await fetch("/api/personal-info");
    if (!res.ok) {
      console.error("Error fetching personal info:", res.statusText);
      return null;
    }
    const data = await res.json();
    return data || null;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export const userService = {
  getPersonalInfo,
};
