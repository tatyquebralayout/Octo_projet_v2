import React from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  description,
  className = '' 
}) => {
  return (
    <div className={`text-center mb-16 ${className}`}>
      <h1 className="text-display text-primary mb-6">{title}</h1>
      {description && (
        <p className="text-body-large text-primary-light max-w-3xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
};