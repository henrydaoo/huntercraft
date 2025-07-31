import { useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import Layout from "@/components/Layout";
import ProjectCarousel from "@/components/ProjectCarousel";
import Icon from "@/components/Icon";
import ImageGalleryModal from "@/components/ImageGalleryModal";
import { useProjects, useProjectBySlug } from "@/hooks/useProjects";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { formatProjectDateRange } from "@/lib/dateUtils";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";

const ProjectDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const infoSectionRef = useRef<HTMLDivElement>(null);
  const [isGalleryOpen, setGalleryOpen] = useState(false);

  useScrollToTop(true, 100);

  const { data: allProjects } = useProjects();
  const { data: project, isLoading } = useProjectBySlug(slug || "");

  if (!isLoading && !project) {
    navigate("/");
    return null;
  }

  if (isLoading) {
    return (
      <Layout>
        <main className="py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="flex items-center space-x-2 mb-12">
                <div className="h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
              </div>
              <div className="grid lg:grid-cols-5 gap-12">
                <div className="lg:col-span-2 space-y-6">
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
                <div className="lg:col-span-3 h-96 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
        </main>
      </Layout>
    );
  }

  if (!project) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Project Not Found
            </h1>
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
            >
              <Icon
                path="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                className="w-5 h-5"
              />
              <span>Back to Portfolio</span>
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  const allImages = project
    ? [project.image_url, ...(project.image_urls || [])].filter(Boolean)
    : [];

  return (
    <Layout>
      <ImageGalleryModal
        images={allImages}
        isOpen={isGalleryOpen}
        onClose={() => setGalleryOpen(false)}
      />
      <main className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-semibold mb-12 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
          >
            <Icon
              path="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"
              className="w-5 h-5"
            />
            <span>Back to Portfolio</span>
          </button>

          <div className="lg:grid lg:grid-cols-5 lg:gap-x-12">
            <aside
              ref={infoSectionRef}
              className="lg:col-span-2 lg:sticky lg:top-24 self-start h-fit transition-transform duration-300"
            >
              {project.category && (
                <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2">
                  {project.category}
                </p>
              )}
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {project.title}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {formatProjectDateRange(project)}
              </p>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                {project.description}
              </p>
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  About this project
                </h2>
                <div className="prose prose-sm max-w-none text-gray-600 dark:text-gray-300 prose-headings:text-gray-900 dark:prose-headings:text-white prose-strong:text-gray-900 dark:prose-strong:text-white prose-code:text-blue-600 dark:prose-code:text-blue-400 prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800">
                  {project.detailed_description ? (
                    <ReactMarkdown
                      components={{
                        code(props) {
                          const { children, className, ...rest } = props;
                          const match = /language-(\w+)/.exec(className || "");
                          return match ? (
                            <SyntaxHighlighter
                              style={theme === "dark" ? oneDark : oneLight}
                              language={match[1]}
                              PreTag="div"
                            >
                              {String(children).replace(/\n$/, "")}
                            </SyntaxHighlighter>
                          ) : (
                            <code {...rest} className={className}>
                              {children}
                            </code>
                          );
                        },
                      }}
                    >
                      {project.detailed_description}
                    </ReactMarkdown>
                  ) : (
                    <p>{project.description}</p>
                  )}
                </div>
              </div>
              {project.technologies && project.technologies.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    Technologies used
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium px-3 py-1 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                {project.demo_url && (
                  <a
                    href={project.demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md transition-all duration-300"
                  >
                    <Icon path="M8 5v14l11-7z" className="w-4 h-4 mr-2" />
                    View Project
                  </a>
                )}
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center text-center bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-bold py-3 px-6 rounded-md transition-all duration-300"
                  >
                    <Icon
                      path="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.111.82-.26.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.085 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.217.694.825.576C20.565 21.799 24 17.3 24 12A12 12 0 0012 0z"
                      className="w-4 h-4 mr-2"
                    />
                    View Source Code
                  </a>
                )}
              </div>
            </aside>

            <div className="lg:col-span-3 mt-12 lg:mt-0">
              <div className="space-y-8">
                {allImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Screenshot ${index + 1} of ${project.title}`}
                    className="rounded-lg shadow-xl w-full h-auto cursor-zoom-in hover:opacity-90 transition duration-200"
                    style={{ cursor: "zoom-in" }}
                    onClick={() => {
                      setGalleryOpen(true);
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.cursor = "zoom-in";
                    }}
                    draggable={false}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24 pt-16 border-t border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <ProjectCarousel
              projects={allProjects || []}
              currentProjectSlug={project?.slug}
            />
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default ProjectDetailPage;
