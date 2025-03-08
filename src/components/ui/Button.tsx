import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { Loading } from '../../design-system/components/ui';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

// Props base que compartilham todos os tipos de botão
interface ButtonBaseProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
  loadingText?: string;
}

// Props para o botão HTML padrão
export interface ButtonProps extends ButtonBaseProps, Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> {
  href?: undefined;
  external?: undefined;
}

// Props para link interno (React Router)
export interface LinkButtonProps extends ButtonBaseProps, Omit<LinkProps, keyof ButtonBaseProps | 'to'> {
  href: string;
  external?: false;
  to?: never; // Garantir que não existe conflito com a prop 'to'
}

// Props para link externo
export interface ExternalLinkButtonProps extends ButtonBaseProps, Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> {
  href: string;
  external: true;
}

// Tipo união que representa todos os tipos possíveis de botão
export type ButtonComponentProps = ButtonProps | LinkButtonProps | ExternalLinkButtonProps;

// Função para determinar qual tipo de botão estamos renderizando
function isExternalLink(props: ButtonComponentProps): props is ExternalLinkButtonProps {
  return 'href' in props && props.external === true;
}

function isInternalLink(props: ButtonComponentProps): props is LinkButtonProps {
  return 'href' in props && props.external !== true;
}

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonComponentProps>((props, ref) => {
  const {
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    fullWidth = false,
    leftIcon,
    rightIcon,
    isLoading = false,
    loadingText,
    ...rest
  } = props;

  // Extrair disabled do objeto certo com base no tipo
  let disabled: boolean;
  if ('disabled' in rest) {
    disabled = !!rest.disabled;
  } else {
    disabled = false;
  }

  // Classes base usando a classe .btn do Design System
  const baseClasses = cn(
    'btn',
    {
      'w-full': fullWidth,
      'opacity-50 cursor-not-allowed': isLoading || disabled,
    }
  );

  // Classes específicas para cada variante usando as classes do Design System
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline',
    ghost: 'bg-transparent text-primary-400 hover:bg-primary-50 focus:ring-primary-400',
  }[variant];

  // Classes específicas para cada tamanho
  const sizeClasses = {
    sm: 'text-sm px-3 py-1 gap-1',
    md: 'text-base px-4 py-2 gap-2',
    lg: 'text-lg px-6 py-3 gap-2',
  }[size];

  // Combinando todas as classes
  const allClasses = cn(baseClasses, variantClasses, sizeClasses, className);

  // Conteúdo do botão (incluindo estado de carregamento)
  const content = (
    <>
      {isLoading ? (
        <>
          <Loading 
            size="sm" 
            variant="spinner" 
            className="mr-2" 
            color="currentColor"
            aria-hidden="true"
          />
          <span>{loadingText || children}</span>
        </>
      ) : (
        <>
          {leftIcon && <span className="inline-flex" aria-hidden="true">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="inline-flex" aria-hidden="true">{rightIcon}</span>}
        </>
      )}
    </>
  );

  // Renderizar como link externo
  if (isExternalLink(props)) {
    const { href, external, variant, size, fullWidth, leftIcon, rightIcon, isLoading, loadingText, ...linkProps } = props;
    // Preparar os atributos ARIA como strings literais para evitar erros de linter
    const isDisabled = isLoading || disabled;
    const ariaDisabled = isDisabled ? "true" : "false";
    
    return (
      <a 
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={allClasses}
        aria-disabled={ariaDisabled}
        {...linkProps}
      >
        {content}
      </a>
    );
  }
  
  // Renderizar como Link do React Router
  if (isInternalLink(props)) {
    const { href, external, variant, size, fullWidth, leftIcon, rightIcon, isLoading, loadingText, ...linkProps } = props;
    // Preparar os atributos ARIA como strings literais para evitar erros de linter
    const isDisabled = isLoading || disabled;
    const ariaDisabled = isDisabled ? "true" : "false";
    
    return (
      <Link 
        ref={ref as React.Ref<HTMLAnchorElement>}
        to={href} 
        className={allClasses}
        aria-disabled={ariaDisabled}
        {...linkProps}
      >
        {content}
      </Link>
    );
  }

  // Renderizar como botão padrão
  const { variant: _v, size: _s, fullWidth: _fw, leftIcon: _li, rightIcon: _ri, isLoading: _il, loadingText: _lt, ...buttonProps } = rest as ButtonProps;
  // Preparar os atributos ARIA como strings literais para evitar erros de linter
  const ariaBusy = isLoading ? "true" : "false";
  
  return (
    <button 
      ref={ref as React.Ref<HTMLButtonElement>}
      className={allClasses}
      disabled={isLoading || disabled}
      aria-busy={ariaBusy}
      {...buttonProps}
    >
      {content}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;