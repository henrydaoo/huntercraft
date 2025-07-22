import { useQuery } from "@tanstack/react-query";

export function useHeroInfo(options = {}) {
  return useQuery({
    queryKey: ["hero-info"],
    queryFn: async () => {
      const res = await fetch("/api/hero-info");
      if (!res.ok) throw new Error("Failed to fetch hero info");
      return await res.json();
    },
    ...options,
  });
}
