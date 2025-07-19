import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useScrollToTop = (smooth: boolean = true, delay: number = 0) => {
  const location = useLocation();

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: smooth ? "smooth" : "auto",
      });
    };

    if (delay > 0) {
      const timer = setTimeout(scrollToTop, delay);
      return () => clearTimeout(timer);
    } else {
      scrollToTop();
    }
  }, [location.pathname, smooth, delay]);
};
