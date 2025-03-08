/**
 * Componente Textarea
 * Campo de texto multilinha para formulários
 */
import React, { forwardRef, TextareaHTMLAttributes } from 'react';
import { FormControl, FormControlProps } from './FormControl';
import { cn } from '../../utils/cn';
import { ValidationError } from './validation';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * Nome do campo
   */
  name: string;
  
  /**
   * Label do campo
   */
  label?: string;
  
  /**
   * Texto auxiliar do campo
   */
  helperText?: string;
  
  /**
   * Se o campo é obrigatório
   */
  required?: boolean;
  
  /**
   * Erros de validação
   */
  errors?: ValidationError[];
  
  /**
   * Classes adicionais para o textarea
   */
  textareaClassName?: string;
  
  /**
   * Se o campo está em estado de carregamento
   */
  loading?: boolean;
  
  /**
   * Número máximo de caracteres permitidos
   */
  maxLength?: number;
  
  /**
   * Se deve mostrar o contador de caracteres
   */
  showCharCount?: boolean;
  
  /**
   * Altura do textarea
   */
  rows?: number;
  
  /**
   * Props adicionais para o componente FormControl
   */
  formControlProps?: Omit<FormControlProps, 'errors' | 'name' | 'label' | 'required' | 'helperText' | 'loading'>;
}

/**
 * Componente de textarea para formulários
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({
    id,
    name,
    label,
    helperText,
    required = false,
    disabled = false,
    errors = [],
    className,
    textareaClassName,
    loading = false,
    maxLength,
    showCharCount = false,
    rows = 3,
    onChange,
    onBlur,
    value = '',
    formControlProps,
    ...rest
  }, ref) => {
    // Determina se o input tem erro de validação
    const hasError = errors && errors.length > 0;
    
    // Informações do contador de caracteres
    const charCount = typeof value === 'string' ? value.length : 0;
    const showCount = showCharCount || !!maxLength;
    
    return (
      <FormControl
        id={id}
        name={name}
        label={label}
        required={required}
        disabled={disabled}
        errors={errors}
        helperText={helperText}
        loading={loading}
        className={className}
        labelAction={showCount && (
          <span className="text-xs text-gray-500">
            {charCount}{maxLength ? `/${maxLength}` : ''}
          </span>
        )}
        {...formControlProps}
      >
        <textarea
          ref={ref}
          id={id || name}
          name={name}
          rows={rows}
          disabled={disabled || loading}
          required={required}
          maxLength={maxLength}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={cn(
            'block w-full rounded-md shadow-sm',
            'focus:ring-2 focus:ring-inset focus:outline-none',
            hasError 
              ? 'border-error text-error focus:ring-error/50' 
              : 'border-gray-300 focus:ring-primary-400/50',
            disabled && 'bg-gray-100 text-gray-500 cursor-not-allowed',
            'resize-y py-2 px-3 text-sm',
            textareaClassName
          )}
          {...rest}
        />
      </FormControl>
    );
  }
);

Textarea.displayName = 'Textarea'; 