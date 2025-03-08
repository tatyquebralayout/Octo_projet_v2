/**
 * Exportação dos componentes do Design System
 */

// Componentes básicos
export { Button } from './Button/Button';
export { Card } from './Card/Card';
export { default as Input } from './Input/Input';

// Tipos
export type { ButtonProps } from './Button/Button';
export type { CardProps, CardVariant, CardSize, CardPadding } from './Card/Card';
export type { InputProps } from './Input/Input';

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