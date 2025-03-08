/**
 * Tipos para o sistema de tratamento de erros
 */

import { ApiError } from '../../services/api/types';

/**
 * Tipos de erro da aplicação
 */
export enum ErrorType {
  AUTHENTICATION = 'authentication',
  VALIDATION = 'validation',
  SERVER = 'server',
  NETWORK = 'network',
  NOT_FOUND = 'not_found',
  PERMISSION = 'permission',
  UNKNOWN = 'unknown',
  CLIENT = 'client',
  TIMEOUT = 'timeout'
}

/**
 * Interface para erro estruturado da aplicação
 */
export interface AppError {
  type: ErrorType;
  message: string;
  code: string;
  statusCode?: number;
  timestamp: string;
  processedAt?: string;
  fingerprint: string;
  originalError: unknown;
  context?: Record<string, any>;
  retryable: boolean;
  isOperational: boolean;
}

/**
 * Configuração para tratamento de erros
 */
export interface ErrorHandlerConfig {
  // Nível de log para desenvolvimento
  devLogLevel: 'debug' | 'info' | 'warn' | 'error' | 'none';
  
  // Nível de detalhe para mensagens de erro em UI para usuário final
  userErrorDetailLevel: 'minimal' | 'medium' | 'detailed';
  
  // Se deve mostrar stack trace em desenvolvimento
  showStackTraceInDev: boolean;
  
  // Se deve enviar erros para serviço de monitoramento externo
  reportToMonitoring: boolean;

  // Tempo de espera entre tentativas (ms)
  retryDelay: number;
  
  // Número máximo de tentativas para operações retryables
  maxRetries: number;
  
  // Backoff factor para cálculo de delay entre tentativas
  retryBackoffFactor: number;

  // Mensagens de erro padrão por tipo de erro
  defaultMessages: Record<ErrorType, string>;
}

/**
 * Configuração para diferentes ambientes
 */
export type EnvironmentConfig = {
  development: ErrorHandlerConfig;
  test: ErrorHandlerConfig;
  staging: ErrorHandlerConfig;
  production: ErrorHandlerConfig;
};

/**
 * Opções para o componente ErrorFallback
 */
export interface ErrorFallbackProps {
  error: Error | AppError;
  resetErrorBoundary?: () => void;
  fallbackUI?: React.ReactNode;
  showDetails?: boolean;
  showReset?: boolean;
  className?: string;
}

/**
 * Interface para o componente que apresenta mensagens de erro
 */
export interface ErrorMessageProps {
  message: string;
  type?: ErrorType;
  className?: string;
  icon?: boolean;
}

/**
 * Opções para configurar o retry de operações
 */
export interface RetryOptions {
  maxRetries?: number;
  delayMs?: number;
  backoffFactor?: number;
  shouldRetry?: (error: AppError, attempt: number) => boolean;
  onRetry?: (error: AppError, attempt: number) => void;
}

/**
 * Opções para configurar o componente ErrorBoundary
 */
export interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode | ((props: ErrorFallbackProps) => React.ReactNode);
  onError?: (error: Error, info: React.ErrorInfo) => void;
  onReset?: () => void;
  resetKeys?: any[];
} 