/**
 * Serviço principal de API do OCTO
 * Fornece interface para comunicação com o backend
 */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { 
  ApiError, 
  ApiOptions, 
  ApiResponse, 
  AuthToken, 
  QueryParams,
  PaginatedResponse
} from './types';
import { API_ENV, AUTH_CONFIG } from './config';
import { mockServices } from './mockService';
import { logger } from '../../utils/logger';
import { 
  errorHandler, 
  ErrorType, 
  withRetry,
  HTTP_ERROR_MAPPING
} from '../../utils/errors';

class ApiService {
  private instance: AxiosInstance;
  private mockEnabled: boolean;
  
  constructor(options: ApiOptions) {
    this.mockEnabled = options.mockEnabled || API_ENV.MOCK_ENABLED;
    
    // Criação da instância do Axios
    this.instance = axios.create({
      baseURL: options.baseURL || API_ENV.BASE_URL,
      timeout: options.timeout || API_ENV.TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
    
    // Configuração dos interceptors
    this.setupInterceptors();
  }
  
  // Configuração dos interceptors para request e response
  private setupInterceptors(): void {
    // Interceptor de requisição
    this.instance.interceptors.request.use(
      (config) => {
        // Log de requisição
        logger.info(`API Request: ${config.method?.toUpperCase()} ${config.url}`, {
          url: config.url,
          method: config.method,
          data: config.data,
          params: config.params
        });
        
        // Adiciona token de autenticação se disponível
        const token = this.getAuthToken();
        if (token && config.headers) {
          config.headers[AUTH_CONFIG.AUTH_HEADER] = `${AUTH_CONFIG.TOKEN_PREFIX} ${token}`;
        }
        
        return config;
      },
      (error) => {
        logger.error('Request Error:', error);
        return Promise.reject(error);
      }
    );
    
    // Interceptor de resposta
    this.instance.interceptors.response.use(
      (response) => {
        // Log de resposta bem-sucedida
        logger.info(`API Response: ${response.status} ${response.config.url}`, {
          status: response.status,
          data: response.data
        });
        
        return response;
      },
      (error: AxiosError) => {
        // Log de erro na resposta
        logger.error(`API Error: ${error.response?.status || 'Network Error'}`, {
          status: error.response?.status,
          data: error.response?.data,
          url: error.config?.url
        });
        
        // Tratamento de erro de autenticação (401)
        if (error.response?.status === 401) {
          // Tenta renovar o token se for um erro de token expirado
          if (this.isTokenExpiredError(error)) {
            return this.handleTokenRefresh(error.config);
          }
          
          // Caso contrário, limpa os dados de autenticação
          this.clearAuthData();
        }
        
        // Formata o erro para um formato padrão e processa com o errorHandler
        const appError = errorHandler.createAppError(error, {
          type: error.response?.status ? HTTP_ERROR_MAPPING[error.response.status] || ErrorType.UNKNOWN : ErrorType.NETWORK,
          context: {
            url: error.config?.url,
            method: error.config?.method,
            status: error.response?.status,
            responseData: error.response?.data
          }
        });
        
        // Não logar aqui para evitar duplicação de logs, pois o errorHandler já loga
        return Promise.reject(appError);
      }
    );
  }
  
  // Verificação se o erro é de token expirado
  private isTokenExpiredError(error: AxiosError): boolean {
    // Lógica para identificar erro de token expirado
    const errorData = error.response?.data as any;
    return error.response?.status === 401 && 
      (errorData?.code === 'token_expired' || 
       errorData?.message?.includes('expired'));
  }
  
  // Tratamento de renovação de token
  private async handleTokenRefresh(originalConfig?: AxiosRequestConfig): Promise<AxiosResponse> {
    try {
      // Tenta renovar o token
      const refreshToken = localStorage.getItem(AUTH_CONFIG.REFRESH_TOKEN_KEY);
      
      if (!refreshToken) {
        throw errorHandler.createAppError(new Error('Refresh token não disponível'), {
          type: ErrorType.AUTHENTICATION,
          code: 'REFRESH_TOKEN_MISSING'
        });
      }
      
      // Chamar a API para renovar o token
      const response = await this.instance.post('/auth/refresh', {
        refreshToken
      });
      
      const { accessToken, expiresIn } = response.data.data;
      
      // Atualiza o token armazenado
      localStorage.setItem(AUTH_CONFIG.TOKEN_KEY, accessToken);
      
      // Reenviar a requisição original com o novo token
      if (originalConfig) {
        originalConfig.headers = {
          ...originalConfig.headers,
          [AUTH_CONFIG.AUTH_HEADER]: `${AUTH_CONFIG.TOKEN_PREFIX} ${accessToken}`
        };
        return this.instance(originalConfig);
      } else {
        throw errorHandler.createAppError(new Error('Configuração original não disponível'), {
          type: ErrorType.CLIENT,
          code: 'MISSING_CONFIG'
        });
      }
    } catch (refreshError) {
      // Se a renovação falhar, limpa os dados de autenticação
      this.clearAuthData();
      
      // Processa o erro com o errorHandler
      const appError = errorHandler.createAppError(refreshError, {
        type: ErrorType.AUTHENTICATION,
        code: 'REFRESH_TOKEN_FAILED'
      });
      
      return Promise.reject(appError);
    }
  }
  
  // Obtenção do token de autenticação
  private getAuthToken(): string | null {
    return localStorage.getItem(AUTH_CONFIG.TOKEN_KEY);
  }
  
  // Limpeza dos dados de autenticação
  private clearAuthData(): void {
    localStorage.removeItem(AUTH_CONFIG.TOKEN_KEY);
    localStorage.removeItem(AUTH_CONFIG.REFRESH_TOKEN_KEY);
    localStorage.removeItem(AUTH_CONFIG.USER_KEY);
    
    // Aqui você pode adicionar lógica para redirecionar para a página de login
  }
  
  // Métodos auxiliares para preparar parâmetros e mock
  private prepareParams(params?: QueryParams): Record<string, string> {
    if (!params) return {};
    
    // Converte os parâmetros para formato de string
    return Object.entries(params).reduce((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = String(value);
      }
      return acc;
    }, {} as Record<string, string>);
  }
  
  private async mockResponse<T>(url: string, method: string, data?: any): Promise<T> {
    if (!this.mockEnabled) {
      throw new Error('Mock não está habilitado');
    }
    
    // Encontrar o serviço mock correspondente ao endpoint
    const mockFn = Object.entries(mockServices).find(([endpoint, fn]) => {
      return url.includes(endpoint);
    })?.[1];
    
    if (!mockFn) {
      throw errorHandler.createAppError(new Error(`Mock não encontrado para ${method} ${url}`), {
        type: ErrorType.CLIENT,
        code: 'MOCK_NOT_FOUND'
      });
    }
    
    try {
      // Executa a função mock com os dados fornecidos
      const result = await mockFn(data);
      return result as unknown as T;
    } catch (error) {
      // Processa o erro usando o errorHandler
      throw errorHandler.handleError(error, {
        context: { url, method, mockData: data },
        rethrow: true
      });
    }
  }
  
  // Métodos públicos da API
  
  // GET - Obter dados com suporte a retry
  async get<T = any>(url: string, params?: QueryParams, retry = false): Promise<ApiResponse<T>> {
    const operation = async () => {
      try {
        if (this.mockEnabled) {
          return await this.mockResponse<ApiResponse<T>>(url, 'GET', params);
        }
        
        const response = await this.instance.get<ApiResponse<T>>(url, {
          params: this.prepareParams(params)
        });
        
        return response.data;
      } catch (error) {
        if (error instanceof Error) {
          throw error;
        }
        
        throw new Error(`GET ${url} failed: ${String(error)}`);
      }
    };
    
    return retry 
      ? withRetry(operation)
      : operation();
  }
  
  // GET com cache - Obter dados com suporte a cache
  async getCached<T = any>(
    url: string, 
    params?: QueryParams, 
    cacheOptions?: import('../cache/types').CacheOptions
  ): Promise<ApiResponse<T>> {
    // Importar dinamicamente para evitar dependência circular
    const { cacheManager } = await import('../cache');
    
    // Gerar chave de cache baseada na URL e parâmetros
    const cacheKey = `${url}${params ? ':' + JSON.stringify(params) : ''}`;
    
    // Função para buscar dados frescos
    const fetchFn = async () => {
      return this.get<T>(url, params);
    };
    
    try {
      // Buscar do cache ou da API
      const result = await cacheManager.getOrFetch<ApiResponse<T>>(
        cacheKey,
        fetchFn,
        cacheOptions
      );
      
      return result.data;
    } catch (error) {
      // Se falhar, tentar buscar diretamente
      console.error(`Erro ao buscar dados em cache para ${url}:`, error);
      return fetchFn();
    }
  }
  
  // POST - Criar dados com suporte a retry
  async post<T = any, D = any>(url: string, data: D, retry = false): Promise<ApiResponse<T>> {
    const operation = async () => {
      try {
        if (this.mockEnabled) {
          return await this.mockResponse<ApiResponse<T>>(url, 'POST', data);
        }
        
        const response = await this.instance.post<ApiResponse<T>>(url, data);
        return response.data;
      } catch (error) {
        if (error instanceof Error) {
          throw error;
        }
        
        throw new Error(`POST ${url} failed: ${String(error)}`);
      }
    };
    
    return retry 
      ? withRetry(operation)
      : operation();
  }
  
  // PUT - Atualizar dados com suporte a retry
  async put<T = any, D = any>(url: string, data: D, retry = false): Promise<ApiResponse<T>> {
    const operation = async () => {
      try {
        if (this.mockEnabled) {
          return await this.mockResponse<ApiResponse<T>>(url, 'PUT', data);
        }
        
        const response = await this.instance.put<ApiResponse<T>>(url, data);
        return response.data;
      } catch (error) {
        if (error instanceof Error) {
          throw error;
        }
        
        throw new Error(`PUT ${url} failed: ${String(error)}`);
      }
    };
    
    return retry 
      ? withRetry(operation)
      : operation();
  }
  
  // PATCH - Atualizar dados parcialmente com suporte a retry
  async patch<T = any, D = any>(url: string, data: D, retry = false): Promise<ApiResponse<T>> {
    const operation = async () => {
      try {
        if (this.mockEnabled) {
          return await this.mockResponse<ApiResponse<T>>(url, 'PATCH', data);
        }
        
        const response = await this.instance.patch<ApiResponse<T>>(url, data);
        return response.data;
      } catch (error) {
        if (error instanceof Error) {
          throw error;
        }
        
        throw new Error(`PATCH ${url} failed: ${String(error)}`);
      }
    };
    
    return retry 
      ? withRetry(operation)
      : operation();
  }
  
  // DELETE - Remover dados com suporte a retry
  async delete<T = any>(url: string, retry = false): Promise<ApiResponse<T>> {
    const operation = async () => {
      try {
        if (this.mockEnabled) {
          return await this.mockResponse<ApiResponse<T>>(url, 'DELETE');
        }
        
        const response = await this.instance.delete<ApiResponse<T>>(url);
        return response.data;
      } catch (error) {
        if (error instanceof Error) {
          throw error;
        }
        
        throw new Error(`DELETE ${url} failed: ${String(error)}`);
      }
    };
    
    return retry 
      ? withRetry(operation)
      : operation();
  }
  
  // Método para habilitar/desabilitar mocks
  setMockEnabled(enabled: boolean): void {
    this.mockEnabled = enabled;
  }
}

// Exporta uma instância configurada do serviço de API
export const apiService = new ApiService({
  baseURL: API_ENV.BASE_URL,
  mockEnabled: API_ENV.MOCK_ENABLED,
});

// Re-exporta os tipos para facilitar o uso
export type { ApiResponse, PaginatedResponse, ApiError, QueryParams }; 