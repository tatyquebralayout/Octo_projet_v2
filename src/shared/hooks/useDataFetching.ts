import { useState, useEffect, useCallback, useRef } from 'react';
import { CacheOptions } from '../../types/api';

/**
 * Opções para o hook useDataFetching
 * Configura comportamento de cache, callbacks, e dependências
 */
interface UseDataFetchingOptions<T> {
  initialData?: T;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  dependencies?: any[];
  cache?: CacheOptions;
  retry?: {
    maxRetries?: number;
    delayMs?: number;
    backoffFactor?: number;
  };
  skipInitialFetch?: boolean;
}

/**
 * Estado retornado pelo hook useDataFetching
 */
interface DataFetchingState<T> {
  data: T | undefined;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<T | undefined>;
  setData: (data: T) => void;
  isStale: boolean;
}

/**
 * Hook personalizado para buscar dados com suporte a cache e retentativas
 * Parte do plano de refatoração estrutural para padronizar hooks de dados
 */
export function useDataFetching<T>(
  fetchFn: () => Promise<T>,
  options: UseDataFetchingOptions<T> = {}
): DataFetchingState<T> {
  const {
    initialData,
    onSuccess,
    onError,
    dependencies = [],
    cache = {
      enabled: false,
      expiresIn: 5 * 60 * 1000, // 5 minutos
      staleWhileRevalidate: false,
      key: undefined
    },
    retry = {
      maxRetries: 1,
      delayMs: 1000,
      backoffFactor: 2
    },
    skipInitialFetch = false
  } = options;

  // Estados
  const [data, setData] = useState<T | undefined>(initialData);
  const [loading, setLoading] = useState<boolean>(!skipInitialFetch);
  const [error, setError] = useState<Error | null>(null);
  const [isStale, setIsStale] = useState<boolean>(false);
  
  // Refs para controle de componente montado e contador de tentativas
  const isMounted = useRef<boolean>(true);
  const retryCount = useRef<number>(0);

  // Gerar chave de cache se não fornecida explicitamente
  const cacheKey = useRef<string>(
    cache.key || 
    `data_${fetchFn.toString().slice(0, 100)}_${JSON.stringify(dependencies).slice(0, 100)}`
  );
  
  /**
   * Função para obter dados do cache
   */
  const getCachedData = useCallback(() => {
    if (!cache.enabled || !cacheKey.current) return null;
    
    try {
      const cached = localStorage.getItem(`cache_${cacheKey.current}`);
      
      if (!cached) return null;
      
      const { data, timestamp } = JSON.parse(cached);
      const isExpired = Date.now() - timestamp > (cache.expiresIn || 300000);
      
      // Se os dados estão vencidos mas temos staleWhileRevalidate,
      // marcar como stale mas ainda retornar os dados
      if (isExpired && cache.staleWhileRevalidate) {
        setIsStale(true);
        return data;
      }
      
      // Se os dados estão vencidos sem staleWhileRevalidate, não usar cache
      if (isExpired) return null;
      
      // Dados frescos do cache
      return data;
    } catch (e) {
      console.warn('Error reading from cache', e);
      return null;
    }
  }, [cache.enabled, cache.expiresIn, cache.staleWhileRevalidate]);

  /**
   * Função para salvar dados no cache
   */
  const setCachedData = useCallback((data: T) => {
    if (!cache.enabled || !cacheKey.current) return;
    
    try {
      localStorage.setItem(`cache_${cacheKey.current}`, JSON.stringify({
        data,
        timestamp: Date.now()
      }));
      
      setIsStale(false);
    } catch (e) {
      console.warn('Error writing to cache', e);
    }
  }, [cache.enabled]);

  /**
   * Função principal para buscar dados
   */
  const fetchData = useCallback(async (skipCache = false): Promise<T | undefined> => {
    // Se não montado, não continuar
    if (!isMounted.current) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Tentar obter do cache a menos que skipCache seja true
      const cachedData = !skipCache ? getCachedData() : null;
      
      if (cachedData) {
        setData(cachedData);
        setLoading(false);
        
        // Se os dados são stale, revalidar em segundo plano
        if (isStale) {
          try {
            const freshData = await fetchFn();
            if (isMounted.current) {
              setData(freshData);
              setCachedData(freshData);
              onSuccess?.(freshData);
            }
          } catch (backgroundError) {
            // Erro na revalidação em segundo plano - manter dados stale
            console.warn('Background revalidation error', backgroundError);
          }
        } else {
          onSuccess?.(cachedData);
        }
        
        return cachedData;
      }
      
      // Buscar dados frescos
      const result = await fetchFn();
      
      if (isMounted.current) {
        setData(result);
        setCachedData(result);
        setLoading(false);
        onSuccess?.(result);
      }
      
      // Resetar contador de tentativas após sucesso
      retryCount.current = 0;
      
      return result;
    } catch (e) {
      const error = e instanceof Error ? e : new Error(String(e));
      
      if (isMounted.current) {
        // Tentativas de retry
        if (retryCount.current < (retry.maxRetries || 0)) {
          retryCount.current++;
          
          // Backoff exponencial
          const delay = retry.delayMs! * Math.pow(retry.backoffFactor!, retryCount.current - 1);
          
          console.log(`Retrying fetch (${retryCount.current}/${retry.maxRetries}) in ${delay}ms`);
          
          setTimeout(() => {
            if (isMounted.current) {
              fetchData(skipCache);
            }
          }, delay);
        } else {
          // Sem mais tentativas, definir erro
          setError(error);
          setLoading(false);
          onError?.(error);
          retryCount.current = 0;
        }
      }
      
      return undefined;
    }
  }, [fetchFn, getCachedData, setCachedData, onSuccess, onError, isStale, retry.maxRetries, retry.delayMs, retry.backoffFactor]);

  // Efeito para buscar dados ao montar e quando dependências mudarem
  useEffect(() => {
    // Marcar componente como montado
    isMounted.current = true;
    
    // Buscar dados se skipInitialFetch não estiver habilitado
    if (!skipInitialFetch) {
      fetchData(false);
    }
    
    // Limpar ao desmontar
    return () => {
      isMounted.current = false;
    };
  }, [...dependencies, fetchData]);

  // Função para forçar recarregamento
  const refetch = useCallback(() => {
    return fetchData(true);
  }, [fetchData]);

  // Retornar valores e funções
  return {
    data,
    loading,
    error,
    refetch,
    setData,
    isStale
  };
} 