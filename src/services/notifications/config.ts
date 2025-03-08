/**
 * Configurações para o sistema de notificações
 * Define valores padrão e constantes
 */
import { 
  NotificationCenterConfig, 
  NotificationPriority, 
  ToastPosition 
} from './types';

/**
 * Configuração padrão para o centro de notificações
 */
export const DEFAULT_NOTIFICATION_CONFIG: NotificationCenterConfig = {
  // Máximo de 100 notificações persistentes
  maxPersistentNotifications: 100,
  // Máximo de 3 toasts exibidos simultaneamente
  maxToasts: 3,
  // Posição padrão dos toasts: canto superior direito
  defaultToastPosition: 'top-right',
  // Duração padrão dos toasts: 5 segundos
  defaultToastDuration: 5000,
  // Toasts fecham automaticamente por padrão
  autoCloseToastsByDefault: true,
  // Estratégia de acessibilidade
  accessibilityStrategy: {
    // Notificações de média prioridade ou maior são lidas por leitores de tela
    screenReaderPriorityThreshold: NotificationPriority.MEDIUM,
    // Aumento de 50% na duração dos toasts para usuários com deficiências cognitivas
    extendedDurationFactor: 1.5,
    // Pausa de toasts quando o mouse passa sobre eles
    pauseOnHover: true
  }
};

/**
 * Duração em milissegundos para diferentes tipos de toast
 */
export const TOAST_DURATIONS = {
  // Sucesso: exibido por menos tempo (3s)
  SUCCESS: 3000,
  // Informação: tempo padrão (5s)
  INFO: 5000,
  // Alerta: tempo maior (6s)
  WARNING: 6000,
  // Erro: tempo ainda maior (8s)
  ERROR: 8000
};

/**
 * Mapeamento de role ARIA para tipos de notificação
 * Define como leitores de tela devem anunciar as notificações
 */
export const NOTIFICATION_ARIA_ROLES = {
  // Notificações de sucesso são anunciadas como status
  SUCCESS: 'status',
  // Informações são anunciadas como status
  INFO: 'status',
  // Alertas são anunciados como alertas
  WARNING: 'alert',
  // Erros são anunciados como alertas
  ERROR: 'alert'
};

/**
 * Mapeamento de aria-live para tipos de notificação
 * Define a urgência com que leitores de tela devem anunciar as notificações
 */
export const NOTIFICATION_ARIA_LIVE = {
  // Notificações de sucesso são anunciadas educadamente (não interrompem)
  SUCCESS: 'polite',
  // Informações são anunciadas educadamente
  INFO: 'polite',
  // Alertas são anunciados assertivamente (podem interromper)
  WARNING: 'assertive',
  // Erros são anunciados assertivamente
  ERROR: 'assertive'
};

/**
 * Mapeia uma posição para as propriedades CSS necessárias
 */
export const POSITION_STYLES: Record<ToastPosition, {top?: string, bottom?: string, left?: string, right?: string, transform?: string}> = {
  'top-left': {
    top: '1rem',
    left: '1rem'
  },
  'top-center': {
    top: '1rem',
    left: '50%',
    transform: 'translateX(-50%)'
  },
  'top-right': {
    top: '1rem',
    right: '1rem'
  },
  'bottom-left': {
    bottom: '1rem',
    left: '1rem'
  },
  'bottom-center': {
    bottom: '1rem',
    left: '50%',
    transform: 'translateX(-50%)'
  },
  'bottom-right': {
    bottom: '1rem',
    right: '1rem'
  }
};

/**
 * Duração das animações em milissegundos
 */
export const ANIMATION_DURATION = {
  ENTER: 300,
  EXIT: 300
}; 