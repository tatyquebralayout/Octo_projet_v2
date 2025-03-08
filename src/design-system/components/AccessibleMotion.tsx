import React from 'react';
import { motion, MotionProps, Variants } from 'framer-motion';
import { useAnimation } from '../contexts/AnimationContext';

/**
 * Props para o componente AccessibleMotion
 */
interface AccessibleMotionProps extends MotionProps {
  /** Se a animação é essencial para a compreensão ou interação do usuário */
  essential?: boolean;
  /** Tag HTML a ser renderizada ('div' por padrão) */
  as?: keyof JSX.IntrinsicElements;
  /** Variantes alternativas para movimento reduzido */
  reducedMotionVariants?: Variants;
  /** Filhos do componente */
  children: React.ReactNode;
}

/**
 * Componente que encapsula o Framer Motion com suporte a acessibilidade
 * Detecta automaticamente preferências de redução de movimento e aplica alternativas
 */
const AccessibleMotion: React.FC<AccessibleMotionProps> = ({
  essential = false,
  as = 'div',
  variants,
  reducedMotionVariants,
  transition,
  children,
  ...props
}) => {
  // Usa o contexto de animação
  const { shouldAnimate, prefersReducedMotion } = useAnimation();
  
  // Determina se deve animar com base nas preferências
  const shouldPerformAnimation = shouldAnimate(essential);
  
  // Se não deve animar e não é essencial, retorna um elemento simples
  if (!shouldPerformAnimation && !essential) {
    const MotionTag = as;
    return <MotionTag {...props}>{children}</MotionTag>;
  }
  
  // Se tiver preferência por movimento reduzido e tiver variantes alternativas
  const effectiveVariants = prefersReducedMotion && reducedMotionVariants
    ? reducedMotionVariants
    : variants;
  
  // Transição mais suave para preferências de movimento reduzido
  const effectiveTransition = prefersReducedMotion
    ? { duration: 0.1, ...transition }
    : transition;
  
  // Renderiza o componente Motion com as propriedades ajustadas
  const MotionComponent = motion[as as keyof typeof motion];
  return (
    <MotionComponent
      variants={effectiveVariants}
      transition={effectiveTransition}
      {...props}
    >
      {children}
    </MotionComponent>
  );
};

export default AccessibleMotion; 