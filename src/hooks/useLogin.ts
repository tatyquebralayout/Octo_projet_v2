/**
 * Hook useLogin
 * Gerencia o fluxo de autenticação de usuários
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthRequest, ApiError } from '../services/api/types';
import { authService } from '../services/api';
import { useAuth } from './useAuth';
import { AuthActionType } from '../contexts/AuthContext';

/**
 * Interface para o retorno do hook useLogin
 */
interface UseLoginReturn {
  login: (credentials: AuthRequest) => Promise<void>;
  isLoading: boolean;
  error: ApiError | null;
  clearError: () => void;
}

/**
 * Hook personalizado para gerenciar o login de usuários
 * @param redirectTo - Caminho para redirecionar após o login bem-sucedido
 * @returns Funções e estado relacionados ao login
 */
export const useLogin = (redirectTo: string = '/'): UseLoginReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);
  const { dispatch } = useAuth();
  const navigate = useNavigate();

  /**
   * Realiza o login do usuário
   * @param credentials - Credenciais do usuário (email e senha)
   */
  const login = async (credentials: AuthRequest): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      // Atualiza o estado global para indicar carregamento
      dispatch({ type: AuthActionType.LOADING, payload: true });
      
      // Chama o serviço de autenticação
      const response = await authService.login(credentials);
      
      if (response.success && response.data) {
        // Atualiza o estado global com os dados do usuário
        dispatch({
          type: AuthActionType.LOGIN_SUCCESS,
          payload: response.data.user,
        });
        
        // Redireciona para a página principal ou página especificada
        navigate(redirectTo);
      } else {
        throw new Error('Falha na autenticação');
      }
    } catch (err) {
      // Trata o erro da API ou converte para o formato esperado
      const apiError: ApiError = err instanceof Error 
        ? {
            code: 'auth_error',
            message: err.message,
            status: 401,
            timestamp: new Date().toISOString(),
          }
        : err as ApiError;
      
      setError(apiError);
      dispatch({ type: AuthActionType.AUTH_ERROR, payload: apiError });
      console.error('Erro ao fazer login:', apiError);
    } finally {
      setIsLoading(false);
      dispatch({ type: AuthActionType.LOADING, payload: false });
    }
  };

  /**
   * Limpa o erro de autenticação
   */
  const clearError = () => {
    setError(null);
    dispatch({ type: AuthActionType.CLEAR_ERROR });
  };

  return {
    login,
    isLoading,
    error,
    clearError,
  };
}; 