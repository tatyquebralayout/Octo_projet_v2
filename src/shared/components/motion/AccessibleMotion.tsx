import React from 'react';
import { 
  motion, 
  MotionProps, 
  Variants, 
  HTMLMotionProps,
  ForwardRefComponent,
  MotionComponentProps as FramerMotionComponentProps
} from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

// Props que se aplicam a todos os componentes de motion
export interface AccessibleMotionBaseProps {
  reducedMotionVariants?: Variants;
  children: React.ReactNode;
  useReducedMotion?: boolean; // Forçar uso de variantes reduzidas
}

// Tipo para os componentes de motion
type MotionComponentProps<T extends keyof HTMLElementTagNameMap> = 
  HTMLMotionProps<T> & AccessibleMotionBaseProps;

/**
 * Componente de Motion acessível que respeita preferências de redução de movimento
 * Este componente é uma versão refatorada que suporta todos os elementos HTML
 * Parte do plano de refatoração para padronizar o sistema de animações
 */
function createAccessibleMotion<T extends keyof HTMLElementTagNameMap>(
  tag: T
): React.FC<MotionComponentProps<T>> {
  return function AccessibleMotionElement({
    children,
    variants,
    reducedMotionVariants,
    useReducedMotion: forceReducedMotion,
    ...props
  }: MotionComponentProps<T>) {
    const prefersReducedMotion = useReducedMotion();
    const shouldUseReducedMotion = forceReducedMotion || prefersReducedMotion;
    
    // Usar variantes alternativas se preferir menos movimento
    const activeVariants = shouldUseReducedMotion && reducedMotionVariants
      ? reducedMotionVariants
      : variants;

    // Criar o elemento de motion dinamicamente com base no tag
    const MotionTag = motion[tag];
    
    return (
      <MotionTag
        variants={activeVariants}
        {...props}
      >
        {children}
      </MotionTag>
    );
  };
}

// Criar componentes para os elementos HTML mais comuns
export const AccessibleMotionDiv = createAccessibleMotion('div');
export const AccessibleMotionSpan = createAccessibleMotion('span');
export const AccessibleMotionButton = createAccessibleMotion('button');
export const AccessibleMotionLi = createAccessibleMotion('li');
export const AccessibleMotionUl = createAccessibleMotion('ul');
export const AccessibleMotionA = createAccessibleMotion('a');
export const AccessibleMotionSection = createAccessibleMotion('section');
export const AccessibleMotionArticle = createAccessibleMotion('article');
export const AccessibleMotionHeader = createAccessibleMotion('header');
export const AccessibleMotionFooter = createAccessibleMotion('footer');
export const AccessibleMotionNav = createAccessibleMotion('nav');
export const AccessibleMotionAside = createAccessibleMotion('aside');

// Para compatibilidade backward, exportar o div como padrão
export const AccessibleMotion = AccessibleMotionDiv;

// Exportar variantes comuns de animação
export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
};

export const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1.0]  // Curva ease-out padronizada
    } 
  }
};

export const reducedFadeInVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } }
};

export const scaleVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { 
      duration: 0.4, 
      ease: [0.25, 0.1, 0.25, 1.0] 
    } 
  }
};

export const reducedScaleVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } }
};

export const slideInLeftVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      duration: 0.5, 
      ease: [0.25, 0.1, 0.25, 1.0] 
    } 
  }
};

export const slideInRightVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      duration: 0.5, 
      ease: [0.25, 0.1, 0.25, 1.0] 
    } 
  }
};

export const reducedSlideVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } }
};

export default AccessibleMotion; 