import { useState, useMemo } from 'react';
import { useApiPaginatedCache } from './useApiCache';
import { ENDPOINTS } from '../services/api/config';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { GuideListItem } from '../types/guides';

interface UseGuidesParams {
  page?: number;
  limit?: number;
  category?: string;
  tag?: string;
  searchTerm?: string;
}

interface UseGuidesResult {
  guides: GuideListItem[];
  totalPages: number;
  totalItems: number;
  currentPage: number;
  isLoading: boolean;
  error: Error | null;
  categories: string[];
  tags: string[];
  hasNextPage: boolean;
  hasPrevPage: boolean;
  goToPage: (page: number) => void;
  goToNextPage: () => void;
  goToPrevPage: () => void;
  refresh: () => Promise<void>;
}

// Cache para categorias e tags
const categoriesCache: Record<string, string[]> = {};
const tagsCache: Record<string, string[]> = {};

// Cache para erros recentes para evitar repetição excessiva
const recentErrorsCache: Record<string, {timestamp: number, count: number}> = {};

/**
 * Hook customizado para buscar e gerenciar cartilhas
 * Inclui funcionalidades de paginação, filtros e gerenciamento de estado
 * Otimizado para performance com cache e minimização de dados
 */
export function useGuides({
  page = 1,
  limit = 9,
  category,
  tag,
  searchTerm
}: UseGuidesParams = {}): UseGuidesResult {
  // Estado local para categorias e tags
  const [localCategories, setLocalCategories] = useState<string[]>([]);
  const [localTags, setLocalTags] = useState<string[]>([]);
  const [errorCount, setErrorCount] = useState(0);
  
  // Determinar ambiente: desenvolvimento ou produção
  const isDevelopment = useMemo(() => import.meta.env.MODE === 'development', []);
  
  // Construir parâmetros para a API
  const params = useMemo(() => {
    const queryParams: Record<string, string | number> = {
      page,
      limit
    };

    // Adicionar fields apenas em produção, pois o mock service pode não suportar
    if (import.meta.env.PROD) {
      queryParams.fields = 'id,title,description,category,tags,coverImage,publishedAt,fileSize,pageCount';
    }

    if (category) queryParams.category = category;
    if (tag) queryParams.tag = tag;
    
    // A API não suporta busca por texto, então não incluimos o searchTerm nos parâmetros
    // O filtro será aplicado no lado do cliente
    
    return queryParams;
  }, [page, limit, category, tag]);

  // Criar chave única para este conjunto de parâmetros para rastreamento de erros
  const cacheKey = useMemo(() => 
    `guides-${JSON.stringify({page, limit, category, tag})}`
  , [page, limit, category, tag]);

  // Buscar cartilhas utilizando o hook useApiPaginatedCache
  const {
    data: guidesResponse,
    isLoading,
    error,
    pagination,
    hasNextPage,
    hasPrevPage,
    goToPage,
    nextPage: goToNextPage,
    prevPage: goToPrevPage,
    refresh
  } = useApiPaginatedCache<GuideListItem>(
    ENDPOINTS.RESOURCES.GUIDES,
    page,
    limit,
    params,
    {
      // Aumentar o tempo de cache para reduzir chamadas à API
      expiresIn: 5 * 60 * 1000, // 5 minutos
      
      // Estratégias de otimização para desenvolvimento vs. produção
      staleWhileRevalidate: !isDevelopment, // Desativar em desenvolvimento
      
      // Suprimir erros de revalidação em segundo plano para evitar ciclos de erro
      suppressBackgroundErrors: true,
      
      // Backoff para limitação de solicitações em casos de falhas persistentes
      retryOptions: {
        maxRetries: isDevelopment ? 1 : 3, // Menos tentativas em dev
        delayMs: 3000, // 3 segundos entre tentativas
        backoffFactor: 2 // Backoff exponencial
      }
    }
  );

  // Controlar contagem de erros e limitar retentativas
  useDeepCompareEffect(() => {
    if (error) {
      // Registrar erro recente para este conjunto de parâmetros
      const now = Date.now();
      const errorKey = cacheKey;
      
      if (!recentErrorsCache[errorKey]) {
        recentErrorsCache[errorKey] = { timestamp: now, count: 1 };
      } else {
        // Atualizar contagem apenas se passou mais de 1 minuto do último erro
        if (now - recentErrorsCache[errorKey].timestamp > 60000) {
          recentErrorsCache[errorKey] = { timestamp: now, count: 1 };
        } else {
          recentErrorsCache[errorKey].count++;
          recentErrorsCache[errorKey].timestamp = now;
        }
      }
      
      // Atualizar contagem de erros para UI
      setErrorCount(recentErrorsCache[errorKey].count);
      
      // Limpar erros antigos (mais de 10 minutos)
      for (const key in recentErrorsCache) {
        if (now - recentErrorsCache[key].timestamp > 10 * 60 * 1000) {
          delete recentErrorsCache[key];
        }
      }
    }
  }, [error, cacheKey]);

  // Extrair os dados das cartilhas da resposta
  const guidesData = useMemo(() => {
    return guidesResponse?.data || [];
  }, [guidesResponse]);

  // Aplicar filtro de pesquisa no cliente se necessário
  const filteredGuides = useMemo(() => {
    if (!guidesData || guidesData.length === 0) return [];
    if (!searchTerm) return guidesData;
    
    const term = searchTerm.toLowerCase().trim();
    // Se o termo de busca for muito curto, não filtrar
    if (term.length < 2) return guidesData;
    
    return guidesData.filter((guide: GuideListItem) => 
      guide.title.toLowerCase().includes(term) || 
      guide.description.toLowerCase().includes(term)
    );
  }, [guidesData, searchTerm]);

  // Extrair categorias e tags de forma otimizada
  useDeepCompareEffect(() => {
    // Se já temos categorias e tags no cache para esta combinação de filtros, usar isso
    const cacheKey = `${category || 'all'}-${tag || 'all'}-${page}-${limit}`;
    
    // Atualizar ou usar cache para categorias
    if (!categoriesCache[cacheKey] && guidesData && guidesData.length > 0) {
      try {
        const uniqueCategories = new Set(guidesData.map((guide: GuideListItem) => guide.category));
        const sortedCategories = Array.from(uniqueCategories).sort() as string[];
        categoriesCache[cacheKey] = sortedCategories;
        setLocalCategories(sortedCategories);
      } catch (error) {
        console.error('Erro ao extrair categorias:', error);
      }
    } else if (categoriesCache[cacheKey]) {
      setLocalCategories(categoriesCache[cacheKey]);
    }
    
    // Atualizar ou usar cache para tags
    if (!tagsCache[cacheKey] && guidesData && guidesData.length > 0) {
      try {
        const uniqueTags = new Set<string>();
        guidesData.forEach((guide: GuideListItem) => {
          if (guide.tags && Array.isArray(guide.tags)) {
            guide.tags.forEach((tag: string) => uniqueTags.add(tag));
          }
        });
        const sortedTags = Array.from(uniqueTags).sort();
        tagsCache[cacheKey] = sortedTags;
        setLocalTags(sortedTags);
      } catch (error) {
        console.error('Erro ao extrair tags:', error);
      }
    } else if (tagsCache[cacheKey]) {
      setLocalTags(tagsCache[cacheKey]);
    }
  }, [guidesData, category, tag, page, limit]);

  // Fornecer valores de fallback para garantir interface consistente mesmo durante erros
  return {
    guides: filteredGuides || [],
    totalPages: pagination?.totalPages || 0,
    totalItems: pagination?.total || 0,
    currentPage: pagination?.page || page,
    isLoading,
    error,
    categories: localCategories,
    tags: localTags,
    hasNextPage,
    hasPrevPage,
    goToPage,
    goToNextPage,
    goToPrevPage,
    refresh
  };
}

export default useGuides; 