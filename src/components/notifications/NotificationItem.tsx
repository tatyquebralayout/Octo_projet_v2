/**
 * Componente para exibir um item de notificação individual
 */
import React from 'react';
import { PersistentNotification } from '../../services/notifications/types';
import { formatTimestamp, getClassForNotificationType, getIconForNotificationType } from '../../services/notifications/utils';

interface NotificationItemProps {
  notification: PersistentNotification;
  onMarkAsRead: (id: string) => void;
  onRemove: (id: string) => void;
  expanded?: boolean;
  onToggleExpand?: (id: string) => void;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onMarkAsRead,
  onRemove,
  expanded = false,
  onToggleExpand
}) => {
  const { id, title, message, type, timestamp, read, details, link, icon, actions } = notification;
  
  // Classe para o tipo de notificação (cor)
  const colorClass = getClassForNotificationType(type);
  
  // Ícone para o tipo de notificação
  const typeIcon = icon || getIconForNotificationType(type);
  
  // Manipular clique na notificação
  const handleClick = () => {
    // Se não estiver marcada como lida, marcá-la
    if (!read) {
      onMarkAsRead(id);
    }
    
    // Se tiver função para expandir, chamá-la
    if (onToggleExpand) {
      onToggleExpand(id);
    }
    
    // Se tiver link, navegar para ele
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };
  
  return (
    <div 
      className={`
        border-l-4 mb-2 rounded shadow-sm transition-all duration-200
        ${colorClass.replace('bg-', 'border-')}
        ${read ? 'bg-gray-50' : 'bg-white'}
        ${read ? 'opacity-80' : 'opacity-100'}
      `}
    >
      {/* Cabeçalho - sempre visível */}
      <div 
        className="p-3 cursor-pointer flex items-start"
        onClick={handleClick}
      >
        {/* Indicador de não lida */}
        {!read && (
          <div className="w-2 h-2 rounded-full bg-primary mr-2 mt-2" />
        )}
        
        {/* Ícone */}
        <div className="flex-shrink-0 mr-3">
          <span className={`text-lg ${colorClass.split(' ')[0]}`} aria-hidden="true">
            <i className={`icon-${typeIcon}`}></i>
          </span>
        </div>
        
        {/* Conteúdo */}
        <div className="flex-grow">
          {/* Título */}
          <h3 className={`font-medium text-sm ${read ? 'text-gray-600' : 'text-gray-800'}`}>
            {title}
          </h3>
          
          {/* Mensagem */}
          <p className={`text-sm ${read ? 'text-gray-500' : 'text-gray-700'}`}>
            {message}
          </p>
          
          {/* Timestamp */}
          <div className="text-xs text-gray-400 mt-1">
            {formatTimestamp(timestamp)}
          </div>
        </div>
        
        {/* Botões de ação rápida */}
        <div className="flex-shrink-0 ml-2">
          {/* Botão de remover */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove(id);
            }}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Remover notificação"
          >
            <i className="icon-trash text-sm" />
          </button>
        </div>
      </div>
      
      {/* Detalhes - visíveis apenas quando expandido */}
      {expanded && details && (
        <div className="px-4 pb-3 pt-0 text-sm text-gray-600 border-t border-gray-100">
          <div className="mt-2">{details}</div>
          
          {/* Ações */}
          {actions && actions.length > 0 && (
            <div className="mt-3 flex gap-2">
              {actions.map((action, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    action.onClick();
                  }}
                  className={`text-xs py-1 px-3 rounded ${
                    action.variant === 'primary' 
                      ? 'bg-primary text-white' 
                      : action.variant === 'secondary'
                        ? 'border border-gray-300 text-gray-700'
                        : 'text-primary'
                  }`}
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}; 