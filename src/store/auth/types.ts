/**
 * Tipos para o módulo de autenticação
 */
import { User } from '../../services/api/types';
import { BaseState, CommonActionType, PersistenceActionType } from '../types';

/**
 * Enum com os tipos de ação específicas para autenticação
 */
export enum AuthActionType {
  LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS',
  LOGIN_REQUEST = 'auth/LOGIN_REQUEST',
  LOGOUT = 'auth/LOGOUT',
  REFRESH_TOKEN = 'auth/REFRESH_TOKEN',
  UPDATE_USER = 'auth/UPDATE_USER',
  REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS',
  REGISTER_REQUEST = 'auth/REGISTER_REQUEST',
}

/**
 * Interface do estado de autenticação
 */
export interface AuthState extends BaseState {
  isAuthenticated: boolean;
  user: User | null;
  initialized: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  expiresAt: number | null;
}

/**
 * Interfaces para ações específicas de autenticação
 */
export interface LoginRequestAction {
  type: AuthActionType.LOGIN_REQUEST;
}

export interface LoginSuccessAction {
  type: AuthActionType.LOGIN_SUCCESS;
  payload: {
    user: User;
    accessToken: string;
    refreshToken: string;
    expiresIn: number; // Duração do token em segundos
  };
}

export interface LogoutAction {
  type: AuthActionType.LOGOUT;
}

export interface RefreshTokenAction {
  type: AuthActionType.REFRESH_TOKEN;
  payload: {
    accessToken: string;
    expiresIn: number;
  };
}

export interface UpdateUserAction {
  type: AuthActionType.UPDATE_USER;
  payload: User;
}

export interface RegisterRequestAction {
  type: AuthActionType.REGISTER_REQUEST;
}

export interface RegisterSuccessAction {
  type: AuthActionType.LOGIN_SUCCESS;
  payload: {
    user: User;
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  };
}

export interface HydrateAction {
  type: PersistenceActionType.HYDRATE;
  payload: Partial<AuthState>;
}

/**
 * Union type para todas as ações de autenticação
 */
export type AuthAction =
  | LoginRequestAction
  | LoginSuccessAction
  | LogoutAction
  | RefreshTokenAction
  | UpdateUserAction
  | RegisterRequestAction
  | RegisterSuccessAction
  | HydrateAction
  | { type: CommonActionType.SET_ERROR; payload: string }
  | { type: CommonActionType.RESET }; 