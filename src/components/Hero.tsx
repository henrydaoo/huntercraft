import { useHeroInfo } from "@/hooks/useHeroInfo";
import { useTypingEffect } from "@/hooks/useTypingEffect";

const Hero = () => {
  const { data, isLoading } = useHeroInfo({
    enabled: true,
  });
  const personalInfo = data?.personalInfo;
  const socialLinks = data?.socialLinks;

  const typedName = useTypingEffect(personalInfo?.name || "", 100);

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (isLoading) {
    return (
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-14 text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-16 bg-gray-200 rounded mb-4 max-w-2xl mx-auto"></div>
            <div className="h-8 bg-gray-200 rounded mb-8 max-w-lg mx-auto"></div>
            <div className="h-6 bg-gray-200 rounded mb-10 max-w-xl mx-auto"></div>
            <div className="flex justify-center items-center space-x-6 mb-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-full w-12 h-12 sm:w-14 sm:h-14 bg-gray-200 dark:bg-gray-700 animate-pulse"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="home"
      className="relative pt-32 pb-20 lg:pt-48 lg:pb-14 text-center"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="w-full h-[68px] text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight mb-4">
          Hi, I'm <span className="text-blue-600 relative">{typedName}</span>
          <span className="typing-cursor animate-pulse ml-1">|</span>
        </h1>
        <p className="text-lg sm:text-xl font-medium text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          {personalInfo?.title || "Full-Stack Developer"}
        </p>
        <p className="text-md text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-8">
          I design and code beautifully simple things that are crafted with care
          and creativity
        </p>
        {socialLinks && socialLinks.length > 0 && (
          <div className="flex justify-center items-center space-x-6 mb-8">
            {socialLinks.map((link: any) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.name}
                className="rounded-full w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 transition-colors duration-300 hover:border-blue-600 dark:hover:border-blue-400"
              >
                <img
                  src={link.icon}
                  alt={link.name + " icon"}
                  className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400"
                  draggable={false}
                />
              </a>
            ))}
          </div>
        )}
        <button
          onClick={scrollToContact}
          className="bg-blue-600 text-white font-bold py-3 px-8 rounded-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/20"
        >
          Get In Touch
        </button>
      </div>
    </section>
  );
};

export default Hero;
