import React from 'react';

interface IconContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const IconContainer: React.FC<IconContainerProps> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={`icon-container ${className}`}>
      {children}
    </div>
  );
};