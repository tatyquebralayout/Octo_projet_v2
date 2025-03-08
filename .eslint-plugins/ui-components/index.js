/**
 * Plugin ESLint para regras personalizadas dos componentes UI base
 * 
 * Este plugin implementa regras para garantir o uso consistente dos
 * componentes base Loading, Error e Empty do design system.
 */

const { detectCustomSpinner, detectCustomErrorMessage, detectCustomEmptyState, preferEmptyComponent } = 
  require('../../src/design-system/components/ui/components.lint');

module.exports = {
  rules: {
    'no-custom-spinner': detectCustomSpinner,
    'no-custom-error': detectCustomErrorMessage,
    'no-custom-empty-state': detectCustomEmptyState,
    'prefer-empty-component': preferEmptyComponent
  },
  configs: {
    // Configuração recomendada com todas as regras habilitadas como avisos
    recommended: {
      plugins: ['ui-components'],
      rules: {
        'ui-components/no-custom-spinner': 'warn',
        'ui-components/no-custom-error': 'warn',
        'ui-components/no-custom-empty-state': 'warn',
        'ui-components/prefer-empty-component': 'warn'
      }
    },
    // Configuração estrita com todas as regras como erros
    strict: {
      plugins: ['ui-components'],
      rules: {
        'ui-components/no-custom-spinner': 'error',
        'ui-components/no-custom-error': 'error',
        'ui-components/no-custom-empty-state': 'error',
        'ui-components/prefer-empty-component': 'error'
      }
    }
  }
}; 