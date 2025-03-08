/**
 * Tipos para o sistema de notificações da OCTO
 * Define todas as interfaces e tipos necessários para o sistema
 */

// Tipos de notificação
export enum NotificationType {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
  WARNING = 'warning'
}

// Nível de prioridade da notificação
export enum NotificationPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
}

// Interface base para notificações
export interface BaseNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: number;
  read?: boolean;
  priority?: NotificationPriority;
  // Campos para acessibilidade
  ariaLive?: 'polite' | 'assertive';
  // Role para leitores de tela
  role?: 'alert' | 'status' | 'log';
}

// Interface para toast (notificação temporária)
export interface ToastNotification extends BaseNotification {
  autoClose?: boolean;
  duration?: number; // em milissegundos
  position?: ToastPosition;
  // Ações que o usuário pode realizar
  actions?: ToastAction[];
}

// Interface para notificação persistente
export interface PersistentNotification extends BaseNotification {
  // Dados adicionais exibidos na visualização detalhada
  details?: string;
  // Link para redirecionamento se aplicável
  link?: string;
  // Ícone personalizado
  icon?: string;
  // Categoria da notificação para agrupamento
  category?: string;
  // Data de expiração (quando deve ser removida automaticamente)
  expiresAt?: number;
  // Ações que o usuário pode realizar
  actions?: NotificationAction[];
  // Campos personalizados para dados adicionais
  metadata?: Record<string, any>;
}

// Posições possíveis para toasts
export type ToastPosition = 
  'top-left' | 
  'top-center' | 
  'top-right' | 
  'bottom-left' | 
  'bottom-center' | 
  'bottom-right';

// Interface para ações em toasts
export interface ToastAction {
  label: string;
  onClick: () => void;
  // Estilo do botão de ação
  variant?: 'primary' | 'secondary' | 'ghost';
}

// Interface para ações em notificações persistentes
export interface NotificationAction {
  label: string;
  onClick: () => void;
  // Estilo do botão de ação
  variant?: 'primary' | 'secondary' | 'ghost' | 'link';
  // Ícone para o botão
  icon?: string;
}

// Interface para filtros de notificação
export interface NotificationFilter {
  types?: NotificationType[];
  priorities?: NotificationPriority[];
  read?: boolean;
  categories?: string[];
  dateRange?: {
    from: number;
    to: number;
  }
}

// Interface para configurações do centro de notificações
export interface NotificationCenterConfig {
  // Máximo de notificações persistentes
  maxPersistentNotifications: number;
  // Máximo de toasts exibidos simultaneamente
  maxToasts: number;
  // Posição padrão dos toasts
  defaultToastPosition: ToastPosition;
  // Duração padrão dos toasts em milissegundos
  defaultToastDuration: number;
  // Se toasts fecham automaticamente por padrão
  autoCloseToastsByDefault: boolean;
  // Estratégia de notificação para deficiências
  accessibilityStrategy: {
    // Prioridade mínima para notificações em leitores de tela
    screenReaderPriorityThreshold: NotificationPriority;
    // Duração aumentada para usuários com deficiências cognitivas
    extendedDurationFactor: number;
    // Se deve pausar toasts quando o usuário passa o mouse sobre
    pauseOnHover: boolean;
  }
}

// Estado global das notificações
export interface NotificationsState {
  toasts: ToastNotification[];
  persistentNotifications: PersistentNotification[];
  unreadCount: number;
  config: NotificationCenterConfig;
  isNotificationCenterOpen: boolean;
}

// Ações para o gerenciamento de notificações
export enum NotificationActionType {
  ADD_TOAST = 'ADD_TOAST',
  REMOVE_TOAST = 'REMOVE_TOAST',
  ADD_NOTIFICATION = 'ADD_NOTIFICATION',
  REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION',
  MARK_AS_READ = 'MARK_AS_READ',
  MARK_ALL_AS_READ = 'MARK_ALL_AS_READ',
  CLEAR_ALL = 'CLEAR_ALL',
  TOGGLE_NOTIFICATION_CENTER = 'TOGGLE_NOTIFICATION_CENTER',
  SET_CONFIG = 'SET_CONFIG'
}

// Interface de opções para criar uma notificação
export interface CreateToastOptions {
  title: string;
  message: string;
  type?: NotificationType;
  duration?: number;
  autoClose?: boolean;
  position?: ToastPosition;
  actions?: ToastAction[];
  priority?: NotificationPriority;
}

// Interface de opções para criar uma notificação persistente
export interface CreateNotificationOptions {
  title: string;
  message: string;
  type?: NotificationType;
  details?: string;
  link?: string;
  icon?: string;
  category?: string;
  expiresAt?: number;
  actions?: NotificationAction[];
  priority?: NotificationPriority;
  metadata?: Record<string, any>;
} 