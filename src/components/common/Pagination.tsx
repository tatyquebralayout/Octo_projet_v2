import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

/**
 * Componente de paginação acessível
 * Permite navegar entre páginas com suporte a teclado e leitores de tela
 */
export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = ''
}) => {
  // Detectar se estamos em uma tela pequena
  const [isSmallScreen, setIsSmallScreen] = React.useState(false);
  
  // Efeito para detectar o tamanho da tela
  React.useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };
    
    // Verificar tamanho inicial
    checkScreenSize();
    
    // Adicionar listener para mudanças de tamanho
    window.addEventListener('resize', checkScreenSize);
    
    // Limpar listener
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  
  // Determinar quais páginas mostrar com base no tamanho da tela
  const getPageNumbers = () => {
    const pages = [];
    
    // Sempre mostrar a primeira página
    pages.push(1);
    
    // Em telas pequenas, mostrar menos páginas ao redor da atual
    const range = isSmallScreen ? 1 : 2;
    
    for (let i = Math.max(2, currentPage - range); i <= Math.min(totalPages - 1, currentPage + range); i++) {
      pages.push(i);
    }
    
    // Sempre mostrar a última página se houver mais de uma
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    
    // Adicionar ellipsis onde necessário
    const result = [];
    let prev = 0;
    
    for (const page of pages) {
      if (page - prev > 1) {
        result.push(-prev); // Valor negativo indica ellipsis após a página 'prev'
      }
      result.push(page);
      prev = page;
    }
    
    return result;
  };
  
  const pages = getPageNumbers();
  
  // Se não há páginas para mostrar
  if (totalPages <= 1) {
    return null;
  }
  
  // Função para ir para a página anterior com verificação de limites
  const goToPrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };
  
  // Função para ir para a próxima página com verificação de limites
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };
  
  return (
    <nav
      aria-label="Paginação"
      className={`flex justify-center items-center mt-6 ${className}`}
    >
      <ul className="flex flex-wrap items-center gap-1">
        {/* Botão Anterior */}
        <li>
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className={`flex items-center justify-center ${isSmallScreen ? 'w-8 h-8' : 'w-10 h-10'} rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              currentPage === 1
                ? 'cursor-not-allowed text-gray-400'
                : 'hover:bg-gray-100 text-gray-700'
            }`}
            aria-label="Página anterior"
          >
            <span aria-hidden="true">←</span>
          </button>
        </li>
        
        {/* Números de página */}
        {pages.map((page, index) => {
          // Ellipsis
          if (page < 0) {
            return (
              <li key={`ellipsis-${index}`}>
                <span className={`flex items-center justify-center ${isSmallScreen ? 'w-8 h-8' : 'w-10 h-10'} text-gray-500`}>
                  ...
                </span>
              </li>
            );
          }
          
          // Página normal
          return (
            <li key={page}>
              <button
                onClick={() => onPageChange(page)}
                aria-current={currentPage === page ? 'page' : undefined}
                aria-label={`Página ${page}`}
                className={`flex items-center justify-center ${isSmallScreen ? 'w-8 h-8 text-sm' : 'w-10 h-10'} rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  currentPage === page
                    ? 'bg-primary-600 text-white'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                {page}
              </button>
            </li>
          );
        })}
        
        {/* Botão Próximo */}
        <li>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`flex items-center justify-center ${isSmallScreen ? 'w-8 h-8' : 'w-10 h-10'} rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              currentPage === totalPages
                ? 'cursor-not-allowed text-gray-400'
                : 'hover:bg-gray-100 text-gray-700'
            }`}
            aria-label="Próxima página"
          >
            <span aria-hidden="true">→</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination; 