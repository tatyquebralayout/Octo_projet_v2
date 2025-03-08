import React from 'react';
import { cn } from '../../../utils/cn';
import AccessibleMotion from '../AccessibleMotion';
import { colorPalette } from '../../tokens';

export type EmptySize = 'sm' | 'md' | 'lg';
export type EmptyVariant = 'basic' | 'card' | 'page';

export interface EmptyProps {
  /** Título para o estado vazio */
  title?: string;
  /** Mensagem descritiva */
  message: string;
  /** Tamanho do componente */
  size?: EmptySize;
  /** Variante visual do componente */
  variant?: EmptyVariant;
  /** Ação primária */
  action?: React.ReactNode;
  /** Ação secundária */
  secondaryAction?: React.ReactNode;
  /** Classes CSS adicionais */
  className?: string;
  /** Ícone ou imagem personalizada */
  icon?: React.ReactNode;
  /** Indicação se o componente deve ser centralizado */
  centered?: boolean;
}

/**
 * Componente para estados vazios (no-content) reutilizável com múltiplas variantes e tamanhos.
 * Pode exibir uma mensagem com opção de ações.
 */
export const Empty: React.FC<EmptyProps> = ({
  title,
  message,
  size = 'md',
  variant = 'basic',
  action,
  secondaryAction,
  className,
  icon,
  centered = false,
}) => {
  // Classes para diferentes tamanhos
  const sizeClasses = {
    sm: {
      container: 'py-4 px-3',
      icon: 'w-10 h-10',
      title: 'text-sm font-medium',
      message: 'text-xs',
    },
    md: {
      container: 'py-6 px-4',
      icon: 'w-16 h-16',
      title: 'text-base font-medium',
      message: 'text-sm',
    },
    lg: {
      container: 'py-10 px-6',
      icon: 'w-24 h-24',
      title: 'text-lg font-medium',
      message: 'text-base',
    },
  };

  // Classes para diferentes variantes
  const variantClasses = {
    basic: 'bg-gray-50 rounded-lg',
    card: 'bg-white border border-gray-200 shadow-sm rounded-lg',
    page: 'bg-transparent',
  };

  // Renderizar ícone padrão ou personalizado
  const renderIcon = () => {
    if (icon) return icon;

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke={colorPalette.gray[400]}
        className={sizeClasses[size].icon}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
        />
      </svg>
    );
  };

  // Animação de entrada
  const containerVariants = {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0 },
  };

  // Classes do container
  const containerClasses = cn(
    'flex flex-col text-center',
    variantClasses[variant],
    sizeClasses[size].container,
    {
      'items-center justify-center': true,
      'min-h-[200px]': variant !== 'basic',
      'mx-auto': centered,
      'max-w-md': variant === 'card' && centered,
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
      <div className="mb-4">
        {renderIcon()}
      </div>
      <div className="space-y-2">
        {title && (
          <h4 className={cn(
            sizeClasses[size].title,
            'text-gray-800'
          )}>
            {title}
          </h4>
        )}
        <p className={cn(
          sizeClasses[size].message,
          'text-gray-500 max-w-sm mx-auto'
        )}>
          {message}
        </p>
      </div>
      {(action || secondaryAction) && (
        <div className={cn(
          'mt-4 flex flex-col sm:flex-row gap-2 justify-center',
          size === 'sm' ? 'text-sm' : 'text-base'
        )}>
          {action}
          {secondaryAction}
        </div>
      )}
    </AccessibleMotion>
  );
};

export default Empty; 