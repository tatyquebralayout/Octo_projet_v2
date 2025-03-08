import React from 'react';
import { cn } from '../../utils/cn';
import { shadows } from '../../tokens';

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
  onClick,
  onKeyDown,
  tabIndex,
  role,
  ...props
}, ref) => {
  const baseStyles = cn(
    'rounded-lg',
    'transition-all duration-200',
    {
      'cursor-pointer hover:transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary-500': interactive,
    }
  );

  // Gerenciar interação via teclado para cards interativos
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (interactive && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick?.(e as unknown as React.MouseEvent<HTMLDivElement>);
    }
    onKeyDown?.(e);
  };

  // Determinar as props de acessibilidade com base em se o card é interativo
  const accessibilityProps = interactive ? {
    role: role || 'button',
    tabIndex: tabIndex ?? 0, // Permitir foco por teclado se interativo
    onKeyDown: handleKeyDown,
    'aria-pressed': undefined, // Remover aria-pressed pois não é um toggle
  } : {};

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
      {...accessibilityProps}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';

export default Card;