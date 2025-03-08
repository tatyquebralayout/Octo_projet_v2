/**
 * Configurações do sistema de cache e persistência
 * Define valores padrão e configurações globais
 */
import { CacheConfig, StorageType, SyncConfig } from './types';

// 24 horas em milissegundos
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Configurações globais do sistema de cache
 */
export const CACHE_CONFIG: CacheConfig = {
  // Nome do banco de dados IndexedDB
  dbName: 'octo_cache_db',
  // Versão atual do banco
  dbVersion: 1,
  // Tempo padrão de expiração (24 horas)
  defaultExpiryTime: ONE_DAY_MS,
  // Armazenamento padrão
  defaultStorage: StorageType.LOCAL_STORAGE,
  // Prefixo para chaves no localStorage
  keyPrefix: 'octo:cache:',
  // Cache desabilitado em desenvolvimento se especificado
  disabled: import.meta.env.DEV && import.meta.env.VITE_DISABLE_CACHE === 'true',
  // Tamanho máximo aproximado (50MB)
  maxSize: 50 * 1024 * 1024,
};

/**
 * Configurações para sincronização offline
 */
export const SYNC_CONFIG: SyncConfig = {
  // Tenta sincronizar a cada 1 minuto
  syncInterval: 60 * 1000,
  // Máximo de 5 tentativas por operação
  maxRetries: 5,
  // Delay inicial de 5 segundos, aumentando exponencialmente
  retryDelay: 5 * 1000,
  // Máximo de 100 operações pendentes
  maxPendingOperations: 100,
};

/**
 * TTL (time-to-live) padrão para diferentes tipos de recursos
 * em milissegundos
 */
export const CACHE_TTL = {
  // Dados que mudam raramente (7 dias)
  STATIC: 7 * ONE_DAY_MS,
  // Dados que mudam ocasionalmente (1 dia)
  NORMAL: ONE_DAY_MS,
  // Dados que mudam frequentemente (1 hora)
  DYNAMIC: ONE_DAY_MS / 24,
  // Dados que mudam muito frequentemente (5 minutos)
  VOLATILE: 5 * 60 * 1000,
  // Sessão do usuário (30 minutos)
  SESSION: 30 * 60 * 1000,
};

/**
 * Mapeamento de endpoints para TTL específicos
 * Permite configurar tempos de expiração diferentes por endpoint
 */
export const ENDPOINT_TTL_MAP: Record<string, number> = {
  // Dados de usuário expiram em 30 minutos
  '/users/profile': CACHE_TTL.SESSION,
  // Conteúdo de notícias expira em 1 hora
  '/news': CACHE_TTL.DYNAMIC,
  // Cartilhas e guias expiram em 1 dia
  '/guides': CACHE_TTL.NORMAL,
  // Dados estatísticos expiram em 7 dias
  '/stats': CACHE_TTL.STATIC,
};

/**
 * Configurações de persistência específicas para pessoas com deficiência
 * Otimizado para maior acessibilidade e disponibilidade de dados
 */
export const ACCESSIBILITY_CACHE_CONFIG = {
  // Tempo de expiração maior para reduzir a necessidade de recarregar (3 dias)
  defaultExpiryTime: 3 * ONE_DAY_MS,
  // Sempre buscar do cache primeiro para diminuir tempo de espera
  staleWhileRevalidate: true,
  // Maior armazenamento para conteúdo offline
  maxSize: 100 * 1024 * 1024, // 100MB
};

/**
 * Endpoints que não devem ser cacheados
 */
export const NON_CACHEABLE_ENDPOINTS = [
  '/auth/login',
  '/auth/logout',
  '/auth/register',
  '/contact/submit',
];

/**
 * Versão atual do esquema de cache
 * Incrementar quando houver mudanças nas estruturas que requeiram migração
 */
export const CACHE_SCHEMA_VERSION = 1; 