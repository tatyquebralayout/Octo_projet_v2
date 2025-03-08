/**
 * Componente para o botão que abre o centro de notificações
 */
import React from 'react';
import { useNotifications } from '../../services/notifications/context';

export const NotificationButton: React.FC = () => {
  const { state, toggleNotificationCenter } = useNotifications();
  const { unreadCount, isNotificationCenterOpen } = state;
  
  return (
    <button
      onClick={toggleNotificationCenter}
      className={`
        relative p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary
        ${isNotificationCenterOpen ? 'bg-gray-200' : 'hover:bg-gray-100'}
      `}
      aria-label={`${unreadCount} notificações não lidas. Clique para ${isNotificationCenterOpen ? 'fechar' : 'abrir'} o centro de notificações.`}
    >
      {/* Ícone de sino */}
      <span className="text-gray-600" aria-hidden="true">
        <i className="icon-bell text-xl"></i>
      </span>
      
      {/* Contador de notificações não lidas */}
      {unreadCount > 0 && (
        <span className="absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/3 flex items-center justify-center h-5 w-5 rounded-full bg-primary text-white text-xs font-bold">
          {unreadCount > 99 ? '99+' : unreadCount}
        </span>
      )}
    </button>
  );
}; 