/**
 * Configuração para o serviço de API do OCTO
 * Contém constantes e configurações para o serviço
 */

// Constantes para ambiente
export const API_ENV = {
  // URL base da API
  BASE_URL: import.meta.env.VITE_API_URL || 'https://api.octo.org.br/v1',
  
  // Ambiente de desenvolvimento
  IS_DEV: import.meta.env.MODE === 'development',
  
  // Timeout padrão para requisições (em ms)
  TIMEOUT: 30000,
  
  // Habilitação de mocks por padrão em desenvolvimento
  MOCK_ENABLED: import.meta.env.VITE_ENABLE_MOCKS === 'true' || import.meta.env.MODE === 'development',
  
  // Delay simulado para mocks (em ms)
  MOCK_DELAY: {
    MIN: 200,  // Mínimo de delay para mocks (ms)
    MAX: 1000, // Máximo de delay para mocks (ms)
  },
  
  // Probabilidade de erro simulado em ambiente de desenvolvimento
  MOCK_ERROR_RATE: 0.05, // 5% de chance de erro
};

// Configuração para storage de tokens
export const AUTH_CONFIG = {
  // Chave para armazenamento do token no localStorage
  TOKEN_KEY: 'octo:auth:token',
  
  // Chave para armazenamento do refresh token
  REFRESH_TOKEN_KEY: 'octo:auth:refresh-token',
  
  // Chave para armazenamento dos dados do usuário
  USER_KEY: 'octo:auth:user',
  
  // Cabeçalho de autorização
  AUTH_HEADER: 'Authorization',
  
  // Prefixo para o token no cabeçalho
  TOKEN_PREFIX: 'Bearer',
};

// Endpoints da API
export const ENDPOINTS = {
  // Autenticação
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    REGISTER: '/auth/register',
  },
  
  // Usuários
  USERS: {
    BASE: '/users',
    PROFILE: '/users/profile',
    BY_ID: (id: string) => `/users/${id}`,
    UPDATE_PROFILE: '/users/profile',
    CHANGE_PASSWORD: '/users/change-password',
  },
  
  // Conteúdo
  CONTENT: {
    ARTICLES: '/content/articles',
    COURSES: '/content/courses',
    NEWSLETTERS: '/content/newsletters',
    SEARCH: '/content/search',
  },
  
  // Recursos
  RESOURCES: {
    GUIDES: '/resources/guides',
    TOOLS: '/resources/tools',
    VIDEOS: '/resources/videos',
  },
  
  // Contato
  CONTACT: {
    SUBMIT: '/contact/submit',
    SUBSCRIBE: '/contact/subscribe',
  },
  
  // Notícias
  NEWS: {
    BASE: '/news',
    FEATURED: '/news/featured',
    BY_CATEGORY: (category: string) => `/news/category/${category}`,
    BY_TAG: (tag: string) => `/news/tag/${tag}`,
    BY_SLUG: (slug: string) => `/news/${slug}`,
    RELATED: (id: string) => `/news/${id}/related`,
  },
  
  // Cartilhas
  GUIDES: {
    BASE: '/guides',
    FEATURED: '/guides/featured',
    BY_CATEGORY: (category: string) => `/guides/category/${category}`,
    BY_ID: (id: string) => `/guides/${id}`,
    DOWNLOAD: (id: string) => `/guides/${id}/download`,
  },
}; 