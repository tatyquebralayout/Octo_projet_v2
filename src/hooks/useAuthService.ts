/**
 * Hook para integrar o serviço de autenticação com o estado
 */
import { useState, useCallback, useEffect, useContext } from 'react';
import { AuthContext, AuthContextType } from '../contexts/AuthContext';
import { authService } from '../services/api';
import { User } from '../services/api/types';
import { LoadingStatus } from '../store/types';

/**
 * Hook que integra o serviço de API de autenticação com o estado global
 */
export const useAuthService = () => {
  const { authState, dispatch } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Limpa o erro quando o estado de autenticação muda
  useEffect(() => {
    if (errorMessage && authState.isAuthenticated) {
      setErrorMessage(null);
    }
  }, [authState.isAuthenticated, errorMessage]);

  // Verifica se o token precisa ser atualizado
  useEffect(() => {
    const checkTokenExpiration = async () => {
      // Se não estiver autenticado ou não tiver token de atualização, não faz nada
      if (!authState.isAuthenticated) {
        return;
      }

      // Não temos o refreshToken e expiresAt no AuthState do contexto, então essa funcionalidade
      // precisaria ser implementada de outra forma
    };

    // Verifica a expiração do token a cada minuto
    const interval = setInterval(checkTokenExpiration, 60 * 1000);

    // Verifica imediatamente ao montar o componente
    checkTokenExpiration();

    return () => clearInterval(interval);
  }, [authState.isAuthenticated]);

  /**
   * Realiza login do usuário
   */
  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setErrorMessage(null);

    try {
      // Indica que está carregando
      dispatch({ type: 'LOADING', payload: true });

      const response = await authService.login(email, password);

      if (response.success && response.data) {
        const { user } = response.data;

        dispatch({ 
          type: 'LOGIN_SUCCESS', 
          payload: user 
        });

        return user;
      } else {
        throw new Error(response.message || 'Falha na autenticação');
      }
    } catch (error: any) {
      const message = error.message || 'Erro ao realizar login';
      setErrorMessage(message);
      dispatch({ 
        type: 'AUTH_ERROR', 
        payload: { message, code: 'AUTH_ERROR' } 
      });
      throw error;
    } finally {
      setLoading(false);
      dispatch({ type: 'LOADING', payload: false });
    }
  }, [dispatch]);

  /**
   * Realiza logout do usuário
   */
  const logout = useCallback(async () => {
    setLoading(true);

    try {
      // Tenta fazer logout no servidor
      await authService.logout();
    } catch (error) {
      console.error('Erro ao realizar logout no servidor:', error);
    } finally {
      // Independente do resultado da API, faz logout local
      dispatch({ type: 'LOGOUT' });
      setLoading(false);
    }
  }, [dispatch]);

  // Retorna os dados e funções do hook
  const authData = {
    isAuthenticated: authState.isAuthenticated,
    user: authState.user,
    isLoading: authState.loading || loading,
    error: errorMessage || authState.error
  };

  return {
    ...authData,
    login,
    logout
  };
};

export default useAuthService; 