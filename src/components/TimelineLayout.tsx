import { ReactNode } from 'react';
import AnimatedSection from './AnimatedSection';
import { formatDate } from '@/lib/dateUtils';

interface TimelineItem {
  id: string;
  title: string;
  subtitle: string;
  start_date: string;
  end_date?: string;
  description?: string[];
}

interface TimelineLayoutProps {
  id: string;
  title: string;
  subtitle: string;
  data: TimelineItem[];
  loading: boolean;
}

const TimelineLayout: React.FC<TimelineLayoutProps> = ({
  id,
  title,
  subtitle,
  data,
  loading
}) => {
  if (loading) {
    return (
      <section className="py-20 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-pulse">
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded mb-4 max-w-sm mx-auto"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded max-w-lg mx-auto"></div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <AnimatedSection id={id} className="py-20 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            {title}
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            {subtitle}
          </p>
        </div>
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-3 md:left-1/2 md:-translate-x-1/2 w-0.5 h-full bg-gray-200 dark:bg-gray-700"></div>
          {data.map((item, index) => (
            <div
              key={item.id}
              className={`relative flex items-start mb-12 ${
                index % 2 === 0 ? "md:justify-start" : "md:justify-end"
              }`}
            >
              <div
                className={`w-full md:w-1/2 pl-7 md:pl-0 ${
                  index % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8 md:text-left"
                }`}
              >
                <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-1">
                  {formatDate(item.start_date)} -{" "}
                  {item.end_date ? formatDate(item.end_date) : "Present"}
                </p>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {item.title}
                </h3>
                <p className="text-md text-gray-500 dark:text-gray-400 mb-3">
                  {item.subtitle}
                </p>
                {item.description && item.description.length > 0 && (
                  <ul
                    className={`space-y-1 text-sm text-gray-600 dark:text-gray-300 flex flex-col ${
                      index % 2 === 0 ? "items-start md:items-end" : "items-start md:items-start"
                    }`}
                  >
                    {item.description.map((desc, i) => (
                      <li key={i} className="flex items-center">
                        <span className="text-blue-500 mr-2 md:hidden">•</span>
                        {index % 2 !== 0 && (
                          <span className="text-blue-500 mr-2 hidden md:inline">•</span>
                        )}
                        <span>{desc}</span>
                        {index % 2 === 0 && (
                          <span className="text-blue-500 ml-2 hidden md:inline">•</span>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="absolute left-1 md:left-1/2 md:-translate-x-1/2 w-4 h-4 bg-blue-600 dark:bg-blue-500 rounded-full border-4 border-white dark:border-gray-900"></div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default TimelineLayout;
