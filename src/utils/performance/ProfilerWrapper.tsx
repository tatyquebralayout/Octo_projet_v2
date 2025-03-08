import React, { Profiler } from 'react';

// Configurações para o log
const PERFORMANCE_LOGGING_ENABLED = import.meta.env.MODE === 'development';
const PERFORMANCE_THRESHOLD_MS = 16; // 16ms é aproximadamente 60fps

interface ProfilerWrapperProps {
  id: string;
  children: React.ReactNode;
}

/**
 * Wrapper de Profiler para monitorar performance de componentes
 * 
 * Exemplo de uso:
 * <ProfilerWrapper id="CartilhasPage">
 *   <Cartilhas />
 * </ProfilerWrapper>
 */
const ProfilerWrapper: React.FC<ProfilerWrapperProps> = ({ id, children }) => {
  // Não aplicar o profiler em produção para não afetar a performance
  if (!PERFORMANCE_LOGGING_ENABLED) {
    return <>{children}</>;
  }

  const handleRender = (
    profilerId: string,
    phase: string,
    actualDuration: number,
    baseDuration: number
  ) => {
    const phaseLabel = phase === 'mount' ? 'Montagem Inicial' : 'Atualização';
    
    if (actualDuration > PERFORMANCE_THRESHOLD_MS) {
      // Renderização lenta
      console.log(
        `%c⚠️ Renderização lenta em '${profilerId}' (${phaseLabel}): ${actualDuration.toFixed(2)}ms`,
        'color: #FF6347; font-weight: bold;',
        {
          component: profilerId,
          actualDuration,
          baseDuration
        }
      );
    } else {
      // Renderização normal
      console.log(
        `%c✅ Renderização em '${profilerId}' (${phaseLabel}): ${actualDuration.toFixed(2)}ms`,
        'color: #7B68EE; font-weight: bold;',
        {
          component: profilerId,
          actualDuration,
          baseDuration
        }
      );
    }
  };

  return (
    <Profiler id={id} onRender={handleRender}>
      {children}
    </Profiler>
  );
};

export default ProfilerWrapper; 