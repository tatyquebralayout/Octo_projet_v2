/**
 * OCTO Design System
 * Este arquivo define os padrões visuais e de UI utilizados no projeto
 */

export const colors = {
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
};

export const typography = {
  // Família de fontes
  fontFamily: {
    sans: ['Poppins', 'sans-serif'],
    mono: ['JetBrains Mono', 'monospace']
  },
  
  // Tamanhos de fonte
  fontSize: {
    xs: '0.75rem',     // 12px - Caption
    sm: '0.875rem',    // 14px - Body Small
    base: '1rem',      // 16px - Body
    lg: '1.125rem',    // 18px - Body Large
    xl: '1.25rem',     // 20px - H3
    '2xl': '1.5rem',   // 24px - H2
    '3xl': '1.875rem', // 30px - H1
    '4xl': '2.75rem'   // 44px - Display
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
    tight: 1.25,    // Display, H1-H4
    normal: 1.5,    // Body text
    relaxed: 1.75   // Body large
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
};

export const spacing = {
  0: '0',
  1: '0.25rem',  // 4px
  2: '0.5rem',   // 8px
  3: '0.75rem',  // 12px
  4: '1rem',     // 16px
  6: '1.5rem',   // 24px
  8: '2rem',     // 32px
  12: '3rem',    // 48px
  16: '4rem'     // 64px
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
  default: '0.25rem', // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  full: '9999px'
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
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
};

// Design tokens para acessibilidade
export const a11y = {
  focusRingWidth: '2px',
  focusRingOffset: '2px',
  focusRingColor: colors.primary[400],
  focusVisibleOnly: true,
};

export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
};

export const transitions = {
  duration: {
    fast: '150ms',
    normal: '200ms',
    slow: '300ms'
  },
  timing: {
    default: 'ease-in-out',
    linear: 'linear',
    in: 'ease-in',
    out: 'ease-out',
    // Novas curvas de easing mais sofisticadas
    'swift-out': 'cubic-bezier(0.55, 0, 0.1, 1)',
    'bounce-out': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    'elastic': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    'decelerate': 'cubic-bezier(0, 0, 0.2, 1)',
    'accelerate': 'cubic-bezier(0.4, 0, 1, 1)',
    'entrance': 'cubic-bezier(0, 0, 0.2, 1.4)',
    'exit': 'cubic-bezier(0.4, -0.05, 1, 0.1)',
    'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)'
  }
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
  shadows,
  transitions,
};

export default designSystem; 