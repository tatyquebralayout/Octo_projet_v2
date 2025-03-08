import React from 'react';
import { cn } from '../../../utils/cn';
import AccessibleMotion from '../AccessibleMotion';
import { colorPalette } from '../../tokens';

export type LoadingSize = 'sm' | 'md' | 'lg';
export type LoadingVariant = 'spinner' | 'dots' | 'pulse';

export interface LoadingProps {
  /** Tamanho do componente de loading */
  size?: LoadingSize;
  /** Variante visual do componente */
  variant?: LoadingVariant;
  /** Texto para acessibilidade (leitores de tela) */
  accessibilityLabel?: string;
  /** Indicação de fullpage (centraliza na tela) */
  fullPage?: boolean;
  /** Indicação de overlay (adiciona fundo translúcido) */
  overlay?: boolean;
  /** Elemento de texto para exibir abaixo do indicador de loading */
  label?: React.ReactNode;
  /** Classes CSS adicionais */
  className?: string;
  /** Cor personalizada */
  color?: string;
}

/**
 * Componente de loading reutilizável com múltiplas variantes e tamanhos.
 * Suporta acessibilidade e diferentes estilos visuais.
 */
export const Loading: React.FC<LoadingProps> = ({
  size = 'md',
  variant = 'spinner',
  accessibilityLabel = 'Carregando...',
  fullPage = false,
  overlay = false,
  label,
  className,
  color = colorPalette.primary[400],
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const labelSizeClasses = {
    sm: 'text-xs mt-1',
    md: 'text-sm mt-2',
    lg: 'text-base mt-3',
  };

  const wrapperClasses = cn(
    'flex flex-col items-center justify-center',
    {
      'fixed inset-0 z-50': fullPage,
      'bg-white/80 dark:bg-gray-900/80': fullPage && overlay,
    },
    className
  );

  // Variantes para o Framer Motion
  const spinnerVariants = {
    animate: {
      rotate: 360,
      transition: {
        repeat: Infinity,
        duration: 1,
        ease: 'linear',
      },
    },
  };

  const dotsVariants = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const dotVariants = {
    initial: { scale: 0.5, opacity: 0.3 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        repeat: Infinity,
        repeatType: 'reverse' as const,
        duration: 0.5,
      },
    },
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.6, 1, 0.6],
      transition: {
        repeat: Infinity,
        duration: 1.5,
      },
    },
  };

  // Renderização do indicador de loading baseado na variante
  const renderLoadingIndicator = () => {
    switch (variant) {
      case 'spinner':
        return (
          <AccessibleMotion
            animate="animate"
            variants={spinnerVariants}
            className={sizeClasses[size]}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={sizeClasses[size]}
              aria-hidden="true"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke={color}
                strokeWidth="4"
                strokeOpacity="0.25"
              />
              <path
                d="M12 2C6.47715 2 2 6.47715 2 12"
                stroke={color}
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </AccessibleMotion>
        );
      case 'dots':
        return (
          <AccessibleMotion
            animate="animate"
            variants={dotsVariants}
            className={`flex space-x-1 ${sizeClasses[size]}`}
          >
            {[0, 1, 2].map((i) => (
              <AccessibleMotion
                key={i}
                variants={dotVariants}
                initial="initial"
                animate="animate"
                className={cn(
                  'rounded-full',
                  size === 'sm' ? 'w-1.5 h-1.5' : size === 'md' ? 'w-2 h-2' : 'w-3 h-3'
                )}
                style={{ backgroundColor: color }}
              />
            ))}
          </AccessibleMotion>
        );
      case 'pulse':
        return (
          <AccessibleMotion
            animate="animate"
            variants={pulseVariants}
            className={cn(
              'rounded-full',
              sizeClasses[size]
            )}
            style={{ backgroundColor: color }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={wrapperClasses} role="status" aria-live="polite">
      {renderLoadingIndicator()}
      {label && (
        <span className={cn('text-center text-gray-600', labelSizeClasses[size])}>
          {label}
        </span>
      )}
      {/* Texto para leitores de tela */}
      <span className="sr-only">{accessibilityLabel}</span>
    </div>
  );
};

export default Loading; 