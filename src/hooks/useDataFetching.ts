/**
 * useDataFetching - Hook genérico para busca de dados com tratamento de estados
 * 
 * Este hook consolida o padrão de fetch de dados com:
 * - Gerenciamento de estados de loading, erro, dados
 * - Integração com sistema de cache opcional
 * - Tratamento padronizado de erros
 * - Suporte a retry
 * - Integração com sistema de notificações
 * - Cancelamento de requisições quando o componente é desmontado
 */

import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { apiService } from '../services/api';
import { QueryParams, ApiResponse } from '../services/api/types';
import { useErrorHandler, ErrorType } from '../utils/errors';
import { useNotifications } from '../services/notifications';
import { NotificationType } from '../services/notifications/types';
import { useApiCache, useApiPaginatedCache } from './useApiCache';

// Tipos para as opções do hook
export interface DataFetchingOptions<T = any> {
  // Opções relacionadas à api
  endpoint: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  params?: QueryParams | null;
  body?: any;
  headers?: Record<string, string>;
  
  // Opções de comportamento
  autoFetch?: boolean;
  useCache?: boolean;
  cacheTime?: number;
  
  // Opções de retry
  retry?: boolean;
  maxRetries?: number;
  retryDelay?: number;
  
  // Callbacks
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  
  // Opções de notificação
  showSuccessNotification?: boolean;
  successTitle?: string;
  successMessage?: string;
  
  showErrorNotification?: boolean;
  errorTitle?: string;
  errorMessage?: string;
  
  // Opções de transformação de dados
  transform?: (data: any) => T;
  
  // Dados iniciais (se existirem)
  initialData?: T;
  
  // Para suporte a simulação e testes
  mockData?: T;
  mockDelay?: number;
  
  // Opções de paginação
  pagination?: {
    enabled: boolean;
    page?: number;
    limit?: number;
  };
}

// Tipo de retorno do hook
export interface DataFetchingResult<T = any> {
  // Dados e estados
  data: T | null;
  isLoading: boolean;
  isRefreshing: boolean;
  error: Error | null;
  
  // Métodos
  fetchData: () => Promise<T | null>;
  refetch: () => Promise<T | null>;
  reset: () => void;
  
  // Estado de sucesso e erro
  hasError: boolean;
  isSuccess: boolean;
  
  // Paginação (quando aplicável)
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    nextPage: () => void;
    prevPage: () => void;
    goToPage: (page: number) => void;
  };
}

/**
 * Hook genérico para busca de dados com tratamento de estados
 */
