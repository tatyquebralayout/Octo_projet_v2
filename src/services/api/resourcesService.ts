/**
 * Serviço de recursos para o OCTO
 * Fornece métodos para interagir com guias, ferramentas e vídeos
 */
import { apiService } from './apiService';
import { ApiResponse, PaginatedResponse, QueryParams } from './types';
import { ENDPOINTS } from './config';

// Tipos locais para o serviço de recursos
interface Guide {
  id: string;
  title: string;
  description: string;
  downloadUrl: string;
  thumbnailUrl?: string;
  createdAt: string;
  category: string;
  tags: string[];
}

interface Tool {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  isPremium: boolean;
  imageUrl?: string;
  tags: string[];
}

interface Video {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnailUrl: string;
  duration: number;
  category: string;
  publishedAt: string;
  tags: string[];
}

// Classe do serviço de recursos
class ResourcesService {
  /**
   * Obtém lista paginada de guias
   * @param params Parâmetros de paginação e filtros
   * @returns Lista paginada de guias
   */
  async getGuides(params?: QueryParams): Promise<ApiResponse<PaginatedResponse<Guide>>> {
    return apiService.get<PaginatedResponse<Guide>>(ENDPOINTS.RESOURCES.GUIDES, params);
  }

  /**
   * Obtém um guia pelo ID
   * @param id ID do guia
   * @returns Detalhes do guia
   */
  async getGuideById(id: string): Promise<ApiResponse<Guide>> {
    return apiService.get<Guide>(`${ENDPOINTS.RESOURCES.GUIDES}/${id}`);
  }

  /**
   * Obtém lista paginada de ferramentas
   * @param params Parâmetros de paginação e filtros
   * @returns Lista paginada de ferramentas
   */
  async getTools(params?: QueryParams): Promise<ApiResponse<PaginatedResponse<Tool>>> {
    return apiService.get<PaginatedResponse<Tool>>(ENDPOINTS.RESOURCES.TOOLS, params);
  }

  /**
   * Obtém uma ferramenta pelo ID
   * @param id ID da ferramenta
   * @returns Detalhes da ferramenta
   */
  async getToolById(id: string): Promise<ApiResponse<Tool>> {
    return apiService.get<Tool>(`${ENDPOINTS.RESOURCES.TOOLS}/${id}`);
  }

  /**
   * Obtém lista paginada de vídeos
   * @param params Parâmetros de paginação e filtros
   * @returns Lista paginada de vídeos
   */
  async getVideos(params?: QueryParams): Promise<ApiResponse<PaginatedResponse<Video>>> {
    return apiService.get<PaginatedResponse<Video>>(ENDPOINTS.RESOURCES.VIDEOS, params);
  }

  /**
   * Obtém um vídeo pelo ID
   * @param id ID do vídeo
   * @returns Detalhes do vídeo
   */
  async getVideoById(id: string): Promise<ApiResponse<Video>> {
    return apiService.get<Video>(`${ENDPOINTS.RESOURCES.VIDEOS}/${id}`);
  }

  /**
   * Filtra recursos por categoria
   * @param category Categoria para filtrar
   * @param params Parâmetros adicionais
   * @returns Recursos correspondentes à categoria
   */
  async getResourcesByCategory(category: string, params?: QueryParams): Promise<ApiResponse<{
    guides: Guide[];
    tools: Tool[];
    videos: Video[];
  }>> {
    const queryParams = {
      category,
      ...params
    };
    
    // Realiza requisições paralelas
    const [guides, tools, videos] = await Promise.all([
      apiService.get<PaginatedResponse<Guide>>(ENDPOINTS.RESOURCES.GUIDES, queryParams),
      apiService.get<PaginatedResponse<Tool>>(ENDPOINTS.RESOURCES.TOOLS, queryParams),
      apiService.get<PaginatedResponse<Video>>(ENDPOINTS.RESOURCES.VIDEOS, queryParams)
    ]);
    
    return {
      success: true,
      data: {
        guides: guides.data.data,
        tools: tools.data.data,
        videos: videos.data.data
      }
    };
  }

  /**
   * Busca recursos por tag
   * @param tag Tag para pesquisar
   * @param params Parâmetros adicionais
   * @returns Recursos marcados com a tag
   */
  async getResourcesByTag(tag: string, params?: QueryParams): Promise<ApiResponse<{
    guides: Guide[];
    tools: Tool[];
    videos: Video[];
  }>> {
    const queryParams = {
      tag,
      ...params
    };
    
    // Realiza requisições paralelas
    const [guides, tools, videos] = await Promise.all([
      apiService.get<PaginatedResponse<Guide>>(ENDPOINTS.RESOURCES.GUIDES, queryParams),
      apiService.get<PaginatedResponse<Tool>>(ENDPOINTS.RESOURCES.TOOLS, queryParams),
      apiService.get<PaginatedResponse<Video>>(ENDPOINTS.RESOURCES.VIDEOS, queryParams)
    ]);
    
    return {
      success: true,
      data: {
        guides: guides.data.data,
        tools: tools.data.data,
        videos: videos.data.data
      }
    };
  }
}

// Exporta uma instância única do serviço
export const resourcesService = new ResourcesService(); 