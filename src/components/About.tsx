import { useHeroInfo } from "@/hooks/useHeroInfo";
import AnimatedSection from "./AnimatedSection";

const defaultBio = "I’m a dedicated developer with a deep interest in using technology to build smart, effective solutions and designing user experiences that are both beautiful and easy to use";

const About = () => {
  const { data } = useHeroInfo({ enabled: true });
  const personalInfo = data?.personalInfo;

  return (
    <AnimatedSection id="about" className="py-20 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-600 dark:to-blue-800 rounded-lg shadow-xl p-8 md:p-12 lg:p-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              About Me
            </h2>
            <p className="text-lg text-blue-100 leading-relaxed">
              {personalInfo?.bio || defaultBio}
            </p>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default About;
