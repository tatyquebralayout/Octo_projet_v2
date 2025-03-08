/**
 * Configurações da API do OCTO
 */

// Configurações padrão da API
export const DEFAULT_API_CONFIG = {
  BASE_URL: 'http://localhost:3001/api',
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
  MOCK_ENABLED: true,
  MOCK_DELAY: {
    MIN: 200,
    MAX: 1000
  },
  MOCK_ERROR_RATE: 0.05, // 5% de chance de erro em ambientes de desenvolvimento
  MOCK_OFFLINE_MODE: false
};

// Configurações de ambiente da API
export const API_ENV = {
  // URL base da API
  BASE_URL: import.meta.env.VITE_API_URL || DEFAULT_API_CONFIG.BASE_URL,
  
  // Timeout para requisições em ms
  TIMEOUT: Number(import.meta.env.VITE_API_TIMEOUT) || DEFAULT_API_CONFIG.TIMEOUT,
  
  // Configurações de retry
  RETRY_ATTEMPTS: Number(import.meta.env.VITE_API_RETRY_ATTEMPTS) || DEFAULT_API_CONFIG.RETRY_ATTEMPTS,
  RETRY_DELAY: Number(import.meta.env.VITE_API_RETRY_DELAY) || DEFAULT_API_CONFIG.RETRY_DELAY,
  
  // Mock habilitado? (true para dev, false para prod)
  MOCK_ENABLED: import.meta.env.DEV || import.meta.env.VITE_API_MOCK_ENABLED === 'true' || DEFAULT_API_CONFIG.MOCK_ENABLED,
  
  // Configurações de delay para mock
  MOCK_DELAY: {
    MIN: Number(import.meta.env.VITE_API_MOCK_DELAY_MIN) || DEFAULT_API_CONFIG.MOCK_DELAY.MIN,
    MAX: Number(import.meta.env.VITE_API_MOCK_DELAY_MAX) || DEFAULT_API_CONFIG.MOCK_DELAY.MAX
  },
  
  // Taxa de erro para mock (ex: 0.1 = 10% dos requests falham)
  MOCK_ERROR_RATE: import.meta.env.VITE_API_MOCK_ERROR_RATE 
    ? Number(import.meta.env.VITE_API_MOCK_ERROR_RATE) 
    : DEFAULT_API_CONFIG.MOCK_ERROR_RATE,
  
  // Simular modo offline para testes
  MOCK_OFFLINE_MODE: import.meta.env.VITE_API_MOCK_OFFLINE === 'true' || DEFAULT_API_CONFIG.MOCK_OFFLINE_MODE
};

// Configuração de autenticação
export const AUTH_CONFIG = {
  TOKEN_KEY: 'octo.auth.token',
  REFRESH_TOKEN_KEY: 'octo.auth.refreshToken',
  USER_KEY: 'octo.auth.user',
  API_URL: `${API_ENV.BASE_URL}/auth`,
  AUTO_REFRESH: true,
  REFRESH_THRESHOLD: 5 * 60 * 1000, // 5 minutos antes de expirar
  AUTH_HEADER: 'Authorization',
  TOKEN_PREFIX: 'Bearer'
};

// Configuração de endpoints
export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_EMAIL: '/auth/verify-email',
  },
  USERS: {
    PROFILE: '/users/profile',
    ALL: '/users',
    DETAILS: (id: string) => `/users/${id}`,
  },
  RESOURCES: {
    GUIDES: '/resources/guides',
    GUIDE_DETAILS: (id: string) => `/resources/guides/${id}`,
    VIDEOS: '/resources/videos',
    VIDEO_DETAILS: (id: string) => `/resources/videos/${id}`,
    TOOLS: '/resources/tools',
    TOOL_DETAILS: (id: string) => `/resources/tools/${id}`,
  },
  CONTENT: {
    ARTICLES: '/content/articles',
    ARTICLE_DETAILS: (id: string) => `/content/articles/${id}`,
    NEWS: '/content/news',
    NEWS_DETAILS: (id: string) => `/content/news/${id}`,
    NEWSLETTER: '/content/newsletter',
  },
  CONTACT: {
    SEND: '/contact/send',
  },
};

// Mapeamento de endpoints para serviços mock
export const MOCK_ENDPOINT_MAP = {
  '/auth/': 'auth',
  '/users/': 'users',
  '/resources/guides': 'guides',
  '/resources/videos': 'videos',
  '/resources/tools': 'tools',
  '/content/articles': 'articles',
  '/content/news': 'news',
  '/content/newsletter': 'newsletter',
  '/contact/': 'contact',
}; 