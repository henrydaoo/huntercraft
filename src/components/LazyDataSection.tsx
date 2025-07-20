i import { Suspense, lazy, useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface LazyDataSectionProps {
  children: React.ReactNode;
  minHeight?: string;
}

const LazyDataSection = ({ children, minHeight = "400px" }: LazyDataSectionProps) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
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
