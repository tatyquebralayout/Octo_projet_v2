/**
 * Hooks para facilitar o uso do contexto de autenticação
 */
import { useCallback } from 'react';
import { useAuthStore } from './context';
import { 
  loginRequest, 
  loginSuccess, 
  logout as logoutAction, 
  refreshToken as refreshTokenAction,
  updateUser as updateUserAction,
  registerRequest,
  registerSuccess,
  setAuthError
} from './actions';
import { User } from '../../services/api/types';
import { LoadingStatus } from '../types';

/**
 * Hook para obter o estado de autenticação
 */
export const useAuth = () => {
  const { state } = useAuthStore();
  
  return {
    isAuthenticated: state.isAuthenticated,
    user: state.user,
    status: state.status,
    error: state.error,
    accessToken: state.accessToken,
    refreshToken: state.refreshToken,
    expiresAt: state.expiresAt,
    initialized: state.initialized,
    isLoading: state.status === LoadingStatus.LOADING
  };
};

/**
 * Hook para ações de autenticação
 */
export const useAuthActions = () => {
  const { dispatch } = useAuthStore();
  
  const login = useCallback((email: string, password: string) => {
    dispatch(loginRequest());
    // Nota: A lógica real de autenticação será implementada no serviço de API
  }, [dispatch]);
  
  const loginComplete = useCallback((
    user: User, 
    accessToken: string, 
    refreshToken: string, 
    expiresIn: number
  ) => {
    dispatch(loginSuccess(user, accessToken, refreshToken, expiresIn));
  }, [dispatch]);
  
  const logout = useCallback(() => {
    dispatch(logoutAction());
  }, [dispatch]);
  
  const updateToken = useCallback((accessToken: string, expiresIn: number) => {
    dispatch(refreshTokenAction(accessToken, expiresIn));
  }, [dispatch]);
  
  const updateUser = useCallback((user: User) => {
    dispatch(updateUserAction(user));
  }, [dispatch]);
  
  const register = useCallback(() => {
    dispatch(registerRequest());
    // Nota: A lógica real de registro será implementada no serviço de API
  }, [dispatch]);
  
  const registerComplete = useCallback((
    user: User, 
    accessToken: string, 
    refreshToken: string, 
    expiresIn: number
  ) => {
    dispatch(registerSuccess(user, accessToken, refreshToken, expiresIn));
  }, [dispatch]);
  
  const setError = useCallback((error: string) => {
    dispatch(setAuthError(error));
  }, [dispatch]);
  
  return {
    login,
    loginComplete,
    logout,
    updateToken,
    updateUser,
    register,
    registerComplete,
    setError
  };
}; 