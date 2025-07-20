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
import LazySection from "@/components/LazySection";

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
        <LazySection minHeight="400px">
          <Skills />
        </LazySection>
        <LazySection minHeight="400px">
          <ExperienceTimeline />
        </LazySection>
        <LazySection minHeight="400px">
          <EducationTimeline />
        </LazySection>
        <LazySection minHeight="400px">
          <Projects />
        </LazySection>
        <LazySection minHeight="400px">
          <Contact />
        </LazySection>
      </main>
    </Layout>
  );
};

export default Index;
