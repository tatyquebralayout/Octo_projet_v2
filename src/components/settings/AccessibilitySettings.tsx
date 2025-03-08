import React from 'react';
import { useMotionPreference } from '../../design-system/utils/hooks/useReducedMotion';

interface AccessibilitySettingsProps {
  className?: string;
}

/**
 * Componente para configurações de acessibilidade
 * Permite ao usuário definir preferências de animação e movimento
 */
const AccessibilitySettings: React.FC<AccessibilitySettingsProps> = ({ className = '' }) => {
  // Usar o hook de preferência de movimento
  const { prefersReducedMotion, setReducedMotion, resetToSystemDefault } = useMotionPreference();
  
  return (
    <div className={`p-4 bg-surface rounded-lg ${className}`}>
      <h2 className="text-h3 mb-4">Configurações de Acessibilidade</h2>
      
      <div className="space-y-4">
        {/* Seção de Movimento */}
        <section>
          <h3 className="text-h4 mb-2">Animações e Movimento</h3>
          
          <div className="flex flex-col gap-3">
            <div className="flex items-center">
              <input
                type="radio"
                id="motion-full"
                name="motion-preference"
                checked={!prefersReducedMotion}
                onChange={() => setReducedMotion(false)}
                className="mr-2"
              />
              <label htmlFor="motion-full" className="text-body cursor-pointer">
                Animações completas
                <p className="text-body-small text-muted">
                  Experiência visual rica com todas as animações e efeitos visuais
                </p>
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="radio"
                id="motion-reduced"
                name="motion-preference"
                checked={prefersReducedMotion}
                onChange={() => setReducedMotion(true)}
                className="mr-2"
              />
              <label htmlFor="motion-reduced" className="text-body cursor-pointer">
                Movimento reduzido
                <p className="text-body-small text-muted">
                  Menos animações e efeitos visuais, recomendado para quem sente desconforto com movimento
                </p>
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="radio"
                id="motion-system"
                name="motion-preference"
                checked={localStorage.getItem('reduce-motion') === null}
                onChange={resetToSystemDefault}
                className="mr-2"
              />
              <label htmlFor="motion-system" className="text-body cursor-pointer">
                Usar configuração do sistema
                <p className="text-body-small text-muted">
                  Segue as preferências definidas no seu sistema operacional
                </p>
              </label>
            </div>
          </div>
        </section>
        
        {/* Outras opções de acessibilidade poderiam ser adicionadas aqui */}
        
        <div className="pt-4 text-sm text-muted">
          <p>
            Estas configurações são salvas no seu navegador. Se estiver logado, 
            elas também serão sincronizadas com sua conta.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccessibilitySettings; 