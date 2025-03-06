import '@testing-library/jest-dom';
import 'axe-core';
import { configureAxe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

// Configuração do axe para testes de acessibilidade
const axe = configureAxe({
  rules: {
    // Regras personalizadas de acessibilidade
    'color-contrast': { enabled: true },
    'html-has-lang': { enabled: true },
    'valid-aria-role': { enabled: true },
    'aria-valid-attr': { enabled: true },
    'aria-hidden-focus': { enabled: true }
  }
});

export { axe }; 