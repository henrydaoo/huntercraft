import React from 'react';

interface IconProps {
  path: string;
  className?: string;
  viewBox?: string;
}

const Icon: React.FC<IconProps> = ({ path, className = "w-6 h-6", viewBox = "0 0 24 24" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox} fill="currentColor" className={className}>
    <path d={path} />
  </svg>
);

export default Icon;