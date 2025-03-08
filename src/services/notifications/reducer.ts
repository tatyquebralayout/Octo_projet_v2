/**
 * Reducer para gerenciar o estado das notificações
 */
import { 
  NotificationActionType, 
  NotificationsState,
  ToastNotification,
  PersistentNotification, 
  NotificationCenterConfig
} from './types';
import { DEFAULT_NOTIFICATION_CONFIG } from './config';
import { countUnreadNotifications, filterExpiredNotifications } from './utils';

/**
 * Estado inicial das notificações
 */
export const initialNotificationsState: NotificationsState = {
  toasts: [],
  persistentNotifications: [],
  unreadCount: 0,
  config: DEFAULT_NOTIFICATION_CONFIG,
  isNotificationCenterOpen: false,
};

/**
 * Tipos das ações do reducer
 */
type NotificationsAction = 
  | { type: NotificationActionType.ADD_TOAST; payload: ToastNotification }
  | { type: NotificationActionType.REMOVE_TOAST; payload: string }
  | { type: NotificationActionType.ADD_NOTIFICATION; payload: PersistentNotification }
  | { type: NotificationActionType.REMOVE_NOTIFICATION; payload: string }
  | { type: NotificationActionType.MARK_AS_READ; payload: string }
  | { type: NotificationActionType.MARK_ALL_AS_READ }
  | { type: NotificationActionType.CLEAR_ALL }
  | { type: NotificationActionType.TOGGLE_NOTIFICATION_CENTER }
  | { type: NotificationActionType.SET_CONFIG; payload: Partial<NotificationCenterConfig> };

/**
 * Reducer para manipular o estado de notificações
 */
export function notificationsReducer(
  state: NotificationsState,
  action: NotificationsAction
): NotificationsState {
  switch (action.type) {
    case NotificationActionType.ADD_TOAST:
      // Limitar o número de toasts conforme configuração
      const toasts = [action.payload, ...state.toasts]
        .slice(0, state.config.maxToasts);
        
      return {
        ...state,
        toasts
      };
      
    case NotificationActionType.REMOVE_TOAST:
      return {
        ...state,
        toasts: state.toasts.filter(toast => toast.id !== action.payload)
      };
      
    case NotificationActionType.ADD_NOTIFICATION: {
      // Adicionar nova notificação e limitar o número conforme configuração
      const filteredNotifications = filterExpiredNotifications(state.persistentNotifications);
      const updatedNotifications = [action.payload, ...filteredNotifications]
        .slice(0, state.config.maxPersistentNotifications);
        
      // Calcular novo número de notificações não lidas
      const unreadCount = countUnreadNotifications(updatedNotifications);
        
      return {
        ...state,
        persistentNotifications: updatedNotifications,
        unreadCount
      };
    }
      
    case NotificationActionType.REMOVE_NOTIFICATION: {
      // Remover notificação pelo ID
      const updatedNotifications = state.persistentNotifications
        .filter(notification => notification.id !== action.payload);
        
      // Calcular novo número de notificações não lidas
      const unreadCount = countUnreadNotifications(updatedNotifications);
        
      return {
        ...state,
        persistentNotifications: updatedNotifications,
        unreadCount
      };
    }
      
    case NotificationActionType.MARK_AS_READ: {
      // Marcar uma notificação como lida
      const updatedNotifications = state.persistentNotifications.map(notification => 
        notification.id === action.payload
          ? { ...notification, read: true }
          : notification
      );
      
      // Calcular novo número de notificações não lidas
      const unreadCount = countUnreadNotifications(updatedNotifications);
      
      return {
        ...state,
        persistentNotifications: updatedNotifications,
        unreadCount
      };
    }
      
    case NotificationActionType.MARK_ALL_AS_READ: {
      // Marcar todas as notificações como lidas
      const updatedNotifications = state.persistentNotifications.map(notification => ({
        ...notification,
        read: true
      }));
      
      return {
        ...state,
        persistentNotifications: updatedNotifications,
        unreadCount: 0
      };
    }
      
    case NotificationActionType.CLEAR_ALL:
      // Limpar todas as notificações
      return {
        ...state,
        persistentNotifications: [],
        unreadCount: 0
      };
      
    case NotificationActionType.TOGGLE_NOTIFICATION_CENTER:
      // Alternar visibilidade do centro de notificações
      return {
        ...state,
        isNotificationCenterOpen: !state.isNotificationCenterOpen
      };
      
    case NotificationActionType.SET_CONFIG:
      // Atualizar configurações
      return {
        ...state,
        config: {
          ...state.config,
          ...action.payload
        }
      };
      
    default:
      return state;
  }
} 