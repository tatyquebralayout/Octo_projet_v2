/**
 * @vitest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent, renderHook, act } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { ThemeProvider, useTheme, ThemeMode } from '../../contexts/ThemeContext';

// Mock para localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    clear: vi.fn(() => {
      store = {};
    })
  };
})();

// Mock mais completo para matchMedia
const createMatchMediaMock = (matches: boolean) => {
  const listeners: Array<(e: MediaQueryListEvent) => void> = [];
  
  return {
    matches,
    addEventListener: vi.fn((event: string, listener: (e: MediaQueryListEvent) => void) => {
      listeners.push(listener);
    }),
    removeEventListener: vi.fn((event: string, listener: (e: MediaQueryListEvent) => void) => {
      const index = listeners.indexOf(listener);
      if (index !== -1) listeners.splice(index, 1);
    }),
    dispatchEvent: (matches: boolean) => {
      // Simular a mudança no matchMedia
      const event = { matches } as MediaQueryListEvent;
      listeners.forEach(listener => listener(event));
    }
  };
};

describe('ThemeContext', () => {
  let originalDocumentElementSetter: any;
  let matchMediaMock: ReturnType<typeof createMatchMediaMock>;
  
  beforeEach(() => {
    // Setup mocks
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
    
    // Mock para document.documentElement.setAttribute
    originalDocumentElementSetter = vi.spyOn(document.documentElement, 'setAttribute').mockImplementation(vi.fn());
    
    // Limpar o mock antes de cada teste
    localStorageMock.clear();
    vi.clearAllMocks();
  });
  
  afterEach(() => {
    vi.restoreAllMocks();
  });
  
  test('deve inicializar com o tema padrão light quando não houver preferência', () => {
    // Mock para preferência do sistema (sem preferência dark)
    matchMediaMock = createMatchMediaMock(false);
    Object.defineProperty(window, 'matchMedia', {
      value: vi.fn().mockReturnValue(matchMediaMock)
    });
    
    const TestComponent = () => {
      const { theme } = useTheme();
      return <div data-testid="theme-value">{theme}</div>;
    };
    
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    
    expect(screen.getByTestId('theme-value').textContent).toBe('light');
  });
  
  test('deve inicializar com o tema dark quando for a preferência do sistema', () => {
    // Mock para preferência do sistema (com preferência dark)
    matchMediaMock = createMatchMediaMock(true);
    Object.defineProperty(window, 'matchMedia', {
      value: vi.fn().mockReturnValue(matchMediaMock)
    });
    
    const TestComponent = () => {
      const { theme } = useTheme();
      return <div data-testid="theme-value">{theme}</div>;
    };
    
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    
    expect(screen.getByTestId('theme-value').textContent).toBe('dark');
  });
  
  test('deve inicializar com o tema do localStorage quando disponível', () => {
    // Mock para preferência do localStorage
    localStorageMock.getItem.mockReturnValue('dark');
    
    // Mock para preferência do sistema (que deve ser ignorada)
    matchMediaMock = createMatchMediaMock(false);
    Object.defineProperty(window, 'matchMedia', {
      value: vi.fn().mockReturnValue(matchMediaMock)
    });
    
    const TestComponent = () => {
      const { theme } = useTheme();
      return <div data-testid="theme-value">{theme}</div>;
    };
    
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    
    expect(screen.getByTestId('theme-value').textContent).toBe('dark');
  });
  
  test('deve priorizar o initialTheme quando fornecido como prop', () => {
    // Mock para preferência do localStorage (que deve ser ignorada)
    localStorageMock.getItem.mockReturnValue('dark');
    
    // Mock para preferência do sistema (que deve ser ignorada)
    matchMediaMock = createMatchMediaMock(true);
    Object.defineProperty(window, 'matchMedia', {
      value: vi.fn().mockReturnValue(matchMediaMock)
    });
    
    const TestComponent = () => {
      const { theme } = useTheme();
      return <div data-testid="theme-value">{theme}</div>;
    };
    
    render(
      <ThemeProvider initialTheme="light">
        <TestComponent />
      </ThemeProvider>
    );
    
    expect(screen.getByTestId('theme-value').textContent).toBe('light');
  });
  
  test('deve alternar entre temas ao chamar toggleTheme', () => {
    // Mock para matchMedia
    matchMediaMock = createMatchMediaMock(false);
    Object.defineProperty(window, 'matchMedia', {
      value: vi.fn().mockReturnValue(matchMediaMock)
    });
    
    const TestComponent = () => {
      const { theme, toggleTheme } = useTheme();
      return (
        <div>
          <div data-testid="theme-value">{theme}</div>
          <button onClick={toggleTheme}>Toggle</button>
        </div>
      );
    };
    
    render(
      <ThemeProvider initialTheme="light">
        <TestComponent />
      </ThemeProvider>
    );
    
    // Estado inicial
    expect(screen.getByTestId('theme-value').textContent).toBe('light');
    
    // Alternar para dark
    fireEvent.click(screen.getByText('Toggle'));
    expect(screen.getByTestId('theme-value').textContent).toBe('dark');
    
    // Alternar para light novamente
    fireEvent.click(screen.getByText('Toggle'));
    expect(screen.getByTestId('theme-value').textContent).toBe('light');
  });
  
  test('deve fornecer o valor correto para isDark', () => {
    // Mock para matchMedia
    matchMediaMock = createMatchMediaMock(false);
    Object.defineProperty(window, 'matchMedia', {
      value: vi.fn().mockReturnValue(matchMediaMock)
    });
    
    const TestComponent = () => {
      const { isDark, toggleTheme } = useTheme();
      return (
        <div>
          <div data-testid="is-dark-value">{isDark ? 'true' : 'false'}</div>
          <button onClick={toggleTheme}>Toggle</button>
        </div>
      );
    };
    
    render(
      <ThemeProvider initialTheme="light">
        <TestComponent />
      </ThemeProvider>
    );
    
    // Light theme, isDark should be false
    expect(screen.getByTestId('is-dark-value').textContent).toBe('false');
    
    // Toggle to dark, isDark should be true
    fireEvent.click(screen.getByText('Toggle'));
    expect(screen.getByTestId('is-dark-value').textContent).toBe('true');
  });
  
  test('deve atualizar o atributo data-theme no documentElement', () => {
    // Mock para matchMedia
    matchMediaMock = createMatchMediaMock(false);
    Object.defineProperty(window, 'matchMedia', {
      value: vi.fn().mockReturnValue(matchMediaMock)
    });
    
    const TestComponent = () => {
      const { toggleTheme } = useTheme();
      return <button onClick={toggleTheme}>Toggle</button>;
    };
    
    render(
      <ThemeProvider initialTheme="light">
        <TestComponent />
      </ThemeProvider>
    );
    
    // Verificar que o atributo foi definido inicialmente para light
    expect(originalDocumentElementSetter).toHaveBeenCalledWith('data-theme', 'light');
    
    // Verificar após o toggle
    fireEvent.click(screen.getByText('Toggle'));
    expect(originalDocumentElementSetter).toHaveBeenCalledWith('data-theme', 'dark');
  });
  
  test('deve salvar o tema no localStorage', () => {
    // Mock para matchMedia
    matchMediaMock = createMatchMediaMock(false);
    Object.defineProperty(window, 'matchMedia', {
      value: vi.fn().mockReturnValue(matchMediaMock)
    });
    
    const TestComponent = () => {
      const { toggleTheme } = useTheme();
      return <button onClick={toggleTheme}>Toggle</button>;
    };
    
    render(
      <ThemeProvider initialTheme="light">
        <TestComponent />
      </ThemeProvider>
    );
    
    // Verificar o tema inicial salvo
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'light');
    
    // Toggle e verificar que foi salvo
    fireEvent.click(screen.getByText('Toggle'));
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark');
  });
  
  test('deve responder a mudanças na preferência do sistema', async () => {
    // Mock para matchMedia inicialmente como light
    matchMediaMock = createMatchMediaMock(false);
    Object.defineProperty(window, 'matchMedia', {
      value: vi.fn().mockReturnValue(matchMediaMock)
    });
    
    const TestComponent = () => {
      const { theme } = useTheme();
      return <div data-testid="theme-value">{theme}</div>;
    };
    
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    
    // Estado inicial
    expect(screen.getByTestId('theme-value').textContent).toBe('light');
    
    // Simular mudança na preferência do sistema para dark usando act
    await act(async () => {
      matchMediaMock.dispatchEvent(true);
    });
    
    // Verificar que o tema mudou para dark
    expect(screen.getByTestId('theme-value').textContent).toBe('dark');
  });
}); 