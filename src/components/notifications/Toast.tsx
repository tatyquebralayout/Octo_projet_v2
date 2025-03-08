/**
 * Componente Toast para exibir notificações temporárias
 */
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastNotification } from '../../services/notifications/types';
import { getClassForNotificationType, getIconForNotificationType } from '../../services/notifications/utils';
import { ANIMATION_DURATION } from '../../services/notifications/config';

interface ToastProps {
  toast: ToastNotification;
  onClose: (id: string) => void;
  // Se deve pausar ao passar o mouse
  pauseOnHover?: boolean;
}

export const Toast: React.FC<ToastProps> = ({ toast, onClose, pauseOnHover = true }) => {
  const { id, title, message, type, autoClose, duration = 5000, actions, role, ariaLive } = toast;
  
  // Referência para o timer de fechamento automático
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Estado para controlar quando o toast está pausado (mouse sobre ele)
  const [isPaused, setIsPaused] = useState(false);
  
  // Estado para manter o tempo restante quando pausado
  const [remainingTime, setRemainingTime] = useState<number>(duration);
  
  // Estado para controlar a animação de progresso
  const [progress, setProgress] = useState(100);
  
  // Função para iniciar o timer de fechamento automático
  const startCloseTimer = () => {
    if (autoClose && !isPaused) {
      // Limpar qualquer timer existente
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      
      // Criar novo timer
      timerRef.current = setTimeout(() => {
        onClose(id);
      }, remainingTime);
      
      // Iniciar a animação de progresso
      const startTime = Date.now();
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const remaining = remainingTime - elapsed;
        const newProgress = (remaining / duration) * 100;
        
        setProgress(Math.max(0, newProgress));
        
        if (remaining <= 0) {
          clearInterval(interval);
        }
      }, 10);
      
      // Limpar o intervalo quando o componente desmontar
      return () => clearInterval(interval);
    }
  };
  
  // Iniciar o timer quando o componente montar
  useEffect(() => {
    const cleanup = startCloseTimer();
    
    // Limpar o timer e outros recursos quando o componente desmontar
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      if (cleanup) {
        cleanup();
      }
    };
  }, [isPaused, remainingTime]);
  
  // Manipular pausa no hover
  const handleMouseEnter = () => {
    if (pauseOnHover && autoClose) {
      setIsPaused(true);
      // Calcular o tempo restante
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
        setRemainingTime(remainingTime * (progress / 100));
      }
    }
  };
  
  // Manipular retomada do timer quando o mouse sai
  const handleMouseLeave = () => {
    if (pauseOnHover && autoClose) {
      setIsPaused(false);
    }
  };
  
  // Obter a classe CSS para o tipo de notificação
  const colorClass = getClassForNotificationType(type);
  
  // Obter o ícone para o tipo de notificação
  const icon = getIconForNotificationType(type);
  
  // Variantes para animação de entrada e saída
  const variants = {
    initial: { opacity: 0, y: -50, scale: 0.8 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, scale: 0.8, transition: { duration: ANIMATION_DURATION.EXIT / 1000 } }
  };
  
  return (
    <AnimatePresence>
      <motion.div
        className={`relative rounded-lg md3-elevation-1 p-4 mb-3 max-w-sm ${colorClass}`}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
        transition={{ duration: ANIMATION_DURATION.ENTER / 1000 }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        role={role}
        aria-live={ariaLive}
      >
        {/* Barra de progresso */}
        {autoClose && (
          <div className="absolute bottom-0 left-0 h-1 bg-white bg-opacity-30 rounded-b-lg transition-standard"
               style={{ width: `${progress}%` }} />
        )}
        
        <div className="flex items-start">
          {/* Ícone */}
          <div className="flex-shrink-0 mr-3">
            <span className="text-lg" aria-hidden="true">
              <i className={`icon-${icon}`}></i>
            </span>
          </div>
          
          {/* Conteúdo */}
          <div className="flex-grow">
            {/* Título */}
            {title && (
              <h3 className="font-medium text-sm mb-1">{title}</h3>
            )}
            
            {/* Mensagem */}
            <div className="text-sm">{message}</div>
            
            {/* Ações */}
            {actions && actions.length > 0 && (
              <div className="mt-2 flex gap-2">
                {actions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      action.onClick();
                      // Fechar o toast após a ação se for autoClose
                      if (autoClose) {
                        onClose(id);
                      }
                    }}
                    className={`text-xs py-1 px-2 rounded ${
                      action.variant === 'primary' 
                        ? 'bg-white bg-opacity-20 hover:bg-opacity-30' 
                        : 'text-white text-opacity-80 hover:text-opacity-100'
                    }`}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Botão de fechar */}
          <button
            onClick={() => onClose(id)}
            className="ml-3 flex-shrink-0 text-sm opacity-70 hover:opacity-100 transition-opacity"
            aria-label="Fechar notificação"
          >
            ×
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}; 