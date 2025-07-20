import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import About from "@/components/About";
import { Suspense, lazy } from "react";
const Skills = lazy(() => import("@/components/Skills"));
const ExperienceTimeline = lazy(
  () => import("@/components/ExperienceTimeline")
);
const EducationTimeline = lazy(() => import("@/components/EducationTimeline"));
const Projects = lazy(() => import("@/components/Projects"));
const Contact = lazy(() => import("@/components/Contact"));
import { useScrollToTop } from "@/hooks/useScrollToTop";
import LazyDataSection from "@/components/LazyDataSection";

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
        <LazyDataSection minHeight="400px">
          <Hero />
        </LazyDataSection>
        <LazyDataSection minHeight="400px">
          <About />
        </LazyDataSection>
        <LazyDataSection minHeight="400px">
          <Skills />
        </LazyDataSection>
        <LazyDataSection minHeight="400px">
          <ExperienceTimeline />
        </LazyDataSection>
        <LazyDataSection minHeight="400px">
          <EducationTimeline />
        </LazyDataSection>
        <LazyDataSection minHeight="400px">
          <Projects />
        </LazyDataSection>
        <LazyDataSection minHeight="400px">
          <Contact />
        </LazyDataSection>
      </main>
    </Layout>
  );
};

export default Index;
