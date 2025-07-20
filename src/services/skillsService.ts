
export type Skill = {
  id: number;
  name: string;
  level: string;
  order_index: number;
  // ... các trường khác nếu cần
};

async function getSkills(): Promise<Skill[]> {
  try {
    const res = await fetch('/api/skills');
    if (!res.ok) {
      console.error('Error fetching skills:', res.statusText);
      return [];
    }
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

export const skillsService = {
  getSkills
};
