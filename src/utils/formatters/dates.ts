/**
 * Utilitários para formatação e manipulação de datas
 * 
 * @module utils/formatters/dates
 */

/**
 * Formata uma data para o formato brasileiro (dd/mm/yyyy)
 * 
 * @param date - Data a ser formatada (Date, timestamp ou string ISO)
 * @returns Data formatada no padrão brasileiro
 * 
 * @example
 * formatDate(new Date(2023, 0, 31)) // '31/01/2023'
 */
export function formatDate(date: Date | number | string): string {
  if (!date) return '';
  
  try {
    const dateObj = date instanceof Date ? date : new Date(date);
    
    if (isNaN(dateObj.getTime())) {
      return '';
    }
    
    return new Intl.DateTimeFormat('pt-BR').format(dateObj);
  } catch (error) {
    console.error('Erro ao formatar data:', error);
    return '';
  }
}

/**
 * Formata uma data e hora para o formato brasileiro
 * 
 * @param date - Data a ser formatada (Date, timestamp ou string ISO)
 * @param options - Opções de formatação (showSeconds: exibir segundos)
 * @returns Data e hora formatadas
 * 
 * @example
 * formatDateTime(new Date(2023, 0, 31, 14, 30)) // '31/01/2023 14:30'
 */
export function formatDateTime(
  date: Date | number | string,
  options: { showSeconds?: boolean } = {}
): string {
  if (!date) return '';
  
  try {
    const dateObj = date instanceof Date ? date : new Date(date);
    
    if (isNaN(dateObj.getTime())) {
      return '';
    }
    
    const { showSeconds = false } = options;
    
    const formatter = new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: showSeconds ? '2-digit' : undefined,
      hour12: false
    });
    
    return formatter.format(dateObj);
  } catch (error) {
    console.error('Erro ao formatar data e hora:', error);
    return '';
  }
}

/**
 * Formata uma data para formato amigável (hoje, ontem, etc.)
 * 
 * @param date - Data a ser formatada (Date, timestamp ou string ISO)
 * @returns Data em formato amigável
 * 
 * @example
 * // Assumindo que hoje é 31/01/2023
 * formatRelativeDate(new Date()) // 'Hoje'
 * formatRelativeDate(new Date(2023, 0, 30)) // 'Ontem'
 */
export function formatRelativeDate(date: Date | number | string): string {
  if (!date) return '';
  
  try {
    const dateObj = date instanceof Date ? date : new Date(date);
    
    if (isNaN(dateObj.getTime())) {
      return '';
    }
    
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    
    // Remover horas, minutos e segundos para comparação apenas da data
    const normalizedDate = new Date(dateObj);
    normalizedDate.setHours(0, 0, 0, 0);
    
    const normalizedNow = new Date(now);
    normalizedNow.setHours(0, 0, 0, 0);
    
    const normalizedYesterday = new Date(yesterday);
    normalizedYesterday.setHours(0, 0, 0, 0);
    
    const normalizedTomorrow = new Date(tomorrow);
    normalizedTomorrow.setHours(0, 0, 0, 0);
    
    if (normalizedDate.getTime() === normalizedNow.getTime()) {
      return 'Hoje';
    } else if (normalizedDate.getTime() === normalizedYesterday.getTime()) {
      return 'Ontem';
    } else if (normalizedDate.getTime() === normalizedTomorrow.getTime()) {
      return 'Amanhã';
    } else {
      // Verifica se é dentro da mesma semana
      const dayDiff = Math.round((normalizedDate.getTime() - normalizedNow.getTime()) / (1000 * 60 * 60 * 24));
      
      if (dayDiff > -7 && dayDiff < 7) {
        const weekdays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
        return weekdays[dateObj.getDay()];
      } else {
        return formatDate(dateObj);
      }
    }
  } catch (error) {
    console.error('Erro ao formatar data relativa:', error);
    return '';
  }
}

/**
 * Converte uma string de data para objeto Date
 * 
 * @param dateStr - String de data no formato brasileiro (dd/mm/yyyy)
 * @returns Objeto Date ou null se inválido
 * 
 * @example
 * parseDate('31/01/2023') // Date object for 2023-01-31
 */
export function parseDate(dateStr: string): Date | null {
  if (!dateStr) return null;
  
  try {
    // Verificar se é formato brasileiro (dd/mm/yyyy)
    const brFormatMatch = dateStr.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    if (brFormatMatch) {
      const [, day, month, year] = brFormatMatch;
      const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      
      // Verifica se é uma data válida
      if (
        date.getFullYear() === parseInt(year) &&
        date.getMonth() === parseInt(month) - 1 &&
        date.getDate() === parseInt(day)
      ) {
        return date;
      }
      return null;
    }
    
    // Tentar parse normal caso não seja formato brasileiro
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? null : date;
  } catch (error) {
    console.error('Erro ao fazer parse da data:', error);
    return null;
  }
}

/**
 * Adiciona dias a uma data
 * 
 * @param date - Data base
 * @param days - Número de dias a adicionar (pode ser negativo)
 * @returns Nova data
 * 
 * @example
 * addDays(new Date(2023, 0, 31), 1) // Date object for 2023-02-01
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Verifica se duas datas são iguais (mesmo dia, mês e ano)
 * 
 * @param date1 - Primeira data
 * @param date2 - Segunda data
 * @returns Verdadeiro se as datas forem iguais
 */
export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
}

/**
 * Calcula a diferença entre duas datas em dias
 * 
 * @param startDate - Data inicial
 * @param endDate - Data final
 * @returns Número de dias entre as datas
 */
export function getDaysDifference(startDate: Date, endDate: Date): number {
  const diff = endDate.getTime() - startDate.getTime();
  return Math.round(diff / (1000 * 60 * 60 * 24));
}

/**
 * Formata uma duração em minutos para formato legível
 * 
 * @param minutes - Duração em minutos
 * @returns Duração formatada
 * 
 * @example
 * formatDuration(90) // '1h 30min'
 */
export function formatDuration(minutes: number): string {
  if (minutes < 0 || isNaN(minutes)) return '';
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (hours === 0) {
    return `${remainingMinutes}min`;
  } else if (remainingMinutes === 0) {
    return `${hours}h`;
  } else {
    return `${hours}h ${remainingMinutes}min`;
  }
}

/**
 * Formata uma data para ISO 8601 (formato utilizado por APIs)
 * 
 * @param date - Data a ser formatada
 * @returns String no formato ISO
 * 
 * @example
 * formatISODate(new Date(2023, 0, 31)) // '2023-01-31'
 */
export function formatISODate(date: Date): string {
  try {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  } catch (error) {
    console.error('Erro ao formatar data ISO:', error);
    return '';
  }
}

/**
 * Formata uma data e hora para formato ISO 8601 completo
 * 
 * @param date - Data a ser formatada
 * @returns String no formato ISO com timezone
 * 
 * @example
 * formatISODateTime(new Date()) // '2023-01-31T14:30:00.000Z'
 */
export function formatISODateTime(date: Date): string {
  try {
    return date.toISOString();
  } catch (error) {
    console.error('Erro ao formatar data e hora ISO:', error);
    return '';
  }
} 