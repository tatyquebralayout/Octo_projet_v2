import { useState, useEffect, useCallback, useMemo } from 'react';
import debounce from 'lodash.debounce';
import GuidesFilter from '../components/guides/GuidesFilter';
import CartilhasVirtualList from '../components/guides/CartilhasVirtualList';
import Pagination from '../components/common/Pagination';
import useGuides from '../hooks/useGuides';
import { useNotifications } from '../services/notifications';
import { NotificationType } from '../services/notifications/types';
import ProfilerWrapper from '../utils/performance/ProfilerWrapper';
import '../components/guides/guides.css';

interface FilterState {
  category?: string;
  tag?: string;
  searchTerm?: string;
}

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
    ...filters
  });
  
  // Exibir erro se houver (apenas uma vez por erro)
  useEffect(() => {
    if (error) {
      console.error('Erro ao carregar cartilhas:', error);
      showToast({
        title: 'Erro ao carregar cartilhas',
        message: error.message || 'Ocorreu um erro ao carregar as cartilhas. Tente novamente mais tarde.',
        type: NotificationType.ERROR,
        autoClose: true
      });
    }
  }, [error, showToast]);
  
  // Debounce para aplicação de filtros
  const debouncedFilterChange = useMemo(
    () => debounce((newFilters: FilterState) => {
      setFilters(prev => {
        // Verificar se os filtros realmente mudaram
        if (
          prev.category === newFilters.category &&
          prev.tag === newFilters.tag &&
          prev.searchTerm === newFilters.searchTerm
        ) {
          return prev; // Não atualizar se não houve mudança
        }
        return newFilters;
      });
    }, 300), // 300ms de delay para evitar atualizações frequentes
    []
  );
  
  // Manipular mudança de filtros com debounce
  const handleFilterChange = useCallback((newFilters: FilterState) => {
    debouncedFilterChange(newFilters);
  }, [debouncedFilterChange]);
  
  // Manipular limpeza de filtros
  const handleClearFilters = useCallback(() => {
    setFilters({
      category: undefined,
      tag: undefined,
      searchTerm: undefined
    });
    setCurrentPage(1);
  }, []);
  
  // Manipular mudança de página de forma otimizada
  const handlePageChange = useCallback((page: number) => {
    if (page === currentPage) return; // Evitar recargas desnecessárias
    
    setCurrentPage(page);
    
    // Rolar para o topo da página
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [currentPage]);

  // Sincronizar mudanças de página com o hook useGuides
  useEffect(() => {
    if (currentPage > 0) {
      goToPage(currentPage);
    }
  }, [currentPage, goToPage]);
  
  // Função para tentar novamente em caso de erro
  const handleRetry = useCallback(() => {
    // Forçar recarga de dados
    goToPage(currentPage);
  }, [currentPage, goToPage]);

  // Memorizar o texto de contagem de resultados
  const resultsCountText = useMemo(() => {
    if (isLoading) return 'Carregando cartilhas...';
    if (error) return 'Erro ao carregar cartilhas';
    return `Mostrando ${guides ? guides.length : 0} de ${totalItems || 0} cartilhas`;
  }, [isLoading, error, guides, totalItems]);

  // Renderização segura para evitar erros
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Cartilhas e Manuais</h1>
          <p className="text-gray-600">
            Acesse nossos materiais educativos sobre inclusão, acessibilidade e neurodiversidade.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar com filtros */}
          <div className="lg:col-span-1">
            <ProfilerWrapper id="GuidesFilterComponent">
              <GuidesFilter
                categories={categories || []}
                tags={tags || []}
                onFilterChange={handleFilterChange}
                className="sticky top-24"
                isLoading={isLoading}
                error={error}
              />
            </ProfilerWrapper>
          </div>
          
          {/* Lista de cartilhas */}
          <div className="lg:col-span-3">
            {/* Informações sobre resultados */}
            <div className="mb-4 flex justify-between items-center">
              <p className="text-gray-600">
                {resultsCountText}
              </p>
              
              {/* Seletor de ordenação (a ser implementado) */}
              <div className="flex items-center">
                <label htmlFor="sort" className="mr-2 text-sm text-gray-600">
                  Ordenar por:
                </label>
                <select
                  id="sort"
                  className="border rounded-md px-2 py-1 text-sm"
                  defaultValue="recent"
                  disabled={isLoading || Boolean(error)}
                >
                  <option value="recent">Mais recentes</option>
                  <option value="title">Título (A-Z)</option>
                  <option value="popular">Mais populares</option>
                </select>
              </div>
            </div>
            
            {/* Grid de cartilhas com virtualização */}
            <ProfilerWrapper id="CartilhasVirtualList">
              <CartilhasVirtualList 
                guides={guides || []} 
                isLoading={isLoading}
                error={error}
                onRetry={handleRetry}
                noResultsComponent={
                  <div className="text-center py-12">
                    <h3 className="text-xl font-semibold mb-2">Nenhuma cartilha encontrada</h3>
                    <p className="text-gray-600 mb-4">
                      Tente ajustar seus filtros ou termos de busca.
                    </p>
                    <button
                      onClick={handleClearFilters}
                      className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                    >
                      Limpar filtros
                    </button>
                  </div>
                }
              />
            </ProfilerWrapper>
            
            {/* Paginação */}
            {!isLoading && guides && guides.length > 0 && totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                className="mt-8"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cartilhas;