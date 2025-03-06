import React from 'react';
import { cn } from '../../utils/cn';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  hero?: boolean;
}

const Section: React.FC<SectionProps> = ({ children, className = '', hero = false }) => {
  return (
    <section 
      className={cn(
        'w-full',
        // Hero tem altura fixa de 563px
        hero ? 'h-[563px]' : 'min-h-0',
        // Adiciona margem para compensar o header fixo
        !hero && 'mt-14 md:mt-16',
        className
      )}
    >
      <div className="container mx-auto px-4 md:px-6 h-full">
        <div className="container-narrow h-full">
          {children}
        </div>
      </div>
    </section>
  );
};

export default Section;