/**
 * Tipos comuns para o sistema de gerenciamento de estado
 */

/**
 * Estados de carregamento de dados
 */
export enum LoadingStatus {
  IDLE = 'idle',
  LOADING = 'loading', 
  SUCCESS = 'success',
  ERROR = 'error'
}

/**
 * Estado base para slices com carregamento e erro
 */
export interface BaseState {
  status: LoadingStatus;
  error: string | null;
  lastUpdated: number | null;
}

/**
 * Ações comuns para os slices
 */
export enum CommonActionType {
  SET_LOADING = 'SET_LOADING',
  SET_ERROR = 'SET_ERROR',
  RESET = 'RESET',
}

/**
 * Tipos de Ação para persistência
 */
export enum PersistenceActionType {
  HYDRATE = 'HYDRATE',
  PERSIST = 'PERSIST',
}

/**
 * Interface para ação de início de carregamento
 */
export interface SetLoadingAction {
  type: CommonActionType.SET_LOADING;
}

/**
 * Interface para ação de erro
 */
export interface SetErrorAction {
  type: CommonActionType.SET_ERROR;
  payload: string;
}

/**
 * Interface para ação de reset
 */
export interface ResetAction {
  type: CommonActionType.RESET;
}

/**
 * Interface para ação de hidratação (carregar do localStorage)
 */
export interface HydrateAction<T> {
  type: PersistenceActionType.HYDRATE;
  payload: T;
}

/**
 * Funções utilitárias para estado
 */

/**
 * Define o estado de carregamento
 */
export const setLoading = <T extends BaseState>(state: T): T => ({
  ...state,
  status: LoadingStatus.LOADING,
  error: null
});

/**
 * Define o estado de erro
 */
export const setError = <T extends BaseState>(state: T, errorMessage: string): T => ({
  ...state,
  status: LoadingStatus.ERROR,
  error: errorMessage
});

/**
 * Define o estado de sucesso
 */
export const setSuccess = <T extends BaseState>(state: T): T => ({
  ...state,
  status: LoadingStatus.SUCCESS,
  error: null,
  lastUpdated: Date.now()
}); 