/**
 * Componente para conter e gerenciar todos os toasts
 */
import React from 'react';
import { useNotifications } from '../../services/notifications/context';
import { Toast } from './Toast';
import { POSITION_STYLES } from '../../services/notifications/config';

export const ToastContainer: React.FC = () => {
  const { state, removeToast } = useNotifications();
  const { toasts, config } = state;
  const { accessibilityStrategy } = config;
  
  // Agrupar toasts por posição
  const toastsByPosition: Record<string, typeof toasts> = {};
  
  // Organizar toasts por posição
  toasts.forEach(toast => {
    const position = toast.position || config.defaultToastPosition;
    if (!toastsByPosition[position]) {
      toastsByPosition[position] = [];
    }
    toastsByPosition[position].push(toast);
  });
  
  return (
    <>
      {/* Renderizar um container para cada posição */}
      {Object.entries(toastsByPosition).map(([position, positionToasts]) => (
        <div
          key={position}
          className="fixed z-50"
          style={POSITION_STYLES[position as keyof typeof POSITION_STYLES]}
          aria-live="polite"
          aria-atomic="true"
        >
          {/* Renderizar cada toast na posição atual */}
          {positionToasts.map(toast => (
            <Toast
              key={toast.id}
              toast={toast}
              onClose={removeToast}
              pauseOnHover={accessibilityStrategy.pauseOnHover}
            />
          ))}
        </div>
      ))}
    </>
  );
}; 