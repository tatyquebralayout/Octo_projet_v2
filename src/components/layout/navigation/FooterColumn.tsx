import React from 'react';

interface FooterColumnProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  titleId?: string;
}

const FooterColumn: React.FC<FooterColumnProps> = ({ 
  title, 
  children, 
  className = '',
  titleId
}) => {
  return (
    <div className={`footer-column ${className}`}>
      <h3 
        className="text-h4 text-white/90 mb-4" 
        id={titleId}
      >
        {title}
      </h3>
      {children}
    </div>
  );
};

export default FooterColumn; 