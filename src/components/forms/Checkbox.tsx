/**
 * Componente Checkbox
 * Campo de marcação para formulários
 */
import React, { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import { ValidationError } from './validation';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /**
   * Nome do campo
   */
  name: string;
  
  /**
   * Label do checkbox
   */
  label?: React.ReactNode;
  
  /**
   * Texto auxiliar do campo
   */
  helperText?: string;
  
  /**
   * Se o campo é obrigatório
   */
  required?: boolean;
  
  /**
   * Se o checkbox está marcado
   */
  checked?: boolean;
  
  /**
   * Erros de validação
   */
  errors?: ValidationError[];
  
  /**
   * Tamanho do checkbox
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Se o checkbox pode ter estado indeterminado
   */
  indeterminate?: boolean;
}

/**
 * Componente de checkbox para formulários
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({
    id,
    name,
    label,
    helperText,
    required = false,
    disabled = false,
    checked = false,
    errors = [],
    className,
    size = 'md',
    indeterminate = false,
    onChange,
    onBlur,
    ...rest
  }, ref) => {
    // Referência interna para manipular o estado indeterminado
    const internalRef = React.useRef<HTMLInputElement>(null);
    
    // Mescla a ref interna com a ref externa
    const handleRef = (el: HTMLInputElement | null) => {
      internalRef.current = el;
      
      if (typeof ref === 'function') {
        ref(el);
      } else if (ref) {
        ref.current = el;
      }
    };
    
    // Atualiza o estado indeterminado
    React.useEffect(() => {
      if (internalRef.current) {
        internalRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);
    
    // Determina se tem erro de validação
    const hasError = errors && errors.length > 0;
    
    // Classes para diferentes tamanhos
    const sizeClasses = {
      sm: {
        container: 'items-center',
        checkbox: 'h-3 w-3',
        label: 'text-xs ml-2',
      },
      md: {
        container: 'items-center',
        checkbox: 'h-4 w-4',
        label: 'text-sm ml-2',
      },
      lg: {
        container: 'items-center',
        checkbox: 'h-5 w-5',
        label: 'text-base ml-3',
      },
    };
    
    return (
      <div className={cn('mb-2', className)}>
        <div className={cn('flex', sizeClasses[size].container)}>
          <input
            ref={handleRef}
            type="checkbox"
            id={id || name}
            name={name}
            checked={checked}
            required={required}
            disabled={disabled}
            onChange={onChange}
            onBlur={onBlur}
            className={cn(
              'rounded border-gray-300',
              'text-primary-400 focus:ring-primary-400/50',
              hasError && 'border-error focus:ring-error/50',
              disabled && 'bg-gray-100 text-gray-400 cursor-not-allowed',
              sizeClasses[size].checkbox
            )}
            aria-invalid={hasError ? 'true' : 'false'}
            {...rest}
          />
          
          {label && (
            <label
              htmlFor={id || name}
              className={cn(
                'font-medium',
                hasError ? 'text-error' : 'text-gray-700',
                disabled && 'text-gray-400 cursor-not-allowed',
                sizeClasses[size].label
              )}
            >
              {label}
              {required && <span className="text-error ml-0.5">*</span>}
            </label>
          )}
        </div>
        
        {(hasError || helperText) && (
          <div className="mt-1 ml-6">
            {hasError && (
              <p className="text-xs text-error">
                {errors[0].message}
              </p>
            )}
            
            {helperText && !hasError && (
              <p className="text-xs text-gray-500">
                {helperText}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox'; 