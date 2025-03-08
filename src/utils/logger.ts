/**
 * Logger centralizado da aplicação
 * Abstrai a implementação concreta de logging
 */

// Interface do logger
export interface Logger {
  info(message: string, ...args: any[]): void;
  warn(message: string, ...args: any[]): void;
  error(message: string, ...args: any[]): void;
  debug(message: string, ...args: any[]): void;
}

// Implementação do Logger para desenvolvimento
class DevLogger implements Logger {
  info(message: string, ...args: any[]): void {
    console.info(`[INFO] ${message}`, ...args);
  }
  
  warn(message: string, ...args: any[]): void {
    console.warn(`[WARN] ${message}`, ...args);
  }
  
  error(message: string, ...args: any[]): void {
    console.error(`[ERROR] ${message}`, ...args);
  }
  
  debug(message: string, ...args: any[]): void {
    console.debug(`[DEBUG] ${message}`, ...args);
  }
}

// Implementação do Logger para produção
class ProdLogger implements Logger {
  info(message: string, ...args: any[]): void {
    // Em produção, poderíamos integrar com um serviço de logging
    if (args.length > 0) {
      console.info(`[INFO] ${message}`, ...args);
    } else {
      console.info(`[INFO] ${message}`);
    }
  }
  
  warn(message: string, ...args: any[]): void {
    if (args.length > 0) {
      console.warn(`[WARN] ${message}`, ...args);
    } else {
      console.warn(`[WARN] ${message}`);
    }
  }
  
  error(message: string, ...args: any[]): void {
    // Em produção, poderíamos enviar erros para um serviço de monitoramento
    if (args.length > 0) {
      console.error(`[ERROR] ${message}`, ...args);
    } else {
      console.error(`[ERROR] ${message}`);
    }
  }
  
  debug(message: string, ...args: any[]): void {
    // Em produção, logs de debug geralmente são suprimidos
    if (import.meta.env.DEV) {
      if (args.length > 0) {
        console.debug(`[DEBUG] ${message}`, ...args);
      } else {
        console.debug(`[DEBUG] ${message}`);
      }
    }
  }
}

// Exportar a instância apropriada com base no ambiente
export const logger: Logger = import.meta.env.PROD 
  ? new ProdLogger() 
  : new DevLogger();