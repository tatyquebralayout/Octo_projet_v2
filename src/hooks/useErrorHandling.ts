/**
 * Hook para lidar com erros em componentes React
 */
import { useState, useCallback } from 'react';
import { useErrorHandler, ErrorType, AppError } from '../utils/errors';

type ErrorState = {
  hasError: boolean;
  message: string;
  type: ErrorType;
  details?: unknown;
};

interface UseErrorHandlingOptions {
  initialMessage?: string;
  initialType?: ErrorType;
  onError?: (error: AppError) => void;
}

export function useErrorHandling(options: UseErrorHandlingOptions = {}) {
  const { handleError, getUserFriendlyMessage, withRetry } = useErrorHandler();
  
  // Estado de erro
  const [errorState, setErrorState] = useState<ErrorState>({
    hasError: false,
    message: options.initialMessage || '',
    type: options.initialType || ErrorType.UNKNOWN,
    details: undefined
  });
  
  // Estado de loading
  const [isLoading, setIsLoading] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  
  // Limpar erro
  const clearError = useCallback(() => {
    setErrorState({
      hasError: false,
      message: '',
      type: ErrorType.UNKNOWN,
      details: undefined
    });
  }, []);
  
  // Definir erro
  const setError = useCallback((message: string, type = ErrorType.UNKNOWN, details?: unknown) => {
    setErrorState({
      hasError: true,
      message,
      type,
      details
    });
  }, []);
  
  // Manipular erro
  const processError = useCallback((error: unknown) => {
    // Processar o erro com nosso handler
    const appError = handleError(error);
    
    // Obter mensagem amigável
    const message = getUserFriendlyMessage(appError);
    
    // Atualizar estado de erro
    setErrorState({
      hasError: true,
      message,
      type: appError.type,
      details: appError
    });
    
    // Chamar callback opcional
    if (options.onError) {
      options.onError(appError);
    }
    
    return appError;
  }, [handleError, getUserFriendlyMessage, options.onError]);
  
  // Executar operação com tratamento de erro
  const executeWithErrorHandling = useCallback(async <T>(
    operation: () => Promise<T>,
    loadingState = true
  ): Promise<T | null> => {
    try {
      // Limpar erros anteriores
      clearError();
      
      // Atualizar estado de loading
      if (loadingState) {
        setIsLoading(true);
      }
      
      // Executar operação
      const result = await operation();
      return result;
    } catch (error) {
      // Processar erro
      processError(error);
      return null;
    } finally {
      // Atualizar estado de loading
      if (loadingState) {
        setIsLoading(false);
      }
    }
  }, [clearError, processError]);
  
  // Executar operação com retry
  const executeWithRetry = useCallback(async <T>(
    operation: () => Promise<T>,
    retryOptions?: Parameters<typeof withRetry>[1]
  ): Promise<T | null> => {
    try {
      // Limpar erros anteriores
      clearError();
      
      // Atualizar estado de loading e retry
      setIsLoading(true);
      setIsRetrying(false);
      
      const onRetry = (error: AppError, attempt: number) => {
        setIsRetrying(true);
        
        // Chamar callback personalizado se existir
        if (retryOptions?.onRetry) {
          retryOptions.onRetry(error, attempt);
        }
      };
      
      // Executar operação com retry
      const result = await withRetry(operation, {
        ...retryOptions,
        onRetry
      });
      
      return result;
    } catch (error) {
      // Processar erro
      processError(error);
      return null;
    } finally {
      // Atualizar estado de loading e retry
      setIsLoading(false);
      setIsRetrying(false);
    }
  }, [clearError, processError, withRetry]);
  
  return {
    error: errorState,
    isError: errorState.hasError,
    errorMessage: errorState.message,
    errorType: errorState.type,
    errorDetails: errorState.details,
    isLoading,
    isRetrying,
    setError,
    clearError,
    processError,
    executeWithErrorHandling,
    executeWithRetry
  };
} 