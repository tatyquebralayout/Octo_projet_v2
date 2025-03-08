import React from 'react';
import { cn } from '../../utils/cn';

export type CardVariant = 'primary' | 'secondary' | 'accent';

interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  className?: string;
  title?: React.ReactNode;
  footer?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'primary',
  className = '',
  title,
  footer
}) => {
  // Classes base usando a classe .card do Design System
  const baseClasses = 'card';

  // Classes específicas para cada variante usando as classes do Design System
  const variantClasses = {
    primary: 'card-primary',
    secondary: 'card-secondary',
    accent: 'card-accent',
  }[variant];

  // Combinando todas as classes
  const allClasses = cn(baseClasses, variantClasses, className);

  return (
    <div className={allClasses}>
      {title && (
        <div className="card-header">
          {typeof title === 'string' ? <h3 className="text-h3">{title}</h3> : title}
        </div>
      )}
      <div className="card-body">
        {children}
      </div>
      {footer && (
        <div className="card-footer">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;