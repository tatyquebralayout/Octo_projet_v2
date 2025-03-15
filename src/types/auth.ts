/**
 * Tipos centralizados para o sistema de autenticação
 * Parte do plano de refatoração estrutural para melhorar a consistência de tipos
 */

// Tipos de papéis de usuário
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  PROFESSIONAL = 'professional',
  COMPANY = 'company'
}

// Token de autenticação
export interface AuthToken {
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
  tokenType?: string;
  issuedAt?: number; // timestamp para verificação de expiração
}

// Requisição de login
export interface AuthRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

// Requisição de registro
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role?: UserRole;
  termsAccepted: boolean;
  newsletterSubscribe?: boolean;
}

// Resposta de autenticação
export interface AuthResponse {
  user: User;
  token: AuthToken;
}

// Preferências de usuário
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

// Usuário base
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

// Perfil de usuário estendido
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
}

// Requisição de atualização de perfil
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

// Estado de autenticação para o contexto
export interface AuthState {
  user: User | null;
  token: AuthToken | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: Error | null;
} 