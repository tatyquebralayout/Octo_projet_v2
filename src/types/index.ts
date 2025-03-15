/**
 * Arquivo de barril (index) para exportar todos os tipos centralizados
 * Parte do plano de refatoração estrutural para melhorar a consistência de tipos
 */

// Re-exportar todos os tipos dos arquivos específicos
export * from './api';
export * from './auth';
export * from './guides';
export * from './news';
export * from './config';

// Tipos comuns compartilhados entre diferentes domínios
export interface Identifiable {
  id: string;
}

export interface Timestamped {
  createdAt: string;
  updatedAt?: string;
}

export interface Auditable extends Timestamped {
  createdBy?: string;
  updatedBy?: string;
}

export interface Sluggable {
  slug: string;
}

export interface Publishable {
  publishedAt?: string;
  isPublished: boolean;
  publishedBy?: string;
}

// Tipos para paginação na UI
export interface PaginationState {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

// Tipos para ordenação
export type SortDirection = 'asc' | 'desc';

export interface SortOption {
  field: string;
  direction: SortDirection;
  label: string;
}

// Tipos para filtros
export interface FilterOption<T = string | number | boolean> {
  field: string;
  value: T;
  label: string;
  type: 'text' | 'number' | 'boolean' | 'date' | 'select';
  options?: Array<{value: T, label: string}>;
}

// Tipos para estados comuns de UI
export interface LoadingState {
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

// Tipos para mensagens e notificações
export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  title?: string;
  autoClose?: boolean;
  duration?: number;
  timestamp: string;
} 