import React from 'react';
import { AnimatePresence } from 'framer-motion';
import AccessibleMotion from '../../design-system/components/AccessibleMotion';
import { scaleVariants } from '../../design-system/utils/animations/accessible-variants';
import { useAnimation } from '../../design-system/contexts/AnimationContext';

interface AnimatedCardProps {
  title: string;
  description: string;
  isVisible?: boolean;
  onClose?: () => void;
}

/**
 * Exemplo de cartão animado que usa o sistema de animações acessíveis
 * Respeita preferências de redução de movimento
 */
const AnimatedCard: React.FC<AnimatedCardProps> = ({
  title,
  description,
  isVisible = true,
  onClose
}) => {
  // Usa o hook de animação para verificar preferências
  const { prefersReducedMotion } = useAnimation();
  
  // Seleciona as variantes com base na preferência do usuário
  const variants = prefersReducedMotion 
    ? scaleVariants.reduced 
    : scaleVariants.standard;
  
  return (
    <AnimatePresence>
      {isVisible && (
        <AccessibleMotion
          className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 m-4"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
          // Marca essa animação como não essencial, será desativada em modo de movimento reduzido
          essential={false}
          // Especifica variantes alternativas para movimento reduzido como fallback
          reducedMotionVariants={scaleVariants.reduced}
          // Define a tag HTML a ser renderizada
          as="div"
        >
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
            
            {onClose && (
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
                aria-label="Fechar"
              >
                ×
              </button>
            )}
          </div>
          
          <p className="mt-3 text-gray-600 dark:text-gray-300">
            {description}
          </p>
          
          <div className="mt-4 flex justify-end">
            <button 
              className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded transition-colors"
              // Transições de cores são mantidas mesmo em modo de movimento reduzido
              data-animation-essential="true"
            >
              Saber mais
            </button>
          </div>
        </AccessibleMotion>
      )}
    </AnimatePresence>
  );
};

export default AnimatedCard; 