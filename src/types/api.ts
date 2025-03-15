/**
 * Tipos centralizados para o sistema de API
 * Parte do plano de refatoração estrutural para melhorar a consistência de tipos
 */

// Base para respostas de API
export interface ApiResponseBase {
  success: boolean;
  message?: string;
}

// Resposta de API com dados genéricos
export interface ApiResponse<T = any> extends ApiResponseBase {
  data: T;
}

// Detalhes de erro de API
export interface ApiErrorDetails {
  code: string;
  message: string;
  status: number;
  timestamp?: string;
  path?: string;
  details?: Record<string, any>;
}

// Tipo de erro de API, combinando a base de resposta com detalhes de erro
export type ApiError = ApiResponseBase & ApiErrorDetails;

// Parâmetros para requisições paginadas
export interface PaginationParams {
  page?: number;
  limit?: number;
  [key: string]: string | number | boolean | undefined;
}

// Informações de paginação em respostas
export interface PaginationInfo {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Resposta paginada de API
export interface PaginatedResponse<T> extends ApiResponseBase {
  data: T[];
  pagination: PaginationInfo;
}

// Parâmetros para queries genéricas
export interface QueryParams {
  [key: string]: string | number | boolean | undefined;
}

// Filtro para buscas
export interface SearchFilter {
  field: string;
  value: string | number | boolean;
  operator?: 'eq' | 'ne' | 'gt' | 'lt' | 'gte' | 'lte' | 'like' | 'in';
}

// Opções para configuração do cliente de API
export interface ApiOptions {
  baseURL: string;
  mockEnabled?: boolean;
  authToken?: string;
  timeout?: number;
  retryOptions?: RetryOptions;
}

// Opções para retentativas de requisição
export interface RetryOptions {
  maxRetries?: number;
  delayMs?: number;
  backoffFactor?: number;
  statusCodesToRetry?: number[];
}

// Opções para cache de requisições
export interface CacheOptions {
  enabled?: boolean;
  expiresIn?: number; // ms
  staleWhileRevalidate?: boolean;
  key?: string;
} 