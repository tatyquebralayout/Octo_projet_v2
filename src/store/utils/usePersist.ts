/**
 * Hook para persistência de estado em localStorage
 */
import { useEffect, useRef, useCallback } from 'react';
import { getStorageItem, setStorageItem, isStorageAvailable } from './storage';
import { PersistenceActionType } from '../types';

export interface PersistOptions<T> {
  key: string;
  whitelist?: Array<keyof T>;
  blacklist?: Array<keyof T>;
  version?: number;
}

/**
 * Hook para persistir estado no localStorage e recarregar na inicialização
 * @param options Opções de persistência
 * @param state Estado atual
 * @param dispatch Função para atualizar o estado
 */
export function usePersist<T, A extends { type: string; payload?: any }>(
  options: PersistOptions<T>,
  state: T,
  dispatch: React.Dispatch<A>
): void {
  const { key, whitelist, blacklist, version = 1 } = options;
  const initializedRef = useRef(false);
  const storageAvailable = isStorageAvailable();

  // Filtra o estado para persistir apenas os campos desejados
  const filterState = useCallback((stateToFilter: T): Partial<T> => {
    if (!whitelist && !blacklist) return stateToFilter;

    if (whitelist) {
      return whitelist.reduce((acc, key) => {
        if (key in stateToFilter) {
          acc[key] = stateToFilter[key];
        }
        return acc;
      }, {} as Partial<T>);
    }

    if (blacklist) {
      return Object.entries(stateToFilter).reduce((acc, [k, v]) => {
        if (!blacklist.includes(k as keyof T)) {
          acc[k as keyof T] = v;
        }
        return acc;
      }, {} as Partial<T>);
    }

    return stateToFilter;
  }, [whitelist, blacklist]);

  // Hidrata o estado a partir do localStorage na inicialização
  useEffect(() => {
    if (!storageAvailable || initializedRef.current) return;

    const storedData = getStorageItem<{ data: Partial<T>; version: number }>(key);
    
    if (storedData && storedData.version === version) {
      // Só hidrata se a versão armazenada for compatível
      dispatch({
        type: PersistenceActionType.HYDRATE,
        payload: storedData.data
      } as unknown as A);
    }

    initializedRef.current = true;
  }, [key, dispatch, version, storageAvailable]);

  // Persiste o estado no localStorage quando ele muda
  useEffect(() => {
    if (!initializedRef.current || !storageAvailable) return;

    const filteredState = filterState(state);
    setStorageItem(key, { data: filteredState, version });
  }, [state, key, filterState, version, storageAvailable]);
} 