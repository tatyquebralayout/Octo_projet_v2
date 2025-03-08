import { useState, useEffect, useCallback, useMemo } from 'react';
import debounce from 'lodash.debounce';
import GuidesFilter from '../components/guides/GuidesFilter';
import CartilhasVirtualList from '../components/guides/CartilhasVirtualList';
import Pagination from '../components/common/Pagination';
import useGuides from '../hooks/useGuides';
import { useNotifications } from '../services/notifications';
import { NotificationType } from '../services/notifications/types';
import PageLayout from '../components/layout/PageLayout';
import { Link } from 'react-router-dom';
import { cn } from '../utils/cn';
import { useDataFetching } from '../hooks/useDataFetching';
import { GuideListItem } from '../types/guides';

interface FilterState {
  category?: string;
  tag?: string;
  searchTerm?: string;
}

/**
 * Página de Cartilhas - Listagem de todas as cartilhas disponíveis com filtros e paginação
 */
const Cartilhas = () => {
  // Estado para os filtros
  const [filters, setFilters] = useState<FilterState>({
    category: undefined,
    tag: undefined,
    searchTerm: undefined
  });
  
  // Estado para paginação
  const [currentPage, setCurrentPage] = useState(1);
  
  // Resetar a página quando os filtros mudam
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);
  
  // Serviço de notificações para feedback
  const { showToast } = useNotifications();
  
  // Buscar cartilhas com o hook personalizado
  const {
    guides,
    totalPages,
    totalItems,
    isLoading,
    error,
    categories,
    tags,
    goToPage
  } = useGuides({
    page: currentPage,
    limit: 12, // Aumentamos o limite para otimizar a paginação com virtualização
    category: filters.category,
    tag: filters.tag,
    searchTerm: filters.searchTerm
  });
  
  // Lidar com a mudança de página
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    goToPage(page);
    
    // Rolar para o topo da lista
    window.scrollTo({
      top: document.getElementById('cartilhas-list')?.offsetTop - 100 || 0,
      behavior: 'smooth'
    });
  }, [goToPage]);
  
  // Handler para filtro de categoria
  const handleCategoryFilter = useCallback((category: string | undefined) => {
    setFilters(prev => ({ ...prev, category }));
  }, []);
  
  // Handler para filtro de tag
  const handleTagFilter = useCallback((tag: string | undefined) => {
    setFilters(prev => ({ ...prev, tag }));
  }, []);
  
  // Handler para busca com debounce
  const handleSearch = useMemo(
    () =>
      debounce((term: string) => {
        setFilters(prev => ({ ...prev, searchTerm: term || undefined }));
      }, 500),
    []
  );
  
  // Componente Breadcrumbs
  const BreadcrumbsComponent = () => (
    <nav aria-label="breadcrumbs" className="text-sm flex space-x-2 text-gray-600">
      <Link to="/" className="hover:text-primary-600 transition-colors">Home</Link>
      <span>/</span>
      <span className="text-gray-900 font-medium">Cartilhas</span>
    </nav>
  );

  // Calcular estatísticas para exibição
  const startItem = totalItems > 0 ? (currentPage - 1) * 12 + 1 : 0;
  const endItem = Math.min(currentPage * 12, totalItems || 0);
  
  return (
    <PageLayout 
      title="Cartilhas"
      description="Acesse nossa biblioteca de cartilhas e guias para capacitação e orientação sobre deficiências ocultas e neurodivergências."
      breadcrumbs={<BreadcrumbsComponent />}
      isLoading={isLoading}
      error={error}
      onRetry={() => goToPage(currentPage)}
      animation="fade"
    >
      <div className="mb-8">
        <p className="text-body-large mb-4">
          Nossa biblioteca de cartilhas oferece recursos educativos sobre diversos temas relacionados 
          a deficiências ocultas e neurodivergências. Explore, baixe e compartilhe nosso conteúdo.
        </p>
      </div>
      
      {/* Filtros */}
      <div className="bg-gray-50 p-6 rounded-lg mb-8 shadow-sm">
        <h2 className="text-h4 mb-4">Filtrar Cartilhas</h2>
        <GuidesFilter
          categories={categories}
          tags={tags}
          selectedCategory={filters.category}
          selectedTag={filters.tag}
          onCategoryChange={handleCategoryFilter}
          onTagChange={handleTagFilter}
          onSearch={handleSearch}
        />
      </div>
      
      {/* Estatísticas e resultados */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-h3">Resultados</h2>
        <div className="text-body text-gray-600">
          {!isLoading && (
            totalItems > 0 
              ? `Mostrando ${startItem}-${endItem} de ${totalItems} cartilhas`
              : "Nenhuma cartilha encontrada"
          )}
        </div>
      </div>
      
      {/* Lista de cartilhas */}
      <div id="cartilhas-list" className="min-h-[300px]">
        <CartilhasVirtualList 
          guides={guides || []} 
          isLoading={isLoading}
        />
        
        {/* Paginação */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default Cartilhas;