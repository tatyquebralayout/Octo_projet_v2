import React, { useState, useEffect, useMemo } from 'react';
import { Search } from 'lucide-react';
import Card from '../common/Card';
import { ErrorMessage } from '../../utils/errors/components';
import { ErrorType } from '../../utils/errors/types';

// Propriedades para o componente de filtro
interface GuidesFilterProps {
  categories: string[];
  tags: string[];
  onFilterChange: (filters: { category?: string; tag?: string; searchTerm?: string }) => void;
  className?: string;
  isLoading?: boolean;
  error?: Error | null;
}

const GuidesFilter: React.FC<GuidesFilterProps> = ({ 
  categories = [], 
  tags = [], 
  onFilterChange, 
  className = '',
  isLoading = false,
  error = null
}) => {
  // Estado interno para os filtros
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [selectedTag, setSelectedTag] = useState<string | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  // Processar categorias e tags para garantir dados consistentes
  const processedCategories = useMemo(() => {
    return categories && categories.length > 0 
      ? [...new Set(categories)].sort()
      : [];
  }, [categories]);

  const processedTags = useMemo(() => {
    return tags && tags.length > 0 
      ? [...new Set(tags)].sort()
      : [];
  }, [tags]);

  // Efeito para debounce da busca
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    
    return () => clearTimeout(timerId);
  }, [searchTerm]);

  // Aplicar filtros quando qualquer um deles mudar
  useEffect(() => {
    onFilterChange({
      category: selectedCategory,
      tag: selectedTag,
      searchTerm: debouncedSearchTerm || undefined
    });
  }, [selectedCategory, selectedTag, debouncedSearchTerm, onFilterChange]);

  // Função para limpar todos os filtros
  const handleClearFilters = () => {
    setSelectedCategory(undefined);
    setSelectedTag(undefined);
    setSearchTerm('');
    // O onFilterChange será chamado pelo efeito
  };

  // Placeholder text based on state
  const searchPlaceholder = useMemo(() => {
    if (isLoading) return "Carregando cartilhas...";
    return "Buscar cartilhas...";
  }, [isLoading]);

  return (
    <Card variant="secondary" className={`p-4 ${className}`}>
      <h2 className="text-lg font-bold mb-4">Filtros</h2>
      
      {/* Busca */}
      <div className="mb-4">
        <label htmlFor="search" className="block text-sm font-medium mb-1">
          Busca
        </label>
        <div className="relative">
          <input
            id="search"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={searchPlaceholder}
            disabled={isLoading}
            className="pl-9 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>
      </div>
      
      {/* Categorias */}
      <div className="mb-4">
        <label htmlFor="category" className="block text-sm font-medium mb-1">
          Categoria
        </label>
        <select
          id="category"
          value={selectedCategory || ''}
          onChange={(e) => setSelectedCategory(e.target.value || undefined)}
          disabled={isLoading || processedCategories.length === 0}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
        >
          <option value="">Todas as categorias</option>
          {processedCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {processedCategories.length === 0 && !isLoading && !error && (
          <p className="text-sm text-gray-500 mt-1">Nenhuma categoria disponível</p>
        )}
      </div>
      
      {/* Tags */}
      <div className="mb-4">
        <label htmlFor="tag" className="block text-sm font-medium mb-1">
          Tag
        </label>
        <select
          id="tag"
          value={selectedTag || ''}
          onChange={(e) => setSelectedTag(e.target.value || undefined)}
          disabled={isLoading || processedTags.length === 0}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
        >
          <option value="">Todas as tags</option>
          {processedTags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
        {processedTags.length === 0 && !isLoading && !error && (
          <p className="text-sm text-gray-500 mt-1">Nenhuma tag disponível</p>
        )}
      </div>
      
      {/* Botão para limpar filtros */}
      <button
        onClick={handleClearFilters}
        disabled={isLoading || (!selectedCategory && !selectedTag && !searchTerm)}
        className="w-full py-2 px-4 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Limpar filtros
      </button>

      {/* Mostrar mensagem de erro se houver */}
      {error && (
        <div className="mt-4">
          <ErrorMessage 
            message="Não foi possível carregar filtros" 
            type={ErrorType.SERVER}
          />
          <p className="text-xs text-gray-500 mt-1">
            Você ainda pode fazer buscas, mas os filtros avançados não estão disponíveis.
          </p>
        </div>
      )}
    </Card>
  );
};

export default React.memo(GuidesFilter); 