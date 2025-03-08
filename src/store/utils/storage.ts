/**
 * Utilitário para gerenciamento de storage persistente
 * Centraliza operações de leitura/escrita em localStorage
 */

// Namespace da aplicação para prefixo de chaves no localStorage
const APP_PREFIX = 'octo:';

/**
 * Salva um valor no localStorage com prefixo da aplicação
 * @param key Chave para armazenamento
 * @param value Valor a ser armazenado (será serializado para JSON)
 */
export const setStorageItem = <T>(key: string, value: T): void => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(`${APP_PREFIX}${key}`, serializedValue);
  } catch (error) {
    console.error(`Erro ao salvar "${key}" no localStorage:`, error);
  }
};

/**
 * Recupera um valor do localStorage
 * @param key Chave do item
 * @param defaultValue Valor padrão caso a chave não exista
 * @returns Valor armazenado ou valor padrão
 */
export const getStorageItem = <T>(key: string, defaultValue?: T): T | undefined => {
  try {
    const serializedValue = localStorage.getItem(`${APP_PREFIX}${key}`);
    if (serializedValue === null) {
      return defaultValue;
    }
    return JSON.parse(serializedValue) as T;
  } catch (error) {
    console.error(`Erro ao recuperar "${key}" do localStorage:`, error);
    return defaultValue;
  }
};

/**
 * Remove um item do localStorage
 * @param key Chave do item a ser removido
 */
export const removeStorageItem = (key: string): void => {
  try {
    localStorage.removeItem(`${APP_PREFIX}${key}`);
  } catch (error) {
    console.error(`Erro ao remover "${key}" do localStorage:`, error);
  }
};

/**
 * Limpa todos os items com o prefixo da aplicação do localStorage
 */
export const clearStorage = (): void => {
  try {
    Object.keys(localStorage)
      .filter(key => key.startsWith(APP_PREFIX))
      .forEach(key => localStorage.removeItem(key));
  } catch (error) {
    console.error('Erro ao limpar localStorage:', error);
  }
};

/**
 * Verifica se o localStorage está disponível
 * @returns true se disponível, false caso contrário
 */
export const isStorageAvailable = (): boolean => {
  try {
    const testKey = `${APP_PREFIX}test`;
    localStorage.setItem(testKey, 'test');
    const result = localStorage.getItem(testKey) === 'test';
    localStorage.removeItem(testKey);
    return result;
  } catch (e) {
    return false;
  }
}; 