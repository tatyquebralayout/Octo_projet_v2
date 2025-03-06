import { useState } from 'react';

export const useSubmenu = () => {
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  const openSubmenu = (menuName: string) => setActiveSubmenu(menuName);
  const closeSubmenu = () => setActiveSubmenu(null);
  const isSubmenuOpen = (menuName: string) => activeSubmenu === menuName;

  return {
    activeSubmenu,
    openSubmenu,
    closeSubmenu,
    isSubmenuOpen
  };
}; 