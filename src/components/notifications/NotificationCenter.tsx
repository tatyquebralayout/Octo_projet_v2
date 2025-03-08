/**
 * Componente para o centro de notificações
 * Exibe uma lista de notificações persistentes com opções de filtragem
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotifications } from '../../services/notifications/context';
import { NotificationItem } from './NotificationItem';
import { NotificationFilter, NotificationType } from '../../services/notifications/types';
import { ANIMATION_DURATION } from '../../services/notifications/config';
import { groupNotificationsByCategory } from '../../services/notifications/utils';

export const NotificationCenter: React.FC = () => {
  const { 
    state, 
    removeNotification, 
    markAsRead, 
    markAllAsRead, 
    clearAllNotifications,
    toggleNotificationCenter
  } = useNotifications();
  
  const { persistentNotifications, unreadCount, isNotificationCenterOpen } = state;
  
  // Estado para notificações expandidas
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});
  
  // Estado para filtros
  const [filter, setFilter] = useState<NotificationFilter>({});
  
  // Toggle para expandir/colapsar notificação
  const toggleExpand = (id: string) => {
    setExpandedIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  // Aplicar filtros às notificações
  const filteredNotifications = persistentNotifications.filter(notification => {
    // Filtrar por tipo
    if (filter.types && filter.types.length > 0) {
      if (!filter.types.includes(notification.type)) {
        return false;
      }
    }
    
    // Filtrar por status de leitura
    if (filter.read !== undefined) {
      if (notification.read !== filter.read) {
        return false;
      }
    }
    
    // Filtrar por categoria
    if (filter.categories && filter.categories.length > 0) {
      const category = notification.category || 'geral';
      if (!filter.categories.includes(category)) {
        return false;
      }
    }
    
    return true;
  });
  
  // Agrupar notificações por categoria para exibição
  const groupedNotifications = groupNotificationsByCategory(filteredNotifications);
  
  // Variantes para animação do painel
  const panelVariants = {
    hidden: { opacity: 0, x: 300 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 300 }
  };
  
  // Variantes para animação dos itens
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.2
      }
    }),
    exit: { opacity: 0, y: -20 }
  };
  
  // Função para alternar filtro de tipo
  const toggleTypeFilter = (type: NotificationType) => {
    setFilter(prev => {
      const types = prev.types || [];
      if (types.includes(type)) {
        return {
          ...prev,
          types: types.filter(t => t !== type)
        };
      } else {
        return {
          ...prev,
          types: [...types, type]
        };
      }
    });
  };
  
  // Função para alternar filtro de leitura
  const toggleReadFilter = (read: boolean) => {
    setFilter(prev => ({
      ...prev,
      read: prev.read === read ? undefined : read
    }));
  };
  
  return (
    <AnimatePresence>
      {isNotificationCenterOpen && (
        <>
          {/* Overlay para fechar ao clicar fora */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-30 z-40"
            onClick={toggleNotificationCenter}
            aria-hidden="true"
          />
          
          {/* Painel de notificações */}
          <motion.div
            className="fixed right-0 top-0 h-screen bg-white shadow-lg z-50 w-80 sm:w-96 overflow-hidden flex flex-col"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={panelVariants}
            transition={{ duration: ANIMATION_DURATION.ENTER / 1000 }}
          >
            {/* Cabeçalho */}
            <div className="p-4 border-b flex justify-between items-center">
              <div>
                <h2 className="text-lg font-medium">Notificações</h2>
                <div className="text-sm text-gray-500">
                  {unreadCount > 0 ? (
                    <span>{unreadCount} não {unreadCount === 1 ? 'lida' : 'lidas'}</span>
                  ) : (
                    <span>Todas lidas</span>
                  )}
                </div>
              </div>
              
              <div className="flex gap-2">
                {/* Botão de marcar todas como lidas */}
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-primary hover:text-primary-dark text-sm"
                    aria-label="Marcar todas como lidas"
                  >
                    Marcar todas
                  </button>
                )}
                
                {/* Botão de limpar todas */}
                {persistentNotifications.length > 0 && (
                  <button
                    onClick={clearAllNotifications}
                    className="text-gray-500 hover:text-gray-700 text-sm"
                    aria-label="Limpar todas as notificações"
                  >
                    Limpar todas
                  </button>
                )}
                
                {/* Botão de fechar */}
                <button
                  onClick={toggleNotificationCenter}
                  className="text-gray-400 hover:text-gray-600"
                  aria-label="Fechar centro de notificações"
                >
                  ×
                </button>
              </div>
            </div>
            
            {/* Filtros */}
            <div className="p-3 border-b bg-gray-50">
              <div className="flex flex-wrap gap-2">
                {/* Filtros de tipo */}
                <button
                  onClick={() => toggleTypeFilter(NotificationType.INFO)}
                  className={`text-xs px-2 py-1 rounded-full ${
                    filter.types?.includes(NotificationType.INFO)
                      ? 'bg-info text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  Info
                </button>
                <button
                  onClick={() => toggleTypeFilter(NotificationType.SUCCESS)}
                  className={`text-xs px-2 py-1 rounded-full ${
                    filter.types?.includes(NotificationType.SUCCESS)
                      ? 'bg-success text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  Sucesso
                </button>
                <button
                  onClick={() => toggleTypeFilter(NotificationType.WARNING)}
                  className={`text-xs px-2 py-1 rounded-full ${
                    filter.types?.includes(NotificationType.WARNING)
                      ? 'bg-warning text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  Alerta
                </button>
                <button
                  onClick={() => toggleTypeFilter(NotificationType.ERROR)}
                  className={`text-xs px-2 py-1 rounded-full ${
                    filter.types?.includes(NotificationType.ERROR)
                      ? 'bg-error text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  Erro
                </button>
                
                {/* Filtros de leitura */}
                <button
                  onClick={() => toggleReadFilter(false)}
                  className={`text-xs px-2 py-1 rounded-full ${
                    filter.read === false
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  Não lidas
                </button>
                <button
                  onClick={() => toggleReadFilter(true)}
                  className={`text-xs px-2 py-1 rounded-full ${
                    filter.read === true
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  Lidas
                </button>
              </div>
            </div>
            
            {/* Lista de notificações */}
            <div className="flex-grow overflow-y-auto p-3">
              {Object.entries(groupedNotifications).length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <i className="icon-bell text-4xl mb-2" />
                  <p className="text-sm">Nenhuma notificação encontrada</p>
                </div>
              ) : (
                Object.entries(groupedNotifications).map(([category, notifications]) => (
                  <div key={category} className="mb-4">
                    {/* Nome da categoria */}
                    <h3 className="text-xs text-gray-500 uppercase mb-2 font-medium">
                      {category}
                    </h3>
                    
                    {/* Notificações desta categoria */}
                    <AnimatePresence>
                      {notifications.map((notification, index) => (
                        <motion.div
                          key={notification.id}
                          custom={index}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          variants={itemVariants}
                        >
                          <NotificationItem
                            notification={notification}
                            onMarkAsRead={markAsRead}
                            onRemove={removeNotification}
                            expanded={!!expandedIds[notification.id]}
                            onToggleExpand={toggleExpand}
                          />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}; 