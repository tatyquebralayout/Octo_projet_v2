import React from 'react';
import { cn } from '../../utils/cn';
import { shadows } from '../foundations/tokens';

export type CardVariant = 'elevated' | 'outlined' | 'filled';
export type CardSize = 'sm' | 'md' | 'lg';
export type CardPadding = 'compact' | 'normal' | 'spacious';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  size?: CardSize;
  padding?: CardPadding;
  interactive?: boolean;
  elevation?: keyof typeof shadows;
}

const variantStyles = {
  elevated: cn(
    'bg-white',
    'shadow-md hover:shadow-lg',
    'transition-shadow duration-200'
  ),
  outlined: cn(
    'bg-white',
    'border border-gray-200'
  ),
  filled: cn(
    'bg-gray-50'
  )
} as const;

const sizeStyles = {
  sm: cn('max-w-sm'),
  md: cn('max-w-md'),
  lg: cn('max-w-lg')
} as const;

const paddingStyles = {
  compact: cn('p-2'),
  normal: cn('p-4'),
  spacious: cn('p-6')
} as const;

export const Card = React.forwardRef<HTMLDivElement, CardProps>(({
  variant = 'elevated',
  size,
  padding = 'normal',
  interactive = false,
  elevation,
  children,
  className = '',
  ...props
}, ref) => {
  const baseStyles = cn(
    'rounded-lg',
    'transition-all duration-200',
    {
      'cursor-pointer hover:transform hover:scale-[1.02]': interactive,
    }
  );

  return (
    <div
      ref={ref}
      className={cn(
        baseStyles,
        variantStyles[variant],
        size && sizeStyles[size],
        paddingStyles[padding],
        elevation && `shadow-${elevation}`,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';

export default Card;