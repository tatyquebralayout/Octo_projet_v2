"use strict";
/**
 * Tokens de tipografia centralizados do Design System
 * Parte do plano de refatoração para consolidar tokens em arquivos modulares
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.typographySystem = exports.variants = exports.letterSpacing = exports.lineHeight = exports.fontWeight = exports.fontSize = exports.fontFamily = void 0;
// Definição de famílias tipográficas
exports.fontFamily = {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['Roboto Mono', 'monospace'],
};
// Definição de tamanhos de fonte
exports.fontSize = {
    xs: '0.75rem', // 12px
    sm: '0.875rem', // 14px
    base: '1rem', // 16px
    lg: '1.125rem', // 18px
    xl: '1.25rem', // 20px
    '2xl': '1.5rem', // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.75rem', // 44px
};
// Definição de pesos tipográficos
exports.fontWeight = {
    regular: 400,
    medium: 500,
    bold: 700,
};
// Definição de alturas de linha
exports.lineHeight = {
    none: 1,
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
};
// Definição de espaçamento entre letras
exports.letterSpacing = {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
};
// Variantes tipográficas pré-definidas para uso consistente
exports.variants = {
    // Títulos
    display: {
        fontSize: exports.fontSize['4xl'],
        fontWeight: exports.fontWeight.bold,
        lineHeight: exports.lineHeight.tight
    },
    h1: {
        fontSize: exports.fontSize['3xl'],
        fontWeight: exports.fontWeight.bold,
        lineHeight: exports.lineHeight.tight
    },
    h2: {
        fontSize: exports.fontSize['2xl'],
        fontWeight: exports.fontWeight.bold,
        lineHeight: exports.lineHeight.tight
    },
    h3: {
        fontSize: exports.fontSize.xl,
        fontWeight: exports.fontWeight.bold,
        lineHeight: exports.lineHeight.tight
    },
    h4: {
        fontSize: exports.fontSize.lg,
        fontWeight: exports.fontWeight.bold,
        lineHeight: exports.lineHeight.tight
    },
    // Corpo de texto
    bodyLarge: {
        fontSize: exports.fontSize.lg,
        fontWeight: exports.fontWeight.regular,
        lineHeight: exports.lineHeight.relaxed
    },
    body: {
        fontSize: exports.fontSize.base,
        fontWeight: exports.fontWeight.regular,
        lineHeight: exports.lineHeight.normal
    },
    bodySmall: {
        fontSize: exports.fontSize.sm,
        fontWeight: exports.fontWeight.regular,
        lineHeight: exports.lineHeight.normal
    },
    caption: {
        fontSize: exports.fontSize.xs,
        fontWeight: exports.fontWeight.regular,
        lineHeight: exports.lineHeight.normal
    },
};
// Sistema tipográfico completo
exports.typographySystem = {
    fontFamily: exports.fontFamily,
    fontSize: exports.fontSize,
    fontWeight: exports.fontWeight,
    lineHeight: exports.lineHeight,
    letterSpacing: exports.letterSpacing,
    variants: exports.variants,
};
// Exportação padrão para facilitar importação
exports.default = exports.typographySystem;
