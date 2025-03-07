/**
 * Ponto de entrada principal para os serviços de API do OCTO
 * Exporta todos os serviços e tipos relevantes
 */

// Exportação dos serviços
export { apiService } from './apiService';
export { authService } from './authService';
export { contentService } from './contentService';
export { resourcesService } from './resourcesService';

// Exportação de configurações
export { API_ENV, AUTH_CONFIG, ENDPOINTS } from './config';

// Exportação de tipos
export type {
  ApiResponse,
  PaginatedResponse,
  ApiError,
  QueryParams,
  AuthToken,
  User,
  UserRole,
  AuthRequest,
  AuthResponse,
  ApiOptions,
  SearchFilter
} from './types';

// Documentação de uso básico
/**
 * Exemplos de uso:
 * 
 * 1. Autenticação:
 * ```
 * import { authService } from 'src/services/api';
 * 
 * // Login
 * const handleLogin = async (email, password) => {
 *   try {
 *     const response = await authService.login({ email, password });
 *     if (response.success) {
 *       // Usuário logado com sucesso
 *       console.log('Usuário logado:', response.data.user);
 *     }
 *   } catch (error) {
 *     console.error('Erro ao fazer login:', error);
 *   }
 * };
 * ```
 * 
 * 2. Obter conteúdo:
 * ```
 * import { contentService } from 'src/services/api';
 * 
 * // Listar artigos
 * const fetchArticles = async () => {
 *   try {
 *     const response = await contentService.getArticles({ page: 1, limit: 10 });
 *     if (response.success) {
 *       // Artigos obtidos com sucesso
 *       console.log('Artigos:', response.data.data);
 *       console.log('Paginação:', response.data.pagination);
 *     }
 *   } catch (error) {
 *     console.error('Erro ao buscar artigos:', error);
 *   }
 * };
 * ```
 * 
 * 3. Obter recursos:
 * ```
 * import { resourcesService } from 'src/services/api';
 * 
 * // Buscar recursos por categoria
 * const fetchResourcesByCategory = async (category) => {
 *   try {
 *     const response = await resourcesService.getResourcesByCategory(category);
 *     if (response.success) {
 *       // Recursos obtidos com sucesso
 *       console.log('Guias:', response.data.guides);
 *       console.log('Ferramentas:', response.data.tools);
 *       console.log('Vídeos:', response.data.videos);
 *     }
 *   } catch (error) {
 *     console.error('Erro ao buscar recursos:', error);
 *   }
 * };
 * ```
 */ 