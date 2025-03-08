/**
 * Componente Form
 * Container principal para formulários
 */
import React, { FormHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import { FormStatus } from './useForm';

export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  /**
   * Conteúdo do formulário
   */
  children: React.ReactNode;
  
  /**
   * Função chamada ao submeter o formulário
   */
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  
  /**
   * Status atual do formulário
   */
  status?: FormStatus;
  
  /**
   * Se deve mostrar mensagens de feedback
   */
  showFeedback?: boolean;
  
  /**
   * Mensagem de sucesso personalizada
   */
  successMessage?: string;
  
  /**
   * Mensagem de erro personalizada
   */
  errorMessage?: string;
  
  /**
   * Ação de rodapé (botões, etc)
   */
  actions?: React.ReactNode;
  
  /**
   * Layout do formulário (vertical ou horizontal)
   */
  layout?: 'vertical' | 'horizontal';
  
  /**
   * Largura máxima do formulário
   */
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

/**
 * Componente principal para encapsular formulários
 */
export const Form: React.FC<FormProps> = ({
  children,
  className,
  onSubmit,
  status = FormStatus.IDLE,
  showFeedback = true,
  successMessage = 'Formulário enviado com sucesso!',
  errorMessage = 'Erro ao enviar o formulário. Verifique os dados e tente novamente.',
  actions,
  layout = 'vertical',
  maxWidth = 'md',
  ...rest
}) => {
  // Classes para largura máxima
  const maxWidthClasses = {
    xs: 'max-w-xs',
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'w-full',
  };
  
  // Feedback com base no status
  const getFeedback = () => {
    if (!showFeedback) return null;
    
    switch (status) {
      case FormStatus.SUCCESS:
        return (
          <div className="p-3 mb-4 bg-green-50 text-green-700 rounded-md border border-green-200">
            <p>{successMessage}</p>
          </div>
        );
      case FormStatus.ERROR:
        return (
          <div className="p-3 mb-4 bg-red-50 text-red-700 rounded-md border border-red-200">
            <p>{errorMessage}</p>
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <form
      className={cn(
        'space-y-4',
        maxWidthClasses[maxWidth],
        layout === 'horizontal' && 'grid grid-cols-12 gap-4',
        className
      )}
      onSubmit={onSubmit}
      noValidate
      {...rest}
    >
      {getFeedback()}
      
      {children}
      
      {actions && (
        <div className={cn(
          'mt-6',
          layout === 'horizontal' && 'col-span-12'
        )}>
          {actions}
        </div>
      )}
    </form>
  );
};

/**
 * Item de formulário para layout horizontal
 */
export interface FormItemProps {
  /**
   * Conteúdo do item
   */
  children: React.ReactNode;
  
  /**
   * Número de colunas que o item ocupa
   */
  colSpan?: number;
  
  /**
   * Classes adicionais
   */
  className?: string;
}

/**
 * Componente de item para layout horizontal
 */
export const FormItem: React.FC<FormItemProps> = ({
  children,
  colSpan = 12,
  className,
}) => {
  return (
    <div 
      className={cn(
        `col-span-${colSpan}`,
        className
      )}
    >
      {children}
    </div>
  );
};

/**
 * Grupo de campos de formulário
 */
export interface FormGroupProps {
  /**
   * Conteúdo do grupo
   */
  children: React.ReactNode;
  
  /**
   * Título do grupo
   */
  title?: string;
  
  /**
   * Descrição do grupo
   */
  description?: string;
  
  /**
   * Classes adicionais
   */
  className?: string;
  
  /**
   * Layout do grupo (vertical ou horizontal)
   */
  layout?: 'vertical' | 'horizontal';
  
  /**
   * Se o grupo está colapsado
   */
  collapsed?: boolean;
  
  /**
   * Se o grupo pode ser colapsado
   */
  collapsible?: boolean;
}

/**
 * Componente de grupo de campos
 */
export const FormGroup: React.FC<FormGroupProps> = ({
  children,
  title,
  description,
  className,
  layout = 'vertical',
  collapsed = false,
  collapsible = false,
}) => {
  // Estado para controlar se o grupo está expandido ou colapsado
  const [isCollapsed, setIsCollapsed] = React.useState(collapsed);
  
  return (
    <fieldset
      className={cn(
        'border border-gray-200 rounded-md p-4 mb-6',
        className
      )}
    >
      {title && (
        <legend 
          className={cn(
            'px-2 text-gray-700 font-medium',
            collapsible && 'cursor-pointer flex items-center gap-1'
          )}
          onClick={collapsible ? () => setIsCollapsed(!isCollapsed) : undefined}
        >
          {collapsible && (
            <svg
              className={cn("h-4 w-4 transition-transform", !isCollapsed && "transform rotate-90")}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          )}
          {title}
        </legend>
      )}
      
      {description && !isCollapsed && (
        <p className="text-sm text-gray-500 mb-4">{description}</p>
      )}
      
      {!isCollapsed && (
        <div
          className={cn(
            layout === 'horizontal' && 'grid grid-cols-12 gap-4'
          )}
        >
          {children}
        </div>
      )}
    </fieldset>
  );
};

/**
 * Define status do formulário
 */
export { FormStatus }; 