import { useState } from "react";
import { useProjects } from "@/hooks/useProjects";
import { useNavigate } from "react-router-dom";
import AnimatedSection from "./AnimatedSection";
import ProjectCardNew from "./ProjectCard";
import type { Project } from "@/services/projectsService";

const Projects = () => {
  const { data: projects = [], isLoading: loading } = useProjects();
  const [activeFilter, setActiveFilter] = useState("Featured");
  const navigate = useNavigate();

  const allCategories = Array.from(
    new Set(projects.map((p) => p.category).filter(Boolean))
  );
  const filterTabs = ["All", "Featured", ...allCategories];

  const filteredProjects = (() => {
    if (activeFilter === "All") {
      return projects;
    } else if (activeFilter === "Featured") {
      return projects.filter((p) => p.featured);
    } else {
      return projects.filter((p) => p.category === activeFilter);
    }
  })();

  const handleProjectClick = (project: Project) => {
    navigate(`/project/${project.slug}`);
  };

  if (loading) {
    return (
      <section className="py-20 sm:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 animate-pulse">
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded mb-4 max-w-sm mx-auto"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded max-w-lg mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <AnimatedSection
      id="projects"
      className="py-20 sm:py-24 bg-gray-50 dark:bg-gray-900"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Featured <span className="text-blue-600">Projects</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Some of the products we built
          </p>
        </div>

        <div className="flex justify-center flex-wrap gap-2 mb-12">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${
                activeFilter === tab
                  ? "bg-blue-600 text-white shadow"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCardNew
              key={project.id}
              project={project}
              onProjectClick={handleProjectClick}
            />
          ))}
        </div>

        {filteredProjects.length === 0 && !loading && (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
              No projects found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Projects will be displayed here once added
            </p>
          </div>
        )}
      </div>
    </AnimatedSection>
  );
};

export default Projects;
