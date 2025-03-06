import React, { type ButtonHTMLAttributes } from 'react';
import { Menu, X } from 'lucide-react';

interface MenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export const MenuButton: React.FC<MenuButtonProps> = ({ isOpen, onClick }) => {
  const buttonProps: ButtonHTMLAttributes<HTMLButtonElement> = {
    className: "lg:hidden text-[#972ae6] p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#972ae6]",
    onClick,
    'aria-expanded': isOpen,
    'aria-controls': 'mobile-menu',
    'aria-label': isOpen ? "Fechar menu" : "Abrir menu",
    type: 'button'
  };

  return (
    <button {...buttonProps}>
      <span className={`menu-icon ${isOpen ? 'menu-icon-open' : ''}`}>
        {isOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
      </span>
    </button>
  );
}; 