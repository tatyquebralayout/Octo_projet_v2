/**
 * Contexto para o módulo de autenticação
 */
import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import { authReducer, initialAuthState } from './reducer';
import { AuthState, AuthAction } from './types';
import { usePersist } from '../utils/usePersist';

// Interface do contexto de autenticação
interface AuthContextType {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}

// Criação do contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Opções de persistência
const persistOptions = {
  key: 'auth',
  whitelist: ['isAuthenticated', 'user', 'accessToken', 'refreshToken', 'expiresAt'] as Array<keyof AuthState>,
  version: 1,
};

// Provider do contexto
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  // Persistir estado relevante no localStorage
  usePersist(persistOptions, state, dispatch);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar o contexto de autenticação
export const useAuthStore = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuthStore deve ser usado dentro de um AuthProvider');
  }
  
  return context;
}; 