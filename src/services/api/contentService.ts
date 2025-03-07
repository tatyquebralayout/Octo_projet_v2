/**
 * Serviço de gerenciamento de conteúdo para o OCTO
 * Fornece métodos para interagir com artigos, cursos e outros recursos
 */
import { apiService } from './apiService';
import { ApiResponse, PaginatedResponse, QueryParams } from './types';
import { ENDPOINTS } from './config';

// Tipos locais para o serviço de conteúdo
interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  publishedAt: string;
  imageUrl?: string;
  tags: string[];
}

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  imageUrl?: string;
  modules: {
    id: string;
    title: string;
    description: string;
    lessons: {
      id: string;
      title: string;
      duration: number;
      videoUrl?: string;
    }[];
  }[];
}

interface Newsletter {
  id: string;
  title: string;
  content: string;
  sentAt: string;
}

// Classe do serviço de conteúdo
class ContentService {
  /**
   * Obtém lista paginada de artigos
   * @param params Parâmetros de paginação e filtros
   * @returns Lista paginada de artigos
   */
  async getArticles(params?: QueryParams): Promise<ApiResponse<PaginatedResponse<Article>>> {
    return apiService.get<PaginatedResponse<Article>>(ENDPOINTS.CONTENT.ARTICLES, params);
  }

  /**
   * Obtém um artigo pelo ID
   * @param id ID do artigo
   * @returns Detalhes do artigo
   */
  async getArticleById(id: string): Promise<ApiResponse<Article>> {
    return apiService.get<Article>(`${ENDPOINTS.CONTENT.ARTICLES}/${id}`);
  }

  /**
   * Obtém artigos relacionados a um tema ou tag
   * @param tag Tag ou tema para filtrar artigos
   * @param params Parâmetros adicionais
   * @returns Lista de artigos relacionados
   */
  async getRelatedArticles(tag: string, params?: QueryParams): Promise<ApiResponse<Article[]>> {
    return apiService.get<Article[]>(`${ENDPOINTS.CONTENT.ARTICLES}/related/${tag}`, params);
  }

  /**
   * Obtém lista paginada de cursos
   * @param params Parâmetros de paginação e filtros
   * @returns Lista paginada de cursos
   */
  async getCourses(params?: QueryParams): Promise<ApiResponse<PaginatedResponse<Course>>> {
    return apiService.get<PaginatedResponse<Course>>(ENDPOINTS.CONTENT.COURSES, params);
  }

  /**
   * Obtém um curso pelo ID
   * @param id ID do curso
   * @returns Detalhes do curso
   */
  async getCourseById(id: string): Promise<ApiResponse<Course>> {
    return apiService.get<Course>(`${ENDPOINTS.CONTENT.COURSES}/${id}`);
  }

  /**
   * Obtém lista de newsletters
   * @param params Parâmetros de paginação e filtros
   * @returns Lista paginada de newsletters
   */
  async getNewsletters(params?: QueryParams): Promise<ApiResponse<PaginatedResponse<Newsletter>>> {
    return apiService.get<PaginatedResponse<Newsletter>>(ENDPOINTS.CONTENT.NEWSLETTERS, params);
  }

  /**
   * Assina um usuário para receber newsletters
   * @param email Email para assinatura
   * @returns Resposta da assinatura
   */
  async subscribeToNewsletter(email: string): Promise<ApiResponse<{ message: string }>> {
    return apiService.post<{ message: string }>(
      `${ENDPOINTS.CONTENT.NEWSLETTERS}/subscribe`, 
      { email }
    );
  }

  /**
   * Busca conteúdo por palavra-chave
   * @param query Termo de pesquisa
   * @param params Parâmetros adicionais
   * @returns Resultados da pesquisa
   */
  async searchContent(query: string, params?: QueryParams): Promise<ApiResponse<{
    articles: Article[];
    courses: Course[];
  }>> {
    return apiService.get<{
      articles: Article[];
      courses: Course[];
    }>(ENDPOINTS.CONTENT.SEARCH, { 
      query, 
      ...params 
    });
  }
}

// Exporta uma instância única do serviço
export const contentService = new ContentService(); 