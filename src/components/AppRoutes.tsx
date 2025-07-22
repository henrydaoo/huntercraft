import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

const Index = lazy(() => import("@/pages/Index"));
const ProjectDetail = lazy(() => import("@/pages/ProjectDetail"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={
        <Suspense fallback={null}>
          <Index />
        </Suspense>
      } />
      <Route path="/project/:slug" element={
        <Suspense fallback={null}>
          <ProjectDetail />
        </Suspense>
      } />
      <Route path="*" element={
        <Suspense fallback={null}>
          <NotFound />
        </Suspense>
      } />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
