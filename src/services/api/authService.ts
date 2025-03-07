/**
 * Serviço de autenticação para o OCTO
 * Fornece métodos para login, logout e gerenciamento de sessão
 */
import { apiService } from './apiService';
import { 
  AuthRequest, 
  AuthResponse, 
  User,
  ApiResponse,
  AuthToken
} from './types';
import { AUTH_CONFIG, ENDPOINTS } from './config';

class AuthService {
  /**
   * Realiza o login do usuário
   * @param credentials Dados de login (email/senha)
   * @returns Resposta com dados do usuário e token
   */
  async login(credentials: AuthRequest): Promise<ApiResponse<AuthResponse>> {
    try {
      const response = await apiService.post<AuthResponse>(
        ENDPOINTS.AUTH.LOGIN, 
        credentials
      );

      // Salva os dados de autenticação no localStorage
      if (response.data) {
        const { user, token } = response.data;
        this.saveAuthData(user, token);
      }

      return response;
    } catch (error) {
      this.clearAuthData();
      throw error;
    }
  }

  /**
   * Realiza o logout do usuário
   * @returns Resposta de confirmação
   */
  async logout(): Promise<ApiResponse<null>> {
    try {
      const response = await apiService.post<null>(ENDPOINTS.AUTH.LOGOUT, {});
      this.clearAuthData();
      return response;
    } catch (error) {
      this.clearAuthData();
      throw error;
    }
  }

  /**
   * Atualiza o token de acesso usando o refresh token
   * @returns Novo token de acesso
   */
  async refreshToken(): Promise<ApiResponse<{ accessToken: string, expiresIn: number }>> {
    try {
      const refreshToken = localStorage.getItem(AUTH_CONFIG.REFRESH_TOKEN_KEY);
      
      if (!refreshToken) {
        throw new Error('Refresh token não disponível');
      }

      const response = await apiService.post<{ accessToken: string, expiresIn: number }>(
        ENDPOINTS.AUTH.REFRESH,
        { refreshToken }
      );

      if (response.data) {
        localStorage.setItem(AUTH_CONFIG.TOKEN_KEY, response.data.accessToken);
      }

      return response;
    } catch (error) {
      this.clearAuthData();
      throw error;
    }
  }

  /**
   * Obtém o perfil do usuário atual
   * @returns Dados do usuário
   */
  async getProfile(): Promise<ApiResponse<User>> {
    return apiService.get<User>(ENDPOINTS.USERS.PROFILE);
  }

  /**
   * Verifica se o usuário está autenticado
   * @returns true se o usuário estiver autenticado
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  /**
   * Obtém o token de autenticação
   * @returns Token ou null se não existir
   */
  getToken(): string | null {
    return localStorage.getItem(AUTH_CONFIG.TOKEN_KEY);
  }

  /**
   * Obtém o usuário autenticado
   * @returns Dados do usuário ou null se não estiver autenticado
   */
  getUser(): User | null {
    const userStr = localStorage.getItem(AUTH_CONFIG.USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }

  /**
   * Salva os dados de autenticação no localStorage
   * @param user Dados do usuário
   * @param token Dados do token
   */
  private saveAuthData(user: User, token: AuthToken): void {
    localStorage.setItem(AUTH_CONFIG.TOKEN_KEY, token.accessToken);
    if (token.refreshToken) {
      localStorage.setItem(AUTH_CONFIG.REFRESH_TOKEN_KEY, token.refreshToken);
    }
    localStorage.setItem(AUTH_CONFIG.USER_KEY, JSON.stringify(user));
  }

  /**
   * Limpa os dados de autenticação do localStorage
   */
  private clearAuthData(): void {
    localStorage.removeItem(AUTH_CONFIG.TOKEN_KEY);
    localStorage.removeItem(AUTH_CONFIG.REFRESH_TOKEN_KEY);
    localStorage.removeItem(AUTH_CONFIG.USER_KEY);
  }
}

// Exporta uma instância única do serviço
export const authService = new AuthService(); 