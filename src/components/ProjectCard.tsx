import React from "react";
import { Project } from "@/services/projectsService";
import { formatProjectDateRange } from "@/lib/dateUtils";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <a
      tabIndex={0}
      role="button"
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-2 flex flex-col cursor-pointer"
      href={"/project/" + project.slug}
    >
      <div className="relative">
        <img
          src={
            project.image_urls?.[0] ||
            project.image_url ||
            "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&h=300&fit=crop"
          }
          alt={project.title}
          className="w-full h-56 object-cover object-top"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          {project.category && (
            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
              {project.category}
            </p>
          )}
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {formatProjectDateRange(project, "short")}
          </p>
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
          {project.title}
        </h3>
        <p
          className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed flex-grow overflow-hidden"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {project.description}
        </p>
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {project.technologies?.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium px-2.5 py-1 rounded-full"
              >
                {tech}
              </span>
            ))}
            {project.technologies && project.technologies.length > 3 && (
              <span className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium px-2.5 py-1 rounded-full">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>
        </div>
        <button className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors self-start">
          View Project →
        </button>
      </div>
    </a>
  );
};

export default ProjectCard;
