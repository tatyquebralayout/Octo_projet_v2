/**
 * Hook para integrar o sistema de cache com o serviço de API
 * Fornece uma interface simples para buscar dados da API com cache
 */
import { useCallback, useMemo, useState, useEffect, useRef } from 'react';
import { useCache, useCacheWithMutation } from './useCache';
import { apiService } from '../services/api';
import { QueryParams, ApiResponse } from '../services/api/types';
import { CacheOptions } from '../services/cache/types';
import { CACHE_TTL, ENDPOINT_TTL_MAP } from '../services/cache/config';

// Configuração de backoff exponencial para revalidação
const BACKOFF_CONFIG = {
  initialDelay: 5000,       // 5 segundos
  maxDelay: 60 * 60 * 1000, // 1 hora
  factor: 2,                // Fator multiplicativo para backoff exponencial
  maxRetries: 5,            // Número máximo de tentativas
};

// Armazena informações sobre tentativas de revalidação para implementar backoff
interface RevalidationAttempts {
  [key: string]: {
    count: number;
    lastAttempt: number;
    nextDelay: number;
  };
}

// Singleton para rastrear tentativas de revalidação
const revalidationTracker: RevalidationAttempts = {};

/**
 * Registra uma tentativa de revalidação para implementar backoff exponencial
 * @param key Chave do cache
 * @returns Se deve tentar revalidar novamente
 */
function trackRevalidationAttempt(key: string): boolean {
  const now = Date.now();
  
  // Inicializar rastreamento se não existir
  if (!revalidationTracker[key]) {
    revalidationTracker[key] = {
      count: 0,
      lastAttempt: now,
      nextDelay: BACKOFF_CONFIG.initialDelay,
    };
  }
  
  const tracker = revalidationTracker[key];
  
  // Verificar se já excedeu o número máximo de tentativas
  if (tracker.count >= BACKOFF_CONFIG.maxRetries) {
    // Resetar contador após um dia para permitir novas tentativas
    if (now - tracker.lastAttempt > 24 * 60 * 60 * 1000) {
      tracker.count = 0;
      tracker.nextDelay = BACKOFF_CONFIG.initialDelay;
    } else {
      return false; // Não tentar novamente
    }
  }
  
  // Verificar se já passou tempo suficiente para nova tentativa
  if (now - tracker.lastAttempt < tracker.nextDelay) {
    return false; // Muito cedo para nova tentativa
  }
  
  // Registrar nova tentativa
  tracker.count++;
  tracker.lastAttempt = now;
  tracker.nextDelay = Math.min(
    tracker.nextDelay * BACKOFF_CONFIG.factor,
    BACKOFF_CONFIG.maxDelay
  );
  
  return true; // Pode tentar revalidar
}

/**
 * Reseta o rastreador de revalidação para uma chave
 * @param key Chave do cache
 */
