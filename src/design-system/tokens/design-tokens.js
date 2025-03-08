/**
 * Design Tokens para Tailwind
 * 
 * Este arquivo apenas importa e reexporta os tokens do arquivo unified-tokens.ts
 * para uso pelo Tailwind e outros sistemas que não suportam TypeScript.
 * 
 * NÃO MODIFIQUE ESTE ARQUIVO - TODAS AS ALTERAÇÕES DEVEM SER FEITAS EM unified-tokens.ts
 */

// Este require compila o arquivo TypeScript para JavaScript em tempo de execução
// @ts-ignore
const { tokens } = require('./unified-tokens');

// Adaptações específicas para o Tailwind
const tailwindTokens = {
  ...tokens,
  
  // Adaptando o formato do fontSize para o que o Tailwind espera
  typography: {
    ...tokens.typography,
    fontSize: {
      'xs': ['0.75rem', { lineHeight: tokens.typography.lineHeight.normal }],
      'sm': ['0.875rem', { lineHeight: tokens.typography.lineHeight.normal }],
      'base': ['1rem', { lineHeight: tokens.typography.lineHeight.normal }],
      'lg': ['1.125rem', { lineHeight: tokens.typography.lineHeight.relaxed }],
      'xl': ['1.25rem', { lineHeight: tokens.typography.lineHeight.tight }],
      '2xl': ['1.5rem', { lineHeight: tokens.typography.lineHeight.tight }],
      '3xl': ['1.875rem', { lineHeight: tokens.typography.lineHeight.tight }],
      '4xl': ['2.75rem', { lineHeight: tokens.typography.lineHeight.tight }],
      'display': ['2.75rem', { lineHeight: '1.2', fontWeight: '700' }],
      'h1': ['1.875rem', { lineHeight: '1.25', fontWeight: '700' }],
      'h2': ['1.5rem', { lineHeight: '1.25', fontWeight: '700' }],
      'h3': ['1.25rem', { lineHeight: '1.25', fontWeight: '700' }],
      'h4': ['1.125rem', { lineHeight: '1.25', fontWeight: '700' }],
      'body-large': ['1.125rem', { lineHeight: '1.75', fontWeight: '400' }],
      'body': ['1rem', { lineHeight: '1.5', fontWeight: '400' }],
      'body-small': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
      'caption': ['0.75rem', { lineHeight: '1.5', fontWeight: '400' }],
    },
    // Adaptar fontFamily para o formato do Tailwind
    fontFamily: {
      base: tokens.typography.fontFamily.sans.join(', '),
    }
  },
  
  // Adaptação para cores semânticas no formato que o Tailwind espera
  colors: {
    ...tokens.colors,
    state: {
      success: tokens.colors.success.main,
      warning: tokens.colors.warning.main,
      error: tokens.colors.error.main,
      info: tokens.colors.info.main,
    }
  }
};

module.exports = tailwindTokens; 