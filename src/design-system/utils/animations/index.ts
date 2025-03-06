import { cn } from '../cn';
import { transitions } from '../../foundations/tokens';

export type AnimationName = 'fadeIn' | 'slideIn' | 'float' | 'pulse' | 'spin';
export type AnimationDuration = 'fast' | 'normal' | 'slow' | 'custom';
export type AnimationTiming = 'default' | 'linear' | 'in' | 'out';

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

  const durationValue = duration === 'custom' 
    ? '200ms'
    : transitions.duration[duration];

  const timingValue = transitions.timing[timing];
  
  return cn(
    animations[name].className,
    delay > 0 && `delay-[${delay}ms]`,
    infinite && 'infinite'
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

export default animations; 