import React, { useState } from 'react';

interface GuidesFilterProps {
  categories: string[];
  tags: string[];
  onFilterChange: (filters: { category?: string; tag?: string; searchTerm?: string }) => void;
  className?: string;
}

/**
 * Componente para filtrar cartilhas por categoria, tag e termo de pesquisa
 */
export const GuidesFilter: React.FC<GuidesFilterProps> = ({
  categories,
  tags,
  onFilterChange,
  className = ''
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Aplicar filtros
  const applyFilters = () => {
    onFilterChange({
      category: selectedCategory || undefined,
      tag: selectedTag || undefined,
      searchTerm: searchTerm || undefined
    });
  };

  // Limpar todos os filtros
  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedTag('');
    setSearchTerm('');
    onFilterChange({});
  };

  return (
    <div className={`bg-white p-4 rounded-lg shadow-sm ${className}`}>
      <h3 className="mb-4 text-lg font-bold">Filtrar Cartilhas</h3>
      
      {/* Campo de busca */}
      <div className="mb-4">
        <label htmlFor="search" className="block mb-1 text-sm font-medium text-gray-700">
          Pesquisar
        </label>
        <div className="relative">
          <input
            type="text"
            id="search"
            className="w-full px-3 py-2 border rounded-md focus:ring-primary-500 focus:border-primary-500"
            placeholder="Buscar por título..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button 
            className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
            onClick={() => {
              setSearchTerm('');
              applyFilters();
            }}
          >
            {searchTerm && (
              <span>×</span>
            )}
          </button>
        </div>
      </div>
      
      {/* Seletor de categoria */}
      <div className="mb-4">
        <label htmlFor="category" className="block mb-1 text-sm font-medium text-gray-700">
          Categoria
        </label>
        <select
          id="category"
          className="w-full px-3 py-2 border rounded-md focus:ring-primary-500 focus:border-primary-500"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Todas as categorias</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      
      {/* Tags */}
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Tags
        </label>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                selectedTag === tag
                  ? 'bg-primary-100 text-primary-800 border border-primary-300'
                  : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
              }`}
              onClick={() => setSelectedTag(selectedTag === tag ? '' : tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
      
      {/* Botões de ação */}
      <div className="flex gap-2">
        <button
          className="px-4 py-2 text-sm font-medium text-white rounded-md bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
          onClick={applyFilters}
        >
          Aplicar Filtros
        </button>
        
        <button
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
          onClick={clearFilters}
        >
          Limpar
        </button>
      </div>
    </div>
  );
};

export default GuidesFilter; 