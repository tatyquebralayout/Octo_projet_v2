/** @type {import('tailwindcss').Config} */
const tokens = require('./tailwind-tokens.js');

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    // Configuração dos breakpoints usando os tokens unificados
    screens: tokens["unified-tokens"].breakpoints,
    extend: {
      colors: {
        // Usando os tokens de cores do design system unificado
        primary: tokens.colors.colorPalette.primary,
        secondary: tokens.colors.colorPalette.secondary,
        accent: tokens.colors.colorPalette.accent,
        gray: tokens.colors.colorPalette.gray,
        // Cores semânticas
        success: tokens.colors.semanticColors.success,
        warning: tokens.colors.semanticColors.warning,
        error: tokens.colors.semanticColors.error,
        info: tokens.colors.semanticColors.info,
      },
      fontFamily: {
        sans: [tokens.typography.fontFamily.base],
      },
      fontSize: tokens.typography.fontSize,
      spacing: tokens.spacing,
      borderRadius: tokens["unified-tokens"].borderRadius,
      boxShadow: tokens.shadows,
      zIndex: tokens["unified-tokens"].zIndex,
      // Usando as transições definidas nos tokens unificados
      transitionDuration: {
        fast: '150ms',
        normal: '200ms',
        slow: '300ms',
      },
      transitionTimingFunction: {
        'ease-in-out': 'ease-in-out',
        'swift-out': 'cubic-bezier(0.55, 0, 0.1, 1)',
        'bounce-out': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'elastic': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'decelerate': 'cubic-bezier(0, 0, 0.2, 1)',
        'accelerate': 'cubic-bezier(0.4, 0, 1, 1)',
        'entrance': 'cubic-bezier(0, 0, 0.2, 1.4)',
        'exit': 'cubic-bezier(0.4, -0.05, 1, 0.1)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)'
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
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.8)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        scaleOut: {
          from: { opacity: '1', transform: 'scale(1)' },
          to: { opacity: '0', transform: 'scale(0.8)' },
        },
        flipIn: {
          from: { opacity: '0', transform: 'perspective(400px) rotateX(90deg)' },
          to: { opacity: '1', transform: 'perspective(400px) rotateX(0deg)' },
        },
        flipOut: {
          from: { opacity: '1', transform: 'perspective(400px) rotateX(0deg)' },
          to: { opacity: '0', transform: 'perspective(400px) rotateX(90deg)' },
        },
        slideInLeft: {
          from: { opacity: '0', transform: 'translateX(-1rem)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          from: { opacity: '0', transform: 'translateX(1rem)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        bounce: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-20px)' },
          '60%': { transform: 'translateY(-10px)' },
        },
      },
      animation: tokens["unified-tokens"].animation,
    },
  },
  // Ativar dark mode baseado em atributo de dados
  darkMode: ['class', '[data-theme="dark"]'],
  plugins: [],
};