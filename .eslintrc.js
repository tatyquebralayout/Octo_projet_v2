/**
 * Configuração ESLint Consolidada para o Projeto OCTO
 * 
 * Este arquivo centraliza todas as configurações de linting do projeto,
 * incluindo regras padrão de TypeScript/React e regras personalizadas
 * para componentes do design system.
 */

module.exports = {
  root: true,
  // Configuração principal para arquivos TypeScript
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    },
    project: './tsconfig.json'
  },
  env: {
    browser: true,
    es6: true,
    node: true
  },
  // Estender configurações populares e recomendadas
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended'
  ],
  // Plugins necessários
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
    'react-refresh',
    'jsx-a11y',
    'ui-components' // Nosso plugin personalizado
  ],
  // Configurações específicas para diferentes tipos de arquivos
  overrides: [
    // Configurações para arquivos TypeScript
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        // Regras TypeScript específicas
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-unused-vars': ['warn', { 
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_' 
        }]
      }
    },
    // Configurações para arquivos de teste
    {
      files: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off'
      }
    }
  ],
  // Regras gerais
  rules: {
    // Regras React
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react-refresh/only-export-components': ['warn', { 
      allowConstantExport: true 
    }],
    
    // Regras de acessibilidade
    'jsx-a11y/anchor-is-valid': 'error',
    'jsx-a11y/click-events-have-key-events': 'error',
    'jsx-a11y/no-static-element-interactions': 'error',
    'jsx-a11y/role-has-required-aria-props': 'error',
    'jsx-a11y/role-supports-aria-props': 'error',
    'jsx-a11y/tabindex-no-positive': 'error',
    'jsx-a11y/no-noninteractive-element-interactions': 'error',
    'jsx-a11y/no-noninteractive-tabindex': 'error',
    'jsx-a11y/interactive-supports-focus': 'error',
    'jsx-a11y/aria-role': ['error', {
      allowedRoles: {
        a: ['menuitem'],
        li: ['none', 'presentation']
      }
    }],
    'jsx-a11y/no-redundant-roles': ['error', {
      ul: ['list'],
      ol: ['list'],
      li: ['listitem']
    }],
    
    // Regras personalizadas para componentes UI
    'ui-components/no-custom-spinner': 'warn',
    'ui-components/no-custom-error': 'warn',
    'ui-components/no-custom-empty-state': 'warn',
    'ui-components/prefer-empty-component': 'warn'
  },
  // Configurações para componentes UI 
  settings: {
    react: {
      version: 'detect'
    },
    // Configuração para que o eslint encontre nosso plugin personalizado
    'import/resolver': {
      node: {
        paths: ['.eslint-plugins']
      }
    }
  },
  // Ignorar arquivos/diretórios
  ignorePatterns: [
    'dist',
    'node_modules',
    'storybook-static',
    '**/*.js',
    '!.eslintrc.js'
  ]
}; 