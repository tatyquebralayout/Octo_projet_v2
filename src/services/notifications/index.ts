/**
 * Sistema de Notificações para OCTO
 * Sistema completo para gerenciar notificações na aplicação
 */

// Contexto e hooks
export { 
  NotificationsProvider,
  useNotifications 
} from './context';

// Tipos
export type {
  BaseNotification,
  ToastNotification,
  PersistentNotification,
  NotificationCenterConfig,
  CreateToastOptions,
  CreateNotificationOptions,
  ToastAction,
  NotificationAction,
  NotificationFilter,
  ToastPosition,
  NotificationType,
  NotificationPriority,
  NotificationActionType
} from './types';

// Utilidades
export {
  formatTimestamp,
  getIconForNotificationType,
  getClassForNotificationType,
  createToast,
  createNotification,
  isNotificationExpired,
  groupNotificationsByCategory,
  countUnreadNotifications
} from './utils';

// Configurações
export {
  DEFAULT_NOTIFICATION_CONFIG,
  TOAST_DURATIONS,
  NOTIFICATION_ARIA_ROLES,
  NOTIFICATION_ARIA_LIVE,
  POSITION_STYLES,
  ANIMATION_DURATION
} from './config';

// Mock
export {
  useMockNotifications,
  generateRandomToast,
  generateRandomNotification
} from './mock';

/**
 * Sistema de Notificações para OCTO
 * ---------------------------------
 * 
 * Este módulo fornece um sistema completo para gerenciar notificações na aplicação.
 * Suporta toasts temporários e notificações persistentes com recursos de acessibilidade.
 * 
 * ## Uso básico:
 * 
 * 1. Adicione o provider na raiz da aplicação:
 * 
 * ```tsx
 * import { NotificationsProvider } from 'src/components/notifications';
 * 
 * function App() {
 *   return (
 *     <NotificationsProvider>
 *       <YourApp />
 *     </NotificationsProvider>
 *   );
 * }
 * ```
 * 
 * 2. Use o hook para exibir toasts em qualquer componente:
 * 
 * ```tsx
 * import { useNotifications } from 'src/services/notifications';
 * 
 * function MyComponent() {
 *   const { showSuccessToast, showErrorToast } = useNotifications();
 *   
 *   const handleClick = () => {
 *     showSuccessToast('Sucesso!', 'Operação realizada com sucesso');
 *   };
 *   
 *   return <button onClick={handleClick}>Clique Aqui</button>;
 * }
 * ```
 * 
 * 3. Adicione o botão de notificações no seu layout:
 * 
 * ```tsx
 * import { NotificationButton } from 'src/components/notifications';
 * 
 * function Header() {
 *   return (
 *     <header>
 *       <div className="logo">OCTO</div>
 *       <nav>...</nav>
 *       <div className="user-actions">
 *         <NotificationButton />
 *       </div>
 *     </header>
 *   );
 * }
 * ```
 * 
 * ## Recursos de acessibilidade:
 * 
 * - ARIA roles e live regions configuráveis
 * - Duração de toasts adaptada para usuários com deficiências cognitivas
 * - Pausa automática de toasts ao passar o mouse (para dar tempo de ler)
 * - Suporte a leitores de tela
 * - Alto contraste e cores significativas
 * 
 * ## Integrações futuras:
 * 
 * O sistema foi projetado para:
 * - Integração com WebSockets
 * - Push Notifications
 * - Sistemas de polling
 * - Notificações específicas para dispositivos de acessibilidade
 */ 