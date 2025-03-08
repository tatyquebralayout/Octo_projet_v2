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
  phone?: string;
  createdAt?: string;
  lastLogin?: string;
  preferences?: UserPreferences;
}

// Preferências do usuário
export interface UserPreferences {
  theme?: 'light' | 'dark' | 'system';
  notifications?: boolean;
  newsletter?: boolean;
  language?: string;
  reduceMotion?: boolean | 'system';
  highContrast?: boolean;
  textSize?: 'normal' | 'large' | 'x-large';
  animationSpeed?: 'normal' | 'slow' | 'none';
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

// Interface para formulário de contato
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  termsAccepted: boolean;
  newsletterSubscribe?: boolean;
}

// Interface para resposta de envio do formulário de contato
export interface ContactFormResponse {
  ticketId: string;
  estimatedResponseTime: string;
}

// Interface para cartilha/guia
export interface Guide {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  coverImage: string;
  downloadUrl: string;
  fileSize?: string;
  pageCount?: number;
  author?: string;
  publishedAt: string;
  lastUpdated?: string;
  featuredContent?: boolean;
}

// Interface para notícia
export interface News {
  id: string;
  title: string;
  slug: string;
  headline: string;
  content: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  imageUrl: string;
  thumbnailUrl?: string;
  tags: string[];
  category: string;
  readTimeMinutes: number;
  relatedArticles?: string[];
  featured?: boolean;
  views?: number;
}

// Interface para perfil detalhado do usuário
export interface UserProfile extends User {
  bio?: string;
  company?: string;
  position?: string;
  location?: string;
  website?: string;
  socialLinks?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
  interests?: string[];
  skills?: string[];
  savedContent?: {
    articles?: string[];
    guides?: string[];
    videos?: string[];
  };
  completedCourses?: string[];
  certificates?: Array<{
    id: string;
    name: string;
    issuedAt: string;
    validUntil?: string;
    issuer: string;
  }>;
}

// Interface para atualização de perfil
export interface ProfileUpdateRequest {
  name?: string;
  email?: string;
  phone?: string;
  profilePicture?: string;
  bio?: string;
  company?: string;
  position?: string;
  location?: string;
  website?: string;
  socialLinks?: Partial<UserProfile['socialLinks']>;
  interests?: string[];
  preferences?: Partial<UserPreferences>;
}

// Interface para registro de usuário
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role?: UserRole;
  termsAccepted: boolean;
  newsletterSubscribe?: boolean;
} 