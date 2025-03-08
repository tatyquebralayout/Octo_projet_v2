/**
 * Utilitários para formatação e manipulação de números
 * 
 * @module utils/formatters/numbers
 */

/**
 * Formata um número para moeda brasileira (Real)
 * 
 * @param value - Valor numérico a ser formatado
 * @param options - Opções de formatação (default: moeda R$, 2 casas decimais)
 * @returns String formatada em BRL
 * 
 * @example
 * formatCurrency(1234.56) // 'R$ 1.234,56'
 */
export function formatCurrency(
  value: number, 
  options: {
    currency?: string;
    decimals?: number;
    showSymbol?: boolean;
  } = {}
): string {
  if (value === null || value === undefined || isNaN(value)) {
    return '';
  }
  
  const {
    currency = 'BRL',
    decimals = 2,
    showSymbol = true
  } = options;
  
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: showSymbol ? 'currency' : 'decimal',
    currency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
  
  return formatter.format(value);
}

/**
 * Formata um número com separadores de milhar
 * 
 * @param value - Valor numérico a ser formatado
 * @param decimals - Número de casas decimais (default: 0)
 * @returns String formatada com separadores
 * 
 * @example
 * formatNumber(1234567.89, 2) // '1.234.567,89'
 */
export function formatNumber(value: number, decimals: number = 0): string {
  if (value === null || value === undefined || isNaN(value)) {
    return '';
  }
  
  const formatter = new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
  
  return formatter.format(value);
}

/**
 * Formata um número como porcentagem
 * 
 * @param value - Valor numérico a ser formatado (0.1 = 10%)
 * @param decimals - Número de casas decimais (default: 2)
 * @returns String formatada como porcentagem
 * 
 * @example
 * formatPercent(0.1234) // '12,34%'
 */
export function formatPercent(value: number, decimals: number = 2): string {
  if (value === null || value === undefined || isNaN(value)) {
    return '';
  }
  
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
  
  return formatter.format(value);
}

/**
 * Arredonda um número para o número especificado de casas decimais
 * 
 * @param value - Valor a ser arredondado
 * @param decimals - Número de casas decimais (default: 2)
 * @returns Número arredondado
 * 
 * @example
 * roundNumber(1.2345, 2) // 1.23
 */
export function roundNumber(value: number, decimals: number = 2): number {
  if (value === null || value === undefined || isNaN(value)) {
    return 0;
  }
  
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

/**
 * Converte uma string formatada em moeda para número
 * 
 * @param value - String formatada como moeda
 * @returns Valor numérico
 * 
 * @example
 * parseCurrency('R$ 1.234,56') // 1234.56
 */
export function parseCurrency(value: string): number {
  if (!value) return 0;
  
  // Remove símbolo de moeda e espaços
  const cleanValue = value.replace(/[^\d,.]/g, '')
    .replace(/\./g, '')
    .replace(',', '.');
    
  const numValue = parseFloat(cleanValue);
  return isNaN(numValue) ? 0 : numValue;
}

/**
 * Converte uma string formatada como número para um valor numérico
 * 
 * @param value - String formatada como número
 * @returns Valor numérico
 * 
 * @example
 * parseNumber('1.234,56') // 1234.56
 */
export function parseNumber(value: string): number {
  if (!value) return 0;
  
  // Remove separadores de milhar e troca vírgula por ponto
  const cleanValue = value.replace(/\./g, '').replace(',', '.');
  const numValue = parseFloat(cleanValue);
  
  return isNaN(numValue) ? 0 : numValue;
}

/**
 * Limita um número entre valores mínimo e máximo
 * 
 * @param value - Valor a ser limitado
 * @param min - Valor mínimo
 * @param max - Valor máximo
 * @returns Valor dentro dos limites
 * 
 * @example
 * clamp(150, 0, 100) // 100
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Verifica se um valor é um número válido (não NaN e não Infinity)
 * 
 * @param value - Valor a ser verificado
 * @returns Verdadeiro se for um número válido
 */
export function isValidNumber(value: any): boolean {
  const num = Number(value);
  return !isNaN(num) && isFinite(num);
}

/**
 * Formata um número de telefone brasileiro
 * 
 * @param phone - Número de telefone (apenas dígitos)
 * @returns Telefone formatado
 * 
 * @example
 * formatPhone('11999887766') // '(11) 99988-7766'
 */
export function formatPhone(phone: string): string {
  if (!phone) return '';
  
  // Remove caracteres não numéricos
  const digits = phone.replace(/\D/g, '');
  
  if (digits.length === 11) {
    // Celular com DDD
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  } else if (digits.length === 10) {
    // Telefone fixo com DDD
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  } else if (digits.length === 9) {
    // Celular sem DDD
    return `${digits.slice(0, 5)}-${digits.slice(5)}`;
  } else if (digits.length === 8) {
    // Telefone fixo sem DDD
    return `${digits.slice(0, 4)}-${digits.slice(4)}`;
  }
  
  // Retorna o valor original se não conseguir formatar
  return phone;
}

/**
 * Formata um CEP
 * 
 * @param cep - CEP (apenas dígitos)
 * @returns CEP formatado
 * 
 * @example
 * formatCEP('12345678') // '12345-678'
 */
export function formatCEP(cep: string): string {
  if (!cep) return '';
  
  // Remove caracteres não numéricos
  const digits = cep.replace(/\D/g, '');
  
  if (digits.length === 8) {
    return `${digits.slice(0, 5)}-${digits.slice(5)}`;
  }
  
  // Retorna o valor original se não conseguir formatar
  return cep;
} 