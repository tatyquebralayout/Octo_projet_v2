/**
 * Componentes para exibição de erros na interface
 */
import React, { useState, useEffect } from 'react';
import { ErrorBoundary as ReactErrorBoundary, FallbackProps } from 'react-error-boundary';
import { AlertTriangle, AlertCircle, WifiOff, Lock, Search, Clock, X, RefreshCw } from 'lucide-react';
import { ErrorType, ErrorFallbackProps, ErrorMessageProps, ErrorBoundaryProps } from './types';
import { errorHandler } from './errorHandler';

// Mapeamento de ícones por tipo de erro
const ERROR_ICONS = {
  [ErrorType.AUTHENTICATION]: Lock,
  [ErrorType.VALIDATION]: AlertTriangle,
  [ErrorType.SERVER]: AlertCircle,
  [ErrorType.NETWORK]: WifiOff,
  [ErrorType.NOT_FOUND]: Search,
  [ErrorType.PERMISSION]: Lock,
  [ErrorType.UNKNOWN]: AlertCircle,
  [ErrorType.CLIENT]: AlertCircle,
  [ErrorType.TIMEOUT]: Clock,
};

/**
 * Componente para mensagens de erro
 */
export function ErrorMessage({ message, type = ErrorType.UNKNOWN, className = '', icon = true }: ErrorMessageProps) {
  const IconComponent = ERROR_ICONS[type];
  
  return (
    <div className={`flex items-center text-red-600 text-sm ${className}`}>
      {icon && IconComponent && <IconComponent className="w-4 h-4 mr-1.5 flex-shrink-0" />}
      <span>{message}</span>
    </div>
  );
}

/**
 * Componente de destaque para erros mais proeminentes
 */
export function ErrorAlert({ 
  message, 
  type = ErrorType.UNKNOWN, 
  onClose,
  className = ''
}: ErrorMessageProps & { onClose?: () => void }) {
  const IconComponent = ERROR_ICONS[type];
  
  return (
    <div className={`bg-red-50 border border-red-200 rounded-md p-3 ${className}`}>
      <div className="flex items-start">
        {IconComponent && (
          <div className="flex-shrink-0 mt-0.5">
            <IconComponent className="h-5 w-5 text-red-500" aria-hidden="true" />
          </div>
        )}
        <div className="ml-3 flex-1">
          <p className="text-sm text-red-700">{message}</p>
        </div>
        {onClose && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex rounded-md p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50"
              >
                <span className="sr-only">Fechar</span>
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Componente para tentativas de retry
 */
export function RetryableError({
  message,
  isRetrying = false,
  onRetry,
  type = ErrorType.SERVER,
  className = ''
}: ErrorMessageProps & { 
  isRetrying?: boolean; 
  onRetry: () => void;
}) {
  return (
    <div className={`bg-red-50 border border-red-200 rounded-md p-4 ${className}`}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <ErrorMessage message={message} type={type} className="mb-3 md:mb-0" />
        <button
          disabled={isRetrying}
          onClick={onRetry}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm 
            text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isRetrying ? (
            <>
              <RefreshCw className="animate-spin -ml-1 mr-2 h-4 w-4" />
              Tentando novamente...
            </>
          ) : (
            <>
              <RefreshCw className="-ml-1 mr-2 h-4 w-4" />
              Tentar novamente
            </>
          )}
        </button>
      </div>
    </div>
  );
}

/**
 * Componente de fallback para quando ocorrer erro em um componente
 */
export function ErrorFallback({ 
  error, 
  resetErrorBoundary, 
  fallbackUI,
  showDetails = import.meta.env.MODE === 'development',
  showReset = true,
  className = '' 
}: ErrorFallbackProps) {
  // Se fornecido um fallbackUI customizado, use-o
  if (fallbackUI) {
    return <>{fallbackUI}</>;
  }

  // Obtenha a mensagem amigável
  const errorMessage = errorHandler.getUserFriendlyMessage(error);
  
  // Determine o tipo do erro
  let errorType = ErrorType.UNKNOWN;
  
  if ('type' in error && typeof error.type === 'string') {
    errorType = error.type as ErrorType;
  }

  const IconComponent = ERROR_ICONS[errorType] || AlertCircle;

  return (
    <div role="alert" className={`rounded-lg bg-white md3-elevation-1 p-6 ${className}`}>
      <div className="flex flex-col items-center">
        <div className="w-14 h-14 mb-5 flex items-center justify-center rounded-full bg-red-100">
          <IconComponent className="h-7 w-7 text-red-600" />
        </div>
        
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Ocorreu um erro
        </h2>
        
        <p className="text-gray-600 mb-6 text-center">
          {errorMessage}
        </p>
        
        {showDetails && import.meta.env.MODE === 'development' && (
          <div className="w-full mb-6">
            <details className="text-sm">
              <summary className="cursor-pointer text-gray-500 hover:text-gray-700 mb-2">
                Detalhes técnicos (apenas desenvolvimento)
              </summary>
              <pre className="mt-2 whitespace-pre-wrap bg-gray-100 p-4 rounded text-xs overflow-auto max-h-60">
                {error instanceof Error ? error.stack : JSON.stringify(error, null, 2)}
              </pre>
            </details>
          </div>
        )}
        
        {showReset && resetErrorBoundary && (
          <button
            onClick={resetErrorBoundary}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md
              text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <RefreshCw className="-ml-1 mr-2 h-4 w-4" />
            Tentar novamente
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * Versão avançada do ErrorBoundary
 */
export function ErrorBoundary({
  children,
  fallback,
  onError,
  onReset,
  resetKeys = [],
}: ErrorBoundaryProps) {
  // Função para lidar com o erro
  const handleError = (error: Error, info: React.ErrorInfo) => {
    // Processar erro com nosso errorHandler
    errorHandler.handleError(error, {
      context: { componentStack: info.componentStack }
    });
    
    // Chamar callback externo, se fornecido
    if (onError) {
      onError(error, info);
    }
  };
  
  // Função para renderizar o fallback apropriado
  const renderFallback = (props: FallbackProps) => {
    // Se um fallback personalizado foi fornecido como função, use-o
    if (typeof fallback === 'function') {
      return fallback({
        error: props.error,
        resetErrorBoundary: props.resetErrorBoundary
      });
    }
    
    // Se um fallback personalizado foi fornecido como elemento, use-o
    if (fallback) {
      return <>{fallback}</>;
    }
    
    // Caso contrário, use nosso fallback padrão
    return (
      <ErrorFallback
        error={props.error}
        resetErrorBoundary={props.resetErrorBoundary}
      />
    );
  };

  return (
    <ReactErrorBoundary
      FallbackComponent={renderFallback}
      onError={handleError}
      onReset={onReset}
      resetKeys={resetKeys}
    >
      {children}
    </ReactErrorBoundary>
  );
}

/**
 * Hook para exibir erro temporário
 */
export function useTemporaryError(duration = 5000) {
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [error, duration]);
  
  return {
    error,
    setError,
    clearError: () => setError(null),
    ErrorDisplay: error ? (
      <ErrorAlert message={error} onClose={() => setError(null)} />
    ) : null,
  };
} 