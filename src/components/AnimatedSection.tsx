import React from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface AnimatedSectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ id, children, className = '' }) => {
    const [ref, isVisible] = useScrollAnimation();
    return (
        <section 
            id={id} 
            ref={ref} 
            className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`}
        >
            {children}
        </section>
    );
};

export default AnimatedSection;