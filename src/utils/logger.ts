type LogLevel = 'info' | 'warn' | 'error';

class Logger {
  private static instance: Logger;
  private isProd = import.meta.env.PROD;

  private constructor() {}

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private log(level: LogLevel, message: string, ...args: any[]) {
    if (!this.isProd) {
      console[level](`[OCTO] ${message}`, ...args);
    }

    // Em produção, enviar para Sentry apenas erros
    if (this.isProd && level === 'error') {
      import('@sentry/react').then(Sentry => {
        Sentry.captureMessage(message, {
          level: Sentry.Severity.Error,
          extra: { ...args }
        });
      });
    }
  }

  info(message: string, ...args: any[]) {
    this.log('info', message, ...args);
  }

  warn(message: string, ...args: any[]) {
    this.log('warn', message, ...args);
  }

  error(message: string, ...args: any[]) {
    this.log('error', message, ...args);
  }
}

export const logger = Logger.getInstance();