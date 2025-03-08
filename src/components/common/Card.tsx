import React from 'react';

type CardVariant = 'primary' | 'secondary' | 'elevated' | 'outline';
type PaddingSize = 'none' | 'small' | 'normal' | 'large';

interface CardProps {
  variant?: CardVariant;
  padding?: PaddingSize;
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
  onClick?: () => void;
}

/**
 * Componente Card reutilizável com diferentes variantes e tamanhos de padding
 */
const Card: React.FC<CardProps> = ({
  variant = 'primary',
  padding = 'normal',
  children,
  className = '',
  interactive = false,
  onClick
}) => {
  // Mapeamento de variantes para classes
  const variantClasses = {
    primary: 'bg-white border border-gray-200',
    secondary: 'bg-gray-50 border border-gray-200',
    elevated: 'bg-white border border-gray-200 shadow-md',
    outline: 'bg-transparent border border-gray-300'
  };

  // Mapeamento de padding para classes
  const paddingClasses = {
    none: 'p-0',
    small: 'p-2',
    normal: 'p-4',
    large: 'p-6'
  };

  // Classes interativas
  const interactiveClasses = interactive
    ? 'cursor-pointer hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50'
    : '';

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick?.();
    }
  };

  return (
    <div
      className={`rounded-lg ${variantClasses[variant]} ${paddingClasses[padding]} ${interactiveClasses} ${className}`}
      onClick={interactive ? onClick : undefined}
      {...(interactive ? {
        role: 'button',
        tabIndex: 0,
        onKeyDown: handleKeyDown
      } : {})}
    >
      {children}
    </div>
  );
};

export default Card; 