import { usePersonalInfo } from '@/hooks/usePersonalInfo';
import AnimatedSection from './AnimatedSection';

const About = () => {
    const { data: personalInfo, isLoading: loading } = usePersonalInfo();

    if (loading) {
        return (
            <section className="py-20 sm:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-blue-600 rounded-lg shadow-xl p-8 md:p-12 lg:p-16 animate-pulse">
                        <div className="max-w-3xl mx-auto text-center">
                            <div className="h-12 bg-blue-500 rounded mb-4 max-w-xs mx-auto"></div>
                            <div className="h-6 bg-blue-500 rounded mb-4"></div>
                            <div className="h-6 bg-blue-500 rounded"></div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <AnimatedSection id="about" className="py-20 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-600 dark:to-blue-800 rounded-lg shadow-xl p-8 md:p-12 lg:p-16">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">About Me</h2>
                        <p className="text-lg text-blue-100 leading-relaxed">
                            {personalInfo?.bio || ""}
                        </p>
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
};

export default About;