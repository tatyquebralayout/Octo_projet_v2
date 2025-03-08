import { cn } from '../cn';

export type AnimationName = 'fadeIn' | 'slideIn' | 'float' | 'pulse' | 'spin' | 'scaleIn' | 'scaleOut' | 'flipIn' | 'flipOut' | 'slideInLeft' | 'slideInRight' | 'bounce';
export type AnimationDuration = 'fast' | 'normal' | 'slow' | 'custom';
export type AnimationTiming = 'default' | 'linear' | 'in' | 'out' | 'swift-out' | 'bounce-out' | 'elastic' | 'decelerate' | 'accelerate' | 'entrance' | 'exit' | 'smooth';

export interface AnimationOptions {
  duration?: AnimationDuration;
  timing?: AnimationTiming;
  delay?: number;
  infinite?: boolean;
}

export interface AnimationConfig {
  className: string;
  keyframes: string;
}

// Definições de keyframes que serão adicionadas ao CSS global
export const keyframes = {
  fadeIn: `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `,
  slideIn: `
    @keyframes slideIn {
      from {
        transform: translateY(1rem);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
  `,
  float: `
    @keyframes float {
      0% { transform: translateY(0); }
      50% { transform: translateY(-0.5rem); }
      100% { transform: translateY(0); }
    }
  `,
  pulse: `
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
  `,
  spin: `
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `,
  // Novas animações
  scaleIn: `
    @keyframes scaleIn {
      from { transform: scale(0.8); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
  `,
  scaleOut: `
    @keyframes scaleOut {
      from { transform: scale(1); opacity: 1; }
      to { transform: scale(0.8); opacity: 0; }
    }
  `,
  flipIn: `
    @keyframes flipIn {
      from { transform: perspective(400px) rotateX(90deg); opacity: 0; }
      to { transform: perspective(400px) rotateX(0deg); opacity: 1; }
    }
  `,
  flipOut: `
    @keyframes flipOut {
      from { transform: perspective(400px) rotateX(0deg); opacity: 1; }
      to { transform: perspective(400px) rotateX(90deg); opacity: 0; }
    }
  `,
  slideInLeft: `
    @keyframes slideInLeft {
      from { transform: translateX(-1rem); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `,
  slideInRight: `
    @keyframes slideInRight {
      from { transform: translateX(1rem); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `,
  bounce: `
    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
      40% { transform: translateY(-20px); }
      60% { transform: translateY(-10px); }
    }
  `
};

// Configurações base das animações
export const animations: Record<AnimationName, AnimationConfig> = {
  fadeIn: {
    className: cn(
      'opacity-0',
      'animate-[fadeIn_200ms_ease-in-out]'
    ),
    keyframes: keyframes.fadeIn
  },
  slideIn: {
    className: cn(
      'transform',
      'translate-y-4',
      'opacity-0',
      'animate-[slideIn_200ms_ease-in-out]'
    ),
    keyframes: keyframes.slideIn
  },
  float: {
    className: cn(
      'animate-[float_3s_ease-in-out_infinite]'
    ),
    keyframes: keyframes.float
  },
  pulse: {
    className: cn(
      'animate-[pulse_2s_ease-in-out_infinite]'
    ),
    keyframes: keyframes.pulse
  },
  spin: {
    className: cn(
      'animate-[spin_1s_linear_infinite]'
    ),
    keyframes: keyframes.spin
  },
  // Novas animações
  scaleIn: {
    className: cn(
      'opacity-0',
      'scale-90',
      'animate-[scaleIn_200ms_cubic-bezier(0,0,0.2,1.4)]'
    ),
    keyframes: keyframes.scaleIn
  },
  scaleOut: {
    className: cn(
      'animate-[scaleOut_150ms_cubic-bezier(0.4,0,1,1)]'
    ),
    keyframes: keyframes.scaleOut
  },
  flipIn: {
    className: cn(
      'opacity-0',
      'animate-[flipIn_300ms_cubic-bezier(0.34,1.56,0.64,1)]'
    ),
    keyframes: keyframes.flipIn
  },
  flipOut: {
    className: cn(
      'animate-[flipOut_200ms_cubic-bezier(0.4,0,1,1)]'
    ),
    keyframes: keyframes.flipOut
  },
  slideInLeft: {
    className: cn(
      'opacity-0',
      'translate-x-[-1rem]',
      'animate-[slideInLeft_200ms_cubic-bezier(0,0,0.2,1)]'
    ),
    keyframes: keyframes.slideInLeft
  },
  slideInRight: {
    className: cn(
      'opacity-0',
      'translate-x-[1rem]',
      'animate-[slideInRight_200ms_cubic-bezier(0,0,0.2,1)]'
    ),
    keyframes: keyframes.slideInRight
  },
  bounce: {
    className: cn(
      'animate-[bounce_800ms_cubic-bezier(0.34,1.56,0.64,1)]'
    ),
    keyframes: keyframes.bounce
  }
};

/**
 * Função para gerar classes de animação com opções customizadas
 */
export function getAnimation(name: AnimationName, options: AnimationOptions = {}): string {
  const {
    duration = 'normal',
    timing = 'default',
    delay = 0,
    infinite = false
  } = options;

  // Aplicando a duração e timing nas classes CSS
  return cn(
    animations[name].className,
    delay > 0 && `delay-[${delay}ms]`,
    infinite && 'infinite',
    duration !== 'normal' && `duration-${duration}`,
    timing !== 'default' && `ease-${timing}`
  );
}

// Hook para adicionar keyframes ao documento
export function useAnimation(name: AnimationName): string {
  if (typeof document !== 'undefined') {
    const styleId = `animation-${name}`;
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.innerHTML = animations[name].keyframes;
      document.head.appendChild(style);
    }
  }
  
  return animations[name].className;
}

/**
 * Hook para detectar preferência de redução de movimento
 * Retorna true se o usuário preferir movimento reduzido
 */
export function usePrefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  
  // Verificar se o usuário definiu preferência no local storage
  const storedPreference = localStorage.getItem('reduce-motion');
  if (storedPreference !== null) {
    return storedPreference === 'true';
  }
  
  // Verificar media query para prefers-reduced-motion
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Função para obter animação com respeito a preferências de redução de movimento
 */
export function getAccessibleAnimation(name: AnimationName, options: AnimationOptions = {}, fallback: string = ''): string {
  if (typeof window === 'undefined') return animations[name].className;
  
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const userPreference = localStorage.getItem('reduce-motion');
  
  // Verificar se o usuário prefere movimento reduzido (via media query ou configuração)
  if (prefersReducedMotion || userPreference === 'true') {
    return fallback;
  }
  
  return getAnimation(name, options);
}

export default animations; 