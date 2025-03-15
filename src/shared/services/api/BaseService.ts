import { ApiResponse, PaginatedResponse, QueryParams, ApiError } from '../../../types/api';
import { apiClient } from './apiClient';

/**
 * Classe base abstrata para todos os serviços de API
 * Fornece métodos CRUD básicos e outras funcionalidades comuns
 * Parte do plano de refatoração estrutural para serviços de API
 */
export abstract class BaseService<T> {
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  /**
   * Busca todos os registros, com suporte a paginação e filtros
   */
  async getAll(params?: QueryParams): Promise<PaginatedResponse<T>> {
    try {
      const response = await apiClient.get<PaginatedResponse<T>>(this.endpoint, { params });
      return response.data;
    } catch (error) {
      return this.handleApiError(error as Error);
    }
  }

  /**
   * Busca um registro pelo ID
   */
  async getById(id: string): Promise<T> {
    try {
      const response = await apiClient.get<ApiResponse<T>>(`${this.endpoint}/${id}`);
      return response.data.data;
    } catch (error) {
      return this.handleApiError(error as Error);
    }
  }

  /**
   * Cria um novo registro
   */
  async create(data: Partial<T>): Promise<T> {
    try {
      const response = await apiClient.post<ApiResponse<T>>(this.endpoint, data);
      return response.data.data;
    } catch (error) {
      return this.handleApiError(error as Error);
    }
  }

  /**
   * Atualiza um registro existente
   */
  async update(id: string, data: Partial<T>): Promise<T> {
    try {
      const response = await apiClient.put<ApiResponse<T>>(`${this.endpoint}/${id}`, data);
      return response.data.data;
    } catch (error) {
      return this.handleApiError(error as Error);
    }
  }

  /**
   * Atualiza parcialmente um registro existente
   */
  async patch(id: string, data: Partial<T>): Promise<T> {
    try {
      const response = await apiClient.patch<ApiResponse<T>>(`${this.endpoint}/${id}`, data);
      return response.data.data;
    } catch (error) {
      return this.handleApiError(error as Error);
    }
  }

  /**
   * Remove um registro pelo ID
   */
  async delete(id: string): Promise<boolean> {
    try {
      const response = await apiClient.delete<ApiResponse<boolean>>(`${this.endpoint}/${id}`);
      return response.data.data;
    } catch (error) {
      return this.handleApiError(error as Error);
    }
  }

  /**
   * Tratamento padronizado de erros da API
   */
  protected handleApiError(error: Error): never {
    // Se o erro já é formatado como ApiError, reutilizar
    if ((error as any).code && (error as any).status) {
      throw error;
    }

    // Se é um erro do Axios com resposta, extrair detalhes
    if ((error as any).response) {
      const axiosError = error as any;
      const status = axiosError.response.status;
      const data = axiosError.response.data || {};
      
      // Criar objeto de erro formatado
      const apiError: ApiError = {
        success: false,
        code: data.code || `ERROR_${status}`,
        message: data.message || 'Ocorreu um erro na requisição',
        status,
        path: axiosError.config?.url,
        details: data.details || {},
        timestamp: new Date().toISOString()
      };
      
      throw apiError;
    }

    // Para outros tipos de erro (rede, etc)
    const networkError: ApiError = {
      success: false,
      code: 'NETWORK_ERROR',
      message: error.message || 'Erro de conexão',
      status: 0,
      timestamp: new Date().toISOString()
    };
    
    throw networkError;
  }
} 