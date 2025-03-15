/**
 * Arquivo de tokens gerado automaticamente
 * NÃO EDITE MANUALMENTE
 */

// Definição simplificada de tokens para evitar referências circulares
module.exports = {
  colors: {
    // Paleta de cores primárias
    colorPalette: {
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
      secondary: {
        50: '#f3e5f5',
        100: '#e1bee7',
        200: '#ce93d8',
        300: '#ba68c8',
        400: '#ab47bc',
        500: '#9c27b0',
        600: '#8e24aa',
        700: '#7b1fa2',
        800: '#6a1b9a',
        900: '#4a148c',
      },
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
      }
    },
    
    // Cores semânticas
    semanticColors: {
      success: {
        light: '#4caf50',
        main: '#2e7d32',
        dark: '#1b5e20',
        contrast: '#ffffff',
      },
      error: {
        light: '#f44336',
        main: '#d32f2f',
        dark: '#b71c1c',
        contrast: '#ffffff',
      },
      warning: {
        light: '#ff9800',
        main: '#ed6c02',
        dark: '#e65100',
        contrast: '#ffffff',
      },
      info: {
        light: '#03a9f4',
        main: '#0288d1',
        dark: '#01579b',
        contrast: '#ffffff',
      }
    }
  },
  
  // Tipografia
  typography: {
    fontFamily: {
      base: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    },
    fontSize: {
      'display': ['44px', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
      'h1': ['36px', { lineHeight: '1.2', letterSpacing: '-0.015em' }],
      'h2': ['32px', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
      'h3': ['28px', { lineHeight: '1.3', letterSpacing: '-0.005em' }],
      'h4': ['24px', { lineHeight: '1.35', letterSpacing: '0' }],
      'h5': ['20px', { lineHeight: '1.375', letterSpacing: '0' }],
      'h6': ['18px', { lineHeight: '1.4', letterSpacing: '0.0025em' }],
      'body-large': ['18px', { lineHeight: '1.5', letterSpacing: '0.005em' }],
      'body': ['16px', { lineHeight: '1.5', letterSpacing: '0.005em' }],
      'body-small': ['14px', { lineHeight: '1.5', letterSpacing: '0.01em' }],
      'caption': ['12px', { lineHeight: '1.5', letterSpacing: '0.01em' }],
      'overline': ['12px', { lineHeight: '1.5', letterSpacing: '0.03em', textTransform: 'uppercase' }],
    }
  },
  
  // Espaçamentos
  spacing: {
    '0': '0',
    'xs': '4px',
    'sm': '8px',
    'md': '16px',
    'lg': '24px',
    'xl': '32px',
    '2xl': '40px',
    '3xl': '48px',
    '4xl': '64px',
    '5xl': '80px',
    '6xl': '96px',
  },
  
  // Sombras
  shadows: {
    'none': 'none',
    'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    // Material Design 3 sombras
    'md3-1': '0 1px 2px 0 rgba(0, 0, 0, 0.3), 0 1px 3px 1px rgba(0, 0, 0, 0.15)',
    'md3-2': '0 1px 2px 0 rgba(0, 0, 0, 0.3), 0 2px 6px 2px rgba(0, 0, 0, 0.15)',
    'md3-3': '0 4px 8px 3px rgba(0, 0, 0, 0.15), 0 1px 3px 0 rgba(0, 0, 0, 0.3)',
    // Sombra de foco para inputs, etc.
    'focus': '0 0 0 3px rgba(179, 85, 255, 0.4)',
    'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  },
  
  // Tokens unificados
  "unified-tokens": {
    breakpoints: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px'
    },
    borderRadius: {
      'none': '0',
      'sm': '2px',
      'DEFAULT': '4px',
      'md': '6px',
      'lg': '8px',
      'xl': '12px',
      '2xl': '16px',
      'full': '9999px',
    },
    zIndex: {
      'behind': -1,
      'default': 1,
      'dropdown': 10,
      'sticky': 20,
      'fixed': 30,
      'overlay': 40,
      'modalBackdrop': 45,
      'modal': 50,
      'popover': 60,
      'tooltip': 70,
      'toast': 80,
      'top': 9999,
    },
    animation: {
      'float': 'float 3s ease-in-out infinite',
      'fadeIn': 'fadeIn 0.3s ease-in-out',
      'scaleIn': 'scaleIn 0.3s ease-out',
      'scaleOut': 'scaleOut 0.2s ease-in forwards',
      'slideIn': 'slideIn 0.3s ease-out',
      'slideInLeft': 'slideInLeft 0.3s ease-out',
      'slideInRight': 'slideInRight 0.3s ease-out',
      'flipIn': 'flipIn 0.4s ease-out',
      'flipOut': 'flipOut 0.3s ease-in forwards',
      'bounce': 'bounce 1s ease-in-out infinite',
    }
  }
};
