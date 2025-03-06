import React, { useCallback } from 'react';

interface SubMenuItemProps {
  name: string;
  href: string;
  onClick?: () => void;
  'aria-label'?: string;
  role?: 'menuitem' | 'none';
}

// Este componente deve ser usado dentro do componente SubMenu
// Exemplo de uso:
// <SubMenu aria-label="Submenu">
//   <SubMenuItem name="Item 1" href="#" />
//   <SubMenuItem name="Item 2" href="#" />
// </SubMenu>
export const SubMenuItem: React.FC<SubMenuItemProps> = ({
  name,
  href,
  onClick,
  'aria-label': ariaLabel
}) => {
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick?.();
    }
  }, [onClick]);

  // Utilizando a semântica padrão do <li> para melhor compatibilidade com leitores de tela
  // O elemento pai <ul> já fornece o contexto necessário para a estrutura da lista
  return (
    <li>
      <a
        href={href}
        className="block px-4 py-2 text-sm font-bold text-[#972ae6] hover:bg-gray-50 hover:text-[#e8b624] focus:outline-none focus:ring-2 focus:ring-[#972ae6] focus:bg-gray-50"
        onClick={onClick}
        onKeyDown={handleKeyDown}
        role="menuitem"
        aria-label={ariaLabel || name}
        tabIndex={-1}
      >
        {name}
      </a>
    </li>
  );
}; 