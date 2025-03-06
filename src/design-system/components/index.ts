// Componentes básicos
export { default as Button } from './Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './Button';

export { default as Card } from './Card';
export type { CardProps, CardVariant, CardSize, CardPadding } from './Card';

export { default as Input } from './Input';
export type { InputProps } from './Input';

// Animações
export { default as animations } from '../utils/animations';
export type { 
  AnimationName,
  AnimationDuration,
  AnimationTiming,
  AnimationOptions,
  AnimationConfig
} from '../utils/animations';
export { getAnimation, useAnimation } from '../utils/animations';

// Este arquivo facilita a importação de componentes do design system:
// import { Button, Card } from '@/design-system/components'; 