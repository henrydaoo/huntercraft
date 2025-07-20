
export type Education = {
  id: number;
  school: string;
  degree: string;
  field_of_study: string;
  start_year: number;
  end_year?: number;
  order_index: number;
  // ... các trường khác nếu cần
};

async function getEducations(): Promise<Education[]> {
  try {
    const res = await fetch('/api/education');
    if (!res.ok) {
      console.error('Error fetching education:', res.statusText);
      return [];
    }
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

export const educationService = {
  getEducations
};
