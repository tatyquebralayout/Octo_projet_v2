/**
 * OCTO Design System
 * Este arquivo define os padrões visuais e de UI utilizados no projeto
 */

export const colors = {
  // Cores principais
  primary: {
    50: '#f2e5ff',
    100: '#d9b3ff',
    200: '#c080ff',
    300: '#a64dff',
    400: '#972ae6', // Cor principal da marca (identificada no skip link)
    500: '#8c27d1',
    600: '#7b22ba',
    700: '#6a1ea3',
    800: '#59198c',
    900: '#481575',
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
    50: '#fffae5',
    100: '#fff2b3',
    200: '#ffea80',
    300: '#ffe14d',
    400: '#ffd91a',
    500: '#e6c300',
    600: '#cca800',
    700: '#b38e00',
    800: '#997400',
    900: '#805a00',
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
    900: '#111827',
  },
  
  // Cores semânticas
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
  
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
};

export const typography = {
  // Família de fontes
  fontFamily: {
    base: "'Poppins', sans-serif",
  },
  
  // Tamanhos de fonte
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
  },
  
  // Espessuras de fonte
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  
  // Alturas de linha
  lineHeight: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
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
};

export const spacing = {
  0: '0',
  0.5: '0.125rem', // 2px
  1: '0.25rem',    // 4px
  1.5: '0.375rem', // 6px
  2: '0.5rem',     // 8px
  2.5: '0.625rem', // 10px
  3: '0.75rem',    // 12px
  3.5: '0.875rem', // 14px
  4: '1rem',       // 16px
  5: '1.25rem',    // 20px
  6: '1.5rem',     // 24px
  7: '1.75rem',    // 28px
  8: '2rem',       // 32px
  9: '2.25rem',    // 36px
  10: '2.5rem',    // 40px
  11: '2.75rem',   // 44px
  12: '3rem',      // 48px
  14: '3.5rem',    // 56px
  16: '4rem',      // 64px
  20: '5rem',      // 80px
  24: '6rem',      // 96px
  28: '7rem',      // 112px
  32: '8rem',      // 128px
  36: '9rem',      // 144px
  40: '10rem',     // 160px
  44: '11rem',     // 176px
  48: '12rem',     // 192px
  52: '13rem',     // 208px
  56: '14rem',     // 224px
  60: '15rem',     // 240px
  64: '16rem',     // 256px
  72: '18rem',     // 288px
  80: '20rem',     // 320px
  96: '24rem',     // 384px
};

export const elevation = {
  // Baseado nas elevações do Material Design 3 (definidas no index.css)
  1: 'md3-elevation-1',
  2: 'md3-elevation-2',
  3: 'md3-elevation-3',
};

export const borderRadius = {
  none: '0',
  sm: '0.125rem',   // 2px
  DEFAULT: '0.25rem', // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  '3xl': '1.5rem',  // 24px
  full: '9999px',   // Circular
};

export const animation = {
  // Baseado nas animações definidas no index.css
  float: 'animate-float',
  slideIn: 'animate-slide-in',
  fadeIn: 'animate-fade-in',
};

// Componentes base com suas variantes
export const components = {
  button: {
    base: 'inline-flex items-center justify-center px-4 py-2 font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
    variants: {
      primary: 'bg-primary-400 text-white hover:bg-primary-500 focus:ring-primary-400',
      secondary: 'bg-secondary-400 text-white hover:bg-secondary-500 focus:ring-secondary-400',
      outline: 'bg-transparent border border-primary-400 text-primary-400 hover:bg-primary-50 focus:ring-primary-400',
    },
    sizes: {
      sm: 'text-sm px-3 py-1',
      md: 'text-base px-4 py-2',
      lg: 'text-lg px-6 py-3',
    },
  },
  
  card: {
    base: 'rounded-xl overflow-hidden',
    variants: {
      primary: 'bg-white border border-gray-200 md3-elevation-1',
      secondary: 'bg-gray-50 border border-gray-200',
      accent: 'bg-primary-50 border border-primary-100',
    },
  },
  
  input: {
    base: 'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2',
    variants: {
      default: 'border-gray-300 focus:border-primary-400 focus:ring-primary-400',
      error: 'border-error focus:border-error focus:ring-error',
    },
  },
};

// Para uso em Media Queries
export const breakpoints = {
  xs: '480px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// Design tokens para acessibilidade
export const a11y = {
  focusRingWidth: '2px',
  focusRingOffset: '2px',
  focusRingColor: colors.primary[400],
  focusVisibleOnly: true,
};

// Exportação do Design System completo
const designSystem = {
  colors,
  typography,
  spacing,
  elevation,
  borderRadius,
  animation,
  components,
  breakpoints,
  a11y,
};

export default designSystem; 