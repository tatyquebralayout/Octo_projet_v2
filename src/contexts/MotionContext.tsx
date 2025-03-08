import React, { createContext, useContext, useEffect } from 'react';
import { useMotionPreference } from '../design-system/utils/hooks/useReducedMotion';

interface MotionContextType {
  prefersReducedMotion: boolean;
  setReducedMotion: (value: boolean) => void;
  resetToSystemDefault: () => void;
}

// Criar o contexto
const MotionContext = createContext<MotionContextType | undefined>(undefined);

/**
 * Provider para o contexto de preferências de movimento
 */
export const MotionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const motionPreference = useMotionPreference();
  
  // Atualizar o atributo data-reduce-motion no elemento HTML
  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (motionPreference.prefersReducedMotion) {
        document.documentElement.setAttribute('data-reduce-motion', 'true');
      } else {
        document.documentElement.removeAttribute('data-reduce-motion');
      }
    }
  }, [motionPreference.prefersReducedMotion]);
  
  return (
    <MotionContext.Provider value={motionPreference}>
      {children}
    </MotionContext.Provider>
  );
};

/**
 * Hook para usar o contexto de preferências de movimento
 */
export const useMotionContext = (): MotionContextType => {
  const context = useContext(MotionContext);
  
  if (context === undefined) {
    throw new Error('useMotionContext deve ser usado dentro de um MotionProvider');
  }
  
  return context;
};

export default MotionContext; 