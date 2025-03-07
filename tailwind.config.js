/** @type {import('tailwindcss').Config} */
const tokens = require('./src/design-system/tokens/design-tokens.js');

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Usando os tokens de cores do design system
        primary: tokens.colors.primary,
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
      animation: {
        float: 'float 3s ease-in-out infinite',
        slideIn: 'slideIn 0.3s ease-out forwards',
        fadeIn: 'fadeIn 0.3s ease-out forwards',
      },
    },
  },
  // Ativar dark mode baseado em atributo de dados
  darkMode: ['class', '[data-theme="dark"]'],
  plugins: [],
};