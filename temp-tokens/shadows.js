"use strict";
/**
 * Tokens de sombras centralizados do Design System
 * Parte do plano de refatoração para consolidar tokens em arquivos modulares
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.shadowSystem = exports.elevation = exports.shadows = void 0;
// Definições de sombras
exports.shadows = {
    none: 'none',
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
};
// Elevação baseada no Material Design
exports.elevation = {
    1: 'md3-elevation-1',
    2: 'md3-elevation-2',
    3: 'md3-elevation-3',
};
// Sistema de sombras completo
exports.shadowSystem = {
    shadows: exports.shadows,
    elevation: exports.elevation
};
// Exportação padrão para facilitar importação
exports.default = exports.shadowSystem;
