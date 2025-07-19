import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import ProjectDetail from "@/pages/ProjectDetail";
import NotFound from "@/pages/NotFound";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/project/:slug" element={<ProjectDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
