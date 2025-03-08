/**
 * Gerenciador de armazenamento para o sistema de cache
 * Suporta diferentes estratégias de armazenamento: localStorage, IndexedDB e memória
 */
import { StorageType, CacheItem, CacheMetadata, CacheConfig } from './types';
import { CACHE_CONFIG } from './config';

/**
 * Classe abstrata para implementações de armazenamento
 */
export abstract class StorageAdapter {
  protected config: CacheConfig;

  constructor(config: CacheConfig) {
    this.config = config;
  }

  abstract get<T>(key: string): Promise<CacheItem<T> | null>;
  abstract set<T>(key: string, item: CacheItem<T>): Promise<void>;
  abstract remove(key: string): Promise<void>;
  abstract clear(): Promise<void>;
  abstract keys(): Promise<string[]>;
  abstract has(key: string): Promise<boolean>;
  abstract size(): Promise<number>;
}

/**
 * Adapter para armazenamento em localStorage
 */
export class LocalStorageAdapter extends StorageAdapter {
  private getFullKey(key: string): string {
    return `${this.config.keyPrefix}${key}`;
  }

  async get<T>(key: string): Promise<CacheItem<T> | null> {
    try {
      const fullKey = this.getFullKey(key);
      const serializedData = localStorage.getItem(fullKey);
      
      if (!serializedData) {
        return null;
      }
      
      return JSON.parse(serializedData) as CacheItem<T>;
    } catch (error) {
      console.error(`Erro ao ler do localStorage: ${key}`, error);
      return null;
    }
  }

  async set<T>(key: string, item: CacheItem<T>): Promise<void> {
    try {
      const fullKey = this.getFullKey(key);
      const serializedData = JSON.stringify(item);
      
      // Verificar tamanho aproximado
      const itemSize = serializedData.length * 2; // Aproximação para UTF-16
      
      // Atualizar metadados com tamanho
      item.metadata.size = itemSize;
      
      localStorage.setItem(fullKey, JSON.stringify(item));
    } catch (error) {
      // Verificar se é erro de cota excedida
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        // Tentar liberar espaço removendo itens mais antigos
        this.evictOldestItems();
        // Tentar novamente
        try {
          const fullKey = this.getFullKey(key);
          localStorage.setItem(fullKey, JSON.stringify(item));
        } catch (retryError) {
          console.error(`Erro ao salvar no localStorage mesmo após limpeza: ${key}`, retryError);
        }
      } else {
        console.error(`Erro ao salvar no localStorage: ${key}`, error);
      }
    }
  }

  async remove(key: string): Promise<void> {
    try {
      const fullKey = this.getFullKey(key);
      localStorage.removeItem(fullKey);
    } catch (error) {
      console.error(`Erro ao remover do localStorage: ${key}`, error);
    }
  }

  async clear(): Promise<void> {
    try {
      const allKeys = await this.keys();
      for (const key of allKeys) {
        await this.remove(key);
      }
    } catch (error) {
      console.error('Erro ao limpar localStorage', error);
    }
  }

  async keys(): Promise<string[]> {
    try {
      const allKeys: string[] = [];
      const prefix = this.config.keyPrefix;
      
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(prefix)) {
          allKeys.push(key.substring(prefix.length));
        }
      }
      
      return allKeys;
    } catch (error) {
      console.error('Erro ao listar chaves do localStorage', error);
      return [];
    }
  }

  async has(key: string): Promise<boolean> {
    try {
      const fullKey = this.getFullKey(key);
      return localStorage.getItem(fullKey) !== null;
    } catch (error) {
      console.error(`Erro ao verificar existência no localStorage: ${key}`, error);
      return false;
    }
  }

  async size(): Promise<number> {
    try {
      const allKeys = await this.keys();
      let totalSize = 0;
      
      for (const key of allKeys) {
        const item = await this.get(key);
        if (item && item.metadata.size) {
          totalSize += item.metadata.size;
        }
      }
      
      return totalSize;
    } catch (error) {
      console.error('Erro ao calcular tamanho do localStorage', error);
      return 0;
    }
  }

  /**
   * Remove os itens mais antigos para liberar espaço
   */
  private async evictOldestItems(): Promise<void> {
    try {
      const allKeys = await this.keys();
      const items: Array<{ key: string, timestamp: number }> = [];
      
      // Coletar todos os itens com seus timestamps
      for (const key of allKeys) {
        const item = await this.get(key);
        if (item) {
          items.push({
            key,
            timestamp: item.metadata.timestamp
          });
        }
      }
      
      // Ordenar por timestamp (mais antigos primeiro)
      items.sort((a, b) => a.timestamp - b.timestamp);
      
      // Remover os 20% mais antigos
      const removeCount = Math.ceil(items.length * 0.2);
      const itemsToRemove = items.slice(0, removeCount);
      
      for (const item of itemsToRemove) {
        await this.remove(item.key);
      }
    } catch (error) {
      console.error('Erro ao remover itens antigos do localStorage', error);
    }
  }
}

