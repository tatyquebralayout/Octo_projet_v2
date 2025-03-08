/**
 * Componente FormControl
 * Encapsula a estrutura comum para controles de formulário
 */
import React from 'react';
import { cn } from '../../utils/cn';
import { ValidationError } from './validation';

export interface FormControlProps {
  /**
   * ID único para o campo (usado para associar label e mensagens de erro)
   */
  id?: string;
  
  /**
   * Nome do campo (utilizado em formulários)
   */
  name?: string;
  
  /**
   * Texto do label do campo
   */
  label?: string;
  
  /**
   * Indica se o campo é obrigatório
   */
  required?: boolean;
  
  /**
   * Indica se o campo está desabilitado
   */
  disabled?: boolean;
  
  /**
   * Classes CSS adicionais para o container
   */
  className?: string;
  
  /**
   * Erros de validação do campo
   */
  errors?: ValidationError[];
  
  /**
   * Texto de ajuda para o campo
   */
  helperText?: string;
  
  /**
   * Classes CSS adicionais para o label
   */
  labelClassName?: string;
  
  /**
   * Classes CSS adicionais para o container de erros/helper
   */
  messageClassName?: string;
  
  /**
   * Se o campo está em estado de carregamento
   */
  loading?: boolean;
  
  /**
   * Conteúdo do formulário (geralmente um input, select, etc)
   */
  children: React.ReactNode;
  
  /**
   * Se o texto de ajuda deve ser exibido mesmo com erro
   */
  showHelperWithError?: boolean;
  
  /**
   * Ícone adicional à esquerda do label
   */
  labelIcon?: React.ReactNode;
  
  /**
   * Conteúdo adicional à direita do label
   */
  labelAction?: React.ReactNode;
  
  /**
   * Se o erro deve ser mostrado
   */
  showError?: boolean;
}

/**
 * Componente que encapsula a estrutura comum para controles de formulário
 */
export const FormControl: React.FC<FormControlProps> = ({
  id,
  name,
  label,
  required = false,
  disabled = false,
  className,
  errors = [],
  helperText,
  labelClassName,
  messageClassName,
  loading = false,
  children,
  showHelperWithError = false,
  labelIcon,
  labelAction,
  showError = true,
}) => {
  const errorMessage = errors && errors.length > 0 ? errors[0].message : undefined;
  const hasError = !!errorMessage && showError;
  const showHelper = helperText && (!hasError || showHelperWithError);
  
  return (
    <div className={cn('mb-4', className)}>
      {label && (
        <div className="flex justify-between items-center mb-1">
          <label 
            htmlFor={id || name}
            className={cn(
              'block text-sm font-medium',
              'text-gray-700',
              disabled && 'text-gray-400',
              labelClassName
            )}
          >
            <span className="flex items-center gap-1">
              {labelIcon && <span className="mr-1">{labelIcon}</span>}
              {label}
              {required && <span className="text-error ml-0.5">*</span>}
            </span>
          </label>
          
          {labelAction && (
            <div className="text-sm text-gray-500">
              {labelAction}
            </div>
          )}
        </div>
      )}
      
      <div className={cn(
        'relative',
        loading && 'opacity-70'
      )}>
        {children}
        
        {loading && (
          <div className="absolute inset-y-0 right-3 flex items-center">
            <div className="animate-spin h-4 w-4 border-2 border-primary-400 rounded-full border-t-transparent" />
          </div>
        )}
      </div>
      
      {(hasError || showHelper) && (
        <div className={cn(
          'mt-1 text-xs',
          messageClassName
        )}>
          {hasError && (
            <p className="text-error">{errorMessage}</p>
          )}
          
          {showHelper && (
            <p className={cn(
              'text-gray-500',
              hasError && 'mt-1'
            )}>
              {helperText}
            </p>
          )}
        </div>
      )}
    </div>
  );
}; 