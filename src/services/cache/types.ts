/**
 * Definições de tipos para o sistema de cache e persistência
 * Centraliza todos os tipos utilizados pelo sistema de cache
 */

// Estratégias de armazenamento
export enum StorageType {
  LOCAL_STORAGE = 'localStorage',
  INDEXED_DB = 'indexedDB',
  MEMORY = 'memory'
}

// Configurações de expiração de cache
export interface ExpiryConfig {
  // Tempo em milissegundos para expiração do cache
  expiresIn: number;
  // Se true, extende a expiração a cada acesso
  extendOnAccess?: boolean;
  // Se true, remove automaticamente quando expirar
  autoRemove?: boolean;
}

// Configurações globais do cache
export interface CacheConfig {
  // Nome do banco de dados IndexedDB (quando usado)
  dbName: string;
  // Versão do banco de dados
  dbVersion: number;
  // Tempo padrão de expiração em milissegundos (24 horas)
  defaultExpiryTime: number;
  // Estratégia de armazenamento padrão
  defaultStorage: StorageType;
  // Prefixo para chaves no localStorage
  keyPrefix: string;
  // Se true, desabilita todo o cache (útil para debugging)
  disabled?: boolean;
  // Tamanho máximo aproximado do cache em bytes (0 = sem limite)
  maxSize?: number;
}

// Metadados do cache
export interface CacheMetadata {
  // Timestamp de quando o item foi armazenado
  timestamp: number;
  // Timestamp de quando o item expira
  expiresAt: number;
  // Versão do cache (para migrações)
  version: number;
  // URL ou chave original da requisição
  key: string;
  // Hash gerado para a chave+params
  hash: string;
  // Se o cache está sendo atualizado no momento
  updating?: boolean;
  // Tamanho aproximado em bytes
  size?: number;
  // Tags para categorização e invalidação em grupo
  tags?: string[];
}

// Item armazenado no cache
export interface CacheItem<T = any> {
  // Dados armazenados
  data: T;
  // Metadados do cache
  metadata: CacheMetadata;
  // Status de erro (se houver)
  error?: {
    message: string;
    code?: string;
    status?: number;
  };
}

// Configurações específicas para uma chave de cache
export interface CacheOptions extends Partial<ExpiryConfig> {
  // Força atualização mesmo se o cache for válido
  forceRefresh?: boolean;
  // Estratégia de armazenamento específica
  storage?: StorageType;
  // Se true, busca do cache enquanto atualiza em segundo plano
  staleWhileRevalidate?: boolean;
  // Se true, erros durante a revalidação em segundo plano não serão lançados
  suppressBackgroundErrors?: boolean;
  // Versão específica do cache
  version?: number;
  // Tags para agrupamento de itens de cache (para invalidação em grupo)
  tags?: string[];
  // Opções para configurar backoff exponencial e retentativas
  retryOptions?: {
    maxRetries?: number;
    delayMs?: number;
    backoffFactor?: number;
    shouldRetry?: (error: any, attempt: number) => boolean;
    onRetry?: (error: any, attempt: number) => void;
  };
}

// Resultado de uma operação de cache
export interface CacheResult<T = any> {
  // Dados obtidos
  data: T;
  // Se o resultado veio do cache
  fromCache: boolean;
  // Se o cache foi revalidado em segundo plano
  revalidated?: boolean;
  // Timestamp de quando o cache expira
  expiresAt?: number;
  // Metadados completos do cache
  metadata?: CacheMetadata;
}

// Função para gerar a chave de cache
export type KeyGenerator = (baseKey: string, params?: any) => string;

// Eventos do sistema de cache
export enum CacheEventType {
  ITEM_ADDED = 'item_added',
  ITEM_UPDATED = 'item_updated',
  ITEM_REMOVED = 'item_removed',
  CACHE_CLEARED = 'cache_cleared',
  ERROR = 'error',
  SYNC_STARTED = 'sync_started',
  SYNC_COMPLETED = 'sync_completed'
}

// Dados do evento de cache
export interface CacheEvent {
  type: CacheEventType;
  key?: string;
  tags?: string[];
  timestamp: number;
  metadata?: CacheMetadata;
  error?: any;
}

// Interface para um listener de eventos
export interface CacheEventListener {
  (event: CacheEvent): void;
}

// Configurações de sincronização offline
export interface SyncConfig {
  // Intervalo em milissegundos para tentar sincronizar (0 = manual)
  syncInterval: number;
  // Máximo de tentativas por item
  maxRetries: number;
  // Tempo progressivo entre tentativas (em ms)
  retryDelay: number;
  // Quantidade máxima de operações pendentes
  maxPendingOperations: number;
}

// Operação pendente para sincronização
export interface PendingOperation {
  // ID único da operação
  id: string;
  // URL da requisição
  url: string;
  // Método da requisição
  method: string;
  // Dados a serem enviados
  data?: any;
  // Cabeçalhos da requisição
  headers?: Record<string, string>;
  // Timestamp de criação
  createdAt: number;
  // Número de tentativas realizadas
  attempts: number;
  // Próxima tentativa programada para
  nextRetry?: number;
  // Erro da última tentativa
  lastError?: string;
}

// Status de sincronização
export interface SyncStatus {
  // Se está conectado à internet
  isOnline: boolean;
  // Se existe sincronização em andamento
  isSyncing: boolean;
  // Quantidade de operações pendentes
  pendingCount: number;
  // Timestamp da última sincronização bem-sucedida
  lastSync: number | null;
  // Se sincronização automática está habilitada
  autoSyncEnabled: boolean;
}

// Interface da fila de sincronização
export interface SyncQueue {
  // Adiciona uma operação à fila
  add(operation: Omit<PendingOperation, 'id' | 'createdAt' | 'attempts'>): string;
  // Remove uma operação da fila
  remove(id: string): boolean;
  // Processa a fila de sincronização
  process(): Promise<boolean>;
  // Obtém o status atual da sincronização
  getStatus(): SyncStatus;
  // Habilita/desabilita sincronização automática
  setAutoSync(enabled: boolean): void;
  // Limpa a fila
  clear(): void;
  // Adiciona listener para eventos de sincronização
  addEventListener(listener: CacheEventListener): void;
  // Remove listener
  removeEventListener(listener: CacheEventListener): void;
} 