export function useDataFetching<T = any>(options: DataFetchingOptions<T>): DataFetchingResult<T> {
  // Configurar opções com defaults
  const {
    endpoint,
    method = 'GET',
    params = null,
    body = null,
    headers = {},
    autoFetch = true,
    useCache = false,
    cacheTime,
    retry = true,
    maxRetries = 3,
    retryDelay = 1000,
    onSuccess,
    onError,
    showSuccessNotification = false,
    successTitle = 'Sucesso',
    successMessage = 'Operação realizada com sucesso',
    showErrorNotification = true,
    errorTitle = 'Erro',
    errorMessage = 'Ocorreu um erro ao buscar os dados',
    transform,
    initialData = null,
    mockData = null,
    mockDelay = 0,
    pagination = { enabled: false, page: 1, limit: 10 }
  } = options;

  // Estados para gerenciamento de dados e loading
  const [data, setData] = useState<T | null>(initialData);
  const [isLoading, setIsLoading] = useState<boolean>(autoFetch);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [retryCount, setRetryCount] = useState<number>(0);
  
  // Ref para controlar o cancelamento de requisições
  const cancelRequest = useRef<boolean>(false);
  
  // Hooks para tratamento de erros e notificações
  const { handleError, getUserFriendlyMessage } = useErrorHandler();
  const { showToast } = useNotifications();
  
  // Se estiver usando cache, usar os hooks específicos de cache
  const cacheResult = useCache ? 
    useApiCache<T>(endpoint, params || {}, { expiresIn: cacheTime }) :
    null;
    
  // Se estiver usando paginação, usar o hook específico de paginação
  const paginationResult = (useCache && pagination.enabled) ?
    useApiPaginatedCache<T>(
      endpoint, 
      pagination.page || 1, 
      pagination.limit || 10, 
      params || {}
    ) : null;
  
  // Calcular se há erro e se houve sucesso
  const hasError = Boolean(error);
  const isSuccess = Boolean(data) && !hasError;
  
  // Implementação da função principal de fetch
  const fetchData = useCallback(async (): Promise<T | null> => {
    // Não fazer nada se já estiver cancelado
    if (cancelRequest.current) return null;
    
    // Se estiver em modo de mock, retornar dados simulados após um delay
    if (mockData !== null) {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, mockDelay));
      setData(mockData);
      setIsLoading(false);
      setError(null);
      
      if (onSuccess) onSuccess(mockData);
      if (showSuccessNotification) {
        showToast({
          title: successTitle,
          message: successMessage,
          type: NotificationType.SUCCESS,
          autoClose: true
        });
      }
      
      return mockData;
    }
    
    // Se estiver usando cache e não for um refetch, usar dados do cache
    if (useCache && !isRefreshing) {
      if (pagination.enabled && paginationResult) {
        setData(paginationResult.data?.data as T || null);
        setIsLoading(paginationResult.isLoading);
        setError(paginationResult.error);
        return paginationResult.data?.data as T || null;
      } else if (cacheResult) {
        setData(cacheResult.data?.data as T || null);
        setIsLoading(cacheResult.isLoading);
        setError(cacheResult.error);
        return cacheResult.data?.data as T || null;
      }
    }
    
    // Iniciar loading
    setIsLoading(true);
    setError(null);
    
    try {
      // Escolher método apropriado baseado no método HTTP
      let response: ApiResponse<any>;
      
      switch (method) {
        case 'GET':
          response = await apiService.get(endpoint, params, { headers });
          break;
        case 'POST':
          response = await apiService.post(endpoint, body, { headers });
          break;
        case 'PUT':
          response = await apiService.put(endpoint, body, { headers });
          break;
        case 'DELETE':
          response = await apiService.delete(endpoint, params, { headers });
          break;
        case 'PATCH':
          response = await apiService.patch(endpoint, body, { headers });
          break;
        default:
          response = await apiService.get(endpoint, params, { headers });
      }
      
      // Verificar se a requisição foi cancelada durante o processo
      if (cancelRequest.current) return null;
      
      // Verificar sucesso da resposta
      if (response.success && response.data) {
        // Transformar dados se necessário
        const transformedData = transform ? transform(response.data) : response.data;
        setData(transformedData);
        
        // Callbacks e notificações
        if (onSuccess) onSuccess(transformedData);
        if (showSuccessNotification) {
          showToast({
            title: successTitle,
            message: successMessage,
            type: NotificationType.SUCCESS,
            autoClose: true
          });
        }
        
        return transformedData;
      } else {
        // Tratar erro da API quando success = false
        const apiError = new Error(response.message || 'Erro desconhecido na API');
        throw apiError;
      }
    } catch (err) {
      // Não processar erro se a requisição foi cancelada
      if (cancelRequest.current) return null;
      
      // Processar erro
      const processedError = err instanceof Error ? err : new Error('Erro desconhecido');
      
      // Tentar novamente se configurado para retry e ainda não atingiu o limite
      if (retry && retryCount < maxRetries) {
        setRetryCount(prev => prev + 1);
        
        // Agendar nova tentativa com delay exponencial
        const exponentialDelay = retryDelay * Math.pow(2, retryCount);
        setTimeout(() => {
          if (!cancelRequest.current) fetchData();
        }, exponentialDelay);
        
        return null;
      }
      
      // Definir erro no estado
      setError(processedError);
      
      // Callback de erro e notificação
      if (onError) onError(processedError);
      if (showErrorNotification) {
        showToast({
          title: errorTitle,
          message: processedError.message || errorMessage,
          type: NotificationType.ERROR,
          autoClose: true
        });
      }
      
      // Log e tratamento de erro
      handleError(processedError);
      
      return null;
    } finally {
      // Finalizar loading apenas se a requisição não foi cancelada
      if (!cancelRequest.current) {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    }
  }, [
    endpoint, 
    method, 
    params, 
    body, 
    headers, 
    useCache, 
    cacheResult, 
    paginationResult, 
    isRefreshing, 
    mockData, 
    mockDelay,
    retryCount,
    maxRetries,
    retryDelay,
    onSuccess,
    onError,
    transform,
    showSuccessNotification,
    successTitle,
    successMessage,
    showErrorNotification,
    errorTitle,
    errorMessage,
    pagination
  ]);
  
  // Função para forçar um refetch, ignorando o cache
  const refetch = useCallback(async (): Promise<T | null> => {
    setIsRefreshing(true);
    return fetchData();
  }, [fetchData]);
  
  // Função para resetar o estado
  const reset = useCallback(() => {
    setData(initialData);
    setError(null);
    setIsLoading(false);
    setIsRefreshing(false);
    setRetryCount(0);
  }, [initialData]);
  
  // Efeito para busca inicial de dados se autoFetch estiver habilitado
  useEffect(() => {
    // Reiniciar a flag de cancelamento
    cancelRequest.current = false;
    
    // Se autoFetch e não estiver usando hooks de cache diretamente
    if (autoFetch && !useCache) {
      fetchData();
    }
    
    // Função de cleanup para cancelar requisições ao desmontar
    return () => {
      cancelRequest.current = true;
    };
  }, [autoFetch, fetchData, useCache]);
  
  // Construir objeto de paginação quando aplicável
  const paginationControls = useMemo(() => {
    if (!pagination.enabled) return undefined;
    
    // Se estiver usando o hook de paginação, usar seus controles
    if (paginationResult) {
      return {
        page: paginationResult.pagination?.page || 1,
        limit: paginationResult.pagination?.limit || 10,
        total: paginationResult.pagination?.total || 0,
        totalPages: paginationResult.pagination?.totalPages || 0,
        hasNextPage: paginationResult.hasNextPage,
        hasPrevPage: paginationResult.hasPrevPage,
        nextPage: paginationResult.nextPage,
        prevPage: paginationResult.prevPage,
        goToPage: paginationResult.goToPage
      };
    }
    
    // Caso contrário, retornar valores padrão
    return {
      page: pagination.page || 1,
      limit: pagination.limit || 10,
      total: 0,
      totalPages: 0,
      hasNextPage: false,
      hasPrevPage: false,
      nextPage: () => {},
      prevPage: () => {},
      goToPage: () => {}
    };
  }, [pagination, paginationResult]);
  
  // Retornar objeto com todos os dados e métodos
  return {
    data,
    isLoading,
    isRefreshing,
    error,
    fetchData,
    refetch,
    reset,
    hasError,
    isSuccess,
    pagination: paginationControls
  };
}

export default useDataFetching; 