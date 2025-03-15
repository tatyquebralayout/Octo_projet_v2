import { useEffect, useState } from 'react';

/**
 * Hook personalizado para detectar preferência do usuário por menos movimento
 * Combina preferências do sistema (media query) e preferências salvas no localStorage
 * Parte do plano de refatoração estrutural para melhorar acessibilidade de animações
 */
export function useReducedMotion(): boolean {
  // Estado inicial padrão: false (permite animações)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);
  
  useEffect(() => {
    // Verificar preferência do sistema via media query
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    // Verificar preferência salva no localStorage
    const savedPreference = localStorage.getItem('reduceMotion');
    
    // Determinar se deve reduzir o movimento
    const shouldReduceMotion = 
      // Se o usuário explicitamente definiu "true" no localStorage
      savedPreference === 'true' ||
      // OU se não há preferência salva E o sistema prefere movimento reduzido
      (savedPreference === null && mediaQuery.matches);
    
    // Atualizar o estado
    setPrefersReducedMotion(shouldReduceMotion);
    
    // Configurar listener para mudanças na preferência do sistema
    const updateMotionPreference = (e: MediaQueryListEvent) => {
      // Só atualizar se não houver preferência explícita no localStorage
      if (localStorage.getItem('reduceMotion') === null) {
        setPrefersReducedMotion(e.matches);
      }
    };
    
    // Adicionar listener usando o método correto dependendo do navegador
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', updateMotionPreference);
    } else {
      // Para compatibilidade com navegadores mais antigos
      // @ts-ignore - Alguns navegadores ainda usam esta API
      mediaQuery.addListener(updateMotionPreference);
    }
    
    // Limpar listener ao desmontar
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', updateMotionPreference);
      } else {
        // @ts-ignore - Alguns navegadores ainda usam esta API
        mediaQuery.removeListener(updateMotionPreference);
      }
    };
  }, []);
  
  return prefersReducedMotion;
} 