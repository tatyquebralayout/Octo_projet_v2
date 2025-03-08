/**
 * Hook useAuth
 * Fornece acesso ao contexto de autenticação e funções úteis
 */
import { useContext } from 'react';
import { AuthContext, AuthContextType, AuthState } from '../contexts/AuthContext';

/**
 * Hook personalizado para acessar o contexto de autenticação
 * @returns Contexto de autenticação com estado e funções úteis
 */
export const useAuth = (): AuthContextType & { 
  isAuthenticated: boolean;
  isLoading: boolean;
  user: AuthState['user'];
  error: AuthState['error'];
  isInitialized: boolean;
} => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }

  const { authState, dispatch } = context;

  return {
    authState,
    dispatch,
    isAuthenticated: authState.isAuthenticated,
    isLoading: authState.loading,
    user: authState.user,
    error: authState.error,
    isInitialized: authState.initialized,
  };
}; 