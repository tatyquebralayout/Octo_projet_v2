/**
 * Componente FormControl
 * Container para campos de formulário com label, mensagens de erro e texto auxiliar
 */
import React from 'react';
import { cn } from '../../utils/cn';
import { ValidationError } from './validation';

export interface FormControlProps {
  /**
   * ID do campo associado
   */
  id?: string;

  /**
   * Nome do campo
   */
  name: string;

  /**
   * Label do campo
   */
  label?: string;

  /**
   * Se o campo é obrigatório
   */
  required?: boolean;

  /**
   * Se o campo está desabilitado
   */
  disabled?: boolean;

  /**
   * Texto auxiliar do campo
   */
  helperText?: string;

  /**
   * Erros de validação
   */
  errors?: ValidationError[];

  /**
   * Se o campo está em estado de carregamento
   */
  loading?: boolean;

  /**
   * Classes adicionais para o container
   */
  className?: string;

  /**
   * Conteúdo do FormControl
   */
  children: React.ReactNode;
}

/**
 * Container para campos de formulário
 */
export const FormControl: React.FC<FormControlProps> = ({
  id,
  name,
  label,
  required = false,
  disabled = false,
  helperText,
  errors = [],
  loading = false,
  className,
  children,
}) => {
  // Gera um ID para o campo se não for fornecido
  const fieldId = id || name;
  
  // Verifica se há erros de validação
  const hasError = errors && errors.length > 0;
  
  // Mensagem de erro a ser exibida
  const errorMessage = hasError ? errors[0].message : '';

  return (
    <div className={cn('form-group', className)}>
      {/* Label */}
      {label && (
        <label 
          htmlFor={fieldId} 
          className={cn(
            'form-label',
            disabled && 'text-gray-400'
          )}
        >
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}

      {/* Conteúdo (input, select, etc.) */}
      {children}

      {/* Mensagem de erro */}
      {hasError && errorMessage && (
        <p className="text-error mt-1 text-sm">{errorMessage}</p>
      )}

      {/* Texto auxiliar */}
      {helperText && !hasError && (
        <p className="text-muted mt-1 text-sm">{helperText}</p>
      )}
    </div>
  );
};

FormControl.displayName = 'FormControl'; 