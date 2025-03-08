import { renderHook, act } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { useMenu } from '../../hooks/useMenu';

// Mock para o localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    })
  };
})();

// Mock para o console
const consoleMock = {
  warn: vi.fn()
};

describe('useMenu Hook', () => {
  beforeEach(() => {
    // Setup mocks
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
    Object.defineProperty(console, 'warn', { value: consoleMock.warn });
    
    // Limpar o mock antes de cada teste
    localStorageMock.clear();
    vi.clearAllMocks();
    
    // Mock para Date.now
    vi.spyOn(Date, 'now').mockImplementation(() => 1000);
  });
  
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('deve iniciar com o menu fechado por padrão', () => {
    const { result } = renderHook(() => useMenu());
    expect(result.current.isMenuOpen).toBe(false);
  });

  test('deve abrir o menu ao chamar toggleMenu quando fechado', () => {
    const { result } = renderHook(() => useMenu());
    
    act(() => {
      result.current.toggleMenu();
    });
    
    expect(result.current.isMenuOpen).toBe(true);
  });

  test('deve fechar o menu ao chamar toggleMenu quando aberto', () => {
    const { result } = renderHook(() => useMenu());
    
    // Abrir o menu primeiro
    act(() => {
      result.current.toggleMenu();
    });
    
    expect(result.current.isMenuOpen).toBe(true);
    
    // Agora fechar com toggle
    act(() => {
      result.current.toggleMenu();
    });
    
    expect(result.current.isMenuOpen).toBe(false);
  });

  test('deve fechar o menu ao chamar closeMenu', () => {
    const { result } = renderHook(() => useMenu());
    
    // Abrir o menu primeiro
    act(() => {
      result.current.toggleMenu();
    });
    
    expect(result.current.isMenuOpen).toBe(true);
    
    // Fechar com closeMenu
    act(() => {
      result.current.closeMenu();
    });
    
    expect(result.current.isMenuOpen).toBe(false);
  });

  test('deve salvar o estado do menu no localStorage', () => {
    const { result } = renderHook(() => useMenu());
    
    act(() => {
      result.current.toggleMenu();
    });
    
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'menu_state',
      expect.stringContaining('"isMenuOpen":true')
    );
  });

  test('deve recuperar o estado do menu do localStorage', () => {
    // Simular dados existentes no localStorage
    localStorageMock.setItem('menu_state', JSON.stringify({
      isMenuOpen: true,
      lastUpdated: Date.now() // 1000 pelo mock
    }));
    
    const { result } = renderHook(() => useMenu());
    expect(result.current.isMenuOpen).toBe(true);
  });

  test('deve ignorar o cache expirado', () => {
    // Ajustar o mock de Date.now para simular o tempo atual
    vi.spyOn(Date, 'now').mockImplementation(() => 5000000); // Um tempo muito maior
    
    // Simular dados existentes no localStorage com timestamp antigo
    localStorageMock.setItem('menu_state', JSON.stringify({
      isMenuOpen: true,
      lastUpdated: 1000 // Muito antigo comparado ao "agora" (5000000)
    }));
    
    const { result } = renderHook(() => useMenu());
    expect(result.current.isMenuOpen).toBe(false); // Deve usar o padrão, não o cache
  });

  test('deve lidar com erros ao acessar localStorage', () => {
    // Simular erro no localStorage
    localStorageMock.getItem.mockImplementationOnce(() => {
      throw new Error('localStorage error');
    });
    
    const { result } = renderHook(() => useMenu());
    
    expect(result.current.isMenuOpen).toBe(false);
    expect(consoleMock.warn).toHaveBeenCalledWith(
      'Erro ao recuperar estado do menu:',
      expect.any(Error)
    );
  });
}); 