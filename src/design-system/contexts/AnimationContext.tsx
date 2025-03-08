import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useReducedMotion } from '../utils/hooks/useReducedMotion';

/**
 * Interface para o contexto de animações
 */
interface AnimationContextType {
  /** Se as animações devem ser reduzidas com base em preferências do usuário */
  prefersReducedMotion: boolean;
  /** Se as animações estão completamente desativadas */
  animationsDisabled: boolean;
  /** Define se as animações devem ser reduzidas */
  setReducedMotion: (value: boolean) => void;
  /** Restaura para usar a preferência do sistema */
  resetToSystemDefault: () => void;
  /** Desativa ou ativa completamente todas as animações */
  setAnimationsDisabled: (value: boolean) => void;
  /** Verifica se uma animação específica deve ser executada */
  shouldAnimate: (essentialForInteraction?: boolean) => boolean;
}

/**
 * Props para o provedor de contexto de animações
 */
interface AnimationProviderProps {
  children: ReactNode;
}

// Criação do contexto com valor padrão
const AnimationContext = createContext<AnimationContextType>({
  prefersReducedMotion: false,
  animationsDisabled: false,
  setReducedMotion: () => {},
  resetToSystemDefault: () => {},
  setAnimationsDisabled: () => {},
  shouldAnimate: () => true,
});

/**
 * Provedor do contexto de animações
 * Gerencia as preferências de animação do usuário e do sistema
 */
export const AnimationProvider: React.FC<AnimationProviderProps> = ({ children }) => {
  // Usa o hook existente para capturar a preferência de redução de movimento
  const {
    prefersReducedMotion,
    setReducedMotion,
    resetToSystemDefault
  } = useMotionPreference();
  
  // Estado para controlar a desativação completa das animações
  const [animationsDisabled, setAnimationsDisabled] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('animations-disabled') === 'true';
  });
  
  // Atualiza o atributo de dados no HTML para estilos CSS
  useEffect(() => {
    if (typeof document === 'undefined') return;
    
    // Define o atributo para redução de movimento
    document.documentElement.setAttribute('data-reduce-motion', prefersReducedMotion.toString());
    
    // Define o atributo para desativação completa
    document.documentElement.setAttribute('data-animations-disabled', animationsDisabled.toString());
    
    // Armazena a preferência de desativação
    if (animationsDisabled) {
      localStorage.setItem('animations-disabled', 'true');
    } else {
      localStorage.removeItem('animations-disabled');
    }
  }, [prefersReducedMotion, animationsDisabled]);
  
  /**
   * Função que determina se uma animação específica deve ser executada
   * @param essentialForInteraction - Se a animação é essencial para a interação do usuário
   * @returns Verdadeiro se a animação deve ser executada
   */
  const shouldAnimate = (essentialForInteraction = false): boolean => {
    if (animationsDisabled) return false;
    if (prefersReducedMotion && !essentialForInteraction) return false;
    return true;
  };
  
  // Valor do contexto
  const value: AnimationContextType = {
    prefersReducedMotion,
    animationsDisabled,
    setReducedMotion,
    resetToSystemDefault,
    setAnimationsDisabled,
    shouldAnimate,
  };
  
  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
};

/**
 * Hook para usar o contexto de animações
 */
export const useAnimation = (): AnimationContextType => {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error('useAnimation deve ser usado dentro de um AnimationProvider');
  }
  return context;
};

// Reexporta o hook de useMotionPreference para compatibilidade
import { useMotionPreference } from '../utils/hooks/useReducedMotion';
export { useMotionPreference };

export default AnimationContext; 