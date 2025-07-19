import { Project } from "@/services/projectsService";

export const formatProjectDateRange = (
  project: Project,
  format: "long" | "short" = "long"
): string => {
  const startDate = new Date(project.created_at);
  const endDate = project.updated_at ? new Date(project.updated_at) : null;

  const monthFormat = format === "long" ? "long" : "short";

  const startFormatted = startDate.toLocaleDateString("en-US", {
    month: monthFormat,
    year: "numeric",
  });

  if (!endDate) return startFormatted;

  const startYearMonth = `${startDate.getFullYear()}-${startDate.getMonth()}`;
  const endYearMonth = `${endDate.getFullYear()}-${endDate.getMonth()}`;

  if (startYearMonth === endYearMonth) {
    return startFormatted;
  }

  const endFormatted = endDate.toLocaleDateString("en-US", {
    month: monthFormat,
    year: "numeric",
  });

  return `${startFormatted} - ${endFormatted}`;
};

export const formatDate = (
  dateString: string,
  format: "long" | "short" = "short"
): string => {
  const date = new Date(dateString);
  const monthFormat = format === "long" ? "long" : "short";

  return date.toLocaleDateString("en-US", {
    month: monthFormat,
    year: "numeric",
  });
};
