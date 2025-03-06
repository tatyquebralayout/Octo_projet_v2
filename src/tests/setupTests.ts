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

// Tipos personalizados para o Jest
declare global {
  namespace jest {
    interface Matchers<R> {
      // Matchers personalizados para acessibilidade
      toHaveNoViolations(): R;
      toBeAccessible(): R;
      
      // Matchers personalizados para elementos DOM
      toHaveStyle(style: Record<string, any>): R;
      toBeVisible(): R;
      toBeInTheDocument(): R;
      toHaveClass(className: string): R;
      toHaveAttribute(attr: string, value?: string): R;
      toHaveTextContent(text: string | RegExp): R;
      
      // Matchers personalizados para roles ARIA
      toHaveRole(role: string): R;
      toHaveDescription(text: string | RegExp): R;
    }
  }
}

// Configurações globais para testes
beforeAll(() => {
  // Silenciar warnings do console durante os testes
  jest.spyOn(console, 'warn').mockImplementation(() => {});
  
  // Mock do ResizeObserver
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

// Limpar todos os mocks após cada teste
afterEach(() => {
  jest.clearAllMocks();
}); 