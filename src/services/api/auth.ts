/**
 * Serviço de API para autenticação
 */
import axios from 'axios';
import { 
  AuthRequest, 
  AuthResponse, 
  ApiResponse, 
  User, 
  ApiError 
} from './types';

// URL base da API (deve ser configurada via variáveis de ambiente)
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

/**
 * Realiza login do usuário
 * @param email Email do usuário
 * @param password Senha do usuário
 * @returns Resposta com dados do usuário e token
 */
export const login = async (email: string, password: string): Promise<ApiResponse<AuthResponse>> => {
  try {
    const response = await axios.post<ApiResponse<AuthResponse>>(`${API_URL}/auth/login`, {
      email,
      password
    });
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data as ApiError;
    }
    throw {
      code: 'CONNECTION_ERROR',
      message: 'Erro ao conectar com o servidor',
      status: 500,
      errors: []
    } as ApiError;
  }
};

/**
 * Realiza registro de um novo usuário
 * @param userData Dados do usuário
 * @param password Senha do usuário
 * @returns Resposta com dados do usuário e token
 */
export const register = async (userData: Partial<User>, password: string): Promise<ApiResponse<AuthResponse>> => {
  try {
    const response = await axios.post<ApiResponse<AuthResponse>>(`${API_URL}/auth/register`, {
      ...userData,
      password
    });
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data as ApiError;
    }
    throw {
      code: 'CONNECTION_ERROR',
      message: 'Erro ao conectar com o servidor',
      status: 500,
      errors: []
    } as ApiError;
  }
};

/**
 * Atualiza o token de acesso usando o refresh token
 * @param refreshToken Token de atualização
 * @returns Novo token de acesso e tempo de expiração
 */
export const refreshToken = async (refreshToken: string): Promise<ApiResponse<{ accessToken: string, expiresIn: number }>> => {
  try {
    const response = await axios.post<ApiResponse<{ accessToken: string, expiresIn: number }>>(`${API_URL}/auth/refresh`, {
      refreshToken
    });
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data as ApiError;
    }
    throw {
      code: 'TOKEN_REFRESH_ERROR',
      message: 'Erro ao atualizar token',
      status: 500,
      errors: []
    } as ApiError;
  }
};

/**
 * Realiza logout do usuário (invalidando tokens no servidor)
 * @param refreshToken Token de atualização a ser invalidado
 */
export const logout = async (refreshToken: string): Promise<void> => {
  try {
    await axios.post(`${API_URL}/auth/logout`, {
      refreshToken
    });
  } catch (error) {
    console.error('Erro ao realizar logout no servidor:', error);
    // Não lançamos erro aqui, pois o logout local ainda deve ocorrer
  }
}; 