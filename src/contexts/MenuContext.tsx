import React, { createContext, ReactNode } from 'react';
import { useMenu } from '../hooks/useMenu';
import { useSubmenu } from '../hooks/useSubmenu';

interface MenuContextType {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
  activeSubmenu: string | null;
  openSubmenu: (menuName: string) => void;
  closeSubmenu: () => void;
  isSubmenuOpen: (menuName: string) => boolean;
}

export const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isMenuOpen, toggleMenu, closeMenu } = useMenu();
  const { activeSubmenu, openSubmenu, closeSubmenu, isSubmenuOpen } = useSubmenu();

  return (
    <MenuContext.Provider
      value={{
        isMenuOpen,
        toggleMenu,
        closeMenu,
        activeSubmenu,
        openSubmenu,
        closeSubmenu,
        isSubmenuOpen,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}; 