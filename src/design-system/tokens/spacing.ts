/**
 * Tokens de espaçamento centralizados do Design System
 * Parte do plano de refatoração para consolidar tokens em arquivos modulares
 */

// Sistema de espaçamento base
export const spacing = {
  0: '0',
  1: '0.25rem',    // 4px
  2: '0.5rem',     // 8px
  3: '0.75rem',    // 12px
  4: '1rem',       // 16px
  6: '1.5rem',     // 24px
  8: '2rem',       // 32px
  12: '3rem',      // 48px
  16: '4rem',      // 64px
  20: '5rem',      // 80px
  24: '6rem',      // 96px
  32: '8rem',      // 128px
};

// Utilidades de espaçamento derivadas
export const utilitySpacing = {
  // Espaçamento para margens e paddings padrão
  xs: spacing[1],
  sm: spacing[2],
  md: spacing[4],
  lg: spacing[8],
  xl: spacing[16],
  
  // Espaçamento para grid e layout
  gutter: {
    xs: spacing[2],
    sm: spacing[4],
    md: spacing[6],
    lg: spacing[8],
  },
  
  // Espaçamento para elementos de formulário
  form: {
    elementGap: spacing[4],
    groupGap: spacing[6],
    labelGap: spacing[2],
    helpTextGap: spacing[1],
  },
  
  // Espaçamento para seções
  section: {
    xs: spacing[6],
    sm: spacing[12],
    md: spacing[16],
    lg: spacing[24],
    xl: spacing[32],
  },
  
  // Espaçamento para componentes de card
  card: {
    padding: spacing[4],
    gap: spacing[3],
    headerFooterPadding: spacing[4],
  },
};

// Sistema de espaçamento completo
export const spacingSystem = {
  ...spacing,
  utility: utilitySpacing,
};

// Exportar tipos para uso em componentes
export type SpacingBase = typeof spacing;
export type UtilitySpacing = typeof utilitySpacing;
export type SpacingSystem = typeof spacingSystem;

// Exportação padrão para facilitar importação
export default spacingSystem; 