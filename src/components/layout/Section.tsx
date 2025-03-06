import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  hero?: boolean;
}

export const Section: React.FC<SectionProps> = ({ children, className = '', hero = false }) => {
  const baseClass = hero ? 'section-hero' : 'section-content';
  
  return (
    <section className={`${baseClass} ${className}`}>
      <div className="container mx-auto px-6">
        <div className="container-narrow">
          {children}
        </div>
      </div>
    </section>
  );
};