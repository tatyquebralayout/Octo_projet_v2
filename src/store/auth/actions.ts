/**
 * Ações para o módulo de autenticação
 */
import { 
  AuthActionType, 
  LoginRequestAction, 
  LoginSuccessAction, 
  LogoutAction, 
  RefreshTokenAction, 
  UpdateUserAction,
  RegisterRequestAction,
  RegisterSuccessAction
} from './types';
import { User, AuthToken } from '../../services/api/types';
import { CommonActionType } from '../types';

/**
 * Ação para iniciar o processo de login
 */
export const loginRequest = (): LoginRequestAction => ({
  type: AuthActionType.LOGIN_REQUEST
});

/**
 * Ação para quando o login é bem-sucedido
 */
export const loginSuccess = (
  user: User, 
  accessToken: string, 
  refreshToken: string, 
  expiresIn: number
): LoginSuccessAction => ({
  type: AuthActionType.LOGIN_SUCCESS,
  payload: { user, accessToken, refreshToken, expiresIn }
});

/**
 * Ação para logout do usuário
 */
export const logout = (): LogoutAction => ({
  type: AuthActionType.LOGOUT
});

/**
 * Ação para atualizar o token de acesso
 */
export const refreshToken = (accessToken: string, expiresIn: number): RefreshTokenAction => ({
  type: AuthActionType.REFRESH_TOKEN,
  payload: { accessToken, expiresIn }
});

/**
 * Ação para atualizar os dados do usuário
 */
export const updateUser = (user: User): UpdateUserAction => ({
  type: AuthActionType.UPDATE_USER,
  payload: user
});

/**
 * Ação para iniciar o processo de registro
 */
export const registerRequest = (): RegisterRequestAction => ({
  type: AuthActionType.REGISTER_REQUEST
});

/**
 * Ação para quando o registro é bem-sucedido
 */
export const registerSuccess = (
  user: User, 
  accessToken: string, 
  refreshToken: string, 
  expiresIn: number
): RegisterSuccessAction => ({
  type: AuthActionType.LOGIN_SUCCESS,
  payload: { user, accessToken, refreshToken, expiresIn }
});

/**
 * Ação para definir um erro no estado de autenticação
 */
export const setAuthError = (error: string) => ({
  type: CommonActionType.SET_ERROR as CommonActionType.SET_ERROR,
  payload: error
}); 