import { useState, useEffect, useCallback } from 'react';

const MENU_STATE_KEY = 'menu_state';

interface CachedMenuState {
  isMenuOpen: boolean;
  lastUpdated: number;
}

export const useMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(() => {
    try {
      const cached = localStorage.getItem(MENU_STATE_KEY);
      if (cached) {
        const state: CachedMenuState = JSON.parse(cached);
        // Só usa o cache se for recente (menos de 1 hora)
        if (Date.now() - state.lastUpdated < 3600000) {
          return state.isMenuOpen;
        }
      }
    } catch (error) {
      console.warn('Erro ao recuperar estado do menu:', error);
    }
    return false;
  });

  // Atualiza o cache quando o estado muda
  useEffect(() => {
    try {
      const state: CachedMenuState = {
        isMenuOpen,
        lastUpdated: Date.now()
      };
      localStorage.setItem(MENU_STATE_KEY, JSON.stringify(state));
    } catch (error) {
      console.warn('Erro ao salvar estado do menu:', error);
    }
  }, [isMenuOpen]);

  // Limpa o cache antigo periodicamente
  useEffect(() => {
    const cleanupCache = () => {
      try {
        const cached = localStorage.getItem(MENU_STATE_KEY);
        if (cached) {
          const state: CachedMenuState = JSON.parse(cached);
          if (Date.now() - state.lastUpdated >= 3600000) {
            localStorage.removeItem(MENU_STATE_KEY);
          }
        }
      } catch (error) {
        console.warn('Erro ao limpar cache do menu:', error);
      }
    };

    // Limpa o cache a cada hora
    const interval = setInterval(cleanupCache, 3600000);
    return () => clearInterval(interval);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  return {
    isMenuOpen,
    toggleMenu,
    closeMenu
  };
}; 