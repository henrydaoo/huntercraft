import React, { useState, useEffect } from "react";
import { Project } from "@/services/projectsService";
import ProjectCard from "@/components/ProjectCard";
import Icon from "@/components/Icon";

const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
} as const;

const ITEMS_PER_PAGE = {
  mobile: 1,
  tablet: 2,
  desktop: 3,
} as const;

const ANIMATION_DURATION = 500;
const BUTTON_POSITION_TOP = "16.5rem";

interface ProjectCarouselProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
  currentProjectSlug?: string;
}

const ProjectCarousel: React.FC<ProjectCarouselProps> = ({
  projects,
  onProjectClick,
  currentProjectSlug,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleProjects, setVisibleProjects] = useState<Project[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < BREAKPOINTS.mobile) {
        setItemsPerPage(ITEMS_PER_PAGE.mobile);
      } else if (window.innerWidth < BREAKPOINTS.tablet) {
        setItemsPerPage(ITEMS_PER_PAGE.tablet);
      } else {
        setItemsPerPage(ITEMS_PER_PAGE.desktop);
      }
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  useEffect(() => {
    const filteredProjects = projects.filter((p) => p.slug !== currentProjectSlug);
    setVisibleProjects(filteredProjects);
    setCurrentIndex(0);
  }, [projects, currentProjectSlug]);

  const totalPages = Math.ceil(visibleProjects.length / itemsPerPage);
  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < totalPages - 1;

  const goToPrevious = () => {
    if (canGoPrev && !isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev - 1);
      setTimeout(() => setIsTransitioning(false), ANIMATION_DURATION);
    }
  };

  const goToNext = () => {
    if (canGoNext && !isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev + 1);
      setTimeout(() => setIsTransitioning(false), ANIMATION_DURATION);
    }
  };

  const getButtonClassName = (isDisabled: boolean) => {
    return `absolute z-10 w-8 h-8 md:w-12 md:h-12 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110 hover:shadow-lg rounded-full flex items-center justify-center shadow-md ${
      isDisabled ? "opacity-50 cursor-not-allowed" : ""
    }`;
  };

  if (visibleProjects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">
          No other projects available
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-12">
        Other Projects
      </h2>

      <div className="relative">
        {totalPages > 1 && canGoPrev && (
          <button
            onClick={goToPrevious}
            disabled={isTransitioning}
            className={`${getButtonClassName(
              isTransitioning
            )} left-0 md:left-0 -translate-x-2 md:-translate-x-6`}
            style={{ top: BUTTON_POSITION_TOP }}
            aria-label="Previous projects"
          >
            <Icon
              path="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"
              className="w-4 h-4 md:w-5 md:h-5"
            />
          </button>
        )}

        {totalPages > 1 && canGoNext && (
          <button
            onClick={goToNext}
            disabled={isTransitioning}
            className={`${getButtonClassName(
              isTransitioning
            )} right-0 md:right-0 translate-x-2 md:translate-x-6`}
            style={{ top: BUTTON_POSITION_TOP }}
            aria-label="Next projects"
          >
            <Icon
              path="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"
              className="w-4 h-4 md:w-5 md:h-5"
            />
          </button>
        )}

        <div className="overflow-x-hidden overflow-y-visible py-8 -my-8">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {Array.from({ length: totalPages }, (_, pageIndex) => (
              <div key={pageIndex} className="w-full flex-shrink-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px] py-8">
                  {visibleProjects
                    .slice(
                      pageIndex * itemsPerPage,
                      (pageIndex + 1) * itemsPerPage
                    )
                    .map((project) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        onProjectClick={onProjectClick}
                      />
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCarousel;
