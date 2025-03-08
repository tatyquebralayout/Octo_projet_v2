/**
 * Tokens de tipografia centralizados do Design System
 * Parte do plano de refatoração para consolidar tokens em arquivos modulares
 */

// Definição de famílias tipográficas
export const fontFamily = {
  sans: ['Inter', 'system-ui', 'sans-serif'],
  mono: ['Roboto Mono', 'monospace'],
};

// Definição de tamanhos de fonte
export const fontSize = {
  xs: '0.75rem',      // 12px
  sm: '0.875rem',     // 14px
  base: '1rem',       // 16px
  lg: '1.125rem',     // 18px
  xl: '1.25rem',      // 20px
  '2xl': '1.5rem',    // 24px
  '3xl': '1.875rem',  // 30px
  '4xl': '2.75rem',   // 44px
};

// Definição de pesos tipográficos
export const fontWeight = {
  regular: 400,
  medium: 500,
  bold: 700,
};

// Definição de alturas de linha
export const lineHeight = {
  none: 1,
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.75,
};

// Definição de espaçamento entre letras
export const letterSpacing = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
};

// Variantes tipográficas pré-definidas para uso consistente
export const variants = {
  // Títulos
  display: { 
    fontSize: fontSize['4xl'], 
    fontWeight: fontWeight.bold, 
    lineHeight: lineHeight.tight 
  },
  h1: { 
    fontSize: fontSize['3xl'], 
    fontWeight: fontWeight.bold, 
    lineHeight: lineHeight.tight 
  },
  h2: { 
    fontSize: fontSize['2xl'], 
    fontWeight: fontWeight.bold, 
    lineHeight: lineHeight.tight 
  },
  h3: { 
    fontSize: fontSize.xl, 
    fontWeight: fontWeight.bold, 
    lineHeight: lineHeight.tight 
  },
  h4: { 
    fontSize: fontSize.lg, 
    fontWeight: fontWeight.bold, 
    lineHeight: lineHeight.tight 
  },
  
  // Corpo de texto
  bodyLarge: { 
    fontSize: fontSize.lg, 
    fontWeight: fontWeight.regular, 
    lineHeight: lineHeight.relaxed 
  },
  body: { 
    fontSize: fontSize.base, 
    fontWeight: fontWeight.regular, 
    lineHeight: lineHeight.normal 
  },
  bodySmall: { 
    fontSize: fontSize.sm, 
    fontWeight: fontWeight.regular, 
    lineHeight: lineHeight.normal 
  },
  caption: { 
    fontSize: fontSize.xs, 
    fontWeight: fontWeight.regular, 
    lineHeight: lineHeight.normal 
  },
};

// Sistema tipográfico completo
export const typographySystem = {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  variants,
};

// Exportar tipos para uso em componentes
export type FontFamily = typeof fontFamily;
export type FontSize = typeof fontSize;
export type FontWeight = typeof fontWeight;
export type LineHeight = typeof lineHeight;
export type LetterSpacing = typeof letterSpacing;
export type TypographyVariants = typeof variants;
export type TypographySystem = typeof typographySystem;

// Exportação padrão para facilitar importação
export default typographySystem; 