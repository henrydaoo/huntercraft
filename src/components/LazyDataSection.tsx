import { Suspense, lazy, useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface LazyDataSectionProps {
  children: React.ReactNode;
  minHeight?: string;
  threshold?: number;
}

const LazyDataSection = ({ children, minHeight = "400px", threshold = 0.1 }: LazyDataSectionProps) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold });
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (inView) setShow(true);
  }, [inView]);

  return (
    <div ref={ref} style={{ minHeight }}>
      {show ? <Suspense fallback={null}>{children}</Suspense> : null}
    </div>
  );
};

export default LazyDataSection;
