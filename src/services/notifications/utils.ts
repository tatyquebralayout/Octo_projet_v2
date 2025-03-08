/**
 * Utilidades para o sistema de notificações
 */
import { v4 as uuidv4 } from 'uuid';
import { 
  BaseNotification,
  CreateNotificationOptions,
  CreateToastOptions,
  NotificationPriority,
  NotificationType,
  PersistentNotification,
  ToastNotification
} from './types';
import { DEFAULT_NOTIFICATION_CONFIG, NOTIFICATION_ARIA_LIVE, NOTIFICATION_ARIA_ROLES, TOAST_DURATIONS } from './config';

/**
 * Gera um ID único para uma notificação
 */
export function generateNotificationId(): string {
  return `notif_${uuidv4()}`;
}

/**
 * Cria uma notificação temporária (toast)
 */
export function createToast(options: CreateToastOptions): ToastNotification {
  const config = DEFAULT_NOTIFICATION_CONFIG;
  const type = options.type || NotificationType.INFO;
  const priority = options.priority || NotificationPriority.MEDIUM;
  
  // Determinar a duração baseada no tipo, ou usar o valor fornecido ou padrão
  const duration = options.duration || 
    TOAST_DURATIONS[type.toUpperCase() as keyof typeof TOAST_DURATIONS] || 
    config.defaultToastDuration;
  
  // Determinar o role ARIA e aria-live baseado no tipo e prioridade
  const roleValue = NOTIFICATION_ARIA_ROLES[type.toUpperCase() as keyof typeof NOTIFICATION_ARIA_ROLES];
  const role = (roleValue === 'alert' || roleValue === 'status' || roleValue === 'log') 
    ? roleValue 
    : 'status';
    
  const ariaLiveValue = NOTIFICATION_ARIA_LIVE[type.toUpperCase() as keyof typeof NOTIFICATION_ARIA_LIVE];
  const ariaLive = (ariaLiveValue === 'assertive' || ariaLiveValue === 'polite') 
    ? ariaLiveValue 
    : 'polite';
  
  // Retornar o objeto de notificação
  return {
    id: generateNotificationId(),
    title: options.title,
    message: options.message,
    type,
    timestamp: Date.now(),
    autoClose: options.autoClose !== undefined ? options.autoClose : config.autoCloseToastsByDefault,
    duration,
    position: options.position || config.defaultToastPosition,
    actions: options.actions || [],
    priority,
    role,
    ariaLive
  };
}

/**
 * Cria uma notificação persistente
 */
export function createNotification(options: CreateNotificationOptions): PersistentNotification {
  const type = options.type || NotificationType.INFO;
  const priority = options.priority || NotificationPriority.MEDIUM;
  
  // Determinar o role ARIA e aria-live baseado no tipo e prioridade
  const roleValue = NOTIFICATION_ARIA_ROLES[type.toUpperCase() as keyof typeof NOTIFICATION_ARIA_ROLES];
  const role = (roleValue === 'alert' || roleValue === 'status' || roleValue === 'log') 
    ? roleValue 
    : 'status';
    
  const ariaLiveValue = NOTIFICATION_ARIA_LIVE[type.toUpperCase() as keyof typeof NOTIFICATION_ARIA_LIVE];
  const ariaLive = (ariaLiveValue === 'assertive' || ariaLiveValue === 'polite') 
    ? ariaLiveValue 
    : 'polite';
  
  // Retornar o objeto de notificação
  return {
    id: generateNotificationId(),
    title: options.title,
    message: options.message,
    type,
    timestamp: Date.now(),
    read: false,
    details: options.details,
    link: options.link,
    icon: options.icon,
    category: options.category,
    expiresAt: options.expiresAt,
    actions: options.actions || [],
    priority,
    metadata: options.metadata || {},
    role,
    ariaLive
  };
}

/**
 * Verifica se uma notificação expirou
 */
export function isNotificationExpired(notification: PersistentNotification): boolean {
  return notification.expiresAt !== undefined && notification.expiresAt < Date.now();
}

/**
 * Formata o timestamp para exibição amigável
 */
export function formatTimestamp(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  
  // Menos de 1 minuto
  if (diff < 60000) {
    return 'agora mesmo';
  }
  
  // Menos de 1 hora
  if (diff < 3600000) {
    const minutes = Math.floor(diff / 60000);
    return `${minutes} ${minutes === 1 ? 'minuto' : 'minutos'} atrás`;
  }
  
  // Menos de 1 dia
  if (diff < 86400000) {
    const hours = Math.floor(diff / 3600000);
    return `${hours} ${hours === 1 ? 'hora' : 'horas'} atrás`;
  }
  
  // Menos de 30 dias
  if (diff < 2592000000) {
    const days = Math.floor(diff / 86400000);
    return `${days} ${days === 1 ? 'dia' : 'dias'} atrás`;
  }
  
  // Para datas mais antigas, usar a data completa
  const date = new Date(timestamp);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

/**
 * Agrupa notificações por categoria
 */
export function groupNotificationsByCategory(
  notifications: PersistentNotification[]
): Record<string, PersistentNotification[]> {
  const grouped: Record<string, PersistentNotification[]> = {};
  
  // Categoria padrão para notificações sem categoria
  const DEFAULT_CATEGORY = 'geral';
  
  // Agrupar notificações
  notifications.forEach(notification => {
    const category = notification.category || DEFAULT_CATEGORY;
    
    if (!grouped[category]) {
      grouped[category] = [];
    }
    
    grouped[category].push(notification);
  });
  
  return grouped;
}

/**
 * Obtém o ícone para um tipo de notificação
 * Centraliza a lógica de mapeamento de tipos para ícones
 */
export function getIconForNotificationType(type: NotificationType): string {
  switch (type) {
    case NotificationType.SUCCESS:
      return 'check-circle';
    case NotificationType.ERROR:
      return 'alert-circle';
    case NotificationType.WARNING:
      return 'alert-triangle';
    case NotificationType.INFO:
    default:
      return 'info';
  }
}

/**
 * Obtém a classe CSS para um tipo de notificação
 */
export function getClassForNotificationType(type: NotificationType): string {
  switch (type) {
    case NotificationType.SUCCESS:
      return 'bg-success text-success-content';
    case NotificationType.ERROR:
      return 'bg-error text-error-content';
    case NotificationType.WARNING:
      return 'bg-warning text-warning-content';
    case NotificationType.INFO:
    default:
      return 'bg-info text-info-content';
  }
}

/**
 * Filtra notificações expiradas
 */
export function filterExpiredNotifications(
  notifications: PersistentNotification[]
): PersistentNotification[] {
  return notifications.filter(notification => !isNotificationExpired(notification));
}

/**
 * Conta notificações não lidas
 */
export function countUnreadNotifications(
  notifications: PersistentNotification[]
): number {
  return notifications.filter(notification => !notification.read).length;
} 