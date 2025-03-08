/**
 * Configuração para o sistema de tratamento de erros
 */
import { ErrorType, EnvironmentConfig } from './types';

// Determinar o ambiente atual
const ENV = import.meta.env.MODE || 'development';

// Mensagens padrão para cada tipo de erro
const DEFAULT_ERROR_MESSAGES = {
  [ErrorType.AUTHENTICATION]: 'Erro de autenticação. Por favor, faça login novamente.',
  [ErrorType.VALIDATION]: 'Alguns campos contêm erros. Por favor, verifique e tente novamente.',
  [ErrorType.SERVER]: 'Ocorreu um erro no servidor. Por favor, tente novamente mais tarde.',
  [ErrorType.NETWORK]: 'Erro de conexão. Verifique sua internet e tente novamente.',
  [ErrorType.NOT_FOUND]: 'O recurso solicitado não foi encontrado.',
  [ErrorType.PERMISSION]: 'Você não tem permissão para acessar este recurso.',
  [ErrorType.UNKNOWN]: 'Ocorreu um erro inesperado. Por favor, tente novamente.',
  [ErrorType.CLIENT]: 'Ocorreu um erro no aplicativo. Tente recarregar a página.',
  [ErrorType.TIMEOUT]: 'A operação excedeu o tempo limite. Por favor, tente novamente.'
};

// Configuração de erros para ambientes específicos
export const ERROR_CONFIG: EnvironmentConfig = {
  // Ambiente de desenvolvimento
  development: {
    devLogLevel: 'debug',
    userErrorDetailLevel: 'detailed',
    showStackTraceInDev: true,
    reportToMonitoring: false,
    retryDelay: 1000,
    maxRetries: 3,
    retryBackoffFactor: 1.5,
    defaultMessages: DEFAULT_ERROR_MESSAGES
  },
  
  // Ambiente de teste
  test: {
    devLogLevel: 'error',
    userErrorDetailLevel: 'minimal',
    showStackTraceInDev: false,
    reportToMonitoring: false,
    retryDelay: 1000,
    maxRetries: 1,
    retryBackoffFactor: 1,
    defaultMessages: DEFAULT_ERROR_MESSAGES
  },
  
  // Ambiente de staging
  staging: {
    devLogLevel: 'error',
    userErrorDetailLevel: 'medium',
    showStackTraceInDev: false,
    reportToMonitoring: true,
    retryDelay: 1000,
    maxRetries: 2,
    retryBackoffFactor: 1.5,
    defaultMessages: DEFAULT_ERROR_MESSAGES
  },
  
  // Ambiente de produção
  production: {
    devLogLevel: 'none',
    userErrorDetailLevel: 'minimal',
    showStackTraceInDev: false,
    reportToMonitoring: true,
    retryDelay: 2000,
    maxRetries: 3,
    retryBackoffFactor: 2,
    defaultMessages: DEFAULT_ERROR_MESSAGES
  }
};

// Códigos de erro HTTP mapeados para tipos de erro
export const HTTP_ERROR_MAPPING: Record<number, ErrorType> = {
  400: ErrorType.VALIDATION,
  401: ErrorType.AUTHENTICATION,
  403: ErrorType.PERMISSION,
  404: ErrorType.NOT_FOUND,
  408: ErrorType.TIMEOUT,
  500: ErrorType.SERVER,
  502: ErrorType.SERVER,
  503: ErrorType.SERVER,
  504: ErrorType.TIMEOUT
};

// Retorna configuração específica para o ambiente atual
export const getErrorConfig = () => {
  if (ENV === 'production') return ERROR_CONFIG.production;
  if (ENV === 'staging') return ERROR_CONFIG.staging;
  if (ENV === 'test') return ERROR_CONFIG.test;
  return ERROR_CONFIG.development;
};

// Exporta configuração atual
export const currentConfig = getErrorConfig();

// Função para personalizar configurações
export const configureErrorHandling = (customConfig: Partial<typeof currentConfig>) => {
  return {
    ...currentConfig,
    ...customConfig
  };
}; 