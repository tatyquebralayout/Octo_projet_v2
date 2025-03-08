/**
 * Hook para integrar o sistema de cache com o serviço de API
 * Fornece uma interface simples para buscar dados da API com cache
 */
import { useCallback } from 'react';
import { useCache, useCacheWithMutation } from './useCache';
import { apiService } from '../services/api';
import { QueryParams } from '../services/api/types';
import { CacheOptions } from '../services/cache/types';
import { CACHE_TTL, ENDPOINT_TTL_MAP } from '../services/cache/config';

/**
 * Determina o TTL (time-to-live) adequado para um endpoint
 * @param url URL do endpoint
 * @returns Tempo de expiração em milissegundos
 */
function getEndpointTTL(url: string): number {
  // Verificar se há um TTL específico para este endpoint
  for (const [endpoint, ttl] of Object.entries(ENDPOINT_TTL_MAP)) {
    if (url.includes(endpoint)) {
      return ttl;
    }
  }
  
  // TTL padrão para endpoints não mapeados
  return CACHE_TTL.NORMAL;
}

/**
 * Hook para buscar dados da API com suporte a cache
 * @param url URL do endpoint
 * @param params Parâmetros de consulta
 * @param cacheOptions Opções de cache
 * @returns Dados, estado de carregamento e erro
 */
export function useApiCache<T = any>(
  url: string,
  params?: QueryParams,
  cacheOptions?: Partial<CacheOptions>
) {
  // Determinar TTL adequado para o endpoint
  const ttl = getEndpointTTL(url);
  
  // Função para buscar dados da API
  const fetchData = useCallback(async () => {
    const response = await apiService.get<T>(url, params);
    
    if (!response.success) {
      throw new Error(response.message || 'Erro ao buscar dados');
    }
    
    return response.data;
  }, [url, params]);
  
  // Usar o hook de cache
  return useCache<T>(
    `api:${url}${params ? ':' + JSON.stringify(params) : ''}`,
    fetchData,
    {
      expiresIn: ttl,
      staleWhileRevalidate: true,
      ...cacheOptions
    }
  );
}

/**
 * Hook para buscar dados da API com suporte a cache e mutação
 * @param url URL do endpoint
 * @param params Parâmetros de consulta
 * @param cacheOptions Opções de cache
 * @returns Dados, estado de carregamento, erro e funções para mutação
 */
export function useApiCacheWithMutation<T = any, U = Partial<T>>(
  url: string,
  params?: QueryParams,
  cacheOptions?: Partial<CacheOptions>
) {
  // Determinar TTL adequado para o endpoint
  const ttl = getEndpointTTL(url);
  
  // Função para buscar dados da API
  const fetchData = useCallback(async () => {
    const response = await apiService.get<T>(url, params);
    
    if (!response.success) {
      throw new Error(response.message || 'Erro ao buscar dados');
    }
    
    return response.data;
  }, [url, params]);
  
  // Usar o hook de cache com mutação
  return useCacheWithMutation<T, U>(
    `api:${url}${params ? ':' + JSON.stringify(params) : ''}`,
    fetchData,
    {
      expiresIn: ttl,
      staleWhileRevalidate: true,
      ...cacheOptions
    }
  );
}

/**
 * Hook para buscar dados paginados da API com suporte a cache
 * @param baseUrl URL base do endpoint
 * @param page Número da página
 * @param limit Limite de itens por página
 * @param params Parâmetros adicionais
 * @param cacheOptions Opções de cache
 * @returns Dados paginados, estado de carregamento e erro
 */
export function useApiPaginatedCache<T = any>(
  baseUrl: string,
  page: number = 1,
  limit: number = 10,
  params?: QueryParams,
  cacheOptions?: Partial<CacheOptions>
) {
  // Combinar parâmetros de paginação com outros parâmetros
  const queryParams = {
    page,
    limit,
    ...params
  };
  
  // Usar o hook de cache para API
  const result = useApiCache<{
    data: T[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    }
  }>(baseUrl, queryParams, cacheOptions);
  
  // Funções para navegação entre páginas
  const goToPage = useCallback((newPage: number) => {
    if (newPage < 1 || (result.data?.pagination.totalPages && newPage > result.data.pagination.totalPages)) {
      return;
    }
    
    // Atualizar a página nos parâmetros
    queryParams.page = newPage;
    
    // Forçar atualização
    result.refresh();
  }, [result, queryParams]);
  
  const nextPage = useCallback(() => {
    if (result.data?.pagination.page < result.data?.pagination.totalPages) {
      goToPage(result.data.pagination.page + 1);
    }
  }, [result.data, goToPage]);
  
  const prevPage = useCallback(() => {
    if (result.data?.pagination.page > 1) {
      goToPage(result.data.pagination.page - 1);
    }
  }, [result.data, goToPage]);
  
  return {
    ...result,
    pagination: result.data?.pagination,
    items: result.data?.data || [],
    goToPage,
    nextPage,
    prevPage,
    hasNextPage: result.data?.pagination.page < result.data?.pagination.totalPages,
    hasPrevPage: result.data?.pagination.page > 1
  };
}

export default useApiCache; 