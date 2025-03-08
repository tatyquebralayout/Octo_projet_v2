import React from 'react';
import { cn } from '../../../utils/cn';
import { colorPalette, semanticColors } from '../../tokens';
import AccessibleMotion from '../AccessibleMotion';

export type ErrorSize = 'sm' | 'md' | 'lg';
export type ErrorVariant = 'basic' | 'card' | 'inline' | 'banner';

export interface ErrorProps {
  /** Título do erro */
  title?: string;
  /** Mensagem de erro */
  message: string;
  /** Tamanho do componente */
  size?: ErrorSize;
  /** Variante visual do componente */
  variant?: ErrorVariant;
  /** Função de retry opcional */
  onRetry?: () => void;
  /** Texto do botão de retry */
  retryText?: string;
  /** Classes CSS adicionais */
  className?: string;
  /** Ícone personalizado */
  icon?: React.ReactNode;
}

/**
 * Componente de erro reutilizável com múltiplas variantes e tamanhos.
 * Pode exibir uma mensagem de erro com opção de retry.
 */
export const Error: React.FC<ErrorProps> = ({
  title = 'Ocorreu um erro',
  message,
  size = 'md',
  variant = 'basic',
  onRetry,
  retryText = 'Tentar novamente',
  className,
  icon,
}) => {
  // Classes para diferentes tamanhos
  const sizeClasses = {
    sm: {
      container: 'p-2 text-sm',
      icon: 'w-4 h-4',
      title: 'text-sm font-medium',
      message: 'text-xs',
      button: 'text-xs px-2 py-1',
    },
    md: {
      container: 'p-4 text-base',
      icon: 'w-6 h-6',
      title: 'text-base font-medium',
      message: 'text-sm',
      button: 'text-sm px-3 py-1.5',
    },
    lg: {
      container: 'p-6 text-lg',
      icon: 'w-8 h-8',
      title: 'text-lg font-medium',
      message: 'text-base',
      button: 'text-base px-4 py-2',
    },
  };

  // Classes para diferentes variantes
  const variantClasses = {
    basic: 'bg-red-50 text-red-700 rounded-lg',
    card: 'bg-white border border-red-200 shadow-sm rounded-lg',
    inline: 'flex items-center bg-transparent text-red-600',
    banner: 'w-full bg-red-100 border-l-4 border-red-500',
  };

  // Renderizar ícone padrão ou personalizado
  const renderIcon = () => {
    if (icon) return icon;

    if (variant === 'inline') {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={sizeClasses[size].icon}
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      );
    }

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={sizeClasses[size].icon}
      >
        <path
          fillRule="evenodd"
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-2h2v2h-2zm0-10v6h2V7h-2z"
          clipRule="evenodd"
        />
      </svg>
    );
  };

  // Animação de entrada
  const containerVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0 },
  };

  // Classes do container
  const containerClasses = cn(
    'flex',
    variantClasses[variant],
    sizeClasses[size].container,
    {
      'flex-col': variant !== 'inline',
      'items-center': variant === 'inline',
      'space-y-2': variant !== 'inline',
      'space-x-2': variant === 'inline',
    },
    className
  );

  return (
    <AccessibleMotion
      initial="initial"
      animate="animate"
      exit="exit"
      variants={containerVariants}
      className={containerClasses}
    >
      {renderIcon()}
      <div className={variant === 'inline' ? 'flex-1' : ''}>
        {(title && variant !== 'inline') && (
          <h4 className={sizeClasses[size].title}>{title}</h4>
        )}
        <p className={cn(
          sizeClasses[size].message,
          variant === 'inline' ? 'mb-0' : 'mb-2'
        )}>
          {message}
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className={cn(
              'mt-2 rounded-md',
              'bg-white text-red-600 border border-red-300',
              'hover:bg-red-50',
              'focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-red-500',
              'transition-colors',
              sizeClasses[size].button
            )}
          >
            {retryText}
          </button>
        )}
      </div>
    </AccessibleMotion>
  );
};

export default Error; 