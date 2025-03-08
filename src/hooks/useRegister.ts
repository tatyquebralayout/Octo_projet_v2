/**
 * Hook useRegister
 * Gerencia o fluxo de registro de novos usuários
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiError } from '../services/api/types';
import { apiService } from '../services/api';
import { useAuth } from './useAuth';
import { AuthActionType } from '../contexts/AuthContext';
import { ENDPOINTS } from '../services/api/config';

/**
 * Interface para dados de registro de usuário
 */
export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  role?: string;
}

/**
 * Interface para o retorno do hook useRegister
 */
interface UseRegisterReturn {
  register: (data: RegisterData) => Promise<void>;
  isLoading: boolean;
  error: ApiError | null;
  clearError: () => void;
}

/**
 * Hook personalizado para gerenciar o registro de novos usuários
 * @param redirectTo - Caminho para redirecionar após o registro bem-sucedido
 * @returns Funções e estado relacionados ao registro
 */
export const useRegister = (redirectTo: string = '/login'): UseRegisterReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);
  const { dispatch } = useAuth();
  const navigate = useNavigate();

  /**
   * Registra um novo usuário
   * @param data - Dados do usuário para registro
   */
  const register = async (data: RegisterData): Promise<void> => {
    // Validação básica
    if (data.password !== data.confirmPassword) {
      const passwordError: ApiError = {
        code: 'validation_error',
        message: 'As senhas não coincidem',
        status: 400,
        timestamp: new Date().toISOString(),
      };
      
      setError(passwordError);
      return;
    }

    // Remove o campo confirmPassword antes de enviar para a API
    const { confirmPassword, ...registerData } = data;

    try {
      setIsLoading(true);
      setError(null);
      
      // Atualiza o estado global para indicar carregamento
      dispatch({ type: AuthActionType.LOADING, payload: true });
      
      // Chama o serviço de registro
      const response = await apiService.post(
        ENDPOINTS.AUTH.REGISTER,
        registerData
      );
      
      if (response.success) {
        // Redireciona para a página de login ou outra página especificada
        navigate(redirectTo);
      } else {
        throw new Error('Falha no registro');
      }
    } catch (err) {
      // Trata o erro da API ou converte para o formato esperado
      const apiError: ApiError = err instanceof Error 
        ? {
            code: 'register_error',
            message: err.message,
            status: 400,
            timestamp: new Date().toISOString(),
          }
        : err as ApiError;
      
      setError(apiError);
      dispatch({ type: AuthActionType.AUTH_ERROR, payload: apiError });
      console.error('Erro ao registrar usuário:', apiError);
    } finally {
      setIsLoading(false);
      dispatch({ type: AuthActionType.LOADING, payload: false });
    }
  };

  /**
   * Limpa o erro de registro
   */
  const clearError = () => {
    setError(null);
    dispatch({ type: AuthActionType.CLEAR_ERROR });
  };

  return {
    register,
    isLoading,
    error,
    clearError,
  };
}; 