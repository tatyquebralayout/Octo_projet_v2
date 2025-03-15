"use strict";
/**
 * Tokens de cores centralizados do Design System
 * Parte do plano de refatoração para consolidar tokens em arquivos modulares
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.colorSystem = exports.themeColors = exports.semanticColors = exports.colorPalette = void 0;
// Paleta de cores primárias e auxiliares
exports.colorPalette = {
    // Cores primárias
    primary: {
        50: '#e3f2fd',
        100: '#bbdefb',
        200: '#90caf9',
        300: '#64b5f6',
        400: '#42a5f5',
        500: '#2196f3',
        600: '#1e88e5',
        700: '#1976d2',
        800: '#1565c0',
        900: '#0d47a1',
    },
    // Cores secundárias
    secondary: {
        50: '#e8f5e9',
        100: '#c8e6c9',
        200: '#a5d6a7',
        300: '#81c784',
        400: '#66bb6a',
        500: '#4caf50',
        600: '#43a047',
        700: '#388e3c',
        800: '#2e7d32',
        900: '#1b5e20',
    },
    // Cores de acento
    accent: {
        50: '#fff8e1',
        100: '#ffecb3',
        200: '#ffe082',
        300: '#ffd54f',
        400: '#ffca28',
        500: '#ffc107',
        600: '#ffb300',
        700: '#ffa000',
        800: '#ff8f00',
        900: '#ff6f00',
    },
    // Tons de cinza
    gray: {
        50: '#fafafa',
        100: '#f5f5f5',
        200: '#eeeeee',
        300: '#e0e0e0',
        400: '#bdbdbd',
        500: '#9e9e9e',
        600: '#757575',
        700: '#616161',
        800: '#424242',
        900: '#212121',
    },
    // Vermelho para erros
    red: {
        50: '#ffebee',
        100: '#ffcdd2',
        200: '#ef9a9a',
        300: '#e57373',
        400: '#ef5350',
        500: '#f44336',
        600: '#e53935',
        700: '#d32f2f',
        800: '#c62828',
        900: '#b71c1c',
    },
    // Verde para sucesso
    green: {
        50: '#e8f5e9',
        100: '#c8e6c9',
        200: '#a5d6a7',
        300: '#81c784',
        400: '#66bb6a',
        500: '#4caf50',
        600: '#43a047',
        700: '#388e3c',
        800: '#2e7d32',
        900: '#1b5e20',
    },
    // Amarelo para alertas
    yellow: {
        50: '#fffde7',
        100: '#fff9c4',
        200: '#fff59d',
        300: '#fff176',
        400: '#ffee58',
        500: '#ffeb3b',
        600: '#fdd835',
        700: '#fbc02d',
        800: '#f9a825',
        900: '#f57f17',
    },
    // Azul para informações
    blue: {
        50: '#e3f2fd',
        100: '#bbdefb',
        200: '#90caf9',
        300: '#64b5f6',
        400: '#42a5f5',
        500: '#2196f3',
        600: '#1e88e5',
        700: '#1976d2',
        800: '#1565c0',
        900: '#0d47a1',
    },
};
// Cores semânticas baseadas na paleta
exports.semanticColors = {
    // Estados semânticos
    success: {
        light: exports.colorPalette.green[400],
        main: exports.colorPalette.green[600],
        dark: exports.colorPalette.green[800],
        contrast: '#ffffff',
    },
    error: {
        light: exports.colorPalette.red[400],
        main: exports.colorPalette.red[600],
        dark: exports.colorPalette.red[800],
        contrast: '#ffffff',
    },
    warning: {
        light: exports.colorPalette.yellow[400],
        main: exports.colorPalette.yellow[700],
        dark: exports.colorPalette.yellow[800],
        contrast: '#000000',
    },
    info: {
        light: exports.colorPalette.blue[400],
        main: exports.colorPalette.blue[600],
        dark: exports.colorPalette.blue[800],
        contrast: '#ffffff',
    },
    // Cores do texto
    text: {
        primary: exports.colorPalette.gray[900],
        secondary: exports.colorPalette.gray[700],
        disabled: exports.colorPalette.gray[500],
        hint: exports.colorPalette.gray[600],
        inverse: '#ffffff',
    },
    // Cores de fundo
    background: {
        default: '#ffffff',
        paper: '#ffffff',
        card: '#ffffff',
        disabled: exports.colorPalette.gray[100],
    },
    // Cores para ações
    action: {
        active: 'rgba(0, 0, 0, 0.54)',
        hover: 'rgba(0, 0, 0, 0.04)',
        selected: 'rgba(0, 0, 0, 0.08)',
        disabled: 'rgba(0, 0, 0, 0.26)',
        disabledBackground: 'rgba(0, 0, 0, 0.12)',
    },
};
// Cores para modos claro/escuro
exports.themeColors = {
    light: {
        ...exports.semanticColors,
        background: {
            ...exports.semanticColors.background,
            default: '#ffffff',
            paper: '#ffffff',
        },
        text: {
            ...exports.semanticColors.text,
        },
    },
    dark: {
        ...exports.semanticColors,
        background: {
            default: '#121212',
            paper: '#1e1e1e',
            card: '#2d2d2d',
            disabled: '#333333',
        },
        text: {
            primary: '#ffffff',
            secondary: 'rgba(255, 255, 255, 0.7)',
            disabled: 'rgba(255, 255, 255, 0.5)',
            hint: 'rgba(255, 255, 255, 0.5)',
            inverse: exports.colorPalette.gray[900],
        },
        action: {
            active: 'rgba(255, 255, 255, 0.7)',
            hover: 'rgba(255, 255, 255, 0.08)',
            selected: 'rgba(255, 255, 255, 0.16)',
            disabled: 'rgba(255, 255, 255, 0.3)',
            disabledBackground: 'rgba(255, 255, 255, 0.12)',
        },
    },
};
// Sistema de cores completo
exports.colorSystem = {
    palette: exports.colorPalette,
    semantic: exports.semanticColors,
    theme: exports.themeColors,
};
// Exportação padrão para facilitar importação
exports.default = exports.colorSystem;
