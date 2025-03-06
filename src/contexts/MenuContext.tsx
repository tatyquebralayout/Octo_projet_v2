import React, { createContext, useContext, ReactNode } from 'react';
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

const MenuContext = createContext<MenuContextType | undefined>(undefined);

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

export const useMenuContext = () => {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error('useMenuContext must be used within a MenuProvider');
  }
  return context;
}; 