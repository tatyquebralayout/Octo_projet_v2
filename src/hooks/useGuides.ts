import { useState, useEffect, useMemo } from 'react';
import { Guide } from '../services/api/types';
import { useApiPaginatedCache } from './useApiCache';
import { ENDPOINTS } from '../services/api/config';

interface UseGuidesParams {
  page?: number;
  limit?: number;
  category?: string;
  tag?: string;
  searchTerm?: string;
}

interface UseGuidesResult {
  guides: Guide[];
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
}

/**
 * Hook customizado para buscar e gerenciar cartilhas
 * Inclui funcionalidades de paginação, filtros e gerenciamento de estado
 */
export function useGuides({
  page = 1,
  limit = 9,
  category,
  tag,
  searchTerm
}: UseGuidesParams = {}): UseGuidesResult {
  // Construir parâmetros para a API
  const params = useMemo(() => {
    const queryParams: Record<string, string | number> = {
      page,
      limit
    };

    if (category) queryParams.category = category;
    if (tag) queryParams.tag = tag;
    
    // A API não suporta busca por texto, então não incluimos o searchTerm nos parâmetros
    // O filtro será aplicado no lado do cliente
    
    return queryParams;
  }, [page, limit, category, tag]);

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
    prevPage: goToPrevPage
  } = useApiPaginatedCache<Guide>(
    ENDPOINTS.RESOURCES.GUIDES,
    page,
    limit,
    params
  );

  // Extrair os dados das cartilhas da resposta
  const guidesData = useMemo(() => {
    return guidesResponse?.data || [];
  }, [guidesResponse]);

  // Aplicar filtro de pesquisa no cliente se necessário
  const filteredGuides = useMemo(() => {
    if (!guidesData || !searchTerm) return guidesData;
    
    const term = searchTerm.toLowerCase();
    return guidesData.filter((guide: Guide) => 
      guide.title.toLowerCase().includes(term) || 
      guide.description.toLowerCase().includes(term)
    );
  }, [guidesData, searchTerm]);

  // Extrair categorias únicas das cartilhas
  const categories = useMemo(() => {
    if (!guidesData || guidesData.length === 0) return [];
    
    const uniqueCategories = new Set(guidesData.map((guide: Guide) => guide.category));
    return Array.from(uniqueCategories).sort() as string[];
  }, [guidesData]);

  // Extrair tags únicas das cartilhas
  const tags = useMemo(() => {
    if (!guidesData || guidesData.length === 0) return [];
    
    const uniqueTags = new Set<string>();
    guidesData.forEach((guide: Guide) => {
      guide.tags.forEach((tag: string) => uniqueTags.add(tag));
    });
    
    return Array.from(uniqueTags).sort();
  }, [guidesData]);

  return {
    guides: filteredGuides || [],
    totalPages: pagination?.totalPages || 0,
    totalItems: pagination?.total || 0,
    currentPage: pagination?.page || page,
    isLoading,
    error,
    categories,
    tags,
    hasNextPage,
    hasPrevPage,
    goToPage,
    goToNextPage,
    goToPrevPage
  };
}

export default useGuides; 