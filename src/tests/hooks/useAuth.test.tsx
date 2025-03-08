/**
 * @vitest-environment jsdom
 */

import React from 'react';
import { renderHook } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { useAuth } from '../../hooks/useAuth';
import { AuthContext, AuthState } from '../../contexts/AuthContext';

// Mock inicial para o estado de autenticação
const mockInitialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
  initialized: true
};

// Mock para o AuthContext
const mockDispatch = vi.fn();
const mockAuthContext = {
  authState: mockInitialState,
  dispatch: mockDispatch
};

// Componente wrapper para o provider
const AuthProvider: React.FC<{ 
  children: React.ReactNode, 
  value?: typeof mockAuthContext 
}> = ({ children, value = mockAuthContext }) => (
  <AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>
);

// Wrapper customizado para o renderHook
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
);

describe('useAuth Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('deve fornecer o estado de autenticação', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.user).toBeNull();
    expect(result.current.error).toBeNull();
    expect(result.current.isInitialized).toBe(true);
    expect(result.current.authState).toBe(mockInitialState);
    expect(result.current.dispatch).toBe(mockDispatch);
  });

  test('deve refletir o estado de autenticação atualizado', () => {
    // Estado de autenticação modificado
    const authenticatedState: AuthState = {
      isAuthenticated: true,
      user: { id: '1', name: 'Test User', email: 'test@example.com', role: 'user' },
      loading: false,
      error: null,
      initialized: true
    };
    
    const updatedContext = {
      authState: authenticatedState,
      dispatch: mockDispatch
    };
    
    const customWrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthProvider value={updatedContext}>{children}</AuthProvider>
    );
    
    const { result } = renderHook(() => useAuth(), { wrapper: customWrapper });
    
    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user).toEqual(authenticatedState.user);
  });

  test('deve lançar erro quando usado fora do AuthProvider', () => {
    // Console.error é chamado pelo React quando um erro acontece no render
    const originalConsoleError = console.error;
    console.error = vi.fn();
    
    expect(() => {
      renderHook(() => useAuth());
    }).toThrow('useAuth deve ser usado dentro de um AuthProvider');
    
    // Restaurar console.error original
    console.error = originalConsoleError;
  });

  test('deve refletir estado de carregamento', () => {
    const loadingState: AuthState = {
      ...mockInitialState,
      loading: true
    };
    
    const loadingContext = {
      authState: loadingState,
      dispatch: mockDispatch
    };
    
    const loadingWrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthProvider value={loadingContext}>{children}</AuthProvider>
    );
    
    const { result } = renderHook(() => useAuth(), { wrapper: loadingWrapper });
    
    expect(result.current.isLoading).toBe(true);
  });

  test('deve refletir estado de erro', () => {
    const errorState: AuthState = {
      ...mockInitialState,
      error: 'Credenciais inválidas'
    };
    
    const errorContext = {
      authState: errorState,
      dispatch: mockDispatch
    };
    
    const errorWrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthProvider value={errorContext}>{children}</AuthProvider>
    );
    
    const { result } = renderHook(() => useAuth(), { wrapper: errorWrapper });
    
    expect(result.current.error).toBe('Credenciais inválidas');
  });
}); 