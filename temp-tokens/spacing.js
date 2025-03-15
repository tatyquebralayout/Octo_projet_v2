"use strict";
/**
 * Tokens de espaçamento centralizados do Design System
 * Parte do plano de refatoração para consolidar tokens em arquivos modulares
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.spacingSystem = exports.utilitySpacing = exports.spacing = void 0;
// Sistema de espaçamento base
exports.spacing = {
    0: '0',
    1: '0.25rem', // 4px
    2: '0.5rem', // 8px
    3: '0.75rem', // 12px
    4: '1rem', // 16px
    6: '1.5rem', // 24px
    8: '2rem', // 32px
    12: '3rem', // 48px
    16: '4rem', // 64px
    20: '5rem', // 80px
    24: '6rem', // 96px
    32: '8rem', // 128px
};
// Utilidades de espaçamento derivadas
exports.utilitySpacing = {
    // Espaçamento para margens e paddings padrão
    xs: exports.spacing[1],
    sm: exports.spacing[2],
    md: exports.spacing[4],
    lg: exports.spacing[8],
    xl: exports.spacing[16],
    // Espaçamento para grid e layout
    gutter: {
        xs: exports.spacing[2],
        sm: exports.spacing[4],
        md: exports.spacing[6],
        lg: exports.spacing[8],
    },
    // Espaçamento para elementos de formulário
    form: {
        elementGap: exports.spacing[4],
        groupGap: exports.spacing[6],
        labelGap: exports.spacing[2],
        helpTextGap: exports.spacing[1],
    },
    // Espaçamento para seções
    section: {
        xs: exports.spacing[6],
        sm: exports.spacing[12],
        md: exports.spacing[16],
        lg: exports.spacing[24],
        xl: exports.spacing[32],
    },
    // Espaçamento para componentes de card
    card: {
        padding: exports.spacing[4],
        gap: exports.spacing[3],
        headerFooterPadding: exports.spacing[4],
    },
};
// Sistema de espaçamento completo
exports.spacingSystem = {
    ...exports.spacing,
    utility: exports.utilitySpacing,
};
// Exportação padrão para facilitar importação
exports.default = exports.spacingSystem;
