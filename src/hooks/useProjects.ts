import { useQuery } from '@tanstack/react-query';
import { projectsService } from '@/services/projectsService';

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: projectsService.getProjects,
  });
};

export const useProject = (id: string) => {
  return useQuery({
    queryKey: ['project', id],
    queryFn: () => projectsService.getProjectById(id),
    enabled: !!id,
  });
};

export const useProjectBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['project', 'slug', slug],
    queryFn: () => projectsService.getProjectBySlug(slug),
    enabled: !!slug,
  });
};
