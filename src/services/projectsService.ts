export type Project = {
  id: string;
  title: string;
  description: string;
  slug: string;
  visible: boolean;
  order_index: number;
  image_urls: string[]| null;
  category: string;
  image_url?: string | null;
  technologies: string[];
  featured: boolean;
};

async function getProjects(): Promise<Project[]> {
  try {
    const res = await fetch("/api/projects");
    if (!res.ok) {
      console.error("Error fetching projects:", res.statusText);
      return [];
    }
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

async function getProjectById(id: string): Promise<Project | null> {
  try {
    const res = await fetch(`/api/projects?id=${id}`);
    if (!res.ok) {
      console.error("Error fetching project:", res.statusText);
      return null;
    }
    const data = await res.json();
    return data || null;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const res = await fetch(`/api/projects?slug=${slug}`);
    if (!res.ok) {
      console.error("Error fetching project:", res.statusText);
      return null;
    }
    const data = await res.json();
    return data || null;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export const projectsService = {
  getProjects,
  getProjectById,
  getProjectBySlug,
};