/**
 * Adapter para armazenamento em memória
 * Útil para testes ou dados voláteis
 */
export class MemoryStorageAdapter extends StorageAdapter {
  private store: Map<string, CacheItem<any>> = new Map();

  async get<T>(key: string): Promise<CacheItem<T> | null> {
    if (this.store.has(key)) {
      return this.store.get(key) as CacheItem<T>;
    }
    return null;
  }

  async set<T>(key: string, item: CacheItem<T>): Promise<void> {
    this.store.set(key, item);
  }

  async remove(key: string): Promise<void> {
    this.store.delete(key);
  }

  async clear(): Promise<void> {
    this.store.clear();
  }

  async keys(): Promise<string[]> {
    return Array.from(this.store.keys());
  }

  async has(key: string): Promise<boolean> {
    return this.store.has(key);
  }

  async size(): Promise<number> {
    let totalSize = 0;
    this.store.forEach(item => {
      totalSize += item.metadata.size || 0;
    });
    return totalSize;
  }
}

/**
 * Adapter para armazenamento em IndexedDB
 * Adequado para grandes volumes de dados
 */
export class IndexedDBAdapter extends StorageAdapter {
  private db: IDBDatabase | null = null;
  private storeName = 'cacheStore';
  private dbReady: Promise<IDBDatabase>;

  constructor(config: CacheConfig) {
    super(config);
    this.dbReady = this.initDatabase();
  }

  private async initDatabase(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      if (this.db) {
        resolve(this.db);
        return;
      }

      const request = indexedDB.open(this.config.dbName, this.config.dbVersion);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        // Verificar se o object store já existe
        if (!db.objectStoreNames.contains(this.storeName)) {
          // Criar object store para o cache
          db.createObjectStore(this.storeName, { keyPath: 'metadata.hash' });
        }
      };

      request.onsuccess = (event) => {
        this.db = (event.target as IDBOpenDBRequest).result;
        resolve(this.db);
      };

