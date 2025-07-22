import React from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";
import AppRoutes from "@/components/AppRoutes";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

const App = () => (
  <>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <AppRoutes />
      </TooltipProvider>
    </ThemeProvider>
    {import.meta.env.PROD && (
      <React.Suspense fallback={null}>
        <SpeedInsights />
        <Analytics />
      </React.Suspense>
    )}
  </>
);

export default App;
