/**
 * Componente Select
 * Campo de seleção para formulários
 */
import React, { forwardRef, SelectHTMLAttributes } from 'react';
import { FormControl, FormControlProps } from './FormControl';
import { cn } from '../../utils/cn';
import { ValidationError } from './validation';

// Interface para as opções do select
export interface SelectOption {
  label: React.ReactNode;
  value: string | number;
  disabled?: boolean;
  group?: string;
}

// Props para o componente Select
export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
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
   * Classes adicionais para o select
   */
  selectClassName?: string;
  
  /**
   * Ícone à direita do select
   */
  rightIcon?: React.ReactNode;
  
  /**
   * Tamanho do select
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Se o campo está em estado de carregamento
   */
  loading?: boolean;
  
  /**
   * Placeholder do select
   */
  placeholder?: string;
  
  /**
   * Opções do select
   */
  options?: SelectOption[];
  
  /**
   * Se o placeholder deve ser desabilitado
   */
  disablePlaceholder?: boolean;
  
  /**
   * Props adicionais para o componente FormControl
   */
  formControlProps?: Omit<FormControlProps, 'errors' | 'name' | 'label' | 'required' | 'helperText' | 'loading'>;
}

/**
 * Componente de select para formulários
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({
    id,
    name,
    label,
    helperText,
    required = false,
    disabled = false,
    errors = [],
    className,
    selectClassName,
    rightIcon,
    size = 'md',
    loading = false,
    placeholder = 'Selecione...',
    options = [],
    disablePlaceholder = true,
    onChange,
    onBlur,
    formControlProps,
    ...rest
  }, ref) => {
    // Determina se o input tem erro de validação
    const hasError = errors && errors.length > 0;
    
    // Classes para diferentes tamanhos
    const sizeClasses = {
      sm: 'py-1.5 pl-2 pr-7 text-xs',
      md: 'py-2 pl-3 pr-8 text-sm',
      lg: 'py-2.5 pl-4 pr-9 text-base',
    };
    
    // Agrupa as opções por grupo se houver
    const optionsByGroup = options.reduce((acc, option) => {
      const group = option.group || '';
      
      if (!acc[group]) {
        acc[group] = [];
      }
      
      acc[group].push(option);
      return acc;
    }, {} as Record<string, SelectOption[]>);
    
    // Recupera os grupos
    const groups = Object.keys(optionsByGroup);
    
    // Define se deve renderizar com grupos ou não
    const hasGroups = groups.some(group => group !== '');
    
    // Renderiza as opções dentro de um grupo
    const renderGroupOptions = (groupOptions: SelectOption[]) => {
      return groupOptions.map((option, index) => (
        <option 
          key={`${option.value}-${index}`} 
          value={option.value} 
          disabled={option.disabled}
        >
          {option.label}
        </option>
      ));
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
          <select
            ref={ref}
            id={id || name}
            name={name}
            disabled={disabled || loading}
            required={required}
            className={cn(
              'block w-full rounded-md shadow-sm appearance-none',
              'focus:ring-2 focus:ring-inset focus:outline-none',
              hasError 
                ? 'border-error text-error focus:ring-error/50' 
                : 'border-gray-300 focus:ring-primary-400/50',
              disabled && 'bg-gray-100 text-gray-500 cursor-not-allowed',
              sizeClasses[size],
              selectClassName
            )}
            onChange={onChange}
            onBlur={onBlur}
            {...rest}
          >
            {placeholder && (
              <option value="" disabled={disablePlaceholder}>
                {placeholder}
              </option>
            )}
            
            {hasGroups ? (
              // Renderiza opções com optgroup
              groups.map(group => (
                group === '' ? (
                  // Opções sem grupo
                  renderGroupOptions(optionsByGroup[group])
                ) : (
                  // Opções com grupo
                  <optgroup key={group} label={group}>
                    {renderGroupOptions(optionsByGroup[group])}
                  </optgroup>
                )
              ))
            ) : (
              // Renderiza opções simples
              options.map((option, index) => (
                <option 
                  key={`${option.value}-${index}`} 
                  value={option.value} 
                  disabled={option.disabled}
                >
                  {option.label}
                </option>
              ))
            )}
          </select>
          
          {/* Ícone de seta para o select */}
          <div className={cn(
            'pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2',
            disabled ? 'text-gray-400' : 'text-gray-500'
          )}>
            {rightIcon || (
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
        </div>
      </FormControl>
    );
  }
);

Select.displayName = 'Select'; 