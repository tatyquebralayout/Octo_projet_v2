/**
 * Componente principal para o sistema de notificações
 * Combina o provider de contexto com os componentes visuais
 */
import React from 'react';
import { NotificationsProvider as ContextProvider } from '../../services/notifications/context';
import { ToastContainer } from './ToastContainer';
import { NotificationCenter } from './NotificationCenter';

interface NotificationsProviderProps {
  children: React.ReactNode;
}

export const NotificationsProvider: React.FC<NotificationsProviderProps> = ({ children }) => {
  return (
    <ContextProvider>
      {children}
      <ToastContainer />
      <NotificationCenter />
    </ContextProvider>
  );
}; 