"use strict";
/**
 * OCTO Design System - Tokens Unificados
 *
 * Este arquivo é a ÚNICA fonte de verdade para todos os tokens de design no projeto.
 * Estes tokens são utilizados por componentes React, arquivos CSS e configuração do Tailwind.
 *
 * @module design-system/tokens/unified-tokens
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokens = void 0;
/**
 * Definição dos tokens de design
 */
exports.tokens = {
    colors: {
        // Cores principais
        primary: {
            50: '#f5e6fe',
            100: '#e6ccfd',
            200: '#d199fc',
            300: '#b866fa',
            400: '#972ae6', // Main brand color
            500: '#7a21b8',
            600: '#5c198a',
            700: '#3e115c',
            800: '#20082e',
            900: '#100417'
        },
        // Cores secundárias
        secondary: {
            50: '#e5f6ff',
            100: '#b3e5ff',
            200: '#80d5ff',
            300: '#4dc4ff',
            400: '#1ab3ff',
            500: '#0099e6',
            600: '#0080cc',
            700: '#0066b3',
            800: '#004d99',
            900: '#003366',
        },
        // Cores de acentuação
        accent: {
            50: '#fef9e6',
            100: '#fdf3cc',
            200: '#fbe799',
            300: '#f9db66',
            400: '#e8b624', // Secondary brand color
            500: '#ba921d',
            600: '#8b6e16',
            700: '#5d490e',
            800: '#2e2507',
            900: '#171203'
        },
        // Tons de cinza para texto e fundos
        gray: {
            50: '#f9fafb',
            100: '#f3f4f6',
            200: '#e5e7eb',
            300: '#d1d5db',
            400: '#9ca3af',
            500: '#6b7280',
            600: '#4b5563',
            700: '#374151',
            800: '#1f2937',
            900: '#111827'
        },
        // Cores semânticas
        success: {
            light: '#86efac',
            main: '#22c55e',
            dark: '#15803d'
        },
        warning: {
            light: '#fde68a',
            main: '#f59e0b',
            dark: '#b45309'
        },
        error: {
            light: '#fca5a5',
            main: '#ef4444',
            dark: '#b91c1c'
        },
        info: {
            light: '#93c5fd',
            main: '#3b82f6',
            dark: '#1d4ed8'
        },
        // Cores de fundo e texto
        background: {
            primary: '#ffffff',
            secondary: '#f9fafb',
            accent: '#f2e5ff',
        },
        text: {
            primary: '#1f2937',
            secondary: '#4b5563',
            tertiary: '#6b7280',
            onPrimary: '#ffffff',
            onSecondary: '#1f2937',
            onAccent: '#1f2937',
        },
    },
    typography: {
        // Família de fontes
        fontFamily: {
            sans: ['Poppins', 'system-ui', '-apple-system', 'sans-serif'],
            mono: ['JetBrains Mono', 'monospace']
        },
        // Tamanhos de fonte
        fontSize: {
            xs: '0.75rem', // 12px - Caption
            sm: '0.875rem', // 14px - Body Small
            base: '1rem', // 16px - Body
            lg: '1.125rem', // 18px - Body Large
            xl: '1.25rem', // 20px - H3
            '2xl': '1.5rem', // 24px - H2
            '3xl': '1.875rem', // 30px - H1
            '4xl': '2.75rem' // 44px - Display
        },
        // Espessuras de fonte
        fontWeight: {
            regular: 400,
            medium: 500,
            bold: 700
        },
        // Alturas de linha
        lineHeight: {
            none: 1,
            tight: 1.25, // Display, H1-H4
            normal: 1.5, // Body text
            relaxed: 1.75 // Body large
        },
        // Espaçamento entre letras
        letterSpacing: {
            tighter: '-0.05em',
            tight: '-0.025em',
            normal: '0',
            wide: '0.025em',
            wider: '0.05em',
            widest: '0.1em',
        },
        // Variantes de texto
        variants: {
            display: {
                fontSize: '2.75rem',
                fontWeight: 700,
                lineHeight: 1.2
            },
            h1: {
                fontSize: '1.875rem',
                fontWeight: 700,
                lineHeight: 1.25
            },
            h2: {
                fontSize: '1.5rem',
                fontWeight: 700,
                lineHeight: 1.25
            },
            h3: {
                fontSize: '1.25rem',
                fontWeight: 700,
                lineHeight: 1.25
            },
            h4: {
                fontSize: '1.125rem',
                fontWeight: 700,
                lineHeight: 1.25
            },
            bodyLarge: {
                fontSize: '1.125rem',
                fontWeight: 400,
                lineHeight: 1.75
            },
            body: {
                fontSize: '1rem',
                fontWeight: 400,
                lineHeight: 1.5
            },
            bodySmall: {
                fontSize: '0.875rem',
                fontWeight: 400,
                lineHeight: 1.5
            },
            caption: {
                fontSize: '0.75rem',
                fontWeight: 400,
                lineHeight: 1.5
            }
        }
    },
    spacing: {
        0: '0',
        1: '0.25rem', // 4px
        2: '0.5rem', // 8px
        3: '0.75rem', // 12px
        4: '1rem', // 16px
        6: '1.5rem', // 24px
        8: '2rem', // 32px
        12: '3rem', // 48px
        16: '4rem' // 64px
    },
    borderRadius: {
        none: '0',
        sm: '0.25rem', // 4px
        default: '0.375rem', // 6px
        md: '0.5rem', // 8px
        lg: '1rem', // 16px
        xl: '1.5rem', // 24px
        '2xl': '2rem', // 32px
        full: '9999px' // Pill shape
    },
    shadows: {
        sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
        focus: '0 0 0 3px rgba(151, 42, 230, 0.4)',
        'md3-1': '0px 1px 3px 1px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.30)',
        'md3-2': '0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.30)',
        'md3-3': '0px 1px 3px 0px rgba(0, 0, 0, 0.30), 0px 4px 8px 3px rgba(0, 0, 0, 0.15)',
    },
    animation: {
        float: 'float 3s ease-in-out infinite',
        slideIn: 'slideIn 0.3s ease-out forwards',
        fadeIn: 'fadeIn 0.3s ease-out forwards',
        scaleIn: 'scaleIn 0.3s cubic-bezier(0,0,0.2,1.4) forwards',
        scaleOut: 'scaleOut 0.2s cubic-bezier(0.4,0,1,1) forwards',
        flipIn: 'flipIn 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards',
        flipOut: 'flipOut 0.3s cubic-bezier(0.4,0,1,1) forwards',
        slideInLeft: 'slideInLeft 0.3s cubic-bezier(0,0,0.2,1) forwards',
        slideInRight: 'slideInRight 0.3s cubic-bezier(0,0,0.2,1) forwards',
        bounce: 'bounce 0.8s cubic-bezier(0.34,1.56,0.64,1)',
    },
    zIndex: {
        dropdown: 1000,
        sticky: 1020,
        fixed: 1030,
        modalBackdrop: 1040,
        modal: 1050,
        popover: 1060,
        tooltip: 1070,
    },
    // Breakpoints para responsividade
    breakpoints: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px'
    },
};
exports.default = exports.tokens;