      request.onerror = (event) => {
        console.error('Erro ao abrir IndexedDB', (event.target as IDBOpenDBRequest).error);
        reject((event.target as IDBOpenDBRequest).error);
      };
    });
  }

  private async getStore(mode: IDBTransactionMode = 'readonly'): Promise<IDBObjectStore> {
    const db = await this.dbReady;
    const transaction = db.transaction(this.storeName, mode);
    return transaction.objectStore(this.storeName);
  }

  async get<T>(key: string): Promise<CacheItem<T> | null> {
    try {
      const store = await this.getStore();
      return new Promise((resolve, reject) => {
        const request = store.get(key);

        request.onsuccess = () => {
          resolve(request.result || null);
        };

        request.onerror = () => {
          console.error(`Erro ao ler do IndexedDB: ${key}`, request.error);
          reject(request.error);
        };
      });
    } catch (error) {
      console.error(`Erro ao acessar IndexedDB: ${key}`, error);
      return null;
    }
  }

  async set<T>(key: string, item: CacheItem<T>): Promise<void> {
    try {
      const store = await this.getStore('readwrite');
      return new Promise((resolve, reject) => {
        const request = store.put(item);

        request.onsuccess = () => {
          resolve();
        };

        request.onerror = () => {
          console.error(`Erro ao salvar no IndexedDB: ${key}`, request.error);
          reject(request.error);
        };
      });
    } catch (error) {
      console.error(`Erro ao acessar IndexedDB para escrita: ${key}`, error);
    }
  }

  async remove(key: string): Promise<void> {
    try {
      const store = await this.getStore('readwrite');
      return new Promise((resolve, reject) => {
        const request = store.delete(key);

        request.onsuccess = () => {
          resolve();
        };

        request.onerror = () => {
          console.error(`Erro ao remover do IndexedDB: ${key}`, request.error);
          reject(request.error);
        };
      });
    } catch (error) {
      console.error(`Erro ao acessar IndexedDB para remoção: ${key}`, error);
    }
  }

  async clear(): Promise<void> {
    try {
      const store = await this.getStore('readwrite');
      return new Promise((resolve, reject) => {
        const request = store.clear();

        request.onsuccess = () => {
          resolve();
        };

        request.onerror = () => {
          console.error('Erro ao limpar IndexedDB', request.error);
          reject(request.error);
        };
      });
    } catch (error) {
      console.error('Erro ao acessar IndexedDB para limpeza', error);
    }
  }

  async keys(): Promise<string[]> {
    try {
      const store = await this.getStore();
      return new Promise((resolve, reject) => {
        const keys: string[] = [];
        const request = store.openCursor();

        request.onsuccess = (event) => {
          const cursor = (event.target as IDBRequest).result as IDBCursorWithValue;
          
          if (cursor) {
            const item = cursor.value as CacheItem<any>;
            keys.push(item.metadata.key);
            cursor.continue();
          } else {
            resolve(keys);
          }
        };

        request.onerror = () => {
          console.error('Erro ao listar chaves do IndexedDB', request.error);
          reject(request.error);
        };
      });
    } catch (error) {
      console.error('Erro ao acessar IndexedDB para listagem de chaves', error);
      return [];
    }
  }

  async has(key: string): Promise<boolean> {
    const item = await this.get(key);
    return item !== null;
  }

  async size(): Promise<number> {
    try {
      const store = await this.getStore();
      return new Promise((resolve, reject) => {
        let totalSize = 0;
        const request = store.openCursor();

        request.onsuccess = (event) => {
          const cursor = (event.target as IDBRequest).result as IDBCursorWithValue;
          
          if (cursor) {
            const item = cursor.value as CacheItem<any>;
            totalSize += item.metadata.size || 0;
            cursor.continue();
          } else {
            resolve(totalSize);
          }
        };

        request.onerror = () => {
          console.error('Erro ao calcular tamanho do IndexedDB', request.error);
          reject(request.error);
        };
      });
    } catch (error) {
      console.error('Erro ao acessar IndexedDB para cálculo de tamanho', error);
      return 0;
    }
  }
}

/**
 * Factory para criar a implementação de armazenamento correta
 */
export class StorageFactory {
  static createStorage(type: StorageType, config: CacheConfig = CACHE_CONFIG): StorageAdapter {
    switch (type) {
      case StorageType.LOCAL_STORAGE:
        return new LocalStorageAdapter(config);
      case StorageType.INDEXED_DB:
        return new IndexedDBAdapter(config);
      case StorageType.MEMORY:
        return new MemoryStorageAdapter(config);
      default:
        // Fallback para memória
        console.warn(`Tipo de armazenamento não suportado: ${type}. Usando memória.`);
        return new MemoryStorageAdapter(config);
    }
  }
}

/**
 * Verificar se o tipo de armazenamento está disponível
 */
export const isStorageAvailable = (type: StorageType): boolean => {
  switch (type) {
    case StorageType.LOCAL_STORAGE:
      try {
        const testKey = 'test';
        localStorage.setItem(testKey, testKey);
        localStorage.removeItem(testKey);
        return true;
      } catch (e) {
        return false;
      }
    case StorageType.INDEXED_DB:
      return typeof indexedDB !== 'undefined';
    case StorageType.MEMORY:
      return true;
    default:
      return false;
  }
}; 