/**
 * Componente de exemplo para demonstrar o uso do sistema de notificações
 */
import React, { useState } from 'react';
import { useNotifications } from '../services/notifications';
import { NotificationButton } from '../components/notifications';
import { NotificationType, NotificationPriority } from '../services/notifications/types';
import { useMockNotifications } from '../services/notifications/mock';

export const NotificationExample: React.FC = () => {
  const { 
    showToast, 
    showSuccessToast, 
    showErrorToast, 
    showInfoToast, 
    showWarningToast,
    addNotification,
  } = useNotifications();
  
  // Hook para mocks
  const { generateToast, generateNotification } = useMockNotifications();
  
  // Estados para os formulários
  const [toastTitle, setToastTitle] = useState('Notificação de exemplo');
  const [toastMessage, setToastMessage] = useState('Esta é uma mensagem de exemplo para demonstrar o sistema de notificações.');
  const [toastType, setToastType] = useState<NotificationType>(NotificationType.INFO);
  
  // Manipulador para mostrar um toast personalizado
  const handleShowToast = () => {
    showToast({
      title: toastTitle,
      message: toastMessage,
      type: toastType,
      priority: NotificationPriority.MEDIUM,
      actions: [
        {
          label: 'Entendi',
          onClick: () => console.log('Clicou em Entendi'),
          variant: 'primary'
        }
      ]
    });
  };
  
  // Manipulador para adicionar uma notificação persistente
  const handleAddNotification = () => {
    addNotification({
      title: toastTitle,
      message: toastMessage,
      type: toastType,
      details: 'Aqui estão mais detalhes sobre esta notificação. Você pode incluir informações adicionais que serão exibidas quando o usuário expandir a notificação.',
      category: 'exemplos',
      link: 'https://octo.org.br',
      actions: [
        {
          label: 'Ver mais',
          onClick: () => window.open('https://octo.org.br', '_blank'),
          variant: 'primary'
        }
      ]
    });
  };
  
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">Sistema de Notificações OCTO</h1>
        <p className="text-gray-600 mb-4">
          Este exemplo demonstra como utilizar o sistema de notificações da OCTO para exibir
          toast messages e gerenciar um centro de notificações persistente.
        </p>
        
        <div className="flex items-center mb-6">
          <span className="mr-2">Botão de notificações:</span>
          <NotificationButton />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Seção de toasts */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Toasts (Notificações Temporárias)</h2>
          
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
              <input
                type="text"
                value={toastTitle}
                onChange={(e) => setToastTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mensagem</label>
              <textarea
                value={toastMessage}
                onChange={(e) => setToastMessage(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                rows={3}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
              <select
                value={toastType}
                onChange={(e) => setToastType(e.target.value as NotificationType)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value={NotificationType.INFO}>Informação</option>
                <option value={NotificationType.SUCCESS}>Sucesso</option>
                <option value={NotificationType.WARNING}>Alerta</option>
                <option value={NotificationType.ERROR}>Erro</option>
              </select>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleShowToast}
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
            >
              Mostrar Toast Personalizado
            </button>
            
            <button
              onClick={() => showSuccessToast('Sucesso!', 'Operação realizada com sucesso.')}
              className="px-4 py-2 bg-success text-white rounded hover:opacity-90"
            >
              Toast de Sucesso
            </button>
            
            <button
              onClick={() => showErrorToast('Erro!', 'Ocorreu um erro ao processar sua solicitação.')}
              className="px-4 py-2 bg-error text-white rounded hover:opacity-90"
            >
              Toast de Erro
            </button>
            
            <button
              onClick={() => showInfoToast('Informação', 'Esta é uma informação importante.')}
              className="px-4 py-2 bg-info text-white rounded hover:opacity-90"
            >
              Toast de Info
            </button>
            
            <button
              onClick={() => showWarningToast('Alerta', 'Atenção! Esta ação não pode ser desfeita.')}
              className="px-4 py-2 bg-warning text-white rounded hover:opacity-90"
            >
              Toast de Alerta
            </button>
          </div>
        </div>
        
        {/* Seção de notificações persistentes */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Notificações Persistentes</h2>
          
          <p className="text-gray-600 mb-4">
            As notificações persistentes são armazenadas no centro de notificações e
            podem ser acessadas pelo usuário a qualquer momento.
          </p>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleAddNotification}
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
            >
              Adicionar Notificação Persistente
            </button>
            
            <button
              onClick={generateNotification}
              className="px-4 py-2 bg-secondary text-white rounded hover:opacity-90"
            >
              Gerar Notificação Aleatória
            </button>
          </div>
        </div>
        
        {/* Seção de mocks */}
        <div className="bg-white p-6 rounded-lg shadow-md md:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Mocks para Desenvolvimento</h2>
          
          <p className="text-gray-600 mb-4">
            Durante o desenvolvimento, você pode usar o sistema de mock para simular
            notificações sendo recebidas.
          </p>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={generateToast}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              Gerar Toast Aleatório
            </button>
            
            <button
              onClick={generateNotification}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              Gerar Notificação Aleatória
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 