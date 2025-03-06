/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
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
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#3b82f6',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
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
      boxShadow: {
        'md3-1': '0px 1px 3px 1px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.30)',
        'md3-2': '0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.30)',
        'md3-3': '0px 1px 3px 0px rgba(0, 0, 0, 0.30), 0px 4px 8px 3px rgba(0, 0, 0, 0.15)',
      },
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
  plugins: [],
};