/**
 * Componente Input
 * Campo de entrada de texto para formulários
 */
import React, { forwardRef, InputHTMLAttributes } from 'react';
import { FormControl, FormControlProps } from './FormControl';
import { cn } from '../../utils/cn';
import { ValidationError } from './validation';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
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
   * Classes adicionais para o input
   */
  inputClassName?: string;
  
  /**
   * Ícone à esquerda do input
   */
  leftIcon?: React.ReactNode;
  
  /**
   * Ícone à direita do input
   */
  rightIcon?: React.ReactNode;
  
  /**
   * Tamanho do input
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Se o campo está em estado de carregamento
   */
  loading?: boolean;
  
  /**
   * Função chamada quando o valor é alterado
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  
  /**
   * Função chamada quando o campo perde o foco
   */
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  
  /**
   * Props adicionais para o componente FormControl
   */
  formControlProps?: Omit<FormControlProps, 'errors' | 'name' | 'label' | 'required' | 'helperText' | 'loading'>;
}

/**
 * Componente de input para formulários
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({
    id,
    name,
    label,
    helperText,
    required = false,
    disabled = false,
    errors = [],
    className,
    inputClassName,
    leftIcon,
    rightIcon,
    size = 'md',
    loading = false,
    onChange,
    onBlur,
    formControlProps,
    ...rest
  }, ref) => {
    // Determina se o input tem erro de validação
    const hasError = errors && errors.length > 0;
    
    // Classes para diferentes tamanhos
    const sizeClasses = {
      sm: 'py-1.5 px-2 text-xs',
      md: 'py-2 px-3 text-sm',
      lg: 'py-2.5 px-4 text-base',
    };
    
    // Adiciona padding adicional se tiver ícones
    const iconPadding = {
      left: leftIcon ? { sm: 'pl-7', md: 'pl-9', lg: 'pl-10' } : {},
      right: rightIcon ? { sm: 'pr-7', md: 'pr-9', lg: 'pr-10' } : {},
    };
    
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
        {...formControlProps}
      >
        <div className="relative">
          {/* Ícone esquerdo */}
          {leftIcon && (
            <div className={cn(
              'absolute inset-y-0 left-0 flex items-center pl-3',
              disabled ? 'text-gray-400' : 'text-gray-500'
            )}>
              {leftIcon}
            </div>
          )}
          
          {/* Input */}
          <input
            ref={ref}
            id={id || name}
            name={name}
            disabled={disabled || loading}
            required={required}
            className={cn(
              'input-field',
              hasError ? 'border-error text-error focus:ring-error/50' : '',
              disabled && 'bg-gray-100 text-gray-500 cursor-not-allowed',
              sizeClasses[size],
              leftIcon && iconPadding.left[size],
              rightIcon && iconPadding.right[size],
              inputClassName
            )}
            onChange={onChange}
            onBlur={onBlur}
            {...rest}
          />
          
          {/* Ícone direito */}
          {rightIcon && !loading && (
            <div className={cn(
              'absolute inset-y-0 right-0 flex items-center pr-3',
              disabled ? 'text-gray-400' : 'text-gray-500'
            )}>
              {rightIcon}
            </div>
          )}
        </div>
      </FormControl>
    );
  }
);

Input.displayName = 'Input'; 