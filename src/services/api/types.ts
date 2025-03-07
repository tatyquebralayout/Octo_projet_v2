/**
 * Tipos para o serviço de API do OCTO
 * Contém interfaces para requisições, respostas e erros
 */

// Interface para token de autenticação
export interface AuthToken {
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
  tokenType?: string;
}

// Interface para usuário autenticado
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profilePicture?: string;
}

// Papéis de usuário no sistema
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  PROFESSIONAL = 'professional',
  COMPANY = 'company'
}

// Interface base para paginação
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// Interface para respostas da API
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
}

// Interface para erros da API
export interface ApiError {
  code: string;
  message: string;
  status: number;
  timestamp?: string;
  path?: string;
  details?: Record<string, any>;
}

// Interface para opções da API
export interface ApiOptions {
  baseURL: string;
  mockEnabled?: boolean;
  authToken?: string;
  timeout?: number;
}

// Interface para parâmetros de consulta
export interface QueryParams {
  [key: string]: string | number | boolean | undefined;
}

// Interface para filtros de pesquisa
export interface SearchFilter {
  field: string;
  value: string | number | boolean;
  operator?: 'eq' | 'ne' | 'gt' | 'lt' | 'gte' | 'lte' | 'like' | 'in';
}

// Interface para solicitação de autenticação
export interface AuthRequest {
  email: string;
  password: string;
}

// Interface para resposta de autenticação
export interface AuthResponse {
  user: User;
  token: AuthToken;
} 