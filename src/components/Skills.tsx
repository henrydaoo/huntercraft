import { useSkills } from "@/hooks/useSkills";
import * as LucideIcons from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const Skills = () => {
  const { data: skills = [], isLoading: loading } = useSkills();

  const getIcon = (iconName?: string) => {
    if (!iconName) return LucideIcons.Layers;
    return (LucideIcons as any)[iconName] || LucideIcons.Layers;
  };

  if (loading) {
    return (
      <section className="py-20 sm:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-pulse">
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded mb-4 max-w-sm mx-auto"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded max-w-lg mx-auto"></div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200/80 dark:border-gray-700 p-6 animate-pulse"
              >
                <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-xl mb-4 mx-auto"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <AnimatedSection
      id="skills"
      className="py-20 sm:py-24 bg-gray-50 dark:bg-gray-900"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Technical <span className="text-blue-600">Skills</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            The tools and technologies I use to bring ideas to life
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {skills.map((skill, index) => {
            const IconComponent = getIcon(skill.icon);
            return (
              <div
                key={skill.id}
                className="flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200/80 dark:border-gray-700 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-lg"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 mb-4 text-blue-600 dark:text-blue-400">
                  {skill.icon_url ? (
                    <img
                      src={skill.icon_url}
                      alt={skill.name}
                      className="w-full h-full object-contain"
                      draggable={false}
                    />
                  ) : (
                    <IconComponent className="w-full h-full" />
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 text-center">
                  {skill.name}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Skills;
