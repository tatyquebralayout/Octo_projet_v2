/**
 * Ponto de entrada para o sistema de cache e persistência
 * Exporta todas as funcionalidades e tipos necessários
 */

// Exportar o gerenciador de cache
export { cacheManager } from './cacheManager';

// Exportar configurações
export {
  CACHE_CONFIG,
  CACHE_TTL,
  ENDPOINT_TTL_MAP,
  ACCESSIBILITY_CACHE_CONFIG,
  NON_CACHEABLE_ENDPOINTS,
  CACHE_SCHEMA_VERSION
} from './config';

// Exportar tipos
export type {
  StorageType,
  CacheConfig,
  CacheItem,
  CacheMetadata,
  CacheOptions,
  CacheResult,
  CacheEvent,
  CacheEventType,
  CacheEventListener,
  ExpiryConfig,
  SyncConfig,
  PendingOperation,
  SyncStatus,
  SyncQueue
} from './types';

// Exportar utilitários
export {
  createHash,
  estimateSize,
  areEqual,
  formatSize,
  formatTimestamp,
  getTimeRemaining
} from './utils';

// Exportar adaptadores de armazenamento
export {
  StorageAdapter,
  LocalStorageAdapter,
  MemoryStorageAdapter,
  IndexedDBAdapter,
  StorageFactory,
  isStorageAvailable
} from './storageManager';

/**
 * Documentação de uso básico:
 * 
 * 1. Uso básico com o gerenciador de cache:
 * ```typescript
 * import { cacheManager } from 'src/services/cache';
 * 
 * // Buscar dados com cache
 * const result = await cacheManager.getOrFetch(
 *   '/api/users',
 *   () => fetch('/api/users').then(res => res.json()),
 *   { expiresIn: 60 * 1000 } // 1 minuto
 * );
 * 
 * console.log('Dados:', result.data);
 * console.log('Do cache?', result.fromCache);
 * ```
 * 
 * 2. Uso com hooks React:
 * ```tsx
 * import { useCache } from 'src/hooks/useCache';
 * 
 * function UserList() {
 *   const { data, isLoading, error, refresh } = useCache(
 *     '/api/users',
 *     () => fetch('/api/users').then(res => res.json()),
 *     { expiresIn: 60 * 1000 }
 *   );
 * 
 *   if (isLoading) return <p>Carregando...</p>;
 *   if (error) return <p>Erro: {error.message}</p>;
 * 
 *   return (
 *     <div>
 *       <button onClick={refresh}>Atualizar</button>
 *       <ul>
 *         {data?.map(user => (
 *           <li key={user.id}>{user.name}</li>
 *         ))}
 *       </ul>
 *     </div>
 *   );
 * }
 * ```
 * 
 * 3. Uso com mutações:
 * ```tsx
 * import { useCacheWithMutation } from 'src/hooks/useCache';
 * 
 * function UserProfile() {
 *   const {
 *     data: user,
 *     isLoading,
 *     error,
 *     mutate,
 *     isMutating
 *   } = useCacheWithMutation(
 *     '/api/users/me',
 *     () => fetch('/api/users/me').then(res => res.json())
 *   );
 * 
 *   const updateName = async (newName) => {
 *     mutate(
 *       async (currentUser) => {
 *         const response = await fetch('/api/users/me', {
 *           method: 'PATCH',
 *           body: JSON.stringify({ name: newName })
 *         });
 *         return response.json();
 *       },
 *       // Atualização otimista
 *       (currentUser) => ({
 *         ...currentUser,
 *         name: newName
 *       })
 *     );
 *   };
 * 
 *   // Renderização do componente...
 * }
 * ```
 */ 