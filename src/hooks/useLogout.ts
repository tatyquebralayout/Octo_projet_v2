/**
 * Hook useLogout
 * Gerencia o fluxo de logout de usuários
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiError } from '../services/api/types';
import { authService } from '../services/api';
import { useAuth } from './useAuth';
import { AuthActionType } from '../contexts/AuthContext';

/**
 * Interface para o retorno do hook useLogout
 */
interface UseLogoutReturn {
  logout: () => Promise<void>;
  isLoading: boolean;
  error: ApiError | null;
}

/**
 * Hook personalizado para gerenciar o logout de usuários
 * @param redirectTo - Caminho para redirecionar após o logout bem-sucedido
 * @returns Funções e estado relacionados ao logout
 */
export const useLogout = (redirectTo: string = '/login'): UseLogoutReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);
  const { dispatch } = useAuth();
  const navigate = useNavigate();

  /**
   * Realiza o logout do usuário
   */
  const logout = async (): Promise<void> => {
    try {
      setIsLoading(true);
      
      // Atualiza o estado global para indicar carregamento
      dispatch({ type: AuthActionType.LOADING, payload: true });
      
      // Chama o serviço de logout
      await authService.logout();
      
      // Atualiza o estado global para indicar logout
      dispatch({ type: AuthActionType.LOGOUT });
      
      // Redireciona para a página de login ou outra página especificada
      navigate(redirectTo);
    } catch (err) {
      // Trata o erro da API ou converte para o formato esperado
      const apiError: ApiError = err instanceof Error 
        ? {
            code: 'logout_error',
            message: err.message,
            status: 500,
            timestamp: new Date().toISOString(),
          }
        : err as ApiError;
      
      setError(apiError);
      console.error('Erro ao fazer logout:', apiError);
      
      // Mesmo com erro, limpa o estado de autenticação local
      dispatch({ type: AuthActionType.LOGOUT });
    } finally {
      setIsLoading(false);
      dispatch({ type: AuthActionType.LOADING, payload: false });
    }
  };

  return {
    logout,
    isLoading,
    error,
  };
}; 