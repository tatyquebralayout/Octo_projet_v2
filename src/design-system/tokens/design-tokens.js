/**
 * Design Tokens OCTO
 * 
 * Este arquivo é a fonte única da verdade para todos os tokens de design no projeto.
 * Estes tokens são utilizados tanto pelo Tailwind quanto pelos arquivos CSS.
 */

const tokens = {
  colors: {
    primary: {
      50: '#f2e5ff',
      100: '#d9b3ff',
      200: '#c080ff',
      300: '#a64dff',
      400: '#972ae6', // Cor principal da marca
      500: '#8c27d1',
      600: '#7b22ba',
      700: '#6a1ea3',
      800: '#59198c',
      900: '#481575',
    },
    accent: {
      50: '#fffae5',
      100: '#fff2b3',
      200: '#ffea80',
      300: '#ffe14d',
      400: '#e8b624', // Cor de destaque
      500: '#e6c300',
      600: '#cca800',
      700: '#b38e00',
      800: '#997400',
      900: '#805a00',
    },
    gray: {
      50: '#f8f9fa',  // bg-secondary
      100: '#e9ecef', // bg-tertiary
      200: '#dee2e6', // border-color
      300: '#ced4da',
      400: '#adb5bd',
      500: '#6c757d', // text-tertiary
      600: '#495057', // text-secondary
      700: '#343a40',
      800: '#212529', // text-primary
      900: '#121212',
    },
    state: {
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
  },
  
  typography: {
    fontFamily: {
      base: 'Poppins, system-ui, -apple-system, sans-serif',
    },
    fontSize: {
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
  },
  
  spacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '3rem',   // 48px
    '3xl': '4rem',   // 64px
  },
  
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem',
    pill: '9999px',
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
  
  transitions: {
    fast: '150ms ease-in-out',
    normal: '200ms ease-in-out',
    slow: '300ms ease-in-out',
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
  
  // Extensões para modo escuro
  darkMode: {
    colors: {
      primary: {
        400: '#b355ff', // Cor principal no tema escuro
      },
      accent: {
        400: '#ffd54f', // Cor de destaque no tema escuro
      },
      gray: {
        800: '#ffffff', // text-primary no tema escuro
        600: '#e0e0e0', // text-secondary no tema escuro
        500: '#bdbdbd', // text-tertiary no tema escuro
        200: '#404040', // border-color no tema escuro
        100: '#2d2d2d', // bg-tertiary no tema escuro
        50: '#1e1e1e',  // bg-secondary no tema escuro
        900: '#121212', // bg-primary no tema escuro
      },
    },
  },
};

module.exports = tokens; 