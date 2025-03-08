/**
 * Contexto para o sistema de notificações
 * Fornece acesso ao estado e ações para todos os componentes
 */
import React, { createContext, useContext, useReducer, ReactNode, useCallback, useEffect } from 'react';
import { notificationsReducer, initialNotificationsState } from './reducer';
import { 
  CreateNotificationOptions, 
  CreateToastOptions, 
  NotificationActionType, 
  NotificationType,
  NotificationsState, 
  PersistentNotification, 
  ToastNotification 
} from './types';
import { createNotification, createToast, isNotificationExpired } from './utils';

// Interface do contexto de notificações
interface NotificationsContextType {
  // Estado
  state: NotificationsState;
  
  // Ações para toasts
  showToast: (options: CreateToastOptions) => string;
  showSuccessToast: (title: string, message: string) => string;
  showErrorToast: (title: string, message: string) => string;
  showInfoToast: (title: string, message: string) => string;
  showWarningToast: (title: string, message: string) => string;
  removeToast: (id: string) => void;
  
  // Ações para notificações persistentes
  addNotification: (options: CreateNotificationOptions) => string;
  removeNotification: (id: string) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAllNotifications: () => void;
  
  // Ações para o centro de notificações
  toggleNotificationCenter: () => void;
}

// Criação do contexto
const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

// Provider do contexto
export const NotificationsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Inicializar o reducer com o estado inicial
  const [state, dispatch] = useReducer(notificationsReducer, initialNotificationsState);
  
  // Efeito para remover toasts expirados automaticamente
  useEffect(() => {
    // Para cada toast com autoClose ativado, configurar um timer para removê-lo
    const timers = state.toasts
      .filter(toast => toast.autoClose)
      .map(toast => {
        // Usar o ID para identificar o toast e o duration para definir o tempo
        return setTimeout(() => {
          dispatch({ 
            type: NotificationActionType.REMOVE_TOAST, 
            payload: toast.id 
          });
        }, toast.duration);
      });
    
    // Limpar timers quando o componente desmontar ou o estado mudar
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [state.toasts]);
  
  // Efeito para remover notificações expiradas
  useEffect(() => {
    // Verificar notificações periodicamente (a cada minuto)
    const intervalId = setInterval(() => {
      // Identificar notificações expiradas
      state.persistentNotifications.forEach(notification => {
        if (isNotificationExpired(notification)) {
          dispatch({
            type: NotificationActionType.REMOVE_NOTIFICATION,
            payload: notification.id
          });
        }
      });
    }, 60000); // 1 minuto
    
    return () => clearInterval(intervalId);
  }, [state.persistentNotifications]);
  
  // Funções para manipular toasts
  
  const showToast = useCallback((options: CreateToastOptions): string => {
    const toast = createToast(options);
    
    dispatch({ 
      type: NotificationActionType.ADD_TOAST, 
      payload: toast 
    });
    
    return toast.id;
  }, []);
  
  const showSuccessToast = useCallback((title: string, message: string): string => {
    return showToast({
      title,
      message,
      type: NotificationType.SUCCESS
    });
  }, [showToast]);
  
  const showErrorToast = useCallback((title: string, message: string): string => {
    return showToast({
      title,
      message,
      type: NotificationType.ERROR
    });
  }, [showToast]);
  
  const showInfoToast = useCallback((title: string, message: string): string => {
    return showToast({
      title,
      message,
      type: NotificationType.INFO
    });
  }, [showToast]);
  
  const showWarningToast = useCallback((title: string, message: string): string => {
    return showToast({
      title,
      message,
      type: NotificationType.WARNING
    });
  }, [showToast]);
  
  const removeToast = useCallback((id: string): void => {
    dispatch({ 
      type: NotificationActionType.REMOVE_TOAST, 
      payload: id 
    });
  }, []);
  
  // Funções para manipular notificações persistentes
  
  const addNotification = useCallback((options: CreateNotificationOptions): string => {
    const notification = createNotification(options);
    
    dispatch({ 
      type: NotificationActionType.ADD_NOTIFICATION, 
      payload: notification 
    });
    
    return notification.id;
  }, []);
  
  const removeNotification = useCallback((id: string): void => {
    dispatch({ 
      type: NotificationActionType.REMOVE_NOTIFICATION, 
      payload: id 
    });
  }, []);
  
  const markAsRead = useCallback((id: string): void => {
    dispatch({ 
      type: NotificationActionType.MARK_AS_READ, 
      payload: id 
    });
  }, []);
  
  const markAllAsRead = useCallback((): void => {
    dispatch({ type: NotificationActionType.MARK_ALL_AS_READ });
  }, []);
  
  const clearAllNotifications = useCallback((): void => {
    dispatch({ type: NotificationActionType.CLEAR_ALL });
  }, []);
  
  // Função para alternar a visibilidade do centro de notificações
  
  const toggleNotificationCenter = useCallback((): void => {
    dispatch({ type: NotificationActionType.TOGGLE_NOTIFICATION_CENTER });
  }, []);
  
  // Criar o valor do contexto com o estado e as ações
  const contextValue: NotificationsContextType = {
    state,
    showToast,
    showSuccessToast,
    showErrorToast,
    showInfoToast,
    showWarningToast,
    removeToast,
    addNotification,
    removeNotification,
    markAsRead,
    markAllAsRead,
    clearAllNotifications,
    toggleNotificationCenter
  };
  
  return (
    <NotificationsContext.Provider value={contextValue}>
      {children}
    </NotificationsContext.Provider>
  );
};

// Hook para usar o contexto de notificações
export const useNotifications = (): NotificationsContextType => {
  const context = useContext(NotificationsContext);
  
  if (context === undefined) {
    throw new Error('useNotifications deve ser usado dentro de um NotificationsProvider');
  }
  
  return context;
}; 