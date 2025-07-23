import AnimatedSection from "./AnimatedSection";

const About = () => {
  return (
    <AnimatedSection id="about" className="py-20 sm:py-24 duration-0">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-600 dark:to-blue-800 rounded-lg shadow-xl p-8 md:p-12 lg:p-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              About Us
            </h2>
            <p className="text-lg text-blue-100 leading-relaxed">
              Hunter is a developer-first platform that empowers teams to build
              better software through smart diagnostics and real-time insights.
            </p>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default About;
