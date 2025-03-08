/**
 * Utilitários para formatação e manipulação de strings
 * 
 * @module utils/formatters/strings
 */

/**
 * Remove acentos e caracteres especiais de uma string
 * 
 * @param text - Texto a ser normalizado
 * @returns Texto sem acentos e caracteres especiais
 * 
 * @example
 * normalizeString('Olá Mundo!') // 'Ola Mundo!'
 */
export function normalizeString(text: string): string {
  if (!text) return '';
  
  return text.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^\w\s]/g, ''); // Remove caracteres especiais
}

/**
 * Capitaliza a primeira letra de uma string
 * 
 * @param text - Texto a ser capitalizado
 * @returns Texto com a primeira letra maiúscula
 * 
 * @example
 * capitalize('nome') // 'Nome'
 */
export function capitalize(text: string): string {
  if (!text) return '';
  
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Formata uma string para o formato título (primeira letra de cada palavra em maiúsculo)
 * 
 * @param text - Texto a ser formatado
 * @returns Texto no formato título
 * 
 * @example
 * titleCase('olá mundo') // 'Olá Mundo'
 */
export function titleCase(text: string): string {
  if (!text) return '';
  
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Trunca uma string para o tamanho máximo especificado
 * 
 * @param text - Texto a ser truncado
 * @param maxLength - Tamanho máximo desejado
 * @param suffix - Sufixo a ser adicionado quando truncado (default: '...')
 * @returns Texto truncado
 * 
 * @example
 * truncate('Este é um texto muito longo', 10) // 'Este é um...'
 */
export function truncate(text: string, maxLength: number, suffix: string = '...'): string {
  if (!text || text.length <= maxLength) return text;
  
  return text.substring(0, maxLength - suffix.length) + suffix;
}

/**
 * Remove espaços extras de uma string
 * 
 * @param text - Texto a ser limpo
 * @returns Texto sem espaços extras
 * 
 * @example
 * removeExtraSpaces('  texto  com   espaços  ') // 'texto com espaços'
 */
export function removeExtraSpaces(text: string): string {
  if (!text) return '';
  
  return text.trim().replace(/\s+/g, ' ');
}

/**
 * Formata um nome para exibição (mantém apenas o primeiro e último nome)
 * 
 * @param fullName - Nome completo
 * @returns Nome formatado para exibição
 * 
 * @example
 * formatDisplayName('João Silva dos Santos') // 'João Santos'
 */
export function formatDisplayName(fullName: string): string {
  if (!fullName) return '';
  
  const parts = fullName.trim().split(/\s+/);
  
  if (parts.length === 1) return parts[0];
  if (parts.length === 2) return fullName;
  
  return `${parts[0]} ${parts[parts.length - 1]}`;
}

/**
 * Formata um nome para iniciais
 * 
 * @param fullName - Nome completo
 * @returns Iniciais do nome
 * 
 * @example
 * formatInitials('João Silva') // 'JS'
 */
export function formatInitials(fullName: string): string {
  if (!fullName) return '';
  
  return fullName
    .trim()
    .split(/\s+/)
    .map(part => part.charAt(0).toUpperCase())
    .join('');
}

/**
 * Gera um slug a partir de uma string
 * 
 * @param text - Texto a ser convertido em slug
 * @returns Slug gerado
 * 
 * @example
 * slugify('Olá Mundo!') // 'ola-mundo'
 */
export function slugify(text: string): string {
  if (!text) return '';
  
  return normalizeString(text)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

/**
 * Mascara parte de uma string (ex: para mascarar emails, números de cartão)
 * 
 * @param text - Texto a ser mascarado
 * @param visibleStart - Número de caracteres visíveis no início
 * @param visibleEnd - Número de caracteres visíveis no final
 * @param maskChar - Caractere a ser usado como máscara (default: '*')
 * @returns Texto mascarado
 * 
 * @example
 * maskString('email@example.com', 2, 4) // 'em**@example.com'
 */
export function maskString(
  text: string, 
  visibleStart: number = 0, 
  visibleEnd: number = 0, 
  maskChar: string = '*'
): string {
  if (!text) return '';
  
  const start = text.slice(0, visibleStart);
  const end = visibleEnd > 0 ? text.slice(-visibleEnd) : '';
  const maskLength = Math.max(0, text.length - visibleStart - visibleEnd);
  const mask = maskChar.repeat(maskLength);
  
  return start + mask + end;
} 