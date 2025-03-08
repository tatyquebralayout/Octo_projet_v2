/** @type {import('tailwindcss').Config} */
const tokens = require('./src/design-system/tokens/design-tokens.js');

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    // Configuração dos breakpoints usando os tokens unificados
    screens: tokens.breakpoints,
    extend: {
      colors: {
        // Usando os tokens de cores do design system unificado
        primary: tokens.colors.primary,
        secondary: tokens.colors.secondary,
        accent: tokens.colors.accent,
        gray: tokens.colors.gray,
        success: tokens.colors.state.success,
        warning: tokens.colors.state.warning,
        error: tokens.colors.state.error,
        info: tokens.colors.state.info,
      },
      fontFamily: {
        sans: [tokens.typography.fontFamily.base],
      },
      fontSize: tokens.typography.fontSize,
      spacing: tokens.spacing,
      borderRadius: tokens.borderRadius,
      boxShadow: tokens.shadows,
      zIndex: tokens.zIndex,
      // Usando as transições definidas nos tokens unificados
      transitionDuration: {
        fast: '150ms',
        normal: '200ms',
        slow: '300ms',
      },
      transitionTimingFunction: {
        'ease-in-out': 'ease-in-out',
      },
      // Animações
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) scale(1.1)' },
          '50%': { transform: 'translateY(-10px) scale(1.1)' },
        },
        slideIn: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      animation: tokens.animation,
    },
  },
  // Ativar dark mode baseado em atributo de dados
  darkMode: ['class', '[data-theme="dark"]'],
  plugins: [],
};