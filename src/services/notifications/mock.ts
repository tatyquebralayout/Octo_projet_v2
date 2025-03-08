/**
 * Módulo para geração de notificações de mock para desenvolvimento
 */
import { 
  NotificationType, 
  NotificationPriority,
  CreateToastOptions,
  CreateNotificationOptions
} from './types';
import { useNotifications } from './context';
import { useEffect } from 'react';

// Dados de exemplo para mocks
const MOCK_TITLES = [
  'Nova atualização disponível',
  'Lembrete de evento',
  'Cartilha publicada',
  'Notícia destacada',
  'Mensagem recebida',
  'Solicitação aprovada',
  'Falha no servidor',
  'Aviso importante',
  'Sua inscrição foi confirmada',
  'Documentos pendentes'
];

const MOCK_MESSAGES = [
  'A versão 2.0 do aplicativo foi lançada com novos recursos de acessibilidade.',
  'O evento "Inclusão no Trabalho" acontecerá amanhã às 15h.',
  'Nova cartilha sobre adaptações para deficiência visual foi publicada.',
  'OCTO recebe prêmio de inovação em inclusão digital.',
  'Você tem 3 mensagens não lidas no seu perfil.',
  'Sua solicitação de acesso aos recursos premium foi aprovada.',
  'Estamos enfrentando problemas temporários nos servidores.',
  'Atualize suas informações de perfil até o final do mês.',
  'Sua inscrição no curso "Tecnologias Assistivas" foi confirmada.',
  'Alguns documentos estão pendentes de aprovação.'
];

const MOCK_DETAILS = [
  'Acesse o link abaixo para ver todos os novos recursos e melhorias implementadas nesta versão.',
  'O evento será transmitido ao vivo pelo nosso canal e terá intérprete de LIBRAS.',
  'Esta cartilha traz dicas práticas para adaptar ambientes para pessoas com deficiência visual.',
  'O prêmio reconhece iniciativas que promovem inclusão digital para pessoas com deficiências.',
  'Verifique sua caixa de entrada para ver todas as mensagens pendentes.',
  'Você agora tem acesso a todos os recursos premium da plataforma por 12 meses.',
  'Nossa equipe técnica está trabalhando para resolver o problema o mais rápido possível.',
  'Mantenha seu perfil atualizado para receber recomendações personalizadas.',
  'O curso começa na próxima segunda-feira. Todos os materiais estarão disponíveis no seu perfil.',
  'Acesse seu perfil para verificar quais documentos precisam ser enviados.'
];

const MOCK_CATEGORIES = [
  'sistema',
  'eventos',
  'conteúdo',
  'notícias',
  'mensagens',
  'administrativo'
];

/**
 * Gera um toast aleatório para fins de desenvolvimento
 */
export function generateRandomToast(): CreateToastOptions {
  // Selecionar tipo aleatório com pesos diferentes (mais sucessos e infos que erros)
  const typeRandom = Math.random();
  let type: NotificationType;
  
  if (typeRandom < 0.4) {
    type = NotificationType.INFO;
  } else if (typeRandom < 0.7) {
    type = NotificationType.SUCCESS;
  } else if (typeRandom < 0.9) {
    type = NotificationType.WARNING;
  } else {
    type = NotificationType.ERROR;
  }
  
  // Selecionar título e mensagem aleatórios
  const titleIndex = Math.floor(Math.random() * MOCK_TITLES.length);
  const messageIndex = Math.floor(Math.random() * MOCK_MESSAGES.length);
  
  return {
    title: MOCK_TITLES[titleIndex],
    message: MOCK_MESSAGES[messageIndex],
    type,
    // Duração mais longa para WarNING e ERROR
    duration: type === NotificationType.WARNING || type === NotificationType.ERROR 
      ? 8000 
      : 5000,
    // Prioridade alta para ERROR, média para WARNING, baixa para os demais
    priority: type === NotificationType.ERROR 
      ? NotificationPriority.HIGH
      : type === NotificationType.WARNING
        ? NotificationPriority.MEDIUM
        : NotificationPriority.LOW
  };
}

/**
 * Gera uma notificação persistente aleatória para fins de desenvolvimento
 */
export function generateRandomNotification(): CreateNotificationOptions {
  // Selecionar tipo aleatório com pesos diferentes
  const typeRandom = Math.random();
  let type: NotificationType;
  
  if (typeRandom < 0.4) {
    type = NotificationType.INFO;
  } else if (typeRandom < 0.7) {
    type = NotificationType.SUCCESS;
  } else if (typeRandom < 0.9) {
    type = NotificationType.WARNING;
  } else {
    type = NotificationType.ERROR;
  }
  
  // Selecionar título, mensagem e detalhes aleatórios
  const titleIndex = Math.floor(Math.random() * MOCK_TITLES.length);
  const messageIndex = Math.floor(Math.random() * MOCK_MESSAGES.length);
  const detailsIndex = Math.floor(Math.random() * MOCK_DETAILS.length);
  
  // Selecionar categoria aleatória
  const categoryIndex = Math.floor(Math.random() * MOCK_CATEGORIES.length);
  
  // Calcular data de expiração (50% de chance de ter expiração)
  const hasExpiry = Math.random() > 0.5;
  const expiresAt = hasExpiry 
    ? Date.now() + (1 + Math.floor(Math.random() * 7)) * 24 * 60 * 60 * 1000 // 1-7 dias
    : undefined;
  
  // 40% de chance de ter link
  const hasLink = Math.random() < 0.4;
  const link = hasLink ? 'https://octo.org.br' : undefined;
  
  return {
    title: MOCK_TITLES[titleIndex],
    message: MOCK_MESSAGES[messageIndex],
    type,
    details: MOCK_DETAILS[detailsIndex],
    category: MOCK_CATEGORIES[categoryIndex],
    expiresAt,
    link,
    // Prioridade alta para ERROR, média para WARNING, baixa para os demais
    priority: type === NotificationType.ERROR 
      ? NotificationPriority.HIGH
      : type === NotificationType.WARNING
        ? NotificationPriority.MEDIUM
        : NotificationPriority.LOW
  };
}

/**
 * Hook para simular geração de notificações durante o desenvolvimento
 * @param toastsEnabled Habilitar geração automática de toasts
 * @param notificationsEnabled Habilitar geração automática de notificações
 */
export const useMockNotifications = (
  toastsEnabled: boolean = false,
  notificationsEnabled: boolean = false
) => {
  const { showToast, addNotification } = useNotifications();
  
  useEffect(() => {
    if (!toastsEnabled) return;
    
    // Gerar toasts aleatórios a cada 5-15 segundos
    const toastInterval = setInterval(() => {
      const toast = generateRandomToast();
      showToast(toast);
    }, 5000 + Math.random() * 10000);
    
    return () => clearInterval(toastInterval);
  }, [toastsEnabled, showToast]);
  
  useEffect(() => {
    if (!notificationsEnabled) return;
    
    // Gerar notificações persistentes aleatórias a cada 20-40 segundos
    const notificationInterval = setInterval(() => {
      const notification = generateRandomNotification();
      addNotification(notification);
    }, 20000 + Math.random() * 20000);
    
    return () => clearInterval(notificationInterval);
  }, [notificationsEnabled, addNotification]);
  
  // Funções para geração manual de notificações mock
  const generateToast = () => {
    const toast = generateRandomToast();
    showToast(toast);
  };
  
  const generateNotification = () => {
    const notification = generateRandomNotification();
    addNotification(notification);
  };
  
  return {
    generateToast,
    generateNotification
  };
}; 