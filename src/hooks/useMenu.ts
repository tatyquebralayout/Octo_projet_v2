import { useState, useEffect, useCallback, useMemo } from 'react';

const MENU_STATE_KEY = 'menu_state';
const CACHE_DURATION = 3600000; // 1 hora em milissegundos

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
        if (Date.now() - state.lastUpdated < CACHE_DURATION) {
          return state.isMenuOpen;
        }
      }
    } catch (error) {
      console.warn('Erro ao recuperar estado do menu:', error);
    }
    return false;
  });

  const updateCache = useCallback((state: boolean) => {
    try {
      const cacheState: CachedMenuState = {
        isMenuOpen: state,
        lastUpdated: Date.now()
      };
      localStorage.setItem(MENU_STATE_KEY, JSON.stringify(cacheState));
    } catch (error) {
      console.warn('Erro ao salvar estado do menu:', error);
    }
  }, []);

  useEffect(() => {
    updateCache(isMenuOpen);
  }, [isMenuOpen, updateCache]);

  const cleanupCache = useCallback(() => {
    try {
      const cached = localStorage.getItem(MENU_STATE_KEY);
      if (cached) {
        const state: CachedMenuState = JSON.parse(cached);
        if (Date.now() - state.lastUpdated >= CACHE_DURATION) {
          localStorage.removeItem(MENU_STATE_KEY);
        }
      }
    } catch (error) {
      console.warn('Erro ao limpar cache do menu:', error);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(cleanupCache, CACHE_DURATION);
    return () => clearInterval(interval);
  }, [cleanupCache]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const menuActions = useMemo(() => ({
    isMenuOpen,
    toggleMenu,
    closeMenu
  }), [isMenuOpen, toggleMenu, closeMenu]);

  return menuActions;
}; 