function resetRevalidationTracker(key: string): void {
  if (revalidationTracker[key]) {
    delete revalidationTracker[key];
  }
}

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
  const cacheKey = `api:${url}${params ? ':' + JSON.stringify(params) : ''}`;
  const isDevelopment = process.env.NODE_ENV === 'development';
  const isMounted = useRef(true);
  const [revalidationError, setRevalidationError] = useState<Error | null>(null);
  
  // Determinar TTL adequado para o endpoint
  const ttl = getEndpointTTL(url);
  
  // Configurar opções de cache com tratamento de erros aprimorado
  const enhancedOptions = useMemo(() => ({
    expiresIn: ttl,
    staleWhileRevalidate: true,
    // Em desenvolvimento, podemos suprimir erros de background por padrão
    suppressBackgroundErrors: isDevelopment || cacheOptions?.suppressBackgroundErrors,
    ...cacheOptions,
  }), [ttl, cacheOptions, isDevelopment]);
  
  // Função para buscar dados da API com mais contexto para erros
  const fetchData = useCallback(async () => {
    try {
      const response = await apiService.get<T>(url, params);
      
      if (!response.success) {
        // Erro mais descritivo com contexto
        const errorMessage = response.message || `Erro ao buscar dados de ${url}`;
        const error = new Error(errorMessage);
        // Adicionar contexto ao erro
        (error as any).context = {
          url,
          params,
          responseData: response
        };
        throw error;
      }
      
      // Se conseguiu buscar, resetar o rastreador de tentativas
      resetRevalidationTracker(cacheKey);
      return response.data;
    } catch (error) {
      // Adicionar tentativas de revalidação para implementar backoff
      if (!trackRevalidationAttempt(cacheKey)) {
        console.warn(`Backoff: Limitando tentativas de revalidação para ${cacheKey}`);
      }
      throw error;
    }
  }, [url, params, cacheKey]);
  
  // Usar o hook de cache com tratamento de erro aprimorado
  const result = useCache<T>(
    cacheKey,
    fetchData,
    enhancedOptions
  );
  
  // Atualizar estado de erro de revalidação quando houver erros
  useEffect(() => {
    // Ouvinte para erros específico para esta chave
    const handleError = (event: any) => {
      if (event.key === cacheKey && isMounted.current) {
        setRevalidationError(event.error);
      }
    };
    
    // Adicionar ouvinte ao montar
    document.addEventListener('cache:error', handleError);
    
    // Limpar ao desmontar
    return () => {
      isMounted.current = false;
      document.removeEventListener('cache:error', handleError);
    };
  }, [cacheKey]);
  
  // Retornar resultado com informações adicionais sobre revalidação
  return {
    ...result,
    revalidationError,
    // Método para limpeza manual do erro de revalidação
    clearRevalidationError: () => setRevalidationError(null),
  };
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
  const cacheKey = `api:${url}${params ? ':' + JSON.stringify(params) : ''}`;
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  // Determinar TTL adequado para o endpoint
  const ttl = getEndpointTTL(url);
  
  // Configurar opções de cache com tratamento de erros aprimorado
  const enhancedOptions = useMemo(() => ({
    expiresIn: ttl,
    staleWhileRevalidate: true,
    // Em desenvolvimento, podemos suprimir erros de background por padrão
    suppressBackgroundErrors: isDevelopment || cacheOptions?.suppressBackgroundErrors,
    ...cacheOptions,
  }), [ttl, cacheOptions, isDevelopment]);
  
  // Função para buscar dados da API com mais contexto para erros
  const fetchData = useCallback(async () => {
    try {
      const response = await apiService.get<T>(url, params);
      
      if (!response.success) {
        // Erro mais descritivo com contexto
        const errorMessage = response.message || `Erro ao buscar dados de ${url}`;
        const error = new Error(errorMessage);
        // Adicionar contexto ao erro
        (error as any).context = {
          url,
          params,
          responseData: response
        };
        throw error;
      }
      
      // Se conseguiu buscar, resetar o rastreador de tentativas
      resetRevalidationTracker(cacheKey);
      return response.data;
    } catch (error) {
      // Adicionar tentativas de revalidação para implementar backoff
      if (!trackRevalidationAttempt(cacheKey)) {
        console.warn(`Backoff: Limitando tentativas de revalidação para ${cacheKey}`);
      }
      throw error;
    }
  }, [url, params, cacheKey]);
  
  // Usar o hook de cache com mutação
  return useCacheWithMutation<T, U>(
    cacheKey,
    fetchData,
    enhancedOptions
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
  // Estado local para parâmetros de paginação (evita referências mutáveis)
  const [queryParams, setQueryParams] = useState({
    page,
    limit,
    ...params
  });
  
  // Atualizar parâmetros quando props mudarem
  useEffect(() => {
    setQueryParams({
      page,
      limit,
      ...params
    });
  }, [page, limit, params]);
  
  // Implementar backoff exponencial para revalidação baseado em retryOptions
  const enhancedOptions = useMemo(() => {
    // Opções padrão para backoff se não forem especificadas
    const defaultRetryOptions = {
      maxRetries: 2,
      delayMs: 2000,
      backoffFactor: 2
    };
    
    // Mesclar opções fornecidas com as padrão
    const retryOptions = {
      ...defaultRetryOptions,
      ...cacheOptions?.retryOptions
    };
    
    // Função para registrar diagnóstico de tentativas
    const trackRetryAttempt = (error: any, attempt: number) => {
      console.debug(`[API Cache] Retry attempt ${attempt} for ${baseUrl}: ${error?.message || 'Unknown error'}`);
      if (cacheOptions?.retryOptions?.onRetry) {
        cacheOptions.retryOptions.onRetry(error, attempt);
      }
    };
    
    // Determinar se deve tentar novamente com base no tipo de erro
    const shouldRetry = (error: any, attempt: number) => {
      // Se o cliente forneceu função personalizada, use-a
      if (cacheOptions?.retryOptions?.shouldRetry) {
        return cacheOptions.retryOptions.shouldRetry(error, attempt);
      }
      
      // Lógica padrão: tente novamente para erros de rede e servidor
      const isNetworkError = error?.type === 'network' || 
        (error?.message && (
          error.message.includes('network') || 
          error.message.includes('timeout') || 
          error.message.includes('connection')
        ));
        
      const isServerError = error?.type === 'server' || 
        (error?.statusCode && error.statusCode >= 500) ||
        (error?.message && (
          error.message.includes('server') || 
          error.message.includes('Erro ao carregar')
        ));
        
      return (isNetworkError || isServerError) && attempt <= retryOptions.maxRetries;
    };
    
    // Retornar opções de cache aprimoradas
    return {
      ...cacheOptions,
      retryOptions: {
        ...retryOptions,
        shouldRetry,
        onRetry: trackRetryAttempt
      }
    };
  }, [baseUrl, cacheOptions]);
  
  // Usar o hook de cache para API com opções melhoradas
  const result = useApiCache<{
    data: T[];
    pagination?: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    }
  }>(
    baseUrl, 
    queryParams, 
    enhancedOptions
  );
  
  // Funções para navegação entre páginas com otimizações
  const goToPage = useCallback((newPage: number) => {
    if (newPage < 1) return;
    
    // Verificar limites de paginação se disponíveis
    if (result.data?.pagination?.totalPages && newPage > result.data.pagination.totalPages) {
      return;
    }
    
    // Apenas atualizar se a página for diferente
    if (newPage !== queryParams.page) {
      // Usar setState para garantir imutabilidade
      setQueryParams(prev => ({
        ...prev,
        page: newPage
      }));
    }
  }, [result.data?.pagination?.totalPages, queryParams.page]);
  
  const nextPage = useCallback(() => {
    const page = result.data?.pagination?.page;
    const totalPages = result.data?.pagination?.totalPages;
    
    if (page !== undefined && totalPages !== undefined && page < totalPages) {
      goToPage(page + 1);
    }
  }, [result.data?.pagination, goToPage]);
  
  const prevPage = useCallback(() => {
    const page = result.data?.pagination?.page;
    
    if (page !== undefined && page > 1) {
      goToPage(page - 1);
    }
  }, [result.data?.pagination, goToPage]);
  
  // Verificar se há páginas anterior e próxima
  const hasNextPage = Boolean(
    result.data?.pagination?.page !== undefined && 
    result.data?.pagination?.totalPages !== undefined && 
    result.data.pagination.page < result.data.pagination.totalPages
  );
  
  const hasPrevPage = Boolean(
    result.data?.pagination?.page !== undefined && 
    result.data.pagination.page > 1
  );
  
  return {
    ...result,
    pagination: result.data?.pagination,
    items: result.data?.data || [],
    goToPage,
    nextPage,
    prevPage,
    hasNextPage,
    hasPrevPage
  };
}

export default useApiCache; 