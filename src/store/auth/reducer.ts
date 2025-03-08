/**
 * Reducer para o módulo de autenticação
 */
import { AuthState, AuthAction, AuthActionType } from './types';
import { CommonActionType, LoadingStatus, PersistenceActionType, setLoading, setError } from '../types';

/**
 * Estado inicial para autenticação
 */
export const initialAuthState: AuthState = {
  isAuthenticated: false,
  user: null,
  status: LoadingStatus.IDLE,
  error: null,
  initialized: false,
  accessToken: null,
  refreshToken: null,
  expiresAt: null,
  lastUpdated: null,
};

/**
 * Reducer para gerenciar o estado de autenticação
 */
export function authReducer(state = initialAuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case AuthActionType.LOGIN_REQUEST:
    case AuthActionType.REGISTER_REQUEST:
      return setLoading(state);

    case AuthActionType.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        expiresAt: Date.now() + action.payload.expiresIn * 1000,
        status: LoadingStatus.SUCCESS,
        error: null,
        initialized: true,
        lastUpdated: Date.now(),
      };

    case AuthActionType.LOGOUT:
      return {
        ...initialAuthState,
        initialized: true,
        status: LoadingStatus.IDLE,
        lastUpdated: Date.now(),
      };

    case AuthActionType.REFRESH_TOKEN:
      return {
        ...state,
        accessToken: action.payload.accessToken,
        expiresAt: Date.now() + action.payload.expiresIn * 1000,
        lastUpdated: Date.now(),
      };

    case AuthActionType.UPDATE_USER:
      return {
        ...state,
        user: action.payload,
        lastUpdated: Date.now(),
      };

    case CommonActionType.SET_ERROR:
      return setError(state, action.payload);

    case CommonActionType.RESET:
      return initialAuthState;

    case PersistenceActionType.HYDRATE:
      return {
        ...state,
        ...action.payload,
        initialized: true,
      };

    default:
      return state;
  }
} 