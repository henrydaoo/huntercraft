import { lazy, Suspense } from "react";
import { ThemeProvider } from "@/contexts/ThemeContext";
const Toaster = lazy(() =>
  import("@/components/ui/sonner").then((mod) => ({ default: mod.Toaster }))
);
const AppRoutes = lazy(() => import("@/components/AppRoutes"));
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

const App = () => (
  <>
    <ThemeProvider>
      <Suspense fallback={null}>
        <Toaster />
      </Suspense>
      <Suspense fallback={null}>
        <AppRoutes />
      </Suspense>
    </ThemeProvider>
    {import.meta.env.PROD && (
      <Suspense fallback={null}>
        <SpeedInsights />
        <Analytics />
      </Suspense>
    )}
  </>
);

export default App;
