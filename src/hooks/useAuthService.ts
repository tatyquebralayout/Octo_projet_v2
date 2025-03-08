/**
 * Hook para integrar o serviço de autenticação com o estado
 */
import { useState, useCallback, useEffect } from 'react';
import { useAuth, useAuthActions } from '../store/auth';
import { authService } from '../services/api';
import { User } from '../services/api/types';
import { LoadingStatus } from '../store/types';

/**
 * Hook que integra o serviço de API de autenticação com o estado global
 */
export const useAuthService = () => {
  const auth = useAuth();
  const authActions = useAuthActions();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Limpa o erro quando o estado de autenticação muda
  useEffect(() => {
    if (errorMessage && auth.isAuthenticated) {
      setErrorMessage(null);
    }
  }, [auth.isAuthenticated, errorMessage]);

  // Verifica se o token precisa ser atualizado
  useEffect(() => {
    const checkTokenExpiration = async () => {
      // Se não estiver autenticado ou não tiver token de atualização, não faz nada
      if (!auth.isAuthenticated || !auth.refreshToken || !auth.expiresAt) {
        return;
      }

      // Calcula o tempo até a expiração (em milissegundos)
      const now = Date.now();
      const expiresAt = auth.expiresAt;
      const timeUntilExpire = expiresAt - now;

      // Se o token expira em menos de 5 minutos, atualiza
      if (timeUntilExpire < 5 * 60 * 1000) {
        try {
          const response = await authService.refreshToken(auth.refreshToken);
          if (response.success && response.data) {
            const { accessToken, expiresIn } = response.data;
            // Calcula o novo tempo de expiração
            const newExpiresAt = Date.now() + expiresIn * 1000;
            authActions.updateToken(accessToken, newExpiresAt);
          }
        } catch (error) {
          console.error('Erro ao atualizar token:', error);
          // Se falhar, faz logout
          authActions.logout();
        }
      }
    };

    // Verifica a expiração do token a cada minuto
    const interval = setInterval(checkTokenExpiration, 60 * 1000);
    
    // Verifica imediatamente ao montar o componente
    checkTokenExpiration();

    return () => clearInterval(interval);
  }, [auth.isAuthenticated, auth.refreshToken, auth.expiresAt, authActions]);

  /**
   * Realiza login do usuário
   */
  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setErrorMessage(null);
    
    try {
      // Dispara a ação de início de login
      authActions.login(email, password);
      
      const response = await authService.login(email, password);
      
      if (response.success && response.data) {
        const { user, token } = response.data;
        const expiresAt = Date.now() + (token.expiresIn || 3600) * 1000;
        
        authActions.loginComplete(
          user, 
          token.accessToken, 
          token.refreshToken || '', 
          token.expiresIn || 3600
        );
        
        return user;
      } else {
        throw new Error(response.message || 'Falha na autenticação');
      }
    } catch (error: any) {
      const message = error.message || 'Erro ao realizar login';
      setErrorMessage(message);
      authActions.setError(message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [authActions]);

  /**
   * Realiza registro de um novo usuário
   */
  const register = useCallback(async (userData: Partial<User>, password: string) => {
    setLoading(true);
    setErrorMessage(null);
    
    try {
      // Dispara a ação de início de registro
      authActions.register();
      
      // Chama o serviço de API para registro
      const response = await authService.register(userData, password);
      
      if (response.success && response.data) {
        const { user, token } = response.data;
        const expiresAt = Date.now() + (token.expiresIn || 3600) * 1000;
        
        authActions.registerComplete(
          user, 
          token.accessToken, 
          token.refreshToken || '', 
          token.expiresIn || 3600
        );
        
        return user;
      } else {
        throw new Error(response.message || 'Falha no registro');
      }
    } catch (error: any) {
      const message = error.message || 'Erro ao realizar registro';
      setErrorMessage(message);
      authActions.setError(message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [authActions]);

  /**
   * Realiza logout do usuário
   */
  const logout = useCallback(async () => {
    setLoading(true);
    
    try {
      // Se tiver refresh token, tenta invalidar no servidor
      if (auth.refreshToken) {
        await authService.logout(auth.refreshToken);
      }
    } catch (error) {
      console.error('Erro ao realizar logout no servidor:', error);
    } finally {
      // Independente do resultado da API, faz logout local
      authActions.logout();
      setLoading(false);
    }
  }, [auth.refreshToken, authActions]);

  // Retorna os dados e funções do hook
  const authData = {
    isAuthenticated: auth.isAuthenticated,
    user: auth.user,
    status: auth.status,
    accessToken: auth.accessToken,
    refreshToken: auth.refreshToken,
    expiresAt: auth.expiresAt,
    initialized: auth.initialized,
    isLoading: auth.status === LoadingStatus.LOADING || loading,
    error: errorMessage || auth.error
  };

  return {
    ...authData,
    login,
    register,
    logout
  };
};

export default useAuthService; 