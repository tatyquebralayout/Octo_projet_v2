import React from 'react';
import { cn } from '../../utils/cn';

export type CardVariant = 'primary' | 'secondary' | 'accent';
export type CardSize = 'sm' | 'md' | 'lg';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: CardVariant;
  size?: CardSize;
  elevation?: 1 | 2 | 3;
  withHoverEffect?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, variant = 'primary', size = 'md', elevation = 1, withHoverEffect = false, className = '', ...props }, ref) => {
    // Classes base usando a classe .card do Design System
    const baseClasses = cn(
      'card',
      {
        'hover-lift': withHoverEffect,
      }
    );

    // Classes específicas para cada variante usando as classes do Design System
    const variantClasses = {
      primary: variant === 'primary' ? 'card-primary' : '',
      secondary: variant === 'secondary' ? 'card-secondary' : '',
      accent: variant === 'accent' ? 'card-accent' : '',
    }[variant];

    // Classes para elevação usando as classes do Design System
    const elevationClasses = {
      1: 'md3-elevation-1',
      2: 'md3-elevation-2',
      3: 'md3-elevation-3',
    }[elevation];

    // Classes para tamanho
    const sizeClasses = {
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6',
    }[size];

    // Combinando todas as classes
    const allClasses = cn(baseClasses, variantClasses, elevationClasses, sizeClasses, className);

    return (
      <div ref={ref} className={allClasses} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;