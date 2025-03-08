import React, { useState, useEffect } from 'react';
import GuideCard from '../components/guides/GuideCard';
import GuidesFilter from '../components/guides/GuidesFilter';
import Pagination from '../components/common/Pagination';
import useGuides from '../hooks/useGuides';
import { useNotifications } from '../services/notifications';
import { NotificationType } from '../services/notifications/types';

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
    hasNextPage,
    hasPrevPage,
    goToPage,
    goToNextPage,
    goToPrevPage
  } = useGuides({
    page: currentPage,
    limit: 9,
    ...filters
  });
  
  // Exibir erro se houver
  useEffect(() => {
    if (error) {
      showToast({
        title: 'Erro ao carregar cartilhas',
        message: error.message,
        type: NotificationType.ERROR,
        autoClose: true
      });
    }
  }, [error, showToast]);
  
  // Manipular mudança de página
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    goToPage(page);
    
    // Rolar para o topo da página
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  // Manipular mudança de filtros
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

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
            <GuidesFilter
              categories={categories}
              tags={tags}
              onFilterChange={handleFilterChange}
              className="sticky top-24"
            />
          </div>
          
          {/* Lista de cartilhas */}
          <div className="lg:col-span-3">
            {/* Informações sobre resultados */}
            <div className="mb-4 flex justify-between items-center">
              <p className="text-gray-600">
                {isLoading ? (
                  'Carregando cartilhas...'
                ) : (
                  `Mostrando ${guides.length} de ${totalItems} cartilhas`
                )}
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
                >
                  <option value="recent">Mais recentes</option>
                  <option value="title">Título (A-Z)</option>
                  <option value="popular">Mais populares</option>
                </select>
              </div>
            </div>
            
            {/* Grid de cartilhas */}
            {isLoading ? (
              // Esqueletos de carregamento
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div 
                    key={index} 
                    className="bg-gray-100 rounded-lg h-80 animate-pulse"
                  />
                ))}
              </div>
            ) : guides.length > 0 ? (
              // Lista de cartilhas
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {guides.map((guide) => (
                  <GuideCard key={guide.id} guide={guide} />
                ))}
              </div>
            ) : (
              // Mensagem de nenhum resultado
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">Nenhuma cartilha encontrada</h3>
                <p className="text-gray-600 mb-4">
                  Tente ajustar seus filtros ou termos de busca.
                </p>
                <button
                  onClick={() => handleFilterChange({})}
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                >
                  Limpar filtros
                </button>
              </div>
            )}
            
            {/* Paginação */}
            {!isLoading && guides.length > 0 && (
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