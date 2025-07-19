import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import EducationTimeline from "@/components/EducationTimeline";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import { useScrollToTop } from "@/hooks/useScrollToTop";

const Index = () => {
  const location = useLocation();

  useScrollToTop(true, 100);

  useEffect(() => {
    if (location.state?.scrollTo) {
      const targetSection = location.state.scrollTo;
      window.history.replaceState({}, document.title);

      setTimeout(() => {
        const element = document.getElementById(targetSection);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 300);
    }
  }, [location]);

  return (
    <Layout>
      <main>
        <Hero />
        <About />
        <Skills />
        <ExperienceTimeline />
        <EducationTimeline />
        <Projects />
        <Contact />
      </main>
    </Layout>
  );
};

export default Index;
