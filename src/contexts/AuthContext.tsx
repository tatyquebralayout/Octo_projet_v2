/**
 * Contexto de Autenticação para o projeto OCTO
 * Gerencia o estado global de autenticação da aplicação
 */
import React, { createContext, useReducer, useEffect } from 'react';
import { User, ApiError } from '../services/api/types';
import { authService } from '../services/api';

// Tipos de ações do reducer
export enum AuthActionType {
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGOUT = 'LOGOUT',
  AUTH_ERROR = 'AUTH_ERROR',
  CLEAR_ERROR = 'CLEAR_ERROR',
  LOADING = 'LOADING',
  UPDATE_USER = 'UPDATE_USER',
}

// Interface do estado de autenticação
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: ApiError | null;
  initialized: boolean;
}

// Interfaces para as ações do reducer
interface AuthLoginSuccessAction {
  type: AuthActionType.LOGIN_SUCCESS;
  payload: User;
}

interface AuthLogoutAction {
  type: AuthActionType.LOGOUT;
}

interface AuthErrorAction {
  type: AuthActionType.AUTH_ERROR;
  payload: ApiError;
}

interface AuthClearErrorAction {
  type: AuthActionType.CLEAR_ERROR;
}

interface AuthLoadingAction {
  type: AuthActionType.LOADING;
  payload: boolean;
}

interface AuthUpdateUserAction {
  type: AuthActionType.UPDATE_USER;
  payload: User;
}

// Tipo da união de ações
export type AuthAction =
  | AuthLoginSuccessAction
  | AuthLogoutAction
  | AuthErrorAction
  | AuthClearErrorAction
  | AuthLoadingAction
  | AuthUpdateUserAction;

// Interface do contexto de autenticação
export interface AuthContextType {
  authState: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}

// Estado inicial do contexto
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: true,
  error: null,
  initialized: false,
};

// Criação do contexto
export const AuthContext = createContext<AuthContextType | null>(null);

// Reducer para gerenciar as ações de autenticação
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case AuthActionType.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
        error: null,
        initialized: true,
      };
    case AuthActionType.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null,
        initialized: true,
      };
    case AuthActionType.AUTH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        initialized: true,
      };
    case AuthActionType.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    case AuthActionType.LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case AuthActionType.UPDATE_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

// Provider do contexto
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  // Efeito para verificar se o usuário está autenticado ao iniciar a aplicação
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        dispatch({ type: AuthActionType.LOADING, payload: true });
        
        // Verificar se existe token armazenado
        if (authService.isAuthenticated()) {
          try {
            // Obter dados do usuário atual
            const response = await authService.getProfile();
            
            if (response.success && response.data) {
              dispatch({
                type: AuthActionType.LOGIN_SUCCESS,
                payload: response.data,
              });
            } else {
              // Se o token existir mas não conseguir obter os dados do usuário
              authService.logout();
              dispatch({ type: AuthActionType.LOGOUT });
            }
          } catch (error) {
            // Se ocorrer um erro ao validar o token, faça logout
            authService.logout();
            dispatch({ type: AuthActionType.LOGOUT });
          }
        } else {
          dispatch({ type: AuthActionType.LOGOUT });
        }
      } catch (error) {
        console.error('Erro ao inicializar autenticação:', error);
        dispatch({ type: AuthActionType.LOGOUT });
      } finally {
        dispatch({ type: AuthActionType.LOADING, payload: false });
      }
    };

    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ authState, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}; 