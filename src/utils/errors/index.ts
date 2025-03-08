/**
 * Sistema de tratamento de erros do OCTO
 */

// Re-exportar todos os tipos
export * from './types';

// Re-exportar configurações
export { 
  currentConfig as errorConfig, 
  configureErrorHandling, 
  HTTP_ERROR_MAPPING 
} from './config';

// Re-exportar handler de erros
export { 
  errorHandler, 
  tryCatch, 
  useErrorHandler 
} from './errorHandler';

// Re-exportar componentes de UI
export {
  ErrorMessage,
  ErrorAlert,
  RetryableError,
  ErrorFallback,
  ErrorBoundary,
  useTemporaryError
} from './components';

// Função de conveniência para registrar erros rapidamente
export function handleError(error: unknown, message?: string) {
  const { errorHandler } = require('./errorHandler');
  return errorHandler.handleError(error, { 
    context: message ? { message } : undefined 
  });
}

// Função de conveniência para obter mensagens amigáveis 
export function getUserFriendlyMessage(error: unknown): string {
  const { errorHandler } = require('./errorHandler');
  return errorHandler.getUserFriendlyMessage(error);
}

// Função de conveniência para retry de operações
export function withRetry<T>(
  operation: () => Promise<T>,
  options?: any // Usamos any aqui para evitar dependência circular
): Promise<T> {
  const { errorHandler } = require('./errorHandler');
  return errorHandler.withRetry(operation, options);
} 