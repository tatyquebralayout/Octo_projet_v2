import React from 'react';
import { motion, HTMLMotionProps, Variants } from 'framer-motion';
import { useAnimation } from '../contexts/AnimationContext';

/**
 * Props para o componente AccessibleMotion
 */
export interface AccessibleMotionProps extends HTMLMotionProps<any> {
  /** Se a animação é essencial para a compreensão ou interação do usuário */
  essential?: boolean;
  /** Tag HTML a ser renderizada ('div' por padrão) */
  as?: React.ElementType;
  /** Variantes alternativas para movimento reduzido */
  reducedMotionVariants?: Variants;
  /** Filhos do componente */
  children: React.ReactNode;
}

/**
 * Componente que encapsula o Framer Motion com suporte a acessibilidade
 * Detecta automaticamente preferências de redução de movimento e aplica alternativas
 */
export const AccessibleMotion: React.FC<AccessibleMotionProps> = ({
  children,
  essential = true,
  reducedMotionVariants,
  variants,
  as = 'div',
  ...props
}) => {
  const { prefersReducedMotion } = useAnimation();
  
  // Se o usuário prefere movimento reduzido e a animação não é essencial, desativa
  if (prefersReducedMotion && !essential) {
    // Retorna sem animação
    const Component = as;
    return <Component {...props}>{children}</Component>;
  }
  
  // Se o usuário prefere movimento reduzido e forneceu variantes alternativas
  if (prefersReducedMotion && reducedMotionVariants) {
    // Usa as variantes de movimento reduzido
    const MotionComponent = motion[as as keyof typeof motion] || motion(as);
    return (
      <MotionComponent
        {...props}
        variants={reducedMotionVariants}
      >
        {children}
      </MotionComponent>
    );
  }
  
  // Caso contrário, usa a animação normal
  const MotionComponent = motion[as as keyof typeof motion] || motion(as);
  return (
    <MotionComponent
      {...props}
      variants={variants}
    >
      {children}
    </MotionComponent>
  );
};

export default AccessibleMotion; 