
export type Experience = {
  // Khai báo các trường cần thiết cho Experience
  id: number;
  title: string;
  company: string;
  visible: boolean;
  order_index: number;
  // ... các trường khác nếu cần
};

async function getExperiences(): Promise<Experience[]> {
  try {
    const res = await fetch('/api/experiences');
    if (!res.ok) {
      console.error('Error fetching experiences:', res.statusText);
      return [];
    }
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

export const experienceService = {
  getExperiences
};
