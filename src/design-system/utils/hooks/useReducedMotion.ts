import { useState, useEffect } from 'react';

/**
 * Hook para detectar preferências de redução de movimento.
 * Considera tanto a configuração do sistema (prefers-reduced-motion)
 * quanto a preferência salva no localStorage.
 * 
 * @returns {boolean} true se o usuário prefere movimento reduzido
 */
export function useReducedMotion(): boolean {
  // Estado inicial baseado na media query
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() => {
    // Durante SSR, retornar false (servidor não tem acesso às preferências do usuário)
    if (typeof window === 'undefined') return false;
    
    // Verificar primeiro a preferência salva no localStorage
    const savedPreference = localStorage.getItem('reduce-motion');
    if (savedPreference !== null) {
      return savedPreference === 'true';
    }
    
    // Caso não haja configuração salva, verificar a media query do sistema
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });
  
  useEffect(() => {
    // Caso estejamos no servidor, não fazer nada
    if (typeof window === 'undefined') return;
    
    // Função para atualizar o estado quando a media query mudar
    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      // Apenas atualizar se não houver preferência salva no localStorage
      if (localStorage.getItem('reduce-motion') === null) {
        setPrefersReducedMotion(e.matches);
      }
    };
    
    // Adicionar listener para alterações na media query
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    // Para navegadores modernos (addEventListener)
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMediaQueryChange);
      return () => {
        mediaQuery.removeEventListener('change', handleMediaQueryChange);
      };
    }
    // Para navegadores legados (addListener - deprecated)
    else if ('addListener' in mediaQuery) {
      // @ts-ignore
      mediaQuery.addListener(handleMediaQueryChange);
      return () => {
        // @ts-ignore
        mediaQuery.removeListener(handleMediaQueryChange);
      };
    }
  }, []);
  
  return prefersReducedMotion;
}

/**
 * Hook para gerenciar preferências de redução de movimento.
 * Permite obter e alterar a preferência do usuário.
 * 
 * @returns {Object} Objeto com a preferência atual e funções para alterá-la
 */
export function useMotionPreference(): {
  prefersReducedMotion: boolean;
  setReducedMotion: (value: boolean) => void;
  resetToSystemDefault: () => void;
} {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() => {
    // Durante SSR, retornar false
    if (typeof window === 'undefined') return false;
    
    // Verificar primeiro a preferência salva no localStorage
    const savedPreference = localStorage.getItem('reduce-motion');
    if (savedPreference !== null) {
      return savedPreference === 'true';
    }
    
    // Caso não haja configuração salva, verificar a media query do sistema
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });
  
  useEffect(() => {
    // Caso estejamos no servidor, não fazer nada
    if (typeof window === 'undefined') return;
    
    // Função para atualizar o estado quando a media query mudar
    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      // Apenas atualizar se não houver preferência salva no localStorage
      if (localStorage.getItem('reduce-motion') === null) {
        setPrefersReducedMotion(e.matches);
      }
    };
    
    // Adicionar listener para alterações na media query
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    // Para navegadores modernos (addEventListener)
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMediaQueryChange);
      return () => {
        mediaQuery.removeEventListener('change', handleMediaQueryChange);
      };
    }
    // Para navegadores legados (addListener - deprecated)
    else if ('addListener' in mediaQuery) {
      // @ts-ignore
      mediaQuery.addListener(handleMediaQueryChange);
      return () => {
        // @ts-ignore
        mediaQuery.removeListener(handleMediaQueryChange);
      };
    }
  }, []);
  
  // Função para definir a preferência do usuário
  const setReducedMotion = (value: boolean) => {
    localStorage.setItem('reduce-motion', value.toString());
    setPrefersReducedMotion(value);
    
    // Se estivermos atualizando a preferência do usuário no contexto de autenticação,
    // devemos também atualizar esse valor no backend
    // Essa implementação depende do sistema de API e autenticação
    const isLoggedIn = localStorage.getItem('auth-token') !== null;
    if (isLoggedIn) {
      // Aqui seria chamada a API para atualizar a preferência no perfil do usuário
      // Ex: api.updateUserPreferences({ reduceMotion: value });
      console.log('Atualizando preferência de movimento no perfil do usuário...');
    }
  };
  
  // Função para resetar para o padrão do sistema
  const resetToSystemDefault = () => {
    localStorage.removeItem('reduce-motion');
    setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    
    // Se o usuário estiver logado, atualizar no backend também
    const isLoggedIn = localStorage.getItem('auth-token') !== null;
    if (isLoggedIn) {
      // Aqui seria chamada a API para atualizar a preferência no perfil do usuário
      // Ex: api.updateUserPreferences({ reduceMotion: null });
      console.log('Resetando preferência de movimento para o padrão do sistema...');
    }
  };
  
  return {
    prefersReducedMotion,
    setReducedMotion,
    resetToSystemDefault
  };
}

export default useReducedMotion; 