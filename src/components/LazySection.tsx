import { Suspense } from "react";
import { useInView } from "react-intersection-observer";

interface LazySectionProps {
  children: React.ReactNode;
  threshold?: number;
  minHeight?: string;
}

const LazySection = ({ children, threshold = 0.1, minHeight = "200px" }: LazySectionProps) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold });

  return (
    <div ref={ref} style={{ minHeight }}>
      {inView ? <Suspense fallback={null}>{children}</Suspense> : null}
    </div>
  );
};

export default LazySection;
