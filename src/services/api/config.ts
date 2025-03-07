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
}; 