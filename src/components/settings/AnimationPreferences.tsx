import React from 'react';
import { useAnimation } from '../../design-system/contexts/AnimationContext';

/**
 * Componente que permite ao usuário configurar suas preferências de animação
 */
const AnimationPreferences: React.FC = () => {
  const { 
    prefersReducedMotion, 
    animationsDisabled, 
    setReducedMotion, 
    resetToSystemDefault, 
    setAnimationsDisabled 
  } = useAnimation();
  
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Preferências de Animação
      </h2>
      
      <div className="space-y-4">
        {/* Opção para reduzir movimento */}
        <div className="flex items-center justify-between">
          <div>
            <label htmlFor="reduced-motion" className="font-medium text-gray-700 dark:text-gray-300">
              Reduzir movimento
            </label>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Simplifica animações para melhorar acessibilidade
            </p>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="reduced-motion"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 rounded"
              checked={prefersReducedMotion}
              onChange={(e) => setReducedMotion(e.target.checked)}
              aria-describedby="reduced-motion-description"
            />
          </div>
        </div>
        
        {/* Opção para desativar completamente */}
        <div className="flex items-center justify-between">
          <div>
            <label htmlFor="disable-animations" className="font-medium text-gray-700 dark:text-gray-300">
              Desativar todas as animações
            </label>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md">
              Remove completamente todas as animações não essenciais
            </p>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="disable-animations"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 rounded"
              checked={animationsDisabled}
              onChange={(e) => setAnimationsDisabled(e.target.checked)}
              aria-describedby="disable-animations-description"
            />
          </div>
        </div>
        
        {/* Botão para restaurar configurações padrão */}
        <button
          onClick={resetToSystemDefault}
          className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded transition-colors"
          data-animation-essential="true"
        >
          Restaurar configuração do sistema
        </button>
        
        {/* Dica informativa */}
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-sm rounded-md">
          <p>
            <strong>Dica:</strong> O navegador também pode definir automaticamente esta preferência com base nas configurações do seu sistema operacional.
          </p>
          <p className="mt-1">
            Para usuários Windows: Configurações &gt; Acessibilidade &gt; Efeitos visuais &gt; Desativar animações
          </p>
          <p className="mt-1">
            Para usuários macOS: Preferências do Sistema &gt; Acessibilidade &gt; Exibição &gt; Reduzir movimento
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnimationPreferences; 