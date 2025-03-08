/**
 * Arquivo de exportação centralizada para todos os tokens do Design System
 * Este arquivo substitui a necessidade de importar tokens de múltiplos arquivos.
 */

// Importações de tokens por categoria
import colors, * as colorTokens from './colors';
import typography, * as typographyTokens from './typography';
import spacing, * as spacingTokens from './spacing';
import shadows, * as shadowTokens from './shadows';

// Re-exportações nomeadas para acesso direto a tokens específicos
export * from './colors';
export * from './typography';
export * from './spacing';
export * from './shadows';

// Objeto centralizado com todos os tokens
export const tokens = {
  colors,
  typography,
  spacing,
  shadows,
};

// Tipos para o objeto centralizado
export type DesignTokens = typeof tokens;

// Exportação padrão
export default tokens; 