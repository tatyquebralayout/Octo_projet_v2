/**
 * Handler central para tratamento de erros na aplicação
 */
import { ErrorType, AppError, RetryOptions } from './types';
import { HTTP_ERROR_MAPPING, currentConfig } from './config';
import { logger } from '../logger';
import { ApiError } from '../../services/api/types';
import { v4 as uuidv4 } from 'uuid';
import * as Sentry from '@sentry/react';

class ErrorHandler {
  private static instance: ErrorHandler;
  private config = currentConfig;

  // Singleton pattern
  private constructor() {}

  static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }

  /**
   * Configura o handler com configurações personalizadas
   */
  configure(customConfig: Partial<typeof currentConfig>): void {
    this.config = { ...this.config, ...customConfig };
  }

  /**
   * Transforma erros genéricos em AppError estruturado
   */
  createAppError(
    error: unknown,
    options: {
      type?: ErrorType;
      message?: string;
      code?: string;
      context?: Record<string, any>;
      retryable?: boolean;
      isOperational?: boolean;
    } = {}
  ): AppError {
    const timestamp = new Date().toISOString();
    const fingerprint = uuidv4();

    // Determinar tipo de erro
    let errorType = options.type || ErrorType.UNKNOWN;
    let errorMessage = options.message || this.config.defaultMessages[errorType];
    let statusCode: number | undefined;
    let errorCode: string | undefined = options.code;
    let isRetryable = options.retryable ?? false;
    let isOperational = options.isOperational ?? true;

    // Tratamento específico com base no tipo de erro recebido
    if (error instanceof Error) {
      errorMessage = options.message || error.message || errorMessage;

      // Verificar se é um erro de API
      if ('status' in error && 'code' in error) {
        const apiError = error as unknown as ApiError;
        statusCode = apiError.status;
        errorCode = apiError.code;
        errorType = HTTP_ERROR_MAPPING[statusCode] || errorType;
        errorMessage = options.message || apiError.message || errorMessage;

        // Determinar se é retryable
        isRetryable = [408, 429, 500, 502, 503, 504].includes(statusCode);
        
        // Tratamentos específicos por tipo
        if (statusCode === 401 || statusCode === 403) {
          isOperational = true; // Erros de autenticação são esperados
        }
      }
    }
    
    // Para erros de rede do Axios
    if (error && typeof error === 'object' && 'isAxiosError' in error && (error as any).isAxiosError) {
      const axiosError = error as any;
      statusCode = axiosError.response?.status;
      errorType = statusCode ? HTTP_ERROR_MAPPING[statusCode] || ErrorType.NETWORK : ErrorType.NETWORK;
      errorMessage = options.message || axiosError.message || this.config.defaultMessages[errorType];
      errorCode = axiosError.code || 'NETWORK_ERROR';
      isRetryable = !statusCode || [408, 429, 500, 502, 503, 504].includes(statusCode);
    }

    // Criar o erro estruturado
    return {
      type: errorType,
      message: errorMessage,
      originalError: error,
      code: errorCode || 'UNKNOWN_ERROR',
      statusCode,
      timestamp,
      fingerprint,
      context: options.context,
      retryable: isRetryable,
      isOperational
    };
  }

  /**
   * Processa e loga um erro e retorna a versão estruturada
   */
  handleError(error: unknown, options: {
    context?: Record<string, any>;
    silent?: boolean;
    rethrow?: boolean;
  } = {}): AppError {
    const appError = error instanceof Object && 'type' in error && 'timestamp' in error
      ? error as AppError
      : this.createAppError(error, {
          context: options.context
        });

    // Reportar erro para monitoramento e logar
    if (!options.silent) {
      this.reportError(appError);
    }

    // Rethrow se necessário
    if (options.rethrow) {
      const customError = new Error(appError.message);
      Object.assign(customError, appError);
      throw customError;
    }

    return appError;
  }

  /**
   * Função para registrar o erro (log e monitoring)
   */
  private reportError(appError: AppError): void {
    // Log com base no nível de log configurado
    if (this.config.devLogLevel !== 'none') {
      const logDetails = {
        fingerprint: appError.fingerprint,
        type: appError.type,
        code: appError.code,
        statusCode: appError.statusCode,
        context: appError.context,
        timestamp: appError.timestamp
      };

      if (appError.isOperational) {
        logger.warn(`[${appError.type.toUpperCase()}] ${appError.message}`, logDetails);
      } else {
        logger.error(`[${appError.type.toUpperCase()}] ${appError.message}`, logDetails, appError.originalError);
      }
    }

    // Reportar para monitoramento externo em produção
    if (this.config.reportToMonitoring && import.meta.env.PROD) {
      this.sendToMonitoring(appError);
    }
  }

  /**
   * Enviar erro para sistema de monitoramento (Sentry, etc)
   */
  private sendToMonitoring(appError: AppError): void {
    try {
      if (typeof Sentry !== 'undefined') {
        Sentry.withScope(scope => {
          // Adicionar tags e contexto
          scope.setTag('error_type', appError.type);
          scope.setTag('operational', String(appError.isOperational));
          scope.setTag('retryable', String(appError.retryable));
          
          if (appError.code) {
            scope.setTag('error_code', appError.code);
          }
          
          if (appError.statusCode) {
            scope.setTag('status_code', String(appError.statusCode));
          }
          
          // Adicionar contexto adicional
          if (appError.context) {
            scope.setContext('error_context', appError.context);
          }
          
          // Definir fingerprint para agrupar ocorrências similares
          scope.setFingerprint([appError.fingerprint]);
          
          // Capturar o erro
          if (appError.originalError instanceof Error) {
            Sentry.captureException(appError.originalError);
          } else {
            Sentry.captureMessage(appError.message, 'error');
          }
        });
      }
    } catch (err) {
      logger.error('Falha ao enviar erro para monitoramento:', err);
    }
  }

  /**
   * Obtém mensagem amigável para o usuário com base no erro
   */
  getUserFriendlyMessage(error: unknown): string {
    const appError = error instanceof Object && 'type' in error && 'timestamp' in error
      ? error as AppError
      : this.createAppError(error);
    
    // Com base no nível de detalhe configurado
    switch (this.config.userErrorDetailLevel) {
      case 'detailed':
        return appError.message;
        
      case 'medium':
        return this.config.defaultMessages[appError.type];
        
      case 'minimal':
      default:
        // Mensagem genérica para erros não operacionais
        return appError.isOperational 
          ? this.config.defaultMessages[appError.type]
          : 'Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.';
    }
  }

  /**
   * Implementa retry de operações com backoff exponencial
   */
  async withRetry<T>(
    operation: () => Promise<T>,
    options: RetryOptions = {}
  ): Promise<T> {
    const maxRetries = options.maxRetries ?? this.config.maxRetries;
    const initialDelay = options.delayMs ?? this.config.retryDelay;
    const backoffFactor = options.backoffFactor ?? this.config.retryBackoffFactor;
    
    let lastError: AppError | null = null;
    
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        // Converter erro para AppError
        const appError = this.createAppError(error);
        lastError = appError;
        
        // Verificar se devemos tentar novamente
        const isLastAttempt = attempt === maxRetries;
        const shouldRetry = options.shouldRetry 
          ? options.shouldRetry(appError, attempt)
          : appError.retryable;
        
        if (isLastAttempt || !shouldRetry) {
          this.handleError(appError);
          throw appError;
        }
        
        // Calcular delay usando backoff exponencial
        const delay = initialDelay * Math.pow(backoffFactor, attempt);
        
        // Callback para tentativa
        if (options.onRetry) {
          options.onRetry(appError, attempt + 1);
        }
        
        // Aguardar antes da próxima tentativa
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    // Este ponto só seria alcançado se maxRetries < 0
    throw lastError || this.createAppError(new Error('Operação falhou após múltiplas tentativas'));
  }
}

// Exporta instância singleton
export const errorHandler = ErrorHandler.getInstance();

// Função utilitária para capturar erros em funções assíncronas
export async function tryCatch<T>(
  fn: () => Promise<T>,
  errorOptions?: Parameters<typeof errorHandler.createAppError>[1]
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    throw errorHandler.createAppError(error, errorOptions);
  }
}

// Hook para ser usado em componentes
export function useErrorHandler() {
  return {
    handleError: errorHandler.handleError.bind(errorHandler),
    getUserFriendlyMessage: errorHandler.getUserFriendlyMessage.bind(errorHandler),
    withRetry: errorHandler.withRetry.bind(errorHandler),
    createAppError: errorHandler.createAppError.bind(errorHandler)
  };
} 