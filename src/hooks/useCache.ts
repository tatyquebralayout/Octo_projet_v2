/**
 * Hook para acessar o sistema de cache
 * Fornece uma interface simples para usar o cache em componentes React
 */
import { useState, useEffect, useCallback } from 'react';
import { cacheManager } from '../services/cache/cacheManager';
import { CacheOptions, CacheResult } from '../services/cache/types';

/**
 * Hook para buscar dados com suporte a cache
 * @param key Chave para o cache (geralmente URL)
 * @param fetchFn Função para buscar dados quando não estiverem em cache
 * @param options Opções de cache
 * @returns Dados, estado de carregamento e erro
 */
export function useCache<T>(
  key: string,
  fetchFn: () => Promise<T>,
  options?: CacheOptions
) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [cacheInfo, setCacheInfo] = useState<{
    fromCache: boolean;
    expiresAt?: number;
  }>({ fromCache: false });

  const fetchData = useCallback(async (forceRefresh = false) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await cacheManager.getOrFetch<T>(
        key,
        fetchFn,
        {
          ...options,
          forceRefresh
        }
      );

      setData(result.data);
      setCacheInfo({
        fromCache: result.fromCache,
        expiresAt: result.expiresAt
      });
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setIsLoading(false);
    }
  }, [key, fetchFn, options]);

  // Buscar dados na montagem do componente
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Função para forçar atualização
  const refresh = useCallback(() => {
    return fetchData(true);
  }, [fetchData]);

  // Função para invalidar o cache
  const invalidate = useCallback(async () => {
    await cacheManager.remove(key);
    return fetchData(true);
  }, [key, fetchData]);

  return {
    data,
    isLoading,
    error,
    refresh,
    invalidate,
    fromCache: cacheInfo.fromCache,
    expiresAt: cacheInfo.expiresAt
  };
}

/**
 * Hook para gerenciar dados em cache com suporte a mutação
 * @param key Chave para o cache (geralmente URL)
 * @param fetchFn Função para buscar dados quando não estiverem em cache
 * @param options Opções de cache
 * @returns Dados, estado de carregamento, erro e funções para mutação
 */
export function useCacheWithMutation<T, U = Partial<T>>(
  key: string,
  fetchFn: () => Promise<T>,
  options?: CacheOptions
) {
  // Usar o hook base para gerenciar o cache
  const cacheResult = useCache<T>(key, fetchFn, options);
  const { data, invalidate } = cacheResult;

  const [isMutating, setIsMutating] = useState(false);
  const [mutationError, setMutationError] = useState<Error | null>(null);
  const [mutatedData, setMutatedData] = useState<T | null>(null);

  // Atualizar dados mutados quando os dados originais mudarem
  useEffect(() => {
    if (data && !mutatedData) {
      setMutatedData(data);
    }
  }, [data, mutatedData]);

  // Função para atualizar dados
  const mutate = useCallback(async (
    updateFn: (data: T) => Promise<U>,
    optimisticUpdate?: (currentData: T) => T
  ) => {
    if (!data) {
      setMutationError(new Error('Não há dados para atualizar'));
      return;
    }

    setIsMutating(true);
    setMutationError(null);

    // Armazenar dados originais para caso de erro
    const originalData = data;

    // Aplicar atualização otimista se fornecida
    if (optimisticUpdate) {
      const updatedData = optimisticUpdate(originalData);
      setMutatedData(updatedData);
    }

    try {
      // Executar a função de atualização
      await updateFn(originalData);
      
      // Invalidar o cache e buscar dados atualizados
      await invalidate();
    } catch (err) {
      // Reverter para dados originais em caso de erro
      setMutatedData(originalData);
      setMutationError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setIsMutating(false);
    }
  }, [data, invalidate]);

  return {
    ...cacheResult,
    data: mutatedData || data,
    mutate,
    isMutating,
    mutationError
  };
}

/**
 * Hook para acessar informações sobre o cache
 * @returns Estatísticas e funções para gerenciar o cache
 */
export function useCacheInfo() {
  const [stats, setStats] = useState<{
    size: number;
    itemCount: number;
    storageType: string;
  }>({ size: 0, itemCount: 0, storageType: '' });

  const [isLoading, setIsLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    setIsLoading(true);
    try {
      const cacheStats = await cacheManager.getStats();
      setStats(cacheStats);
    } catch (error) {
      console.error('Erro ao buscar estatísticas do cache:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const clearCache = useCallback(async () => {
    await cacheManager.clear();
    await fetchStats();
  }, [fetchStats]);

  return {
    stats,
    isLoading,
    clearCache,
    refreshStats: fetchStats,
    isOnline: cacheManager.isOnline()
  };
}

export default useCache; 